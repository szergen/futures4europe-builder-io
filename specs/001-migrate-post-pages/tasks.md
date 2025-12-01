# Tasks: Post Pages Migration from Wix to Builder.io

**Input**: Design documents from `/specs/001-migrate-post-pages/`

**Prerequisites**: plan.md (required), spec.md (required), Posts_Events_Project+Results+Pages_wix.csv (provided), tag-migration-mapping.json (exists)

**Note**: Tests are not explicitly requested in the specification, so this implementation focuses on manual validation and testing.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Migration script**: `scripts/migrations/migrate-posts.js`
- **Data files**: `data/exports/`, `data/mappings/`
- **Documentation**: `specs/001-migrate-post-pages/`, `docs/migration/posts/`
- All paths relative to repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic script structure

- [x] T001 Create migration script file at scripts/migrations/migrate-posts.js
- [x] T002 Copy boilerplate from scripts/migrations/migrate-tags.js (env loading, colors, logging utilities)
- [x] T003 [P] Define configuration constants in scripts/migrations/migrate-posts.js (CSV_FILE, MAPPING_FILE, API_URL, RATE_LIMIT)
- [x] T004 [P] Verify .env.local contains BUILDER_PRIVATE_API_KEY
- [x] T005 [P] Verify data/exports/Posts_Events_Project+Results+Pages_wix.csv exists
- [x] T006 [P] Verify data/mappings/tag-migration-mapping.json exists for reference resolution

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T007 Implement loadCSV() function in scripts/migrations/migrate-posts.js to parse CSV using csv-parse/sync
- [x] T008 Implement loadMapping() function in scripts/migrations/migrate-posts.js to load or initialize post-migration-mapping.json
- [x] T009 Implement saveMapping() function in scripts/migrations/migrate-posts.js with atomic file writes
- [x] T010 Implement loadTagMapping() function in scripts/migrations/migrate-posts.js to load tag-migration-mapping.json for reference resolution
- [x] T011 Implement makeRequest() HTTP helper function in scripts/migrations/migrate-posts.js with Bearer auth
- [x] T012 Implement validateRequiredFields() function in scripts/migrations/migrate-posts.js to check title and slug presence
- [x] T013 Implement CLI argument parsing in scripts/migrations/migrate-posts.js (count, --dry-run, --validate flags)
- [x] T014 Implement showHelp() function in scripts/migrations/migrate-posts.js with usage documentation

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Data Migration Administrator Migrates Posts (Priority: P1) 🎯 MVP

**Goal**: Core migration functionality - migrate N posts from CSV to Builder.io with field transformation, reference resolution, and duplicate prevention

**Independent Test**: Run `node scripts/migrations/migrate-posts.js 10` to migrate 10 test posts, verify all 40+ fields in Builder.io, re-run to confirm 10 posts skipped (no duplicates), check mapping file updated

### Implementation for User Story 1

