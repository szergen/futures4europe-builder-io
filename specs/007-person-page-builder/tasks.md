# Tasks: Person-Page Builder.io Migration

**Input**: Design documents from `/specs/007-person-page-builder/`
**Prerequisites**: plan.md, spec.md, data-model.md, contracts/, research.md, quickstart.md

**Tests**: Manual testing only (no automated test tasks - follows pattern from 005/006)

**Organization**: Tasks are grouped by implementation phase. User Stories 1-4 are all P1 and tightly coupled (same save flow), so they share implementation tasks.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## User Stories Reference

| Story | Title                           | Priority |
| ----- | ------------------------------- | -------- |
| US1   | User Creates New Person Page    | P1       |
| US2   | User Edits Existing Person Page | P1       |
| US3   | Person Tag Update with Wix Sync | P1       |
| US4   | Affiliation Management          | P1       |
| US5   | Person Metadata Management      | P2       |
| US6   | Media Files Management          | P2       |

---

## Phase 1: Setup (Verify Prerequisites)

**Purpose**: Confirm all required infrastructure from 005/006 is in place

- [x] T001 Verify `/api/builder/info-page/route.ts` exists and handles POST requests
- [x] T002 Verify `/api/builder/info-page/[id]/route.ts` exists and handles PUT requests
- [x] T003 Verify `/api/builder/affiliations/route.ts` exists for bulk create
- [x] T004 Verify `/api/builder/affiliations/bulk-delete/route.ts` exists
- [x] T005 Verify `/api/builder/tag/[id]/route.ts` exists for tag updates
- [x] T006 Verify `bulkCreateAffiliations` function exists in `app/utils/builderAffiliationUtils.ts`
- [x] T007 Verify `bulkDeleteAffiliations` function exists in `app/utils/builderAffiliationUtils.ts`
- [x] T008 Verify `updateTag`, `appendAffiliations`, `removeAffiliations` exist in `app/custom-hooks/AuthContext/AuthContext.tsx`

**Checkpoint**: All prerequisites verified ✅ - can proceed with implementation

---

## Phase 2: US1 - Create Person Page (Utility Functions)

**Goal**: Add transform, create, and update utility functions for person pages

**Independent Test**: Functions can be unit tested by calling with mock data

- [x] T009 [US1] Create `transformPersonDataForBuilder` function in `app/utils/builderInfoPageUtils.ts`:

  - Map all 8 reference fields with wrapper keys:
    - `personTag` → `person` (personItem)
    - `pageOwner` → `pageOwner` (pageOwnerItem)
    - `author` → `author` (authorItem)
    - `pageType` → `pageTypes` (pageTypeItem)
    - `countryTag` → `countryTag` (countryTagItem)
    - `methods` → `methods` (methodsItem)
    - `domains` → `domains` (domainsItem)
    - `activity` → `activity` (activityItem)
  - Handle person-specific fields: `linkedinLink`, `websiteLink`, `researchGateLink`, `orcidLink`, `mediaFiles`
  - Follow pattern from `transformOrganisationDataForBuilder`

- [x] T010 [US1] Create `createBuilderPersonPage` function in `app/utils/builderInfoPageUtils.ts`:

  - Call POST `/api/builder/info-page` with transformed data
  - Follow pattern from `createBuilderOrganisationPage`

- [x] T011 [US1] Create `updateBuilderPersonPage` function in `app/utils/builderInfoPageUtils.ts`:
  - Call PUT `/api/builder/info-page/[id]` with transformed data
  - Follow pattern from `updateBuilderOrganisationPage`

**Checkpoint**: Utility functions ready ✅ - can proceed with component integration

---

## Phase 3: US2 - Edit Person Page (Component Integration)

**Goal**: Replace Wix API calls in PersonPageComponent with Builder.io calls

**Independent Test**: Edit an existing person page, verify changes save to Builder.io

