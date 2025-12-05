# Feature Specification: Project-Page Creation Migration from Wix to Builder.io

**Feature Branch**: `005-project-page-builder`  
**Created**: 2025-12-04  
**Status**: Draft  
**Input**: User description: "Similar to how we migrated the post-page creation from Wix to Builder.io, we need to do the same for the project-page. Currently it uses everything to create a new page and update a new page from Wix, but now it should do that in Builder. The data is already migrated and the model name is info-page."

## Clarifications

### Session 2025-12-05

- Q: Affiliations are migrated to Builder.io for reading. What should happen to the affiliation create/update/delete code that currently uses Wix? → A: Migrate affiliation write operations to Builder.io - create/update/delete affiliations in Builder.io instead of Wix
- Q: What should happen when two users edit the same project page simultaneously and both try to save? → A: Last write wins - second save overwrites first, no conflict detection (Builder.io default behavior)
- Q: Should this spec also cover person-page and organisation-page write migrations, or just project-page? → A: Project-page only - person-page and organisation-page will have separate specs

## User Scenarios & Testing _(mandatory)_

### User Story 1 - User Creates New Project Page (Priority: P1)

A logged-in user navigates to the "New Project" page and creates a new project info page by providing a project tag (name), description, content, and related tags, then saving it to Builder.io.

**Why this priority**: This is the core functionality that enables project page creation on the Builder.io platform. Without it, users cannot create any new project pages and the migration cannot be considered complete.

**Independent Test**: Can be fully tested by logging in as a user, navigating to `/project-page/New_Project`, selecting or creating a project tag, filling in description and content fields, clicking "Publish", and verifying the new project page appears in Builder.io with all fields correctly saved and the user is redirected to the new project page.

**Acceptance Scenarios**:

1. **Given** a logged-in user navigates to `/project-page/New_Project`, **When** they select/create a project tag, fill in content fields, and click "Publish", **Then** a new project info-page is created in Builder.io with a unique slug, all fields are saved correctly, and the user is redirected to the new project page
2. **Given** a user is creating a new project page, **When** they add multiple content sections with rich text and images, **Then** all 10 content sections (postContentRIch1-10) and images (postImage1-10) are saved correctly in Builder.io
3. **Given** a user is creating a new project page, **When** they add tags for methods, domains, coordinators, participants, and organisations, **Then** all references are created in Builder.io with correct Reference format
4. **Given** a user is the page owner, **When** they create a new project page, **Then** their user tag is automatically set as the author and pageOwner in Builder.io, and the project reference is set correctly
5. **Given** a user creates a new project page, **When** they set the project tag name (title), **Then** the associated project tag is updated in Builder.io with the new `tagPageLink` pointing to the new page (without deleting Redis cache or refetching tags)

---

### User Story 2 - User Edits Existing Project Page (Priority: P1)

A user who owns a project page can edit any field (project name, description, content, tags, dates, links) and save changes to Builder.io.

**Why this priority**: Editing is equally critical to creation - users need to update content, fix errors, and maintain their project pages over time. Without this, the platform would be write-once-only which is not viable.

**Independent Test**: Can be fully tested by opening an existing project page owned by the user, clicking "Edit", modifying multiple fields including project name, content, methods, and dates, clicking "Save & publish changes", and verifying all changes are persisted in Builder.io and visible immediately.

**Acceptance Scenarios**:

1. **Given** a user owns a project page, **When** they click "Edit", modify the project name and description, then click "Save & publish changes", **Then** the changes are saved to Builder.io and the updated page is displayed with cache invalidation
2. **Given** a user is editing a project page, **When** they modify the project tag name, **Then** the associated tag is updated in Builder.io with the new name (using existing tag update utilities, without full tag refetch)
3. **Given** a user is editing a project page, **When** they add or remove tags (methods, domains, coordinators, participants, organisations), **Then** all reference field changes are sent to Builder.io
4. **Given** a user is editing a project page, **When** they click "Discard Changes", **Then** all modifications are reverted to the last saved state and edit mode is exited without saving to Builder.io
5. **Given** a user is editing a project page, **When** changes are being saved, **Then** a "Saving Page..." modal is displayed to prevent duplicate submissions

