# API Contract: Builder.io Post Write API

**Feature**: 003-post-page-migration  
**Date**: 2025-12-01  
**Status**: Phase 1 Complete

## Overview

This document defines the API contract for creating and updating post pages using the Builder.io Write API. All operations use REST endpoints with JSON payloads.

---

## Authentication

**Method**: Bearer Token  
**Header**: `Authorization: Bearer {BUILDER_PRIVATE_API_KEY}`

**Environment Variable**: `BUILDER_PRIVATE_API_KEY`  
**Location**: Server-side only (`.env.local`)  
**Security**: Never expose in client-side code

---

## Base URL

```
https://builder.io/api/v1/write
```

---

## API Operations

### 1. Create Post Page

**Endpoint**: `POST /v1/write/post-page`

**Purpose**: Create a new post page in Builder.io with all content, metadata, and references.

**Request Headers**:

```http
Authorization: Bearer {BUILDER_PRIVATE_API_KEY}
Content-Type: application/json
```

**Request Body**:

```typescript
{
  "name": string,           // Display name in Builder.io UI (same as title or slug)
  "data": {
    // Basic fields (REQUIRED)
    "title": string,                    // Post title (required)
    "subtitle"?: string,                // Post subtitle (optional)
    "slug": string,                     // URL slug (required, unique)

    // Content sections (all optional)
    "postContentRIch1"?: string,        // Rich text content section 1
    "postContentRIch2"?: string,        // Rich text content section 2
    "postContentRIch3"?: string,        // Rich text content section 3
    "postContentRIch4"?: string,        // Rich text content section 4
    "postContentRIch5"?: string,        // Rich text content section 5
    "postContentRIch6"?: string,        // Rich text content section 6
    "postContentRIch7"?: string,        // Rich text content section 7
    "postContentRIch8"?: string,        // Rich text content section 8
    "postContentRIch9"?: string,        // Rich text content section 9
    "postContentRIch10"?: string,       // Rich text content section 10

    // Image sections (all optional)
    "postImage1"?: ImageObject,         // Image 1
    "postImage2"?: ImageObject,         // Image 2
    "postImage3"?: ImageObject,         // Image 3
    "postImage4"?: ImageObject,         // Image 4
    "postImage5"?: ImageObject,         // Image 5
    "postImage6"?: ImageObject,         // Image 6
    "postImage7"?: ImageObject,         // Image 7
    "postImage8"?: ImageObject,         // Image 8
    "postImage9"?: ImageObject,         // Image 9
    "postImage10"?: ImageObject,        // Image 10

    // Reference fields (all optional arrays)
    "author"?: Reference[],             // Post authors
    "pageOwner"?: Reference[],          // Page owners (edit permission)
    "people"?: Reference[],             // Related people
    "methods"?: Reference[],            // Foresight methods
    "domains"?: Reference[],            // Domain tags
    "projects"?: Reference[],           // Related projects
    "organisations"?: Reference[],      // Related organisations
    "pageTypes"?: Reference[],          // Page type classification
    "internalLinks"?: Reference[],      // Internal post links

    // Single reference (optional)
    "countryTag"?: Reference,           // Country tag

    // Event-specific fields (optional)
    "speakers"?: Reference[],           // Event speakers
    "moderators"?: Reference[],         // Event moderators
    "eventStartDate"?: number,          // Unix timestamp (milliseconds)
    "eventEndDate"?: number,            // Unix timestamp (milliseconds)
    "eventRegistration"?: string,       // Registration link URL

    // Project result-specific fields (optional)
    "projectResultAuthor"?: Reference[], // Project result authors
    "projectResultMedia"?: MediaObject,  // Main project media
    "projectResultPublicationDate"?: number, // Unix timestamp

    // Additional fields (optional)
    "mediaFiles"?: MediaObject[],       // Additional media files
    "recommendations"?: number          // Recommendation count
  },
  "published": "published"              // Always published
}
```

**Type Definitions**:

```typescript
interface ImageObject {
  url: string; // Image URL
  displayName?: string; // Optional display name
}

interface MediaObject {
  url: string; // File URL
  displayName: string; // File name
  thumbnail?: string; // Optional thumbnail URL
}

interface Reference {
  "@type": "@builder.io/core:Reference";
  id: string; // Builder.io content ID
  model: string; // Target model name (e.g., "tag", "post-page")
}
```

**Response Success (200 OK)**:

