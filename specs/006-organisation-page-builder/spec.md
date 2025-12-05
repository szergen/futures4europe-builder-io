# Feature Specification: Organisation-Page Creation Migration from Wix to Builder.io

**Feature Branch**: `006-organisation-page-builder`  
**Created**: 2025-12-05  
**Status**: Draft  
**Input**: User description: "Following the exact way as we did for the migration from wix to builder for the project-page in branch 005-project-page-builder let's migrate the creating and editing of the organisation-page."

## Reference Implementation

This migration follows the exact pattern established in **005-project-page-builder**. Key learnings and optimizations from that implementation:

1. **API Routes**: Reuse existing `/api/builder/info-page` routes (same model)
2. **Affiliation Utilities**: Reuse existing `bulkCreateAffiliations` and `bulkDeleteAffiliations` functions
3. **Cache Optimization**: Do NOT call `handleTagCreated()` on component mount (causes full cache invalidation)
4. **Tag Updates**: Use `updateTag()` function in AuthContext to update React state after tag changes
5. **Reference Format**: All reference fields use wrapper keys (e.g., `{organisationItem: {...}}`)

## User Scenarios & Testing _(mandatory)_

### User Story 1 - User Creates New Organisation Page (Priority: P1)

A logged-in user navigates to the "New Organisation" page and creates a new organisation info page by providing an organisation tag (name), description, content, and related tags, then saving it to Builder.io.

**Why this priority**: This is the core functionality that enables organisation page creation on the Builder.io platform. Without it, users cannot create any new organisation pages and the migration cannot be considered complete.

**Independent Test**: Can be fully tested by logging in as a user, navigating to `/organisation-page/New_Organisation`, selecting or creating an organisation tag, filling in description and content fields, clicking "Publish", and verifying the new organisation page appears in Builder.io with all fields correctly saved and the user is redirected to the new organisation page.

**Acceptance Scenarios**:

1. **Given** a logged-in user navigates to `/organisation-page/New_Organisation`, **When** they select/create an organisation tag, fill in content fields, and click "Publish", **Then** a new organisation info-page is created in Builder.io with a unique slug, all fields are saved correctly, and the user is redirected to the new organisation page
2. **Given** a user is creating a new organisation page, **When** they add multiple content sections with rich text and images, **Then** all 10 content sections (postContentRIch1-10) and images (postImage1-10) are saved correctly in Builder.io
3. **Given** a user is creating a new organisation page, **When** they add tags for methods, domains, organisation type, member organisations, **Then** all references are created in Builder.io with correct Reference format
4. **Given** a user is the page owner, **When** they create a new organisation page, **Then** their user tag is automatically set as the author and pageOwner in Builder.io, and the organisation reference is set correctly
5. **Given** a user creates a new organisation page, **When** they set the organisation tag name (title), **Then** the associated organisation tag is updated in Builder.io with the new `tagPageLink` pointing to the new page

---

### User Story 2 - User Edits Existing Organisation Page (Priority: P1)

A user who owns an organisation page can edit any field (organisation name, description, content, tags, links) and save changes to Builder.io.

**Why this priority**: Editing is equally critical to creation - users need to update content, fix errors, and maintain their organisation pages over time.

**Independent Test**: Can be fully tested by opening an existing organisation page owned by the user, clicking "Edit", modifying multiple fields including organisation name, content, methods, and established date, clicking "Save & publish changes", and verifying all changes are persisted in Builder.io and visible immediately.

**Acceptance Scenarios**:

1. **Given** a user owns an organisation page, **When** they click "Edit", modify the organisation name and description, then click "Save & publish changes", **Then** the changes are saved to Builder.io and the updated page is displayed
2. **Given** a user is editing an organisation page, **When** they modify the organisation tag name, **Then** the associated tag is updated in Builder.io with the new name and the React state is updated via `updateTag()`
3. **Given** a user is editing an organisation page, **When** they add or remove tags (methods, domains, organisation type, members), **Then** all reference field changes are sent to Builder.io
4. **Given** a user is editing an organisation page, **When** they click "Discard Changes", **Then** all modifications are reverted to the last saved state and edit mode is exited without saving
5. **Given** a user is editing an organisation page, **When** changes are being saved, **Then** a "Saving Page..." modal is displayed to prevent duplicate submissions