---

### User Story 3 - Project Tag Creation/Update During Page Save (Priority: P1)

When a user creates or updates a project page with a new or modified project tag name, the system creates or updates the tag in Builder.io and links it to the page.

**Why this priority**: Project pages have a unique relationship with their project tag - the tag's `tagPageLink` must point to the page and the tag name updates when the project name changes. This is critical for maintaining data integrity.

**Independent Test**: Can be tested by creating a new project page with a new project tag, verifying the tag exists in Builder.io with the correct `tagPageLink`. Then edit the project name, verify the tag is updated in Builder.io, and confirm no full tag refetch or cache invalidation occurs (only cache updates).

**Acceptance Scenarios**:

1. **Given** a user creates a new project page, **When** they select an existing project tag, **Then** the tag's `tagPageLink` is updated in Builder.io to point to the new page URL
2. **Given** a user is editing a project page, **When** they change the project tag name, **Then** the tag is updated in Builder.io with the new name while preserving other tag properties
3. **Given** a tag update succeeds, **When** the operation completes, **Then** the local tag cache is updated (not invalidated) and the AuthContext `handleTagCreated` is NOT called (optimization from post-page migration)

---

### User Story 4 - Affiliation Management During Page Save (Priority: P1)

When a user adds or removes coordinators, participants, or organisation roles on a project page, the system creates, updates, or deletes the corresponding affiliation records in Builder.io.

**Why this priority**: Affiliations are core to project pages - they define who coordinates, participates in, and which organisations are involved in the project. These relationships must be correctly managed in Builder.io.

**Independent Test**: Can be tested by editing a project page, adding a coordinator person tag, saving, and verifying a new affiliation record is created in Builder.io with `extraIdentifier: "coordination"`. Then remove the coordinator, save, and verify the affiliation is deleted from Builder.io.

**Acceptance Scenarios**:

1. **Given** a user is editing a project page, **When** they add a coordinator, **Then** a new affiliation is created in Builder.io with `projectTag`, `personTag`, `extraIdentifier: "coordination"`, and appropriate title
2. **Given** a user is editing a project page, **When** they add a participant, **Then** a new affiliation is created in Builder.io with `projectTag`, `personTag`, `extraIdentifier: "participation"`, and appropriate title
3. **Given** a user is editing a project page, **When** they add an organisation with a role, **Then** a new affiliation is created in Builder.io with `projectTag`, `organisationTag`, `role`, `extraIdentifier: "projectOrganisationRole"`, and appropriate title
4. **Given** a user is editing a project page, **When** they remove a coordinator/participant/organisation, **Then** the corresponding affiliation record is deleted from Builder.io
5. **Given** affiliations are modified, **When** the operation completes, **Then** the affiliations cache is updated (not fully invalidated) to reflect the changes

---

### User Story 5 - Project Date and Link Management (Priority: P2)

A user can set and edit project-specific fields like start date, end date, LinkedIn link, and website link.

**Why this priority**: These are important metadata fields for project pages but not critical for basic functionality. The page can be created without them.

**Independent Test**: Can be tested by creating/editing a project page, setting dates and links, saving, and verifying these fields are correctly stored in Builder.io.

**Acceptance Scenarios**:

1. **Given** a user is editing a project page, **When** they set projectStartDate and projectEndDate, **Then** these dates are saved to Builder.io
2. **Given** a user is editing a project page, **When** they add linkedinLink and websiteLink, **Then** these URLs are saved to Builder.io

---

### User Story 6 - Media Files Management (Priority: P2)

A user can upload and manage media files (documents, images) attached to the project page.

**Why this priority**: File attachments enhance project pages but are not required for basic functionality.

**Independent Test**: Can be tested by adding media files to a project page, saving, and verifying the files are correctly referenced in Builder.io.

**Acceptance Scenarios**:

1. **Given** a user is editing a project page, **When** they add media files, **Then** the mediaFiles array is saved to Builder.io with url, displayName, and thumbnail properties
2. **Given** a user is editing a project page, **When** they remove or modify media files, **Then** the changes are reflected in Builder.io

---

### Edge Cases

