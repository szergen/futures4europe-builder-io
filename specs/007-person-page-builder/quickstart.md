# Quick Start: Person-Page Builder.io Migration

**Feature**: 007-person-page-builder
**Date**: 2025-12-05

## Prerequisites

Before starting implementation, verify:

- [ ] Branch `006-organisation-page-builder` is merged to `main` (or working from same branch)
- [ ] Builder.io `info-page` model exists with all person fields
- [ ] Builder.io `affiliations` model exists
- [ ] Builder.io `tag` model exists
- [ ] Redis cache is configured (Upstash)
- [ ] `BUILDER_PRIVATE_API_KEY` environment variable is set

## Implementation Steps

### Step 1: Add Transform Function

Add to `app/utils/builderInfoPageUtils.ts`:

```typescript
export function transformPersonDataForBuilder(
  personData: any,
  contentText: string[],
  contentImages: any[]
): any {
  const data: any = {
    title: personData.personTag?.name || "",
    description: personData.description || "",
    slug: personData.slug || "",

    // Links (person-specific)
    linkedinLink: personData.linkedinLink || "",
    websiteLink: personData.websiteLink || "",
    researchGateLink: personData.researchGateLink || "",
    orcidLink: personData.orcidLink || "",
    mediaFiles: personData.mediaFiles || [],

    // Reference fields with wrapper keys
    person: transformReferencesForBuilderCreate(
      personData.personTag ? [personData.personTag] : [],
      "tag",
      "personItem"
    ),
    pageOwner: transformReferencesForBuilderCreate(
      personData.pageOwner,
      "tag",
      "pageOwnerItem"
    ),
    author: transformReferencesForBuilderCreate(
      personData.author,
      "tag",
      "authorItem"
    ),
    pageTypes: transformReferencesForBuilderCreate(
      personData.pageType ? [personData.pageType] : [],
      "tag",
      "pageTypeItem"
    ),
    countryTag: transformReferencesForBuilderCreate(
      personData.countryTag ? [personData.countryTag] : [],
      "tag",
      "countryTagItem"
    ),
    methods: transformReferencesForBuilderCreate(
      personData.methods,
      "tag",
      "methodsItem"
    ),
    domains: transformReferencesForBuilderCreate(
      personData.domains,
      "tag",
      "domainsItem"
    ),
    activity: transformReferencesForBuilderCreate(
      personData.activity,
      "tag",
      "activityItem"
    ),
  };

  // Clean undefined fields
  Object.keys(data).forEach((key) => {
    if (data[key] === undefined) delete data[key];
  });

  return data;
}
```

### Step 2: Add Create/Update Functions

Add to `app/utils/builderInfoPageUtils.ts`:

```typescript
export async function createBuilderPersonPage(
  personData: any,
  contentText: string[],
  contentImages: any[]
): Promise<any> {
  const data = transformPersonDataForBuilder(
    personData,
    contentText,
    contentImages
  );

  const response = await fetch("/api/builder/info-page", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: personData.personTag?.name || "Untitled Person",
      data,
      published: "published",
    }),
  });

  if (!response.ok) throw new Error("Failed to create person page");
  return response.json();
}

export async function updateBuilderPersonPage(
  pageId: string,
  personData: any,
  contentText: string[],
  contentImages: any[]
): Promise<any> {
  const data = transformPersonDataForBuilder(
    personData,
    contentText,
    contentImages
  );

  const response = await fetch(`/api/builder/info-page/${pageId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: personData.personTag?.name || "Untitled Person",
      data,
      published: "published",
    }),
  });

  if (!response.ok) throw new Error("Failed to update person page");
  return response.json();
}
```

### Step 3: Update PersonPageComponent

In `app/page-components/PersonPageComponent/PersonPageComponent.tsx`:

1. **Remove Wix CMS imports** (keep `updateMember`):

```typescript
// REMOVE these:
// import { items } from "@wix/data";
// import { useWixModules } from "@wix/sdk-react";
// import { bulkInsertItems, bulkRemoveItems, replaceDataItemReferences } from ...

