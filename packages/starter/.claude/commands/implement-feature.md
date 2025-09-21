# Commande — Implement Feature

Processus méthodique pour implémenter de nouvelles fonctionnalités en suivant l'architecture du projet.

## Usage

```
/implement-feature [feature-name] [type]
```

Types : `component`, `layout`, `integration`, `workflow`. Utiliser pour développement structuré et maintenable.

## Actions

1. Analyser les besoins et définir les critères d'acceptation
2. Explorer l'architecture existante et identifier les patterns similaires
3. Designer l'approche technique (composants, interfaces, flux de données)
4. Créer la structure de base (fichiers, interfaces TypeScript)
5. Implémenter la fonctionnalité core avec tests unitaires
6. Intégrer avec l'architecture existante (layouts, composants, styles)
7. Valider avec tests complets et revue de code
8. Documenter l'implémentation et mettre à jour les guides

## Exemples

**Entrée :**

```
/implement-feature search-functionality component
```

**Sortie attendue :**

```typescript
// Phase 1 - Structure
interface SearchProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  results: SearchResult[];
}

// Phase 2 - Composant
src/components/ui/SearchBox.astro
src/components/ui/SearchResults.astro
src/types/search.ts

// Phase 3 - Intégration
src/layouts/BaseLayout.astro (ajout SearchBox)
src/pages/search.astro (page dédiée)

// Phase 4 - Documentation
Mise à jour CLAUDE.md + exemples d'usage
```

## Notes

- Respecte l'architecture composable du projet Astro
- Utilise les design tokens et patterns CSS existants
- Intégration native avec Content Collections si applicable
- Tests avec Vitest + @testing-library/dom
- Documentation automatique des choix techniques
- Révision basée sur les standards qualité du projet