- [x] T012 [US2] Remove Wix CMS imports from `app/page-components/PersonPageComponent/PersonPageComponent.tsx`:

  - Remove: `useWixModules`, `items` from `@wix/data`
  - Remove: `bulkInsertItems`, `bulkRemoveItems`, `replaceDataItemReferences`, `updateDataItem` from `@app/wixUtils/client-side`
  - **KEEP**: `updateMember` from `@app/wixUtils/client-side` (CRITICAL - DO NOT REMOVE) ✅

- [x] T013 [US2] Add Builder.io imports to `app/page-components/PersonPageComponent/PersonPageComponent.tsx`:

  - Add: `createBuilderPersonPage`, `updateBuilderPersonPage` from `@app/utils/builderInfoPageUtils`
  - Add: `bulkCreateAffiliations`, `bulkDeleteAffiliations` from `@app/utils/builderAffiliationUtils`

- [x] T014 [US2] Add AuthContext imports to `app/page-components/PersonPageComponent/PersonPageComponent.tsx`:

  - Add to useAuth() destructuring: `updateTag`, `appendAffiliations`, `removeAffiliations`

- [x] T015 [US2] Replace `updateDataToServer` function in `app/page-components/PersonPageComponent/PersonPageComponent.tsx`:
  - Replace Wix `updateDataItem` with `updateBuilderPersonPage`
  - Replace Wix `replaceDataItemReferences` calls - fields now included in transform function
  - Replace Wix `bulkInsertItems`/`bulkRemoveItems` for affiliations with `bulkCreateAffiliations`/`bulkDeleteAffiliations`
  - **KEEP** `updateMember(userDetails.contactId, nickName)` call for Wix nickname sync ✅
  - Add `updateTag()` call after tag update in Builder.io
  - Add `appendAffiliations()` / `removeAffiliations()` calls after affiliation changes
  - Call `invalidatePersonPageCache(personData.slug)` after successful save
  - Call `handleUserTagRefresh()` after successful save (FR-016)
  - Add console.log statements to track save operations (FR-017)

---

## Phase 4: US1 Complete - Create New Person Page

**Goal**: Replace create function to use Builder.io

**Independent Test**: Create a new person page, verify it saves to Builder.io

- [x] T016 [US1] Replace `createNewPersonPage` function in `app/page-components/PersonPageComponent/PersonPageComponent.tsx`:

  - Generate slug: `sanitizeTitleForSlug(personTag.name) + "-" + generateUniqueHash()` with `/person/` prefix
  - Replace Wix `insertDataItem` with `createBuilderPersonPage`
  - Replace all Wix `replaceDataItemReferences` calls - fields now in transform
  - Set `author`, `pageOwner`, and `person` references to user's tag
  - Replace affiliation creation with `bulkCreateAffiliations`
  - **KEEP** `updateMember()` call for Wix nickname sync on create ✅
  - Update person tag's `tagPageLink` via `/api/builder/tag/[id]`
  - Call `updateTag()` after tag update
  - Call `appendAffiliations()` after creating affiliations
  - Call `invalidatePersonPageCache(newSlug)` after success
  - Call `handleUserTagRefresh()` after successful save (FR-016)
  - Add console.log statements to track save operations (FR-017)
  - Redirect to `/person/{slug}` after success

- [x] T017 [US1] VERIFY: Tag update logic uses `/api/builder/tag/[id]` route for tagPageLink update in create flow
- [x] T018 [US4] VERIFY: Affiliation creation uses `bulkCreateAffiliations` with correct fields:
  - Current affiliations: `personTag`, `organisationTag`, `role`, `extraIdentifier: "current"`, `title`
  - Former affiliations: `personTag`, `organisationTag`, `role`, `extraIdentifier: "former"`, `title`
  - Coordination: `personTag`, `projectTag`, `extraIdentifier: "coordination"`, `title`
  - Participation: `personTag`, `projectTag`, `extraIdentifier: "participation"`, `title`

---

## Phase 5: US3 - Person Tag Update with Wix Nickname Sync

