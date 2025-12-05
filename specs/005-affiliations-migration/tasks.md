# Tasks: Affiliations Migration from Wix to Builder.io

**Input**: Design documents from `/specs/005-affiliations-migration/`  
**Prerequisites**: plan.md ✓, spec.md ✓, research.md ✓, data-model.md ✓, contracts/ ✓

**Tests**: Not requested - manual verification via migration script's `--verify` mode and quickstart validation.

**Organization**: Tasks grouped by user story (P1: Migration, P2: Fetch Switch) for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2)
- Exact file paths included in descriptions

## Path Conventions

This project uses Next.js structure:

- **Scripts**: `scripts/migrations/` for migration CLI
- **API Routes**: `app/api/` for Next.js API routes
- **Utilities**: `app/utils/` for helper functions
- **Data**: `data/exports/` (source), `data/mappings/` (generated)

---

## Phase 1: Setup

**Purpose**: Verify prerequisites are in place

- [x] T001 Verify `data/exports/Affiliations_wix.csv` exists and contains expected ~1,826 records
- [x] T002 Verify `data/mappings/tag-migration-mapping.json` exists and is complete
- [x] T003 Verify `BUILDER_PRIVATE_API_KEY` is configured in `.env.local`
- [x] T004 Verify `NEXT_PUBLIC_BUILDER_API_KEY` is configured in `.env.local`

---

## Phase 2: Foundational

**Purpose**: No blocking prerequisites - existing infrastructure supports this feature

**⚠️ Note**: All foundational infrastructure (Builder.io SDK, Redis cache, Wix client) already exists from previous migrations. No new foundational work required.

**Checkpoint**: Foundation ready - user story implementation can begin

---

## Phase 3: User Story 1 - Migrate Affiliations Data (Priority: P1) 🎯 MVP

**Goal**: Create migration script that migrates all affiliations from Wix CSV to Builder.io with proper tag reference mapping

**Independent Test**: Run `node scripts/migrations/migrate-affiliations.js 10` and verify 10 affiliations created in Builder.io with correct tag references

### Implementation for User Story 1

- [x] T005 [US1] Create migration script file `scripts/migrations/migrate-affiliations.js` with shebang, header docs, and require statements (copy structure from `migrate-tags.js`)
- [x] T006 [US1] Add configuration constants in `scripts/migrations/migrate-affiliations.js` (PRIVATE_API_KEY, MODEL_NAME="affiliations", CSV_FILE, MAPPING_FILE, TAG_MAPPING_FILE)
- [x] T007 [US1] Add colored console logging utilities in `scripts/migrations/migrate-affiliations.js` (log.info, log.success, log.error, log.warning, log.title)
- [x] T008 [US1] Implement `makeRequest()` helper function for Builder.io API calls in `scripts/migrations/migrate-affiliations.js`
- [x] T009 [US1] Implement `loadTagMapping()` function to load tag-migration-mapping.json in `scripts/migrations/migrate-affiliations.js`
- [x] T010 [US1] Implement `readCSV()` function with BOM handling in `scripts/migrations/migrate-affiliations.js`
- [x] T011 [US1] Implement `loadMapping()` and `saveMapping()` functions for incremental progress in `scripts/migrations/migrate-affiliations.js`
- [x] T012 [US1] Implement `createBuilderReference()` helper to create `{ "@type": "@builder.io/core:Reference", "id": "...", "model": "tag" }` format in `scripts/migrations/migrate-affiliations.js`
- [x] T013 [US1] Implement `resolveTagReference()` function that looks up Wix ID in tag mapping and returns Builder.io reference or null with warning in `scripts/migrations/migrate-affiliations.js`
- [x] T014 [US1] Implement `isMalformedPersonTag()` helper to detect JSON objects instead of UUIDs in `scripts/migrations/migrate-affiliations.js`
- [x] T015 [US1] Implement `transformAffiliationData()` function with all field mappings (Title→title, tags→references, role, extraIdentifier, ID→wixId) in `scripts/migrations/migrate-affiliations.js`
- [x] T016 [US1] Implement `createAffiliation()` function to POST to Builder.io Write API with error handling in `scripts/migrations/migrate-affiliations.js`
- [x] T017 [US1] Implement main `migrateAffiliations(count)` function with loop, skip-if-migrated check, rate limiting (200ms), and progress logging in `scripts/migrations/migrate-affiliations.js`
- [x] T018 [US1] Implement `printSummary()` function showing total/successful/failed/skipped/missing-refs counts in `scripts/migrations/migrate-affiliations.js`
- [x] T019 [US1] Implement `verifyMigration(count)` function to spot-check random migrated records against Builder.io in `scripts/migrations/migrate-affiliations.js`
- [x] T020 [US1] Implement `dryRun(count)` function that validates CSV parsing, tag mapping lookups, and transformation without calling Builder.io API in `scripts/migrations/migrate-affiliations.js`
- [x] T021 [US1] Implement `main()` CLI handler with argument parsing (count, --verify, --dry-run) and usage help in `scripts/migrations/migrate-affiliations.js`
- [x] T022 [US1] Test dry-run mode: `node scripts/migrations/migrate-affiliations.js 10 --dry-run` (validates without creating)
- [x] T023 [US1] Test migration with 10 records: `node scripts/migrations/migrate-affiliations.js 10`
- [x] T024 [US1] Verify migrated records in Builder.io admin console
- [x] T025 [US1] Run verification mode: `node scripts/migrations/migrate-affiliations.js --verify 5`
- [x] T026 [US1] Execute full migration: `node scripts/migrations/migrate-affiliations.js all`
- [x] T027 [US1] Verify `data/mappings/affiliation-migration-mapping.json` is generated with complete mappings

