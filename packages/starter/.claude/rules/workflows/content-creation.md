# Workflow — Content Creation

Processus structuré pour créer et publier du contenu de qualité sur le blog Astro.

## Objectifs
- Créer du contenu engageant et optimisé SEO
- Respecter la cohérence éditoriale et technique
- Assurer la qualité et l'accessibilité du contenu
- Optimiser pour les performances et le référencement

## Étapes détaillées

### 1. Planification du contenu
```bash
# Analyser les contenus existants
echo "=== CONTENT ANALYSIS ==="
find src/content/blog -name "*.md" -o -name "*.mdx" | wc -l
ls -la src/content/blog/ | head -10

# Analyser les tags populaires
echo "=== TAG ANALYSIS ==="
grep -r "tags:" src/content/blog/ | grep -o '\[.*\]' | sort | uniq -c | sort -nr | head -10
```

**Questions de planification :**
- [ ] Quel est l'objectif du contenu ?
- [ ] Qui est l'audience cible ?
- [ ] Quels mots-clés cibler ?
- [ ] Comment s'intègre-t-il dans la stratégie éditoriale ?

### 2. Recherche et structure
```bash
# Template de planification
cat > content-plan-[SLUG].md << 'EOF'
# Plan de contenu: [TITLE]

## Objectif
[Définir l'objectif du contenu]

## Audience
[Décrire l'audience cible]

## Mots-clés principaux
- [keyword1]
- [keyword2] 
- [keyword3]

## Structure
1. Introduction (hook, problématique)
2. [Section principale 1]
3. [Section principale 2]
4. [Section principale 3]
5. Conclusion (récap, CTA)

## Sources et références
- [Source 1]
- [Source 2]
EOF
```

### 3. Création du fichier de contenu
```bash
# Créer le fichier avec le bon schema
echo "=== CONTENT CREATION ==="
touch "src/content/blog/$(date +%Y-%m-%d)-[SLUG].md"

# Générer le slug automatiquement
echo "Slug suggestions:"
echo "[TITLE]" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-\|-$//g'
```

**Template de contenu blog :**
```markdown
---
title: "[TITLE]"
description: "[META_DESCRIPTION_MAX_160_CHARS]"
pubDate: "$(date -Iseconds)"
updatedDate: "$(date -Iseconds)" # Optional, remove if not needed
heroImage: "/path/to/image.jpg" # Optional, remove if not needed
tags: ["tag1", "tag2", "tag3"]
draft: false # Set to true for drafts
---

## Introduction

[Hook engaging + présentation de la problématique]

## [Section Principale 1]

[Contenu avec exemples concrets]

### Sous-section

[Détails et explications]

```bash
# Code examples with proper syntax highlighting
echo "Example command"
```

## [Section Principale 2]

[Suite du contenu avec images si nécessaire]

![Alt text descriptif](./image.jpg)

## Conclusion

[Récapitulatif + call-to-action]

---

*Publié le [DATE] • Dernière mise à jour le [DATE]*
```

### 4. Optimisation des images
```bash
# Optimiser les images pour le web
echo "=== IMAGE OPTIMIZATION ==="

# Créer les répertoires d'assets si nécessaire
mkdir -p src/assets/blog/[SLUG]

# Optimiser les images (WebP, AVIF)
echo "Tools: squoosh-cli, sharp, imagemagick"
echo "Formats: WebP (primary), AVIF (modern), JPG (fallback)"
echo "Sizes: 1200px max width, responsive variants"

# Template d'intégration d'images
cat << 'EOF'
<!-- Astro Image component -->
---
import { Image } from 'astro:assets';
import heroImage from '../../../assets/blog/[SLUG]/hero.jpg';
---

<Image 
  src={heroImage} 
  alt="Description précise et accessible"
  width={1200}
  height={600}
  format="webp"
  quality="high"
  loading="lazy"
/>
EOF
```

### 5. SEO et métadonnées
```bash
# Valider les métadonnées
echo "=== SEO VALIDATION ==="

# Template de checklist SEO
cat << 'EOF'
## SEO Checklist
- [ ] Titre optimisé (50-60 caractères)
- [ ] Description méta (140-160 caractères)
- [ ] URL slug optimisé (mots-clés, tirets)
- [ ] Tags pertinents (3-5 maximum)
- [ ] Images avec alt text descriptif
- [ ] Structure H1-H6 logique
- [ ] Liens internes vers d'autres articles
- [ ] Contenu original et de qualité (>800 mots)
EOF
```

**Bonnes pratiques SEO :**
```markdown
<!-- Exemple de métadonnées optimisées -->
---
title: "Guide Complet Astro 2024: Build Sites Ultra-Rapides"
description: "Découvrez comment créer des sites web ultra-rapides avec Astro. Guide pratique avec exemples, optimisations et meilleures pratiques 2024."
pubDate: "2024-12-10"
heroImage: "./hero-astro-guide.jpg"
tags: ["astro", "performance", "web-development", "javascript"]
---

# Guide Complet Astro 2024: Build Sites Ultra-Rapides

Dans ce guide, nous explorons **Astro**, le framework révolutionnaire qui permet de créer des sites web avec des performances exceptionnelles...

## Table des matières
1. [Introduction à Astro](#introduction)
2. [Installation et configuration](#installation)
3. [Composants et islands](#composants)
4. [Optimisations avancées](#optimisations)
```

