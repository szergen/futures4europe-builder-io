# Quickstart Guide: Post-Page Creation Migration

**Feature**: 003-post-page-migration  
**Date**: 2025-12-01  
**For**: Developers implementing the migration

## Overview

This guide provides step-by-step instructions for migrating post-page creation and editing from Wix to Builder.io. Follow these steps in order for a successful implementation.

---

## Prerequisites

Before starting, ensure you have:

- [ ] Builder.io `post-page` model configured with all required fields
- [ ] Builder.io Private API key in `.env.local` as `BUILDER_PRIVATE_API_KEY`
- [ ] Access to the codebase with the following files:
  - `app/post/New_Post/page.tsx` (existing)
  - `app/page-components/PostPageComponent/PostPageComponent.tsx` (existing)
  - `app/utils/builderPostUtils.ts` (existing, will extend)
  - `app/utils/cache-utils.ts` (existing)
  - `app/utils/PageComponents.utils.ts` (existing)
- [ ] Local development environment running (`npm run dev`)
- [ ] Understanding of the feature spec, research, and data model docs

---

## Implementation Steps

### Step 1: Create New Route

**Time**: ~5 minutes  
**Files**: `app/post-page/New_Post/page.tsx`

1. Copy the existing file:

   ```bash
   cp app/post/New_Post/page.tsx app/post-page/New_Post/page.tsx
   ```

2. The file should already be correct (it just passes props to PostPageComponent):

   ```typescript
   // app/post-page/New_Post/page.tsx
   "use client";
   import PostPageComponent from "@app/page-components/PostPageComponent/PostPageComponent";
   import { useSearchParams } from "next/navigation";

   const decidePageType = (pageType: string) => {
     switch (pageType) {
       case "post":
         return "post";
       case "event":
         return "event";
       case "projectResult":
         return "project result";
       default:
         return "post";
     }
   };

   export default function PostPage({ params }: any) {
     const searchParams = useSearchParams();
     const pageType = decidePageType(searchParams.get("pageType") || "new");

     return (
       <div className="w-full">
         <PostPageComponent
           pageTitle={"New_Post"}
           post={{}}
           isNewPost
           pageType={pageType}
         />
       </div>
     );
   }
   ```

3. Test the route: Navigate to `http://localhost:3000/post-page/New_Post?pageType=post`

**✅ Checkpoint**: Route loads without errors, PostPageComponent renders in edit mode.

---

### Step 2: Add Builder.io API Utility Functions

**Time**: ~30 minutes  
**Files**: `app/utils/builderPostUtils.ts`

Add these functions to the existing file:

```typescript
// ============================================================================
// Builder.io Write API Functions
// ============================================================================

const BUILDER_API_URL = "https://builder.io/api";
const BUILDER_PRIVATE_API_KEY =
  process.env.BUILDER_PRIVATE_API_KEY ||
  process.env.NEXT_PUBLIC_BUILDER_PRIVATE_API_KEY;

/**
 * Transform tag array to Builder.io Reference format
 */
function transformReferencesForBuilder(tags: any[]): any[] {
  if (!tags || !Array.isArray(tags)) return [];

  return tags
    .filter((tag) => tag && tag._id)
    .map((tag) => ({
      "@type": "@builder.io/core:Reference" as const,
      id: tag._id,
      model: "tag",
    }));
}

/**
 * Transform component post data to Builder.io API format
 */
export function transformPostDataForBuilder(postData: any): any {
  const builderData: any = {
    data: {
      title: postData.title,
      subtitle: postData.subtitle || "",
      slug: postData.slug,
    },
  };

  // Content sections
  if (postData.contentText && Array.isArray(postData.contentText)) {
    postData.contentText.forEach((content: string, index: number) => {
      if (content) {
        builderData.data[`postContentRIch${index + 1}`] = content;
      }
    });
  }

  // Image sections
  if (postData.contentImages && Array.isArray(postData.contentImages)) {
    postData.contentImages.forEach((image: any, index: number) => {
      if (image && image.url) {
        builderData.data[`postImage${index + 1}`] = image;
      }
    });
  }

  // Reference fields
  if (postData.authors?.length) {
    builderData.data.author = transformReferencesForBuilder(postData.authors);
  }
  if (postData.pageOwner?.length) {
    builderData.data.pageOwner = transformReferencesForBuilder(
      postData.pageOwner
    );
  }
  if (postData.people?.length) {
    builderData.data.people = transformReferencesForBuilder(postData.people);
  }
  if (postData.foreSightMethods?.length) {
    builderData.data.methods = transformReferencesForBuilder(
      postData.foreSightMethods
    );
  }
  if (postData.domains?.length) {
    builderData.data.domains = transformReferencesForBuilder(postData.domains);
  }
  if (postData.project?.length) {
    builderData.data.projects = transformReferencesForBuilder(postData.project);
  }
  if (postData.organisation?.length) {
    builderData.data.organisations = transformReferencesForBuilder(
      postData.organisation
    );
  }
  if (postData.pageType?.length) {
    builderData.data.pageTypes = transformReferencesForBuilder(
      postData.pageType
    );
  }
  if (postData.countryTag?._id) {
    builderData.data.countryTag = {
      "@type": "@builder.io/core:Reference",
      id: postData.countryTag._id,
      model: "tag",
    };
  }
  if (postData.internalLinks?.length) {
    builderData.data.internalLinks = postData.internalLinks.map(
      (link: any) => ({
        "@type": "@builder.io/core:Reference",
        id: link._id,
        model: "post-page",
      })
    );
  }

  // Event-specific fields
  if (postData.eventSpeakers?.length) {
    builderData.data.speakers = transformReferencesForBuilder(
      postData.eventSpeakers
    );
  }
  if (postData.eventModerators?.length) {
    builderData.data.moderators = transformReferencesForBuilder(
      postData.eventModerators
    );
  }
  if (postData.eventStartDate) {
    builderData.data.eventStartDate = postData.eventStartDate;
  }
  if (postData.eventEndDate) {
    builderData.data.eventEndDate = postData.eventEndDate;
  }
  if (postData.eventRegistration) {
    builderData.data.eventRegistration = postData.eventRegistration;
  }

  // Project result-specific fields
  if (postData.projectAuthors?.length) {
    builderData.data.projectResultAuthor = transformReferencesForBuilder(
      postData.projectAuthors
    );
  }
  if (postData.projectResultMedia) {
    builderData.data.projectResultMedia = postData.projectResultMedia;
  }
  if (postData.projectResultPublicationDate) {
    builderData.data.projectResultPublicationDate =
      postData.projectResultPublicationDate;
  }

  // Additional fields
  if (postData.mediaFiles?.length) {
    builderData.data.mediaFiles = postData.mediaFiles;
  }

  // Always set as published
  builderData.published = "published";

  return builderData;
}

/**
 * Create new post in Builder.io
 */
export async function createBuilderPost(postData: any): Promise<any | null> {
  try {
    console.log("[Builder.io] Creating new post:", postData.title);

    const payload = transformPostDataForBuilder(postData);
    payload.name = postData.title; // Display name in Builder.io UI

    const response = await fetch(`${BUILDER_API_URL}/v1/write/post-page`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${BUILDER_PRIVATE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Builder.io API error (${response.status}): ${JSON.stringify(
          errorData
        )}`
      );
    }

    const result = await response.json();
    console.log("[Builder.io] Post created successfully:", result.id);

    return result;
  } catch (error) {
    console.error("[Builder.io] Failed to create post:", error);
    return null;
  }
}

/**
 * Update existing post in Builder.io
 */
