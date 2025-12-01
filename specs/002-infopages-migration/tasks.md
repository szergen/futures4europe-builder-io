# Tasks: Info Pages Migration from Wix to Builder.io

**Input**: Design documents from `/specs/002-infopages-migration/`  
**Prerequisites**: plan.md (✅), spec.md (✅)

**Tests**: Not requested in specification - focused on migration script functionality

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each migration feature.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Migration script: `scripts/migrations/migrate-infopages.js`
- Data files: `data/exports/`, `data/mappings/`
- Documentation: `docs/migration/infopages/`, `specs/002-infopages-migration/`

---

## Phase 1: Setup (Script Infrastructure)

**Purpose**: Initialize migration script structure and basic capabilities

- [ ] T001 Create migration script file at `scripts/migrations/migrate-infopages.js`
- [ ] T002 Copy boilerplate from `scripts/migrations/migrate-posts.js` (env loading, logging, CLI parsing)
- [ ] T003 [P] Define configuration constants (file paths for CSV, three mapping files, tag mapping, API settings, model names)
- [ ] T004 [P] Set up colored console logging utilities (info, success, error, warning, title) in script
- [ ] T005 Implement CLI argument parsing (count, --dry-run, --validate flags) with help text display

---

## Phase 2: User Stories 1 & 2 - Core Migration with Multi-Model Routing (Priority: P1) 🎯 MVP

**Goal**: Migrate info pages from CSV to Builder.io, automatically routing Person/Organisation/Project pages to their respective models based on Page Types tag lookup

**Independent Test**: Run `node scripts/migrations/migrate-infopages.js 10` and verify:

- Pages are created in correct Builder.io models (person-page, organisation-page, project-page)
- All basic fields are mapped correctly
- No duplicates on re-run (all 10 skipped)
- Three separate mapping files track migrations per type

### Core Functions - CSV & Mapping Files

- [ ] T006 [P] [US1] Implement `loadCSV()` function with case-insensitive column matching in `scripts/migrations/migrate-infopages.js`
- [ ] T007 [P] [US1] Implement `normalizeColumnName()` utility (lowercase) for robust CSV parsing in `scripts/migrations/migrate-infopages.js`
- [ ] T008 [US1] Implement `loadMapping(pageType)` function to load/initialize mapping file by type in `scripts/migrations/migrate-infopages.js`
- [ ] T009 [US1] Implement `saveMapping(pageType, data)` function for atomic file writes by type in `scripts/migrations/migrate-infopages.js`
- [ ] T010 [US1] Create mapping file structure: `{wixToBuilder: {}, builderToWix: {}, migratedCount: 0, lastMigrated: null}`

### Page Type Determination (SIMPLIFIED)

- [ ] T011 [US2] Implement `determinePageType(row)` function in `scripts/migrations/migrate-infopages.js`
- [ ] T012 [US2] Extract `Page Types` field from CSV row and parse Wix tag ID
- [ ] T013 [US2] Look up Wix tag ID in tag-migration-mapping.json to get tag name
- [ ] T014 [US2] Implement simple string matching logic: contains "person" → person-page, "organisation" → organisation-page, "project" → project-page
- [ ] T015 [US2] Add fallback priority order (Person > Organisation > Project) for rare mixed-type cases
- [ ] T016 [US2] Return page type object: `{type: 'person'|'organisation'|'project', model: '...', prefix: '/person/'|...}`
- [ ] T017 [US2] Handle missing/invalid Page Types field (return null, log error)

### Field Transformation - Common Fields

- [ ] T018 [P] [US1] Implement `transformInfoPage(row, pageType)` core function in `scripts/migrations/migrate-infopages.js`
- [ ] T019 [P] [US1] Transform basic fields (title, slug with prefix, description) in `transformInfoPage()`
- [ ] T020 [P] [US1] Transform metadata fields (createdDate, lastUpdated as timestamps, published status) in `transformInfoPage()`
- [ ] T021 [US1] Add validation for required fields (title, slug) - skip if missing
- [ ] T022 [P] [US1] Transform external links (direct text fields: linkedinLink, websiteLink, researchGateLink, orcidLink)

### Field Transformation - Type-Specific