- [x] T015 [P] [US1] Implement transformBasicFields() function in scripts/migrations/migrate-posts.js (title, subtitle, slug with /post/ prefix, wixId)
- [x] T016 [P] [US1] Implement transformMetadata() function in scripts/migrations/migrate-posts.js (createdDate, lastUpdated, published, \_owner/createdBy)
- [x] T017 [P] [US1] Implement transformContentFields() function in scripts/migrations/migrate-posts.js (postContentRIch1-10, postImage1-10)
- [x] T018 [US1] Implement resolveReference() function in scripts/migrations/migrate-posts.js to convert Wix ID to Builder.io Reference object using tag mapping
- [x] T019 [US1] Implement transformReferences() function in scripts/migrations/migrate-posts.js to handle all 10+ reference types (author, pageOwner, people, methods, domains, projects, organisations, pageTypes, countryTag, speakers, moderators, projectResultAuthor)
- [x] T020 [US1] Add missing reference warning logic in transformReferences() - omit invalid refs, log warning with post ID and missing reference details
- [x] T021 [US1] Implement transformEventFields() function in scripts/migrations/migrate-posts.js (eventRegistration, eventStartDate, eventEndDate, speakers, moderators)
- [x] T022 [US1] Implement transformProjectResultFields() function in scripts/migrations/migrate-posts.js (projectResultAuthor, projectResultMedia, projectResultPublicationDate)
- [x] T023 [US1] Implement transformAdditionalFields() function in scripts/migrations/migrate-posts.js (internalLinks, mediaFiles, recommendations)
- [x] T024 [US1] Implement transformPost() main function in scripts/migrations/migrate-posts.js that orchestrates all transformation functions
- [x] T025 [US1] Implement checkDuplicateSlug() function in scripts/migrations/migrate-posts.js to query Builder.io for existing slugs
- [x] T026 [US1] Add slug collision handling in transformPost() - auto-append numeric suffix (-2, -3, etc.) and log modifications
- [x] T027 [US1] Implement createPost() function in scripts/migrations/migrate-posts.js to call Builder.io Write API (POST /api/v1/write/post-page)
- [x] T028 [US1] Add rate limiting in migrate() function - 200ms delay between API calls (configurable via RATE_LIMIT constant)
- [x] T029 [US1] Implement migrate() main function in scripts/migrations/migrate-posts.js with loop: load CSV → check if migrated → validate → transform → create → update mapping → log result
- [x] T030 [US1] Add duplicate prevention logic in migrate() - check mapping file before processing each post, skip if already migrated
- [x] T031 [US1] Add error handling in migrate() - individual post failures logged with details, continue with remaining posts
- [x] T032 [US1] Add summary report generation in migrate() - total processed, successful, skipped, failed counts with details
- [x] T032B [US1] Create initial docs/migration/posts/POST_MIGRATION_GUIDE.md with basic setup, CSV format, CLI usage, and example commands (satisfies Constitution Principle V)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently (MVP complete!)

---

## Phase 4: User Story 3 - Batch Migration with Progress Tracking (Priority: P2)

**Goal**: Progress tracking, ETA calculation, and resume capability for large batch migrations

**Independent Test**: Run `node scripts/migrations/migrate-posts.js all` on 100+ posts, interrupt at post 50 (Ctrl+C), restart script and verify it resumes at post 51

### Implementation for User Story 3

- [ ] T033 [P] [US3] Implement initProgressTracker() function in scripts/migrations/migrate-posts.js to initialize counters (processed, success, skip, fail, startTime)
- [ ] T034 [P] [US3] Implement updateProgress() function in scripts/migrations/migrate-posts.js to display current/total, success/skip/fail counts
- [ ] T035 [US3] Implement calculateETA() function in scripts/migrations/migrate-posts.js based on elapsed time and remaining posts
- [ ] T036 [US3] Add progress updates in migrate() loop - call updateProgress() after each post with ETA
- [ ] T037 [US3] Add resume logic in migrate() - read mapping file to determine last migrated post, skip already-processed posts
- [ ] T038 [US3] Add "all" parameter support in CLI parsing - process entire CSV when count="all"
- [ ] T039 [US3] Add batch processing logic in migrate() - handle thousands of posts with periodic save of mapping file

**Checkpoint**: At this point, User Stories 1 AND 3 should both work independently

---

## Phase 5: User Story 4 - Dry-Run Mode for Safety (Priority: P3)

**Goal**: Preview migration results without creating posts in Builder.io

**Independent Test**: Run `node scripts/migrations/migrate-posts.js 5 --dry-run`, verify no posts created in Builder.io, console shows transformation output for 5 posts

### Implementation for User Story 4

- [ ] T040 [P] [US4] Implement dryRun() function in scripts/migrations/migrate-posts.js (similar to migrate() but skip API calls)
- [ ] T041 [US4] Add transformation validation in dryRun() - call transformPost() and display JSON payload
- [ ] T042 [US4] Add validation error reporting in dryRun() - catch transformation errors, log details, continue with next post
- [ ] T043 [US4] Add dry-run summary in dryRun() - report validation results, show sample payloads, list would-be failures
- [ ] T044 [US4] Wire dry-run mode to CLI - if --dry-run flag present, call dryRun() instead of migrate()

**Checkpoint**: All user stories 1, 3, and 4 should now be independently functional

---

## Phase 6: User Story 2 - Administrator Validates Migration Results (Priority: P2)

