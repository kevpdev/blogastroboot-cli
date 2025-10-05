import { Command } from "commander";
import { generateProject } from "../generators/project.js";
import { promptProjectInfo } from "../utils/prompts.js";
import { handleError } from "../utils/errors.js";

export default new Command("init")
  .argument("[name]", "Nom du projet")
  .option("-b, --branch <branch>", "Branche à utiliser du dépôt starter")
  .alias("i")
  .action(async (name, options) => {
    try {
      const info = await promptProjectInfo(name, options.branch);
      await generateProject(info);
      console.log(`\n🚀 Projet créé ! Lancer avec :\n`);
      console.log(`cd ${info.name} && pnpm install && pnpm dev`);
    } catch (error) {
      handleError(error);
    }
  });
