# 🏷️ Tag Migration Guide: Wix → Builder.io

## Overview

This guide explains how to migrate tags from Wix CSV export to Builder.io using the `migrate-tags.js` script.

---

## 📋 Prerequisites

### 1. Install Dependencies

```bash
npm install csv-parse
# or
yarn add csv-parse
```

### 2. Verify Files

Ensure these files exist:

- ✅ `Tags_wix.csv` - Your Wix tags export
- ✅ `.env.local` - Contains `NEXT_PUBLIC_BUILDER_API_KEY`
- ✅ `migrate-tags.js` - Migration script

### 3. API Key Setup

Your `.env.local` should contain:

```bash
NEXT_PUBLIC_BUILDER_API_KEY=your-api-key-here
```

---

## 🚀 Quick Start

### Step 1: Test with Small Batch

Start by migrating just a few tags to test:

```bash
node migrate-tags.js 5
```

This will:

- Migrate the first 5 tags from CSV
- Create them in Builder.io
- Generate `tag-migration-mapping.json`

### Step 2: Verify in Builder.io

1. Go to https://builder.io
2. Navigate to your "tag" model
3. Verify the 5 tags were created correctly
4. Check that data fields are mapped properly

### Step 3: Migrate All Tags

Once verified, migrate all tags:

```bash
node migrate-tags.js all
```

### Step 4: Link Master Tags

After all tags are created, link master tag references:

```bash
node migrate-tags.js all migrateMasterTags
```

---

## 📖 Script Usage

### Syntax

```bash
node migrate-tags.js <count> [migrateMasterTags]
```

### Arguments

| Argument            | Description                  | Required | Examples                |
| ------------------- | ---------------------------- | -------- | ----------------------- |
| `count`             | Number of tags to migrate    | ✅ Yes   | `1`, `10`, `100`, `all` |
| `migrateMasterTags` | Update master tag references | No       | `migrateMasterTags`     |

### Examples

```bash
# Migrate first 10 tags
node migrate-tags.js 10

# Migrate first 100 tags
node migrate-tags.js 100

# Migrate all tags
node migrate-tags.js all

# Update master tag references (after migration)
node migrate-tags.js all migrateMasterTags

# Show help
node migrate-tags.js
```

---

## 🗺️ Data Mapping

### CSV → Builder.io Mapping

| CSV Column    | Builder.io Field   | Notes                               |
| ------------- | ------------------ | ----------------------------------- |
| Name          | `data.name`        | Tag name                            |
| Tag Type      | `data.tagType`     | person, organisation, project, etc. |
| Tag Line      | `data.tagLine`     | Short description                   |
| Picture       | `data.picture`     | Image URL                           |
| Tag Page Link | `data.tagPageLink` | Link to tag page                    |
| ID            | `data.wixId`       | Stored for reference                |
| Master Tag    | `data.masterTag`   | Linked in second pass               |

### Example Transformation

**Input (CSV Row):**

```csv
Name: "Alex Ciobanasu"
Tag Type: "person"
Tag Line: "Developer"
Picture: "https://..."
Tag Page Link: "/person/alex"
ID: "abc-123"
Master Tag: "xyz-456"
```

**Output (Builder.io):**

```json
{
  "name": "Alex Ciobanasu",
  "published": "published",
  "data": {
    "name": "Alex Ciobanasu",
    "tagType": "person",
    "tagLine": "Developer",
    "picture": "https://...",
    "tagPageLink": "/person/alex",
    "wixId": "abc-123"
  }
}
```

---

## 📁 Migration Mapping File

The script creates `tag-migration-mapping.json` to track migrated tags:

```json
{
  "wixToBuilder": {
    "abc-123": {
      "builderId": "xyz-789",
      "name": "Alex Ciobanasu",
      "masterTagWixId": "def-456"
    }
  },
  "builderToWix": {
    "xyz-789": "abc-123"
  },
  "migratedCount": 1,
  "lastMigrated": "2025-01-13T10:00:00.000Z"
}
```

