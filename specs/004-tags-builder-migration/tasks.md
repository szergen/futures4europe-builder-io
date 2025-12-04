---
description: "Task list for switching tag operations from Wix to Builder.io"
---

# Tasks: Switch Tag Operations from Wix to Builder.io

**Input**: Design documents from `/specs/004-tags-builder-migration/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Automated smoke tests are REQUIRED per FR-022 for post-deployment validation. Unit tests are optional.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Project Type**: Next.js 13.4.9 App Router web application
- **API Routes**: `app/api/`
- **Utilities**: `app/utils/`
- **Components**: `app/shared-components/`, `app/page-components/`
- **Services**: `app/services/`
- **Tests**: `tests/e2e/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and verification of prerequisites

- [x] T001 Verify Builder.io tag model exists with correct schema (name, tagType, tagLine, picture, tagPageLink, masterTag, wixId)
- [x] T002 Verify tag migration mapping file exists at data/mappings/tag-migration-mapping.json
- [x] T003 [P] Verify Builder.io API keys configured (BUILDER_PUBLIC_API_KEY and BUILDER_PRIVATE_API_KEY)
- [x] T004 [P] Verify Redis cache service is operational and accessible
- [x] T005 [P] Install or verify @builder.io/sdk dependency in package.json
- [x] T006 Create docs/migration/tags/ directory and migration status document per constitution

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core transformation utilities that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T007 Create builderTagUtils.ts module in app/utils/ with TypeScript interfaces (BuilderTag, WixTag, TagMappingEntry)
- [x] T008 [P] Implement error classes in app/utils/builderTagUtils.ts (ValidationError, DuplicateError, NotFoundError, BuilderApiError)
- [x] T009 [P] Implement mapping module initialization in app/utils/builderTagUtils.ts (load JSON, build wixToBuilderMap and builderToWixMap)
- [x] T010 Implement translateWixTagIdToBuilderId() function in app/utils/builderTagUtils.ts
- [x] T011 Implement translateBuilderIdToWixTagId() function in app/utils/builderTagUtils.ts
- [x] T012 Implement transformBuilderTagToWixFormat() function in app/utils/builderTagUtils.ts
- [x] T013 Implement transformWixTagToBuilderFormat() function in app/utils/builderTagUtils.ts
- [x] T014 Implement batchTransformBuilderTagsToWixFormat() function in app/utils/builderTagUtils.ts
- [x] T015 Implement retry utility fetchWithRetry() in app/utils/builderTagUtils.ts with exponential backoff (3 retries)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 2 - System Fetches All Tags from Builder.io (Priority: P1) 🎯

**Goal**: Enable the application to retrieve all tags from Builder.io instead of Wix, providing the foundation for all other tag operations

**Independent Test**: Call GET /api/tags endpoint and verify it returns tags from Builder.io with correct structure. Check that TagPicker components display tags from Builder.io source.

### Implementation for User Story 2

- [x] T016 [P] [US2] Implement getAllBuilderTags() function in app/utils/builderTagUtils.ts with caching support
- [x] T017 [P] [US2] Implement getBuilderTagById() function in app/utils/builderTagUtils.ts
- [x] T018 [US2] Update GET /api/tags route in app/api/tags/route.ts to fetch from Builder.io via getAllBuilderTags()
- [x] T019 [US2] Update GET /api/tags route to transform Builder.io tags to Wix format using batchTransformBuilderTagsToWixFormat()
- [x] T020 [US2] Update useFetchTags hook in app/custom-hooks/useFetchTags.tsx to use /api/tags endpoint (verify no Wix-specific logic)
- [x] T021 [US2] Update useFetchListTags hook in app/custom-hooks/useFetchListTags.tsx to filter tags from Builder.io source
- [x] T022 [US2] Update POST /api/getCollectionItems route in app/api/getCollectionItems/route.ts to route "Tags" collection to Builder.io
- [x] T023 [US2] Add error handling and logging for Builder.io fetch failures in app/api/tags/route.ts
- [x] T024 [US2] Update README.md migration status: Mark tag fetching as migrated to Builder.io

