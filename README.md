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

Initialise un nouveau projet de blog.

blogastroboot init <nom-du-projet>

ou
blogastroboot i <nom-du-projet>

- Crée un nouveau dossier avec le nom fourni.
- Copie les fichiers du starter (incluant le dossier `.claude` pour le contexte Claude).
- Personnalise le `package.json` avec le nom et l’auteur.
- Installe les dépendances via PNPM.
- Initialise un dépôt Git avec un commit initial.
- Affiche la commande pour lancer le projet en mode développement.

---

### update (alias `u`)

Met à jour le dossier `.claude` du projet depuis la dernière version du starter.

blogastroboot update

ou
blogastroboot u

- Remplace le dossier `.claude` du projet par celui du starter.
- Ne modifie pas les autres fichiers du projet.

---

## Structure des dossiers

ROOT/
├── package.json # racine (outil global + devtools)
├── pnpm-workspace.yaml # workspace PNPM avec packages cli et starter
├── packages/
│ ├── cli/ # package CLI (indépendant)
│ └── starter/ # package starter qui contient le code source du blog starter (indépendant)

---

## Personnalisation

- Ne modifiez **pas** directement `.claude` ; il sera écrasé lors des mises à jour.
- Placez toutes vos règles spécifiques dans le fichier `claude.md` à la racine du projet.
- Pour des changements avancés, modifiez le starter puis recréez ou mettez à jour le projet.

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