- **Missing project tag**: When a user tries to save without selecting/creating a project tag, the system should display a validation error and prevent saving
- **User not logged in**: When a non-authenticated user tries to access `/project-page/New_Project`, they should be redirected to login page or see an error message
- **Non-owner accessing project page**: When a user who doesn't own a project page views the page, the page renders in read-only mode with edit buttons hidden
- **Validation errors during save**: When a user tries to publish with validation errors, the save operation is blocked and error messages are displayed
- **Network failure during save**: When the Builder.io API call fails, an error message is displayed immediately to the user, data remains in edit state, and the user can manually retry
- **Duplicate slug generation**: When a generated slug already exists in Builder.io, the system appends a unique hash to ensure slug uniqueness (using existing generateUniqueHash function)
- **Tag update failure**: When the project tag update fails after page save, the page is still saved correctly but the user is notified that tag linking may be incomplete
- **Cache update failure**: When cache update fails after save, the system logs a warning but does not fail the operation (graceful degradation)
- **Affiliation create failure**: When an affiliation create fails after page save, the page is still saved correctly but the user is notified that some relationships may be incomplete
- **Partial affiliation update**: When some affiliations succeed and others fail during a batch operation, the system should report which failed and continue with successful ones
- **Concurrent edits**: When two users edit the same project page simultaneously, the last save wins (Builder.io default behavior) - no conflict detection or locking is implemented

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST replace Wix `insertDataItem` API call in `createNewProjectPage` function with Builder.io Write API call to `info-page` model
- **FR-002**: System MUST replace Wix `updateDataItem` API call in `updateDataToServer` function with Builder.io Update API call to `info-page` model
- **FR-003**: System MUST replace Wix `replaceDataItemReferences` API calls with Builder.io Reference field updates
- **FR-004**: System MUST create new project info-page in Builder.io with all fields (title, description, content sections, images, references, metadata)
- **FR-005**: System MUST update existing project info-page in Builder.io with changed fields
- **FR-006**: System MUST generate unique slug using existing `sanitizeTitleForSlug(projectTag.name)` function + unique hash for new project pages with `/project/` prefix
- **FR-007**: System MUST set `author` and `pageOwner` reference fields to the logged-in user's tag ID when creating new project pages
- **FR-008**: System MUST set `project` reference field (mapped to `Project` in Wix format) to link the info-page to the project tag
- **FR-009**: System MUST validate required fields (project tag at minimum) before allowing save/publish
- **FR-010**: System MUST display "Saving Page..." modal during API calls to prevent duplicate submissions
- **FR-011**: System MUST redirect user to `/project/{slug}` after successful new project page creation
- **FR-012**: System MUST call `invalidateProjectPageCache(slug)` after successful Builder.io save and before user redirect
- **FR-013**: System MUST handle all 10 content sections (postContentRIch1-10) and 10 image sections (postImage1-10)
- **FR-014**: System MUST handle all reference fields: author, pageOwner, project, pageTypes, countryTag, methods, domains, projectCoordinator, projectParticipantTeam, projectOrganisation, projectFunded
- **FR-015**: System MUST handle project-specific fields: projectStartDate, projectEndDate, linkedinLink, websiteLink
- **FR-016**: System MUST handle media files field (mediaFiles array with url, displayName, and thumbnail properties)
- **FR-017**: System MUST convert tag objects to Builder.io Reference format using wrapper keys matching existing info-page model structure (e.g., `{projectItem: {@type: "@builder.io/core:Reference", id: tag._id, model: "tag"}}`)
- **FR-018**: System MUST preserve all existing UI/UX behavior (edit/publish buttons, discard changes, validation states)
- **FR-019**: System MUST maintain page ownership check logic using `pageOwner` field from Builder.io data
- **FR-020**: System MUST refresh user data after creating new project page to update dashboard lists (call `handleUserDataRefresh`)
- **FR-021**: System MUST update project tag's `tagPageLink` when creating new project page (pointing to `/project/{slug}`)
- **FR-022**: System MUST update project tag's `name` when project name is changed during edit (using existing `updateBuilderTag` utility via API route)
- **FR-023**: System MUST NOT delete Redis cache or refetch all tags when creating/updating tags - instead update cache entries directly (optimization from post-page migration)
- **FR-024**: System MUST NOT call `refetchTags()`, `refetchInfoPages()`, or `refetchAffiliations()` during save operations (these are commented out in current code)
- **FR-025**: System MUST use existing tag update utilities (`/api/builder/tag/[id]` route) for updating project tags
- **FR-026**: System MUST handle API errors gracefully with user-friendly error messages
- **FR-027**: System MUST log save operations to browser console including operation start, success/failure status, and error details