**Goal**: Ensure tag updates work correctly with BOTH Builder.io and Wix

**Independent Test**: Change person name, verify tag updates in Builder.io AND Wix nickname updates

- [x] T019 [US3] VERIFY: Person tag name change updates tag in Builder.io via `/api/builder/tag/[id]`:

  - Update `name` field with new name
  - Update `tagPageLink` if creating new page
  - Preserve other tag fields (`tagLine`, `picture`, etc.)

- [x] T020 [US3] VERIFY: `updateMember(contactId, newName)` is called when person tag name changes:

  - Check this call is RETAINED in both `createNewPersonPage` and `updateDataToServer` ✅
  - Verify `updateUserDetails()` is called to update local React state ✅

- [x] T021 [US3] VERIFY: `updateTag()` from AuthContext is called after successful Builder.io tag update:
  - NOT `handleTagCreated()` - that causes full cache invalidation ✅

---

## Phase 6: US4 - Affiliation Management

**Goal**: Ensure all 4 affiliation types are correctly managed in Builder.io

**Independent Test**: Add/remove each affiliation type, verify records in Builder.io

- [x] T022 [US4] VERIFY: Current affiliations (`extraIdentifier: "current"`) create/delete correctly:

  - Delete old affiliations via `bulkDeleteAffiliations` ✅
  - Create new affiliations via `bulkCreateAffiliations` ✅
  - Call `removeAffiliations()` and `appendAffiliations()` to update React state ✅

- [x] T023 [US4] VERIFY: Former affiliations (`extraIdentifier: "former"`) create/delete correctly ✅

- [x] T024 [US4] VERIFY: Coordination affiliations (`extraIdentifier: "coordination"`) create/delete correctly ✅

- [x] T025 [US4] VERIFY: Participation affiliations (`extraIdentifier: "participation"`) create/delete correctly ✅

---

## Phase 7: US5/US6 - Metadata & Media Files

**Goal**: Verify metadata and media file fields are correctly saved

**Independent Test**: Set metadata/media fields, verify saved in Builder.io

- [x] T026 [US5] VERIFY: Country tag reference saved correctly with `countryTagItem` wrapper ✅
- [x] T027 [US5] VERIFY: Methods array saved correctly with `methodsItem` wrapper ✅
- [x] T028 [US5] VERIFY: Domains array saved correctly with `domainsItem` wrapper ✅
- [x] T029 [US5] VERIFY: Activity array saved correctly with `activityItem` wrapper ✅
- [x] T030 [US5] VERIFY: Link fields saved: `linkedinLink`, `websiteLink`, `researchGateLink`, `orcidLink` ✅
- [x] T031 [US6] VERIFY: Media files array saved with `url`, `displayName`, `thumbnail` properties ✅

---

## Phase 8: Cache Optimization (Apply 005/006 Learnings)

**Goal**: Remove full cache invalidation, use granular updates

- [x] T032 Remove `handleTagCreated()` call on component mount in `app/page-components/PersonPageComponent/PersonPageComponent.tsx`:

  - Find and remove the useEffect around line ~1114 that calls `handleTagCreated()` for new pages ✅ (already commented out)
  - This prevents full Redis cache invalidation on page load ✅

- [x] T033 VERIFY: No `refetchTags()`, `refetchInfoPages()`, `refetchAffiliations()` calls remain in save flow ✅

- [x] T034 VERIFY: Cache updates use granular functions:
  - `updateTag()` for tag changes ✅
  - `appendAffiliations()` for new affiliations ✅
  - `removeAffiliations()` for deleted affiliations ✅

---

## Phase 9: Polish & Validation

**Purpose**: Final testing and validation - **REQUIRES MANUAL TESTING**

- [ ] T035 Test error handling scenarios:

  - Try to save without country tag selected, verify validation error
  - Verify partial affiliation failures are reported but don't block page save
  - Verify Wix nickname update failure logs warning but doesn't fail save

