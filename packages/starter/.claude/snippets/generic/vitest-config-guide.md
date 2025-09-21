# Configuration Vitest - Guide Référence

Documentation de la configuration Vitest du projet pour génération de tests cohérents.

## Configuration Principale

Référence : `vitest.config.ts` (racine du projet)

### Environment & Setup
- **Environment** : `jsdom` pour tests DOM
- **Globals** : `true` (pas besoin d'importer describe, it, expect)
- **Setup file** : `./src/__tests__/setup/vitest.setup.ts`
- **Timeout** : 10 secondes pour tests async

### Path Aliases (IMPORTANT)
```typescript
// Utiliser ces alias dans les tests générés
'@': './src'
'@/components': './src/components'
'@/layouts': './src/layouts'
'@/utils': './src/utils'
'@/config': './src/config'
'@/types': './src/types'
```

### Exemple d'import dans les tests :
```typescript
// ✅ Correct - utiliser les alias
import { Button } from '@/components/ui/Button.astro';
import { formatDate } from '@/utils/date';

// ❌ Incorrect - chemins relatifs
import { Button } from '../../../components/ui/Button.astro';
```

### Coverage Requirements
- **Lines** : 80% minimum
- **Functions** : 80% minimum
- **Branches** : 70% minimum
- **Statements** : 80% minimum

### Mocks Astro Disponibles
- `astro:content` → `src/__tests__/mocks/astro-content-virtual.ts`
- `astro:assets` → `src/__tests__/mocks/astro-assets-virtual.ts`

### Pattern de Tests
```typescript
// Structure recommandée avec alias
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/dom';
import { ComponentName } from '@/components/ComponentName.astro';

describe('ComponentName', () => {
  it('should render correctly', () => {
    // Test avec accès aux mocks Astro
  });
});
```

### Exclusions Coverage
- `node_modules/`
- `src/__tests__/`
- `**/*.d.ts`
- `**/*.config.*`
- `dist/`, `.astro/`

### Commandes Vitest
```bash
pnpm test              # Run tests
pnpm test:watch        # Watch mode
pnpm test:coverage     # With coverage
pnpm test:ui           # UI mode (si configuré)
```

Cette configuration assure la cohérence entre les tests générés et l'environnement projet.