**Goal**: Validation mode to compare migrated posts against source data

**Independent Test**: Run `node scripts/migrations/migrate-posts.js 10 --validate` after migrating 10 posts, verify field-by-field comparison reports 0 discrepancies

### Implementation for User Story 2

- [ ] T045 [P] [US2] Implement queryBuilderPost() function in scripts/migrations/migrate-posts.js to fetch post by ID from Builder.io
- [ ] T046 [US2] Implement compareFields() function in scripts/migrations/migrate-posts.js to compare Wix CSV data vs Builder.io data field-by-field
- [ ] T047 [US2] Implement generateFieldMappingReport() function in scripts/migrations/migrate-posts.js to document Wix→Builder.io transformations
- [ ] T048 [US2] Implement validate() function in scripts/migrations/migrate-posts.js - load CSV, load mapping, query Builder.io, compare, report discrepancies
- [ ] T049 [US2] Add discrepancy logging in validate() - detailed reports for missing fields, incorrect values, type mismatches
- [ ] T050 [US2] Add validation summary in validate() - total validated, discrepancies found, pass/fail status per post
- [ ] T051 [US2] Wire validation mode to CLI - if --validate flag present, call validate() instead of migrate()

**Checkpoint**: All user stories should now be independently functional

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Documentation enhancement, optimization, and production readiness (initial docs created in Phase 3)

- [ ] T052 [P] Create specs/001-migrate-post-pages/quickstart.md with step-by-step migration instructions
- [ ] T053 [P] Create specs/001-migrate-post-pages/field-mapping.md documenting all 40+ CSV→Builder.io transformations
- [ ] T054 [P] Enhance docs/migration/posts/POST_MIGRATION_GUIDE.md with troubleshooting, advanced usage, and field mapping details
- [ ] T055 [P] Add comprehensive JSDoc comments to all functions in scripts/migrations/migrate-posts.js
- [ ] T056 [P] Update README.md migration status section with post migration completion
- [ ] T057 [P] Add troubleshooting section to docs/migration/posts/POST_MIGRATION_GUIDE.md with common errors and solutions
- [ ] T057B [P] Create specs/001-migrate-post-pages/checklists/validation.md with field-by-field manual testing checklist (40+ fields, 3 sub-types, reference integrity checks)
- [ ] T058 Test scripts/migrations/migrate-posts.js with 10 test posts - verify all fields, references, duplicate prevention
- [ ] T059 Test scripts/migrations/migrate-posts.js with posts containing missing references - verify warnings logged, posts still migrated
- [ ] T060 Test scripts/migrations/migrate-posts.js with duplicate slugs - verify auto-suffix applied, logged
- [ ] T061 Test scripts/migrations/migrate-posts.js interruption and resume - stop at post 25, restart, verify continues at post 26
- [ ] T062 Profile scripts/migrations/migrate-posts.js performance - optimize CSV parsing for large files if needed
- [ ] T063 Run full dry-run migration on production CSV data - validate all transformations
- [ ] T064 Execute production migration with scripts/migrations/migrate-posts.js all
- [ ] T065 Run validation mode after production migration - verify 0 discrepancies
- [ ] T066 Update docs/migration/MIGRATION_SUMMARY.md with post migration completion status

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - US1 (Phase 3): No dependencies on other stories - can start immediately after Foundational
  - US3 (Phase 4): Depends on US1 - builds on core migration functionality
  - US4 (Phase 5): Depends on US1 - builds on transformation logic
  - US2 (Phase 6): Depends on US1 - requires migrated data to validate
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 3 (P2)**: Depends on US1 for core migrate() function - adds progress tracking
- **User Story 4 (P3)**: Depends on US1 for transformPost() - reuses transformation logic in dry-run mode
- **User Story 2 (P2)**: Depends on US1 completion - needs migrated posts to validate against

### Within Each User Story

- Setup → Foundation → US1 core transforms → US1 API integration → US1 migration loop
- US3 progress tracking can be added to existing migrate() function
- US4 dry-run creates parallel path using same transformations
- US2 validation is independent function that reads existing data

### Parallel Opportunities

