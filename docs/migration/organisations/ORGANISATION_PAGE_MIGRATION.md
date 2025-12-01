# Organisation Page Migration to Builder.io

## Overview

The Organisation Page has been successfully migrated from Wix to Builder.io's "info-page" model. This document explains the changes and how the system now works.

## Files Changed

### 1. New Utility File

**`app/utils/builderInfoPageUtils.ts`**

- Fetches and transforms Builder.io info-page data
- Handles nested reference structures from Builder.io
- Maps data to format expected by `OrganisationPageComponent`

### 2. Updated Page Component

**`app/organisation-page/[slug]/page.tsx`**

- Now fetches data exclusively from Builder.io
- Uses Builder.io SDK for content retrieval
- Removed all Wix dependencies

### 3. Updated Builder Component

**`app/shared-components/Builder/BuilderContent.tsx`**

- Added "info-page" to valid model types

## Key Functions

### `getBuilderInfoPageBySlug(slug: string)`

Fetches a single organisation page from Builder.io by slug.

- Tries full path: `/organisation/{slug}`
- Falls back to just `{slug}` if not found

### `getAllBuilderOrganisationPages()`

Fetches all organisation pages from Builder.io.

- Filters for pages with `organisation` tag
- Used for `generateStaticParams`

### `transformBuilderInfoPageToWixFormat(builderInfoPage)`

Transforms Builder.io's nested structure to flat format.

**Input (Builder.io format):**

```json
{
  "data": {
    "organisation": [
      {
        "organisationItem": {
          "@type": "@builder.io/core:Reference",
          "id": "...",
          "model": "tag",
          "value": {
            "data": {
              "name": "UEFISCDI",
              "tagType": "organisation"
            }
          }
        }
      }
    ]
  }
}
```

**Output (Component format):**

```json
{
  "data": {
    "organisation": [
      {
        "_id": "...",
        "name": "UEFISCDI",
        "tagType": "organisation"
      }
    ]
  }
}
```

## Data Mapping

### Basic Fields

| Builder.io Field | Component Field           | Notes         |
| ---------------- | ------------------------- | ------------- |
| `data.title`     | `data.title`              | Page title    |
| `data.subtitle`  | `data.subtitle`           | Page subtitle |
| `data.slug`      | `data.slug`               | URL slug      |
| `createdDate`    | `data._createdDate.$date` | Timestamp     |
| `lastUpdated`    | `data._updatedDate.$date` | Timestamp     |

### Rich Text Content

| Builder.io Field        | Component Field         | Type |
| ----------------------- | ----------------------- | ---- |
| `data.postContentRIch1` | `data.postContentRIch1` | HTML |
| `data.postContentRIch2` | `data.postContentRIch2` | HTML |
| `data.postContentRIch3` | `data.postContentRIch3` | HTML |

### Social Links

| Builder.io Field        | Component Field         | Type |
| ----------------------- | ----------------------- | ---- |
| `data.linkedinLink`     | `data.linkedinLink`     | URL  |
| `data.orcidLink`        | `data.orcidLink`        | URL  |
| `data.researchGateLink` | `data.researchGateLink` | URL  |
| `data.websiteLink`      | `data.websiteLink`      | URL  |

### Reference Arrays (Tags)

All tag references are transformed from nested structure to flat:

| Builder.io Field           | Component Field              | Item Key                  |
| -------------------------- | ---------------------------- | ------------------------- |
| `data.activity`            | `data.activity[]`            | `activityItem`            |
| `data.author`              | `data.author[]`              | `authorItem`              |
| `data.countryTag`          | `data.countryTag[]`          | `countryTagItem`          |
| `data.domains`             | `data.domains[]`             | `domainsItem`             |
| `data.methods`             | `data.methods[]`             | `methodsItem`             |
| `data.organisation`        | `data.organisation[]`        | `organisationItem`        |
| `data.organisationProject` | `data.organisationProject[]` | `organisationProjectItem` |
| `data.organisationType`    | `data.organisationType[]`    | `organisationTypeItem`    |
| `data.pageOwner`           | `data.pageOwner[]`           | `pageOwnerItem`           |
| `data.pageTypes`           | `data.pageTypes[]`           | `pageTypeItem`            |
| `data.person`              | `data.person[]`              | `personItem`              |
| `data.project`             | `data.project[]`             | `projectItem`             |

## Affiliations

Currently, affiliations return an empty array as they haven't been migrated to Builder.io yet.

**Function:** `getBuilderAffiliationsByOrgTag(organisationTagId)`

- Returns: `[]` (empty array)
- TODO: Implement when affiliations are migrated

## How It Works

### 1. Static Site Generation (SSG)

```typescript
generateStaticParams();
```

- Fetches all organisation pages from Builder.io
- Filters for pages with organisation tags
- Generates slug params for pre-rendering

### 2. Metadata Generation

```typescript
generateMetadata({ params });
```

- Fetches page by slug
- Transforms data
- Generates OpenGraph metadata

### 3. Page Rendering

```typescript
OrganisationPage({ params });
```

- Fetches page by slug from Builder.io
- Transforms data to component format
- Gets affiliations (currently empty)
- Renders `OrganisationPageComponent`

## Development Mode Indicator

In development, a blue badge appears in the bottom-right:

```
🔷 Builder.io
```

This confirms data is being loaded from Builder.io.

## Testing

### View a Page

```
http://localhost:3000/organisation/[slug]
```

Example:

```
http://localhost:3000/organisation/uefiscdi-kp7s3
```

### Check Console Logs

Look for:

```
[Builder.io] ✅ Rendering organisation page: uefiscdi-kp7s3
[Static Paths] Generated 5 organisation slug(s) from Builder.io
```

### Verify Data Source

- Look for the blue "🔷 Builder.io" badge (dev mode)
- Check browser console for Builder.io logs
- Inspect Network tab for builder.io API calls

## Error Handling

### Page Not Found

```typescript
if (!builderInfoPage) {
  return <div>Organisation Not Found</div>;
}
```

### Missing Data

All transformations handle missing data gracefully with:

- Empty arrays for missing reference arrays
- Empty strings for missing text fields
- `undefined` for optional fields

## Migration Checklist

- [x] Create utility functions for fetching Builder.io data
- [x] Create transformation function for data mapping
- [x] Update page component to use Builder.io
- [x] Update metadata generation
- [x] Update static params generation
- [x] Add error handling
- [x] Add development indicator
- [ ] Migrate affiliations to Builder.io
- [ ] Test with production data

## Next Steps

1. **Test with actual Builder.io data**

   - Create test organisation pages in Builder.io
   - Verify all fields render correctly
   - Check tag references work properly

2. **Migrate Affiliations**

   - Create affiliations model in Builder.io
   - Implement `getBuilderAffiliationsByOrgTag()`
   - Update transformation logic

3. **Performance Testing**
   - Verify SSG works correctly
   - Check page load times
   - Monitor Builder.io API calls

## Related Files

- `app/utils/builderPostUtils.ts` - Similar implementation for posts
- `app/page-components/OrganisationPageComponent/` - Component consuming this data
- `example_info_page.json` - Sample Builder.io info-page structure

## Support

For issues or questions about this migration:

1. Check Builder.io console for API errors
2. Verify data structure in Builder.io matches `example_info_page.json`
3. Check transformation logic in `builderInfoPageUtils.ts`