**Checkpoint**: User Story 1 complete - ~1,826 affiliations migrated to Builder.io with mapping file generated

---

## Phase 4: User Story 2 - Fetch Affiliations from Builder.io (Priority: P2)

**Goal**: Switch application to fetch affiliations from Builder.io instead of Wix while maintaining backwards-compatible response format

**Independent Test**: Call `GET /api/affiliations` and verify response contains Builder.io affiliations in Wix-compatible format

### Implementation for User Story 2

- [x] T028 [P] [US2] Create TypeScript interfaces in `app/utils/builderAffiliationUtils.ts` (BuilderAffiliation, BuilderReference, WixCompatibleAffiliation)
- [x] T029 [P] [US2] Implement `transformBuilderAffiliationToWixFormat()` function in `app/utils/builderAffiliationUtils.ts` to convert Builder.io format to `{ data: { ... } }` wrapper
- [x] T030 [US2] Implement `getAllBuilderAffiliations()` function with pagination (100 per page) in `app/utils/builderAffiliationUtils.ts`
- [x] T031 [US2] Add retry logic with exponential backoff to `getAllBuilderAffiliations()` in `app/utils/builderAffiliationUtils.ts`
- [x] T032 [US2] Update GET handler in `app/api/affiliations/route.ts` to import from builderAffiliationUtils instead of Wix client
- [x] T033 [US2] Update GET handler in `app/api/affiliations/route.ts` to call `getAllBuilderAffiliations()` on cache miss
- [x] T034 [US2] Update GET handler in `app/api/affiliations/route.ts` to transform response using `transformBuilderAffiliationToWixFormat()`
- [x] T035 [US2] Update POST handler in `app/api/affiliations/route.ts` to refresh cache from Builder.io instead of Wix
- [x] T036 [US2] Remove Wix client import (`getWixClientServerData`) from `app/api/affiliations/route.ts`
- [x] T037 [US2] Update `app/utils/tags.utls.ts` to remove Wix ID translation in `calculatePopularity()` for affiliations (Builder.io IDs used directly now)
- [ ] T038 [US2] Test GET endpoint: `curl http://localhost:3000/api/affiliations | jq '.length'`
- [ ] T039 [US2] Test POST endpoint: `curl -X POST http://localhost:3000/api/affiliations`
- [ ] T040 [US2] Verify tag popularity calculation still works: `curl http://localhost:3000/api/tags-with-popularity | jq '.[0]'`
- [x] T041 [US2] Verify no Wix dependencies: `grep -r "wixClient.*Affiliations\|queryDataItems.*Affiliations" app/`