- All Setup tasks (T001-T006) can run in parallel (different files, no dependencies)
- Foundational tasks T010, T012, T013, T014 can run in parallel (independent functions)
- Within US1: T015, T016, T017 can run in parallel (independent transformation functions)
- Within US3: T033, T034, T035 can run in parallel (independent utility functions)
- Within US4: T040, T041, T042 can be developed in parallel if US1 transforms are complete
- Within US2: T045, T046, T047 can run in parallel (independent utility functions)
- Polish phase: T052, T053, T054, T055, T056, T057 can all run in parallel (independent documentation files)

---

## Parallel Example: User Story 1 Core Transforms

```bash
# Launch all transformation functions together (different concerns, no dependencies):
Task T015: "Implement transformBasicFields() in scripts/migrations/migrate-posts.js"
Task T016: "Implement transformMetadata() in scripts/migrations/migrate-posts.js"
Task T017: "Implement transformContentFields() in scripts/migrations/migrate-posts.js"

# After basic transforms, reference resolution:
Task T018: "Implement resolveReference() in scripts/migrations/migrate-posts.js"
Task T019: "Implement transformReferences() in scripts/migrations/migrate-posts.js"

# After references, specialized transforms:
Task T021: "Implement transformEventFields() in scripts/migrations/migrate-posts.js"
Task T022: "Implement transformProjectResultFields() in scripts/migrations/migrate-posts.js"
Task T023: "Implement transformAdditionalFields() in scripts/migrations/migrate-posts.js"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T006)
2. Complete Phase 2: Foundational (T007-T014) - CRITICAL blocking phase
3. Complete Phase 3: User Story 1 (T015-T032)
4. **STOP and VALIDATE**: Test with 10 posts, verify all fields, check duplicate prevention
5. Deploy/test MVP - core migration functionality ready for use

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 (Phase 3) → Test independently → **MVP Deployment** (can migrate posts manually with basic features)
3. Add User Story 3 (Phase 4) → Test independently → Improved UX (progress tracking, resume)
4. Add User Story 4 (Phase 5) → Test independently → Safety feature (dry-run validation)
5. Add User Story 2 (Phase 6) → Test independently → Quality assurance (validation mode)
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (T015-T032)
   - After US1 complete:
     - Developer B: User Story 3 (T033-T039) - builds on US1
     - Developer C: User Story 4 (T040-T044) - reuses US1 transforms
     - Developer D: User Story 2 (T045-T051) - validates US1 results
3. Stories complete and integrate independently

---

## Task Summary

**Total Tasks**: 66
**By Phase**:

- Setup: 6 tasks
- Foundational: 8 tasks (BLOCKING)
- User Story 1 (P1): 18 tasks 🎯 MVP
- User Story 3 (P2): 7 tasks
- User Story 4 (P3): 5 tasks
- User Story 2 (P2): 7 tasks
- Polish: 15 tasks

**By User Story**:

- US1 (Core Migration): 18 tasks - Highest priority, MVP scope
- US3 (Progress Tracking): 7 tasks - Enhances US1
- US4 (Dry-Run Mode): 5 tasks - Safety feature using US1 logic
- US2 (Validation): 7 tasks - QA feature validating US1 results

**Parallel Opportunities**: 23 tasks marked with [P] can run in parallel

**MVP Scope**: Phases 1-3 (32 tasks) deliver core migration functionality

**Time Estimate** (from plan.md):

- MVP (Setup + Foundational + US1): ~18-20 hours
- Full feature (all user stories): ~48 hours
- Recommended: 7 working days

---

## Notes

- **Foundational phase is critical**: All user stories depend on Phase 2 completion
- **US1 is the MVP**: Core migration must work before adding features
- **User stories are independent**: US2, US3, US4 can be implemented in any order after US1
- **Tests not included**: Spec doesn't request automated tests, manual validation used instead
- **Resume capability built-in**: Mapping file enables interruption recovery from US1 onward
- **Rate limiting enforced**: 200ms delay prevents API throttling
- **Reference resolution crucial**: pageTypes field determines post sub-type (post/event/project-result)
- **Error handling non-blocking**: Individual post failures don't stop migration
- Commit after completing each user story phase
- Stop at any checkpoint to validate story independently
- Avoid cross-story dependencies that break independence