### What It Tracks

- **wixToBuilder**: Maps Wix IDs → Builder.io IDs
- **builderToWix**: Reverse mapping
- **migratedCount**: Total successfully migrated
- **lastMigrated**: Last migration timestamp

### Why It's Important

1. **Resume Support**: If migration fails, you can resume without duplicates
2. **Master Tag Linking**: Required for second pass to link references
3. **Audit Trail**: Track what was migrated
4. **Debugging**: Verify mappings if issues occur

---

## 🔄 Two-Pass Migration Process

### Why Two Passes?

Master tags reference other tags. On the first run, referenced tags might not exist yet.

### Pass 1: Create Tags

```bash
node migrate-tags.js all
```

**What happens:**

- Creates all tags in Builder.io
- Stores Wix ID → Builder.io ID mapping
- Skips masterTag references (will be null)
- Saves progress to mapping file

### Pass 2: Link Master Tags

```bash
node migrate-tags.js all migrateMasterTags
```

**What happens:**

- Reads mapping file
- For each tag with a masterTag in Wix
- Finds the Builder.io ID of the master tag
- Updates the tag with the reference

---

## 📊 Progress Tracking

### Console Output

The script provides colored output:

```
🚀 Starting Tag Migration to Builder.io

ℹ Reading CSV file...
✓ Found 3087 tags in CSV
ℹ Migrating 10 tags...

✓ [1/10] Created: Alex Ciobanasu (ID: abc123...)
✓ [2/10] Created: John Doe (ID: def456...)
⚠ [3/10] Skipping Jane Smith (already migrated)
✗ [4/10] Failed to create Test Tag: HTTP 400

📊 Migration Summary
✓ Successfully migrated: 8 tags
✗ Failed: 1 tags
ℹ Mapping saved to: ./tag-migration-mapping.json
```

### Status Indicators

- ✓ (Green) - Success
- ✗ (Red) - Error
- ⚠ (Yellow) - Warning/Skip
- ℹ (Blue) - Info

---

## 🛡️ Safety Features

### 1. Duplicate Prevention

The script checks if a tag was already migrated:

```javascript
if (mapping.wixToBuilder[wixId]) {
  log.warning('Skipping (already migrated)');
  continue;
}
```

### 2. Progress Persistence

Progress is saved after each successful creation. If the script crashes, you can resume:

```bash
# Script crashed after 50 tags? Just run again:
node migrate-tags.js all
# Will skip the first 50 and continue from 51
```

### 3. Rate Limiting

200ms delay between requests to avoid API rate limits:

```javascript
await new Promise((resolve) => setTimeout(resolve, 200));
```

### 4. Error Handling

Errors don't stop the entire migration:

- Individual failures are logged
- Script continues with next tag
- Summary shows success/failure count

---

## 🐛 Troubleshooting

### Issue: "API Key not found"

**Solution:**

```bash
# Check .env.local exists and contains:
NEXT_PUBLIC_BUILDER_API_KEY=your-key-here

# Verify it's loaded:
echo $NEXT_PUBLIC_BUILDER_API_KEY
```

### Issue: "Failed to read CSV"

**Solution:**

```bash
# Verify file exists:
ls -la Tags_wix.csv

# Check file permissions:
chmod 644 Tags_wix.csv
```

### Issue: "HTTP 400: Bad Request"

**Possible causes:**

- Invalid data in CSV
- Missing required fields
- API key permissions

**Solution:**

```bash
# Test with one tag first:
node migrate-tags.js 1

# Check the console output for details
```

### Issue: "MasterTag not found"

**Cause:** The referenced master tag wasn't migrated yet.

**Solution:**

```bash
# Ensure ALL tags are migrated first:
node migrate-tags.js all

# Then run master tag linking:
node migrate-tags.js all migrateMasterTags
```

### Issue: Rate Limiting (429 errors)

**Solution:**

- Increase delay in script (line with `setTimeout`)
- Migrate in smaller batches
- Wait a few minutes between runs

