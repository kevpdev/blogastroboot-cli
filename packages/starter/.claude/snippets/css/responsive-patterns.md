# Snippets — Patterns Responsive

Fragments CSS pour le design responsive mobile-first avec Tailwind.

## Container Responsive

```css
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .container { padding: 0 1.5rem; }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
    padding: 0 2rem;
  }
}

@media (min-width: 1024px) {
  .container { max-width: 1024px; }
}

@media (min-width: 1280px) {
  .container { max-width: 1280px; }
}
```

## Grid Responsive

```css
.grid-responsive {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .grid-responsive {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (min-width: 768px) {
  .grid-responsive {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}
```

## Typography Responsive

```css
.heading-responsive {
  font-size: 1.5rem;
  line-height: 1.2;
  font-weight: 700;
}

@media (min-width: 640px) {
  .heading-responsive {
    font-size: 2rem;
  }
}

@media (min-width: 768px) {
  .heading-responsive {
    font-size: 2.5rem;
    line-height: 1.1;
  }
}

@media (min-width: 1024px) {
  .heading-responsive {
    font-size: 3rem;
  }
}
```

## Navigation Mobile

```css
.nav-mobile {
  display: block;
}

.nav-desktop {
  display: none;
}

@media (min-width: 768px) {
  .nav-mobile {
    display: none;
  }

  .nav-desktop {
    display: flex;
  }
}
```

## Classes Tailwind Utiles

```html
<!-- Spacing responsive -->
<div class="p-4 sm:p-6 md:p-8 lg:p-12">
  Padding adaptatif
</div>

<!-- Text size responsive -->
<h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
  Titre responsive
</h1>

<!-- Grid responsive -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
  Grille adaptive
</div>

<!-- Flexbox responsive -->
<div class="flex flex-col md:flex-row gap-4">
  Layout flex adaptatif
</div>

<!-- Visibility responsive -->
<div class="hidden md:block">Desktop uniquement</div>
<div class="block md:hidden">Mobile uniquement</div>
```

## Breakpoints Personnalisés

```css
/* Custom breakpoints avec design tokens */
@media (min-width: 480px) {
  /* Mobile landscape */
}

@media (min-width: 768px) and (max-width: 1023px) {
  /* Tablet only */
}

@media (min-width: 1440px) {
  /* Large desktop */
}
```