// KEEP this:
import { updateMember } from "@app/wixUtils/client-side";
```

2. **Add Builder.io imports**:

```typescript
import {
  createBuilderPersonPage,
  updateBuilderPersonPage,
} from "@app/utils/builderInfoPageUtils";
import {
  bulkCreateAffiliations,
  bulkDeleteAffiliations,
} from "@app/utils/builderAffiliationUtils";
```

3. **Add AuthContext imports**:

```typescript
const {
  updateTag,
  appendAffiliations,
  removeAffiliations,
  // ... existing destructures
} = useAuth();
```

4. **Remove `handleTagCreated()` on mount** (around line 1114):

```typescript
// REMOVE this useEffect:
// useEffect(() => {
//   isNewPage && handleTagCreated();
// }, []);
```

### Step 4: Replace Save Functions

Replace `createNewPersonPage` and `updateDataToServer` to:

- Use `createBuilderPersonPage` / `updateBuilderPersonPage`
- Use `bulkCreateAffiliations` / `bulkDeleteAffiliations`
- Call `updateTag()` after tag changes
- Call `appendAffiliations()` / `removeAffiliations()` after affiliation changes
- **KEEP** `updateMember()` call for Wix nickname sync

Example pattern for tag update:

```typescript
// Update person tag in Builder.io
const tagResponse = await fetch(
  `/api/builder/tag/${personData.personTag._id}`,
  {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: {
        name: personData.personTag.name,
        tagPageLink: `/person/${slug}`,
        // ... other tag fields
      },
    }),
  }
);

// Update React state
updateTag(personData.personTag._id, personData.personTag);

// KEEP: Update Wix nickname (DO NOT REMOVE)
if (personData.personTag.name !== userDetails.userName) {
  await updateMember(userDetails.contactId, personData.personTag.name);
  updateUserDetails((prev) => ({
    ...prev,
    userName: personData.personTag.name,
  }));
}
```

## Testing Checklist

### Create New Person Page

- [ ] Navigate to `/person-page/New_Person`
- [ ] Fill in description
- [ ] Add current affiliation with role
- [ ] Add former affiliation with role
- [ ] Add project coordination
- [ ] Add project participation
- [ ] Select country, methods, domains
- [ ] Click "Publish"
- [ ] Verify redirect to new page
- [ ] Verify page exists in Builder.io
- [ ] Verify affiliations exist in Builder.io with correct `extraIdentifier`
- [ ] Verify person tag `tagPageLink` updated

### Edit Existing Person Page

- [ ] Open owned person page
- [ ] Click "Edit"
- [ ] Change description
- [ ] Change person tag name
- [ ] Modify affiliations
- [ ] Click "Save & publish"
- [ ] Verify changes in Builder.io
- [ ] Verify tag updated in Builder.io
- [ ] Verify Wix nickname updated (check member profile)
- [ ] Verify React state updated immediately

### Cache Behavior

- [ ] Open browser Network tab
- [ ] Create/edit person page
- [ ] Verify NO full Redis cache invalidation
- [ ] Verify NO `handleTagCreated` call on page load

## Troubleshooting

### "Failed to create person page"

- Check Builder.io private API key is set
- Check `/api/builder/info-page` route exists
- Check network tab for specific error

### Affiliations not appearing

- Check `extraIdentifier` is set correctly
- Check `personTag` reference is included
- Check `appendAffiliations()` is called after create

### Wix nickname not updating

- Ensure `updateMember` import is retained
- Check `userDetails.contactId` is available
- Check Wix SDK is initialized

### React state not updating

- Ensure `updateTag()` is called after tag update
- Ensure `appendAffiliations()`/`removeAffiliations()` called after affiliation changes
- Check AuthContext is properly provided
