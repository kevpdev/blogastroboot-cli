import { Command } from 'commander';
import { updateClaude } from '../generators/project.js';

export default new Command('update')
  .alias('u')
  .description('Met à jour le contexte .claude depuis le starter')
  .action(async () => {
    await updateClaude(process.cwd());
    console.log('✅ .claude mis à jour');
  });
