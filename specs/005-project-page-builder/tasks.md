# Tasks: Project-Page Creation Migration from Wix to Builder.io

**Input**: Design documents from `/specs/005-project-page-builder/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Tests are OPTIONAL - E2E testing specified in plan but not explicitly requested for each task.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- **Next.js App Router**: `app/api/`, `app/utils/`, `app/page-components/`
- Based on existing project structure in plan.md

---

## Phase 1: Setup (Verify Prerequisites)

**Purpose**: Verify environment and existing code before implementation

- [ ] T001 Verify `BUILDER_PRIVATE_API_KEY` is set in `.env.local`
- [ ] T002 [P] Verify existing `/api/builder/post/route.ts` works as reference pattern
- [ ] T003 [P] Verify existing `/api/builder/tag/[id]/route.ts` works for tag updates
- [ ] T004 [P] Review `app/utils/builderPostUtils.ts` for `transformReferencesForBuilderCreate` function to reuse

---

## Phase 2: Foundational (API Infrastructure)

**Purpose**: Create server-side API routes - BLOCKS all user story implementation

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T005 [P] Create info-page POST route in `app/api/builder/info-page/route.ts` (follow post route pattern)
- [ ] T006 [P] Create info-page PUT route in `app/api/builder/info-page/[id]/route.ts`
- [ ] T007 [P] Create affiliations bulk POST route in `app/api/builder/affiliations/route.ts`
- [ ] T008 [P] Create affiliations DELETE route in `app/api/builder/affiliations/[id]/route.ts`
- [ ] T009 [P] Create affiliations bulk DELETE route in `app/api/builder/affiliations/bulk-delete/route.ts`

**Checkpoint**: API routes ready - utility functions can now be implemented

---

## Phase 3: User Story 1 - Create New Project Page (Priority: P1) 🎯 MVP

**Goal**: A logged-in user can create a new project page that saves to Builder.io instead of Wix

**Independent Test**: Navigate to `/project-page/New_Project`, fill in fields, click Publish, verify page created in Builder.io

### Utility Functions for US1

- [ ] T010 [US1] Add `transformProjectDataForBuilder` function in `app/utils/builderInfoPageUtils.ts` - transform component state to Builder.io format with all wrapper keys
- [ ] T011 [US1] Add `createBuilderProjectPage` function in `app/utils/builderInfoPageUtils.ts` - calls POST /api/builder/info-page
- [ ] T012 [P] [US1] Add `bulkCreateAffiliations` function in `app/utils/builderAffiliationUtils.ts` - creates affiliations with cache update
- [ ] T013 [P] [US1] Add `appendToAffiliationsCache` helper in `app/utils/builderAffiliationUtils.ts` - appends to cache without full refetch

### Component Integration for US1

- [ ] T014 [US1] Replace `createNewProjectPage` function in `app/page-components/ProjectPageComponent/ProjectPageComponent.tsx`:

  - Remove Wix `insertDataItem` call
  - Remove Wix `replaceDataItemReferences` calls
  - Call `createBuilderProjectPage` instead
  - Call existing tag update API for `tagPageLink`
  - Call `bulkCreateAffiliations` for coordinators/participants/organisations
  - Call `invalidateProjectPageCache` and `handleUserDataRefresh`
  - Redirect to new page URL

- [ ] T015 [US1] Remove Wix imports from `app/page-components/ProjectPageComponent/ProjectPageComponent.tsx`:
  - Remove `useWixModules` import
  - Remove `items` import from `@wix/data`
  - Remove `insertDataItem` destructuring

**Checkpoint**: New project page creation works with Builder.io - can be tested independently

---

## Phase 4: User Story 2 - Edit Existing Project Page (Priority: P1)

**Goal**: A user who owns a project page can edit and save changes to Builder.io

**Independent Test**: Open existing project page, click Edit, modify fields, click Save, verify changes in Builder.io

### Utility Functions for US2

- [ ] T016 [US2] Add `updateBuilderProjectPage` function in `app/utils/builderInfoPageUtils.ts` - calls PUT /api/builder/info-page/[id]

### Component Integration for US2

- [ ] T017 [US2] Replace `updateDataToServer` function in `app/page-components/ProjectPageComponent/ProjectPageComponent.tsx`:

  - Remove Wix `updateDataItem` call
  - Remove Wix `replaceDataItemReferences` calls
  - Call `updateBuilderProjectPage` instead
  - Call existing tag update API for name/tagPageLink changes
  - Handle affiliation updates (delete old, create new)
  - Call `invalidateProjectPageCache`

- [ ] T018 [US2] Remove remaining Wix imports from `app/page-components/ProjectPageComponent/ProjectPageComponent.tsx`:
  - Remove `updateDataItem` import
  - Remove `replaceDataItemReferences` import
  - Remove `bulkInsertItems` import
  - Remove `bulkRemoveItems` import

**Checkpoint**: Edit project page works with Builder.io - can be tested independently

---

## Phase 5: User Story 3 - Project Tag Update (Priority: P1)

**Goal**: When project name changes, the associated tag is updated in Builder.io

**Independent Test**: Edit project name, save, verify tag's name and tagPageLink updated in Builder.io

### Implementation for US3

- [ ] T019 [US3] Verify tag update integration in `createNewProjectPage` - calls `/api/builder/tag/[id]` with `tagPageLink`
- [ ] T020 [US3] Update tag update logic in `updateDataToServer` in `app/page-components/ProjectPageComponent/ProjectPageComponent.tsx`:
  - Replace Wix `updateDataItem("Tags", ...)` with fetch to `/api/builder/tag/[id]`
  - Ensure cache is updated (not invalidated) via existing tag utility

**Checkpoint**: Tag updates work with Builder.io - bidirectional link maintained

---

## Phase 6: User Story 4 - Affiliation Management (Priority: P1)

**Goal**: Coordinators, participants, and organisations create/delete affiliations in Builder.io

**Independent Test**: Add coordinator to project, save, verify affiliation created in Builder.io with correct extraIdentifier

### Utility Functions for US4

- [ ] T021 [P] [US4] Add `bulkDeleteAffiliations` function in `app/utils/builderAffiliationUtils.ts` - deletes affiliations with cache update
- [ ] T022 [P] [US4] Add `removeFromAffiliationsCache` helper in `app/utils/builderAffiliationUtils.ts` - removes from cache without full refetch

### Component Integration for US4

- [ ] T023 [US4] Update coordinator affiliation handling in `updateDataToServer`:

  - Replace Wix `bulkRemoveItems` with `bulkDeleteAffiliations`
  - Replace Wix `bulkInsertItems` with `bulkCreateAffiliations`
  - Use `extraIdentifier: "coordination"`

- [ ] T024 [US4] Update participant affiliation handling in `updateDataToServer`:

  - Same pattern as coordinators
  - Use `extraIdentifier: "participation"`

- [ ] T025 [US4] Update organisation affiliation handling in `updateDataToServer`:

  - Same pattern as coordinators
  - Use `extraIdentifier: "projectOrganisationRole"`
  - Include `role` field

- [ ] T026 [US4] Update affiliation handling in `createNewProjectPage`:
  - Call `bulkCreateAffiliations` for coordinators with `extraIdentifier: "coordination"`
  - Call `bulkCreateAffiliations` for participants with `extraIdentifier: "participation"`
  - Call `bulkCreateAffiliations` for organisations with `extraIdentifier: "projectOrganisationRole"` and `role` field
  - Note: No delete needed for create - only create new affiliations

**Checkpoint**: Affiliations work with Builder.io - replace pattern (delete old, create new) functional

---

## Phase 7: User Stories 5 & 6 - Metadata Fields (Priority: P2)

**Goal**: Project dates, links, and media files save correctly to Builder.io

**Independent Test**: Set dates/links/media on project page, save, verify fields in Builder.io

### Implementation (Already covered in transform function)

- [ ] T027 [US5] Verify `transformProjectDataForBuilder` handles `projectStartDate` and `projectEndDate`
- [ ] T028 [US5] Verify `transformProjectDataForBuilder` handles `linkedinLink` and `websiteLink`
- [ ] T029 [US6] Verify `transformProjectDataForBuilder` handles `mediaFiles` array with url, displayName, thumbnail

**Checkpoint**: All metadata fields save correctly

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final cleanup and validation

- [ ] T030 Remove all commented-out Wix code from `app/page-components/ProjectPageComponent/ProjectPageComponent.tsx`
- [ ] T031 Remove unused Wix-related imports from component file
- [ ] T032 Verify `refetchTags()`, `refetchInfoPages()`, `refetchAffiliations()` are NOT called during save
- [ ] T033 Add console logging for Builder.io operations (start, success, failure)
- [ ] T034 Test error handling scenarios:
  - Disconnect network during save, verify graceful error message
  - Try to save without project tag selected, verify validation error
  - Verify partial affiliation failures are reported but don't block page save
- [ ] T035 Verify existing UI behaviors preserved:
  - Edit/Publish buttons visibility based on ownership
  - Discard Changes reverts all modifications
  - "Saving Page..." modal appears during API calls
  - Loading spinners work identically to pre-migration
- [ ] T036 Manual E2E test: Create new project page with all fields populated
- [ ] T037 Manual E2E test: Edit existing project page, change all field types
- [ ] T038 Manual E2E test: Verify affiliations appear correctly after create/edit
- [ ] T039 Verify no Wix API calls in Network tab during save operations

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - verify prerequisites first
- **Foundational (Phase 2)**: Depends on Setup - BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Phase 2 completion
- **US2 (Phase 4)**: Depends on Phase 2, shares utilities with US1
- **US3 (Phase 5)**: Can start after Phase 2, uses existing tag API
- **US4 (Phase 6)**: Depends on Phase 2, needs affiliation utilities from US1
- **US5/US6 (Phase 7)**: Verification only, depends on US1 transform function
- **Polish (Phase 8)**: Depends on all user stories complete

### User Story Dependencies

```
Phase 2 (API Routes)
       ↓
   ┌───┴───┐
   ↓       ↓
  US1     US3 (Tag - uses existing API)
   │
   ├── Note: T012-T013 (affiliation utilities) start in US1
   │         for use in createNewProjectPage
   ↓
  US2 (shares utilities with US1)
   ↓
  US4 (extends affiliation handling for update flow)
   ↓
