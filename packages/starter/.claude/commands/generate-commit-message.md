# Commande — Generate Commit Message

Génère des messages de commit structurés avec titre et description détaillée, respectant strictement les limites de caractères.

## Usage

```
/generate-commit-message [options]
```

Options :

- `--titre "mon titre"` : Titre personnalisé
- `--export` : Exporter vers fichier temporaire

## Actions

1. Analyser les fichiers modifiés et staged
2. Générer un titre concis (maximum 50 caractères)
3. Créer une description détaillée (maximum 300 caractères)
4. Respecter la limite de 50 caractères par ligne
5. **TOUJOURS valider avec l'utilisateur**
6. Afficher les compteurs de caractères en temps réel
7. Permettre modification ligne par ligne
8. Exporter le message final

## Règles strictes de validation

### Titre

- **Maximum 50 caractères** (aucune exception)
- Format : `type: description courte`
- Types acceptés : feat, fix, docs, style, refactor, test, chore
- Affichage : `"titre proposé" (XX/50)`

### Description détaillée

- **Maximum 300 caractères au total**
- **Maximum 50 caractères par ligne**
- Ligne vide obligatoire entre titre et description
- Explication du "pourquoi" et "quoi"
- Affichage : `Total description: XXX/300 caractères`

### Format final

```
type: description courte (XX/50)

Première ligne de description (XX/50)
Deuxième ligne si nécessaire (XX/50)
Troisième ligne possible (XX/50)

Total: XXX/300 caractères
```

## Exemples

**Usage basique :**

```
/generate-commit-message
```

**Sortie attendue :**

```bash
git status
git diff --cached

📝 Analyse des changements...
Fichiers modifiés: src/components/Header.astro, src/styles/global.css

Titre généré: "feat: improve header responsive design" (36/50)
Valider le titre ? [o/n/modifier] : o

Description générée:
"Enhance header component with better mobile (37/50)
breakpoints and tablet layout support. (35/50)
Fix navigation alignment issues on (32/50)
small screens and improve UX." (30/50)

Total description: 134/300 caractères

Valider la description ? [o/n/modifier] : o

Message final:
feat: improve header responsive design

Enhance header component with better mobile
breakpoints and tablet layout support.
Fix navigation alignment issues on
small screens and improve UX.
```

**Usage avec titre personnalisé :**

```
/generate-commit-message --titre "fix: navigation bug"
```

**Sortie attendue :**

```bash
Titre fourni: "fix: navigation bug" (19/50) ✅

Description générée pour ce fix:
"Resolve mobile navigation dropdown (31/50)
that was not closing properly on (30/50)
touch devices. Update event handlers (33/50)
and improve accessibility." (26/50)

Total description: 120/300 caractères

Valider ? [o/n/modifier] : o
```

**Usage avec export :**

```
/generate-commit-message --export
```

**Sortie attendue :**

```bash
Message généré et exporté vers: .claude/inputs/commit-message.txt

feat: add search functionality

Implement real-time search component
with autocomplete and filtering options.
Add search indexing and optimization
for better performance.
```

**Cas de dépassement de limite :**

```bash
Titre proposé: "feat: implement comprehensive user authentication system" (59/50)
⚠️ ERREUR: Titre trop long (59/50)

Titre raccourci: "feat: implement user authentication" (34/50)
Valider ? [o/n/modifier] : modifier

Nouveau titre: feat: add user auth
"feat: add user auth" (18/50) ✅

Description:
"Implement JWT-based authentication (32/50)
system with secure token storage and (35/50)
refresh mechanism for improved security (40/50)
and better user experience overall." (35/50)

Total: 142/300 caractères ✅
```

## Validation interactive

### Process de validation

1. **Vérification automatique** des limites
2. **Affichage en temps réel** des compteurs
3. **Options de modification** :
   - `o` : Valider
   - `n` : Régénérer automatiquement
   - `modifier` : Édition manuelle ligne par ligne

### Édition ligne par ligne

```bash
Modifier la description:
Ligne 1: "Implement JWT-based authentication" (32/50)
[Entrée pour garder, ou taper nouvelle ligne]

Ligne 2: "system with secure token storage and" (35/50)
[Modifier]: system with token storage
"system with token storage" (25/50) ✅

Continue...
```

## Notes

- Respect strict des limites de 50 caractères (titre et lignes)
- Description limitée à 300 caractères maximum
- Validation obligatoire à chaque étape
- Export automatique disponible avec `--export`
- Analyse contextuelle des changements pour pertinence
- Types de commit conformes aux conventions projet
- Aucune exception sur les limites de caractères
