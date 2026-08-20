import { join } from "node:path";

import { formatFiles, generateFiles, names, readProjectConfiguration, Tree } from "@nx/devkit";

import { ModuleGeneratorSchema } from "./schema";

export default async function moduleGenerator(tree: Tree, options: ModuleGeneratorSchema) {
  const project = readProjectConfiguration(tree, options.project);

  if (!project) {
    throw new Error(`Project "${options.project}" not found`);
  }

  const moduleNames = names(options.name);

  const modulePath = join(project.root, "src", "modules", moduleNames.fileName);

  generateFiles(tree, join(__dirname, "files"), modulePath, {
    ...moduleNames,
  });

  await formatFiles(tree);
}