---

### User Story 3 - Organisation Tag Creation/Update During Page Save (Priority: P1)

When a user creates or updates an organisation page with a new or modified organisation tag name, the system creates or updates the tag in Builder.io and links it to the page.

**Why this priority**: Organisation pages have a unique relationship with their organisation tag - the tag's `tagPageLink` must point to the page and the tag name updates when the organisation name changes.

**Independent Test**: Can be tested by creating a new organisation page with a new organisation tag, verifying the tag exists in Builder.io with the correct `tagPageLink`. Then edit the organisation name, verify the tag is updated in Builder.io.

**Acceptance Scenarios**:

1. **Given** a user creates a new organisation page, **When** they select an existing organisation tag, **Then** the tag's `tagPageLink` is updated in Builder.io to point to the new page URL
2. **Given** a user is editing an organisation page, **When** they change the organisation tag name, **Then** the tag is updated in Builder.io with the new name while preserving other tag properties
3. **Given** a tag update succeeds, **When** the operation completes, **Then** the AuthContext `updateTag()` is called to update React state (NOT `handleTagCreated`)

---

### User Story 4 - Affiliation Management During Page Save (Priority: P1)

When a user adds or removes projects or people affiliations on an organisation page, the system creates or deletes the corresponding affiliation records in Builder.io.

**Why this priority**: Affiliations define which projects the organisation is involved in and which people are affiliated with it. These relationships must be correctly managed in Builder.io.

**Independent Test**: Can be tested by editing an organisation page, adding a project with a role, saving, and verifying a new affiliation record is created in Builder.io with `extraIdentifier: "projectOrganisationRole"`. Then remove the project, save, and verify the affiliation is deleted.

**Acceptance Scenarios**:

1. **Given** a user is editing an organisation page, **When** they add a project with a role, **Then** a new affiliation is created in Builder.io with `organisationTag`, `projectTag`, `role`, `extraIdentifier: "projectOrganisationRole"`, and appropriate title
2. **Given** a user is editing an organisation page, **When** they add a person (affiliate) with a role, **Then** a new affiliation is created in Builder.io with `organisationTag`, `personTag`, `role`, `extraIdentifier: "current"`, and appropriate title
3. **Given** a user is editing an organisation page, **When** they remove a project or person affiliation, **Then** the corresponding affiliation record is deleted from Builder.io
4. **Given** affiliations are modified, **When** the operation completes, **Then** the affiliations cache is updated (not fully invalidated) to reflect the changes

---

### User Story 5 - Organisation Metadata Management (Priority: P2)

A user can set and edit organisation-specific fields like established date, organisation type, member organisations, and links.

**Why this priority**: These are important metadata fields for organisation pages but not critical for basic functionality.

**Independent Test**: Can be tested by creating/editing an organisation page, setting metadata fields, saving, and verifying these fields are correctly stored in Builder.io.

**Acceptance Scenarios**:

1. **Given** a user is editing an organisation page, **When** they set organisationEstablishedDate, **Then** this date is saved to Builder.io
2. **Given** a user is editing an organisation page, **When** they select organisation type tags, **Then** these references are saved to Builder.io
3. **Given** a user is editing an organisation page, **When** they add member organisations (organisationHasMember), **Then** these references are saved to Builder.io
4. **Given** a user is editing an organisation page, **When** they add member-of organisations (organisationMemberOf), **Then** these references are saved to Builder.io
5. **Given** a user is editing an organisation page, **When** they add linkedinLink and websiteLink, **Then** these URLs are saved to Builder.io

---

### User Story 6 - Media Files Management (Priority: P2)

A user can upload and manage media files attached to the organisation page.

**Why this priority**: File attachments enhance organisation pages but are not required for basic functionality.

**Independent Test**: Can be tested by adding media files to an organisation page, saving, and verifying the files are correctly referenced in Builder.io.

**Acceptance Scenarios**:

1. **Given** a user is editing an organisation page, **When** they add media files, **Then** the mediaFiles array is saved to Builder.io with url, displayName, and thumbnail properties
2. **Given** a user is editing an organisation page, **When** they remove or modify media files, **Then** the changes are reflected in Builder.io

---

### Edge Cases

