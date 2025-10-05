import chalk from "chalk";

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

export function handleError(error) {
  console.error();

  if (error instanceof NetworkError) {
    console.error(chalk.red("🌐 Erreur de réseau"));
    console.error(chalk.red(error.message));
    console.error(chalk.yellow("💡 Suggestions:"));
    console.error(chalk.yellow("  - Vérifiez votre connexion internet"));
    console.error(chalk.yellow("  - Vérifiez que le dépôt est accessible"));
    console.error(chalk.yellow(`  - Testez l'URL: ${error.repoUrl}`));
  } else if (error instanceof RepositoryError) {
    console.error(chalk.red("📦 Erreur de dépôt"));
    console.error(chalk.red(error.message));
    console.error(chalk.yellow("💡 Suggestions:"));
    console.error(chalk.yellow("  - Vérifiez que l'URL du dépôt est correcte"));
    console.error(
      chalk.yellow("  - Assurez-vous d'avoir les permissions d'accès"),
    );
    console.error(chalk.yellow(`  - URL utilisée: ${error.repoUrl}`));
  } else if (error instanceof BranchError) {
    console.error(chalk.red("🌿 Erreur de branche"));
    console.error(chalk.red(error.message));
    console.error(chalk.yellow("💡 Suggestions:"));
    console.error(
      chalk.yellow(`  - Vérifiez que la branche '${error.branch}' existe`),
    );
    console.error(
      chalk.yellow("  - Utilisez --branch main pour la branche principale"),
    );
    console.error(
      chalk.yellow(
        "  - Listez les branches disponibles avec: git ls-remote --heads",
      ),
    );
  } else if (error instanceof ClaudeError) {
    console.error(chalk.red("🤖 Erreur Claude"));
    console.error(chalk.red(error.message));
    console.error(chalk.yellow("💡 Suggestions:"));
    console.error(
      chalk.yellow(
        "  - Exécutez `blogastroboot init` d'abord pour créer un projet",
      ),
    );
    console.error(
      chalk.yellow("  - Vérifiez que vous êtes dans un projet BlogAstroBoot"),
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