```typescript
{
  "id": string,                    // Builder.io content ID (use for updates)
  "name": string,                  // Display name
  "data": {                        // All submitted data fields
    "title": string,
    "subtitle": string,
    "slug": string,
    // ... all other fields as submitted
  },
  "published": "published",
  "createdDate": number,           // Unix timestamp (milliseconds)
  "lastUpdated": number,           // Unix timestamp (milliseconds)
  "modelId": "post-page",          // Model name
  "query": [],
  "testRatio": 1,
  "screenshot": string,            // Screenshot URL (generated by Builder.io)
  "createdBy": string              // User ID
}
```

**Response Error (4xx/5xx)**:

```typescript
{
  "message": string,               // Error description
  "code": string,                  // Error code
  "details": object               // Additional error details
}
```

**Example Request**:

```typescript
const response = await fetch("https://builder.io/api/v1/write/post-page", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.BUILDER_PRIVATE_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "My New Post",
    data: {
      title: "My New Post",
      subtitle: "A subtitle for my post",
      slug: "/post/my-new-post-abc123",
      postContentRIch1: "<p>This is the first content section</p>",
      postImage1: {
        url: "https://example.com/image1.jpg",
        displayName: "Hero Image",
      },
      author: [
        {
          "@type": "@builder.io/core:Reference",
          id: "user-tag-id-123",
          model: "tag",
        },
      ],
      pageOwner: [
        {
          "@type": "@builder.io/core:Reference",
          id: "user-tag-id-123",
          model: "tag",
        },
      ],
      pageTypes: [
        {
          "@type": "@builder.io/core:Reference",
          id: "post-type-id",
          model: "tag",
        },
      ],
    },
    published: "published",
  }),
});
```

---

### 2. Update Post Page

**Endpoint**: `PUT /v1/write/post-page/{id}`

**Purpose**: Update an existing post page. Only changed fields need to be included (optimization).

**URL Parameters**:

- `id`: Builder.io content ID (from create response or existing post)

**Request Headers**:

```http
Authorization: Bearer {BUILDER_PRIVATE_API_KEY}
Content-Type: application/json
```

**Request Body**:

```typescript
{
  "data": {
    // Include ONLY the fields that have changed
    // Same structure as create, but all fields are optional
    "title"?: string,
    "subtitle"?: string,
    "postContentRIch1"?: string,
    "postImage1"?: ImageObject,
    "people"?: Reference[],
    // ... any other changed fields
  }
  // Note: "published" and "name" are optional for updates
}
```

**Response Success (200 OK)**:

```typescript
{
  "id": string,                    // Same ID as input
  "name": string,
  "data": {                        // COMPLETE data (merged with existing)
    "title": string,
    // ... all fields (changed + unchanged)
  },
  "published": "published",
  "createdDate": number,           // Original creation date
  "lastUpdated": number,           // Updated timestamp
  "modelId": "post-page"
}
```

**Response Error (4xx/5xx)**:

```typescript
{
  "message": string,
  "code": string,
  "details": object
}
```

**Example Request**:

