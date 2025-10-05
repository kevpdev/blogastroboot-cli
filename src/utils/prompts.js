import inquirer from "inquirer";
import { DEFAULT_BRANCH } from "./constants.js";

export async function promptProjectInfo(name, branch) {
  const questions = [];

  if (!name) {
    questions.push({
      type: "input",
      name: "name",
      message: "Nom du projet:",
      validate: (input) => input.trim() !== "" || "Le nom est requis",
    });
  }

  questions.push({
    type: "input",
    name: "author",
    message: "Auteur (optionnel):",
    default: () => process.env.USER || undefined,
  });

  if (!branch) {
    questions.push({
      type: "input",
      name: "branch",
      message: "Branche du starter à utiliser:",
      default: DEFAULT_BRANCH,
    });
  }

  questions.push({
    type: "confirm",
    name: "initGit",
    message: "Initialiser un dépôt Git ?",
    default: true,
  });

  const answers = await inquirer.prompt(questions);
  return {
    name: name || answers.name,
    author: answers.author,
    branch: branch || answers.branch || DEFAULT_BRANCH,
    initGit: answers.initGit,
  };
}

export async function promptConflict(file) {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: `Conflit sur ${file}. Que faire ?`,
      choices: [
        { name: "Écraser", value: "overwrite" },
        { name: "Ignorer", value: "skip" },
        { name: "Fusionner manuellement", value: "merge" },
      ],
    },
  ]);
  return action;
}
