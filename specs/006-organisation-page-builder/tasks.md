# Tasks: Organisation-Page Creation Migration from Wix to Builder.io

**Input**: Design documents from `/specs/006-organisation-page-builder/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Tests are OPTIONAL - Manual validation specified in plan.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

**Note**: This migration reuses 70%+ of code from 005-project-page-builder. No new API routes needed.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- **Next.js App Router**: `app/api/`, `app/utils/`, `app/page-components/`
- Based on existing project structure in plan.md

---

## Phase 1: Setup (Verify Prerequisites)

**Purpose**: Verify environment and existing code from 005-project-page-builder is available

- [ ] T001 Verify `BUILDER_PRIVATE_API_KEY` is set in `.env.local`
- [ ] T002 [P] Verify existing `/api/builder/info-page/route.ts` works (created in 005)
- [ ] T003 [P] Verify existing `/api/builder/info-page/[id]/route.ts` works (created in 005)
- [ ] T004 [P] Verify existing `/api/builder/affiliations/*` routes work (created in 005)
- [ ] T005 [P] Verify `bulkCreateAffiliations` exists in `app/utils/builderAffiliationUtils.ts`
- [ ] T006 [P] Verify `bulkDeleteAffiliations` exists in `app/utils/builderAffiliationUtils.ts`
- [ ] T007 [P] Verify `updateTag` function exists in `app/custom-hooks/AuthContext/AuthContext.tsx`
- [ ] T008 Review `transformProjectDataForBuilder` in `app/utils/builderInfoPageUtils.ts` as pattern for organisation

**Checkpoint**: All prerequisites verified - utility functions can be implemented

---

## Phase 2: User Story 1 - Create New Organisation Page (Priority: P1) 🎯 MVP

**Goal**: A logged-in user can create a new organisation page that saves to Builder.io instead of Wix

**Independent Test**: Navigate to `/organisation-page/New_Organisation`, fill in fields, click Publish, verify page created in Builder.io

### Utility Functions for US1

- [ ] T009 [US1] Add `transformOrganisationDataForBuilder` function in `app/utils/builderInfoPageUtils.ts`:

  - Transform component state to Builder.io format
  - Handle all 11 reference fields with correct wrapper keys (see Reference Field Mapping in spec)
  - Handle `organisationEstablishedDate`, `linkedinLink`, `websiteLink`
  - Handle all 10 content sections (`postContentRIch1-10`) and images (`postImage1-10`)
  - Handle `mediaFiles` array
  - Pattern: Follow `transformProjectDataForBuilder` from same file

- [ ] T010 [US1] Add `createBuilderOrganisationPage` function in `app/utils/builderInfoPageUtils.ts`:
  - Accept `organisationData`, `contentText`, `contentImages` parameters
  - Call `transformOrganisationDataForBuilder` to build payload
  - POST to `/api/builder/info-page`
  - Return created page data with ID and slug

### Component Integration for US1

- [ ] T011 [US1] Replace `createNewOrganisationPage` function in `app/page-components/OrganisationPageComponent/OrganisationPageComponent.tsx`:

  - Generate unique slug using `sanitizeTitleForSlug(organisationTag.name) + "-" + generateUniqueHash()`
  - Call `createBuilderOrganisationPage` instead of Wix `insertDataItem`
  - Remove all Wix `replaceDataItemReferences` calls
  - Update organisation tag's `tagPageLink` via `/api/builder/tag/[id]`
  - Call `bulkCreateAffiliations` for project affiliations (`extraIdentifier: "projectOrganisationRole"`)
  - Call `bulkCreateAffiliations` for people affiliations (`extraIdentifier: "current"`)
  - Call `invalidateOrganisationPageCache(slug)`
  - Call `handleUserDataRefresh()`
  - Redirect to `/organisation/{slug}`

- [ ] T012 [US1] Remove Wix imports from `app/page-components/OrganisationPageComponent/OrganisationPageComponent.tsx`:

  - Remove `useWixModules` import
  - Remove `items` import from `@wix/data`
  - Remove `insertDataItem` destructuring

- [ ] T013 [US1] Add Builder.io imports to `app/page-components/OrganisationPageComponent/OrganisationPageComponent.tsx`:
  - Import `createBuilderOrganisationPage` from `@app/utils/builderInfoPageUtils`
  - Import `bulkCreateAffiliations`, `bulkDeleteAffiliations` from `@app/utils/builderAffiliationUtils`

**Checkpoint**: New organisation page creation works with Builder.io - can be tested independently

---

## Phase 3: User Story 2 - Edit Existing Organisation Page (Priority: P1)

**Goal**: A user who owns an organisation page can edit and save changes to Builder.io

**Independent Test**: Open existing organisation page, click Edit, modify fields, click Save, verify changes in Builder.io

### Utility Functions for US2

- [ ] T014 [US2] Add `updateBuilderOrganisationPage` function in `app/utils/builderInfoPageUtils.ts`:
  - Accept `pageId`, `organisationData`, `contentText`, `contentImages` parameters
  - Call `transformOrganisationDataForBuilder` to build payload
  - PUT to `/api/builder/info-page/${pageId}`
  - Return updated page data

### Component Integration for US2

- [ ] T015 [US2] Replace `updateDataToServer` function in `app/page-components/OrganisationPageComponent/OrganisationPageComponent.tsx`:

  - Remove Wix `updateDataItem` call for info-page
  - Remove all Wix `replaceDataItemReferences` calls
  - Call `updateBuilderOrganisationPage` instead
  - Handle project affiliation updates (delete old with `bulkDeleteAffiliations`, create new with `bulkCreateAffiliations`)
  - Handle people affiliation updates (same pattern)
  - Call `invalidateOrganisationPageCache(slug)`

- [ ] T016 [US2] Remove remaining Wix imports from `app/page-components/OrganisationPageComponent/OrganisationPageComponent.tsx`:
  - Remove `updateDataItem` import from `@app/wixUtils/client-side`
  - Remove `replaceDataItemReferences` import
  - Remove `bulkInsertItems` import
  - Remove `bulkRemoveItems` import
  - Remove `revalidateDataItem` import (if present)

**Checkpoint**: Edit organisation page works with Builder.io - can be tested independently

---

## Phase 4: User Story 3 - Organisation Tag Update (Priority: P1)

**Goal**: When organisation name changes, the associated tag is updated in Builder.io

**Independent Test**: Edit organisation name, save, verify tag's name and tagPageLink updated in Builder.io

### Implementation for US3

- [ ] T017 [US3] Add organisation tag update logic to `createNewOrganisationPage`:

  - After page creation, update organisation tag's `tagPageLink` via `/api/builder/tag/[id]`
  - Verify tag update uses existing tag API route

- [ ] T018 [US3] Update tag update logic in `updateDataToServer` in `app/page-components/OrganisationPageComponent/OrganisationPageComponent.tsx`:
  - Replace Wix `updateDataItem("Tags", ...)` with fetch to `/api/builder/tag/[id]`
  - Call `updateTag()` from AuthContext after successful tag update
  - Preserve other tag properties (picture, tagLine) when updating name

**Checkpoint**: Tag updates work with Builder.io - bidirectional link maintained

---

## Phase 5: User Story 4 - Affiliation Management (Priority: P1)

**Goal**: Project and people affiliations create/delete correctly in Builder.io

**Independent Test**: Add project to organisation with role, save, verify affiliation created in Builder.io with `extraIdentifier: "projectOrganisationRole"`

### Component Integration for US4

- [ ] T019 [US4] Update project affiliation handling in `updateDataToServer`:

  - Get old project affiliations from `organisation.affiliationsItems` with `extraIdentifier: "projectOrganisationRole"`
  - Delete old affiliations using `bulkDeleteAffiliations`
  - Create new affiliations using `bulkCreateAffiliations` with fields:
    - `organisationTag`: organisation tag reference
    - `projectTag`: project tag reference
    - `role`: role string
    - `extraIdentifier`: `"projectOrganisationRole"`
    - `title`: `"{organisationName} -to- {projectName}"`

- [ ] T020 [US4] Update people affiliation handling in `updateDataToServer`:

  - Get old people affiliations from `organisation.affiliationsItems` with `extraIdentifier: "current"`
  - Delete old affiliations using `bulkDeleteAffiliations`
  - Create new affiliations using `bulkCreateAffiliations` with fields:
    - `organisationTag`: organisation tag reference
    - `personTag`: person tag reference
    - `role`: role string
    - `extraIdentifier`: `"current"`
    - `title`: `"{organisationName} -to- {personName}"`

- [ ] T021 [US4] Update affiliation handling in `createNewOrganisationPage`:
  - Call `bulkCreateAffiliations` for projects with `extraIdentifier: "projectOrganisationRole"`
  - Call `bulkCreateAffiliations` for people with `extraIdentifier: "current"`
  - Note: No delete needed for create - only create new affiliations

**Checkpoint**: Affiliations work with Builder.io - replace pattern (delete old, create new) functional

---

## Phase 6: User Stories 5 & 6 - Metadata Fields (Priority: P2)

**Goal**: Organisation metadata and media files save correctly to Builder.io

**Independent Test**: Set dates/links/media on organisation page, save, verify fields in Builder.io

### Implementation (Covered in transform function)

- [ ] T022 [US5] Verify `transformOrganisationDataForBuilder` handles `organisationEstablishedDate`
- [ ] T023 [US5] Verify `transformOrganisationDataForBuilder` handles `organisationType` reference with `organisationTypeItem` wrapper
- [ ] T024 [US5] Verify `transformOrganisationDataForBuilder` handles `organisationHasMember` reference with `organisationHasMemberItem` wrapper
- [ ] T025 [US5] Verify `transformOrganisationDataForBuilder` handles `organisationMemberOf` reference with `organisationMemberOfItem` wrapper
- [ ] T026 [US5] Verify `transformOrganisationDataForBuilder` handles `activity` reference with `activityItem` wrapper
- [ ] T027 [US5] Verify `transformOrganisationDataForBuilder` handles `linkedinLink` and `websiteLink`
- [ ] T028 [US6] Verify `transformOrganisationDataForBuilder` handles `mediaFiles` array with url, displayName, thumbnail

**Checkpoint**: All metadata fields save correctly

---

## Phase 7: Cache Optimization & Cleanup

**Purpose**: Apply learnings from 005-project-page-builder to prevent cache issues

### Critical Fixes (from 005 learnings)

- [ ] T029 Remove `handleTagCreated()` call on component mount in `app/page-components/OrganisationPageComponent/OrganisationPageComponent.tsx`:

  - Delete the useEffect that calls `handleTagCreated()` when `isNewPage` is true (around line 987-989)
  - This prevents full Redis cache invalidation on page load

- [ ] T030 Add `updateTag` to useAuth destructuring in `app/page-components/OrganisationPageComponent/OrganisationPageComponent.tsx`:

  - Add `updateTag` to the destructured values from `useAuth()`

- [ ] T031 Ensure `updateTag()` is called after successful tag update in both:
  - `createNewOrganisationPage` function
  - `updateDataToServer` function

### Cleanup

- [ ] T032 Remove all commented-out Wix code from `app/page-components/OrganisationPageComponent/OrganisationPageComponent.tsx`
- [ ] T033 Verify `refetchTags()`, `refetchInfoPages()`, `refetchAffiliations()` are NOT called during save
- [ ] T034 Add console logging for Builder.io operations (start, success, failure)

**Checkpoint**: Cache optimization applied - no full cache invalidation during save

---

## Phase 8: Polish & Validation

**Purpose**: Final testing and validation

- [ ] T035 Test error handling scenarios:

  - Try to save without organisation tag selected, verify validation error
  - Try to save without country tag, verify validation error
  - Verify partial affiliation failures are reported but don't block page save

- [ ] T036 Verify existing UI behaviors preserved:

  - Edit/Publish buttons visibility based on ownership
  - Discard Changes reverts all modifications
  - "Saving Page..." modal appears during API calls
  - Loading spinners work identically to pre-migration

- [ ] T037 Manual E2E test: Create new organisation page with all fields populated
- [ ] T038 Manual E2E test: Edit existing organisation page, change all field types
- [ ] T039 Manual E2E test: Verify affiliations appear correctly after create/edit
- [ ] T040 Verify no Wix API calls in Network tab during save operations

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - verify prerequisites first
- **US1 (Phase 2)**: Depends on Setup - MVP milestone
- **US2 (Phase 3)**: Depends on US1 utilities
- **US3 (Phase 4)**: Can start after Setup, uses existing tag API
- **US4 (Phase 5)**: Depends on US1 and US2 being complete
- **US5/US6 (Phase 6)**: Verification only, depends on US1 transform function
- **Cache Optimization (Phase 7)**: Should be done alongside US1/US2
- **Polish (Phase 8)**: Depends on all phases complete

### User Story Dependencies

```
Setup (Phase 1)
       ↓
   ┌───┴───┐
   ↓       ↓
  US1     US3 (Tag - uses existing API)
   │
   ↓
  US2 (shares utilities with US1)
   │
   ↓
  US4 (affiliations for both create/update)
   │
   ↓
US5/US6 (verification)
   │
   ↓
Cache Optimization
   │
   ↓
 Polish
```

### Parallel Opportunities

- **Phase 1**: T002-T008 can run in parallel (verification tasks)
- **Phase 2**: T009-T010 (utilities) can run in parallel with each other
- **Phase 6**: T022-T028 can run in parallel (all verification tasks)

---

## Implementation Strategy

### MVP First (US1 - Create New Organisation Page)

1. Complete Phase 1: Setup (verify prerequisites) - ~10 min
2. Complete Phase 2: US1 - Create new organisation page - ~30 min
3. **STOP and VALIDATE**: Test creating a new organisation page
4. If working → MVP achieved, can proceed

### Incremental Delivery

1. Setup → Foundation verified
2. Add US1 (Create) → Test → First milestone
3. Add US2 (Edit) → Test → Full CRUD
4. Add US3/US4 (Tag/Affiliations) → Test → Complete functionality
5. Verify US5/US6 (Metadata) → Test → All fields working
6. Cache Optimization → Apply learnings from 005
7. Polish → Production ready

### Single Developer Strategy (Recommended)

Execute in strict order:

1. T001-T008 (Setup verification)
2. T009-T013 (US1 - Create)
3. T014-T016 (US2 - Edit)
4. T017-T021 (US3/US4 - Tag/Affiliations)
5. T022-T028 (US5/US6 - Verification)
6. T029-T034 (Cache Optimization)
7. T035-T040 (Polish)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- US1 is the MVP - fully functional create flow
- US2 builds on US1 utilities
- US3/US4 are integrated into US1/US2 but tracked separately
- US5/US6 are already handled by transform function, just need verification
- Total estimated tasks: 40
- Parallel opportunities: 16 tasks can run in parallel within their phases
- **Estimated total time: ~1.75 hours** (70% faster than 005 due to code reuse)

---

## Reference: Key Differences from Project-Page (005)

| Aspect                 | Project-Page (005)                   | Organisation-Page (006)                           |
| ---------------------- | ------------------------------------ | ------------------------------------------------- |
| Main tag field         | `projectTag` → `project`             | `organisationTag` → `organisation`                |
| Affiliation types      | `coordination`, `participation`      | `projectOrganisationRole`, `current`              |
| Affiliation references | `projectTag` + `personTag`           | `organisationTag` + `projectTag`/`personTag`      |
| Extra fields           | `projectStartDate`, `projectEndDate` | `organisationEstablishedDate`, `organisationType` |
| Member relationships   | N/A                                  | `organisationHasMember`, `organisationMemberOf`   |
| Activity field         | N/A                                  | `activity` (reference array)                      |
