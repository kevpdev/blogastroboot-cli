# 🚀 Tutoriel complet : Créer un CLI avec récupération de projet distant

## 📋 Table des matières

1. [Introduction et concepts](#introduction)
2. [Setup initial du projet](#setup-initial)
3. [Installation des dépendances](#installation-dependances)
4. [Configuration du point d'entrée CLI](#point-entree-cli)
5. [Création des utilitaires](#creation-utilitaires)
6. [Implémentation de la commande init](#commande-init)
7. [Implémentation de la commande update](#commande-update)
8. [Générateur de projet](#generateur-projet)
9. [Tests et debugging](#tests-debugging)
10. [Packaging et distribution](#packaging-distribution)

---

## 🎯 Introduction {#introduction}

### Concept du CLI

Nous allons créer un CLI moderne qui :

- **Clone un projet starter** depuis un dépôt GitHub distant
- **Génère de nouveaux projets** personnalisés
- **Met à jour la configuration Claude** depuis le dépôt distant
- **Supporte plusieurs branches** et sources alternatives
- **Offre une UX moderne** avec spinners, couleurs et prompts interactifs

### Architecture finale

```
blogastroboot-cli/
├── bin/
│   └── blogastroboot.js           # Point d'entrée CLI
├── src/
│   ├── commands/                  # Commandes init/update
│   ├── generators/                # Logique génération projet
│   └── utils/                     # Utilitaires (Git, prompts, erreurs)
├── package.json                   # Configuration CLI
├── README.md                      # Documentation
└── tuto.md                        # Ce tutoriel
```

### Technologies utilisées

| Technologie      | Rôle                    | Pourquoi                              |
| ---------------- | ----------------------- | ------------------------------------- |
| **Commander.js** | Framework CLI principal | Standard industrie, parsing arguments |
| **Inquirer.js**  | Prompts interactifs     | UX moderne, validation                |
| **Ora**          | Spinners progression    | Feedback visuel                       |
| **Chalk**        | Couleurs terminal       | Lisibilité, état visuel               |
| **Simple-git**   | Opérations Git          | Clone optimisé, validation            |
| **Execa**        | Commandes système       | Exécution robuste                     |
| **fs-extra**     | Manipulation fichiers   | API moderne, promisifiée              |

---

## 🏗️ Setup initial du projet {#setup-initial}

### Étape 1 : Initialisation

```bash
# Créer le dossier principal
mkdir blogastroboot-cli
cd blogastroboot-cli

# Initialiser le projet root
npm init -y
```

### Étape 2 : Configuration workspace

**`package.json` (racine)**

```json
{
  "name": "blogastroboot-cli",
  "private": true,
  "scripts": {
    "lint": "eslint .",
    "test": "vitest",
    "format": "prettier --write ."
  },
  "devDependencies": {
    "eslint": "^9.36.0",
    "husky": "^9.1.7",
    "prettier": "^3.6.2",
    "vitest": "^3.2.4"
  },
  "packageManager": "pnpm@10.15.0"
}
```

**`pnpm-workspace.yaml`**

```yaml
packages:
  - "packages/*"
```

### Étape 3 : Structure CLI

```bash
# Créer la structure
mkdir -p packages/cli/{bin,src/{commands,generators,utils}}
```

**`packages/cli/package.json`**

```json
{
  "name": "@blogastroboot/cli",
  "version": "1.0.0",
  "description": "CLI pour générer des projets blog Astro",
  "type": "module",
  "bin": {
    "blogastroboot": "bin/blogastroboot.js",
    "bab": "bin/blogastroboot.js"
  },
  "scripts": {
    "dev": "node bin/blogastroboot.js",
    "test": "vitest",
    "lint": "eslint src/",
    "format": "prettier --write ."
  },
  "keywords": ["cli", "astro", "blog", "starter"],
  "author": "Votre Nom",
  "license": "MIT"
}
```

**⚠️ Points critiques :**

- `"type": "module"` : Obligatoire pour ESM
- `bin` : Définit les commandes globales disponibles
- Alias `bab` pour raccourci

---

## 📦 Installation des dépendances {#installation-dependances}

### Étape 1 : Dépendances CLI

```bash
cd packages/cli

# Framework CLI et interface
pnpm add commander@^14.0.1
pnpm add inquirer@^12.9.6
pnpm add ora@^9.0.0
pnpm add chalk@^5.6.2

# Opérations système et Git
pnpm add simple-git@^3.28.0
pnpm add execa@^9.6.0
pnpm add fs-extra@^11.3.2

# Template engine (optionnel)
pnpm add ejs@^3.1.10
```

### Étape 2 : Dev dependencies

```bash
# Tools de développement
pnpm add -D eslint@^9.36.0 prettier@^3.6.2 vitest@^3.2.4
```

### Étape 3 : Vérification

**`packages/cli/package.json` final**

```json
{
  "dependencies": {
    "chalk": "^5.6.2",
    "commander": "^14.0.1",
    "ejs": "^3.1.10",
    "execa": "^9.6.0",
    "fs-extra": "^11.3.2",
    "inquirer": "^12.9.6",
    "ora": "^9.0.0",
    "simple-git": "^3.28.0"
  }
}
```

**💡 Tips :**

- Utilisez les versions exactes pour la reproductibilité
- Simple-git est plus robuste que les commandes git directes
- Execa est plus sûr que child_process natif

---

## 🎯 Configuration du point d'entrée CLI {#point-entree-cli}

### Étape 1 : Point d'entrée principal

**`packages/cli/bin/blogastroboot.js`**

```javascript
#!/usr/bin/env node

import { program } from "commander";
import initCmd from "../src/commands/init.js";
import updateCmd from "../src/commands/update.js";

// Configuration principale du CLI
program
  .name("blogastroboot")
  .description("CLI BlogAstroBoot - Générateur de projets blog Astro")
  .version("1.0.0");

// Ajout des sous-commandes
program.addCommand(initCmd).addCommand(updateCmd);

// Parsing et exécution
await program.parseAsync(process.argv);
```

### Étape 2 : Test basique

```bash
# Tester le CLI
node bin/blogastroboot.js --help

# Sortie attendue :
# Usage: blogastroboot [options] [command]
# CLI BlogAstroBoot - Générateur de projets blog Astro
# ...
```

**🔧 Debugging :**

- Si erreur de permission : `chmod +x bin/blogastroboot.js`
- Si erreur ESM : Vérifier `"type": "module"` dans package.json
- Si imports échouent : Vérifier l'extension `.js` dans les imports

---

## 🛠️ Création des utilitaires {#creation-utilitaires}

### Étape 1 : Constants

**`packages/cli/src/utils/constants.js`**

```javascript
// Configuration du dépôt starter distant
export const STARTER_REPO =
  "https://github.com/kevpdev/mon-blog-astro-starter-blog.git";
export const DEFAULT_BRANCH = "main";
export const TEMP_DIR_PREFIX = "blogastroboot-";
export const CLAUDE_FOLDER = ".claude";

// Configuration CLI
export const CLI_NAME = "BlogAstroBoot";
export const CLI_VERSION = "1.0.0";
```

### Étape 2 : Utilitaires Git

**`packages/cli/src/utils/git.js`**

```javascript
import { simpleGit } from "simple-git";
import fs from "fs-extra";
import path from "path";
import os from "os";
import { TEMP_DIR_PREFIX } from "./constants.js";

/**
 * Crée un dossier temporaire unique
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
    console.warn(`⚠️  Impossible de nettoyer : ${dir}`);
  }
}

/**
 * Valide qu'un dépôt et une branche existent
 */
export async function validateRepository(repoUrl, branch = "main") {
  try {
    const git = simpleGit();
    const remoteRefs = await git.listRemote([repoUrl]);

    const branchExists = remoteRefs.includes(`refs/heads/${branch}`);
    if (!branchExists) {
      throw new Error(`La branche '${branch}' n'existe pas dans ${repoUrl}`);
    }

    return true;
  } catch (error) {
    if (error.message.includes("not found")) {
      throw new Error(`Dépôt inaccessible : ${repoUrl}`);
    }
    throw error;
  }
}

/**
 * Clone un dépôt de manière optimisée
 */
export async function cloneRepository(
  repoUrl,
  branch = "main",
  targetDir = null,
) {
  const tempDir = targetDir || (await createTempDir());

  try {
    const git = simpleGit();

    // Clone optimisé : seulement la branche, dernier commit
    await git.clone(repoUrl, tempDir, [
      "--depth",
      "1", // Seulement le dernier commit
      "--branch",
      branch, // Branche spécifique
      "--single-branch", // Ignore les autres branches
    ]);

    return tempDir;
  } catch (error) {
    // Nettoyage en cas d'erreur
    if (!targetDir) {
      await cleanupTempDir(tempDir);
    }

    if (error.message.includes("not found")) {
      throw new Error(`Impossible de cloner ${repoUrl}`);
    }

    if (error.message.includes(`Remote branch ${branch} not found`)) {
      throw new Error(`Branche '${branch}' introuvable dans ${repoUrl}`);
    }

    throw error;
  }
}

/**
 * Liste les branches disponibles d'un dépôt
 */
export async function listRemoteBranches(repoUrl) {
  try {
    const git = simpleGit();
    const remoteRefs = await git.listRemote([repoUrl]);

    return remoteRefs
      .split("\n")
      .filter((line) => line.includes("refs/heads/"))
      .map((line) => line.split("refs/heads/")[1])
      .filter((branch) => branch && branch.trim())
      .sort();
  } catch (error) {
    throw new Error(`Impossible de lister les branches : ${error.message}`);
  }
}
```

### Étape 3 : Gestion des prompts

**`packages/cli/src/utils/prompts.js`**

```javascript
import inquirer from "inquirer";
import { DEFAULT_BRANCH } from "./constants.js";

/**
 * Collecte les informations du projet via prompts interactifs
 */
export async function promptProjectInfo(name, branch) {
  const questions = [];

  // Nom du projet si non fourni
  if (!name) {
    questions.push({
      type: "input",
      name: "name",
      message: "Nom du projet :",
      validate: (input) => input.trim() !== "" || "Le nom est requis",
    });
  }

  // Auteur
  questions.push({
    type: "input",
    name: "author",
    message: "Auteur (optionnel) :",
    default: () => process.env.USER || process.env.USERNAME || "Anonymous",
  });

  // Branche si non spécifiée
  if (!branch) {
    questions.push({
      type: "input",
      name: "branch",
      message: "Branche du starter à utiliser :",
      default: DEFAULT_BRANCH,
    });
  }

  // Initialisation Git
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

/**
 * Gestion des conflits de fichiers
 */
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
```

### Étape 4 : Gestion d'erreurs

**`packages/cli/src/utils/errors.js`**

```javascript
import chalk from "chalk";

// Classes d'erreurs spécialisées
export class NetworkError extends Error {
  constructor(message, repoUrl) {
    super(message);
    this.name = "NetworkError";
    this.repoUrl = repoUrl;
  }
}

export class RepositoryError extends Error {
  constructor(message, repoUrl) {
    super(message);
    this.name = "RepositoryError";
    this.repoUrl = repoUrl;
  }
}

export class BranchError extends Error {
  constructor(message, branch, repoUrl) {
    super(message);
    this.name = "BranchError";
    this.branch = branch;
    this.repoUrl = repoUrl;
  }
}

export class ClaudeError extends Error {
  constructor(message, projectPath) {
    super(message);
    this.name = "ClaudeError";
    this.projectPath = projectPath;
  }
}

/**
 * Gestionnaire central d'erreurs avec messages colorés
 */
export function handleError(error) {
  console.error();

  if (error instanceof NetworkError) {
    console.error(chalk.red("🌐 Erreur de réseau"));
    console.error(chalk.red(error.message));
    console.error(chalk.yellow("💡 Suggestions :"));
    console.error(chalk.yellow("  - Vérifiez votre connexion internet"));
    console.error(chalk.yellow("  - Vérifiez l'URL du dépôt"));
    console.error(chalk.yellow(`  - Testez : ${error.repoUrl}`));
  } else if (error instanceof RepositoryError) {
    console.error(chalk.red("📦 Erreur de dépôt"));
    console.error(chalk.red(error.message));
    console.error(chalk.yellow("💡 Suggestions :"));
    console.error(chalk.yellow("  - Vérifiez que l'URL est correcte"));
    console.error(chalk.yellow("  - Vérifiez vos permissions d'accès"));
    console.error(chalk.yellow(`  - URL : ${error.repoUrl}`));
  } else if (error instanceof BranchError) {
    console.error(chalk.red("🌿 Erreur de branche"));
    console.error(chalk.red(error.message));
    console.error(chalk.yellow("💡 Suggestions :"));
    console.error(chalk.yellow(`  - Vérifiez que '${error.branch}' existe`));
    console.error(
      chalk.yellow("  - Utilisez --branch main pour la principale"),
    );
    console.error(
      chalk.yellow("  - Listez les branches : git ls-remote --heads"),
    );
  } else if (error instanceof ClaudeError) {
    console.error(chalk.red("🤖 Erreur Claude"));
    console.error(chalk.red(error.message));
    console.error(chalk.yellow("💡 Suggestions :"));
    console.error(chalk.yellow("  - Exécutez `bab init` d'abord"));
    console.error(
      chalk.yellow("  - Vérifiez être dans un projet BlogAstroBoot"),
    );
  } else {
    console.error(chalk.red("❌ Erreur inattendue"));
    console.error(chalk.red(error.message));
    if (error.stack) {
      console.error(chalk.gray(error.stack));
    }
  }

  console.error();
  process.exit(1);
}
```

**🎯 Points clés :**

- **Classes d'erreurs spécialisées** : Différencient les types de problèmes
- **Messages colorés** : Améliorent la lisibilité
- **Suggestions contextuelles** : Aident l'utilisateur à résoudre
- **Gestion centralisée** : Un seul point de traitement des erreurs

---

## 🎮 Implémentation de la commande init {#commande-init}

### Étape 1 : Structure de la commande

**`packages/cli/src/commands/init.js`**

```javascript
import { Command } from "commander";
import { generateProject } from "../generators/project.js";
import { promptProjectInfo } from "../utils/prompts.js";
import { handleError } from "../utils/errors.js";

export default new Command("init")
  .argument("[name]", "Nom du projet à créer")
  .option("-b, --branch <branch>", "Branche du dépôt starter à utiliser")
  .alias("i")
  .description("Initialise un nouveau projet blog depuis le dépôt distant")
  .action(async (name, options) => {
    try {
      // 1. Collecte des informations
      const info = await promptProjectInfo(name, options.branch);

      // 2. Génération du projet
      await generateProject(info);

      // 3. Instructions finales
      console.log(`\n🚀 Projet créé ! Lancer avec :\n`);
      console.log(`cd ${info.name} && pnpm install && pnpm dev`);
    } catch (error) {
      handleError(error);
    }
  });
```

### Étape 2 : Test de la commande

```bash
# Test avec aide
node bin/blogastroboot.js init --help

# Test avec nom fourni
node bin/blogastroboot.js init mon-test

# Test avec branche
node bin/blogastroboot.js init mon-test --branch develop
```

**⚠️ Debugging :**

- Si `generateProject` non trouvé : Créer d'abord le générateur
- Si prompts non interactifs : Vérifier inquirer dans un vrai terminal
- Si erreurs de parsing : Vérifier la syntaxe Commander.js

---

## 🔄 Implémentation de la commande update {#commande-update}

### Étape 1 : Structure de la commande

**`packages/cli/src/commands/update.js`**

```javascript
import { Command } from "commander";
import { updateClaude } from "../generators/project.js";
import { DEFAULT_BRANCH } from "../utils/constants.js";
import { handleError } from "../utils/errors.js";

export default new Command("update")
  .alias("u")
  .description("Met à jour le contexte .claude depuis le dépôt distant")
  .option("-b, --branch <branch>", "Branche à utiliser", DEFAULT_BRANCH)
  .option("-s, --source <repo>", "URL du dépôt source alternatif")
  .action(async (options) => {
    try {
      await updateClaude(process.cwd(), options.branch, options.source);
      console.log("✅ Configuration Claude mise à jour");
    } catch (error) {
      handleError(error);
    }
  });
```

### Étape 2 : Exemples d'utilisation

```bash
# Mise à jour depuis main
bab update

# Depuis une branche spécifique
bab update --branch develop

# Depuis un dépôt alternatif
bab update --source https://github.com/autre/repo.git

# Combinaison
bab update --source autre-repo.git --branch feature/new
```

---

## 🏭 Générateur de projet {#generateur-projet}

### Étape 1 : Logique principale

**`packages/cli/src/generators/project.js`**

```javascript
import { execa } from "execa";
import fs from "fs-extra";
import path from "path";
import ora from "ora";
import { STARTER_REPO, CLAUDE_FOLDER } from "../utils/constants.js";
import { cloneRepository, cleanupTempDir } from "../utils/git.js";

/**
 * Génère un nouveau projet depuis le dépôt distant
 */
export async function generateProject({ name, author, branch, initGit }) {
  const target = path.resolve(process.cwd(), name);
  let tempDir = null;
  const spinner = ora("Téléchargement du starter...").start();

  try {
    // 1. Clone du dépôt distant
    tempDir = await cloneRepository(STARTER_REPO, branch);
    spinner.text = "Copie des fichiers...";

    // 2. Copie filtrée vers le projet cible
    await fs.copy(tempDir, target, {
      filter: (src) => {
        const basename = path.basename(src);
        // Exclure les fichiers/dossiers non nécessaires
        return ![
          "node_modules", // Dépendances (seront réinstallées)
          ".astro", // Cache build Astro
          "dist", // Artifacts de build
          "coverage", // Coverage tests
          ".git", // Historique Git du template
          ".vscode", // Config éditeur
          ".husky", // Git hooks
          "pnpm-lock.yaml", // Lockfile (sera régénéré)
          "yarn.lock", // Alternative lockfile
          ".npmrc", // Config npm locale
        ].includes(basename);
      },
    });

    // 3. Vérification du dossier .claude
    const srcClaude = path.join(tempDir, CLAUDE_FOLDER);
    const destClaude = path.join(target, CLAUDE_FOLDER);
    if (await fs.pathExists(srcClaude)) {
      await fs.copy(srcClaude, destClaude, { overwrite: true });
    }

    spinner.text = "Configuration du projet...";

    // 4. Personnalisation du package.json
    const pkgPath = path.join(target, "package.json");
    if (await fs.pathExists(pkgPath)) {
      const pkg = await fs.readJSON(pkgPath);
      pkg.name = name;
      pkg.author = author || "";
      // Supprimer les champs spécifiques au template
      delete pkg.private;
      await fs.writeJSON(pkgPath, pkg, { spaces: 2 });
    }

    spinner.text = "Installation des dépendances...";

    // 5. Installation des dépendances
    // IMPORTANT: --no-frozen-lockfile car pas de lockfile initial
    await execa("pnpm", ["install", "--no-frozen-lockfile"], {
      cwd: target,
      stdio: "inherit",
    });

    spinner.text = "Finalisation...";

    // 6. Initialisation Git si demandée
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
    // 7. Nettoyage du dossier temporaire
    if (tempDir) {
      await cleanupTempDir(tempDir);
    }
  }
}

/**
 * Met à jour le dossier .claude depuis le dépôt distant
 */
export async function updateClaude(projectDir, branch, sourceRepo = null) {
  const repoUrl = sourceRepo || STARTER_REPO;
  let tempDir = null;
  const spinner = ora("Téléchargement des mises à jour...").start();

  try {
    // 1. Clone temporaire
    tempDir = await cloneRepository(repoUrl, branch);

    const srcClaude = path.join(tempDir, CLAUDE_FOLDER);
    const destClaude = path.join(projectDir, CLAUDE_FOLDER);

    // 2. Vérifications
    if (!(await fs.pathExists(srcClaude))) {
      throw new Error(`Dossier ${CLAUDE_FOLDER} introuvable dans ${repoUrl}`);
    }
    if (!(await fs.pathExists(destClaude))) {
      throw new Error(
        `${CLAUDE_FOLDER} introuvable. Exécutez 'bab init' d'abord.`,
      );
    }

    spinner.text = "Mise à jour des fichiers...";

    // 3. Remplacement intégral
    await fs.remove(destClaude);
    await fs.copy(srcClaude, destClaude, { overwrite: true });

    spinner.succeed("Configuration Claude mise à jour !");
  } catch (error) {
    spinner.fail("Erreur lors de la mise à jour");
    throw error;
  } finally {
    // 4. Nettoyage
    if (tempDir) {
      await cleanupTempDir(tempDir);
    }
  }
}
```

### Étape 2 : Points critiques

**🔧 Filtrage des fichiers :**

- **Exclusions essentielles** : `node_modules`, `.git`, `dist`
- **Lockfiles** : Exclus car régénérés avec `--no-frozen-lockfile`
- **Cache** : `.astro`, `coverage` pour projets propres

**⚡ Optimisations :**

- **Clone shallow** : `--depth 1` économise 90% du temps
- **Spinners** : Feedback visuel pendant les opérations longues
- **Nettoyage automatique** : `finally` garantit la suppression des temporaires

**🚨 Gestion d'erreurs :**

- **Try/catch/finally** : Structure robuste
- **Validation préalable** : Vérification des prérequis
- **Messages spécifiques** : Erreurs contextuelles

---

## 🧪 Tests et debugging {#tests-debugging}

### Étape 1 : Tests manuels de base

```bash
# Test de création complète
cd /tmp
node /path/to/packages/cli/bin/blogastroboot.js init test-project

# Vérifications attendues :
# ✅ Dossier test-project créé
# ✅ Fichiers copiés (src/, package.json, etc.)
# ✅ node_modules installé
# ✅ .git initialisé (si choisi)
# ✅ pnpm-lock.yaml généré
```

### Étape 2 : Test des branches

```bash
# Lister les branches disponibles
git ls-remote --heads https://github.com/kevpdev/mon-blog-astro-starter-blog.git

# Tester différentes branches
bab init test-main --branch main
bab init test-develop --branch develop
```

### Étape 3 : Test de la commande update

```bash
# Dans un projet existant
cd test-project
bab update

# Avec options
bab update --branch develop
bab update --source https://github.com/autre/repo.git
```

### Étape 4 : Cas d'erreur courants

```bash
# Test branche inexistante
bab init test --branch inexistante
# → Devrait afficher erreur BranchError avec suggestions

# Test dépôt inaccessible
bab update --source https://github.com/repo/inexistant.git
# → Devrait afficher erreur NetworkError

# Test update hors projet
mkdir vide && cd vide
bab update
# → Devrait afficher erreur ClaudeError
```

### Étape 5 : Script de tests

**`packages/cli/test.js`**

```javascript
#!/usr/bin/env node

import { spawn } from "child_process";
import fs from "fs-extra";
import path from "path";

const CLI_PATH = path.resolve("bin/blogastroboot.js");
const TEST_DIR = "/tmp/cli-tests";

async function runTest(name, command, expectedFiles = []) {
  console.log(`🧪 Test: ${name}`);

  try {
    const result = spawn("node", [CLI_PATH, ...command.split(" ")], {
      cwd: TEST_DIR,
      stdio: "inherit",
    });

    await new Promise((resolve, reject) => {
      result.on("close", (code) => {
        if (code === 0) resolve();
        else reject(new Error(`Exit code: ${code}`));
      });
    });

    // Vérifier les fichiers attendus
    for (const file of expectedFiles) {
      const exists = await fs.pathExists(path.join(TEST_DIR, file));
      if (!exists) {
        throw new Error(`Fichier manquant: ${file}`);
      }
    }

    console.log(`✅ ${name} - Succès\n`);
  } catch (error) {
    console.log(`❌ ${name} - Échec: ${error.message}\n`);
  }
}

async function main() {
  // Préparation
  await fs.remove(TEST_DIR);
  await fs.ensureDir(TEST_DIR);

  // Tests
  await runTest("Création projet basique", "init test-basic", [
    "test-basic/package.json",
    "test-basic/src",
    "test-basic/.claude",
  ]);

  await runTest("Création avec branche", "init test-branch --branch main", [
    "test-branch/package.json",
  ]);

  console.log("🏁 Tests terminés");
}

main().catch(console.error);
```

**💡 Usage des tests :**

```bash
cd packages/cli
node test.js
```

---

## 📦 Packaging et distribution {#packaging-distribution}

### Étape 1 : Installation locale pour tests

```bash
# Depuis packages/cli
pnpm link --global

# Test des commandes globales
blogastroboot --help
bab --help

# Test dans un nouveau dossier
cd /tmp
bab init test-global
```

### Étape 2 : Préparation pour npm

**`packages/cli/package.json` final**

```json
{
  "name": "@blogastroboot/cli",
  "version": "1.0.0",
  "description": "CLI moderne pour générer des projets blog Astro avec contexte Claude",
  "main": "bin/blogastroboot.js",
  "type": "module",
  "bin": {
    "blogastroboot": "bin/blogastroboot.js",
    "bab": "bin/blogastroboot.js"
  },
  "files": ["bin/", "src/", "README.md"],
  "scripts": {
    "dev": "node bin/blogastroboot.js",
    "test": "node test.js",
    "prepublishOnly": "npm test"
  },
  "keywords": [
    "cli",
    "astro",
    "blog",
    "starter",
    "claude",
    "template",
    "generator"
  ],
  "author": "Votre Nom <votre@email.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/votre-user/blogastroboot-cli.git"
  },
  "bugs": {
    "url": "https://github.com/votre-user/blogastroboot-cli/issues"
  },
  "homepage": "https://github.com/votre-user/blogastroboot-cli#readme",
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### Étape 3 : README pour npm

**`packages/cli/README.md`**

````markdown
# @blogastroboot/cli

CLI moderne pour générer des projets blog Astro avec contexte Claude.

## Installation

```bash
npm install -g @blogastroboot/cli
# ou
pnpm add -g @blogastroboot/cli
```
````

## Usage

```bash
# Créer un nouveau projet
bab init mon-blog

# Avec une branche spécifique
bab init mon-blog --branch develop

# Mettre à jour le contexte Claude
bab update
```

## Fonctionnalités

- ✅ Clone depuis GitHub distant
- ✅ Support multi-branches
- ✅ Interface moderne avec spinners
- ✅ Gestion d'erreurs intelligente
- ✅ Installation optimisée des dépendances

## Licence

MIT

````

### Étape 4 : Publication

```bash
# Vérification avant publication
npm pack
# → Génère blogastroboot-cli-1.0.0.tgz

# Test d'installation depuis le package
npm install -g ./blogastroboot-cli-1.0.0.tgz

# Publication sur npm (si souhaité)
npm login
npm publish --access public
````

### Étape 5 : Distribution alternative

```bash
# Via GitHub Releases
git tag v1.0.0
git push origin v1.0.0

# Via pnpm
pnpm publish --access public

# Installation depuis Git
npm install -g git+https://github.com/user/blogastroboot-cli.git
```

---

## 🎯 Résumé et bonnes pratiques

### ✅ Checklist finale

- [ ] **Structure projet** : Workspace pnpm, ESM configuré
- [ ] **Dépendances** : Versions spécifiées, rôles clairs
- [ ] **Point d'entrée** : Shebang, Commander.js configuré
- [ ] **Utilitaires** : Git, prompts, erreurs modulaires
- [ ] **Commandes** : init et update fonctionnelles
- [ ] **Générateur** : Clone optimisé, filtrage, nettoyage
- [ ] **Tests** : Manuels et automatisés
- [ ] **Distribution** : Package.json complet, documentation

### 🔑 Points clés techniques

1. **ESM obligatoire** : `"type": "module"` + extensions `.js`
2. **Clone optimisé** : `--depth 1 --single-branch` pour rapidité
3. **Filtrage intelligent** : Exclusion node_modules, .git, caches
4. **Gestion temporaires** : Création unique + nettoyage garanti
5. **Frozen lockfile** : `--no-frozen-lockfile` pour premiers installs
6. **UX moderne** : Spinners, couleurs, messages contextuels

### 🚀 Extensions possibles

- **Templates multiples** : Support de plusieurs starters
- **Cache local** : Éviter les re-téléchargements
- **Configuration** : Fichier config pour dépôts par défaut
- **Plugins** : Système d'extensions
- **Updates automatiques** : Vérification de nouvelles versions

### 📚 Ressources utiles

- [Commander.js docs](https://github.com/tj/commander.js)
- [Inquirer.js examples](https://github.com/SBoudrias/Inquirer.js)
- [Simple-git API](https://github.com/steveukx/git-js)
- [Ora spinners](https://github.com/sindresorhus/ora)
- [npm CLI best practices](https://docs.npmjs.com/cli/v8)

---

🎉 **Félicitations !** Vous avez maintenant toutes les clés pour créer un CLI moderne et robuste avec récupération de projets distants. Ce tutoriel couvre tous les aspects essentiels, des concepts de base aux optimisations avancées.
