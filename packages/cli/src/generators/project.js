import { execa } from 'execa';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const starterDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../../starter'
);

export async function generateProject({ name, author, initGit }) {
  const target = path.resolve(process.cwd(), name);

  // 1. Copier tout le starter (inclut .claude et claude.md racine)
  await fs.copy(starterDir, target, {
    filter: (src) => {
      const b = path.basename(src);
      return ![
        'node_modules',
        '.astro',
        'dist',
        'coverage',
        '.git',
        '.vscode',
        '.husky',
        'pnpm-lock.yaml',
        'yarn.lock',
        '.npmrc',
      ].includes(b);
    },
  });

  // 2. Copier .claude du starter en doublon .claude dans le projet
  const srcClaude = path.join(starterDir, '.claude');
  const destClaude = path.join(target, '.claude');
  if (!(await fs.pathExists(srcClaude))) {
    throw new Error('Le dossier .claude est introuvable dans le starter');
  }
  await fs.copy(srcClaude, destClaude, { overwrite: true });

  // 3. Mettre à jour package.json
  const pkgPath = path.join(target, 'package.json');
  const pkg = await fs.readJSON(pkgPath);
  pkg.name = name;
  pkg.author = author || '';
  await fs.writeJSON(pkgPath, pkg, { spaces: 2 });

  // 4. Installer dépendances
  await execa('pnpm', ['install'], { cwd: target, stdio: 'inherit' });

  // 5. Initialiser Git si demandé
  if (initGit) {
    await execa('git', ['init'], { cwd: target });
    await execa('git', ['add', '.'], { cwd: target });
    await execa('git', ['commit', '-m', 'Initial commit'], { cwd: target });
  }
}

export async function updateClaude(projectDir) {
  const srcClaude = path.join(starterDir, '.claude');
  const destClaude = path.join(projectDir, '.claude');

  if (!(await fs.pathExists(srcClaude))) {
    throw new Error('Le dossier .claude est introuvable dans le starter');
  }
  if (!(await fs.pathExists(destClaude))) {
    throw new Error(
      '.claude introuvable dans le projet. Exécutez d’abord `init`.'
    );
  }

  // Remplacer intégralement le .claude du projet
  await fs.remove(destClaude);
  await fs.copy(srcClaude, destClaude, { overwrite: true });
}
