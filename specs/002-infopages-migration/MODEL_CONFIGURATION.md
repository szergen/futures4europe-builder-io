# Info Pages Migration - Model Configuration Guide

## Issue: Model Not Found (404 Error)

If you're seeing errors like:

```
✗ Failed to create: HTTP 404: {"status":404,"message":"Model not found"}
```

This means the Builder.io models referenced in the script don't exist in your workspace yet.

## Current Configuration (✅ Updated)

The script is now configured to use **a single model** for all info pages:

```javascript
// All page types → info-page model
const MODELS = {
  person: "info-page",
  organisation: "info-page",
  project: "info-page",
};
```

**Check current config:**

```bash
node scripts/migrations/show-config.js
```

## What You Need to Do

### Option 1: Create "info-page" Model in Builder.io (Recommended - Simpler)

**Steps:**

1. Go to Builder.io dashboard
2. Navigate to **Models** section
3. Click **"+ New Model"**
4. Model name: `info-page`
5. Add fields for your info pages (see field list below)
6. Save the model

**Benefits:**

- ✅ Simpler - only one model to create
- ✅ All info pages in one place
- ✅ Easier to manage
- ✅ Use page type field to filter (person/organisation/project)

**Field List for info-page Model:**

**Common Fields (all pages):**

- `title` (Text)
- `slug` (Text)
- `wixId` (Text)
- `description` (Long Text)
- `createdDate` (Number)
- `lastUpdated` (Number)
- `published` (Text)
- `createdBy` (Text)
- `websiteLink` (Text)
- `domains` (Reference - tag model, array)
- `countrytag` (Reference - tag model, array)

**Person Fields:**

- `linkedinLink` (Text)
- `researchGateLink` (Text)
- `orcidLink` (Text)
- `personorganisation` (Reference - tag model, array)
- `personorganisationformer` (Reference - tag model, array)
- `persontype` (Reference - tag model, array)
- `personorganisationroles` (Long Text - JSON)
- `personorganisationrolesformer` (Long Text - JSON)

**Organisation Fields:**

- `organisationEstablishedDate` (Number)
- `organisationtype` (Reference - tag model, array)
- `organisationproject` (Reference - tag model, array)
- `organisationhasmember` (Reference - tag model, array)
- `organisationmemberof` (Reference - tag model, array)
- `organisationpeopleroles` (Long Text - JSON)
- `organisationprojectroles` (Long Text - JSON)

**Project Fields:**

- `projectStartDate` (Number)
- `projectEndDate` (Number)
- `methods` (Reference - tag model, array)
- `projectorganisation` (Reference - tag model, array)
- `projectcoordinator` (Reference - tag model, array)
- `projectparticipantteam` (Reference - tag model, array)
- `activity` (Reference - tag model, array)
- `postContentRich1-10` (Long Text, 10 fields)
- `postImage1-10` (Object, 10 fields)
- `internalLinks` (Object)
- `mediaFiles` (Object)
- `projectorganisationroles` (Long Text - JSON)

---

### Option 2: Create Three Separate Models (Original Design - More Complex)

If you prefer to keep pages separated by type:

**Steps:**

1. Create three models in Builder.io:

   - `person-page` (with person + common fields)
   - `organisation-page` (with organisation + common fields)
   - `project-page` (with project + common fields)

2. Update the script configuration in `migrate-infopages.js` (lines 63-67):

```javascript
// Change from:
const MODELS = {
  person: "info-page",
  organisation: "info-page",
  project: "info-page",
};

// To:
const MODELS = {
  person: "person-page",
  organisation: "organisation-page",
  project: "project-page",
};
```

3. Optionally use separate mapping files (lines 57-67):

