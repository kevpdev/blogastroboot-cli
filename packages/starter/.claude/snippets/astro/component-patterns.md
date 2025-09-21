# Snippets — Patterns Astro

Fragments de code réutilisables pour les composants Astro.

## Interface Props Standard

```typescript
interface Props {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: any;
}

const {
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
} = Astro.props;
```

## Conditional Classes

```astro
---
const baseClasses = 'component';
const variantClass = `component--${variant}`;
const sizeClass = `component--${size}`;
const classes = [baseClasses, variantClass, sizeClass, className]
  .filter(Boolean)
  .join(' ');
---

<div class={classes}>
  <slot />
</div>
```

## SEO Meta Fragment

```astro
---
interface SEOProps {
  title: string;
  description: string;
  canonicalURL?: string;
  ogImage?: string;
}

const { title, description, canonicalURL, ogImage } = Astro.props;
---

<title>{title}</title>
<meta name="description" content={description} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
{canonicalURL && <link rel="canonical" href={canonicalURL} />}
{ogImage && <meta property="og:image" content={ogImage} />}
```

## Image Responsive

```astro
---
import { Image } from 'astro:assets';

interface ImageProps {
  src: ImageMetadata;
  alt: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
}

const {
  src,
  alt,
  sizes = '(min-width: 768px) 50vw, 100vw',
  loading = 'lazy'
} = Astro.props;
---

<Image
  src={src}
  alt={alt}
  sizes={sizes}
  loading={loading}
  class="w-full h-auto object-cover"
/>
```

## Navigation Link

```astro
---
interface LinkProps {
  href: string;
  active?: boolean;
  external?: boolean;
}

const { href, active = false, external = false } = Astro.props;
const isActive = active || Astro.url.pathname === href;
---

<a
  href={href}
  class={`nav-link ${isActive ? 'nav-link--active' : ''}`}
  {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
>
  <slot />
</a>
```