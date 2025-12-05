# Quickstart: Organisation-Page Builder Migration

**Branch**: `006-organisation-page-builder` | **Time Estimate**: ~1.75 hours

## Prerequisites

✅ Branch `005-project-page-builder` is merged (or you're working on same branch)
✅ API routes exist: `/api/builder/info-page`, `/api/builder/affiliations`
✅ Utility functions exist in `builderAffiliationUtils.ts`
✅ `updateTag` function exists in `AuthContext.tsx`

## Step 1: Add Organisation Transform Function (30 min)

Add to `app/utils/builderInfoPageUtils.ts`:

```typescript
// Transform organisation data for Builder.io create/update
export function transformOrganisationDataForBuilder(
  organisationData: any,
  contentText: string[],
  contentImages: string[]
) {
  return {
    name: organisationData.organisationTag?.name || "Untitled Organisation",
    published: "published",
    data: {
      title: organisationData.organisationTag?.name,
      description: organisationData.description,
      slug: organisationData.slug,
      // Content sections
      postContentRIch1: contentText[0] || "",
      postContentRIch2: contentText[1] || "",
      // ... (repeat for 3-10)
      postImage1: contentImages[0] || "",
      postImage2: contentImages[1] || "",
      // ... (repeat for 3-10)
      // Organisation-specific fields
      organisationEstablishedDate: organisationData.organisationEstablishedDate,
      linkedinLink: organisationData.linkedinLink,
      websiteLink: organisationData.websiteLink,
      mediaFiles: organisationData.mediaFiles,
      // Reference fields (use transformReferencesForBuilderCreate)
      organisation: transformReferencesForBuilderCreate(
        organisationData.organisationTag ? [organisationData.organisationTag] : [],
        "tag",
        "organisationItem"
      ),
      pageOwner: transformReferencesForBuilderCreate(...),
      author: transformReferencesForBuilderCreate(...),
      pageTypes: transformReferencesForBuilderCreate(...),
      countryTag: transformReferencesForBuilderCreate(...),
      methods: transformReferencesForBuilderCreate(...),
      domains: transformReferencesForBuilderCreate(...),
      organisationType: transformReferencesForBuilderCreate(...),
      organisationHasMember: transformReferencesForBuilderCreate(...),
      organisationMemberOf: transformReferencesForBuilderCreate(...),
      activity: transformReferencesForBuilderCreate(...),
    },
  };
}

// Create organisation page
export async function createBuilderOrganisationPage(
  organisationData: any,
  contentText: string[],
  contentImages: string[]
) {
  const payload = transformOrganisationDataForBuilder(
    organisationData,
    contentText,
    contentImages
  );
  const response = await fetch("/api/builder/info-page", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.json();
}

// Update organisation page
export async function updateBuilderOrganisationPage(
  pageId: string,
  organisationData: any,
  contentText: string[],
  contentImages: string[]
) {
  const payload = transformOrganisationDataForBuilder(
    organisationData,
    contentText,
    contentImages
  );
  const response = await fetch(`/api/builder/info-page/${pageId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.json();
}
```

## Step 2: Modify OrganisationPageComponent (45 min)

### 2.1 Update Imports

Remove:

```typescript
import { useWixModules } from "@wix/sdk-react";
import { items } from "@wix/data";
import {
  bulkInsertItems,
  bulkRemoveItems,
  replaceDataItemReferences,
  updateDataItem,
} from "@app/wixUtils/client-side";
```

Add:

```typescript
import {
  createBuilderOrganisationPage,
  updateBuilderOrganisationPage,
} from "@app/utils/builderInfoPageUtils";
import {
  bulkCreateAffiliations,
  bulkDeleteAffiliations,
} from "@app/utils/builderAffiliationUtils";
```

### 2.2 Add updateTag to useAuth

```typescript
const { ..., updateTag } = useAuth();
```

### 2.3 Remove handleTagCreated on Mount

**DELETE this useEffect (around line 987-989):**

```typescript
useEffect(() => {
  isNewPage && handleTagCreated();
}, []);
```

### 2.4 Replace createNewOrganisationPage

Replace the entire function with Builder.io calls:

```typescript
const createNewOrganisationPage = async () => {
  console.log("[Builder.io] Creating New Organisation Info Page");
  setIsSaveInProgress(true);

  const slug =
    sanitizeTitleForSlug(organisationData.organisationTag?.name) +
    "-" +
    generateUniqueHash();

  // Create organisation page in Builder.io
  const result = await createBuilderOrganisationPage(
    { ...organisationData, slug },
    organisationData.contentText,
    organisationData.contentImages
  );

  if (!result.id) {
    console.error("[Builder.io] Failed to create organisation page");
    setIsSaveInProgress(false);
    return;
  }

  // Update organisation tag's tagPageLink
  if (organisationData.organisationTag?._id) {
    await fetch(`/api/builder/tag/${organisationData.organisationTag._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...organisationData.organisationTag,
        tagPageLink: `/organisation/${slug}`,
      }),
    });
  }

  // Create affiliations
  // ... (project affiliations with extraIdentifier: "projectOrganisationRole")
  // ... (people affiliations with extraIdentifier: "current")

  handleUserDataRefresh();
  await invalidateOrganisationPageCache(slug);
  router.push(`/organisation/${slug}`);
  setIsSaveInProgress(false);
};
```

### 2.5 Replace updateDataToServer

Similar pattern - use `updateBuilderOrganisationPage` and existing affiliation utilities.

## Step 3: Test (30 min)

1. **Create new organisation page**

   - Navigate to `/organisation-page/New_Organisation`
   - Fill in required fields (organisation tag, country)
   - Click Publish
   - Verify page created in Builder.io
   - Verify redirect to new page

2. **Edit existing organisation page**

   - Open an organisation page you own
   - Click Edit
   - Modify fields (name, affiliations, etc.)
   - Click Save & Publish
   - Verify changes saved

3. **Verify cache behavior**

   - Check Network tab - no full cache invalidation
   - Check console - no `handleTagCreated()` errors

4. **Verify no Wix calls**
   - Check Network tab for any `wix` API calls
   - Should be zero during save operations

## Common Issues

### Issue: countryTag not saved correctly

**Fix**: Ensure it's wrapped as array with `countryTagItem` wrapper key

### Issue: Full cache invalidation on page load

**Fix**: Remove the `handleTagCreated()` useEffect on mount

### Issue: Tag not updated in UI after edit

**Fix**: Call `updateTag(organisationData.organisationTag)` after successful tag update

## Reference Files

- `app/page-components/ProjectPageComponent/ProjectPageComponent.tsx` - Reference implementation
- `app/utils/builderInfoPageUtils.ts` - Project transform function to copy
- `app/utils/builderAffiliationUtils.ts` - Affiliation utilities to use
