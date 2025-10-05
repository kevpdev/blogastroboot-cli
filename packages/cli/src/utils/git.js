import { simpleGit } from "simple-git";
import fs from "fs-extra";
import path from "path";
import os from "os";
import { TEMP_DIR_PREFIX } from "./constants.js";

/**
 * Crée un dossier temporaire pour le clonage
 */
export async function createTempDir() {
  const tempDir = path.join(os.tmpdir(), `${TEMP_DIR_PREFIX}${Date.now()}`);
  await fs.ensureDir(tempDir);
  return tempDir;
}

/**
 * Nettoie le dossier temporaire
 */
export async function cleanupTempDir(dir) {
  try {
    await fs.remove(dir);
  } catch (error) {
    console.warn(`Impossible de nettoyer le dossier temporaire: ${dir}`);
  }
}

/**
 * Valide qu'un dépôt et une branche existent
 */
export async function validateRepository(repoUrl, branch = "main") {
  try {
    const git = simpleGit();

    // Vérifie que le dépôt existe en listant les branches distantes
    const remoteRefs = await git.listRemote([repoUrl]);

    // Vérifie que la branche existe
    const branchExists = remoteRefs.includes(`refs/heads/${branch}`);

    if (!branchExists) {
      throw new Error(
        `La branche '${branch}' n'existe pas dans le dépôt ${repoUrl}`,
      );
    }

    return true;
  } catch (error) {
    if (
      error.message.includes("not found") ||
      error.message.includes("does not exist")
    ) {
      throw new Error(
        `Le dépôt ${repoUrl} n'est pas accessible ou n'existe pas`,
      );
    }
    throw error;
  }
}

/**
 * Clone un dépôt dans un dossier temporaire
 */
export async function cloneRepository(
  repoUrl,
  branch = "main",
  targetDir = null,
) {
  const tempDir = targetDir || (await createTempDir());

  try {
    const git = simpleGit();

    // Clone avec depth 1 pour économiser la bande passante
    await git.clone(repoUrl, tempDir, [
      "--depth",
      "1",
      "--branch",
      branch,
      "--single-branch",
    ]);

    return tempDir;
  } catch (error) {
    // Nettoie en cas d'erreur
    if (!targetDir) {
      await cleanupTempDir(tempDir);
    }

    if (
      error.message.includes("not found") ||
      error.message.includes("does not exist")
    ) {
      throw new Error(
        `Impossible de cloner le dépôt ${repoUrl}. Vérifiez l'URL et la connectivité réseau.`,
      );
    }

    if (error.message.includes(`Remote branch ${branch} not found`)) {
      throw new Error(
        `La branche '${branch}' n'existe pas dans le dépôt ${repoUrl}`,
      );
    }

    throw new Error(`Erreur lors du clonage: ${error.message}`);
  }
}

/**
 * Liste les branches disponibles d'un dépôt distant
 */
export async function listRemoteBranches(repoUrl) {
  try {
    const git = simpleGit();
    const remoteRefs = await git.listRemote([repoUrl]);

    // Extrait les noms de branches des références
    const branches = remoteRefs
      .split("\n")
      .filter((line) => line.includes("refs/heads/"))
      .map((line) => line.split("refs/heads/")[1])
      .filter((branch) => branch && branch.trim())
      .sort();

    return branches;
  } catch (error) {
    throw new Error(
      `Impossible de lister les branches du dépôt ${repoUrl}: ${error.message}`,
    );
  }
}
