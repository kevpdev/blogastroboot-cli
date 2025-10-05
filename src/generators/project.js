import { execa } from "execa";
import fs from "fs-extra";
import ora from "ora";
import path from "path";
import { CLAUDE_FOLDER, STARTER_REPO } from "../utils/constants.js";
import { cleanupTempDir, cloneRepository } from "../utils/git.js";

export async function generateProject({ name, author, branch, initGit }) {
  const target = path.resolve(process.cwd(), name);
  let tempDir = null;
  const spinner = ora("Téléchargement du starter...").start();

  try {
    // 1. Cloner le dépôt starter
    tempDir = await cloneRepository(STARTER_REPO, branch);
    spinner.text = "Copie des fichiers...";

    // 2. Copier tout le starter (inclut .claude et claude.md racine)
    await fs.copy(tempDir, target, {
      filter: (src) => {
        const b = path.basename(src);
        return ![
          "node_modules",
          ".astro",
          "dist",
          "coverage",
          ".git",
          ".vscode",
          ".husky",
          "pnpm-lock.yaml",
          "yarn.lock",
          ".npmrc",
        ].includes(b);
      },
    });

    // 3. S'assurer que .claude existe dans le projet
    const srcClaude = path.join(tempDir, CLAUDE_FOLDER);
    const destClaude = path.join(target, CLAUDE_FOLDER);
    if (await fs.pathExists(srcClaude)) {
      await fs.copy(srcClaude, destClaude, { overwrite: true });
    }

    spinner.text = "Configuration du projet...";

    // 4. Mettre à jour package.json
    const pkgPath = path.join(target, "package.json");
    const pkg = await fs.readJSON(pkgPath);
    pkg.name = name;
    pkg.author = author || "";
    await fs.writeJSON(pkgPath, pkg, { spaces: 2 });

    spinner.text = "Installation des dépendances...";
    // 5. Installer dépendances
    await execa("pnpm", ["install", "--no-frozen-lockfile"], {
      cwd: target,
      stdio: "inherit",
    });

    spinner.text = "Finalisation...";
    // 6. Initialiser Git si demandé
    if (initGit) {
      await execa("git", ["init"], { cwd: target });
      await execa("git", ["add", "."], { cwd: target });
      await execa("git", ["commit", "-m", "Initial commit"], { cwd: target });
    }

    spinner.succeed(`Projet ${name} créé avec succès !`);
  } catch (error) {
    spinner.fail("Erreur lors de la création du projet");
    throw error;
  } finally {
    // 7. Nettoyer le dossier temporaire
    if (tempDir) {
      await cleanupTempDir(tempDir);
    }
  }
}

export async function updateClaude(projectDir, branch, sourceRepo = null) {
  const repoUrl = sourceRepo || STARTER_REPO;
  let tempDir = null;
  const spinner = ora("Téléchargement des mises à jour Claude...").start();

  try {
    // 1. Cloner le dépôt
    tempDir = await cloneRepository(repoUrl, branch);

    const srcClaude = path.join(tempDir, CLAUDE_FOLDER);
    const destClaude = path.join(projectDir, CLAUDE_FOLDER);

    if (!(await fs.pathExists(srcClaude))) {
      throw new Error(
        `Le dossier ${CLAUDE_FOLDER} est introuvable dans le dépôt ${repoUrl}`,
      );
    }
    if (!(await fs.pathExists(destClaude))) {
      throw new Error(
        `${CLAUDE_FOLDER} introuvable dans le projet. Exécutez d'abord \`init\`.`,
      );
    }

    spinner.text = "Mise à jour des fichiers Claude...";
    // 2. Remplacer intégralement le .claude du projet
    await fs.remove(destClaude);
    await fs.copy(srcClaude, destClaude, { overwrite: true });

    spinner.succeed("Configuration Claude mise à jour avec succès !");
  } catch (error) {
    spinner.fail("Erreur lors de la mise à jour Claude");
    throw error;
  } finally {
    // 3. Nettoyer le dossier temporaire
    if (tempDir) {
      await cleanupTempDir(tempDir);
    }
  }
}
