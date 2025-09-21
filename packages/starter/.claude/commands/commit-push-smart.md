# Commande — Commit and Push Smart

Commit et push intelligents avec message automatique ou personnalisé selon le contexte.

## Usage

```
/commit-push-smart [message optionnel]
```

Utiliser pour commit rapide avec validation obligatoire du message.

## Actions

1. Analyser les fichiers modifiés et staged
2. Afficher un diff des changements pour validation
3. Si message fourni : vérifier la limite de 50 caractères
4. Si pas de message : générer automatiquement un message descriptif (max 50 chars)
5. **TOUJOURS demander validation/modification du message avant commit**
6. Afficher le message avec sa longueur (ex: "feat: add search (15/50)")
7. Permettre modification si nécessaire
8. Créer le commit avec le message validé
9. Demander confirmation avant push
10. Push vers le remote

## Exemples

**Entrée avec message (dans la limite) :**

```
/commit-push-smart "fix: navigation bug"
```

**Sortie attendue :**

```bash
git add .
git diff --cached
Message proposé: "fix: navigation bug" (19/50)
Valider ce message ? [o/n/modifier] : o
git commit -m "fix: navigation bug"
Push vers remote ? [o/n] : o
git push
```

**Entrée avec message trop long :**

```
/commit-push-smart "fix: resolve the complex navigation bug that occurs on mobile devices"
```

**Sortie attendue :**

```bash
git add .
git diff --cached
⚠️  Message trop long (67/50 caractères)
Message proposé: "fix: resolve complex navigation bug on mobile" (42/50)
Valider ce message ? [o/n/modifier] : modifier
Nouveau message: fix: mobile navigation bug
"fix: mobile navigation bug" (26/50)
Valider ? [o/n] : o
git commit -m "fix: mobile navigation bug"
```

**Entrée sans message :**

```
/commit-push-smart
```

**Sortie attendue :**

```bash
git add .
git diff --cached
# Analyse des changements...
Message généré: "feat: add search component" (25/50)
Valider ce message ? [o/n/modifier] : o
git commit -m "feat: add search component"
Push vers remote ? [o/n] : o
git push
```

## Règles de validation

### Limite de caractères

- **Maximum 50 caractères** pour le titre du commit
- Si dépassement : proposer une version tronquée
- Afficher toujours la longueur : "message (XX/50)"

### Validation obligatoire

- **TOUJOURS** demander validation du message avant commit
- Permettre modification même si message fourni par l'utilisateur
- Proposer des alternatives si le message dépasse 50 caractères
- Ne jamais commit sans validation explicite de l'utilisateur

## Notes

- Message fourni : vérifier la limite puis demander validation
- Pas de message : générer puis OBLIGATOIREMENT demander validation
- Évite les ajouts comme "Generated with Claude Code" si message fourni
- Respecte les conventions de commit du projet (feat:, fix:, etc.)
- Demande confirmation avant chaque étape critique
