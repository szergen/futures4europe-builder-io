# Data Model: Project-Page Builder.io Migration

**Feature**: 005-project-page-builder
**Date**: 2025-12-05

## Entities Overview

```
┌─────────────────┐       ┌─────────────────┐
│   Info-Page     │───────│    Tag          │
│  (project type) │       │ (project type)  │
└────────┬────────┘       └────────┬────────┘
         │                         │
         │ projectTag ◄────────────┘ tagPageLink
         │
         │ affiliations
         ▼
┌─────────────────┐
│   Affiliation   │
│ (coordination,  │
│  participation, │
│  orgRole)       │
└─────────────────┘
```

---

## Entity: Info-Page (Project)

**Builder.io Model**: `info-page`
**Purpose**: Stores project page content and metadata

### Fields

| Field       | Type   | Required | Description                          |
| ----------- | ------ | -------- | ------------------------------------ |
| title       | String | Yes      | Project name (from projectTag.name)  |
| description | String | No       | Short description                    |
| slug        | String | Yes      | URL path (format: `/project/{slug}`) |

### Content Fields

| Field             | Type     | Description              |
| ----------------- | -------- | ------------------------ |
| postContentRIch1  | RichText | Content section 1        |
| postContentRIch2  | RichText | Content section 2        |
| ...               | ...      | ...                      |
| postContentRIch10 | RichText | Content section 10       |
| postImage1        | Object   | Image {url, displayName} |
| postImage2        | Object   | Image {url, displayName} |
| ...               | ...      | ...                      |
| postImage10       | Object   | Image {url, displayName} |

### Metadata Fields

| Field            | Type   | Description                     |
| ---------------- | ------ | ------------------------------- |
| projectStartDate | Date   | Project start date              |
| projectEndDate   | Date   | Project end date                |
| linkedinLink     | String | LinkedIn URL                    |
| websiteLink      | String | Website URL                     |
| mediaFiles       | Array  | [{url, displayName, thumbnail}] |

### Reference Fields

| Field         | Builder.io Field       | Wrapper Key                | Model | Cardinality |
| ------------- | ---------------------- | -------------------------- | ----- | ----------- |
| projectTag    | project                | projectItem                | tag   | 1           |
| pageOwner     | pageOwner              | pageOwnerItem              | tag   | 1+          |
| author        | author                 | authorItem                 | tag   | 1+          |
| pageType      | pageTypes              | pageTypeItem               | tag   | 1           |
| countryTag    | countryTag             | countryTagItem             | tag   | 0-1         |
| methods       | methods                | methodsItem                | tag   | 0+          |
| domains       | domains                | domainsItem                | tag   | 0+          |
| coordinators  | projectCoordinator     | projectCoordinatorItem     | tag   | 0+          |
| participants  | projectParticipantTeam | projectParticipantTeamItem | tag   | 0+          |
| organisations | projectOrganisation    | projectOrganisationItem    | tag   | 0+          |
| projectFunded | projectFunded          | projectFundedItem          | tag   | 0-1         |

### Reference Format (Builder.io)

```json
{
  "projectItem": {
    "@type": "@builder.io/core:Reference",
    "id": "tag-builder-id",
    "model": "tag"
  }
}
```

---

## Entity: Affiliation

**Builder.io Model**: `affiliations`
**Purpose**: Links projects to people and organisations with roles

### Fields

| Field           | Type   | Required | Description                                 |
| --------------- | ------ | -------- | ------------------------------------------- |
| title           | String | Yes      | Display title (e.g., "Project -to- Person") |
| extraIdentifier | String | Yes      | Type discriminator                          |
| role            | String | No       | Role description (for org affiliations)     |

### Reference Fields

| Field           | Type      | Description                                            |
| --------------- | --------- | ------------------------------------------------------ |
| projectTag      | Reference | Link to project tag                                    |
| personTag       | Reference | Link to person tag (for coordination/participation)    |
| organisationTag | Reference | Link to organisation tag (for projectOrganisationRole) |

### Affiliation Types

| extraIdentifier           | Description           | Required References               |
| ------------------------- | --------------------- | --------------------------------- |
| `coordination`            | Project coordinator   | projectTag, personTag             |
| `participation`           | Project participant   | projectTag, personTag             |
| `projectOrganisationRole` | Organisation involved | projectTag, organisationTag, role |

### Create Payload Example

```json
{
  "name": "ProjectX -to- John Doe",
  "data": {
    "title": "ProjectX -to- John Doe",
    "projectTag": {
      "@type": "@builder.io/core:Reference",
      "id": "project-tag-id",
      "model": "tag"
    },
    "personTag": {
      "@type": "@builder.io/core:Reference",
      "id": "person-tag-id",
      "model": "tag"
    },
    "extraIdentifier": "coordination"
  },
  "published": "published"
}
```

---

## Entity: Tag (Project Type)

**Builder.io Model**: `tag`
**Purpose**: Represents the project as a taggable entity

### Relevant Fields for Update

| Field       | Type   | Description                                     |
| ----------- | ------ | ----------------------------------------------- |
| name        | String | Project name (synced with info-page title)      |
| tagType     | String | Must be "project"                               |
| tagPageLink | String | URL to project page (format: `/project/{slug}`) |
| tagLine     | String | Short description                               |
| picture     | String | Project image URL                               |

### Update Payload Example

```json
{
  "name": "Updated Project Name",
  "tagPageLink": "/project/updated-project-name-abc123"
}
```

---

## State Transitions

### Info-Page Lifecycle

```
[New] ──create──► [Published] ──update──► [Published]
                       │
                       └──unpublish──► [Unpublished]
```

### Affiliation Lifecycle

```
[None] ──create──► [Active]
                      │
                      └──delete──► [Deleted]
```

Note: Affiliations use a "replace" pattern - old affiliations are deleted before new ones are created when coordinators/participants/organisations change.

---

## Validation Rules

### Info-Page Creation

1. `projectTag` is REQUIRED - must have a valid project tag selected
2. `slug` must be unique (enforced by appending hash)
3. `pageOwner` and `author` set from logged-in user's tag

### Info-Page Update

1. `projectTag` changes trigger tag name update
2. Changes to coordinators/participants/organisations trigger affiliation replace

### Affiliation Creation

1. `projectTag` is REQUIRED
2. Either `personTag` OR `organisationTag` is REQUIRED (based on type)
3. `extraIdentifier` is REQUIRED
4. `title` is REQUIRED (auto-generated from tag names)

---

## Cache Keys

| Cache Key                           | TTL     | Description                         |
| ----------------------------------- | ------- | ----------------------------------- |
| `affiliations_builder.json`         | 4 hours | All affiliations with resolved refs |
| `tags_builder.json`                 | 4 hours | All tags in Wix format              |
| `tags-with-popularity_builder.json` | 4 hours | Tags with mention counts            |
| `builder-tags-raw_builder.json`     | 4 hours | Raw Builder.io tag data             |

### Cache Update Operations

| Operation          | Cache Update                            |
| ------------------ | --------------------------------------- |
| Create affiliation | Append to `affiliations_builder.json`   |
| Delete affiliation | Remove from `affiliations_builder.json` |
| Update tag         | Update in all tag caches                |
