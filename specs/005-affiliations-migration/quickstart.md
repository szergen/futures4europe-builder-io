# Quickstart: Affiliations Migration

**Feature**: 005-affiliations-migration  
**Date**: 2024-12-04

## Prerequisites

Before starting, ensure you have:

1. **Environment Variables** (in `.env.local`):
   ```bash
   BUILDER_PRIVATE_API_KEY=your-private-key  # Required for migration (write)
   NEXT_PUBLIC_BUILDER_API_KEY=your-public-key  # Required for fetching (read)
   ```

2. **Data Files**:
   - `data/exports/Affiliations_wix.csv` - Source data (already present)
   - `data/mappings/tag-migration-mapping.json` - Tag ID mappings (already present)

3. **Dependencies**:
   ```bash
   npm install  # Ensures csv-parse, node-fetch, dotenv are installed
   ```

---

## Phase 1: Migration

### Step 1: Test Migration (10 records)

```bash
node scripts/migrations/migrate-affiliations.js 10
```

Expected output:
```
🚀 Starting Affiliations Migration to Builder.io

ℹ Reading CSV file...
✓ Found 1826 affiliations in CSV
ℹ Loading tag mapping...
✓ Tag mapping loaded: 3087 entries
ℹ Migrating 10 affiliations...

✓ [1/10] Created: Effie Amanatidou -to- The University of Manchester (ID: abc123)
✓ [2/10] Created: Effie Amanatidou -to- EFMN (ID: def456)
⚠ [3/10] Missing tag mapping for Wix ID: xyz789 (skipping reference)
...

📊 Migration Summary
✓ Successfully migrated: 10 affiliations
ℹ Mapping saved to: ./data/mappings/affiliation-migration-mapping.json
```

### Step 2: Verify Migration

```bash
node scripts/migrations/migrate-affiliations.js --verify 5
```

This spot-checks 5 random migrated records against Builder.io.

### Step 3: Full Migration

```bash
node scripts/migrations/migrate-affiliations.js all
```

This migrates all ~1,826 affiliations. Expected time: ~15-25 minutes (with 200ms rate limiting).

### Step 4: Check Results

1. **Mapping file**: Check `data/mappings/affiliation-migration-mapping.json`
2. **Builder.io Admin**: Visit Builder.io → Content → affiliations
3. **Summary report**: Review console output for stats

---

## Phase 2: Application Updates

### Step 1: Update API Endpoint

Replace Wix fetching with Builder.io in `app/api/affiliations/route.ts`.

Key changes:
- Remove `getWixClientServerData()` import
- Add `getAllBuilderAffiliations()` from new utility
- Transform response to Wix-compatible format

### Step 2: Create Utility File

Create `app/utils/builderAffiliationUtils.ts` with:
- `getAllBuilderAffiliations()` - Fetch with pagination
- `transformBuilderAffiliationToWixFormat()` - Transform for compatibility

### Step 3: Update Cache Warmer

Ensure `cacheWarmer.ts` uses the updated `/api/affiliations` endpoint (no changes needed if it already calls the API).

### Step 4: Test

```bash
# Start dev server
npm run dev

# Test API endpoint
curl http://localhost:3000/api/affiliations | jq '.length'
# Should return ~1826

# Test cache refresh
curl -X POST http://localhost:3000/api/affiliations
# Should return { "message": "Cache updated successfully." }

# Verify tag popularity still works
curl http://localhost:3000/api/tags-with-popularity | jq '.[0].mentions'
```

### Step 5: Verify No Wix Dependencies

```bash
# Should return no results
grep -r "wixClient.*Affiliations\|queryDataItems.*Affiliations" app/ --exclude-dir=node_modules
```

---

## Troubleshooting

### Migration Script Issues

**"Builder.io Private API key not found"**
- Ensure `BUILDER_PRIVATE_API_KEY` is set in `.env.local`
- Get key from: https://builder.io/account/space

**"Missing tag mapping for Wix ID: xxx"**
- This is a warning, not an error
- The tag wasn't migrated or doesn't exist
- Affiliation will be created with null reference

**"HTTP 429: Rate limited"**
- Script implements 200ms delay between requests
- If still rate limited, increase delay in script

### API Endpoint Issues

**"Error fetching affiliations"**
- Check Builder.io API key is valid
- Check network connectivity
- Check Builder.io service status

**Cache not updating**
- Clear Redis cache manually
- Call POST `/api/affiliations` to refresh
- Check cache TTL configuration

### Data Verification

**Affiliation count mismatch**
- Some records may have failed during migration
- Check mapping file `stats` section
- Re-run migration (will skip already migrated)

**Tag references missing**
- Tags may not have been migrated
- Check `tag-migration-mapping.json` for missing entries
- Run tag migration if needed

---

## Rollback

If issues occur:

1. **Revert code changes** (P2):
   ```bash
   git checkout main -- app/api/affiliations/route.ts
   ```

2. **Keep Builder.io data** (can coexist with Wix):
   - No need to delete Builder.io affiliations
   - Wix data remains unchanged

3. **Clear cache**:
   - Cache will refresh from Wix on next request

---

## Validation Checklist

### Phase 1 Complete ✓
- [ ] Migration script created at `scripts/migrations/migrate-affiliations.js`
- [ ] Test migration successful (10 records)
- [ ] Full migration completed (~1,826 records)
- [ ] Mapping file generated at `data/mappings/affiliation-migration-mapping.json`
- [ ] Spot-check verification passed

### Phase 2 Complete ✓
- [ ] API endpoint updated to use Builder.io
- [ ] Utility file created at `app/utils/builderAffiliationUtils.ts`
- [ ] API returns correct response format
- [ ] Cache warming works
- [ ] Tag popularity calculation works
- [ ] No Wix dependencies remaining (grep check)

