# Astro Blog Starter - Architecture Moderne

Un template de blog Astro moderne avec Tailwind CSS v4, design tokens, TypeScript strict et architecture composable.

## 🚀 Fonctionnalités

### ✨ Architecture & Performance
- ✅ **Architecture composable** - Layouts modulaires et composants réutilisables
- ✅ **Tailwind CSS v4** - Dernière version avec architecture CSS-in-JS
- ✅ **Design Tokens System** - Système de design cohérent et maintenable
- ✅ **TypeScript strict** - Configuration stricte avec null checks
- ✅ **Performance 100/100 Lighthouse** - Optimisations SSG et images
- ✅ **Mobile-first responsive** - Design adaptatif sur tous écrans

### 📝 Contenu & SEO
- ✅ **3 Collections de contenu** - Blog, pages statiques, configuration footer
- ✅ **Support Markdown & MDX** - Contenu riche avec composants
- ✅ **SEO optimisé** - Meta tags, URLs canoniques, sitemap XML
- ✅ **RSS Feed automatique** - Génération automatique du flux RSS
- ✅ **Images optimisées** - Composant Image d'Astro avec WebP

### 🎨 Style & UX
- ✅ **Mode sombre** - Support complet avec préférences système
- ✅ **Navigation responsive** - Menu hamburger mobile
- ✅ **Composants UI** - Système de composants réutilisables
- ✅ **Accessibilité WCAG 2.2** - Standards d'accessibilité respectés

### 🛠️ Développement
- ✅ **Husky + Lint-staged** - Pre-commit hooks automatiques
- ✅ **ESLint + Prettier** - Formatage et qualité de code
- ✅ **Vitest** - Tests unitaires configurés
- ✅ **Scripts npm optimisés** - Workflow de développement complet

## 🏗️ Architecture du Projet

### Structure des fichiers
```text
mon-blog-astro-starter-blog/
├── src/
│   ├── components/
│   │   ├── ui/                    # Composants UI réutilisables
│   │   │   ├── Button.astro       # Boutons avec variants
│   │   │   ├── Card.astro         # Cartes de contenu
│   │   │   ├── Container.astro    # Conteneurs responsives
│   │   │   └── ...
│   │   └── layout/                # Composants de layout
│   │       ├── Header.astro       # En-tête avec navigation
│   │       ├── Footer.astro       # Pied de page configurable
│   │       └── Navigation.astro   # Navigation principale
│   ├── layouts/
│   │   ├── BaseLayout.astro       # Layout de base (HTML, head)
│   │   ├── BlogLayout.astro       # Layout articles de blog
│   │   ├── HomeLayout.astro       # Layout page d'accueil
│   │   └── PageLayout.astro       # Layout pages statiques
│   ├── content/
│   │   ├── blog/                  # Articles de blog (.md/.mdx)
│   │   ├── pages/                 # Pages statiques
│   │   └── config.ts              # Schémas des collections
│   ├── config/
│   │   ├── site.ts                # Configuration site (titre, description)
│   │   ├── author.ts              # Informations auteur
│   │   └── navigation.ts          # Structure navigation
│   ├── styles/
│   │   ├── tailwind.css           # Point d'entrée Tailwind
│   │   ├── design-tokens.css      # Variables CSS (couleurs, espacement)
│   │   └── prose.css              # Styles typographie blog
│   └── pages/                     # Routing basé sur fichiers
├── public/                        # Assets statiques
├── .claude/                       # Configuration Claude Code
│   ├── rules/                     # Règles de développement
│   └── workflows/                 # Workflows automatisés
├── astro.config.mjs              # Configuration Astro
├── tailwind.config.ts            # Configuration Tailwind
└── package.json                  # Dépendances et scripts
```

### Système de Layouts Composables

```astro
<!-- BaseLayout.astro - Structure HTML de base -->
<html>
  <head>
    <BaseHead {...frontmatter} />
  </head>
  <body>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>

<!-- BlogLayout.astro - Layout spécifique blog -->
<BaseLayout {...frontmatter}>
  <article>
    {heroImage && <Image src={heroImage} />}
    <header>
      <h1>{title}</h1>
      <PostMeta date={pubDate} tags={tags} />
    </header>
    <div class="grid lg:grid-cols-12">
      <Prose class="lg:col-span-8">
        <slot />
      </Prose>
      <RelatedPosts class="lg:col-span-4" />
    </div>
  </article>
</BaseLayout>
```

