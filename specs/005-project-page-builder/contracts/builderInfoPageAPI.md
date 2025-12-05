# API Contract: Builder.io Info-Page & Affiliations

**Feature**: 005-project-page-builder
**Date**: 2025-12-05

## Overview

This document defines the API contracts for:

1. Info-page create/update operations (Next.js API routes)
2. Affiliation create/delete operations (Next.js API routes)
3. Client-side utility functions

---

## 1. Info-Page API Routes

### POST /api/builder/info-page

Creates a new info-page in Builder.io.

**Request:**

```typescript
interface CreateInfoPageRequest {
  name: string; // Display name (title)
  data: {
    title: string;
    description?: string;
    slug: string; // Format: /project/{slug}

    // Content sections
    postContentRIch1?: string;
    postContentRIch2?: string;
    // ... up to postContentRIch10

    // Images
    postImage1?: { url: string; displayName?: string };
    postImage2?: { url: string; displayName?: string };
    // ... up to postImage10

    // Metadata
    projectStartDate?: string;
    projectEndDate?: string;
    linkedinLink?: string;
    websiteLink?: string;
    mediaFiles?: Array<{
      url: string;
      displayName: string;
      thumbnail?: string;
    }>;

    // References (with wrapper keys)
    project?: Array<{ projectItem: BuilderReference }>;
    pageOwner?: Array<{ pageOwnerItem: BuilderReference }>;
    author?: Array<{ authorItem: BuilderReference }>;
    pageTypes?: Array<{ pageTypeItem: BuilderReference }>;
    countryTag?: BuilderReference;
    methods?: Array<{ methodsItem: BuilderReference }>;
    domains?: Array<{ domainsItem: BuilderReference }>;
    projectCoordinator?: Array<{ projectCoordinatorItem: BuilderReference }>;
    projectParticipantTeam?: Array<{
      projectParticipantTeamItem: BuilderReference;
    }>;
    projectOrganisation?: Array<{ projectOrganisationItem: BuilderReference }>;
    projectFunded?: Array<{ projectFundedItem: BuilderReference }>;
  };
  published: "published" | "draft";
}

interface BuilderReference {
  "@type": "@builder.io/core:Reference";
  id: string;
  model: string;
}
```

**Response (200):**

```typescript
interface CreateInfoPageResponse {
  id: string;
  name: string;
  data: {
    /* same structure as request data */
  };
  createdDate: number;
  lastUpdated: number;
  published: string;
}
```

**Response (400/500):**

```typescript
interface ErrorResponse {
  error: string;
  details?: string;
}
```

---

### PUT /api/builder/info-page/[id]

Updates an existing info-page in Builder.io.

**URL Parameters:**

- `id`: Builder.io content ID

**Request:**
Same structure as POST request.

**Response:**
Same structure as POST response.

---

## 2. Affiliation API Routes

### POST /api/builder/affiliations

Creates one or more affiliations in Builder.io.

**Request:**

```typescript
interface CreateAffiliationsRequest {
  affiliations: Array<{
    name: string; // Display title
    data: {
      title: string;
      projectTag: BuilderReference;
      personTag?: BuilderReference; // For coordination/participation
      organisationTag?: BuilderReference; // For projectOrganisationRole
      role?: string; // For projectOrganisationRole
      extraIdentifier:
        | "coordination"
        | "participation"
        | "projectOrganisationRole";
    };
    published: "published";
  }>;
}
```

**Response (200):**

```typescript
interface CreateAffiliationsResponse {
  created: Array<{
    id: string;
    name: string;
    data: {
      /* affiliation data */
    };
  }>;
  failed: Array<{
    name: string;
    error: string;
  }>;
}
```

---

### DELETE /api/builder/affiliations/[id]

Deletes an affiliation from Builder.io.

**URL Parameters:**

- `id`: Builder.io affiliation ID

**Response (200):**

```typescript
interface DeleteAffiliationResponse {
  success: true;
  id: string;
}
```

**Response (404):**

```typescript
interface NotFoundResponse {
  error: "Affiliation not found";
  id: string;
}
```

---

### POST /api/builder/affiliations/bulk-delete

Deletes multiple affiliations from Builder.io.

**Request:**

```typescript
interface BulkDeleteRequest {
  ids: string[];
}
```

