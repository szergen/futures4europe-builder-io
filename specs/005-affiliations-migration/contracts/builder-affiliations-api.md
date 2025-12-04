# API Contract: Builder.io Affiliations

**Feature**: 005-affiliations-migration  
**Date**: 2024-12-04

## Overview

This document defines the API contracts for affiliations operations after migrating to Builder.io.

---

## 1. GET /api/affiliations

Fetches all affiliations from Builder.io (cached).

### Request

```
GET /api/affiliations
```

No query parameters.

### Response

**Success (200)**:

```json
[
  {
    "data": {
      "title": "John Doe -to- Project X",
      "projectTag": "a1b2c3d4e5f6...",
      "organisationTag": null,
      "personTag": "g7h8i9j0k1l2...",
      "extraOrganisationTag": null,
      "role": "",
      "extraIdentifier": "participation",
      "_id": "builder-affiliation-id-1",
      "_createdDate": {
        "$date": "2025-01-24T14:23:45.000Z"
      },
      "_updatedDate": {
        "$date": "2025-01-24T14:23:45.000Z"
      }
    }
  }
]
```

**Error (500)**:

```json
{
  "message": "Error fetching affiliations"
}
```

### Notes

- Response format matches legacy Wix format for backwards compatibility
- Tag IDs are Builder.io IDs (not Wix IDs)
- Results are cached in Redis (4-hour TTL)
- Cache is checked first; on miss, fetches from Builder.io

---

## 2. POST /api/affiliations

Refreshes the affiliations cache from Builder.io.

### Request

```
POST /api/affiliations
```

No body required.

### Response

**Success (200)**:

```json
{
  "message": "Cache updated successfully."
}
```

**Error (500)**:

```json
{
  "message": "Failed to update cache"
}
```

### Notes

- Fetches fresh data from Builder.io
- Transforms to Wix-compatible format
- Saves to Redis cache
- Used by cache warming and manual refresh

---

## 3. Builder.io Write API (Migration Script)

Used by `migrate-affiliations.js` to create affiliations.

### Create Affiliation

**Endpoint**: `POST https://builder.io/api/v1/write/affiliations`

**Headers**:

```
Authorization: Bearer <BUILDER_PRIVATE_API_KEY>
Content-Type: application/json
```

**Request Body**:

```json
{
  "name": "John Doe -to- Project X",
  "published": "published",
  "data": {
    "title": "John Doe -to- Project X",
    "projectTag": {
      "@type": "@builder.io/core:Reference",
      "id": "a1b2c3d4e5f6...",
      "model": "tag"
    },
    "organisationTag": null,
    "personTag": {
      "@type": "@builder.io/core:Reference",
      "id": "g7h8i9j0k1l2...",
      "model": "tag"
    },
    "extraOrganisationTag": null,
    "role": "",
    "extraIdentifier": "participation",
    "wixId": "002bef30-d76d-4423-9045-91d5f29ca3ab"
  }
}
```

**Success Response (200)**:

```json
{
  "id": "builder-affiliation-id-1",
  "name": "John Doe -to- Project X",
  "published": "published",
  "createdDate": 1706105025000,
  "lastUpdated": 1706105025000,
  "data": {
    "title": "John Doe -to- Project X",
    "projectTag": {
      "@type": "@builder.io/core:Reference",
      "id": "a1b2c3d4e5f6...",
      "model": "tag"
    },
    "personTag": {
      "@type": "@builder.io/core:Reference",
      "id": "g7h8i9j0k1l2...",
      "model": "tag"
    },
    "extraIdentifier": "participation",
    "wixId": "002bef30-d76d-4423-9045-91d5f29ca3ab"
  }
}
```

**Error Response (4xx/5xx)**:

```json
{
  "error": "Error message"
}
```

---

## 4. Builder.io Read API (Fetch Affiliations)

Used by `/api/affiliations` endpoint to fetch affiliations.

### Get All Affiliations

**Endpoint**: `GET https://cdn.builder.io/api/v3/content/affiliations`

**Query Parameters**:

- `apiKey`: Builder.io public API key
- `limit`: Number of items (max 100)
- `offset`: Pagination offset
- `cachebust`: Set to `true` for fresh data

**Response**:

```json
{
  "results": [
    {
      "id": "builder-affiliation-id-1",
      "name": "John Doe -to- Project X",
      "data": {
        "title": "John Doe -to- Project X",
        "projectTag": {
          "@type": "@builder.io/core:Reference",
          "id": "a1b2c3d4e5f6...",
          "model": "tag",
          "value": {
            /* resolved tag data */
          }
        },
        "personTag": {
          /* ... */
        },
        "extraIdentifier": "participation",
        "wixId": "002bef30-d76d-4423-9045-91d5f29ca3ab"
      },
      "createdDate": 1706105025000,
      "lastUpdated": 1706105025000
    }
  ]
}
```

### Notes

- Pagination required (100 items per page max)
- Use Builder.io SDK `builder.getAll()` for automatic pagination
- `includeRefs: true` to resolve tag references

---

## 5. Type Definitions

### TypeScript Interfaces

```typescript
// Builder.io Reference type
interface BuilderReference {
  "@type": "@builder.io/core:Reference";
  id: string;
  model: string;
  value?: any;
}

// Builder.io Affiliation (raw format)
interface BuilderAffiliation {
  id: string;
  name: string;
  published: "published" | "draft";
  createdDate: number;
  lastUpdated: number;
  data: {
    title: string;
    projectTag?: BuilderReference;
    organisationTag?: BuilderReference;
    extraOrganisationTag?: BuilderReference;
    personTag?: BuilderReference;
    role?: string;
    extraIdentifier?: string;
    wixId?: string;
  };
}

// Wix-compatible Affiliation (transformed format)
interface WixCompatibleAffiliation {
  data: {
    title: string;
    projectTag?: string;
    organisationTag?: string;
    extraOrganisationTag?: string;
    personTag?: string;
    role?: string;
    extraIdentifier?: string;
    _id?: string;
    _createdDate?: { $date: string };
    _updatedDate?: { $date: string };
  };
}
```

---

## 6. Error Handling

### HTTP Status Codes

| Code | Meaning      | Action               |
| ---- | ------------ | -------------------- |
| 200  | Success      | Process response     |
| 400  | Bad Request  | Check request format |
| 401  | Unauthorized | Check API key        |
| 404  | Not Found    | Handle gracefully    |
| 429  | Rate Limited | Retry with backoff   |
| 500  | Server Error | Retry or fail        |

### Retry Strategy

For migration script:

- Max retries: 3
- Backoff: Exponential (1s, 2s, 4s)
- Rate limiting: 200ms between requests

For API endpoint:

- Max retries: 3
- Backoff: Exponential (1s, 2s, 4s)
- Fallback: Return cached data if available
