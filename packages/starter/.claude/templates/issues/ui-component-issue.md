# [UI] Titre du composant UI

> Template spécialisé pour demander la création ou modification d'un composant UI dans le projet blogastroboot.

## 🎯 Objectif

**Composant à créer/modifier :**
<!-- Nom et rôle du composant UI -->

**Valeur ajoutée design :**
<!-- Expliquez en quoi ce composant améliore l'interface et l'expérience utilisateur -->

## 📋 Contexte

### Besoin utilisateur
**Problème UI/UX à résoudre :**
<!-- Décrivez le problème d'interface ou d'expérience que ce composant doit résoudre -->

**Contexte d'utilisation :**
- **Pages concernées** : [Liste des pages où le composant sera utilisé]
- **Fréquence d'usage** : [Très utilisé / Occasionnel / Spécialisé]
- **Utilisateurs cibles** : [Visiteurs / Administrateurs / Tous]

### Design system integration
**Cohérence avec l'existant :**
- [ ] **Design tokens** : Utilise les tokens couleurs/spacing du projet
- [ ] **Typography** : Respecte la hiérarchie typographique
- [ ] **Components** : S'intègre avec les composants existants
- [ ] **Patterns** : Suit les patterns d'interaction établis

## ✅ Critères d'acceptation

### Fonctionnalités UI
- [ ] **[Fonctionnalité 1]** : Description précise du comportement visuel
- [ ] **[Fonctionnalité 2]** : Description des interactions attendues
- [ ] **[Fonctionnalité 3]** : Description des états visuels (hover, focus, disabled)

