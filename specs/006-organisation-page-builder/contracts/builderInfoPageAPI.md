# API Contract: Builder.io Info-Page (Organisation)

**Branch**: `006-organisation-page-builder` | **Date**: 2025-12-05

## Overview

This contract documents the API routes used for organisation page CRUD operations. All routes are **existing** from `005-project-page-builder` and are reused 100%.

## Routes

### POST `/api/builder/info-page`

Create a new info-page (organisation, project, or person).

**Request:**

```json
{
  "name": "Organisation Name",
  "published": "published",
  "data": {
    "title": "Organisation Name",
    "description": "Organisation description",
    "slug": "organisation-name-abc123",
    "organisation": [
      {
        "organisationItem": {
          "@type": "@builder.io/core:Reference",
          "id": "tag-id",
          "model": "tag"
        }
      }
    ],
    "pageOwner": [...],
    "author": [...],
    "pageTypes": [...],
    "countryTag": [...],
    "methods": [...],
    "domains": [...],
    "organisationType": [...],
    "organisationHasMember": [...],
    "organisationMemberOf": [...],
    "activity": [...],
    "postContentRIch1": "<p>Rich text content</p>",
    "postImage1": "https://...",
    "organisationEstablishedDate": "2020-01-01",
    "linkedinLink": "https://linkedin.com/...",
    "websiteLink": "https://...",
    "mediaFiles": [...]
  }
}
```

**Response (201):**

```json
{
  "id": "builder-content-id",
  "name": "Organisation Name",
  "data": { ... }
}
```

**Response (400/500):**

```json
{
  "error": "Error message"
}
```

---

### PUT `/api/builder/info-page/[id]`

Update an existing info-page.

**Request:** Same as POST

**Response (200):** Same as POST

---

### POST `/api/builder/affiliations`

Bulk create affiliations.

**Request:**

```json
{
  "affiliations": [
    {
      "organisationTag": { "_id": "org-tag-id", "name": "Org Name" },
      "projectTag": { "_id": "proj-tag-id", "name": "Project Name" },
      "role": "Coordinator",
      "extraIdentifier": "projectOrganisationRole",
      "title": "Org Name -to- Project Name"
    },
    {
      "organisationTag": { "_id": "org-tag-id", "name": "Org Name" },
      "personTag": { "_id": "person-tag-id", "name": "Person Name" },
      "role": "Director",
      "extraIdentifier": "current",
      "title": "Org Name -to- Person Name"
    }
  ]
}
```

**Response (201):**

```json
{
  "created": [
    { "id": "aff-1", "data": { ... } },
    { "id": "aff-2", "data": { ... } }
  ]
}
```

---

### POST `/api/builder/affiliations/bulk-delete`

Bulk delete affiliations.

**Request:**

```json
{
  "ids": ["aff-id-1", "aff-id-2"]
}
```

**Response (200):**

```json
{
  "deleted": ["aff-id-1", "aff-id-2"]
}
```

---

### DELETE `/api/builder/affiliations/[id]`

Delete a single affiliation.

**Response (200):**

```json
{
  "deleted": "aff-id"
}
```

---

### PUT `/api/builder/tag/[id]`

Update a tag (organisation tag).

**Request:**

```json
{
  "name": "Updated Organisation Name",
  "tagPageLink": "/organisation/new-slug",
  "picture": "https://...",
  "tagLine": "Short description"
}
```

**Response (200):**

```json
{
  "id": "tag-id",
  "data": { ... }
}
```

## Reference Field Format

All reference fields use wrapper keys:

| Field                 | Wrapper Key               |
| --------------------- | ------------------------- |
| organisation          | organisationItem          |
| pageOwner             | pageOwnerItem             |
| author                | authorItem                |
| pageTypes             | pageTypeItem              |
| countryTag            | countryTagItem            |
| methods               | methodsItem               |
| domains               | domainsItem               |
| organisationType      | organisationTypeItem      |
| organisationHasMember | organisationHasMemberItem |
| organisationMemberOf  | organisationMemberOfItem  |
| activity              | activityItem              |

## Error Handling

All routes return appropriate HTTP status codes:

| Status | Meaning                        |
| ------ | ------------------------------ |
| 200    | Success (update/delete)        |
| 201    | Created (new resource)         |
| 400    | Bad request (validation error) |
| 401    | Unauthorized (missing API key) |
| 404    | Not found                      |
| 500    | Server error                   |

Errors include a JSON body with `error` field containing the error message.