### Affiliation Requirements

- **FR-028**: System MUST replace Wix `bulkInsertItems("Affiliations", ...)` calls with Builder.io Write API calls to `affiliations` model
- **FR-029**: System MUST replace Wix `bulkRemoveItems("Affiliations", ...)` calls with Builder.io Delete API calls to `affiliations` model
- **FR-030**: System MUST create coordination affiliations in Builder.io with fields: `projectTag` (reference), `personTag` (reference), `extraIdentifier: "coordination"`, `title`
- **FR-031**: System MUST create participation affiliations in Builder.io with fields: `projectTag` (reference), `personTag` (reference), `extraIdentifier: "participation"`, `title`
- **FR-032**: System MUST create organisation role affiliations in Builder.io with fields: `projectTag` (reference), `organisationTag` (reference), `role`, `extraIdentifier: "projectOrganisationRole"`, `title`
- **FR-033**: System MUST delete old affiliations before creating new ones when coordinators/participants/organisations change (replace pattern)
- **FR-034**: System MUST update affiliations cache after successful create/delete operations (append new records, remove deleted records)
- **FR-035**: System MUST NOT fully invalidate affiliations cache - instead update cache entries directly

### Reference Field Mapping

The following mappings from `builderInfoPageUtils.ts` MUST be followed for reference fields:

| Component Field | Builder.io Field       | Wrapper Key                |
| --------------- | ---------------------- | -------------------------- |
| projectTag      | project                | projectItem                |
| pageOwner       | pageOwner              | pageOwnerItem              |
| author          | author                 | authorItem                 |
| pageType        | pageTypes              | pageTypeItem               |
| countryTag      | countryTag             | countryTagItem             |
| methods         | methods                | methodsItem                |
| domains         | domains                | domainsItem                |
| coordinators    | projectCoordinator     | projectCoordinatorItem     |
| participants    | projectParticipantTeam | projectParticipantTeamItem |
| organisations   | projectOrganisation    | projectOrganisationItem    |
| projectFunded   | projectFunded          | projectFundedItem          |

### Key Entities

- **Project Info-Page**: Core content entity stored in Builder.io `info-page` model with title, description, slug, 10 rich text content sections, 10 images, metadata, and multiple reference fields
- **Project Tag**: Tag of type "project" that has a bidirectional relationship with the project info-page via `tagPageLink` and `project` reference
- **Affiliation**: Relationship record stored in Builder.io `affiliations` model linking a project to persons (coordinators/participants) or organisations with roles
- **Reference Field**: Link to other Builder.io content (tags) stored as Builder.io Reference objects with wrapper keys, `@type`, `id`, and `model` properties
- **Page Owner**: User who created the page and has edit permissions, stored as reference to person tag

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: User can create a new project page by selecting a project tag, filling in content, clicking publish, and seeing the new project page load within 3 seconds
- **SC-002**: User can edit an existing project page, modify any field, click save, and see changes reflected immediately within 2 seconds
- **SC-003**: System creates new project info-page in Builder.io using the `info-page` model (verified by checking Builder.io dashboard)
- **SC-004**: Project tag's `tagPageLink` is correctly updated to point to the new page URL when creating a project page
- **SC-005**: User who owns a project page can see "Edit" and "Save & publish changes" buttons, while non-owners cannot edit
- **SC-006**: Validation errors prevent saving and display clear messages to user
- **SC-007**: Cache invalidation occurs within 5 seconds of save, ensuring updated project pages appear on listing pages
- **SC-008**: All existing UI behaviors (edit mode, discard changes, loading spinners) work identically to pre-migration state
- **SC-009**: 100% of reference fields are correctly saved and retrievable after project page creation/update
- **SC-010**: No full tag refetch or cache invalidation occurs during save - only targeted cache updates (verified by checking network requests and logs)
- **SC-011**: Affiliations for coordinators, participants, and organisations are correctly created/deleted in Builder.io `affiliations` model
- **SC-012**: No Wix API calls remain in the project page save flow - all operations use Builder.io

