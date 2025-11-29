# Person Page Migration to Builder.io

## Overview

The Person Page has been successfully migrated from Wix to Builder.io's "info-page" model (same as Organisation Pages). This document explains the changes and how the system now works.

## Files Changed

### 1. Updated Utility File

**`app/utils/builderInfoPageUtils.ts`**

- Added `getBuilderPersonPageBySlug(slug)` - Fetches person page by slug
- Added `getAllBuilderPersonPages()` - Fetches all person pages
- Added `getBuilderAffiliationsByPersonTag()` - Placeholder for affiliations
- Reuses `transformBuilderInfoPageToWixFormat()` from organisation migration

### 2. Updated Page Component

**`app/person-page/[slug]/page.tsx`**

- Now fetches data exclusively from Builder.io
- Uses Builder.io SDK for content retrieval
- Removed all Wix dependencies
- Added development indicator (🔷 Builder.io badge)

## Key Functions

### `getBuilderPersonPageBySlug(slug: string)`

Fetches a single person page from Builder.io by slug.

- Tries full path: `/person/{slug}`
- Falls back to just `{slug}` if not found

### `getAllBuilderPersonPages()`

Fetches all person pages from Builder.io.

- Filters for pages with `person` tag
- Used for `generateStaticParams`

### `transformBuilderInfoPageToWixFormat(builderInfoPage)`

Same transformation function used for organisation pages.
Transforms Builder.io's nested reference structure to flat format.

## Data Model

Uses the **same "info-page" model** as Organisation Pages, but filters by different fields:

### Organisation Pages

```typescript
{
  query: {
    "data.slug": { $exists: true },
    "data.organisation": { $exists: true }  // Filter by organisation
  }
}
```

### Person Pages

```typescript
{
  query: {
    "data.slug": { $exists: true },
    "data.person": { $exists: true }  // Filter by person
  }
}
```

## Data Mapping

All field mappings are the same as Organisation Pages. See `ORGANISATION_PAGE_MIGRATION.md` for complete mapping tables.

### Key Fields for Person Pages

- `data.person[]` - Array of person tag references (primary identifier)
- `data.title` - Person's name or page title
- `data.subtitle` - Tagline or description
- `data.slug` - URL slug (e.g., `/person/john-doe-abc123`)
- `data.postContentRIch1/2/3` - Rich text content sections
- `data.linkedinLink`, `orcidLink`, `researchGateLink`, `websiteLink` - Social links

## How It Works

### 1. Static Site Generation (SSG)

```typescript
generateStaticParams();
```

- Fetches all person pages from Builder.io
- Filters for pages with person tags
- Generates slug params for pre-rendering

### 2. Metadata Generation

```typescript
generateMetadata({ params });
```

- Fetches page by slug
- Transforms data
- Generates OpenGraph metadata with person's picture

### 3. Page Rendering

```typescript
PersonPage({ params });
```

- Fetches page by slug from Builder.io
- Transforms data to component format
- Gets affiliations (currently empty)
- Renders `PersonPageComponent`

## Affiliations

Currently, affiliations return an empty array as they haven't been migrated to Builder.io yet.

**Function:** `getBuilderAffiliationsByPersonTag(personTagId)`

- Returns: `[]` (empty array)
- TODO: Implement when affiliations are migrated
- Queries will use `"personTag"` field instead of `"organisationTag"`

## Development Mode Indicator

In development, a blue badge appears in the bottom-right:

```
🔷 Builder.io
```

This confirms data is being loaded from Builder.io.

## Testing

### View a Page

```
http://localhost:3000/person/[slug]
```

Example:

```
http://localhost:3000/person/sergiu-ciobanasu-ugkrj
```

### Check Console Logs

Look for:

```
[Builder.io] ✅ Rendering person page: sergiu-ciobanasu-ugkrj
[Static Paths] Generated 10 person slug(s) from Builder.io
```

### Verify Data Source

- Look for the blue "🔷 Builder.io" badge (dev mode)
- Check browser console for Builder.io logs
- Inspect Network tab for builder.io API calls

## Error Handling

### Page Not Found

```typescript
if (!builderInfoPage) {
  return <div>Person Not Found</div>;
}
```

### Missing Data

All transformations handle missing data gracefully with:

- Empty arrays for missing reference arrays
- Empty strings for missing text fields
- `undefined` for optional fields

## Differences from Organisation Pages

### Query Differences

| Aspect             | Organisation Pages        | Person Pages        |
| ------------------ | ------------------------- | ------------------- |
| Filter field       | `data.organisation`       | `data.person`       |
| URL prefix         | `/organisation/`          | `/person/`          |
| Primary image      | `organisation[0].picture` | `person[0].picture` |
| Affiliations field | `organisationTag`         | `personTag`         |

### Implementation Similarities

Both pages:

- Use the same `transformBuilderInfoPageToWixFormat()` function
- Use the same data model ("info-page")
- Have the same field structure
- Share the same transformation logic

## Migration Checklist

- [x] Add person-specific utility functions
- [x] Update page component to use Builder.io
- [x] Update metadata generation
- [x] Update static params generation
- [x] Add error handling
- [x] Add development indicator
- [x] Remove Wix dependencies
- [ ] Migrate affiliations to Builder.io
- [ ] Test with production data

## Next Steps

1. **Test with actual Builder.io data**

   - Create test person pages in Builder.io
   - Verify all fields render correctly
   - Check tag references work properly

2. **Migrate Affiliations**

   - Create affiliations model in Builder.io
   - Implement `getBuilderAffiliationsByPersonTag()`
   - Update transformation logic

3. **Performance Testing**
   - Verify SSG works correctly
   - Check page load times
   - Monitor Builder.io API calls

## Related Files

- `app/utils/builderInfoPageUtils.ts` - Shared utility functions
- `app/page-components/PersonPageComponent/` - Component consuming this data
- `example_info_page.json` - Sample Builder.io info-page structure
- `ORGANISATION_PAGE_MIGRATION.md` - Similar implementation for organisations

## Support

For issues or questions about this migration:

1. Check Builder.io console for API errors
2. Verify data structure in Builder.io matches `example_info_page.json`
3. Check transformation logic in `builderInfoPageUtils.ts`
4. Refer to `ORGANISATION_PAGE_MIGRATION.md` for similar patterns
