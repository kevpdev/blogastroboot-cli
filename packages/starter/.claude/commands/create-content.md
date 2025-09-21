# Commande — Create Content

Processus complet de création et publication de contenu de qualité pour le blog Astro.

## Usage

```
/create-content [type] [title]
```

Types supportés : `blog`, `tutorial`, `veille`. Utiliser pour créer du contenu optimisé SEO et accessible.

## Actions

1. Analyser les contenus existants et tags populaires
2. Créer le plan de contenu structuré avec mots-clés cibles
3. Générer le fichier avec schema frontmatter correct (title, description, pubDate, tags)
4. Créer la structure de contenu avec template adapté au type
5. Optimiser les images (WebP, AVIF, sizes responsives)
6. Valider SEO et métadonnées (title 50-60 chars, description 140-160 chars)
7. Tester accessibilité et structure des headings
8. Valider le build et prévisualiser le rendu
9. Générer checklist de publication finale

## Exemples

**Entrée :**

```
/create-content tutorial "Guide Astro Components"
```

**Sortie attendue :**

```markdown
---
title: 'Guide Complet Astro Components : Maîtrisez les Bases'
description: 'Apprenez à créer et utiliser les composants Astro. Guide pratique avec exemples concrets et meilleures pratiques 2024.'
pubDate: '2024-12-11T10:00:00Z'
tags: ['astro', 'components', 'tutorial', 'web-development']
---

# Guide Complet Astro Components

## Introduction

[Hook engageant + problématique]

## Prérequis

- [Compétences requises]
- [Outils nécessaires]

## Solution étape par étape

...
```

## Notes

- Templates spécialisés par type (tutorial, veille, blog standard)
- Génération automatique de slug SEO-friendly
- Intégration native avec Content Collections Astro
- Optimisation images avec composant Astro:assets
- Validation WCAG 2.2 AA et Core Web Vitals
- Plan de promotion et suivi des métriques inclus
