# Data Model: Person-Page Builder.io Migration

**Feature**: 007-person-page-builder
**Date**: 2025-12-05

## Entities

### Person Info-Page

Stored in Builder.io `info-page` model.

| Field            | Type        | Required | Description                                |
| ---------------- | ----------- | -------- | ------------------------------------------ |
| title            | String      | Yes      | Person's name (from personTag.name)        |
| description      | String      | No       | Person's bio/description                   |
| slug             | String      | Yes      | URL path (e.g., `/person/john-doe-abc123`) |
| person           | Reference[] | Yes      | Link to person tag (personItem wrapper)    |
| pageOwner        | Reference[] | Yes      | Link to owner tag (pageOwnerItem wrapper)  |
| author           | Reference[] | Yes      | Link to author tag (authorItem wrapper)    |
| pageTypes        | Reference[] | Yes      | Page type tag (pageTypeItem wrapper)       |
| countryTag       | Reference[] | Yes      | Country tag (countryTagItem wrapper)       |
| methods          | Reference[] | No       | Foresight methods (methodsItem wrapper)    |
| domains          | Reference[] | No       | Domain tags (domainsItem wrapper)          |
| activity         | Reference[] | No       | Activity tags (activityItem wrapper)       |
| linkedinLink     | String      | No       | LinkedIn profile URL                       |
| websiteLink      | String      | No       | Personal website URL                       |
| researchGateLink | String      | No       | ResearchGate profile URL                   |
| orcidLink        | String      | No       | ORCID profile URL                          |
| mediaFiles       | Object[]    | No       | Attached files with url, displayName       |

### Person Tag

Stored in Builder.io `tag` model with `tagType: "person"`.

| Field       | Type   | Required | Description                               |
| ----------- | ------ | -------- | ----------------------------------------- |
| \_id        | String | Yes      | Builder.io content ID                     |
| name        | String | Yes      | Person's display name                     |
| tagType     | String | Yes      | Always "person"                           |
| tagLine     | String | No       | Short description/title                   |
| picture     | String | No       | Profile picture URL                       |
| tagPageLink | String | No       | Link to person info-page (`/person/slug`) |

### Affiliation (Person)

Stored in Builder.io `affiliations` model. Person pages have 4 affiliation types.

#### Current Organisation Affiliation

| Field           | Type      | Required | Description                           |
| --------------- | --------- | -------- | ------------------------------------- |
| \_id            | String    | Yes      | Builder.io content ID                 |
| title           | String    | Yes      | Display title (e.g., "John -to- Org") |
| personTag       | Reference | Yes      | Link to person tag                    |
| organisationTag | Reference | Yes      | Link to organisation tag              |
| role            | String    | No       | Role at organisation                  |
| extraIdentifier | String    | Yes      | Always `"current"`                    |

#### Former Organisation Affiliation

| Field           | Type      | Required | Description                           |
| --------------- | --------- | -------- | ------------------------------------- |
| \_id            | String    | Yes      | Builder.io content ID                 |
| title           | String    | Yes      | Display title (e.g., "John -to- Org") |
| personTag       | Reference | Yes      | Link to person tag                    |
| organisationTag | Reference | Yes      | Link to organisation tag              |
| role            | String    | No       | Former role at organisation           |
| extraIdentifier | String    | Yes      | Always `"former"`                     |

#### Project Coordination Affiliation

| Field           | Type      | Required | Description                               |
| --------------- | --------- | -------- | ----------------------------------------- |
| \_id            | String    | Yes      | Builder.io content ID                     |
| title           | String    | Yes      | Display title (e.g., "John -to- Project") |
| personTag       | Reference | Yes      | Link to person tag                        |
| projectTag      | Reference | Yes      | Link to project tag                       |
| extraIdentifier | String    | Yes      | Always `"coordination"`                   |

#### Project Participation Affiliation

| Field           | Type      | Required | Description                               |
| --------------- | --------- | -------- | ----------------------------------------- |
| \_id            | String    | Yes      | Builder.io content ID                     |
| title           | String    | Yes      | Display title (e.g., "John -to- Project") |
| personTag       | Reference | Yes      | Link to person tag                        |
| projectTag      | Reference | Yes      | Link to project tag                       |
| extraIdentifier | String    | Yes      | Always `"participation"`                  |

## Relationships

```
┌─────────────────┐         ┌─────────────────┐
│  Person Tag     │◄────────│  Person Page    │
│  (tag model)    │ person  │  (info-page)    │
└────────┬────────┘         └─────────────────┘
         │
         │ personTag
         ▼
┌─────────────────┐         ┌─────────────────┐
│  Affiliation    │─────────│  Organisation   │
│  (affiliations) │ orgTag  │  Tag            │
└────────┬────────┘         └─────────────────┘
         │
         │ projectTag
         ▼
┌─────────────────┐
│  Project Tag    │
│  (tag model)    │
└─────────────────┘
```

## Reference Field Wrapper Keys

| Component Field | Builder.io Field | Wrapper Key    | Type           |
| --------------- | ---------------- | -------------- | -------------- |
| personTag       | person           | personItem     | Single → Array |
| pageOwner       | pageOwner        | pageOwnerItem  | Array          |
| author          | author           | authorItem     | Array          |
| pageType        | pageTypes        | pageTypeItem   | Single → Array |
| countryTag      | countryTag       | countryTagItem | Single → Array |
| methods         | methods          | methodsItem    | Array          |
| domains         | domains          | domainsItem    | Array          |
| activity        | activity         | activityItem   | Array          |

## Validation Rules

### Person Page Validation

1. `personTag` is required (auto-populated from logged-in user)
2. `countryTag` is required - display error if missing
3. `slug` must be unique - use `sanitizeTitleForSlug(name) + "-" + generateUniqueHash()`
4. All reference fields must use correct wrapper keys

### Affiliation Validation

1. `personTag` is required
2. `organisationTag` is required for current/former affiliations
3. `projectTag` is required for coordination/participation affiliations
4. `extraIdentifier` must be one of: `current`, `former`, `coordination`, `participation`
5. `title` format: `"{personName} -to- {org/projectName}"`

## State Transitions

### Person Page Lifecycle

```
[New Page Route] ────► [Edit Mode: Empty] ────► [Save/Publish]
                           │                         │
                           ▼                         ▼
                     [User fills form]      [Create in Builder.io]
                           │                         │
                           ▼                         ▼
                     [Validates fields]      [Update tag tagPageLink]
                           │                         │
                           ▼                         ▼
                     [Clicks Publish]        [Redirect to new page]
```

### Edit Existing Page

```
[View Mode] ────► [Edit Mode] ────► [Save Changes]
     │                 │                  │
     ▼                 ▼                  ▼
[Click Edit]    [Modify fields]   [Update in Builder.io]
                       │                  │
                       ▼                  ▼
               [Discard] ──────►    [Update tag if changed]
               [returns to View]          │
                                          ▼
                                    [Update Wix nickname]
                                          │
                                          ▼
                                    [Stay on page, View Mode]
```
