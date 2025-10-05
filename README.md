# blogastroboot CLI

## Introduction

`blogastroboot` est une CLI puissante pour générer et maintenir facilement des projets de blog basés sur Astro, intégrant un contexte Claude pour une meilleure organisation et extensibilité.

---

## Installation

Pour installer la CLI globalement sur votre machine :

pnpm link --global

Cela vous permettra d'utiliser la commande `blogastroboot` (et ses alias).

---

## Commandes

### init (alias `i`)

Initialise un nouveau projet de blog depuis le dépôt distant.

```bash
blogastroboot init <nom-du-projet> [options]
# ou
blogastroboot i <nom-du-projet> [options]
# ou
bab init <nom-du-projet> [options]
```

**Options disponibles :**

- `-b, --branch <branche>` : Spécifie la branche du dépôt starter à utiliser (défaut: `main`)

**Exemples :**

```bash
# Utilise la branche main par défaut
bab init mon-blog

# Utilise une branche spécifique
bab init mon-blog --branch develop
bab init mon-blog -b astro-starter
```

**Processus :**

- Clone le projet starter depuis GitHub
- Crée un nouveau dossier avec le nom fourni
- Copie et filtre les fichiers du starter (incluant le dossier `.claude`)
- Personnalise le `package.json` avec le nom et l'auteur
- Installe les dépendances via `pnpm install --no-frozen-lockfile`
- Initialise un dépôt Git avec un commit initial
- Affiche la commande pour lancer le projet en mode développement

---

### update (alias `u`)

Met à jour le dossier `.claude` du projet depuis le dépôt distant.

```bash
blogastroboot update [options]
# ou
blogastroboot u [options]
# ou
bab update [options]
```

**Options disponibles :**

- `-b, --branch <branche>` : Branche à utiliser du dépôt starter (défaut: `main`)
- `-s, --source <repo>` : URL du dépôt source alternatif

**Exemples :**

```bash
# Met à jour depuis la branche main
bab update

# Met à jour depuis une branche spécifique
bab update --branch develop

# Met à jour depuis un dépôt alternatif
bab update --source https://github.com/autre-dev/mon-fork.git

# Combinaison source + branche
bab update --source autre-repo.git --branch feature/new-theme
```

**Processus :**

- Clone temporairement le dépôt distant
- Remplace intégralement le dossier `.claude` du projet
- Ne modifie pas les autres fichiers du projet
- Nettoie automatiquement les fichiers temporaires

---

## Structure des dossiers

```
ROOT/
├── package.json             # racine (outil global + devtools)
├── pnpm-workspace.yaml     # workspace PNPM
└── packages/
    └── cli/                # package CLI (autonome)
        ├── bin/            # exécutables (blogastroboot, bab)
        ├── src/
        │   ├── commands/   # commandes init et update
        │   ├── generators/ # logique de génération de projet
        │   └── utils/      # utilitaires (Git, prompts, erreurs)
        └── package.json
```

**Note :** Le starter n'est plus inclus localement. Il est récupéré à la demande depuis le dépôt distant `https://github.com/kevpdev/mon-blog-astro-starter-blog.git`.

---

## Architecture technique

### 🛠️ Technologies et outils utilisés

| Outil            | Version | Rôle                                                         |
| ---------------- | ------- | ------------------------------------------------------------ |
| **Commander.js** | ^14.0.1 | Framework CLI principal - gestion des commandes et arguments |
| **Inquirer.js**  | ^12.9.6 | Prompts interactifs - saisie utilisateur avancée             |
| **Ora**          | ^9.0.0  | Spinners et indicateurs de progression                       |
| **Chalk**        | ^5.6.2  | Couleurs et formatage terminal                               |
| **Simple-git**   | ^3.28.0 | Opérations Git - clone, validation des dépôts                |
| **Execa**        | ^9.6.0  | Exécution de commandes système                               |
| **fs-extra**     | ^11.3.2 | Manipulation avancée du système de fichiers                  |

### 🔄 Fonctionnement du CLI

#### Récupération du projet distant

1. **Validation** : Vérifie l'existence du dépôt et de la branche
2. **Clonage optimisé** : `git clone --depth 1 --single-branch` pour rapidité
3. **Dossier temporaire** : Clone dans `/tmp/blogastroboot-{timestamp}`
4. **Filtrage intelligent** : Exclut `node_modules`, `.git`, lockfiles, etc.
5. **Nettoyage automatique** : Supprime les fichiers temporaires

#### Workflow de génération

```
Commande → Validation → Clone temp → Copie filtrée → Config projet → Install deps → Init Git → Nettoyage
```

#### Gestion des branches

Le CLI supporte plusieurs branches du dépôt starter :

- **main** : Version stable de production
- **develop** : Dernières fonctionnalités
- **astro-starter** : Starter Astro standard
- **starter-with-context** : Avec contexte Claude étendu

#### Interface utilisateur

- **Prompts intelligents** : Saisie guidée avec validation
- **Feedback visuel** : Spinners animés pendant les opérations
- **Messages colorés** : Succès ✅, erreurs ❌, infos 📝
- **Gestion d'erreurs** : Messages clairs avec suggestions d'actions

---

## Dépôt starter distant

### 📍 Configuration

- **Dépôt principal** : `https://github.com/kevpdev/mon-blog-astro-starter-blog.git`
- **Branche par défaut** : `main`
- **Branches disponibles** : `main`, `develop`, `astro-starter`, `starter-with-context`, etc.

### 🔄 Avantages

- **Toujours à jour** : Récupère la dernière version du starter
- **Flexibilité** : Choix de la branche selon les besoins
- **Légèreté** : CLI autonome sans starter local
- **Sources alternatives** : Possibilité d'utiliser des forks

---

## Personnalisation

- Ne modifiez **pas** directement `.claude` ; il sera écrasé lors des mises à jour.
- Placez toutes vos règles spécifiques dans le fichier `claude.md` à la racine du projet.
- Pour des changements avancés, modifiez le starter dans le dépôt distant puis mettez à jour le projet.

---

## Raccourcis et alias

| Commande               | Alias | Description                      |
| ---------------------- | ----- | -------------------------------- |
| `blogastroboot init`   | `i`   | Initialise un nouveau projet     |
| `blogastroboot update` | `u`   | Met à jour le contexte `.claude` |
| `bab init`             | `i`   | Initialise un nouveau projet     |
| `bab update`           | `u`   | Met à jour le contexte `.claude` |

---

## Conseils d’utilisation

- Toujours utiliser `init` pour créer un nouveau projet propre.
- Faire régulièrement `update` pour récupérer les nouveautés du starter.
- Tenir à jour `claude.md` avec vos règles personnalisées.
- Utiliser PNPM directement pour ajouter ou mettre à jour des dépendances :

pnpm add <package-name>

---

## Support

Pour toute question ou assistance, consultez la documentation ou contactez l’équipe technique.

---

_Ce document est généré pour accompagner la CLI_ `blogastroboot` _et faciliter la prise en main par les utilisateurs._
