# Templates d'Issues - Guide d'utilisation

Les templates d'issues standardisent la communication des demandes de développement pour optimiser l'efficacité et la qualité du projet **blogastroboot**.

## Vue d'ensemble

### Objectifs
- **Communication structurée** : Format uniforme pour toutes les demandes
- **Réduction des aller-retours** : Spécifications complètes dès le départ
- **Qualité assurée** : Critères d'acceptation intégrés
- **Workflow prévisible** : Process de développement standardisé

### Architecture des templates
```
templates/issues/
├── README.md                 # Ce guide d'utilisation
├── feature-issue.md          # Nouvelles fonctionnalités [FEAT]
├── bug-fix-issue.md          # Corrections de bugs [FIX]
├── refactor-issue.md         # Refactoring/améliorations [REFACTOR]
└── ui-component-issue.md     # Composants UI spécialisés
```

## Utilisation des templates

### 1. Sélection du template approprié

| Type de demande | Template à utiliser | Convention commit |
|----------------|-------------------|------------------|
| Nouvelle fonctionnalité | `feature-issue.md` | `feat:` |
| Correction de bug | `bug-fix-issue.md` | `fix:` |
| Refactoring/amélioration | `refactor-issue.md` | `refactor:` |
| Composant UI spécifique | `ui-component-issue.md` | `feat:` ou `refactor:` |

### 2. Processus de création d'issue

1. **Copier** le template approprié
2. **Remplir** toutes les sections obligatoires
3. **Personnaliser** selon le contexte du projet
4. **Valider** que tous les critères sont clairs
5. **Soumettre** la demande structurée

### 3. Structure commune des templates

Tous les templates suivent cette organisation :

```markdown
# [TYPE] Titre de la demande

## 🎯 Objectif
Description claire et concise de ce qui doit être accompli

## 📋 Contexte
Informations nécessaires pour comprendre la demande

## ✅ Critères d'acceptation
Liste précise des conditions de validation

## 🔧 Spécifications techniques
Détails d'implémentation (si applicable)

## 🎨 Design & UX
Considérations visuelles et d'expérience utilisateur

## ✨ Qualité & Performance
Standards à respecter (tests, accessibilité, SEO)

## 📚 Ressources
Liens et références utiles
```

## Standards du projet

### Architecture respectée
- **Astro 5.13.3** avec TypeScript strict
- **Component-based design** avec réutilisabilité
- **Mobile-first responsive** avec Tailwind CSS
- **Design tokens** centralisés pour la cohérence

### Qualité obligatoire
- **Tests** : Vitest avec @testing-library/dom
- **Linting** : ESLint avec auto-fix activé
- **Formatting** : Prettier avec configuration projet
- **Type checking** : TypeScript strict mode + null checks
- **Performance** : Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- **Accessibilité** : WCAG 2.2 AA compliance

### Workflow de développement
```bash
# Avant de commencer
pnpm quality      # Validation complète (typecheck + lint + format)

# Pendant le développement
pnpm dev          # Server de développement
pnpm test:watch   # Tests en mode watch

# Avant commit
pnpm quality      # Validation finale (hooks pre-commit automatiques)
```

## Commandes disponibles

### Commande rapide (optionnelle)
```bash
/create-issue [type] [titre]
```

**Exemples d'usage :**
```bash
/create-issue feature "Système de recherche avancée"
/create-issue fix "Navigation mobile cassée"
/create-issue refactor "Optimisation des performances images"
/create-issue ui "Composant Card moderne"
```

## Bonnes pratiques

### Rédaction efficace
- **Soyez spécifique** : Évitez les descriptions vagues
- **Incluez des exemples** : Screenshots, mockups, cas d'usage
- **Définissez les limites** : Ce qui est inclus/exclu du scope
- **Anticipez les questions** : Fournissez le contexte nécessaire

### Intégration projet
- **Référencez l'architecture** : Respectez les patterns existants
- **Considérez l'écosystème** : Impact sur les composants existants
- **Validez la cohérence** : Alignement avec le design system
- **Planifiez les tests** : Stratégie de validation appropriée

## Maintenance

### Évolution des templates
- **Feedback continu** : Amélioration basée sur l'usage
- **Mise à jour régulière** : Synchronisation avec l'évolution du projet
- **Documentation** : Maintien de ce README à jour
- **Formation** : Partage des bonnes pratiques d'utilisation

### Responsabilités
- **Utilisateur** : Sélection et remplissage approprié du template
- **Développeur** : Respect des spécifications et critères d'acceptation
- **Équipe** : Amélioration continue du processus et des templates

---

*Ces templates s'intègrent dans l'écosystème `.claude/` optimisé pour une charge contextuelle efficace et une qualité de développement maximale.*