### 6. Validation du contenu
```bash
# Vérification orthographique et grammaticale
echo "=== CONTENT VALIDATION ==="
echo "Tools: languagetool, grammarly, hemingway app"

# Test de lisibilité
echo "=== READABILITY CHECK ==="
echo "Target: Niveau lecture 8-10e année"
echo "Sentences: <20 mots par phrase"
echo "Paragraphs: <4 phrases par paragraphe"

# Validation technique
echo "=== TECHNICAL VALIDATION ==="
pnpm astro check
pnpm build
```

**Checklist qualité contenu :**
- [ ] Orthographe et grammaire vérifiées
- [ ] Ton cohérent avec la ligne éditoriale
- [ ] Exemples pratiques et actionables
- [ ] Liens externes vérifiés et pertinents
- [ ] Code examples testés et fonctionnels
- [ ] Structure logique et progressive

### 7. Tests et prévisualisation
```bash
# Démarrer le serveur de développement
echo "=== CONTENT PREVIEW ==="
pnpm dev

# Tester le rendu du contenu
echo "URLs to test:"
echo "- http://localhost:4321/blog/[SLUG]"
echo "- http://localhost:4321/blog (list view)"
echo "- http://localhost:4321/blog/tag/[TAG] (tag pages)"

# Valider le responsive
echo "Test breakpoints: 320px, 768px, 1024px, 1440px"
```

### 8. Accessibilité et performance
```bash
# Tests d'accessibilité
echo "=== ACCESSIBILITY TESTS ==="
echo "Tools: aXe, WAVE, Lighthouse"
echo "Standards: WCAG 2.2 AA compliance"

# Tests de performance
echo "=== PERFORMANCE TESTS ==="
echo "Metrics: LCP <2.5s, FID <100ms, CLS <0.1"
echo "Tools: Lighthouse, WebPageTest"
```

**Checklist accessibilité :**
- [ ] Images avec alt text descriptif
- [ ] Contrastes couleurs suffisants (4.5:1 minimum)
- [ ] Structure de headings logique (H1 → H2 → H3...)
- [ ] Navigation clavier fonctionnelle
- [ ] Liens avec textes descriptifs (éviter "cliquez ici")

### 9. Publication et promotion
```bash
# Publier le contenu
echo "=== PUBLICATION ==="
git add .
git commit -m "feat(blog): add new post - [TITLE]

- Add comprehensive guide on [TOPIC]
- Include practical examples and code snippets
- Optimize for SEO with relevant keywords
- Add responsive images and alt text

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"

git push origin main
```

**Checklist publication :**
- [ ] Draft mode désactivé (draft: false)
- [ ] Contenu relu et validé
- [ ] Tests de build passent
- [ ] Images optimisées et chargées
- [ ] Liens internes/externes vérifiés

### 10. Suivi et optimisation
```bash
# Analytics et métriques
echo "=== POST-PUBLICATION TRACKING ==="
echo "Monitor: Page views, time on page, bounce rate"
echo "SEO: Search rankings, click-through rates"
echo "Social: Shares, comments, engagement"

# Plan de mise à jour
echo "=== CONTENT MAINTENANCE ==="
echo "Schedule: Review every 6 months"
echo "Update: Statistics, links, screenshots"
echo "Optimize: Based on search performance"
```

## Templates spécialisés

### Article technique
```markdown
---
title: "Comment [TASK] avec [TECHNOLOGY] : Guide Pratique"
description: "Apprenez à [TASK] étape par étape avec [TECHNOLOGY]. Guide complet avec exemples de code et bonnes pratiques."
tags: ["tutorial", "technology", "development"]
---

## Le problème

[Contextualiser le problème à résoudre]

## Prérequis

- [Skill 1]
- [Tool 1] installé
- [Knowledge 1]

## Solution étape par étape

### Étape 1: [ACTION]

[Explication + code example]

### Étape 2: [ACTION]

[Explication + code example]

## Résultats et performance

[Métriques, avant/après, benchmarks]

## Conclusion et recommandations

[Récap + prochaines étapes]
```

### Article de veille
```markdown
---
title: "[TECHNOLOGY] en 2024: Nouveautés et Tendances"
description: "Découvrez les dernières évolutions de [TECHNOLOGY] : nouvelles fonctionnalités, performances améliorées et cas d'usage innovants."
tags: ["veille", "technology", "trends"]
---

## État des lieux

[Situation actuelle de la technologie]

## Nouveautés marquantes

### [Feature 1]
[Impact, exemples, adoption]

### [Feature 2]
[Impact, exemples, adoption]

## Retours d'expérience

[Témoignages, études de cas, métriques]

## Perspectives 2024

[Prédictions, roadmap, recommandations]
```

## Checklist finale de publication
- [ ] Contenu original et de qualité (>800 mots)
- [ ] Métadonnées SEO optimisées
- [ ] Images optimisées avec alt text
- [ ] Structure accessible (headings, liens)
- [ ] Code examples testés
- [ ] Liens vérifiés
- [ ] Build de production réussit
- [ ] Preview validation effectuée
- [ ] Publication planifiée et effectuée

## Métriques de succès
```bash
# Métriques de contenu
echo "=== SUCCESS METRICS ==="
echo "Word count: [X] words"
echo "Reading time: [X] minutes" 
echo "Images: [X] optimized"
echo "Internal links: [X]"
echo "External links: [X]"
echo "SEO score: [X]/100"
echo "Accessibility score: [X]/100"
```

## Sortie attendue
- **Article publié** et accessible
- **SEO optimisé** pour les moteurs de recherche
- **Performance excellente** (Core Web Vitals)
- **Accessibilité** WCAG AA compliant
- **Contenu engageant** et actionnable