- [ ] T023 [P] [US2] Implement Person-specific field transformations (tag references, external links) in `transformInfoPage()`
- [ ] T024 [P] [US2] Implement Organisation-specific field transformations (tag references, establishedDate) in `transformInfoPage()`
- [ ] T025 [P] [US2] Implement Project-specific field transformations (tag references, start/end dates, content fields) in `transformInfoPage()`

### Builder.io API Integration

- [ ] T026 [P] [US1] Implement `makeRequest(url, options)` HTTP helper with authentication in `scripts/migrations/migrate-infopages.js`
- [ ] T027 [US1] Implement `createInfoPage(model, data)` Write API call function in `scripts/migrations/migrate-infopages.js`
- [ ] T028 [US1] Handle API response parsing to extract Builder.io ID
- [ ] T029 [US1] Add error handling for API failures (log and continue)

### Main Migration Loop

- [ ] T030 [US1] Implement `migrate(count)` main migration function in `scripts/migrations/migrate-infopages.js`
- [ ] T031 [US1] Loop through CSV rows with page type determination per row
- [ ] T032 [US1] Skip rows with no valid page type (log error)
- [ ] T033 [US1] Check if already migrated using appropriate mapping file by type
- [ ] T034 [US1] Transform row data to Builder.io format
- [ ] T035 [US1] Create page in Builder.io via API (route to correct model)
- [ ] T036 [US1] Update appropriate mapping file with Wix ID ↔ Builder.io ID
- [ ] T037 [US1] Add rate limiting delay (200ms default) between API calls
- [ ] T038 [US1] Track success/skip/failure counters (overall and per page type)

### Basic Logging

- [ ] T039 [P] [US1] Add progress logging (current/total, page type being processed)
- [ ] T040 [P] [US1] Log successful migrations with page type and Builder.io ID
- [ ] T041 [P] [US1] Log skipped pages (already migrated) with page type
- [ ] T042 [P] [US1] Log failed pages with error details and page type
- [ ] T043 [US1] Display summary report at completion (broken down by page type)

**Checkpoint**: At this point, basic migration should work for all three page types. Test with 10 pages (mix of Person, Organisation, Project).

---

## Phase 3: Tag References & Structured Roles (Priority: P1)

**Goal**: Resolve all tag references and parse structured roles data to complete field transformations

**Independent Test**: Migrate pages with tag references and structured roles, verify all references resolve to Builder.io tag IDs and roles are stored as JSON text

### Tag Reference Resolution (ALL references are tags)

- [ ] T044 [US1] Load tag-migration-mapping.json at script startup
- [ ] T045 [US1] Implement `resolveTagReferences(wixIds, fieldName)` function in `scripts/migrations/migrate-infopages.js`
- [ ] T046 [US1] Look up Builder.io tag IDs for Wix tag IDs
- [ ] T047 [US1] Create Builder.io Reference objects: `{@type: "@builder.io/core:Reference", id: "...", model: "tag"}`
- [ ] T048 [US1] Handle missing tag references (omit from array, log warning with page ID and field name)
- [ ] T049 [P] [US1] Apply tag reference resolution to common fields (methods, domains, countryTag, activity)
- [ ] T050 [P] [US2] Apply tag reference resolution to Person-specific fields (person, personType, personProjectCoordination, etc.)
- [ ] T051 [P] [US2] Apply tag reference resolution to Organisation-specific fields (organisationType, organisationProject, organisationPeople, etc.)
- [ ] T052 [P] [US2] Apply tag reference resolution to Project-specific fields (projectFunded, projectCoordinator, projectParticipantTeam, etc.)

### Structured Roles Parsing (JSON text, NO reference resolution)

- [ ] T053 [US1] Implement `parseStructuredRoles(csvValue)` function in `scripts/migrations/migrate-infopages.js`
- [ ] T054 [US1] Parse JSON from CSV: `[{"organisation":"X","role":"Y"}]`
- [ ] T055 [US1] Validate JSON structure (handle malformed JSON, log warning)
- [ ] T056 [US1] Store as JSON text (NO reference resolution for names)
- [ ] T057 [P] [US2] Apply structured roles parsing to Person fields (personOrganisationRoles, personOrganisationRolesFormer)
- [ ] T058 [P] [US2] Apply structured roles parsing to Organisation fields (organisationProjectRoles, organisationPeopleRoles)
- [ ] T059 [P] [US2] Apply structured roles parsing to Project fields (projectOrganisationRoles)

