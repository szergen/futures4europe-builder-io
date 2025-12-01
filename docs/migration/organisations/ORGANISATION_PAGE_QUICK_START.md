# Organisation Page - Builder.io Quick Start

## ✅ Migration Complete

The Organisation Page now loads data **exclusively from Builder.io** (no Wix fallback).

## 🚀 How It Works

### Data Flow

```
Builder.io "info-page" model
         ↓
getBuilderInfoPageBySlug(slug)
         ↓
transformBuilderInfoPageToWixFormat()
         ↓
OrganisationPageComponent
```

### Files Involved

1. **`app/utils/builderInfoPageUtils.ts`** - Fetch & transform logic
2. **`app/organisation-page/[slug]/page.tsx`** - Page component
3. **Builder.io "info-page" model** - Data source

## 📝 Creating Organisation Pages in Builder.io

### Required Fields

| Field          | Type            | Example                        |
| -------------- | --------------- | ------------------------------ |
| `title`        | Text            | "UEFISCDI"                     |
| `subtitle`     | Text            | "Research Agency"              |
| `slug`         | Text            | "/organisation/uefiscdi-kp7s3" |
| `organisation` | Reference (tag) | Select org tag                 |

### Optional Fields

**Rich Text:**

- `postContentRIch1`, `postContentRIch2`, `postContentRIch3`

**Links:**

- `linkedinLink`, `orcidLink`, `researchGateLink`, `websiteLink`

**Tag References:**

- `activity[]`, `author[]`, `countryTag[]`, `domains[]`
- `methods[]`, `organisationProject[]`, `organisationType[]`
- `pageOwner[]`, `pageTypes[]`, `person[]`, `project[]`

## 🔍 Testing

### Local Development

```bash
npm run dev
```

Visit: `http://localhost:3000/organisation/[slug]`

### Check It's Working

1. **Look for the blue badge** (bottom-right corner):

   ```
   🔷 Builder.io
   ```

2. **Check console logs**:

   ```
   [Builder.io] ✅ Rendering organisation page: uefiscdi-kp7s3
   ```

3. **No Wix API calls** in Network tab

## 📊 Data Structure

### Builder.io Format (Input)

```json
{
  "data": {
    "title": "UEFISCDI",
    "slug": "/organisation/uefiscdi-kp7s3",
    "organisation": [
      {
        "organisationItem": {
          "@type": "@builder.io/core:Reference",
          "id": "abc123",
          "model": "tag",
          "value": {
            "data": {
              "name": "UEFISCDI",
              "tagType": "organisation",
              "picture": "https://..."
            }
          }
        }
      }
    ]
  }
}
```

### Component Format (Output)

```json
{
  "data": {
    "title": "UEFISCDI",
    "slug": "/organisation/uefiscdi-kp7s3",
    "organisation": [
      {
        "_id": "abc123",
        "name": "UEFISCDI",
        "tagType": "organisation",
        "picture": "https://..."
      }
    ]
  }
}
```

## ⚠️ Known Limitations

### Affiliations

Currently returns empty array:

```typescript
affiliationsItems: [];
```

**Why?** Affiliations haven't been migrated to Builder.io yet.

**When fixed:** Update `getBuilderAffiliationsByOrgTag()` in `builderInfoPageUtils.ts`

## 🐛 Troubleshooting

### Page Not Found

**Symptom:** 404 or "Organisation Not Found" message

**Check:**

1. Is the page published in Builder.io?
2. Does the slug match exactly?
3. Does it have an `organisation` tag reference?

**Console:**

```
[Builder.io] ❌ Organisation page not found: uefiscdi-kp7s3
```

### No Data Rendering

**Check:**

1. Page is published in Builder.io
2. `organisation` field has a tag reference
3. Required fields (`title`, `slug`) are filled

### Tags Not Showing

**Check:**

1. Tags are created in Builder.io
2. Tag references use correct format (`@builder.io/core:Reference`)
3. Tag model is "tag" not "tags"

## 🎯 Quick Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Check static paths generation
# Look for: "[Static Paths] Generated X organisation slug(s)"
```

## 📚 Reference

- **Full Migration Guide:** `ORGANISATION_PAGE_MIGRATION.md`
- **Example Payload:** `example_info_page.json`
- **Utility Functions:** `app/utils/builderInfoPageUtils.ts`
- **Page Component:** `app/organisation-page/[slug]/page.tsx`

## 🔗 Related Migrations

- **Post Pages:** Similar implementation in `app/utils/builderPostUtils.ts`
- **Tags:** Migration script in `migrate-tags.js`

---

**Need help?** Check the full migration guide: `ORGANISATION_PAGE_MIGRATION.md`
