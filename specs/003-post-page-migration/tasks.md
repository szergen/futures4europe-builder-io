# Tasks: Post-Page Creation Migration from Wix to Builder.io

**Input**: Design documents from `/specs/003-post-page-migration/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅, quickstart.md ✅

**Tests**: Manual browser testing approach per specification (SC-009). No automated test tasks included - testing is done via browser DevTools and manual verification per quickstart.md guide.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4, US5)
- Include exact file paths in descriptions

## Path Conventions

- **Web app structure**: `app/` (Next.js 13 App Router), `app/utils/` (utilities), `app/page-components/` (components)
- Paths follow existing Next.js 13.4.9 conventions in the codebase

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify prerequisites and prepare environment

- [ ] T001 Verify Builder.io `post-page` model is configured with all required fields (check Builder.io dashboard)
- [ ] T002 Verify `.env.local` contains `BUILDER_PRIVATE_API_KEY` (check environment variable exists)
- [ ] T003 [P] Review existing PostPageComponent to understand data structure in `app/page-components/PostPageComponent/PostPageComponent.tsx` (read-only)
- [ ] T004 [P] Review existing builderPostUtils to understand transformation patterns in `app/utils/builderPostUtils.ts` (read-only)
- [ ] T005 [P] Review existing cache utilities in `app/utils/cache-utils.ts` (no changes needed, read-only)
- [ ] T006 [P] Review slug generation utilities in `app/utils/PageComponents.utils.ts` (no changes needed, read-only)

**Checkpoint**: All prerequisites verified, environment ready for implementation

---

## Phase 2: Foundational (Core API Utilities)

**Purpose**: Create Builder.io Write API integration utilities that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T007 Add `transformReferencesForBuilder()` helper function in `app/utils/builderPostUtils.ts` (converts tag arrays to Builder.io Reference format)
- [ ] T008 [P] Add `transformPostDataForBuilder()` function in `app/utils/builderPostUtils.ts` (converts component state to Builder.io API payload)
- [ ] T009 [P] Add `createBuilderPost()` API function in `app/utils/builderPostUtils.ts` (handles POST to Builder.io Write API)
- [ ] T010 [P] Add `updateBuilderPost()` API function in `app/utils/builderPostUtils.ts` (handles PUT to Builder.io Write API)
- [ ] T011 Add API constants (BUILDER_API_URL, BUILDER_PRIVATE_API_KEY) in `app/utils/builderPostUtils.ts`
- [ ] T012 Verify all utility functions compile without TypeScript errors (run `npm run lint` or check IDE)

**Checkpoint**: Foundation ready - Builder.io API utilities complete and tested, user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - User Creates New Post Page (Priority: P1) 🎯 MVP

**Goal**: Enable logged-in users to create new basic post pages via Builder.io API

**Independent Test**: Navigate to `/post-page/New_Post?pageType=post`, fill in title and content, click "Publish Page", verify redirect to new post page and data visible in Builder.io

### Implementation for User Story 1

- [ ] T013 [P] [US1] Create new route file `app/post-page/New_Post/page.tsx` by copying from `app/post/New_Post/page.tsx`
- [ ] T014 [US1] Update `createNewPost()` function in `app/page-components/PostPageComponent/PostPageComponent.tsx` to use `createBuilderPost()` instead of Wix `insertDataItem`
- [ ] T015 [US1] Replace Wix reference update calls in `createNewPost()` with single Builder.io payload (remove all `replaceDataItemReferences` calls)
- [ ] T016 [US1] Add cache invalidation call `await invalidatePostPageCache(result.data.slug)` after successful create in `createNewPost()`
- [ ] T017 [US1] Update redirect to use Builder.io slug format: `router.push(\`/post-page/\${result.data.slug}\`)`in`createNewPost()`
- [ ] T018 [US1] Add error handling with user-visible alert for API failures in `createNewPost()`
- [ ] T019 [US1] Add imports for new utilities (`createBuilderPost`, `invalidatePostPageCache`) in `PostPageComponent.tsx`
- [ ] T020 [US1] Verify new route is accessible at `/post-page/New_Post?pageType=post` (manual browser test)
- [ ] T021 [US1] Manual test: Create basic post with title, subtitle, content section 1 (follow quickstart.md Step 5)
- [ ] T022 [US1] Manual test: Verify single API call in Network tab (POST to `/v1/write/post-page`)
- [ ] T023 [US1] Manual test: Verify redirect to new post page works correctly
- [ ] T024 [US1] Manual test: Verify created post appears in Builder.io dashboard with all fields

**Checkpoint**: At this point, User Story 1 should be fully functional - users can create basic posts and see them immediately

---

## Phase 4: User Story 2 - User Edits Existing Post Page (Priority: P1)

**Goal**: Enable users to edit and update existing post pages via Builder.io API

**Independent Test**: Open existing post, click "Edit Page", modify title and tags, click "Publish Page", verify changes persist without page refresh

### Implementation for User Story 2

- [ ] T025 [US2] Update `updateDataToServer()` function in `app/page-components/PostPageComponent/PostPageComponent.tsx` to use `updateBuilderPost()` instead of Wix `updateDataItem`
- [ ] T026 [US2] Replace all Wix reference update calls in `updateDataToServer()` with single Builder.io payload (remove `replaceDataItemReferences` calls)
- [ ] T027 [US2] Add cache invalidation call `await invalidatePostPageCache(postData.slug)` after successful update in `updateDataToServer()`
- [ ] T028 [US2] Remove comparison logic for `defaultPostData` vs `postData` in `updateDataToServer()` (Builder.io API optimization: accepts full payload, no manual change detection needed - satisfies FR-028)
- [ ] T029 [US2] Add error handling with user-visible alert for API failures in `updateDataToServer()`
- [ ] T030 [US2] Update imports to include `updateBuilderPost` in `PostPageComponent.tsx`
- [ ] T031 [US2] Manual test: Open existing post and click "Edit Page" (follow quickstart.md Step 6)
- [ ] T032 [US2] Manual test: Modify title, subtitle, and add person tag, then publish
- [ ] T033 [US2] Manual test: Verify single API call in Network tab (PUT to `/v1/write/post-page/{id}`)
- [ ] T034 [US2] Manual test: Verify changes visible immediately without page refresh
- [ ] T035 [US2] Manual test: Verify "Discard Changes" button reverts to original state

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently - create and edit flows complete

---

## Phase 5: User Story 3 - User Creates Event-Specific Post (Priority: P2)

**Goal**: Enable users to create event posts with event-specific fields (speakers, moderators, dates, registration)

**Independent Test**: Navigate to `/post-page/New_Post?pageType=event`, fill in event fields, publish, verify event-specific fields saved in Builder.io

### Implementation for User Story 3

- [ ] T036 [US3] Verify `transformPostDataForBuilder()` includes event fields: `speakers`, `moderators`, `eventStartDate`, `eventEndDate`, `eventRegistration` in `app/utils/builderPostUtils.ts`
- [ ] T037 [US3] Update `createNewPost()` to pass event-specific fields to `createBuilderPost()` in `PostPageComponent.tsx`
- [ ] T038 [US3] Verify `updateDataToServer()` passes event-specific fields to `updateBuilderPost()` in `PostPageComponent.tsx`
- [ ] T039 [US3] Manual test: Navigate to `/post-page/New_Post?pageType=event` (follow quickstart.md Step 8)
- [ ] T040 [US3] Manual test: Fill in event speakers, moderators, start date, end date, registration link
- [ ] T041 [US3] Manual test: Publish and verify all event fields saved in Builder.io
- [ ] T042 [US3] Manual test: Edit existing event and verify event fields update correctly
- [ ] T043 [US3] Manual test: Verify event-specific UI components display correctly (speakers list, dates, registration button)

**Checkpoint**: Events are fully functional - create, edit, and display work correctly with event-specific fields

---

## Phase 6: User Story 4 - User Creates Project Result Post (Priority: P2)

**Goal**: Enable users to create project result posts with project-specific fields (authors, media, publication date)

**Independent Test**: Navigate to `/post-page/New_Post?pageType=projectResult`, fill in project fields, publish, verify project-specific fields saved in Builder.io

### Implementation for User Story 4

- [ ] T044 [US4] Verify `transformPostDataForBuilder()` includes project result fields: `projectResultAuthor`, `projectResultMedia`, `projectResultPublicationDate` in `app/utils/builderPostUtils.ts`
- [ ] T045 [US4] Update `createNewPost()` to pass project result fields to `createBuilderPost()` in `PostPageComponent.tsx`
- [ ] T046 [US4] Verify `updateDataToServer()` passes project result fields to `updateBuilderPost()` in `PostPageComponent.tsx`
- [ ] T047 [US4] Manual test: Navigate to `/post-page/New_Post?pageType=projectResult` (follow quickstart.md Step 8)
- [ ] T048 [US4] Manual test: Fill in project result authors, media file, publication date
- [ ] T049 [US4] Manual test: Publish and verify all project result fields saved in Builder.io
- [ ] T050 [US4] Manual test: Edit existing project result and verify fields update correctly
- [ ] T051 [US4] Manual test: Verify project result media displays correctly (PDF preview, video player, etc.)

**Checkpoint**: All three post types (post, event, project result) are now fully functional

---

## Phase 7: User Story 5 - Optimized Batch Reference Updates (Priority: P3)

**Goal**: Verify performance optimization - all reference fields in single API call instead of separate calls

**Independent Test**: Create/update post with 10+ reference fields, monitor network tab, verify only 1-2 API calls total

### Implementation for User Story 5

- [ ] T052 [US5] Verify `transformPostDataForBuilder()` includes ALL reference fields in single payload (no separate calls)
- [ ] T053 [US5] Verify `createBuilderPost()` sends all references in single POST request
- [ ] T054 [US5] Verify `updateBuilderPost()` sends all references in single PUT request
- [ ] T055 [US5] Manual test: Create post with all 10 content sections, all 10 images, and multiple reference fields (follow quickstart.md Step 9)
- [ ] T056 [US5] Manual test: Measure time from "Publish" click to redirect (should be <3 seconds per SC-001)
- [ ] T057 [US5] Manual test: Verify network tab shows ONLY 1 POST request (not 10+ like Wix)
- [ ] T058 [US5] Manual test: Update post with multiple reference changes (add/remove tags)
- [ ] T059 [US5] Manual test: Measure update time (should be <2 seconds per SC-002)
- [ ] T060 [US5] Manual test: Verify network tab shows ONLY 1 PUT request for update

**Checkpoint**: Performance optimization verified - 90%+ reduction in API calls achieved (from 10+ to 1-2)

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, error handling verification, and documentation

- [ ] T061 [P] Manual test: Verify error handling by temporarily breaking API key (follow quickstart.md "Troubleshooting")
- [ ] T062 [P] Manual test: Verify validation errors prevent save (empty title test)
- [ ] T063 [P] Manual test: Verify "Discard Changes" preserves original state
- [ ] T064 [P] Manual test: Verify cache invalidation works (check listing page immediately after save)
- [ ] T065 [P] Manual test: Verify all existing UI behaviors preserved (edit mode, loading modal, validation states)
- [ ] T066 Verify console logging shows appropriate detail: operation start, success/failure, IDs, errors only (no full payloads per clarification Q4)
- [ ] T067 Run complete testing checklist from quickstart.md (all 20 checkboxes)
- [ ] T068 [P] Verify success criteria SC-001: Post creation <3 seconds
- [ ] T069 [P] Verify success criteria SC-002: Post update <2 seconds
- [ ] T070 [P] Verify success criteria SC-003: Single API call for create
- [ ] T071 [P] Verify success criteria SC-004: 1-2 API calls max for update
- [ ] T072 Verify success criteria SC-005: All 3 post types work correctly
- [ ] T073 Verify success criteria SC-010: 100% of reference fields save correctly
- [ ] T074 [P] Update any relevant migration documentation if needed
- [ ] T075 Code cleanup: Remove any commented-out Wix API code
- [ ] T076 Final review: Compare implementation against all 31 functional requirements in spec.md

**Final Checkpoint**: All user stories complete, all success criteria met, ready for production deployment

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - **BLOCKS all user stories**
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - User Story 1 (P1) - Create post: Can start after Phase 2
  - User Story 2 (P1) - Edit post: Can start after Phase 2 (may need US1 for test data)
  - User Story 3 (P2) - Events: Can start after Phase 2 (independent)
  - User Story 4 (P2) - Project results: Can start after Phase 2 (independent)
  - User Story 5 (P3) - Performance: Can start after Phase 2 (verification of existing optimization)
- **Polish (Phase 8)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - **No dependencies on other stories**
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - May need US1 post for testing, but independently testable
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - **Completely independent**
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - **Completely independent**
- **User Story 5 (P3)**: Can start after Foundational (Phase 2) - Verifies optimization already in place, **completely independent**

### Within Each User Story

- Implementation tasks before manual testing
- Core functionality before edge cases
- Story complete before moving to next priority

### Parallel Opportunities

#### Phase 1 (Setup)

- T003, T004, T005, T006 can all run in parallel (different files, read-only)

#### Phase 2 (Foundational)

- T008, T009, T010 can run in parallel (different functions in same file)

#### Phase 3-7 (User Stories)

- Once Phase 2 completes, **all 5 user stories can start in parallel** (if team capacity allows)
- Within US1: T013 and T014-T018 can start in parallel (different files)
- Within US2: All implementation tasks are sequential (same file)
- Within US3-US4: Implementation and testing can overlap

#### Phase 8 (Polish)

- T061, T062, T063, T064, T065, T068, T069, T070, T071, T074 can all run in parallel (independent tests)

---

## Parallel Example: User Story 1

```bash
# After Foundational Phase completes, launch US1 tasks:
T013: "Create new route file app/post-page/New_Post/page.tsx" [Different file]
T014: "Update createNewPost() in PostPageComponent.tsx" [Different file]

# These can start at the same time since they modify different files
```

## Parallel Example: Multiple User Stories

```bash
# After Foundational Phase completes, with 3 developers:
Developer A: User Story 1 (T013-T024) - Create post functionality
Developer B: User Story 3 (T036-T043) - Event posts
Developer C: User Story 4 (T044-T051) - Project result posts

# All work on independent features, no conflicts
```

---

## Implementation Strategy

### MVP First (User Story 1 + 2 Only)

1. Complete Phase 1: Setup (~30 minutes)
2. Complete Phase 2: Foundational (~1-2 hours) - **CRITICAL**
3. Complete Phase 3: User Story 1 (~2-3 hours)
4. **STOP and VALIDATE**: Test User Story 1 independently with quickstart.md
5. Complete Phase 4: User Story 2 (~1-2 hours)
6. **VALIDATE AGAIN**: Test create + edit flow together
7. Deploy/demo if ready - **Core functionality complete**

**Estimated MVP Time**: 5-8 hours for core create/edit functionality

### Incremental Delivery

1. **Foundation**: Setup + Foundational → (~2 hours) → APIs ready
2. **MVP**: Add US1 + US2 → Test independently → (~4-5 hours) → Deploy/Demo **Core value delivered!**
3. **Events**: Add US3 → Test independently → (~1.5 hours) → Deploy/Demo
4. **Projects**: Add US4 → Test independently → (~1.5 hours) → Deploy/Demo
5. **Optimization**: US5 verification → (~1 hour) → Confirm performance
6. **Polish**: Phase 8 → Final validation → (~2 hours) → Production ready

**Total Estimated Time**: 12-15 hours for complete feature

### Parallel Team Strategy

With multiple developers:

1. **Team completes Setup + Foundational together** (~2 hours)
2. Once Foundational is done:
   - **Developer A**: User Story 1 + 2 (create + edit) - Core functionality
   - **Developer B**: User Story 3 (events) - Independent feature
   - **Developer C**: User Story 4 (project results) - Independent feature
3. Stories complete and integrate independently
4. **Developer A** handles User Story 5 + Polish while B & C test

**Parallel Team Time**: ~6-8 hours total (vs 12-15 sequential)

---

## Notes

- **[P] tasks**: Different files/functions, no dependencies, can run in parallel
- **[Story] label**: Maps task to specific user story for traceability
- **Manual testing approach**: Per spec SC-009, manual testing of 20+ interactions via browser
- **No automated tests**: Specification does not require automated tests, uses browser-based verification
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- **Performance targets**: <3s create (SC-001), <2s update (SC-002), 1 API call (SC-003, SC-004)
- **Breaking change note**: Route changes from `/post/New_Post` to `/post-page/New_Post` - update any internal links
- All implementation follows Next.js 13.4.9 App Router patterns (not 14.x)
- TypeScript 4.8.4 compatibility ensured (no TypeScript 5.x features used)

---

## Task Count Summary

- **Total Tasks**: 76
- **Setup Phase**: 6 tasks
- **Foundational Phase**: 6 tasks (BLOCKING)
- **User Story 1**: 12 tasks
- **User Story 2**: 11 tasks
- **User Story 3**: 8 tasks
- **User Story 4**: 8 tasks
- **User Story 5**: 9 tasks
- **Polish Phase**: 16 tasks

**Parallel Opportunities Identified**: 28 tasks can run in parallel (marked with [P])

**Independent Test Criteria**: Each of 5 user stories has clear independent test criteria per spec.md

**Suggested MVP Scope**: User Story 1 + 2 (23 tasks, ~5-8 hours)
