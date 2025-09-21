import inquirer from 'inquirer';

export async function promptProjectInfo(name) {
  const questions = [];

  if (!name) {
    questions.push({
      type: 'input',
      name: 'name',
      message: 'Nom du projet:',
      validate: (input) => input.trim() !== '' || 'Le nom est requis',
    });
  }

  questions.push({
    type: 'input',
    name: 'author',
    message: 'Auteur (optionnel):',
    default: () => process.env.USER || undefined,
  });

  questions.push({
    type: 'confirm',
    name: 'initGit',
    message: 'Initialiser un dépôt Git ?',
    default: true,
  });

  const answers = await inquirer.prompt(questions);
  return {
    name: name || answers.name,
    author: answers.author,
    initGit: answers.initGit,
  };
}

export async function promptConflict(file) {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: `Conflit sur ${file}. Que faire ?`,
      choices: [
        { name: 'Écraser', value: 'overwrite' },
        { name: 'Ignorer', value: 'skip' },
        { name: 'Fusionner manuellement', value: 'merge' },
      ],
    },
  ]);
  return action;
}