## 🎨 Système de Design Tokens

### Architecture CSS

```css
/* src/styles/design-tokens.css */
:root {
  /* Brand Colors */
  --brand-primary: 55 65 81;           /* Format RGB pour Tailwind */
  --brand-secondary: 107 114 128;
  
  /* Semantic Colors */
  --text-primary: 17 24 39;
  --text-secondary: 75 85 99;
  --bg-primary: 255 255 255;
  --bg-secondary: 243 244 246;
  
  /* State Colors */
  --success: 5 150 105;
  --warning: 217 119 6;
  --error: 220 38 38;
}

.dark {
  --text-primary: 249 250 251;
  --bg-primary: 17 24 39;
  /* ... mode sombre automatique */
}
```

### Usage dans les composants

```astro
<!-- Utilisation avec Tailwind -->
<div class="bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-primary))]">
  <Button variant="primary">Action</Button>
</div>

<!-- Ou via les classes personnalisées -->
<div class="card">
  <h2 class="heading-lg">Titre</h2>
</div>
```

## 🧞 Scripts de Développement

```bash
# Installation
pnpm install

# Développement
pnpm dev              # Serveur de dev (localhost:4321)
pnpm build            # Build production
pnpm preview          # Prévisualisation build

# Qualité de code
pnpm lint             # ESLint
pnpm lint:fix         # ESLint avec correction auto
pnpm format           # Prettier
pnpm format:check     # Vérification formatage
pnpm typecheck        # Vérification TypeScript
pnpm quality          # Lance tout : typecheck + lint + format

# Tests
pnpm test             # Tests Vitest
pnpm test:watch       # Tests en mode watch
```

## 📝 Gestion du Contenu

### Collections de contenu

```typescript
// src/content/config.ts
export const collections = {
  blog: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.date(),
      updatedDate: z.date().optional(),
      heroImage: z.string().optional(),
      tags: z.array(z.string()).default([]),
    })
  }),
  pages: defineCollection({
    // Schéma similaire pour pages statiques
  })
};
```

### Création d'un article

```markdown
---
title: 'Mon Premier Article'
description: 'Description de l\'article pour SEO'
pubDate: 2024-01-15
heroImage: '../../assets/hero-image.jpg'
tags: ['astro', 'blog', 'web']
---

# Mon Premier Article

Contenu de l'article en **Markdown** avec support MDX.

<Button href="/contact">Contactez-nous</Button>
```

## ⚙️ Configuration

### Site

```typescript
// src/config/site.ts
export const SITE_CONFIG = {
  title: 'Mon Blog',
  description: 'Un blog moderne avec Astro',
  url: 'https://example.com',
  author: {
    name: 'John Doe',
    email: 'john@example.com'
  }
};
```

### Navigation

```typescript
// src/config/navigation.ts
export const NAVIGATION = [
  { name: 'Accueil', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'À propos', href: '/about' },
];
```

### Personnalisation du thème

```css
/* Modifiez src/styles/design-tokens.css */
:root {
  --brand-primary: 59 130 246;  /* Votre couleur primaire */
  --brand-secondary: 107 114 128;
  /* ... autres tokens */
}
```

## 🚀 Déploiement

### Build production

```bash
pnpm build      # Génère ./dist/
pnpm preview    # Test en local
```

### Plateformes supportées

- **Vercel** - Déploiement automatique avec git
- **Netlify** - Support SSG natif
- **GitHub Pages** - Via GitHub Actions
- **Cloudflare Pages** - Edge déployment
- **Docker** - Container prêt pour production

### Variables d'environnement

```bash
# .env
SITE_URL=https://votre-domaine.com
```

## 📚 Ressources

- [Documentation Astro](https://docs.astro.build)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Guide TypeScript](https://docs.astro.build/en/guides/typescript/)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

MIT - Libre d'utilisation pour vos projets personnels et commerciaux.

---

**🎯 Template prêt à l'emploi** - Personnalisez les configs, ajoutez votre contenu et déployez !