# Snippets — Schemas Frontmatter

Schémas de validation pour les Content Collections Astro.

## Blog Post Schema

```typescript
import { defineCollection, z } from 'astro:content';

const blogSchema = z.object({
  title: z.string().max(60, 'Title must be 60 characters or less'),
  description: z.string().min(120).max(160, 'Description must be 120-160 characters'),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  author: z.string().default('Default Author'),
  category: z.enum(['tutorial', 'guide', 'news', 'review']).optional(),
});

export const collections = {
  blog: defineCollection({
    type: 'content',
    schema: blogSchema,
  }),
};
```

## Page Schema

```typescript
const pageSchema = z.object({
  title: z.string().max(60),
  description: z.string().min(120).max(160),
  lastModified: z.coerce.date().optional(),
  noindex: z.boolean().default(false),
  layout: z.enum(['default', 'wide', 'minimal']).default('default'),
});

export const collections = {
  pages: defineCollection({
    type: 'content',
    schema: pageSchema,
  }),
};
```

## Footer Data Schema

```typescript
const socialLinkSchema = z.object({
  platform: z.enum(['twitter', 'github', 'linkedin', 'email']),
  url: z.string().url(),
  label: z.string(),
});

const footerSchema = z.object({
  socialLinks: z.array(socialLinkSchema),
  legalPages: z.array(z.object({
    title: z.string(),
    href: z.string(),
  })),
  copyright: z.string(),
});

export const collections = {
  footer: defineCollection({
    type: 'data',
    schema: footerSchema,
  }),
};
```

## Frontmatter Examples

### Blog Post
```yaml
---
title: 'Guide Complet Astro : Maîtrisez les Bases'
description: 'Apprenez à créer des sites web rapides avec Astro. Guide complet avec exemples pratiques et meilleures pratiques pour développeurs.'
pubDate: '2024-12-11T10:00:00Z'
updatedDate: '2024-12-11T15:30:00Z'
heroImage: './hero-astro-guide.webp'
tags: ['astro', 'web-development', 'javascript', 'tutorial']
draft: false
author: 'John Doe'
category: 'tutorial'
---
```

### Static Page
```yaml
---
title: 'À Propos de Notre Équipe'
description: 'Découvrez notre équipe passionnée de développeurs et designers qui créent des expériences web exceptionnelles.'
lastModified: '2024-12-11T10:00:00Z'
layout: 'wide'
noindex: false
---
```