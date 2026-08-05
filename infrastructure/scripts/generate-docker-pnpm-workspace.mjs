import fs from "fs";
import path from "path";

const targetDir = process.argv[2] || "dist";
const workspaceRoot = process.cwd();
const rootWorkspaceYaml = path.join(workspaceRoot, "pnpm-workspace.yaml");
const outputWorkspaceYaml = path.join(targetDir, "pnpm-workspace.yaml");
const workspaceModulesDir = path.join(targetDir, "workspace_modules");

if (!fs.existsSync(targetDir)) {
  console.error(`❌ Target directory not found: ${targetDir}`);
  process.exit(1);
}

if (!fs.existsSync(rootWorkspaceYaml)) {
  console.error(`❌ Root pnpm-workspace.yaml not found at ${rootWorkspaceYaml}`);
  process.exit(1);
}

const rootWorkspaceContent = fs.readFileSync(rootWorkspaceYaml, "utf-8");
const catalog = parseCatalog(rootWorkspaceContent);
const allowBuilds = parseAllowBuilds(rootWorkspaceContent);
const packageDirs = findWorkspaceModulesPackages(workspaceModulesDir);

if (packageDirs.length === 0) {
  console.warn(`⚠️ No workspace packages found in ${workspaceModulesDir}`);
}

const generatedContent = buildDockerWorkspaceYaml(catalog, allowBuilds, packageDirs);
fs.writeFileSync(outputWorkspaceYaml, `${generatedContent}\n`, "utf-8");

console.log(`✅ Generated ${outputWorkspaceYaml}`);
console.log(`📦 Catalog entries copied: ${Object.keys(catalog).length}`);
console.log(`🔨 AllowBuilds entries copied: ${Object.keys(allowBuilds).length}`);
console.log(`📁 Workspace package entries generated: ${packageDirs.length}`);

restoreWorkspaceDependencies(targetDir);

function parseCatalog(content) {
  const catalogMatch = content.match(/^catalog:\s*\n((?:^[ \t].*\n?)+)(?=^[^ \t].*?:|$)/m);

  if (!catalogMatch) {
    throw new Error("No 'catalog' section found in pnpm-workspace.yaml");
  }

  const catalogSection = catalogMatch[1];
  const catalog = {};

  for (const line of catalogSection.split(/\n/)) {
    const match = line.match(/^\s+["']?(.+?)["']?\s*:\s*["']?([^"'\n]+)["']?\s*$/);
    if (!match) continue;

    const name = match[1].trim();
    const version = match[2].trim();

    if (name && version) {
      catalog[name] = version;
    }
  }

  return catalog;
}

function parseAllowBuilds(content) {
  const allowBuildsMatch = content.match(/^allowBuilds:\s*\n((?:^[ \t].*\n?)+?)(?=^[^ \t]|\n$)/m);

  if (!allowBuildsMatch) {
    return {};
  }

  const allowBuildsSection = allowBuildsMatch[1];
  const allowBuilds = {};

  for (const line of allowBuildsSection.split(/\n/)) {
    const match = line.match(/^\s+["']?(.+?)["']?\s*:\s*(true|false)\s*$/);
    if (!match) continue;

    const name = match[1].trim();
    const value = match[2] === "true";

    if (name) {
      allowBuilds[name] = value;
    }
  }

  return allowBuilds;
}

function findWorkspaceModulesPackages(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const packages = [];

  function traverse(currentPath) {
    const packageJsonPath = path.join(currentPath, "package.json");

    if (fs.existsSync(packageJsonPath) && fs.statSync(packageJsonPath).isFile()) {
      packages.push(path.relative(targetDir, currentPath).replace(/\\/g, "/"));
      return;
    }

    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        traverse(path.join(currentPath, entry.name));
      }
    }
  }

  traverse(dir);
  return packages.sort();
}

function buildDockerWorkspaceYaml(catalog, allowBuilds, packageDirs) {
  let yaml = "packages:\n";

  for (const pkgDir of packageDirs) {
    const escapedDir = pkgDir.replace(/'/g, "''");
    yaml += `  - '${escapedDir}'\n`;
  }

  if (Object.keys(allowBuilds).length > 0) {
    yaml += "allowBuilds:\n";
    for (const [name, value] of Object.entries(allowBuilds)) {
      const quotedName = JSON.stringify(name);
      yaml += `  ${quotedName}: ${value}\n`;
    }
  }

  yaml += "catalog:\n";
  for (const [name, version] of Object.entries(catalog)) {
    const quotedName = JSON.stringify(name);
    yaml += `  ${quotedName}: "${version}"\n`;
  }

  return yaml;
}

function restoreWorkspaceDependencies(dir) {
  const depTypes = ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"];
  let updatedCount = 0;

  function traverse(currentPath) {
    const packageJsonPath = path.join(currentPath, "package.json");

    if (fs.existsSync(packageJsonPath) && fs.statSync(packageJsonPath).isFile()) {
      const content = fs.readFileSync(packageJsonPath, "utf-8");
      const pkg = JSON.parse(content);
      let changed = false;

      for (const depType of depTypes) {
        if (!pkg[depType]) continue;

        for (const [pkgName, version] of Object.entries(pkg[depType])) {
          if (typeof version === "string" && version.startsWith("file:./workspace_modules/")) {
            pkg[depType][pkgName] = "workspace:*";
            console.log(`  ✏️  ${packageJsonPath}: ${pkgName} → workspace:*`);
            changed = true;
            updatedCount++;
          }
        }
      }

      if (changed) {
        fs.writeFileSync(packageJsonPath, `${JSON.stringify(pkg, null, 2)}\n`, "utf-8");
      }
      return;
    }

    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        traverse(path.join(currentPath, entry.name));
      }
    }
  }

  traverse(dir);
  console.log(`📝 Restored ${updatedCount} workspace:* references`);
}