### États et variations
- [ ] **État par défaut** : [Apparence et comportement normal]
- [ ] **État hover** : [Changement visuel au survol]
- [ ] **État focus** : [Indicateur de focus visible]
- [ ] **État disabled** : [Apparence quand non-interactif]
- [ ] **État loading** : [Feedback pendant chargement]
- [ ] **État error** : [Feedback en cas d'erreur]

### Responsive behavior
- [ ] **Mobile (320px+)** : [Adaptation spécifique mobile]
- [ ] **Tablet (768px+)** : [Comportement tablet]
- [ ] **Desktop (1024px+)** : [Version desktop complète]
- [ ] **Large screens (1440px+)** : [Comportement sur grands écrans]

## 🎨 Spécifications visuelles

### Design mockup
**Wireframes/Designs :**
<!-- Ajoutez des liens vers des maquettes ou décrivez visuellement le composant -->

```
[Composant mobile]    [Composant tablet]    [Composant desktop]
     ┌────────┐           ┌──────────┐          ┌────────────┐
     │        │           │          │          │            │
     │  UI    │           │    UI    │          │     UI     │
     │        │           │          │          │            │
     └────────┘           └──────────┘          └────────────┘
```

### Visual specifications
**Dimensions :**
- Hauteur : [Hauteur fixe ou adaptative]
- Largeur : [Largeur fixe ou responsive]
- Espacement interne : [Padding selon design tokens]
- Espacement externe : [Margin selon contexte d'usage]

**Couleurs (design tokens) :**
- Background : `[token couleur background]`
- Text : `[token couleur text]`
- Border : `[token couleur border]`
- Accent : `[token couleur accent]`

**Typography :**
- Font family : [Police selon design system]
- Font size : `[token taille texte]`
- Font weight : `[token poids texte]`
- Line height : `[token hauteur ligne]`

### Animation & transitions
- [ ] **Micro-interactions** : [Transitions hover/focus]
- [ ] **Loading states** : [Animation de chargement]
- [ ] **State changes** : [Transitions entre états]
- [ ] **Performance** : [Optimisées pour 60fps]

## 🔧 Spécifications techniques

### Architecture Astro
**Structure du composant :**
```typescript
// src/components/ui/[NomComposant].astro
---
export interface Props {
  // Props interface strictement typée
}

const { /* props */ } = Astro.props
---

<div class="[nom-composant]">
  <!-- Structure HTML sémantique -->
</div>

<style>
  /* Styles scoped si nécessaire */
</style>
```

**Props interface :**
```typescript
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  children?: HTMLElement
  class?: string
  // ... autres props spécifiques
}
```

### Tailwind CSS classes
**Classes principales :**
```css
/* Base classes */
.[nom-composant] {
  @apply /* classes utilitaires Tailwind */;
}

/* Variants */
.[nom-composant]--primary {
  @apply /* styles variant primary */;
}

/* Responsive */
@screen md {
  .[nom-composant] {
    @apply /* adaptations tablet/desktop */;
  }
}
```

### Intégration système
- [ ] **Slots** : Support des slots Astro pour le contenu
- [ ] **CSS custom properties** : Variables CSS pour customisation
- [ ] **Tailwind variants** : Classes pour les différentes variantes
- [ ] **Type exports** : Export des types pour réutilisation

## 🌐 Accessibilité (WCAG 2.2 AA)

### Navigation clavier
- [ ] **Tab order** : Ordre de navigation logique
- [ ] **Focus visible** : Indicateur de focus clairement visible
- [ ] **Keyboard shortcuts** : Raccourcis clavier si applicable
- [ ] **Escape handling** : Gestion de la touche Escape si modal/dropdown

### Screen readers
- [ ] **ARIA labels** : Labels descriptifs appropriés
- [ ] **ARIA states** : États ARIA (expanded, checked, etc.)
- [ ] **ARIA roles** : Rôles sémantiques corrects
- [ ] **Live regions** : Annonce des changements dynamiques

### Contraste et lisibilité
- [ ] **Color contrast** : Minimum 4.5:1 pour le texte
- [ ] **Focus contrast** : Contraste suffisant pour les états de focus
- [ ] **Size targets** : Minimum 44px pour les zones tactiles
- [ ] **Motion sensitivity** : Respect des préférences reduced-motion

## ✨ Performance & Qualité

### Performance optimizations
- [ ] **Bundle size** : Impact minimal sur la taille du bundle
- [ ] **CSS optimization** : Classes utilitaires réutilisables
- [ ] **Image optimization** : WebP avec fallbacks si images
- [ ] **Lazy loading** : Chargement différé si contenu volumineux

### Tests unitaires
**Tests Vitest :**
```typescript
// src/components/ui/[NomComposant].test.ts
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/dom'

describe('[NomComposant]', () => {
  it('should render with default props', () => {
    // Test du rendu par défaut
  })

  it('should handle all variants correctly', () => {
    // Test des variantes
  })

  it('should be accessible', () => {
    // Tests d'accessibilité
  })
})
```

### Storybook/Documentation
- [ ] **Usage examples** : Exemples d'utilisation dans différents contextes
- [ ] **Props documentation** : Documentation complète des props
- [ ] **Variants showcase** : Démonstration de toutes les variantes
- [ ] **Accessibility notes** : Notes sur l'utilisation accessible

## 🔄 Réutilisabilité

### Usage patterns
**Contextes d'utilisation :**
1. **Pattern 1** : [Contexte d'usage principal]
2. **Pattern 2** : [Contexte d'usage secondaire]
3. **Pattern 3** : [Contexte d'usage spécialisé]

**Composition avec autres composants :**
- `Header.astro` : [Comment s'intègre dans le header]
- `Footer.astro` : [Comment s'intègre dans le footer]
- `Card.astro` : [Comment peut être composé avec Card]

### Customisation
- [ ] **CSS custom properties** : Variables pour customisation avancée
- [ ] **Tailwind modifiers** : Classes utilitaires pour ajustements
- [ ] **Slot composition** : Flexibilité via les slots Astro
- [ ] **Props variants** : Variantes via props TypeScript

## 📚 Références

### Design inspiration
- [Liens vers références design]
- [Design systems similaires]
- [UI libraries comparables]

### Technical references
- [Astro component patterns]
- [Tailwind UI components]
- [Accessibility guidelines]

### Existing components
- [Composants similaires dans le projet]
- [Composants qui peuvent être réutilisés]

## 🚀 Implémentation

### Étapes de développement
1. **Wireframing** : Validation du design et des interactions
2. **Structure** : Création de la structure HTML sémantique
3. **Styling** : Implémentation des styles avec Tailwind
4. **Interactions** : Ajout des comportements interactifs
5. **Accessibility** : Validation et amélioration de l'accessibilité
6. **Tests** : Tests unitaires et d'accessibilité
7. **Documentation** : Exemples d'usage et documentation

### Validation design
- [ ] **Design review** : Validation par l'équipe design
- [ ] **User testing** : Test avec utilisateurs réels
- [ ] **Cross-browser** : Validation sur différents navigateurs
- [ ] **Device testing** : Test sur dispositifs mobiles réels

### Validation finale
Avant de marquer comme terminé :
- [ ] `pnpm quality` passe sans erreur
- [ ] Tests d'accessibilité validés (axe-core)
- [ ] Performance Core Web Vitals respectée
- [ ] Tests sur devices multiples
- [ ] Documentation d'usage créée
- [ ] Intégration avec design system validée

---

**Convention commit :** `feat: add [NomComposant] UI component` ou `refactor: improve [NomComposant] component`

*Ce template assure la création de composants UI cohérents, accessibles et performants dans l'écosystème blogastroboot.*