---

## 📈 Best Practices

### 1. Test First

Always start with a small batch:

```bash
node migrate-tags.js 5
```

### 2. Backup Mapping File

Before second pass, backup the mapping:

```bash
cp tag-migration-mapping.json tag-migration-mapping.backup.json
```

### 3. Monitor Progress

Keep an eye on the console output:

- Watch for repeated errors
- Note which tags fail
- Check Builder.io dashboard periodically

### 4. Gradual Migration

For large datasets (3000+ tags), migrate in batches:

```bash
# Day 1: First 1000
node migrate-tags.js 1000

# Day 2: Next 1000
node migrate-tags.js 2000

# Day 3: Remaining
node migrate-tags.js all

# Day 4: Link master tags
node migrate-tags.js all migrateMasterTags
```

### 5. Verify After Migration

1. Check total count in Builder.io matches CSV
2. Spot-check random tags for data accuracy
3. Verify master tag references are correct
4. Test tags in your application

---

## 📝 Migration Checklist

### Before Migration

- [ ] `csv-parse` dependency installed
- [ ] `Tags_wix.csv` file exists
- [ ] `.env.local` with API key configured
- [ ] Builder.io "tag" model exists
- [ ] Backed up existing data (if any)

### During Migration

- [ ] Test with 5-10 tags first
- [ ] Verify test tags in Builder.io
- [ ] Run full migration
- [ ] Monitor console for errors
- [ ] Check mapping file is being created

### After Pass 1

- [ ] Verify tag count in Builder.io
- [ ] Spot-check tag data accuracy
- [ ] Backup `tag-migration-mapping.json`
- [ ] Ready to link master tags

### After Pass 2

- [ ] Verify master tag references
- [ ] Test tags in your application
- [ ] Document any failed migrations
- [ ] Keep mapping file for reference

---

## 🔧 Customization

### Modify Data Mapping

Edit the `transformTagData` function:

```javascript
function transformTagData(csvRow) {
  const data = {
    name: csvRow.Name,
    tagType: csvRow["Tag Type"] || "",
    // Add more fields here
    customField: csvRow["Custom Column"] || "",
  };

  return {
    name: csvRow.Name,
    published: "published",
    data: data,
  };
}
```

### Change Rate Limit Delay

Modify the delay (in milliseconds):

```javascript
// Current: 200ms
await new Promise((resolve) => setTimeout(resolve, 200));

// Slower: 500ms (for stricter rate limits)
await new Promise((resolve) => setTimeout(resolve, 500));

// Faster: 100ms (if you have higher limits)
await new Promise((resolve) => setTimeout(resolve, 100));
```

### Add Validation

Add custom validation before creation:

```javascript
function transformTagData(csvRow) {
  // Validate required fields
  if (!csvRow.Name) {
    throw new Error("Name is required");
  }

  if (!csvRow["Tag Type"]) {
    throw new Error("Tag Type is required");
  }

  // ... rest of transformation
}
```

---

## 📞 Support

### If Migration Fails

1. Check the mapping file - it shows what succeeded
2. Review console errors
3. Test with single tag to isolate issue
4. Check Builder.io API status
5. Verify API key permissions

### Common Solutions

| Issue              | Solution                                            |
| ------------------ | --------------------------------------------------- |
| Duplicates         | Delete `tag-migration-mapping.json` and start fresh |
| Partial migration  | Resume with same command - script skips migrated    |
| Master tags broken | Re-run with `migrateMasterTags` flag                |
| API errors         | Check Builder.io dashboard for model config         |

---

## 🎉 Success!

Once migration is complete:

1. ✅ All tags migrated to Builder.io
2. ✅ Master tag references linked
3. ✅ Mapping file preserved for reference
4. ✅ Ready to use tags in your application

### Next Steps

- Update your application to fetch tags from Builder.io
- Test tag functionality in your app
- Consider migrating other data models (posts, pages, etc.)

---

**Happy migrating! 🚀**
