# Commande — Bootstrap Quality

Configure l'environnement de développement complet avec outils de qualité pour projet Astro.

## Usage

```
/bootstrap-quality
```

Utiliser lors de l'initialisation d'un nouveau projet ou mise à niveau des standards qualité.

## Actions

1. Analyser la configuration actuelle (CLAUDE.md, package.json, fichiers de config)
2. Configurer ESLint avec support Astro, TypeScript et accessibilité
3. Configurer Prettier avec standards du projet
4. Activer TypeScript strict mode et vérifications avancées
5. Installer et configurer Husky + lint-staged pour hooks pre-commit
6. Ajouter scripts qualité au package.json (lint, format, typecheck, quality)
7. Valider chaque outil avec tests de fonctionnement
8. Générer documentation d'utilisation et plan de commits

## Exemples

**Entrée :**

```
Projet Astro basique sans configuration qualité
```

**Sortie attendue :**

```bash
# Installation dépendances
pnpm add -D eslint prettier typescript @typescript-eslint/parser
pnpm add -D husky lint-staged vitest @testing-library/dom

# Configuration générée
- eslint.config.js (support Astro + accessibilité)
- .prettierrc.json (standards projet)
- tsconfig.json (strict mode)
- .husky/pre-commit (validation automatique)

# Scripts ajoutés
"lint": "eslint . --ext .js,.ts,.astro"
"format": "prettier --write ."
"typecheck": "astro check"
"quality": "pnpm typecheck && pnpm lint && pnpm format:check"
```

## Notes

- Configuration idempotente (ne modifie pas les fichiers identiques)
- Utilise les templates canoniques de .claude/snippets/configs/
- Compatible Astro v5 + Node 24 + TypeScript strict
- Tests de validation automatiques après chaque configuration
- Plan de commits structuré pour traçabilité des changements