**Response (200):**

```typescript
interface BulkDeleteResponse {
  deleted: string[];
  failed: Array<{
    id: string;
    error: string;
  }>;
}
```

---

## 3. Client-Side Utility Functions

### builderInfoPageUtils.ts

```typescript
/**
 * Transform component state to Builder.io API format
 */
export function transformProjectDataForBuilder(
  projectData: any,
  contentText: string[],
  contentImages: any[]
): CreateInfoPageRequest["data"];

/**
 * Create a new project info-page in Builder.io
 */
export async function createBuilderProjectPage(
  projectData: any,
  contentText: string[],
  contentImages: any[]
): Promise<CreateInfoPageResponse>;

/**
 * Update an existing project info-page in Builder.io
 */
export async function updateBuilderProjectPage(
  pageId: string,
  projectData: any,
  contentText: string[],
  contentImages: any[]
): Promise<CreateInfoPageResponse>;
```

### builderAffiliationUtils.ts

```typescript
/**
 * Create a single affiliation in Builder.io
 */
export async function createBuilderAffiliation(affiliationData: {
  projectTag: { _id: string };
  personTag?: { _id: string };
  organisationTag?: { _id: string };
  role?: string;
  extraIdentifier: string;
  title: string;
}): Promise<{ id: string; data: any }>;

/**
 * Delete an affiliation from Builder.io
 */
export async function deleteBuilderAffiliation(
  affiliationId: string
): Promise<{ success: boolean }>;

/**
 * Create multiple affiliations and update cache
 */
export async function bulkCreateAffiliations(
  affiliations: Array<{
    projectTag: { _id: string };
    personTag?: { _id: string };
    organisationTag?: { _id: string };
    role?: string;
    extraIdentifier: string;
    title: string;
  }>
): Promise<{ created: any[]; failed: any[] }>;

/**
 * Delete multiple affiliations and update cache
 */
export async function bulkDeleteAffiliations(
  affiliationIds: string[]
): Promise<{ deleted: string[]; failed: any[] }>;

/**
 * Append affiliations to cache (no full refetch)
 */
export async function appendToAffiliationsCache(
  newAffiliations: any[]
): Promise<void>;

/**
 * Remove affiliations from cache (no full refetch)
 */
export async function removeFromAffiliationsCache(
  affiliationIds: string[]
): Promise<void>;
```

---

## 4. Builder.io Write API Reference

### Base URL

```
https://builder.io/api/v1/write
```

### Authentication

```
Authorization: Bearer {BUILDER_PRIVATE_API_KEY}
```

### Endpoints Used

| Method | Endpoint             | Purpose               |
| ------ | -------------------- | --------------------- |
| POST   | `/info-page`         | Create info-page      |
| PUT    | `/info-page/{id}`    | Update info-page      |
| POST   | `/affiliations`      | Create affiliation    |
| DELETE | `/affiliations/{id}` | Delete affiliation    |
| PUT    | `/tag/{id}`          | Update tag (existing) |

---

## 5. Error Handling

### HTTP Status Codes

| Code | Meaning      | Action               |
| ---- | ------------ | -------------------- |
| 200  | Success      | Continue             |
| 400  | Bad Request  | Check payload format |
| 401  | Unauthorized | Check API key        |
| 404  | Not Found    | Item doesn't exist   |
| 429  | Rate Limited | Retry with backoff   |
| 500  | Server Error | Retry or fail        |

### Client-Side Error Handling

```typescript
try {
  const result = await createBuilderProjectPage(
    projectData,
    contentText,
    contentImages
  );
  // Success
} catch (error) {
  if (error.status === 400) {
    // Show validation error to user
  } else if (error.status === 500) {
    // Show generic error, keep data in edit state
  }
}
```

---

## 6. Cache Invalidation

After successful operations:

| Operation           | Cache Action                                   |
| ------------------- | ---------------------------------------------- |
| Create info-page    | Call `invalidateProjectPageCache(slug)`        |
| Update info-page    | Call `invalidateProjectPageCache(slug)`        |
| Create affiliations | Call `appendToAffiliationsCache(affiliations)` |
| Delete affiliations | Call `removeFromAffiliationsCache(ids)`        |
| Update tag          | Handled by existing `updateBuilderTag`         |