```typescript
// Only update title and subtitle
const response = await fetch(
  `https://builder.io/api/v1/write/post-page/${postId}`,
  {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${process.env.BUILDER_PRIVATE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        title: "Updated Title",
        subtitle: "Updated Subtitle",
      },
    }),
  }
);
```

---

## Error Handling

### HTTP Status Codes

| Status | Meaning           | Action                                                                                     |
| ------ | ----------------- | ------------------------------------------------------------------------------------------ |
| 200    | Success           | Process response data                                                                      |
| 400    | Bad Request       | Check request payload format                                                               |
| 401    | Unauthorized      | Check API key validity                                                                     |
| 403    | Forbidden         | Check API key permissions                                                                  |
| 404    | Not Found         | Check content ID (for updates)                                                             |
| 429    | Too Many Requests | Implement rate limiting delay                                                              |
| 500    | Server Error      | Retry with exponential backoff OR show error to user (per clarification Q1: no auto-retry) |

### Error Response Format

```typescript
{
  "message": "Detailed error message",
  "code": "ERROR_CODE",
  "details": {
    // Additional context about the error
  }
}
```

### Client-Side Error Handling

```typescript
async function createBuilderPost(
  postData: PostData
): Promise<BuilderResponse | null> {
  try {
    const response = await fetch("https://builder.io/api/v1/write/post-page", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.BUILDER_PRIVATE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transformPostDataForBuilder(postData)),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Builder.io API error (${response.status}): ${JSON.stringify(
          errorData
        )}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("[Builder.io] Failed to create post:", error);
    // Show error to user, preserve edit state for manual retry
    return null;
  }
}
```

---

## Rate Limiting

**Builder.io Rate Limits**:

- Typically 10 requests/second for Write API
- Higher limits available on paid plans

**Implementation Strategy**:

- Single API call per save operation (no burst)
- No automatic retries on failure (per clarification Q1)
- User-initiated manual retry if needed

**No rate limiting delay needed** for this feature since:

1. One save operation = one API call
2. User-initiated actions (not automated batch)
3. Success criteria targets <3s for creation, <2s for updates

---

## Validation

### Pre-Request Validation

**Client-Side** (before API call):

```typescript
function validateBeforeSave(postData: PostData): ValidationErrors {
  const errors: ValidationErrors = {};

  // Required fields
  if (!postData.title || postData.title.trim() === "") {
    errors.title = "Title is required";
  }

  if (!postData.slug || postData.slug.trim() === "") {
    errors.slug = "Slug is required";
  }

  // Event-specific validation
  if (postData.eventStartDate && postData.eventEndDate) {
    if (postData.eventStartDate >= postData.eventEndDate) {
      errors.eventStartDate = "Start date must be before end date";
    }
  }

  // URL validation
  if (postData.eventRegistration && !isValidUrl(postData.eventRegistration)) {
    errors.eventRegistration = "Must be a valid URL";
  }

  return errors;
}
```

### Server-Side Validation (by Builder.io)

Builder.io validates:

- Required fields per model schema
- Reference field validity (IDs must exist)
- Data type matching
- Field constraints

---

## Performance Characteristics

### Expected Response Times

| Operation         | Expected   | Max Acceptable |
| ----------------- | ---------- | -------------- |
| Create (new post) | 500-1500ms | 2000ms         |
| Update (existing) | 300-1000ms | 1500ms         |

### Payload Sizes

| Scenario                             | Typical Size | Max Size |
| ------------------------------------ | ------------ | -------- |
| Minimal post (title + content)       | 2-5 KB       | -        |
| Full post (all 10 sections + images) | 20-50 KB     | -        |
| With all references                  | 30-60 KB     | ~100 KB  |

**Note**: Images are references (URLs), not uploaded in payload.

---

## Testing

### Manual Testing Checklist

- [ ] Create new post with minimal fields (title only)
- [ ] Create new post with all 10 content sections
- [ ] Create new post with all 10 images
- [ ] Create new post with all reference fields populated
- [ ] Create event with event-specific fields
- [ ] Create project result with project-specific fields
- [ ] Update existing post - change title
- [ ] Update existing post - change multiple fields
- [ ] Update existing post - add/remove references
- [ ] Test error handling - invalid API key
- [ ] Test error handling - missing required field
- [ ] Test error handling - invalid reference ID
- [ ] Verify single API call per operation (network tab)
- [ ] Verify response includes all submitted data
- [ ] Verify lastUpdated timestamp changes on update

### Network Tab Verification

**Expected**:

- 1 POST request to `/v1/write/post-page` for create
- 1 PUT request to `/v1/write/post-page/{id}` for update
- Status 200 for success
- Response includes complete post data

**NOT Expected**:

- Multiple API calls for references (old Wix pattern)
- 4xx/5xx errors (unless testing error cases)

---

## Integration with Cache Invalidation

After successful API call, invalidate cache before redirect:

```typescript
async function savePost(postData: PostData) {
  // 1. Save to Builder.io
  const result = await createBuilderPost(postData);

  if (!result) {
    // Error already logged, show error message to user
    return;
  }

  console.log("[Builder.io] Post created successfully:", result.id);

  // 2. Invalidate cache (after save, before redirect)
  try {
    await invalidatePostPageCache(result.data.slug);
    console.log("[Cache] Cache invalidated for:", result.data.slug);
  } catch (cacheError) {
    console.warn("[Cache] Invalidation failed, continuing anyway:", cacheError);
    // Post is saved successfully, cache will expire naturally
  }

  // 3. Redirect to new post
  router.push(`/post-page/${result.data.slug}`);
}
```

---

## Security Considerations

### API Key Protection

**✅ DO**:

- Store API key in `.env.local` (server-side only)
- Use API key only in server-side functions
- Never commit API key to version control

**❌ DON'T**:

- Expose API key in client-side code
- Log API key in console
- Include API key in error messages

### Data Validation

**✅ DO**:

- Validate all user input before API call
- Sanitize HTML content in rich text fields
- Validate URLs before submission
- Check reference IDs exist

**❌ DON'T**:

- Trust user input without validation
- Allow script injection in content fields
- Submit unchecked file URLs

---

## References

- Builder.io Write API Docs: https://www.builder.io/c/docs/write-api
- Builder.io Reference Type: https://www.builder.io/c/docs/references
- Feature Specification: `specs/003-post-page-migration/spec.md`
- Data Model: `specs/003-post-page-migration/data-model.md`
- Research: `specs/003-post-page-migration/research.md`
