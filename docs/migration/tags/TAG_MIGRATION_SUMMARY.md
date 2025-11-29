# ✅ Tag Migration Script - Complete!

## 🎉 What Was Created

### 1. Migration Script

**File:** `migrate-tags.js`

A comprehensive Node.js script that:

- ✅ Reads tags from `Tags_wix.csv`
- ✅ Transforms data to Builder.io format
- ✅ Uploads tags via Builder.io Write API
- ✅ Handles master tag references in second pass
- ✅ Tracks progress in mapping file
- ✅ Resumes from failures automatically
- ✅ Provides colored console output
- ✅ Includes rate limiting protection

### 2. Documentation

**Files:**

- `TAG_MIGRATION_GUIDE.md` - Complete migration guide
- `MIGRATE_TAGS_QUICK_REF.md` - Quick reference card

### 3. Updated Dependencies

**File:** `package.json`

- Added `csv-parse` dependency for CSV processing

---

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Usage

```bash
# Step 1: Migrate tags (without master tag links)
node migrate-tags.js all

# Step 2: Link master tag references
node migrate-tags.js all migrateMasterTags
```

---

## 📊 How It Works

### Two-Pass Migration

```
Pass 1: Create Tags
├── Read Tags_wix.csv
├── Transform each row to Builder.io format
├── Create tag via Write API
├── Store Wix ID → Builder.io ID mapping
└── Save progress to tag-migration-mapping.json

Pass 2: Link Master Tags
├── Read tag-migration-mapping.json
├── Find tags with masterTag in Wix
├── Look up Builder.io ID of master tag
├── Update tag with reference
└── Log success/failures
```

### Data Flow

```
Tags_wix.csv
    ↓
migrate-tags.js
    ↓
Transform Data (CSV → Builder.io format)
    ↓
Builder.io Write API
    ↓
Created Tags
    ↓
tag-migration-mapping.json (Wix ID ↔ Builder.io ID)
    ↓
Second Pass: Update Master Tag References
    ↓
Complete Migration ✅
```

---

## 🗺️ Data Mapping

| Wix CSV Column | Builder.io Field   | Type      | Notes                                  |
| -------------- | ------------------ | --------- | -------------------------------------- |
| Name           | `data.name`        | string    | Tag display name                       |
| Tag Type       | `data.tagType`     | string    | person, organisation, project, etc.    |
| Tag Line       | `data.tagLine`     | string    | Short description                      |
| Picture        | `data.picture`     | string    | Image URL                              |
| Tag Page Link  | `data.tagPageLink` | string    | Link to tag page                       |
| ID             | `data.wixId`       | string    | Original Wix ID (stored for reference) |
| Master Tag     | `data.masterTag`   | reference | Linked in second pass                  |

---

## 📁 Files Generated

### tag-migration-mapping.json

Tracks migration progress and mappings:

```json
{
  "wixToBuilder": {
    "wix-id-123": {
      "builderId": "builder-id-xyz",
      "name": "Tag Name",
      "masterTagWixId": "master-wix-id-456"
    }
  },
  "builderToWix": {
    "builder-id-xyz": "wix-id-123"
  },
  "migratedCount": 100,
  "lastMigrated": "2025-01-13T10:00:00.000Z"
}
```

**Purpose:**

- Resume failed migrations
- Link master tag references
- Audit trail
- Debugging

---

## 🛡️ Safety Features

### 1. Duplicate Prevention

- Checks mapping file before creating
- Skips already-migrated tags
- No accidental duplicates

### 2. Progress Persistence

- Saves after each successful creation
- Can resume from any point
- Safe to interrupt and restart

### 3. Error Handling

- Individual failures don't stop migration
- Detailed error messages
- Summary shows success/failure counts

### 4. Rate Limiting

- 200ms delay between requests
- Prevents API rate limit errors
- Configurable in code

---

## 💡 Usage Examples

### Test with Small Batch

```bash
node migrate-tags.js 5
```

Migrate first 5 tags to verify setup.

### Migrate Specific Number

```bash
node migrate-tags.js 100
```

Migrate first 100 tags.

### Migrate All Tags

```bash
node migrate-tags.js all
```

Migrate all 3087 tags from CSV.

### Update Master Tag References

```bash
node migrate-tags.js all migrateMasterTags
```

Link master tag references after all tags created.

### Show Help

```bash
node migrate-tags.js
```

Display usage information.

---

## 📈 Expected Output

### Console Output

