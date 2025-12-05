# Data Model: Organisation-Page Builder Migration

**Branch**: `006-organisation-page-builder` | **Date**: 2025-12-05

## Entities

### Organisation Info-Page

Stored in Builder.io `info-page` model.

| Field                       | Type          | Builder.io Field            | Wrapper Key               | Required |
| --------------------------- | ------------- | --------------------------- | ------------------------- | -------- |
| title                       | string        | title                       | -                         | Yes      |
| description                 | string        | description                 | -                         | No       |
| slug                        | string        | slug                        | -                         | Yes      |
| organisationTag             | Reference     | organisation                | organisationItem          | Yes      |
| pageOwner                   | Reference[]   | pageOwner                   | pageOwnerItem             | Yes      |
| author                      | Reference[]   | author                      | authorItem                | Yes      |
| pageType                    | Reference[]   | pageTypes                   | pageTypeItem              | Yes      |
| countryTag                  | Reference[]   | countryTag                  | countryTagItem            | Yes      |
| methods                     | Reference[]   | methods                     | methodsItem               | No       |
| domains                     | Reference[]   | domains                     | domainsItem               | No       |
| organisationType            | Reference[]   | organisationType            | organisationTypeItem      | No       |
| memberOrganisations         | Reference[]   | organisationHasMember       | organisationHasMemberItem | No       |
| memberOfOrganisations       | Reference[]   | organisationMemberOf        | organisationMemberOfItem  | No       |
| activity                    | Reference[]   | activity                    | activityItem              | No       |
| postContentRIch1-10         | string (rich) | postContentRIch1-10         | -                         | No       |
| postImage1-10               | string (URL)  | postImage1-10               | -                         | No       |
| organisationEstablishedDate | date          | organisationEstablishedDate | -                         | No       |
| linkedinLink                | string        | linkedinLink                | -                         | No       |
| websiteLink                 | string        | websiteLink                 | -                         | No       |
| mediaFiles                  | MediaFile[]   | mediaFiles                  | -                         | No       |

### Organisation Tag

Stored in Builder.io `tag` model.

| Field       | Type   | Description                                       |
| ----------- | ------ | ------------------------------------------------- |
| \_id        | string | Builder.io content ID                             |
| name        | string | Organisation name (display name)                  |
| tagType     | string | Always "organisation"                             |
| tagPageLink | string | URL to organisation page (`/organisation/{slug}`) |
| picture     | string | Organisation logo/image URL                       |
| tagLine     | string | Short description                                 |

### Affiliation

Stored in Builder.io `affiliations` model.

#### Project Affiliation (Organisation → Project)

| Field           | Type      | Value/Format                              |
| --------------- | --------- | ----------------------------------------- |
| organisationTag | Reference | Organisation tag reference                |
| projectTag      | Reference | Project tag reference                     |
| role            | string    | Role in project (e.g., "Coordinator")     |
| extraIdentifier | string    | `"projectOrganisationRole"`               |
| title           | string    | `"{organisationName} -to- {projectName}"` |

#### People Affiliation (Organisation → Person)

| Field           | Type      | Value/Format                             |
| --------------- | --------- | ---------------------------------------- |
| organisationTag | Reference | Organisation tag reference               |
| personTag       | Reference | Person tag reference                     |
| role            | string    | Role in organisation (e.g., "Director")  |
| extraIdentifier | string    | `"current"`                              |
| title           | string    | `"{organisationName} -to- {personName}"` |

## Reference Format

Builder.io references use wrapper keys for list fields:

```typescript
// Single reference in array
{
  organisationItem: {
    "@type": "@builder.io/core:Reference",
    id: "builder-content-id",
    model: "tag"
  }
}

// Multiple references
[
  { methodsItem: { "@type": "@builder.io/core:Reference", id: "id1", model: "tag" } },
  { methodsItem: { "@type": "@builder.io/core:Reference", id: "id2", model: "tag" } }
]
```

## State Transitions

### Organisation Page States

```
[New Page] → Create → [Draft] → Publish → [Published]
[Published] → Edit → [Editing] → Save → [Published]
[Editing] → Discard → [Published] (reverted)
```

### Validation Rules

| Rule                         | Condition                         | Error Message                        |
| ---------------------------- | --------------------------------- | ------------------------------------ |
| Organisation tag required    | `!organisationTag?.name`          | "Organisation tag is required"       |
| Country tag required         | `!countryTag?._id`                | "Country is required"                |
| Organisation name min length | `organisationTag.name.length < 2` | "Name must be at least 2 characters" |

## Relationships

```
Organisation Info-Page
    ├── has one → Organisation Tag (bidirectional via tagPageLink)
    ├── has one → Page Owner (person tag)
    ├── has one → Author (person tag)
    ├── has one → Page Type (tag)
    ├── has one → Country Tag
    ├── has many → Methods (tags)
    ├── has many → Domains (tags)
    ├── has many → Organisation Types (tags)
    ├── has many → Member Organisations (organisation tags)
    ├── has many → Member Of Organisations (organisation tags)
    ├── has many → Activity (tags)
    └── has many → Affiliations
            ├── Project Affiliations (extraIdentifier: "projectOrganisationRole")
            └── People Affiliations (extraIdentifier: "current")
```