**Checkpoint**: At this point, all tag fetching operations use Builder.io as source of truth

---

## Phase 4: User Story 1 - Content Editor Creates New Tags in Builder.io (Priority: P1)

**Goal**: Enable users to create new tags through the UI that are stored in Builder.io instead of Wix

**Independent Test**: Create a new tag through TagPicker component, verify it's saved to Builder.io, then confirm it appears in tag searches without any Wix interaction.

### Implementation for User Story 1

- [x] T025 [US1] Implement createBuilderTag() function in app/utils/builderTagUtils.ts with validation and duplicate checking
- [x] T026 [US1] Implement updateBuilderTag() function in app/utils/builderTagUtils.ts
- [x] T027 [US1] Create POST /api/builder/tag route in app/api/builder/tag/route.ts for tag creation
- [x] T028 [US1] Create GET /api/builder/tag/[id] route in app/api/builder/tag/[id]/route.ts
- [x] T029 [P] [US1] Create PUT /api/builder/tag/[id] route in app/api/builder/tag/[id]/route.ts
- [x] T030 [P] [US1] Create DELETE /api/builder/tag/[id] route in app/api/builder/tag/[id]/route.ts
- [x] T031 [US1] Update uploadTag() function in TagPicker component at app/shared-components/TagPicker/TagPicker.tsx to use Builder.io API
- [x] T032 [US1] Update uploadTag() function in AuthContext at app/custom-hooks/AuthContext/AuthContext.tsx to use Builder.io API
- [x] T033 [US1] Update tag creation in register page at app/register/page.tsx to use Builder.io API
- [x] T034 [US1] Add validation logic for required fields (name, tagType) in POST /api/builder/tag route
- [x] T035 [US1] Add duplicate name checking (case-insensitive) in createBuilderTag() function
- [x] T036 [US1] Trigger cache invalidation after tag creation in POST /api/builder/tag route
- [x] T037 [US1] Update README.md migration status: Mark tag creation as migrated to Builder.io

**Checkpoint**: At this point, all tag creation operations use Builder.io as destination

---

## Phase 5: User Story 4 - Cache System Uses Builder.io Tags (Priority: P1)

**Goal**: Update Redis cache system to use Builder.io as the source for tags, ensuring cache warming and invalidation work with Builder.io data

**Independent Test**: Warm the cache, verify cache keys contain Builder.io data, trigger cache invalidation and confirm it refreshes from Builder.io sources.

### Implementation for User Story 4

- [x] T038 [US4] Update warmCache() function in app/services/cacheWarmer.ts to fetch tags from Builder.io
- [x] T039 [US4] Update POST /api/tags route in app/api/tags/route.ts to rebuild cache from Builder.io tags
- [x] T040 [US4] Update invalidateAllCache() function in app/services/redisCache.ts to work with Builder.io-sourced data
- [x] T041 [US4] Create POST /api/invalidate-cache route in app/api/invalidate-cache/route.ts for cache management
- [x] T042 [US4] Update cache invalidation triggers to call Builder.io-based refresh
- [x] T043 [US4] Add cache TTL validation (4-hour TTL) in app/services/redisCache.ts
- [x] T044 [US4] Add error handling for cache fetch failures with fallback to direct Builder.io API
- [x] T045 [US4] Update README.md migration status: Mark tag caching as migrated to Builder.io

**Checkpoint**: At this point, cache system is fully synchronized with Builder.io data

---

## Phase 6: User Story 3 - System Calculates Tag Mentions from Builder.io Data (Priority: P1)

**Goal**: Calculate tag popularity and mention counts based on references in Builder.io info pages and post pages instead of Wix data

**Independent Test**: Compare mention counts calculated from Builder.io data against expected results, verify counts display correctly in Tag components and mention pages.

### Implementation for User Story 3