export async function updateBuilderPost(
  postId: string,
  postData: any
): Promise<any | null> {
  try {
    console.log("[Builder.io] Updating post:", postId);

    const payload = transformPostDataForBuilder(postData);

    const response = await fetch(
      `${BUILDER_API_URL}/v1/write/post-page/${postId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${BUILDER_PRIVATE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Builder.io API error (${response.status}): ${JSON.stringify(
          errorData
        )}`
      );
    }

    const result = await response.json();
    console.log("[Builder.io] Post updated successfully:", postId);

    return result;
  } catch (error) {
    console.error("[Builder.io] Failed to update post:", error);
    return null;
  }
}
```

**✅ Checkpoint**: File compiles without TypeScript errors.

---

### Step 3: Update PostPageComponent - createNewPost Function

**Time**: ~20 minutes  
**Files**: `app/page-components/PostPageComponent/PostPageComponent.tsx`

Find the `createNewPost` function (around line 460) and replace it:

```typescript
const createNewPost = async () => {
  console.log("Creating New Post");
  setIsSaveInProgress(true);

  // Create New Post using Builder.io API
  const result = await createBuilderPost({
    title: postData.title,
    subtitle: postData.subtitle,
    slug: sanitizeTitleForSlug(postData.title) + "-" + generateUniqueHash(),
    contentText: postData.contentText,
    contentImages: postData.contentImages,
    authors: [userTag], // Current user
    pageOwner: [userTag], // Current user
    pageType: postData.pageType,
    people: postData.people,
    foreSightMethods: postData.foreSightMethods,
    domains: postData.domains,
    project: postData.project,
    organisation: postData.organisation,
    countryTag: postData.countryTag,
    internalLinks: postData.internalLinks,
    eventSpeakers: postData.eventSpeakers,
    eventModerators: postData.eventModerators,
    eventStartDate: postData.eventStartDate,
    eventEndDate: postData.eventEndDate,
    eventRegistration: postData.eventRegistration,
    projectAuthors: postData.projectAuthors,
    projectResultMedia: postData.projectResultMedia,
    projectResultPublicationDate: postData.projectResultPublicationDate,
    mediaFiles: postData.mediaFiles,
  });

  if (!result) {
    // Error already logged, show error message to user
    alert(
      "Failed to create post. Please check console for details and try again."
    );
    setIsSaveInProgress(false);
    return;
  }

  // Invalidate cache (after save, before redirect)
  try {
    await invalidatePostPageCache(result.data.slug);
  } catch (cacheError) {
    console.warn("[Cache] Invalidation failed, continuing anyway:", cacheError);
  }

  handleUserDataRefresh();
  setIsSaveInProgress(false);

  // Redirect to new post
  router.push(`/post-page/${result.data.slug}`);
};
```

**✅ Checkpoint**: Function compiles, imports are added (`createBuilderPost` from `builderPostUtils`).

---

### Step 4: Update PostPageComponent - updateDataToServer Function

**Time**: ~20 minutes  
**Files**: `app/page-components/PostPageComponent/PostPageComponent.tsx`

Find the `updateDataToServer` function (around line 198) and replace it:

```typescript
const updateDataToServer = async () => {
  console.log("Updating Page from", postData.dataCollectionId, postData._id);
  setIsSaveInProgress(true);

  // Update using Builder.io API
  const result = await updateBuilderPost(postData._id, {
    title: postData.title,
    subtitle: postData.subtitle,
    slug: postData.slug,
    contentText: postData.contentText,
    contentImages: postData.contentImages,
    authors: postData.authors,
    pageOwner: postData.pageOwner,
    pageType: postData.pageType,
    people: postData.people,
    foreSightMethods: postData.foreSightMethods,
    domains: postData.domains,
    project: postData.project,
    organisation: postData.organisation,
    countryTag: postData.countryTag,
    internalLinks: postData.internalLinks,
    eventSpeakers: postData.eventSpeakers,
    eventModerators: postData.eventModerators,
    eventStartDate: postData.eventStartDate,
    eventEndDate: postData.eventEndDate,
    eventRegistration: postData.eventRegistration,
    projectAuthors: postData.projectAuthors,
    projectResultMedia: postData.projectResultMedia,
    projectResultPublicationDate: postData.projectResultPublicationDate,
    mediaFiles: postData.mediaFiles,
  });

  if (!result) {
    // Error already logged, show error message to user
    alert(
      "Failed to update post. Please check console for details and try again."
    );
    setIsSaveInProgress(false);
    return;
  }

  // Invalidate cache (after save, before redirect)
  await invalidatePostPageCache(postData.slug);

  setIsSaveInProgress(false);
};
```

**✅ Checkpoint**: Function compiles, imports are added (`updateBuilderPost` from `builderPostUtils`).

---

### Step 5: Test Create Flow

**Time**: ~15 minutes  
**Manual Testing**

1. Navigate to: `http://localhost:3000/post-page/New_Post?pageType=post`
2. Fill in:
   - Title: "Test Post"
   - Subtitle: "Test Subtitle"
   - Content section 1: Some text
   - Select a person tag
3. Click "Publish Page"
4. **Verify in Network Tab**:
   - 1 POST request to `builder.io/api/v1/write/post-page`
   - Status 200
   - Response includes `id` and all data
5. **Verify in Browser**:
   - Redirected to new post page
   - URL is `/post-page/[slug]`
   - Post data displays correctly

**✅ Checkpoint**: Create flow works end-to-end, single API call confirmed.

---

### Step 6: Test Update Flow

**Time**: ~15 minutes  
**Manual Testing**

1. Open an existing post (or the one just created)
2. Click "Edit Page"
3. Modify title and add another person tag
4. Click "Publish Page"
5. **Verify in Network Tab**:
   - 1 PUT request to `builder.io/api/v1/write/post-page/{id}`
   - Status 200
   - Response includes updated data
6. **Verify in Browser**:
   - Changes are visible immediately
   - No page refresh needed

**✅ Checkpoint**: Update flow works, single API call confirmed.

---

### Step 7: Test Error Handling

**Time**: ~10 minutes  
**Manual Testing**

1. Temporarily break API key in `.env.local`
2. Try to create/update a post
3. **Verify**:

   - Error logged in console
   - Alert message shown to user
   - Edit state preserved (can retry)
   - No redirect occurred

4. Fix API key
5. Click "Publish Page" again
6. **Verify**:
   - Save succeeds
   - Post created/updated correctly

**✅ Checkpoint**: Error handling works as expected, data not lost.

---

### Step 8: Test All 3 Post Types

