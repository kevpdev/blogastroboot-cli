# Commande `/create-issue` - Génération de templates d'issues structurés

## Usage

```bash
/create-issue [type] [titre]
```

### Paramètres

- **`type`** (obligatoire) : Type d'issue à créer
  - `feature` ou `feat` - Nouvelle fonctionnalité
  - `bug` ou `fix` - Correction de bug
  - `refactor` - Amélioration/refactoring de code
  - `ui` ou `component` - Composant UI spécialisé

- **`titre`** (obligatoire) : Titre descriptif de l'issue (entre guillemets si espaces)

### Exemples d'usage

```bash
# Nouvelle fonctionnalité
/create-issue feature "Système de recherche avancée"
/create-issue feat "Intégration newsletter"

# Correction de bug
/create-issue bug "Navigation mobile cassée"
/create-issue fix "Images non responsive"

# Refactoring
/create-issue refactor "Optimisation des performances"
/create-issue refactor "Restructuration des composants"

# Composant UI
/create-issue ui "Composant Card moderne"
/create-issue component "Bouton avec loading state"
```

## Fonctionnement

### 1. Validation des paramètres
- Vérification du type d'issue supporté
- Validation de la présence du titre
- Nettoyage et formatage du titre

### 2. Sélection du template
La commande sélectionne automatiquement le template approprié :

| Type d'entrée | Template utilisé | Description |
|---------------|------------------|-------------|
| `feature`, `feat` | `feature-issue.md` | Nouvelles fonctionnalités |
| `bug`, `fix` | `bug-fix-issue.md` | Corrections de bugs |
| `refactor` | `refactor-issue.md` | Améliorations techniques |
| `ui`, `component` | `ui-component-issue.md` | Composants UI |

### 3. Génération personnalisée
- Copie du template de base depuis `templates/issues/`
- Remplacement du titre placeholder par le titre fourni
- Pré-remplissage des sections avec contexte projet
- Ajout de suggestions spécifiques au type d'issue

### 4. Output structuré
La commande génère un document markdown complet avec :
- **Titre formaté** avec convention `[TYPE] Titre`
- **Sections pré-remplies** adaptées au contexte blogastroboot
- **Checklist qualité** selon les standards du projet
- **Références** vers l'architecture Astro/TypeScript/Tailwind

## Personnalisation par type

### Feature issues
- Accent sur les user stories et critères d'acceptation
- Spécifications techniques Astro intégrées
- Checklist performance et SEO
- Templates de tests unitaires

### Bug issues
- Structure de reproduction étape par étape
- Sections pour screenshots et logs d'erreur
- Checklist de validation multi-browser
- Tests de non-régression

### Refactor issues
- Métriques avant/après pour mesurer les améliorations
- Analyse d'impact sur l'architecture existante
- Plan de migration et validation
- Focus sur la maintenabilité

### UI component issues
- Spécifications visuelles détaillées
- Intégration design system avec tokens
- Checklist accessibilité WCAG 2.2 AA
- Patterns de responsive design

## Intégration projet

### Standards appliqués
Tous les templates générés incluent automatiquement :
- **Architecture Astro** : Patterns composants et pages
- **TypeScript strict** : Interfaces et types requis
- **Tailwind CSS** : Design tokens et responsive
- **Qualité** : Tests, linting, accessibilité
- **Performance** : Core Web Vitals et optimisations

### Workflow d'utilisation
1. **Génération** : `/create-issue type "titre"`
2. **Personnalisation** : Remplir les sections spécifiques
3. **Validation** : Vérifier complétude des critères
4. **Implémentation** : Suivre les spécifications
5. **Validation finale** : Checklist qualité projet

## Output exemple

```markdown
# [FEAT] Système de recherche avancée

## 🎯 Objectif
[Pré-rempli avec structure feature]

## 📋 Contexte
### Problème à résoudre
[Section à personnaliser]

### User Stories
```
En tant que [visiteur du blog]
Je veux [rechercher du contenu par mots-clés]
Afin de [trouver rapidement les articles pertinents]
```

## ✅ Critères d'acceptation
- [ ] Recherche en temps réel avec debouncing
- [ ] Filtrage par catégories et tags
- [ ] Résultats paginés avec performance optimisée
[...]
```

## Avantages

### Efficacité
- **Génération rapide** : Template personnalisé en une commande
- **Structure cohérente** : Format standardisé pour toutes les issues
- **Contexte intégré** : Spécifications techniques pré-remplies

### Qualité
- **Standards projet** : Respect automatique des conventions
- **Checklist complète** : Validation qualité intégrée
- **Documentation** : Références et exemples inclus

### Communication
- **Spécifications claires** : Réduction des aller-retours
- **Critères objectifs** : Validation mesurable des résultats
- **Contexte technique** : Informations complètes pour l'implémentation

---

*Cette commande s'intègre dans l'écosystème `.claude/` optimisé pour une communication structurée et un développement de qualité dans le projet blogastroboot.*