- [x] T046 [US3] Update calculatePopularity() function in app/utils/tags.utils.ts to work with Builder.io tag structure
- [x] T047 [US3] Update calculatePopularity() to fetch info pages and post pages from Builder.io (or cache)
- [x] T048 [US3] Add affiliation tag ID translation in calculatePopularity() using translateWixTagIdToBuilderId() for Wix affiliation data
- [x] T049 [US3] Update masterTag reference counting logic in calculatePopularity() to use Builder.io format
- [x] T050 [US3] Update GET /api/tags-with-popularity route in app/api/tags-with-popularity/route.ts to use Builder.io-based calculation
- [x] T051 [US3] Add caching for tags-with-popularity calculation (tags-with-popularity.json key, 4-hour TTL)
- [x] T052 [US3] Add error handling for missing tag references in mention calculation
- [x] T053 [US3] Add logging for affiliation tag ID translation failures in calculatePopularity()
- [x] T054 [US3] Update README.md migration status: Mark tag mentions calculation as migrated to Builder.io

**Checkpoint**: All tag mention calculations now use Builder.io data sources

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Validation, testing, and documentation updates

- [x] T055 [P] Create smoke tests in tests/e2e/tags-builder.spec.ts for tag fetch operations
- [x] T056 [P] Create smoke tests for tag creation operations in tests/e2e/tags-builder.spec.ts
- [x] T057 [P] Create smoke tests for cache operations in tests/e2e/tags-builder.spec.ts
- [x] T058 [P] Create smoke tests for mention calculations in tests/e2e/tags-builder.spec.ts
- [x] T059 [P] Add logging statements for all Builder.io API operations using existing infrastructure (Vercel/Posthog/Sentry) with tag-specific error codes for tracking SC-007
- [x] T060 [P] Add performance monitoring for tag fetch operations (measure < 3 second goal)
- [x] T061 [P] Capture baseline Wix tag operation performance metrics and compare to Builder.io implementation for SC-006 validation
- [x] T062 Update quickstart.md with user-facing examples per constitution: tag creation via UI, tag search/filtering, and developer API usage for Builder.io tag utilities
- [x] T063 Code review: Run automated grep for Wix tag references ('wixClient.*Tags', 'insertDataItem.*tag', 'queryCollectionItems.\*Tags') and fail if found; manually verify zero Wix code paths for SC-005
- [x] T064 [P] Update README.md final status: Mark complete tags migration to Builder.io with all features
- [x] T065 [P] Add inline code documentation for all public functions in app/utils/builderTagUtils.ts
- [x] T066 Run smoke tests and validate all four user stories work independently

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phases 3-6)**: All depend on Foundational phase completion
  - User stories can proceed in parallel (if staffed)
  - Or sequentially in priority order: US2 → US1 → US4 → US3
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 2 (P1) - Fetch Tags**: Can start after Foundational (Phase 2) - No dependencies on other stories, RECOMMENDED FIRST
- **User Story 1 (P1) - Create Tags**: Can start after Foundational (Phase 2) - Benefits from US2 being complete for testing
- **User Story 4 (P1) - Cache System**: Can start after Foundational (Phase 2) - Strongly depends on US2 for tag fetching
- **User Story 3 (P1) - Mentions Calculation**: Can start after Foundational (Phase 2) - Depends on US2 for tag fetching

### Within Each User Story

- Utility functions before API routes
- API routes before component updates
- Core implementation before error handling
- Cache integration after core functionality
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, user stories can start in parallel (if team capacity allows)
- All error classes in T008 can be implemented together
- All mapping functions (T009-T011) can be implemented together
- All transformation functions (T012-T014) can be implemented together
- All Builder.io CRUD routes (T028-T030) can be implemented in parallel
- All smoke tests (T055-T058) can be written in parallel
- All documentation tasks (T059, T061-T062, T064-T065) can be done in parallel

---

## Parallel Example: User Story 2 (Fetch Tags)