```javascript
// Change from:
const SINGLE_MAPPING_FILE = "./data/mappings/info-page-migration-mapping.json";
const MAPPING_FILES = {
  person: SINGLE_MAPPING_FILE,
  organisation: SINGLE_MAPPING_FILE,
  project: SINGLE_MAPPING_FILE,
};

// To:
const MAPPING_FILES = {
  person: "./data/mappings/person-migration-mapping.json",
  organisation: "./data/mappings/organisation-migration-mapping.json",
  project: "./data/mappings/project-migration-mapping.json",
};
```

**Benefits:**

- ✅ Cleaner separation by page type
- ✅ Type-specific fields only
- ✅ Easier to manage permissions per type
- ❌ More setup work (3 models vs 1)

---

## Verifying Your Configuration

### 1. Check Current Script Configuration

```bash
node scripts/migrations/show-config.js
```

This shows:

- What models the script will use
- What mapping files it will create
- What slug prefixes are configured

### 2. Test with 1 Page

Once you've created the model(s) in Builder.io:

```bash
# Test with just 1 page to verify it works
node scripts/migrations/migrate-infopages.js 1
```

**Expected output:**

```
🚀 Starting Info Pages Migration to Builder.io
ℹ Reading CSV file...
✓ Found 604 info pages in CSV
✓ Loaded tag mapping: 3077 tags
ℹ Migrating 1 info pages (records 1-1 of 604 total)...
ℹ [1/1] Creating person: Saar van der Spek
✓ [1/1] Created Saar van der Spek (ID: abc123...)

📊 Migration Summary
ℹ Total Processed: 1
✓ ✓ Successfully Migrated: 1
⚠ ⊘ Skipped (already migrated): 0
✗ ✗ Failed: 0
```

### 3. Verify in Builder.io

1. Go to Builder.io dashboard
2. Navigate to **Content** → `info-page` (or respective model)
3. You should see the migrated page(s)
4. Check that all fields are populated correctly

---

## Troubleshooting

### Error: "Model not found"

**Problem**: The model doesn't exist in Builder.io

**Solution**: Create the model in Builder.io dashboard (see steps above)

### Error: "Field not found" or missing data

**Problem**: Model is missing required fields

**Solution**: Add all fields from the list above to your Builder.io model

### Pages created but some fields are empty

**Problem**: Field names might not match exactly

**Solution**:

1. Check field names in Builder.io model (must match exactly)
2. Field names are case-sensitive: `linkedinLink` not `linkedInLink`
3. Re-run migration for failed pages: `node scripts/migrations/migrate-infopages.js X --start Y`

---

## Recommendations

### For Most Users: Use Single Model (info-page)

**Why:**

- ✅ Simpler setup
- ✅ Faster to get started
- ✅ One place to manage all pages
- ✅ Can still filter by type internally

**Current configuration already uses this!** Just create the `info-page` model in Builder.io.

### For Advanced Users: Use Separate Models

**When to use:**

- You need strict separation by type
- Different team members manage different types
- You want type-specific permissions
- You prefer cleaner data models

**Requires:** Editing the script configuration and creating 3 models.

---

## Quick Start Checklist

- [ ] 1. Decide: Single model (`info-page`) or three models?
- [ ] 2. Create model(s) in Builder.io with required fields
- [ ] 3. Verify configuration: `node scripts/migrations/show-config.js`
- [ ] 4. Test with 1 page: `node scripts/migrations/migrate-infopages.js 1`
- [ ] 5. Verify in Builder.io that the page was created
- [ ] 6. If successful, migrate more: `node scripts/migrations/migrate-infopages.js 10`
- [ ] 7. Once confident, migrate all: `node scripts/migrations/migrate-infopages.js all`

---

## Need Help?

1. **Check current config**: `node scripts/migrations/show-config.js`
2. **View help**: `node scripts/migrations/migrate-infopages.js --help`
3. **Test with 1 page**: `node scripts/migrations/migrate-infopages.js 1`
4. **Check logs** for specific error messages

---

**Status**: ✅ Script configured to use single `info-page` model (simplest option)
**Next Step**: Create the `info-page` model in Builder.io and test!
