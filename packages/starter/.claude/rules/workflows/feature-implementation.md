# Workflow — Feature Implementation

Processus méthodique pour implémenter de nouvelles fonctionnalités en suivant les meilleures pratiques d'architecture et de qualité.

## Objectifs
- Implémenter des fonctionnalités robustes et maintenables
- Respecter l'architecture existante du projet
- Assurer la qualité et la testabilité du code
- Documenter les choix techniques

## Étapes détaillées

### 1. Analyse des besoins
```bash
# Documenter la fonctionnalité
echo "=== FEATURE ANALYSIS ==="
echo "Feature: [FEATURE_NAME]"
echo "User Story: As a [USER], I want [GOAL] so that [BENEFIT]"
echo "Acceptance Criteria: [LIST_CRITERIA]"
```

**Questions clés :**
- [ ] Quelle est la valeur métier de cette fonctionnalité ?
- [ ] Quels sont les cas d'usage principaux ?
- [ ] Y a-t-il des contraintes techniques spécifiques ?
- [ ] Comment mesurer le succès de l'implémentation ?

### 2. Analyse technique et design
```bash
# Explorer l'architecture existante
echo "=== ARCHITECTURE REVIEW ==="
find src -name "*.ts" -o -name "*.astro" | xargs grep -l "similar_pattern" | head -5

# Analyser les composants similaires
echo "=== SIMILAR COMPONENTS ==="
ls -la src/components/ | grep -i "[RELATED_KEYWORD]"
```

**Design Checklist :**
- [ ] Composants à créer/modifier identifiés
- [ ] Interfaces TypeScript définies
- [ ] Flux de données planifié
- [ ] Intégration avec l'architecture existante validée
- [ ] Considérations de performance évaluées

### 3. Plan d'implémentation
**Décomposition en tâches :**

#### Phase 1 - Structure de base
- [ ] Créer les interfaces TypeScript
- [ ] Implémenter la logique métier dans `src/lib/`
- [ ] Créer les composants UI de base

#### Phase 2 - Intégration
- [ ] Intégrer les composants dans les layouts
- [ ] Configurer le routing si nécessaire
- [ ] Ajouter la validation des données

#### Phase 3 - Finition
- [ ] Ajouter les styles et animations
- [ ] Optimiser les performances
- [ ] Améliorer l'accessibilité

### 4. Implémentation de la logique métier
```bash
# Créer la structure de base
mkdir -p src/lib/[feature-name]
touch src/lib/[feature-name]/index.ts
touch src/lib/[feature-name]/types.ts
touch src/lib/[feature-name]/utils.ts
```

**Template de logique métier :**
```typescript
// src/lib/[feature-name]/types.ts
export interface [FeatureName]Config {
  // Configuration options
}

export interface [FeatureName]State {
  // État de la fonctionnalité
}

export interface [FeatureName]Events {
  // Events handlers
}

// src/lib/[feature-name]/index.ts
import type { [FeatureName]Config, [FeatureName]State } from './types';

export class [FeatureName]Manager {
  private config: [FeatureName]Config;
  private state: [FeatureName]State;

  constructor(config: [FeatureName]Config) {
    this.config = config;
    this.state = this.initializeState();
  }

  private initializeState(): [FeatureName]State {
    // Initialization logic
  }

  public [primaryMethod](): [ReturnType] {
    // Main business logic
  }
}

export function create[FeatureName](config: [FeatureName]Config): [FeatureName]Manager {
  return new [FeatureName]Manager(config);
}
```

### 5. Création des composants
```bash
# Créer la structure des composants
mkdir -p src/components/[feature-name]
touch src/components/[feature-name]/[MainComponent].astro
touch src/components/[feature-name]/[SubComponent].astro
```

**Template de composant Astro :**
```astro
---
// src/components/[feature-name]/[MainComponent].astro
import type { [FeatureName]Config } from '../../lib/[feature-name]/types';
import { create[FeatureName] } from '../../lib/[feature-name]';

interface Props {
  config: [FeatureName]Config;
  className?: string;
}

const { config, className = '' } = Astro.props;
const [featureName]Manager = create[FeatureName](config);
---

<div class={`[feature-name] ${className}`}>
  <!-- Component template -->
  <slot />
</div>

<style>
  .[feature-name] {
    /* Component styles */
  }
</style>

<script>
  // Client-side interactions if needed
</script>
```