```bash
# Launch utility functions together:
Task T016: "Implement getAllBuilderTags() function in app/utils/builderTagUtils.ts"
Task T017: "Implement getBuilderTagById() function in app/utils/builderTagUtils.ts"

# Then launch hook updates together:
Task T020: "Update useFetchTags hook in app/custom-hooks/useFetchTags.tsx"
Task T021: "Update useFetchListTags hook in app/custom-hooks/useFetchListTags.tsx"
```

## Parallel Example: User Story 1 (Create Tags)

```bash
# Launch CRUD routes together:
Task T028: "Create GET /api/builder/tag/[id] route"
Task T029: "Create PUT /api/builder/tag/[id] route"
Task T030: "Create DELETE /api/builder/tag/[id] route"

# Then launch component updates together:
Task T031: "Update TagPicker component uploadTag() function"
Task T032: "Update AuthContext uploadTag() function"
Task T033: "Update register page tag creation"
```

---

## Implementation Strategy

### MVP First (User Story 2 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 2 (Fetch Tags)
4. **STOP and VALIDATE**: Test tag fetching independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 2 (Fetch) → Test independently → Deploy/Demo (MVP!)
3. Add User Story 1 (Create) → Test independently → Deploy/Demo
4. Add User Story 4 (Cache) → Test independently → Deploy/Demo
5. Add User Story 3 (Mentions) → Test independently → Deploy/Demo
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 2 (Fetch) - HIGHEST PRIORITY
   - Developer B: User Story 1 (Create)
   - Developer C: User Story 4 (Cache) - after Developer A starts US2
3. User Story 3 starts after US2 complete (depends on tag fetching)
4. Stories complete and integrate independently

### Big Bang Deployment

Per specification clarifications:

- All user stories (US1-US4) should be completed before deployment
- Single deployment switches all tag operations from Wix to Builder.io
- No feature flags or gradual rollout
- Automated smoke tests validate deployment success
- Manual UI spot-checks supplement automated tests

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Affiliation data remains in Wix until separate migration (out of scope)
- Use mapping file to translate Wix affiliation tag IDs to Builder.io IDs
- Wix authentication remains unchanged (only tag operations switch to Builder.io)

---

## Summary

**Total Tasks**: 66
**User Stories**: 4 active (US1, US2, US3, US4)
**Suggested MVP**: User Story 2 (Fetch Tags) + Foundational
**Deployment Strategy**: Big bang (all user stories complete before deploy)

### Task Breakdown by Phase

- **Phase 1 (Setup)**: 6 tasks (added documentation structure per constitution)
- **Phase 2 (Foundational)**: 9 tasks (BLOCKING)
- **Phase 3 (US2 - Fetch)**: 9 tasks (added incremental README update)
- **Phase 4 (US1 - Create)**: 13 tasks (added incremental README update)
- **Phase 5 (US4 - Cache)**: 8 tasks (added incremental README update)
- **Phase 6 (US3 - Mentions)**: 9 tasks (added incremental README update)
- **Phase 7 (Polish)**: 12 tasks (added performance comparison)

### Parallel Opportunities Identified

- 3 tasks in Phase 1 can run in parallel
- 5 tasks in Phase 2 can run in parallel
- 2 tasks in Phase 3 can run in parallel
- 4 tasks in Phase 4 can run in parallel
- 0 tasks in Phase 5 require sequential execution
- 0 tasks in Phase 6 require sequential execution
- 8 tasks in Phase 7 can run in parallel

### Independent Test Criteria

- **US2**: Tag fetch endpoint returns Builder.io data, TagPicker displays correct tags
- **US1**: New tags created through UI appear in Builder.io and are searchable
- **US4**: Cache warming uses Builder.io, invalidation refreshes from Builder.io
- **US3**: Mention counts calculated from Builder.io match expected values

### Format Validation

✅ All tasks follow checklist format: `- [ ] [TaskID] [P?] [Story?] Description with file path`
✅ All user story tasks have [Story] labels
✅ All parallelizable tasks have [P] markers
✅ All tasks include specific file paths
✅ Task IDs sequential (T001-T066)