### Slug Collision Handling (per page type)

- [ ] T060 [US1] Implement `checkDuplicateSlug(slug, pageType, model)` function in `scripts/migrations/migrate-infopages.js`
- [ ] T061 [US1] Query Builder.io for existing slugs in specific model
- [ ] T062 [US1] Auto-append numeric suffix (-2, -3, etc.) if collision detected
- [ ] T063 [US1] Log slug modifications with original and new slug

**Checkpoint**: Migration should now handle all field types correctly. Test with pages containing references and structured roles.

---

## Phase 4: User Story 4 - Progress Tracking & Resume (Priority: P2)

**Goal**: Enhanced progress tracking and ability to resume interrupted migrations

**Independent Test**: Start migration of 100 pages, interrupt at page 50, restart and verify it continues from page 51 without duplicates

### Enhanced Progress Tracking

- [ ] T064 [US4] Add detailed console progress updates (current/total with percentages) in `migrate()` function
- [ ] T065 [US4] Display success/skip/fail counters per page type (running totals)
- [ ] T066 [US4] Display overall counters across all page types
- [ ] T067 [US4] Calculate and display estimated time remaining (ETA) based on current rate
- [ ] T068 [US4] Display page type being currently processed

### Resume Capability

- [ ] T069 [US4] Ensure mapping files are saved after each successful migration (already implemented in T036)
- [ ] T070 [US4] Verify skip logic correctly identifies already-migrated pages per type
- [ ] T071 [US4] Test interruption and resume scenario (manual testing)

**Checkpoint**: Migration should now provide detailed progress feedback and resume reliably after interruption.

---

## Phase 5: User Story 5 - Dry-Run Mode (Priority: P3)

**Goal**: Preview migration without creating pages in Builder.io

**Independent Test**: Run `node scripts/migrations/migrate-infopages.js 10 --dry-run` and verify no pages created in Builder.io but transformation output displayed

### Dry-Run Implementation

- [ ] T072 [US5] Implement `dryRun(count)` function in `scripts/migrations/migrate-infopages.js`
- [ ] T073 [US5] Process CSV rows with page type determination (same as migrate)
- [ ] T074 [US5] Transform data to Builder.io format (same as migrate)
- [ ] T075 [US5] Skip API calls - display JSON payload instead
- [ ] T076 [US5] Display page type routing decisions for each row
- [ ] T077 [US5] Show field transformations and tag reference resolutions
- [ ] T078 [US5] Display validation errors without stopping process
- [ ] T079 [US5] Show summary of what would be migrated (per page type)

**Checkpoint**: Dry-run mode should provide complete preview of migration without modifying Builder.io.

---

## Phase 6: User Story 3 - Validation Mode (Priority: P2)

**Goal**: Compare migrated pages against source CSV data to verify accuracy

**Independent Test**: Run `node scripts/migrations/migrate-infopages.js 50 --validate` and verify it reports field-by-field comparison results

### Validation Implementation

- [ ] T080 [US3] Implement `validate(count)` function in `scripts/migrations/migrate-infopages.js`
- [ ] T081 [US3] Query Builder.io for migrated pages (all three models)
- [ ] T082 [US3] Load corresponding CSV rows using mapping files
- [ ] T083 [US3] Implement field-by-field comparison logic per page type
- [ ] T084 [US3] Check basic fields (title, slug, description)
- [ ] T085 [US3] Check tag references (verify Builder.io IDs match)
- [ ] T086 [US3] Check structured roles (verify JSON structure preserved)
- [ ] T087 [US3] Check metadata fields (dates, published status)
- [ ] T088 [US3] Report discrepancies with specific field names and values
- [ ] T089 [US3] Generate validation report summary (pass/fail per page type)

**Checkpoint**: Validation mode should identify any data integrity issues post-migration.

---

## Phase 7: Polish & Documentation

**Purpose**: Complete documentation and final production readiness

### Documentation