### 6. Tests unitaires
```bash
# Créer les tests
mkdir -p src/lib/[feature-name]/__tests__
touch src/lib/[feature-name]/__tests__/index.test.ts
touch src/lib/[feature-name]/__tests__/utils.test.ts
```

**Template de tests :**
```typescript
// src/lib/[feature-name]/__tests__/index.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { create[FeatureName] } from '../index';
import type { [FeatureName]Config } from '../types';

describe('[FeatureName]Manager', () => {
  let config: [FeatureName]Config;
  let [featureName]Manager: ReturnType<typeof create[FeatureName]>;

  beforeEach(() => {
    config = {
      // Test configuration
    };
    [featureName]Manager = create[FeatureName](config);
  });

  describe('initialization', () => {
    it('should initialize with correct config', () => {
      expect([featureName]Manager).toBeDefined();
    });
  });

  describe('[primaryMethod]', () => {
    it('should handle normal case', () => {
      // Test implementation
    });

    it('should handle edge cases', () => {
      // Edge case tests
    });
  });
});
```

### 7. Intégration et routing
```bash
# Intégrer dans les pages existantes
echo "=== INTEGRATION ==="
grep -r "similar_pattern" src/pages/ | head -5

# Configurer le routing si nécessaire
ls -la src/pages/ | grep -E "\[.*\]"
```

### 8. Styling et responsive design
```bash
# Vérifier les tokens de design
cat src/styles/design-tokens.css | grep -E "color|spacing|typography"

# Tester la responsive
echo "Breakpoints: mobile (default), tablet (640px), desktop (768px), large (1024px+)"
```

### 9. Validation qualité
```bash
# Tests automatisés
echo "=== QUALITY VALIDATION ==="
pnpm test [feature-name]
pnpm typecheck
pnpm lint
pnpm format:check

# Test de build
pnpm build

# Test de performance
pnpm preview
```

### 10. Documentation et finalisation
```bash
# Mise à jour de la documentation
echo "=== DOCUMENTATION ==="
echo "- Update CLAUDE.md with new feature commands"
echo "- Add JSDoc comments to public APIs"
echo "- Update README if user-facing feature"
```

**Template de documentation feature :**
```markdown
## [Feature Name]

### Description
[Brief description of the feature and its purpose]

### Usage
\`\`\`astro
---
import [MainComponent] from '../components/[feature-name]/[MainComponent].astro';
---

<[MainComponent] 
  config={{ 
    // Configuration options
  }}
  className="custom-class"
>
  <!-- Content -->
</[MainComponent]>
\`\`\`

### Configuration Options
- \`option1\`: [Description] (required/optional)
- \`option2\`: [Description] (required/optional)

### Examples
[Provide practical examples]

### Testing
\`\`\`bash
pnpm test [feature-name]
\`\`\`
```

## Checklist de validation finale
- [ ] Fonctionnalité implémentée selon les spécifications
- [ ] Tests unitaires créés et passants
- [ ] Code respecte les standards du projet
- [ ] Performance validée (build, runtime)
- [ ] Accessibilité vérifiée (WCAG AA)
- [ ] Responsive design testé
- [ ] Documentation mise à jour
- [ ] Code review effectuée
- [ ] Ready for production

## Métriques de succès
```bash
# Mesurer l'impact
echo "=== SUCCESS METRICS ==="
echo "Lines of code added: $(git diff --stat main | tail -1)"
echo "Test coverage: [X]%"
echo "Build size impact: [+/-X]KB"
echo "Performance impact: [measure]"
```

## Sortie attendue
- **Fonctionnalité complète** et testée
- **Documentation technique** à jour
- **Tests unitaires** avec bonne couverture
- **Code de qualité** respectant les standards
- **Performance optimisée** sans régressions