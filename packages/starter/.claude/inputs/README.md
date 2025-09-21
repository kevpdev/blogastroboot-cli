# Dossier Inputs — Debug et Analyse

Ce dossier contient les fichiers temporaires pour l'analyse et le debug.

## Structure

```
inputs/
├── screenshots/          # Captures d'écran pour debug visuel
├── logs/                # Fichiers de log et erreurs
├── configs/             # Configurations à analyser
└── README.md           # Ce fichier
```

## Usage

### Screenshots
- Placer les captures d'écran de bugs visuels
- Nommer avec format : `bug-[component]-[date].png`
- Exemple : `bug-navigation-mobile-2024-12-11.png`

### Logs
- Copier les logs d'erreur pour analyse
- Inclure stack traces complètes
- Format : `error-[type]-[date].log`

### Configs
- Fichiers de configuration problématiques
- Comparaisons avant/après pour changes
- Configurations externes à analyser

## Commandes Associées

- `/debug-issue` - Analyse les fichiers de ce dossier
- Référencement automatique dans les diagnostics

## Nettoyage

Ce dossier doit être nettoyé régulièrement :
- Fichiers > 7 jours automatiquement supprimés
- Après résolution des issues
- Avant commits pour éviter pollution repo

## Exemples

```bash
# Ajouter capture pour debug
cp screenshot.png inputs/screenshots/bug-menu-mobile-2024-12-11.png

# Ajouter log d'erreur
npm run build 2>&1 | tee inputs/logs/build-error-2024-12-11.log

# Analyser avec Claude
/debug-issue css "Menu mobile cassé - voir screenshot"
```