- [ ] T090 [P] Create migration guide at `docs/migration/infopages/INFOPAGES_MIGRATION_GUIDE.md`
- [ ] T091 [P] Document page type routing logic in migration guide
- [ ] T092 [P] Document all command-line options and flags in migration guide
- [ ] T093 [P] Add troubleshooting section with common errors and solutions
- [ ] T094 [P] Create field mapping reference at `specs/002-infopages-migration/field-mapping.md`
- [ ] T095 [P] Document CSV column → Builder.io path for each page type in field mapping reference
- [ ] T096 [P] Include tag reference resolution examples in field mapping reference
- [ ] T097 [P] Include structured roles format examples in field mapping reference
- [ ] T098 [P] Create quick start guide at `specs/002-infopages-migration/quickstart.md`
- [ ] T099 [P] Add step-by-step instructions for first-time migration in quickstart
- [ ] T100 [P] Add example commands with expected outputs in quickstart

### Code Documentation

- [ ] T101 [P] Add comprehensive JSDoc comments to all functions in `scripts/migrations/migrate-infopages.js`
- [ ] T102 [P] Update file header with usage examples and description
- [ ] T103 [P] Document page type routing algorithm with inline comments
- [ ] T104 [P] Add comments explaining tag reference resolution vs structured roles

### Edge Case Testing & Refinement

- [ ] T105 Test with missing tag references (verify graceful handling)
- [ ] T106 Test with duplicate slugs within same page type (verify auto-suffix)
- [ ] T107 Test with missing optional fields (verify graceful handling)
- [ ] T108 Test with mixed page types (verify priority order fallback)
- [ ] T109 Test with missing Page Types field (verify skip and error log)
- [ ] T110 Test with malformed structured roles JSON (verify error handling)
- [ ] T111 Test with malformed CSV data (verify error handling)
- [ ] T112 Test interruption and resume with all three page types
- [ ] T113 Test case-insensitive column matching with various CSV formats

### Production Readiness

- [ ] T114 Run dry-run on full production CSV dataset
- [ ] T115 Review and fix any issues identified in dry-run
- [ ] T116 Execute migration on test Builder.io environment
- [ ] T117 Run validation mode on test environment results
- [ ] T118 Review validation results and fix discrepancies
- [ ] T119 Update migration status in project documentation
- [ ] T120 Create backup/rollback plan documentation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **User Stories 1 & 2 (Phase 2)**: Depends on Setup completion - CORE MVP
- **Tag References (Phase 3)**: Depends on Phase 2 - Required to complete field transformations
- **User Story 4 (Phase 4)**: Depends on Phase 3 - Can be done in parallel with US5
- **User Story 5 (Phase 5)**: Depends on Phase 3 - Can be done in parallel with US4
- **User Story 3 (Phase 6)**: Depends on Phase 3 - Can be done in parallel with US4/US5
- **Polish (Phase 7)**: Depends on all user stories being functional

### User Story Dependencies

- **User Stories 1 & 2 (P1)**: Interdependent - routing (US2) is core part of migration (US1). Implement together.
- **User Story 3 (P2)**: Independent - can start after Phase 3, works on any migrated data
- **User Story 4 (P2)**: Independent - can start after Phase 3, enhances existing migration
- **User Story 5 (P3)**: Independent - can start after Phase 3, uses same transformation logic

### Within Each Phase

- Setup tasks (T001-T005) can run in any order
- Core migration tasks (T006-T043) must follow sequence (CSV → Mapping → Page Type → Transform → API → Loop → Logging)
- Tag reference tasks (T044-T063) mostly parallel after T044-T048 are complete
- Progress tracking tasks (T064-T071) can run in parallel
- Dry-run tasks (T072-T079) sequential (builds on core migration)
- Validation tasks (T080-T089) sequential (builds on core migration)
- Documentation tasks (T090-T104) all parallel
- Testing tasks (T105-T113) parallel after core is complete

### Parallel Opportunities

**Phase 2 - After core functions (T006-T017) complete**:

```bash
# These can run in parallel (different sections of transformInfoPage):
T019: Basic fields transformation
T020: Metadata transformation
T022: External links transformation
T023: Person-specific transformations
T024: Organisation-specific transformations
T025: Project-specific transformations

# These can run in parallel (different utilities):
T026: HTTP helper
T039-T042: Logging functions
```

**Phase 3 - After core resolution logic (T044-T048) complete**:

```bash
# These can run in parallel (different field groups):
T049: Common tag references
T050: Person tag references
T051: Organisation tag references
T052: Project tag references
T057: Person structured roles
T058: Organisation structured roles
T059: Project structured roles
```

**Phase 7 - Documentation**:

```bash
# These can all run in parallel:
T090-T100: All documentation files
T101-T104: All code documentation
```

**Phase 7 - Testing**:

```bash
# These can run in parallel:
T105-T113: All edge case tests
```

---

## Implementation Strategy

### MVP First (User Stories 1 & 2 Only)

1. **Phase 1**: Setup (T001-T005) - 2 hours
2. **Phase 2**: Core Migration (T006-T043) - 14 hours
3. **Phase 3**: Tag References & Roles (T044-T063) - 16 hours
4. **STOP and VALIDATE**: Test with 50-100 pages across all three types
5. Verify:
   - Pages go to correct models
   - All fields mapped correctly
   - No duplicates on re-run
   - Three mapping files working
6. **Deploy to production** if ready

**MVP Total**: ~32 hours (4 days)

### Incremental Delivery

1. **MVP** (Phases 1-3): Core migration working → Can migrate production data
2. **Add US4** (Phase 4): Progress tracking → Better UX for large migrations
3. **Add US5** (Phase 5): Dry-run mode → Safer migrations
4. **Add US3** (Phase 6): Validation → Confidence in results
5. **Polish** (Phase 7): Documentation → Production ready

**Full Feature**: ~62 hours (8.5 days)

### Parallel Team Strategy

With multiple developers:

1. **Together**: Complete Setup (Phase 1) and Core Migration structure (T006-T030)
2. **Split**:
   - Developer A: Complete Phase 2 (T031-T043) + Phase 3 Tag References (T044-T052)
   - Developer B: Phase 3 Structured Roles (T053-T059) + Slug Collision (T060-T063)
3. **Parallel user stories** (after Phase 3):
   - Developer A: US4 Progress Tracking (Phase 4)
   - Developer B: US5 Dry-Run (Phase 5)
   - Developer C: US3 Validation (Phase 6)
4. **Together**: Documentation and testing (Phase 7)

---

## Parallel Execution Examples

### Phase 2: Core Migration - Field Transformations

```bash
# After T018 is complete, launch these together (different sections of transformInfoPage):
Task T019: "Transform basic fields (title, slug with prefix, description)"
Task T020: "Transform metadata fields (dates, published status)"
Task T022: "Transform external links (direct text fields)"
Task T023: "Person-specific field transformations"
Task T024: "Organisation-specific field transformations"
Task T025: "Project-specific field transformations"

# Also in parallel with above:
Task T026: "HTTP helper function"
Task T039: "Progress logging"
Task T040: "Success logging"
Task T041: "Skip logging"
Task T042: "Failure logging"
```

### Phase 3: Tag References & Structured Roles

```bash
# After T044-T048 (core resolution logic) complete, launch these together:
Task T049: "Common tag references (methods, domains, countryTag, activity)"
Task T050: "Person tag references"
Task T051: "Organisation tag references"
Task T052: "Project tag references"

# Also in parallel:
Task T057: "Person structured roles parsing"
Task T058: "Organisation structured roles parsing"
Task T059: "Project structured roles parsing"
```

### Phase 7: Documentation & Testing

```bash
# All documentation tasks can run in parallel:
Task T090-T100: "All documentation files"
Task T101-T104: "All code documentation"

# All testing tasks can run in parallel:
Task T105-T113: "All edge case tests"
```

---

## Notes

- **[P] tasks** = different files/sections, no dependencies - can run in parallel
- **[Story] label** maps task to specific user story for traceability
- **Case sensitivity**: Column matching is case-insensitive (T007) for robustness
- **Page type routing**: Simplified to string matching on tag names (T011-T017)
- **All references are tags**: Simplifies resolution logic (single model lookup)
- **Structured roles are text**: No reference resolution needed (just JSON parsing)
- **Three mapping files**: Separate tracking per page type (person, organisation, project)
- **Independent stories**: US3, US4, US5 can be implemented in any order after Phase 3
- **Commit frequently**: After each task or logical group
- **Stop at checkpoints**: Validate independently before proceeding
- **MVP is 32 hours**: Phases 1-3 deliver core migration capability
