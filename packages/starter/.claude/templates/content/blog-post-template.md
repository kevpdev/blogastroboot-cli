# Template d'article de blog

## Utilisation

Copier ce template dans `src/content/blog/` et renommer avec le slug de l'article.

## Template

````markdown
---
title: "Titre accrocheuse de l'article"
description: 'Description courte et SEO-friendly (150-160 caractères max)'
pubDate: 2024-MM-DD
updatedDate: 2024-MM-DD # Optionnel, pour les mises à jour
heroImage: '/images/hero/nom-article.jpg' # Optionnel, image hero
tags: ['tag1', 'tag2', 'tag3'] # 2-5 tags recommandés
author: 'AuthorName' # Optionnel, utilise AUTHOR_CONFIG.name par défaut
---

# Titre de l'article

## Introduction

Paragraphe d'introduction qui :

- Présente le problème/sujet
- Explique pourquoi c'est important
- Annonce ce que le lecteur va apprendre

## Section principale 1

### Sous-section (optionnel)

Contenu détaillé avec :

- Explications claires
- Exemples concrets
- Code si applicable :

```typescript
// Exemple de code
function example() {
  return 'Hello World!';
}
```
````

## Section principale 2

Continue le développement du sujet...

## Conclusion

- Résumé des points clés
- Call-to-action ou prochaines étapes
- Encouragement à l'engagement (commentaires, partages)

---

_Publié le {pubDate} par {author}_

```

## Bonnes pratiques

### Frontmatter
- **title** : 50-60 caractères, descriptif et accrocheur
- **description** : 150-160 caractères pour le SEO
- **pubDate** : Format YYYY-MM-DD obligatoire
- **updatedDate** : Uniquement si mise à jour majeure
- **heroImage** : 1200x630px recommandé, format WebP de préférence
- **tags** : 2-5 tags, cohérents avec les articles existants
- **author** : Optionnel, fallback sur configuration par défaut

### Structure
- **Titre H1** unique (même que frontmatter title)
- **Sections H2** pour structurer le contenu
- **Sous-sections H3** si nécessaire
- **Introduction engageante** qui pose le problème
- **Conclusion actionnable** avec call-to-action

### SEO
- Utiliser les mots-clés naturellement
- Structure claire avec titres hiérarchisés
- Images avec texte alt descriptif
- Liens internes vers d'autres articles pertinents

### Style
- Phrases courtes et claires
- Exemples concrets
- Code formaté avec coloration syntaxique
- Listes à puces pour la lisibilité
```
