import { Command } from "commander";
import { updateClaude } from "../generators/project.js";
import { DEFAULT_BRANCH } from "../utils/constants.js";
import { handleError } from "../utils/errors.js";

export default new Command("update")
  .alias("u")
  .description("Met à jour le contexte .claude depuis le starter")
  .option(
    "-b, --branch <branch>",
    "Branche à utiliser du dépôt starter",
    DEFAULT_BRANCH,
  )
  .option("-s, --source <repo>", "URL du dépôt source alternatif")
  .action(async (options) => {
    try {
      await updateClaude(process.cwd(), options.branch, options.source);
      console.log("✅ .claude mis à jour");
    } catch (error) {
      handleError(error);
    }
  });