- **Missing organisation tag**: When a user tries to save without selecting/creating an organisation tag, the system should display a validation error and prevent saving
- **Missing country tag**: When a user tries to save without a country tag (required field), validation error is shown
- **User not logged in**: When a non-authenticated user tries to access `/organisation-page/New_Organisation`, they should be redirected to login
- **Non-owner accessing page**: When a user who doesn't own an organisation page views the page, it renders in read-only mode
- **Network failure during save**: When the Builder.io API call fails, an error message is displayed, data remains in edit state
- **Duplicate slug generation**: When a generated slug already exists, the system appends a unique hash
- **Tag update failure**: When the organisation tag update fails after page save, user is notified but page is still saved
- **Cache update failure**: System logs warning but does not fail the operation
- **Partial affiliation update**: When some affiliations succeed and others fail, report which failed and continue

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST replace Wix `insertDataItem` API call in `createNewOrganisationPage` function with Builder.io Write API call using existing `/api/builder/info-page` route
- **FR-002**: System MUST replace Wix `updateDataItem` API call in `updateDataToServer` function with Builder.io Update API call using existing `/api/builder/info-page/[id]` route
- **FR-003**: System MUST replace Wix `replaceDataItemReferences` API calls with Builder.io Reference field updates in the transform function
- **FR-004**: System MUST generate unique slug using `sanitizeTitleForSlug(organisationTag.name)` + unique hash with `/organisation/` prefix
- **FR-005**: System MUST set `author` and `pageOwner` reference fields to the logged-in user's tag ID when creating new organisation pages
- **FR-006**: System MUST set `organisation` reference field to link the info-page to the organisation tag
- **FR-007**: System MUST validate required fields (organisation tag and country tag) before allowing save/publish
- **FR-008**: System MUST display "Saving Page..." modal during API calls
- **FR-009**: System MUST redirect user to `/organisation/{slug}` after successful new page creation
- **FR-010**: System MUST call `invalidateOrganisationPageCache(slug)` after successful Builder.io save
- **FR-011**: System MUST handle all 10 content sections (postContentRIch1-10) and 10 image sections (postImage1-10)
- **FR-012**: System MUST handle all reference fields with correct wrapper keys
- **FR-013**: System MUST handle organisation-specific fields: organisationEstablishedDate, organisationType, memberOrganisations, memberOfOrganisations, activity
- **FR-014**: System MUST handle mediaFiles, linkedinLink, websiteLink fields
- **FR-015**: System MUST preserve all existing UI/UX behavior (edit/publish buttons, discard changes, validation states)
- **FR-016**: System MUST update organisation tag's `tagPageLink` when creating new page
- **FR-017**: System MUST update organisation tag's `name` when changed during edit using `/api/builder/tag/[id]` route
- **FR-018**: System MUST call `updateTag()` from AuthContext after successful tag update (NOT `handleTagCreated`)
- **FR-019**: System MUST NOT call `handleTagCreated()` on component mount (remove the useEffect that does this)
- **FR-020**: System MUST call `handleUserDataRefresh` after creating new page
- **FR-021**: System MUST log save operations to browser console

### Affiliation Requirements

- **FR-022**: System MUST replace Wix `bulkInsertItems("Affiliations", ...)` with existing `bulkCreateAffiliations` function
- **FR-023**: System MUST replace Wix `bulkRemoveItems("Affiliations", ...)` with existing `bulkDeleteAffiliations` function
- **FR-024**: System MUST create project affiliations with fields: `organisationTag`, `projectTag`, `role`, `extraIdentifier: "projectOrganisationRole"`, `title`
- **FR-025**: System MUST create people affiliations with fields: `organisationTag`, `personTag`, `role`, `extraIdentifier: "current"`, `title`
- **FR-026**: System MUST delete old affiliations before creating new ones when projects/people change
- **FR-027**: System MUST NOT fully invalidate affiliations cache - reuse existing cache update functions

### Reference Field Mapping

The following mappings from `builderInfoPageUtils.ts` MUST be followed:

| Component Field       | Builder.io Field      | Wrapper Key               |
| --------------------- | --------------------- | ------------------------- |
| organisationTag       | organisation          | organisationItem          |
| pageOwner             | pageOwner             | pageOwnerItem             |
| author                | author                | authorItem                |
| pageType              | pageTypes             | pageTypeItem              |
| countryTag            | countryTag            | countryTagItem            |
| methods               | methods               | methodsItem               |
| domains               | domains               | domainsItem               |
| organisationType      | organisationType      | organisationTypeItem      |
| memberOrganisations   | organisationHasMember | organisationHasMemberItem |
| memberOfOrganisations | organisationMemberOf  | organisationMemberOfItem  |
| activity              | activity              | activityItem              |

### Key Entities

- **Organisation Info-Page**: Core content entity stored in Builder.io `info-page` model with title, description, slug, content sections, images, metadata, and reference fields
- **Organisation Tag**: Tag of type "organisation" with bidirectional relationship via `tagPageLink` and `organisation` reference
- **Affiliation**: Relationship record in Builder.io `affiliations` model linking organisation to projects (`projectOrganisationRole`) or people (`current`)
- **Reference Field**: Link to other Builder.io content stored with wrapper keys

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: User can create a new organisation page within 3 seconds of clicking publish
- **SC-002**: User can edit an existing organisation page and see changes within 2 seconds
- **SC-003**: System creates new organisation info-page in Builder.io using the `info-page` model
- **SC-004**: Organisation tag's `tagPageLink` is correctly updated when creating a page
- **SC-005**: Only page owners can see edit buttons; non-owners see read-only view
- **SC-006**: Validation errors prevent saving and display clear messages
- **SC-007**: Cache invalidation occurs within 5 seconds of save
- **SC-008**: All existing UI behaviors work identically to pre-migration state
- **SC-009**: 100% of reference fields are correctly saved and retrievable
- **SC-010**: No `handleTagCreated()` call on mount - no full cache invalidation during page load
- **SC-011**: `updateTag()` is called after tag updates - React state reflects changes immediately
- **SC-012**: Affiliations for projects and people are correctly created/deleted in Builder.io
- **SC-013**: No Wix API calls remain in the organisation page save flow

## Code to Reuse from 005-project-page-builder

| Component                             | Location                               | Reuse Level |
| ------------------------------------- | -------------------------------------- | ----------- |
| Info-page POST route                  | `/api/builder/info-page/route.ts`      | 100%        |
| Info-page PUT route                   | `/api/builder/info-page/[id]/route.ts` | 100%        |
| Affiliations routes                   | `/api/builder/affiliations/*`          | 100%        |
| `bulkCreateAffiliations`              | `builderAffiliationUtils.ts`           | 100%        |
| `bulkDeleteAffiliations`              | `builderAffiliationUtils.ts`           | 100%        |
| `appendToAffiliationsCache`           | `builderAffiliationUtils.ts`           | 100%        |
| `removeFromAffiliationsCache`         | `builderAffiliationUtils.ts`           | 100%        |
| `transformReferencesForBuilderCreate` | `builderPostUtils.ts`                  | 100%        |
| `updateTag` in AuthContext            | `AuthContext.tsx`                      | 100%        |
| Tag update API route                  | `/api/builder/tag/[id]/route.ts`       | 100%        |

## New Code Required

| Component                             | Purpose                                      |
| ------------------------------------- | -------------------------------------------- |
| `transformOrganisationDataForBuilder` | Convert component state to Builder.io format |
| `createBuilderOrganisationPage`       | Create new organisation info-page            |
| `updateBuilderOrganisationPage`       | Update existing organisation info-page       |
| Modified `OrganisationPageComponent`  | Replace Wix calls with Builder.io calls      |

## Out of Scope

- **Person-page migration**: Will be handled in a separate spec
- **Info-page reading**: Already migrated to Builder.io
- **New API routes**: Reuse existing routes from 005

## Assumptions

1. Builder.io `info-page` model is already configured with all required fields
2. Builder.io `affiliations` model is configured and data is migrated
3. Builder.io Private API key is available as `BUILDER_PRIVATE_API_KEY`
4. All existing utilities from 005-project-page-builder are available (branch merged or in same branch)
5. Tag migration is complete - all tags exist in Builder.io
6. `updateTag` function exists in AuthContext
7. Existing cache invalidation utility `invalidateOrganisationPageCache` is implemented
