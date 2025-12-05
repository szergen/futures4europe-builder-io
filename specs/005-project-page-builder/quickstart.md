# Quick Start: Project-Page Builder.io Migration

**Feature**: 005-project-page-builder
**Date**: 2025-12-05

## Overview

This guide provides step-by-step instructions for implementing the project-page create/update migration from Wix to Builder.io.

---

## Prerequisites

1. ✅ Builder.io `info-page` model configured with all fields
2. ✅ Builder.io `affiliations` model configured
3. ✅ `BUILDER_PRIVATE_API_KEY` in environment
4. ✅ Existing tag update utilities working
5. ✅ Redis cache service configured

---

## Implementation Steps

### Step 1: Create Info-Page API Routes

**File: `app/api/builder/info-page/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";

const BUILDER_API_URL = "https://builder.io/api/v1/write";
const BUILDER_PRIVATE_API_KEY = process.env.BUILDER_PRIVATE_API_KEY || "";

export async function POST(request: NextRequest) {
  try {
    if (!BUILDER_PRIVATE_API_KEY) {
      return NextResponse.json(
        { error: "Builder.io API key not configured" },
        { status: 500 }
      );
    }

    const payload = await request.json();

    console.log("[Builder.io API] Creating info-page:", {
      slug: payload.data?.slug,
      title: payload.data?.title,
    });

    const response = await fetch(`${BUILDER_API_URL}/info-page`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${BUILDER_PRIVATE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Builder.io API] Create info-page failed:", {
        status: response.status,
        error: errorText,
      });
      return NextResponse.json(
        {
          error: `Failed to create info-page: ${response.status}`,
          details: errorText,
        },
        { status: response.status }
      );
    }

    const result = await response.json();
    console.log("[Builder.io API] Info-page created:", { id: result.id });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("[Builder.io API] Error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}
```

**File: `app/api/builder/info-page/[id]/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";

const BUILDER_API_URL = "https://builder.io/api/v1/write";
const BUILDER_PRIVATE_API_KEY = process.env.BUILDER_PRIVATE_API_KEY || "";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!BUILDER_PRIVATE_API_KEY) {
      return NextResponse.json(
        { error: "Builder.io API key not configured" },
        { status: 500 }
      );
    }

    const pageId = params.id;
    const payload = await request.json();

    console.log("[Builder.io API] Updating info-page:", { id: pageId });

    const response = await fetch(`${BUILDER_API_URL}/info-page/${pageId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${BUILDER_PRIVATE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Builder.io API] Update failed:", {
        status: response.status,
        error: errorText,
      });
      return NextResponse.json(
        { error: `Failed to update: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("[Builder.io API] Error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}
```

### Step 2: Add Utility Functions

**File: `app/utils/builderInfoPageUtils.ts`** (add to existing file)

```typescript
// API route for client-side calls
const INFO_PAGE_API_ROUTE = "/api/builder/info-page";

/**
 * Transform component state to Builder.io API format for project pages
 */
export function transformProjectDataForBuilder(
  projectData: any,
  contentText: string[],
  contentImages: any[]
): any {
  const data: any = {
    title: projectData.projectTag?.name || "",
    description: projectData.description || "",
    slug: projectData.slug || "",

    // Content sections
    postContentRIch1: contentText[0] || "",
    postContentRIch2: contentText[1] || "",
    // ... repeat for 3-10

    // Images
    postImage1: contentImages[0] || {},
    postImage2: contentImages[1] || {},
    // ... repeat for 3-10

    // Metadata
    projectStartDate: projectData.projectStartDate,
    projectEndDate: projectData.projectEndDate,
    linkedinLink: projectData.linkedinLink || "",
    websiteLink: projectData.websiteLink || "",
    mediaFiles: projectData.mediaFiles || [],

    // References - use transformReferencesForBuilderCreate from builderPostUtils
    project: transformReferencesForBuilderCreate(
      [projectData.projectTag],
      "tag",
      "projectItem"
    ),
    pageOwner: transformReferencesForBuilderCreate(
      projectData.pageOwner,
      "tag",
      "pageOwnerItem"
    ),
    author: transformReferencesForBuilderCreate(
      projectData.author,
      "tag",
      "authorItem"
    ),
    pageTypes: transformReferencesForBuilderCreate(
      [projectData.pageType],
      "tag",
      "pageTypeItem"
    ),
    countryTag: projectData.countryTag?._id
      ? {
          "@type": "@builder.io/core:Reference",
          id: projectData.countryTag._id,
          model: "tag",
        }
      : undefined,
    methods: transformReferencesForBuilderCreate(
      projectData.methods,
      "tag",
      "methodsItem"
    ),
    domains: transformReferencesForBuilderCreate(
      projectData.domains,
      "tag",
      "domainsItem"
    ),
    projectFunded: transformReferencesForBuilderCreate(
      projectData.projectFunded ? [projectData.projectFunded] : [],
      "tag",
      "projectFundedItem"
    ),
  };

  // Clean up undefined fields
  Object.keys(data).forEach((key) => {
    if (data[key] === undefined) delete data[key];
  });

  return data;
}

/**
 * Create a new project info-page in Builder.io
 */
export async function createBuilderProjectPage(
  projectData: any,
  contentText: string[],
  contentImages: any[]
): Promise<any> {
  const data = transformProjectDataForBuilder(
    projectData,
    contentText,
    contentImages
  );

  const payload = {
    name: projectData.projectTag?.name || "Untitled Project",
    data,
    published: "published",
  };

  console.log("[Builder.io] Creating project page:", { slug: data.slug });

  const response = await fetch(INFO_PAGE_API_ROUTE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `Failed to create: ${response.status}`);
  }

  return response.json();
}

/**
 * Update an existing project info-page in Builder.io
 */
export async function updateBuilderProjectPage(
  pageId: string,
  projectData: any,
  contentText: string[],
  contentImages: any[]
): Promise<any> {
  const data = transformProjectDataForBuilder(
    projectData,
    contentText,
    contentImages
  );

  const payload = {
    name: projectData.projectTag?.name || "Untitled Project",
    data,
    published: "published",
  };

  console.log("[Builder.io] Updating project page:", { id: pageId });

  const response = await fetch(`${INFO_PAGE_API_ROUTE}/${pageId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `Failed to update: ${response.status}`);
  }

  return response.json();
}
```

### Step 3: Add Affiliation Write Functions

**File: `app/utils/builderAffiliationUtils.ts`** (add to existing file)

```typescript
const AFFILIATIONS_API_ROUTE = "/api/builder/affiliations";

