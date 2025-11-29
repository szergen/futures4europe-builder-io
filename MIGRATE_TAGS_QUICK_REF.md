# 🚀 Tag Migration Quick Reference

## Installation

```bash
npm install csv-parse
```

## Commands

```bash
# Test with 5 tags
node migrate-tags.js 5

# Migrate all tags
node migrate-tags.js all

# Link master tag references
node migrate-tags.js all migrateMasterTags
```

## Two-Step Process

### Step 1: Migrate Tags

```bash
node migrate-tags.js all
```

Creates all tags (without master tag links)

### Step 2: Link Master Tags

```bash
node migrate-tags.js all migrateMasterTags
```

Updates master tag references

## Files

- **Input:** `Tags_wix.csv`
- **Output:** `tag-migration-mapping.json`
- **Config:** `.env.local` (API key)

## Data Mapping

```
CSV Column          → Builder.io Field
────────────────────────────────────────
Name                → data.name
Tag Type            → data.tagType
Tag Line            → data.tagLine
Picture             → data.picture
Tag Page Link       → data.tagPageLink
ID                  → data.wixId
Master Tag          → data.masterTag (Pass 2)
```

## Troubleshooting

| Issue           | Solution                                             |
| --------------- | ---------------------------------------------------- |
| API Key error   | Check `.env.local` has `NEXT_PUBLIC_BUILDER_API_KEY` |
| Duplicates      | Script auto-skips (check mapping file)               |
| Master tag fail | Run Pass 1 completely first                          |
| Rate limit      | Script has 200ms delay built-in                      |

## Resume Failed Migration

Just run the same command again:

```bash
node migrate-tags.js all
```

Script automatically skips already-migrated tags.

## Progress Tracking

Check `tag-migration-mapping.json`:

```json
{
  "migratedCount": 150,
  "lastMigrated": "2025-01-13T10:00:00Z"
}
```

## Verify Success

1. Check Builder.io dashboard → tag model
2. Count should match CSV rows
3. Spot-check random tags for accuracy
4. Verify master tag references after Pass 2
