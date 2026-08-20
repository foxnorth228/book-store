import { readProjectConfiguration, Tree } from "@nx/devkit";
import { createTreeWithEmptyWorkspace } from "@nx/devkit/testing";

import { moduleGeneratorGenerator } from "./module-generator";
import { ModuleGeneratorGeneratorSchema } from "./schema";

describe("module-generator generator", () => {
  let tree: Tree;
  const options: ModuleGeneratorGeneratorSchema = { name: "test" };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it("should run successfully", async () => {
    await moduleGeneratorGenerator(tree, options);
    const config = readProjectConfiguration(tree, "test");
    expect(config).toBeDefined();
  });
});