## API Design Requirements

### Builder.io API Integration

**Create Project Info-Page API**:

- **Endpoint**: `POST https://builder.io/api/v1/write/info-page`
- **Headers**: `Authorization: Bearer {BUILDER_PRIVATE_API_KEY}`, `Content-Type: application/json`
- **Request Body**: Single JSON object with all fields using wrapper keys for references

**Update Project Info-Page API**:

- **Endpoint**: `PUT https://builder.io/api/v1/write/info-page/{id}`
- **Headers**: Same as create
- **Request Body**: Same structure as create

**Update Project Tag API** (reuse existing):

- **Endpoint**: `PUT /api/builder/tag/{id}` (Next.js API route)
- **Request Body**: `{ name, tagPageLink, ... }`

**Create Affiliation API**:

- **Endpoint**: `POST https://builder.io/api/v1/write/affiliations`
- **Headers**: `Authorization: Bearer {BUILDER_PRIVATE_API_KEY}`, `Content-Type: application/json`
- **Request Body**: `{ name, data: { projectTag, personTag/organisationTag, role, extraIdentifier, title }, published: "published" }`

**Delete Affiliation API**:

- **Endpoint**: `DELETE https://builder.io/api/v1/write/affiliations/{id}` (or unpublish via PUT)
- **Headers**: `Authorization: Bearer {BUILDER_PRIVATE_API_KEY}`

**Utility Functions** (to be created in `app/utils/builderInfoPageUtils.ts`):

- `createBuilderProjectPage(projectData, contentText, contentImages)`: Creates new project info-page in Builder.io
- `updateBuilderProjectPage(pageId, projectData, contentText, contentImages)`: Updates existing project info-page
- `transformProjectDataForBuilder(projectData, contentText, contentImages)`: Converts component state to Builder.io API format with correct wrapper keys

**Utility Functions** (to be created in `app/utils/builderAffiliationUtils.ts`):

- `createBuilderAffiliation(affiliationData)`: Creates new affiliation in Builder.io
- `deleteBuilderAffiliation(affiliationId)`: Deletes affiliation from Builder.io
- `bulkCreateAffiliations(affiliations)`: Creates multiple affiliations
- `bulkDeleteAffiliations(affiliationIds)`: Deletes multiple affiliations

**API Routes** (to be created):

- `POST /api/builder/info-page`: Create new info-page (server-side with private API key)
- `PUT /api/builder/info-page/[id]`: Update existing info-page
- `POST /api/builder/affiliations/create`: Create new affiliation (server-side)
- `DELETE /api/builder/affiliations/[id]`: Delete affiliation (server-side)

## Out of Scope

- **Person-page migration**: Person info-page create/update/delete operations will be handled in a separate spec
- **Organisation-page migration**: Organisation info-page create/update/delete operations will be handled in a separate spec
- **Info-page reading**: Already migrated to Builder.io - this spec focuses on write operations only

## Assumptions

1. Builder.io `info-page` model is already configured with all required fields (verified - data is migrated)
2. Builder.io `affiliations` model is already configured and data is migrated from Wix
3. Builder.io Private API key is available in environment as `BUILDER_PRIVATE_API_KEY`
4. User authentication and `useAuth` hook provide user details including user tag ID
5. Tag migration is complete and all tags exist in Builder.io with correct IDs
6. Existing `transformBuilderInfoPageToWixFormat` function correctly transforms data for reading
7. The reference field wrapper key pattern from `builderInfoPageUtils.ts` is the correct format for writes
8. Cache invalidation utility `invalidateProjectPageCache` is already implemented
9. Existing `updateBuilderTag` utility and `/api/builder/tag/[id]` route work correctly for tag updates
10. Existing `fetchAffiliationsWithRefs` and related read utilities work correctly for affiliations
