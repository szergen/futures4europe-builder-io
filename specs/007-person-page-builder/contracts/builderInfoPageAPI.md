# API Contract: Builder.io Info-Page API (Person)

**Feature**: 007-person-page-builder
**Date**: 2025-12-05

## Overview

This document describes the API contracts for person-page operations. All routes are reused from `005-project-page-builder` and `006-organisation-page-builder` - no new routes required.

## Routes Reused (100%)

### Create Person Info-Page

**Endpoint**: `POST /api/builder/info-page`
**Source**: `app/api/builder/info-page/route.ts`

**Request Body**:

```json
{
  "name": "John Doe",
  "data": {
    "title": "John Doe",
    "description": "Foresight researcher...",
    "slug": "/person/john-doe-abc123",
    "linkedinLink": "https://linkedin.com/in/johndoe",
    "websiteLink": "https://johndoe.com",
    "researchGateLink": "https://researchgate.net/profile/johndoe",
    "orcidLink": "https://orcid.org/0000-0001-2345-6789",
    "mediaFiles": [],
    "person": [
      {
        "personItem": {
          "@type": "@builder.io/core:Reference",
          "model": "tag",
          "id": "tag-id"
        }
      }
    ],
    "pageOwner": [
      {
        "pageOwnerItem": {
          "@type": "@builder.io/core:Reference",
          "model": "tag",
          "id": "tag-id"
        }
      }
    ],
    "author": [
      {
        "authorItem": {
          "@type": "@builder.io/core:Reference",
          "model": "tag",
          "id": "tag-id"
        }
      }
    ],
    "pageTypes": [
      {
        "pageTypeItem": {
          "@type": "@builder.io/core:Reference",
          "model": "tag",
          "id": "tag-id"
        }
      }
    ],
    "countryTag": [
      {
        "countryTagItem": {
          "@type": "@builder.io/core:Reference",
          "model": "tag",
          "id": "tag-id"
        }
      }
    ],
    "methods": [
      {
        "methodsItem": {
          "@type": "@builder.io/core:Reference",
          "model": "tag",
          "id": "tag-id"
        }
      }
    ],
    "domains": [
      {
        "domainsItem": {
          "@type": "@builder.io/core:Reference",
          "model": "tag",
          "id": "tag-id"
        }
      }
    ],
    "activity": [
      {
        "activityItem": {
          "@type": "@builder.io/core:Reference",
          "model": "tag",
          "id": "tag-id"
        }
      }
    ]
  },
  "published": "published"
}
```

**Response**: `201 Created`

```json
{
  "id": "builder-content-id",
  "data": { ... },
  "createdDate": 1701792000000
}
```

---

### Update Person Info-Page

**Endpoint**: `PUT /api/builder/info-page/[id]`
**Source**: `app/api/builder/info-page/[id]/route.ts`

**Request Body**: Same as POST

**Response**: `200 OK`

```json
{
  "id": "builder-content-id",
  "data": { ... },
  "lastUpdated": 1701792000000
}
```

---

### Update Person Tag

**Endpoint**: `PUT /api/builder/tag/[id]`
**Source**: `app/api/builder/tag/[id]/route.ts`

**Request Body**:

```json
{
  "data": {
    "name": "John Doe Updated",
    "tagPageLink": "/person/john-doe-abc123"
  }
}
```

**Response**: `200 OK`

---

### Create Affiliations (Bulk)

**Endpoint**: `POST /api/builder/affiliations`
**Source**: `app/api/builder/affiliations/route.ts`

**Request Body**:

```json
{
  "affiliations": [
    {
      "title": "John Doe -to- Organisation Name",
      "personTag": {
        "@type": "@builder.io/core:Reference",
        "model": "tag",
        "id": "person-tag-id"
      },
      "organisationTag": {
        "@type": "@builder.io/core:Reference",
        "model": "tag",
        "id": "org-tag-id"
      },
      "role": "Senior Researcher",
      "extraIdentifier": "current"
    },
    {
      "title": "John Doe -to- Project Name",
      "personTag": {
        "@type": "@builder.io/core:Reference",
        "model": "tag",
        "id": "person-tag-id"
      },
      "projectTag": {
        "@type": "@builder.io/core:Reference",
        "model": "tag",
        "id": "project-tag-id"
      },
      "extraIdentifier": "coordination"
    }
  ]
}
```

**Response**: `201 Created`

```json
{
  "created": [
    { "id": "affiliation-id-1", ... },
    { "id": "affiliation-id-2", ... }
  ]
}
```

---

### Delete Affiliations (Bulk)

**Endpoint**: `POST /api/builder/affiliations/bulk-delete`
**Source**: `app/api/builder/affiliations/bulk-delete/route.ts`

**Request Body**:

```json
{
  "ids": ["affiliation-id-1", "affiliation-id-2"]
}
```

**Response**: `200 OK`

```json
{
  "deleted": ["affiliation-id-1", "affiliation-id-2"]
}
```

---

## Wix API (RETAINED)

### Update Member Nickname

**Function**: `updateMember(contactId, nickname)`
**Source**: `app/wixUtils/client-side.ts`
**SDK**: Wix Members SDK

This is NOT an HTTP endpoint - it's a client-side Wix SDK call that must be retained for authentication display purposes.

**Usage**:

```typescript
import { updateMember } from "@app/wixUtils/client-side";

// Called when person tag name changes
await updateMember(userDetails.contactId, newName);
```

**Note**: This is the ONLY Wix call retained in the person-page save flow.

---

## Error Handling

All endpoints return standard error responses:

```json
{
  "error": "Error message",
  "details": { ... }
}
```

| Status | Meaning                 |
| ------ | ----------------------- |
| 400    | Invalid request body    |
| 401    | Missing/invalid API key |
| 404    | Content not found       |
| 500    | Builder.io API error    |

---

## Reference Field Format

All reference fields must use wrapper keys:

```typescript
// Correct format
{
  "person": [
    { "personItem": { "@type": "@builder.io/core:Reference", "model": "tag", "id": "..." }}
  ]
}

// Incorrect format (will fail)
{
  "person": [
    { "@type": "@builder.io/core:Reference", "model": "tag", "id": "..." }
  ]
}
```

Use `transformReferencesForBuilderCreate()` utility to ensure correct format.