**Checkpoint**: User Story 2 complete - application fetches affiliations from Builder.io with backwards-compatible format

---

## Phase 5: Polish & Validation

**Purpose**: Final verification and cleanup

- [ ] T042 Run quickstart.md Phase 1 validation checklist
- [ ] T043 Run quickstart.md Phase 2 validation checklist
- [x] T044 Verify `app/services/cacheWarmer.ts` uses `/api/affiliations` endpoint (no code changes needed - it already calls the API which now uses Builder.io)
- [ ] T045 Clear Redis cache and verify fresh fetch from Builder.io works
- [x] T046 Compare affiliation count: Wix CSV rows vs Builder.io entries vs API response

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - verification only
- **Foundational (Phase 2)**: N/A - infrastructure exists
- **User Story 1 (Phase 3)**: Can start immediately - independent migration
- **User Story 2 (Phase 4)**: Depends on US1 completion (data must exist in Builder.io)
- **Polish (Phase 5)**: Depends on US2 completion

### User Story Dependencies

- **User Story 1 (P1)**: Independent - creates data in Builder.io
- **User Story 2 (P2)**: Depends on US1 - reads data created by US1

### Within Each User Story

**User Story 1 (Migration Script)**:

```
T005-T007 (setup) → T008-T011 (utilities) → T012-T014 (reference helpers)
→ T015-T016 (core transform/create) → T017-T021 (main logic + dry-run) → T022-T027 (execute)
```

**User Story 2 (Fetch Switch)**:

```
T028-T029 [P] (types/transform) → T030-T031 (fetch function)
→ T032-T036 (API route updates) → T037 (popularity fix) → T038-T041 (testing)
```

### Parallel Opportunities

**Within User Story 1**:

- T005, T006, T007 are sequential (building the same file)
- Most tasks are sequential as they build on each other in the same file

**Within User Story 2**:

- T028 and T029 can run in parallel (different functions in same new file)
- T032-T036 are sequential (modifying same file)

---

## Parallel Example: User Story 2

```bash
# Launch type definitions and transform function in parallel:
Task: "T028 [P] [US2] Create TypeScript interfaces in app/utils/builderAffiliationUtils.ts"
Task: "T029 [P] [US2] Implement transformBuilderAffiliationToWixFormat() in app/utils/builderAffiliationUtils.ts"

# Then sequential tasks for API route updates
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup verification
2. Complete Phase 3: User Story 1 (Migration)
3. **STOP and VALIDATE**: Verify affiliations in Builder.io
4. Data is now in Builder.io - can deploy and continue using Wix API until ready for US2

### Full Delivery (User Story 1 + 2)

1. Complete Setup + User Story 1 → Data migrated
2. Complete User Story 2 → Application switched to Builder.io
3. Complete Polish → Full validation
4. Application no longer depends on Wix for affiliations

---

## Summary

| Phase        | Tasks        | Story | Description                           |
| ------------ | ------------ | ----- | ------------------------------------- |
| Setup        | T001-T004    | -     | Prerequisites verification            |
| Foundational | -            | -     | No new work (existing infrastructure) |
| User Story 1 | T005-T027    | US1   | Migration script (23 tasks)           |
| User Story 2 | T028-T041    | US2   | Fetch switch (14 tasks)               |
| Polish       | T042-T046    | -     | Validation (5 tasks)                  |
| **Total**    | **46 tasks** |       |                                       |

---

## Notes

- All migration script tasks (T005-T020) are in the same file - execute sequentially
- User Story 1 can be completed and validated independently before starting User Story 2
- No automated tests required - verification via `--verify` mode and manual testing
- Rate limiting (200ms delay) is built into migration to avoid Builder.io throttling
- Backwards compatibility is critical - response format must match existing Wix format
