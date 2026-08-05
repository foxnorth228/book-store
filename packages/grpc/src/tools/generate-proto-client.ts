import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const workspaceRoot = path.resolve(process.cwd());
const projectRoot = path.resolve(path.join(workspaceRoot, process.argv[2]));
const contractsRoot = path.join(projectRoot, "src");

const services = fs
  .readdirSync(contractsRoot, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

function run(cmd: string) {
  execSync(cmd, { stdio: "inherit" });
}

function clearDir(dir: string) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  fs.mkdirSync(dir, { recursive: true });
}

for (const service of services) {
  const protoDir = path.join(contractsRoot, service, "grpc");
  const outDir = path.join(contractsRoot, service, "grpc-generated");

  if (!fs.existsSync(protoDir)) {
    console.warn(`[grpc-gen] Proto dir not found: ${service}`);
    continue;
  }

  clearDir(outDir);

  const protoFiles = fs
    .readdirSync(protoDir)
    .filter((f) => f.endsWith(".proto"))
    .map((f) => path.join(protoDir, f));

  if (protoFiles.length === 0) {
    console.warn(`[grpc-gen] No proto files in ${service}`);
    continue;
  }

  const cmd = [
    "protoc",
    `--plugin=protoc-gen-ts_proto=${path.join(
      workspaceRoot,
      "node_modules/.bin/protoc-gen-ts_proto",
    )}`,
    `--ts_proto_out=${outDir}`,
    "--ts_proto_opt=nestJs=false,outputServices=grpc-js,env=node,esModuleInterop=true",
    `--proto_path=${protoDir}`,
    ...protoFiles,
  ].join(" ");

  console.log(`[grpc-gen] generating ${service}`);
  run(cmd);
  console.log(`[grpc-gen] generated ${service}`);
}
