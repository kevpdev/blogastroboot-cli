# Commande — Debug Issue

Processus structuré pour diagnostiquer et résoudre les problèmes techniques avec analyse contextuelle.

## Usage

```
/debug-issue [type] [description]
```

Types supportés : `css`, `js`, `astro`, `build`, `performance`. Utiliser pour diagnostic méthodique des bugs.

## Actions

1. Analyser la description du problème et identifier le domaine technique
2. Examiner les fichiers inputs/ pour captures d'écran, logs, configurations
3. Reproduire l'erreur en local avec les mêmes conditions
4. Identifier les causes potentielles (CSS, JavaScript, configuration, dépendances)
5. Proposer plusieurs solutions classées par priorité et impact
6. Implémenter la solution la plus appropriée avec tests
7. Valider la résolution et documenter pour éviter récurrence
8. Nettoyer les fichiers temporaires dans inputs/

## Exemples

**Entrée :**

```
/debug-issue css "Le menu mobile ne s'affiche pas correctement"
```

**Sortie attendue :**

```
# Diagnostic CSS Menu Mobile

## Problème identifié
- Navigation mobile invisible sur écrans < 768px
- Classes Tailwind responsive non appliquées

## Solutions proposées
1. **Priorité haute**: Corriger classes `hidden md:block` vs `block md:hidden`
2. **Priorité moyenne**: Vérifier breakpoints Tailwind configuration
3. **Priorité basse**: Revoir structure HTML du menu

## Implémentation
- Modification de Navigation.astro ligne 15-20
- Test sur mobile, tablet, desktop
- Validation accessibilité clavier

## Validation
✅ Menu visible sur mobile (320px+)
✅ Menu masqué sur desktop (768px+)
✅ Navigation clavier fonctionnelle
```

## Notes

- Utilise le dossier inputs/ pour analyser captures, logs, configs
- Reproduit l'erreur avant de proposer solutions
- Priorise les fixes simples et non-régressifs
- Documente la solution pour référence future
- Teste sur multiple devices/breakpoints pour CSS
- Valide accessibilité et performance après fix