**Time**: ~20 minutes  
**Manual Testing**

**Test Event**:

1. Navigate to: `/post-page/New_Post?pageType=event`
2. Fill in event-specific fields (speakers, dates, registration)
3. Publish
4. Verify event fields saved correctly

**Test Project Result**:

1. Navigate to: `/post-page/New_Post?pageType=projectResult`
2. Fill in project result fields (authors, media, publication date)
3. Publish
4. Verify project result fields saved correctly

**Test Basic Post**:

1. Navigate to: `/post-page/New_Post?pageType=post`
2. Fill in basic post fields
3. Publish
4. Verify basic post saved correctly

**✅ Checkpoint**: All 3 post types work correctly with their specific fields.

---

### Step 9: Performance Verification

**Time**: ~10 minutes  
**Manual Testing**

1. Create a post with all fields populated:
   - All 10 content sections
   - All 10 images
   - Multiple tags in each category
2. **Measure** (using browser DevTools):
   - Time from click "Publish" to redirect
   - Should be **<3 seconds** (SC-001)
3. Update the same post
4. **Measure**:
   - Time for save operation
   - Should be **<2 seconds** (SC-002)

**✅ Checkpoint**: Performance meets success criteria.

---

### Step 10: Cache Invalidation Verification

**Time**: ~10 minutes  
**Manual Testing**

1. Create or update a post
2. Immediately navigate to `/post` (listing page)
3. **Verify**:
   - New/updated post appears in listing
   - No stale cache data
4. Check console for cache invalidation log:
   - `[Cache] Cache invalidated for: /post/[slug]`

**✅ Checkpoint**: Cache invalidation works, fresh data visible immediately.

---

## Troubleshooting

### Issue: API Key Not Found

**Symptoms**: Console error "Authorization failed"  
**Solution**:

1. Check `.env.local` has `BUILDER_PRIVATE_API_KEY=your-key`
2. Restart dev server (`npm run dev`)
3. Verify key is correct in Builder.io dashboard

### Issue: TypeScript Errors

**Symptoms**: Type errors in PostPageComponent  
**Solution**:

1. Ensure all imports are added:
   ```typescript
   import {
     createBuilderPost,
     updateBuilderPost,
   } from "@app/utils/builderPostUtils";
   import { invalidatePostPageCache } from "@app/utils/cache-utils";
   import {
     sanitizeTitleForSlug,
     generateUniqueHash,
   } from "@app/utils/PageComponents.utils";
   ```
2. Check type definitions match

### Issue: References Not Saving

**Symptoms**: Reference fields empty after save  
**Solution**:

1. Check transformation includes reference fields
2. Verify tag objects have `_id` property
3. Check Builder.io model has reference fields configured

### Issue: Redirect Fails

**Symptoms**: No redirect after save  
**Solution**:

1. Check result object has `data.slug` property
2. Verify router is imported: `import { useRouter } from 'next/navigation';`
3. Check route exists: `app/post-page/[slug]/page.tsx`

---

## Testing Checklist

Before considering implementation complete:

- [ ] Create new post (basic type)
- [ ] Create new event
- [ ] Create new project result
- [ ] Update existing post (change text)
- [ ] Update existing post (change references)
- [ ] Update existing post (change images)
- [ ] Verify single API call per operation (network tab)
- [ ] Verify performance <3s create, <2s update
- [ ] Test error handling (invalid API key)
- [ ] Test validation (missing title)
- [ ] Verify cache invalidation works
- [ ] Verify all 10 content sections save
- [ ] Verify all 10 images save
- [ ] Verify all reference types save correctly
- [ ] Test "Discard Changes" button
- [ ] Test edit mode on/off
- [ ] Test page ownership check
- [ ] Verify redirect after create
- [ ] Verify no redirect on error
- [ ] Check console logs appropriate level of detail

---

## Next Steps

After implementation is complete:

1. **Run E2E Tests**: Execute full test suite for post creation flows
2. **Performance Benchmark**: Compare actual vs. target times
3. **Code Review**: Have another developer review changes
4. **Documentation**: Update any relevant README or migration docs
5. **Deploy to Staging**: Test in staging environment
6. **User Acceptance Testing**: Have content editors test the flow
7. **Production Deploy**: Deploy to production with monitoring

---

## Support & References

- **Feature Spec**: `specs/003-post-page-migration/spec.md`
- **Research**: `specs/003-post-page-migration/research.md`
- **Data Model**: `specs/003-post-page-migration/data-model.md`
- **API Contract**: `specs/003-post-page-migration/contracts/builderPostAPI.md`
- **Constitution**: `.specify/memory/constitution.md`
- **Builder.io Docs**: https://www.builder.io/c/docs/write-api

For questions or issues, consult the feature documentation or create a GitHub issue.