- [ ] T036 Verify existing UI behaviors preserved:

  - Edit/Publish buttons visibility based on ownership
  - Discard Changes reverts all modifications
  - "Saving Page..." modal appears during API calls
  - Loading spinners work identically to pre-migration

- [ ] T037 Manual E2E test: Create new person page with all fields populated
- [ ] T038 Manual E2E test: Edit existing person page, change all field types
- [ ] T039 Manual E2E test: Verify affiliations appear correctly after create/edit
- [ ] T040 Verify no Wix CMS API calls in Network tab during save (only `updateMember` allowed)
- [ ] T041 Verify Wix nickname syncs when person tag name changes

**Note**: Phase 9 tasks require manual testing by the user. **Implementation is complete after Phase 8** ✅

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies - verify prerequisites first
- **Phase 2 (Utility Functions)**: Depends on Phase 1 - creates foundation for all stories
- **Phase 3 (Edit/US2)**: Depends on Phase 2 - modifies component
- **Phase 4 (Create/US1)**: Depends on Phase 2 & Phase 3 - uses same component
- **Phase 5 (Tag Sync/US3)**: VERIFY task - depends on Phase 3 & 4
- **Phase 6 (Affiliations/US4)**: VERIFY task - depends on Phase 3 & 4
- **Phase 7 (Metadata/US5+US6)**: VERIFY task - depends on Phase 2
- **Phase 8 (Cache)**: Depends on all implementation phases
- **Phase 9 (Polish)**: Depends on all previous phases

### User Story Mapping

| Story | Primary Tasks        | Verify Tasks    | Notes                                 |
| ----- | -------------------- | --------------- | ------------------------------------- |
| US1   | T009-T011, T016-T018 | T037            | Create flow                           |
| US2   | T012-T015            | T038            | Edit flow                             |
| US3   | (within T015, T016)  | T019-T021, T041 | Tag+Wix sync embedded in create/edit  |
| US4   | (within T015, T016)  | T022-T025, T039 | Affiliations embedded in create/edit  |
| US5   | (within T009)        | T026-T030       | Metadata fields in transform function |
| US6   | (within T009)        | T031            | Media files in transform function     |

### Parallel Opportunities

- T001-T008: All verify tasks can run in parallel
- T009-T011: T010 and T011 depend on T009 (transform function)
- T012-T014: All import changes can happen in parallel (different sections of same file)
- T022-T025: All affiliation verify tasks can run in parallel
- T026-T031: All metadata/media verify tasks can run in parallel

---

## Parallel Example: Phase 1 Setup

```bash
# All verification tasks can run in parallel:
Task: T001 "Verify /api/builder/info-page/route.ts exists"
Task: T002 "Verify /api/builder/info-page/[id]/route.ts exists"
Task: T003 "Verify /api/builder/affiliations/route.ts exists"
# ... etc
```

---

## Implementation Strategy

### MVP First (US1 + US2 Core)

1. Complete Phase 1: Verify prerequisites
2. Complete Phase 2: Create utility functions
3. Complete Phase 3 + 4: Component integration
4. **STOP and TEST**: Create/edit person page manually
5. If working: proceed to verification phases

### Incremental Delivery

1. Phase 1-4 → Core CRUD working
2. Phase 5-6 → Verify all user story requirements
3. Phase 7-8 → Verify metadata, cache optimization
4. Phase 9 → Final polish and validation

---

## Critical Reminders

⚠️ **MUST RETAIN**: `updateMember()` call in both `createNewPersonPage` and `updateDataToServer`

⚠️ **MUST REMOVE**: `handleTagCreated()` call on component mount (causes full cache invalidation)

⚠️ **MUST ADD**: `updateTag()`, `appendAffiliations()`, `removeAffiliations()` calls after changes

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- VERIFY tasks confirm implementation meets requirements
- Most implementation is in Phase 2-4; remaining phases are verification
- Follow exact pattern from OrganisationPageComponent migration in 006
- Total estimated effort: ~1.75 hours (matches plan.md estimate)
