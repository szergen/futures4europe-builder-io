# Info Pages Migration - Quick Start

## 🚀 Ready to Test!

The migration script is complete and ready for testing with your first batch of pages.

## Prerequisites Checklist

- [ ] `.env.local` file contains `BUILDER_PRIVATE_API_KEY`
- [ ] Tag migration completed: `node scripts/migrations/migrate-tags.js all`
- [ ] CSV file exists: `data/exports/Project_Organisation_Person+Info+Pages_wix.csv`

## Test Migration (5 pages)

```bash
node scripts/migrations/migrate-infopages.js 5
```

**Expected output:**

```
🚀 Starting Info Pages Migration to Builder.io

ℹ Reading CSV file...
✓ Found 604 info pages in CSV
✓ Loaded tag mapping: 3077 tags
ℹ Migrating 5 info pages...

ℹ [1/5] Creating person: Saar van der Spek
✓ [1/5] Created Saar van der Spek (ID: abc123...)

... (4 more pages) ...

📊 Migration Summary
Total Processed: 5
✓ Successfully Migrated: 5
⊘ Skipped (already migrated): 0
✗ Failed: 0

✅ Migration Complete!
```

## What Gets Created

### Builder.io Content

- **Person pages** → `person-page` model with `/person/` prefix
- **Organisation pages** → `organisation-page` model with `/organisation/` prefix
- **Project pages** → `project-page` model with `/project/` prefix

### Mapping Files

```
data/mappings/
├── person-migration-mapping.json
├── organisation-migration-mapping.json
└── project-migration-mapping.json
```

## Verify in Builder.io

1. Go to Builder.io console
2. Navigate to Content → `person-page` (or `organisation-page`, `project-page`)
3. Check that pages appear with:
   - Correct title
   - Slug with proper prefix (e.g., `/person/john-doe`)
   - All fields populated
   - Tag references resolved

## Common Commands

```bash
# Show help
node scripts/migrations/migrate-infopages.js --help

# Test with 5 pages (from start)
node scripts/migrations/migrate-infopages.js 5

# Test with 10 pages
node scripts/migrations/migrate-infopages.js 10

# Migrate 10 pages starting from position 50 (records 50-59)
node scripts/migrations/migrate-infopages.js 10 --start 50

# Migrate 20 pages starting from position 100 (records 100-119)
node scripts/migrations/migrate-infopages.js 20 --start 100

# Migrate all remaining pages from position 500 to end
node scripts/migrations/migrate-infopages.js all --start 500

# Migrate all (604 pages)
node scripts/migrations/migrate-infopages.js all
```

## Using the --start Flag

The `--start` flag allows you to migrate specific ranges of pages, which is useful for:

### Use Cases

**1. Testing Specific Records**

```bash
# Test with records in the middle of the dataset
node scripts/migrations/migrate-infopages.js 10 --start 50
```

**2. Batch Processing**

```bash
# Migrate in chunks of 100
node scripts/migrations/migrate-infopages.js 100 --start 0    # First batch
node scripts/migrations/migrate-infopages.js 100 --start 100  # Second batch
node scripts/migrations/migrate-infopages.js 100 --start 200  # Third batch
```

**3. Resuming After Interruption**

```bash
# If migration stopped at record 250, resume from there
node scripts/migrations/migrate-infopages.js all --start 250
```

**4. Parallel Processing** (Advanced)

```bash
# In terminal 1
node scripts/migrations/migrate-infopages.js 200 --start 0

# In terminal 2 (simultaneously)
node scripts/migrations/migrate-infopages.js 200 --start 200

# In terminal 3 (simultaneously)
node scripts/migrations/migrate-infopages.js 204 --start 400
```

### Examples

```bash
# Records 50-59 (10 pages starting at position 50)
node scripts/migrations/migrate-infopages.js 10 --start 50

# Records 100-119 (20 pages starting at position 100)
node scripts/migrations/migrate-infopages.js 20 --start 100

# All remaining pages from 500 to end (104 pages)
node scripts/migrations/migrate-infopages.js all --start 500
```

**Note**: The `--start` value is 0-based (like array indices), but the logging shows 1-based positions for readability.

## If Something Goes Wrong

### "Tag mapping file not found"

```bash
# Run tag migration first
node scripts/migrations/migrate-tags.js all
```

### "Missing BUILDER_PRIVATE_API_KEY"

```bash
# Add to .env.local (use PRIVATE key, not public!)
echo "BUILDER_PRIVATE_API_KEY=your_key_here" >> .env.local
```

### Pages already migrated

- Script automatically skips them
- Check mapping files in `data/mappings/`

### API errors

- Check Builder.io console for quota/limits
- Review error summary at end of migration
- Check rate limiting (200ms delay between calls)

## Next Steps After Testing

### If 5-page test succeeds:

1. **Test with 50 pages**

   ```bash
   node scripts/migrations/migrate-infopages.js 50
   ```

2. **Review in Builder.io**

   - Spot-check several pages
   - Verify different page types (person, org, project)
   - Check tag references work
   - Verify structured roles look correct

3. **Run full migration**
   ```bash
   node scripts/migrations/migrate-infopages.js all
   ```

### Optional Enhancements (Future)

- **Dry-run mode**: Preview without creating pages
- **Validation mode**: Compare migrated data vs CSV
- **Batch processing**: Better progress for large sets

## Files to Review

- **Migration Script**: `scripts/migrations/migrate-infopages.js`
- **Full Guide**: `docs/migration/infopages/INFO_PAGES_MIGRATION_GUIDE.md`
- **Implementation Status**: `specs/002-infopages-migration/IMPLEMENTATION_STATUS.md`
- **Specification**: `specs/002-infopages-migration/spec.md`

## Support

For detailed information, see:

- `INFO_PAGES_MIGRATION_GUIDE.md` - Comprehensive guide
- `IMPLEMENTATION_STATUS.md` - What's done, what's pending
- `spec.md` - Full specification
- `tasks.md` - Detailed task breakdown

---

**Ready to migrate?** Start with 5 pages and review the results! 🎉
