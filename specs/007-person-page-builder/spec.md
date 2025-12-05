# Feature Specification: Person-Page Creation Migration from Wix to Builder.io

**Feature Branch**: `007-person-page-builder`  
**Created**: 2025-12-05  
**Status**: Draft  
**Input**: User description: "Migrate person-page creation and update from Wix to Builder.io, following the same pattern as project-page and organisation-page. All CRUD operations should use Builder.io except that when updating the person name, we must also update the Wix contact nickname in addition to updating the tag in Builder.io."

## Reference Implementation

This migration follows the exact pattern established in **005-project-page-builder** and **006-organisation-page-builder**. Key learnings and optimizations from those implementations:

1. **API Routes**: Reuse existing `/api/builder/info-page` routes (same model)
2. **Affiliation Utilities**: Reuse existing `bulkCreateAffiliations` and `bulkDeleteAffiliations` functions
3. **Cache Optimization**: Do NOT call `handleTagCreated()` on component mount (causes full cache invalidation)
4. **Tag Updates**: Use `updateTag()` function in AuthContext to update React state after tag changes
5. **Reference Format**: All reference fields use wrapper keys (e.g., `{personItem: {...}}`)

## Unique Requirement: Wix Contact Nickname Sync

**CRITICAL DIFFERENCE from project/organisation pages**: When updating the person tag name (person's display name), the system MUST:
1. Update the tag in Builder.io (same as project/organisation)
2. **ALSO** update the Wix contact nickname via `updateMember()` (Wix-specific, MUST BE RETAINED)

This dual-update is required because the person tag name is synced with the Wix member nickname for authentication and display purposes.

## User Scenarios & Testing _(mandatory)_

### User Story 1 - User Creates New Person Page (Priority: P1)

A logged-in user navigates to the "New Person" page and creates their personal info page by filling in their profile information (description, affiliations, methods, domains), then saving it to Builder.io.

**Why this priority**: This is the core functionality that enables person page creation on the Builder.io platform. Without it, users cannot create their personal pages and the migration cannot be considered complete.

**Independent Test**: Can be fully tested by logging in as a user without a person page, navigating to `/person-page/New_Person`, filling in profile fields, clicking "Publish", and verifying the new person page appears in Builder.io with all fields correctly saved and the user is redirected to their new person page.

**Acceptance Scenarios**:

1. **Given** a logged-in user navigates to `/person-page/New_Person`, **When** they fill in their profile information and click "Publish", **Then** a new person info-page is created in Builder.io with a unique slug, all fields are saved correctly, and the user is redirected to their new person page
2. **Given** a user is creating a new person page, **When** they add current and former affiliations with roles, **Then** affiliation records are created in Builder.io with correct `extraIdentifier` values ("current" or "former")
3. **Given** a user is creating a new person page, **When** they add project coordination and participation tags, **Then** affiliation records are created in Builder.io with correct `extraIdentifier` values ("coordination" or "participation")
4. **Given** a user is the page owner, **When** they create a new person page, **Then** their user tag is automatically set as the author, pageOwner, and person reference in Builder.io
5. **Given** a user creates a new person page, **When** the page is created, **Then** the associated person tag is updated in Builder.io with the new `tagPageLink` pointing to the new page

---

### User Story 2 - User Edits Existing Person Page (Priority: P1)

A user who owns a person page can edit any field (description, affiliations, links, methods, domains) and save changes to Builder.io.

**Why this priority**: Editing is equally critical to creation - users need to update their profile, fix errors, and maintain their person pages over time.

**Independent Test**: Can be fully tested by opening an existing person page owned by the user, clicking "Edit", modifying multiple fields including description, affiliations, and links, clicking "Save & publish changes", and verifying all changes are persisted in Builder.io and visible immediately.

**Acceptance Scenarios**:

1. **Given** a user owns a person page, **When** they click "Edit", modify their description and affiliations, then click "Save & publish changes", **Then** the changes are saved to Builder.io and the updated page is displayed
2. **Given** a user is editing a person page, **When** they modify their current or former affiliations, **Then** old affiliation records are deleted and new ones created in Builder.io
3. **Given** a user is editing a person page, **When** they add or remove tags (methods, domains, activity), **Then** all reference field changes are sent to Builder.io
4. **Given** a user is editing a person page, **When** they click "Discard Changes", **Then** all modifications are reverted to the last saved state and edit mode is exited without saving
5. **Given** a user is editing a person page, **When** changes are being saved, **Then** a "Saving Page..." modal is displayed to prevent duplicate submissions

---

### User Story 3 - Person Tag Update with Wix Nickname Sync (Priority: P1)

When a user updates their person page and changes their name (person tag), the system updates the tag in Builder.io AND syncs the nickname to Wix.

**Why this priority**: This is the unique requirement for person pages - the person's name must be synced to Wix for authentication and member display purposes. This MUST NOT be removed.

**Independent Test**: Can be tested by editing a person page, changing the person tag name, saving, and verifying: (1) the tag is updated in Builder.io with the new name, (2) the Wix member nickname is updated via `updateMember()`, and (3) the local user state reflects the change.

**Acceptance Scenarios**:

1. **Given** a user is editing their person page, **When** they change their person tag name, **Then** the tag is updated in Builder.io with the new name
2. **Given** a user is editing their person page, **When** they change their person tag name, **Then** the Wix member nickname is updated via `updateMember(contactId, newName)`
3. **Given** a user is editing their person page, **When** they change their person tag name, **Then** `updateUserDetails()` is called to update local React state with the new name
4. **Given** a tag update succeeds, **When** the operation completes, **Then** the AuthContext `updateTag()` is called to update React state (NOT `handleTagCreated`)

---

### User Story 4 - Affiliation Management During Page Save (Priority: P1)

When a user adds or removes affiliations (current/former organisations, project coordination/participation) on a person page, the system creates or deletes the corresponding affiliation records in Builder.io.

**Why this priority**: Affiliations define the person's relationships with organisations and projects. These relationships must be correctly managed in Builder.io.

**Independent Test**: Can be tested by editing a person page, adding a current affiliation with a role, saving, and verifying a new affiliation record is created in Builder.io with `extraIdentifier: "current"`. Then remove the affiliation, save, and verify the affiliation is deleted.

**Acceptance Scenarios**:

1. **Given** a user is editing a person page, **When** they add a current affiliation with a role, **Then** a new affiliation is created in Builder.io with `personTag`, `organisationTag`, `role`, `extraIdentifier: "current"`, and appropriate title
2. **Given** a user is editing a person page, **When** they add a former affiliation with a role, **Then** a new affiliation is created in Builder.io with `personTag`, `organisationTag`, `role`, `extraIdentifier: "former"`, and appropriate title
3. **Given** a user is editing a person page, **When** they add a project to coordination, **Then** a new affiliation is created in Builder.io with `personTag`, `projectTag`, `extraIdentifier: "coordination"`, and appropriate title
4. **Given** a user is editing a person page, **When** they add a project to participation, **Then** a new affiliation is created in Builder.io with `personTag`, `projectTag`, `extraIdentifier: "participation"`, and appropriate title
5. **Given** a user is editing a person page, **When** they remove an affiliation, **Then** the corresponding affiliation record is deleted from Builder.io
6. **Given** affiliations are modified, **When** the operation completes, **Then** the affiliations cache and React state are updated (not fully invalidated)

---

### User Story 5 - Person Metadata Management (Priority: P2)

A user can set and edit person-specific fields like country, methods, domains, activity, and external links.

**Why this priority**: These are important metadata fields for person pages but not critical for basic functionality.

**Independent Test**: Can be tested by creating/editing a person page, setting metadata fields, saving, and verifying these fields are correctly stored in Builder.io.

**Acceptance Scenarios**:

1. **Given** a user is editing a person page, **When** they set their country tag, **Then** this reference is saved to Builder.io
2. **Given** a user is editing a person page, **When** they select foresight methods tags, **Then** these references are saved to Builder.io
3. **Given** a user is editing a person page, **When** they select domain tags, **Then** these references are saved to Builder.io
4. **Given** a user is editing a person page, **When** they select activity tags, **Then** these references are saved to Builder.io
5. **Given** a user is editing a person page, **When** they add linkedinLink, websiteLink, researchGateLink, or orcidLink, **Then** these URLs are saved to Builder.io

---

### User Story 6 - Media Files Management (Priority: P2)

A user can upload and manage media files attached to their person page.

**Why this priority**: File attachments enhance person pages but are not required for basic functionality.

**Independent Test**: Can be tested by adding media files to a person page, saving, and verifying the files are correctly referenced in Builder.io.

**Acceptance Scenarios**:

1. **Given** a user is editing a person page, **When** they add media files, **Then** the mediaFiles array is saved to Builder.io with url, displayName, and thumbnail properties
2. **Given** a user is editing a person page, **When** they remove or modify media files, **Then** the changes are reflected in Builder.io

---

### Edge Cases

- **Missing person tag**: When a user tries to save without a person tag, the system should use the user's existing tag
- **Missing country tag**: When a user tries to save without a country tag (required field), validation error is shown
- **User not logged in**: When a non-authenticated user tries to access `/person-page/New_Person`, they should be redirected to login
- **Non-owner accessing page**: When a user who doesn't own a person page views the page, it renders in read-only mode
- **Network failure during save**: When the Builder.io API call fails, an error message is displayed, data remains in edit state
- **Wix nickname update failure**: When the Wix `updateMember` call fails, log warning but don't fail the page save (page data is more important)
- **Duplicate slug generation**: When a generated slug already exists, the system appends a unique hash
- **Tag update failure**: When the person tag update fails after page save, user is notified but page is still saved
- **Cache update failure**: System logs warning but does not fail the operation
- **Partial affiliation update**: When some affiliations succeed and others fail, report which failed and continue

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST replace Wix `insertDataItem` API call in `createNewPersonPage` function with Builder.io Write API call using existing `/api/builder/info-page` route
- **FR-002**: System MUST replace Wix `updateDataItem` API call in `updateDataToServer` function with Builder.io Update API call using existing `/api/builder/info-page/[id]` route
- **FR-003**: System MUST replace Wix `replaceDataItemReferences` API calls with Builder.io Reference field updates in the transform function
- **FR-004**: System MUST generate unique slug using `sanitizeTitleForSlug(personTag.name)` + unique hash with `/person/` prefix
- **FR-005**: System MUST set `author`, `pageOwner`, and `person` reference fields to the logged-in user's tag ID when creating new person pages
- **FR-006**: System MUST validate required fields (country tag) before allowing save/publish
- **FR-007**: System MUST display "Saving Page..." modal during API calls
- **FR-008**: System MUST redirect user to `/person/{slug}` after successful new page creation
- **FR-009**: System MUST call `invalidatePersonPageCache(slug)` after successful Builder.io save
- **FR-010**: System MUST handle all reference fields with correct wrapper keys
- **FR-011**: System MUST preserve all existing UI/UX behavior (edit/publish buttons, discard changes, validation states)
- **FR-012**: System MUST update person tag's `tagPageLink` when creating new page
- **FR-013**: System MUST update person tag's `name` when changed during edit using `/api/builder/tag/[id]` route
- **FR-014**: System MUST call `updateTag()` from AuthContext after successful tag update (NOT `handleTagCreated`)
- **FR-015**: System MUST NOT call `handleTagCreated()` on component mount (remove the useEffect that does this)
- **FR-016**: System MUST call `handleUserDataRefresh` and `handleUserTagRefresh` after creating/updating page
- **FR-017**: System MUST log save operations to browser console

### Wix Nickname Sync Requirements (MUST RETAIN)

- **FR-018**: System MUST call `updateMember(contactId, newName)` when person tag name changes to sync Wix nickname
- **FR-019**: System MUST call `updateUserDetails()` to update local React state with new name after nickname change
- **FR-020**: System MUST NOT remove or bypass the Wix `updateMember` call - this is required for authentication sync

### Affiliation Requirements

- **FR-021**: System MUST replace Wix `bulkInsertItems("Affiliations", ...)` with existing `bulkCreateAffiliations` function
- **FR-022**: System MUST replace Wix `bulkRemoveItems("Affiliations", ...)` with existing `bulkDeleteAffiliations` function
- **FR-023**: System MUST create current affiliations with fields: `personTag`, `organisationTag`, `role`, `extraIdentifier: "current"`, `title`
- **FR-024**: System MUST create former affiliations with fields: `personTag`, `organisationTag`, `role`, `extraIdentifier: "former"`, `title`
- **FR-025**: System MUST create coordination affiliations with fields: `personTag`, `projectTag`, `extraIdentifier: "coordination"`, `title`
- **FR-026**: System MUST create participation affiliations with fields: `personTag`, `projectTag`, `extraIdentifier: "participation"`, `title`
- **FR-027**: System MUST delete old affiliations before creating new ones when affiliations change
- **FR-028**: System MUST call `appendAffiliations()` and `removeAffiliations()` to update React state after affiliation changes
- **FR-029**: System MUST NOT fully invalidate affiliations cache - use cache update functions

### Reference Field Mapping

The following mappings from `builderInfoPageUtils.ts` MUST be followed:

| Component Field  | Builder.io Field | Wrapper Key     |
| ---------------- | ---------------- | --------------- |
| personTag        | person           | personItem      |
| pageOwner        | pageOwner        | pageOwnerItem   |
| author           | author           | authorItem      |
| pageType         | pageTypes        | pageTypeItem    |
| countryTag       | countryTag       | countryTagItem  |
| methods          | methods          | methodsItem     |
| domains          | domains          | domainsItem     |
| activity         | activity         | activityItem    |

### Key Entities

- **Person Info-Page**: Core content entity stored in Builder.io `info-page` model with title, description, slug, metadata, and reference fields
- **Person Tag**: Tag of type "person" with bidirectional relationship via `tagPageLink` and `person` reference
- **Affiliation**: Relationship record in Builder.io `affiliations` model linking person to organisations (`current`/`former`) or projects (`coordination`/`participation`)
- **Reference Field**: Link to other Builder.io content stored with wrapper keys

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: User can create a new person page within 3 seconds of clicking publish
- **SC-002**: User can edit an existing person page and see changes within 2 seconds
- **SC-003**: System creates new person info-page in Builder.io using the `info-page` model
- **SC-004**: Person tag's `tagPageLink` is correctly updated when creating a page
- **SC-005**: Only page owners can see edit buttons; non-owners see read-only view
- **SC-006**: Validation errors prevent saving and display clear messages
- **SC-007**: Cache invalidation occurs within 5 seconds of save
- **SC-008**: All existing UI behaviors work identically to pre-migration state
- **SC-009**: 100% of reference fields are correctly saved and retrievable
- **SC-010**: No `handleTagCreated()` call on mount - no full cache invalidation during page load
- **SC-011**: `updateTag()` is called after tag updates - React state reflects changes immediately
- **SC-012**: Affiliations for organisations (current/former) and projects (coordination/participation) are correctly created/deleted in Builder.io
- **SC-013**: When person tag name changes, Wix member nickname is also updated via `updateMember()`
- **SC-014**: All Wix API calls for page data are removed EXCEPT `updateMember()` for nickname sync
- **SC-015**: `appendAffiliations()` and `removeAffiliations()` are called after affiliation changes

## Code to Reuse from 005/006

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
| `appendAffiliations` in AuthContext   | `AuthContext.tsx`                      | 100%        |
| `removeAffiliations` in AuthContext   | `AuthContext.tsx`                      | 100%        |
| Tag update API route                  | `/api/builder/tag/[id]/route.ts`       | 100%        |

## New Code Required

| Component                       | Purpose                                    |
| ------------------------------- | ------------------------------------------ |
| `transformPersonDataForBuilder` | Convert component state to Builder.io format |
| `createBuilderPersonPage`       | Create new person info-page                |
| `updateBuilderPersonPage`       | Update existing person info-page           |
| Modified `PersonPageComponent`  | Replace Wix calls with Builder.io calls    |

## Out of Scope

- **Organisation-page migration**: Completed in 006
- **Project-page migration**: Completed in 005
- **Info-page reading**: Already migrated to Builder.io
- **New API routes**: Reuse existing routes from 005/006
- **Removing Wix `updateMember()`**: This MUST BE RETAINED for nickname sync

## Assumptions

1. Builder.io `info-page` model is already configured with all required fields
2. Builder.io `affiliations` model is configured and data is migrated
3. Builder.io Private API key is available as `BUILDER_PRIVATE_API_KEY`
4. All existing utilities from 005/006 are available (branches merged or in same branch)
5. Tag migration is complete - all tags exist in Builder.io
6. `updateTag`, `appendAffiliations`, `removeAffiliations` functions exist in AuthContext
7. Existing cache invalidation utility `invalidatePersonPageCache` is implemented
8. Wix SDK is available for `updateMember()` calls - must NOT be removed
