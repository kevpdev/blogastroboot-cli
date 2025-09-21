import { Command } from 'commander';
import { generateProject } from '../generators/project.js';
import { promptProjectInfo } from '../utils/prompts.js';

export default new Command('init')
  .argument('[name]', 'Nom du projet')
  .alias('i')
  .action(async (name) => {
    const info = await promptProjectInfo(name);
    await generateProject(info);
    console.log(`\n🚀 Projet créé ! Lancer avec :\n`);
    console.log(`cd ${info.name} && pnpm install && pnpm dev`);
  });