/**
 * Create affiliations in Builder.io and update cache
 */
export async function bulkCreateAffiliations(
  affiliations: Array<{
    projectTag: { _id: string; name?: string };
    personTag?: { _id: string; name?: string };
    organisationTag?: { _id: string; name?: string };
    role?: string;
    extraIdentifier: string;
  }>
): Promise<{ created: any[]; failed: any[] }> {
  const payload = affiliations.map((aff) => ({
    name: `${aff.projectTag.name || "Project"} -to- ${
      aff.personTag?.name || aff.organisationTag?.name || "Entity"
    }`,
    data: {
      title: `${aff.projectTag.name || "Project"} -to- ${
        aff.personTag?.name || aff.organisationTag?.name || "Entity"
      }`,
      projectTag: {
        "@type": "@builder.io/core:Reference",
        id: aff.projectTag._id,
        model: "tag",
      },
      ...(aff.personTag && {
        personTag: {
          "@type": "@builder.io/core:Reference",
          id: aff.personTag._id,
          model: "tag",
        },
      }),
      ...(aff.organisationTag && {
        organisationTag: {
          "@type": "@builder.io/core:Reference",
          id: aff.organisationTag._id,
          model: "tag",
        },
      }),
      role: aff.role || "",
      extraIdentifier: aff.extraIdentifier,
    },
    published: "published",
  }));

  const response = await fetch(AFFILIATIONS_API_ROUTE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ affiliations: payload }),
  });

  const result = await response.json();

  // Update cache with created affiliations
  if (result.created?.length > 0) {
    await appendToAffiliationsCache(result.created);
  }

  return result;
}

/**
 * Delete affiliations from Builder.io and update cache
 */