US5/US6 (verification)
   ↓
 Polish
```

### Parallel Opportunities

- **Phase 1**: All T001-T004 can run in parallel (verification tasks)
- **Phase 2**: All T005-T009 can run in parallel (different files)
- **Phase 3**: T012-T013 can run in parallel (different functions in different files)
- **Phase 6**: T021-T022 can run in parallel (different functions)

---

## Parallel Example: Phase 2 API Routes

```bash
# All API routes can be created in parallel (different directories):
Task T005: "app/api/builder/info-page/route.ts"
Task T006: "app/api/builder/info-page/[id]/route.ts"
Task T007: "app/api/builder/affiliations/route.ts"
Task T008: "app/api/builder/affiliations/[id]/route.ts"
Task T009: "app/api/builder/affiliations/bulk-delete/route.ts"
```

---

## Implementation Strategy

### MVP First (US1 - Create New Project Page)

1. Complete Phase 1: Setup (verify prerequisites)
2. Complete Phase 2: API Routes (CRITICAL - blocks all stories)
3. Complete Phase 3: US1 - Create new project page
4. **STOP and VALIDATE**: Test creating a new project page
5. If working → MVP achieved, can deploy

### Incremental Delivery

1. Setup + API Routes → Foundation ready
2. Add US1 (Create) → Test → First milestone
3. Add US2 (Edit) → Test → Full CRUD
4. Add US3/US4 (Tag/Affiliations) → Test → Complete functionality
5. Verify US5/US6 (Metadata) → Test → All fields working
6. Polish → Production ready

### Single Developer Strategy (Recommended)

Execute in strict order:

1. T001-T004 (Setup verification)
2. T005-T009 (API routes - can batch)
3. T010-T015 (US1 - Create)
4. T016-T018 (US2 - Edit)
5. T019-T026 (US3/US4 - Tag/Affiliations)
6. T027-T029 (US5/US6 - Verification)
7. T030-T038 (Polish)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- US1 is the MVP - fully functional create flow
- US2 builds on US1 utilities
- US3/US4 are integrated into US1/US2 but tracked separately
- US5/US6 are already handled by transform function, just need verification
- Total estimated tasks: 39
- Parallel opportunities: 14 tasks can run in parallel within their phases