```
🚀 Starting Tag Migration to Builder.io

ℹ Reading CSV file...
✓ Found 3087 tags in CSV
ℹ Migrating 3087 tags...

✓ [1/3087] Created: Alex Ciobanasu (ID: abc123...)
✓ [2/3087] Created: John Doe (ID: def456...)
⚠ [3/3087] Skipping Jane Smith (already migrated)
✓ [4/3087] Created: Project Alpha (ID: xyz789...)

...

📊 Migration Summary
✓ Successfully migrated: 3085 tags
✗ Failed: 2 tags
ℹ Mapping saved to: ./tag-migration-mapping.json

💡 Next step: Run with "migrateMasterTags" flag to link master tags
   Example: node migrate-tags.js all migrateMasterTags
```

---

## ✅ Success Criteria

Your migration is successful when:

1. **All tags created**: Count in Builder.io = Count in CSV
2. **Mapping complete**: `tag-migration-mapping.json` exists
3. **Data accurate**: Spot-check tags match CSV
4. **Master tags linked**: Second pass completed successfully
5. **No errors**: Or minimal errors with clear reasons

---

## 🔍 Verification Steps

### 1. Check Builder.io Dashboard

```
Go to: https://builder.io
Navigate to: Models → tag
Verify: Tag count matches CSV row count
```

### 2. Verify Mapping File

```bash
cat tag-migration-mapping.json | grep migratedCount
# Should show: "migratedCount": 3087
```

### 3. Spot-Check Tags

```
In Builder.io:
- Open random tag
- Verify: name, tagType, tagLine, picture match CSV
- Check: masterTag reference (if applicable)
```

### 4. Test in Application

```
Use tags in your application
Verify they display and function correctly
```

---

## 🐛 Common Issues & Solutions

### Issue: "API Key not found"

```bash
# Solution: Add to .env.local
NEXT_PUBLIC_BUILDER_API_KEY=your-key-here
```

### Issue: "Module not found: csv-parse"

```bash
# Solution: Install dependencies
npm install
```

### Issue: "Master tag not found"

```bash
# Solution: Ensure Pass 1 completed first
node migrate-tags.js all
# Then run Pass 2
node migrate-tags.js all migrateMasterTags
```

### Issue: Rate limiting (429 errors)

```javascript
// Solution: Increase delay in migrate-tags.js
// Change: setTimeout(resolve, 200)
// To: setTimeout(resolve, 500)
```

---

## 📝 Migration Checklist

### Pre-Migration

- [ ] `csv-parse` installed (`npm install`)
- [ ] `Tags_wix.csv` exists in project root
- [ ] `.env.local` configured with API key
- [ ] Builder.io "tag" model exists
- [ ] Tested with small batch (5-10 tags)

### During Migration

- [ ] Pass 1 running (`node migrate-tags.js all`)
- [ ] Monitoring console for errors
- [ ] `tag-migration-mapping.json` being created
- [ ] No repeated failures

### Post-Migration

- [ ] All tags created in Builder.io
- [ ] Tag count verified
- [ ] Pass 2 completed (`migrateMasterTags`)
- [ ] Master tag references verified
- [ ] Mapping file backed up
- [ ] Tags tested in application

---

## 🎓 Key Features

### Command Arguments

- **Flexible count**: `1`, `10`, `100`, or `all`
- **Master tag flag**: `migrateMasterTags`
- **Help command**: No arguments shows usage

### Smart Resume

- Automatically skips migrated tags
- Safe to run multiple times
- No duplicate creation

### Progress Tracking

- Real-time console updates
- Colored status indicators
- Success/failure counts
- Mapping file for audit

### Error Resilience

- Continues on individual failures
- Logs detailed error messages
- Summary shows what failed
- Easy to identify issues

---

## 📚 Documentation

| File                        | Purpose                               |
| --------------------------- | ------------------------------------- |
| `TAG_MIGRATION_GUIDE.md`    | Complete step-by-step guide           |
| `MIGRATE_TAGS_QUICK_REF.md` | Quick reference card                  |
| `TAG_MIGRATION_SUMMARY.md`  | This file - overview                  |
| `migrate-tags.js`           | Migration script with inline comments |

---

## 🎯 Next Steps

1. **Install dependencies**: `npm install`
2. **Test with 5 tags**: `node migrate-tags.js 5`
3. **Verify in Builder.io**: Check tags were created
4. **Migrate all**: `node migrate-tags.js all`
5. **Link master tags**: `node migrate-tags.js all migrateMasterTags`
6. **Verify completion**: Check Builder.io dashboard
7. **Test in app**: Use tags in your application

---

## 💪 You're Ready!

Everything is set up for a smooth migration:

- ✅ Comprehensive script
- ✅ Detailed documentation
- ✅ Safety features
- ✅ Error handling
- ✅ Progress tracking

**Start your migration:**

```bash
node migrate-tags.js 5  # Test first!
```

---

**Happy migrating! 🚀**