export async function bulkDeleteAffiliations(
  affiliationIds: string[]
): Promise<{ deleted: string[]; failed: any[] }> {
  const response = await fetch(`${AFFILIATIONS_API_ROUTE}/bulk-delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids: affiliationIds }),
  });

  const result = await response.json();

  // Update cache
  if (result.deleted?.length > 0) {
    await removeFromAffiliationsCache(result.deleted);
  }

  return result;
}

/**
 * Append new affiliations to cache
 */
async function appendToAffiliationsCache(
  newAffiliations: any[]
): Promise<void> {
  const cached = await RedisCacheService.getFromCache(AFFILIATIONS_CACHE_KEY);
  if (cached && Array.isArray(cached)) {
    const transformed = newAffiliations.map(transformAffiliationForInfoPage);
    cached.push(...transformed);
    await RedisCacheService.saveToCache(
      AFFILIATIONS_CACHE_KEY,
      cached,
      CACHE_TTL
    );
    console.log(
      `[Builder.io] Appended ${transformed.length} affiliations to cache`
    );
  }
}

/**
 * Remove affiliations from cache
 */
async function removeFromAffiliationsCache(ids: string[]): Promise<void> {
  const cached = await RedisCacheService.getFromCache(AFFILIATIONS_CACHE_KEY);
  if (cached && Array.isArray(cached)) {
    const filtered = cached.filter((aff) => !ids.includes(aff._id));
    await RedisCacheService.saveToCache(
      AFFILIATIONS_CACHE_KEY,
      filtered,
      CACHE_TTL
    );
    console.log(`[Builder.io] Removed ${ids.length} affiliations from cache`);
  }
}
```

### Step 4: Update ProjectPageComponent

**File: `app/page-components/ProjectPageComponent/ProjectPageComponent.tsx`**

Replace the `createNewProjectPage` function:

```typescript
// Remove Wix imports
// import { useWixModules } from "@wix/sdk-react";
// import { items } from "@wix/data";

// Add Builder.io imports
import {
  createBuilderProjectPage,
  updateBuilderProjectPage,
} from "@app/utils/builderInfoPageUtils";
import {
  bulkCreateAffiliations,
  bulkDeleteAffiliations,
} from "@app/utils/builderAffiliationUtils";

// Replace createNewProjectPage function
const createNewProjectPage = async () => {
  console.log("[Builder.io] Creating New Project Page");
  setIsSaveInProgress(true);

  try {
    // Generate slug
    const slug =
      sanitizeTitleForSlug(projectData?.projectTag?.name) +
      "-" +
      generateUniqueHash();
    const fullSlug = `/project/${slug}`;

    // Get user tag
    const userTag = tags.find((tag) => tag.name === userDetails?.userName);

    // Prepare project data
    const builderProjectData = {
      ...projectData,
      slug: fullSlug,
      pageOwner: userTag ? [userTag] : [],
      author: userTag ? [userTag] : [],
    };

    // Create info-page in Builder.io
    const result = await createBuilderProjectPage(
      builderProjectData,
      projectData.contentText,
      projectData.contentImages
    );

    console.log("[Builder.io] Project page created:", result.id);

    // Update project tag's tagPageLink
    if (projectData.projectTag?._id) {
      await fetch(`/api/builder/tag/${projectData.projectTag._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tagPageLink: fullSlug,
        }),
      });
    }

    // Create affiliations for coordinators
    if (projectData.coordinators?.length > 0) {
      await bulkCreateAffiliations(
        projectData.coordinators.map((coord: any) => ({
          projectTag: projectData.projectTag,
          personTag: coord,
          extraIdentifier: "coordination",
        }))
      );
    }

    // Create affiliations for participants
    if (projectData.participants?.length > 0) {
      await bulkCreateAffiliations(
        projectData.participants.map((part: any) => ({
          projectTag: projectData.projectTag,
          personTag: part,
          extraIdentifier: "participation",
        }))
      );
    }

    // Create affiliations for organisations
    if (projectData.organisations?.length > 0) {
      await bulkCreateAffiliations(
        projectData.organisations.map((org: any) => ({
          projectTag: projectData.projectTag,
          organisationTag: org,
          role: org.arole,
          extraIdentifier: "projectOrganisationRole",
        }))
      );
    }

    // Invalidate cache and redirect
    await invalidateProjectPageCache(slug);
    handleUserDataRefresh();
    router.push(`/project/${slug}`);
  } catch (error) {
    console.error("[Builder.io] Error creating project page:", error);
    alert("Failed to create project page. Please try again.");
  } finally {
    setIsSaveInProgress(false);
  }
};
```

---

## Testing Checklist

- [ ] Create new project page with all fields
- [ ] Update existing project page
- [ ] Verify project tag's tagPageLink is updated
- [ ] Verify affiliations created for coordinators
- [ ] Verify affiliations created for participants
- [ ] Verify affiliations created for organisations
- [ ] Verify cache is updated (not refetched)
- [ ] Verify no Wix API calls in network tab
- [ ] Test error handling (network failure)

---

## Common Issues

### "Builder.io API key not configured"

- Ensure `BUILDER_PRIVATE_API_KEY` is in `.env.local`
- Restart dev server after adding env var

### Reference format errors

- Check wrapper keys match expected format
- Verify tag IDs are valid Builder.io IDs

### Cache not updating

- Check Redis connection
- Verify `RedisCacheService` is imported correctly
