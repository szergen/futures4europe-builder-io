# Feature Specification: Affiliations Migration from Wix to Builder.io

**Feature Branch**: `005-affiliations-migration`  
**Created**: 2024-12-04  
**Status**: Draft  
**Input**: User description: "Migrate Affiliations from Wix to Builder.io with tag reference mapping. The reference fields from Wix must be mapped to the corresponding Builder.io tags that were migrated previously."

## Current State

**Source Data**: Affiliations data is exported from Wix to `data/exports/Affiliations_wix.csv` with approximately 1,826 records.

**Wix CSV Structure**:

- `Title` - Description of the affiliation relationship
- `Created Date` - Timestamp of creation
- `projectTag` - Wix ID reference to a project tag (optional)
- `organisationTag` - Wix ID reference to an organisation tag (optional)
- `personTag` - Wix ID reference to a person tag (optional)
- `extraOrganisationTag` - Wix ID reference to an additional organisation tag (optional)
- `role` - Text field describing the role in the affiliation
- `extraIdentifier` - Text field for additional identification (e.g., "current", "participation", "projectOrganisationRole")
- `ID` - Wix affiliation ID
- `Updated Date` - Timestamp of last update
- `Owner` - Owner field (typically empty)

**Builder.io Affiliations Model** (already exists with ID: `cda5281bf4f9491490eca792af06b25b`):

- `title` (text) - Display name of the affiliation
- `projectTag` (reference to `tag` model) - Reference to project tag
- `organisationTag` (reference to `tag` model) - Reference to organisation tag
- `extraOrganisationTag` (reference to `tag` model) - Reference to extra organisation tag
- `personTag` (reference to `tag` model) - Reference to person tag
- `role` (text) - Role description
- `extraIdentifier` (text) - Extra identifier

**Tag Migration Mapping**: All tags have been migrated to Builder.io. The mapping file at `data/mappings/tag-migration-mapping.json` contains Wix tag ID → Builder.io tag ID mappings needed to resolve reference fields.

**Application Code**: The application currently fetches affiliations from Wix via `/api/affiliations` endpoint and uses them in:

- Cache warming (`cacheWarmer.ts`)
- Tag popularity calculations (`/api/tags-with-popularity`)
- Search context (`SearchContext.tsx`)
- Affiliations hook (`useFetchAffiliations.tsx`)

## Phased Delivery

This feature is split into two phases:

### Phase 1 (P1) - Migration: Migrate affiliation data from Wix CSV to Builder.io

- Create migration script similar to `migrate-tags.js`
- Transform Wix CSV data to Builder.io format
- Map Wix tag IDs to Builder.io tag IDs using the mapping file
- Create affiliations in Builder.io via Write API
- Generate affiliation mapping file for reference

### Phase 2 (P2) - Fetch Switch: Update application to fetch affiliations from Builder.io

- Update `/api/affiliations` endpoint to fetch from Builder.io
- Update cache warming to use Builder.io affiliations
- Update tag popularity calculations to use Builder.io affiliations
- Ensure all affiliation consumers work with Builder.io data

**Note**: Creating and updating affiliations from the UI (POST operations) is explicitly out of scope and will be handled in a separate specification.

## Clarifications

### Session 2024-12-04

- **Q: Response Format Compatibility** → A: Transform Builder.io response to match existing Wix format for backwards compatibility. The `/api/affiliations` endpoint will fetch from Builder.io but transform the response to maintain the `{ data: { ... } }` wrapper structure that consumers expect.
- **Q: Migration Failure Handling** → A: Continue on failure - log error, skip failed record, continue with remaining records. This is optimal for large datasets (~1,826 records) and allows the migration to complete even if some records have issues.
- **Q: Post-Migration Verification** → A: Sample verification - spot-check 5-10 random records for data accuracy after migration completes. The migration script will also output a summary report with counts of successful/failed/skipped records.

## User Scenarios & Testing _(mandatory)_

### User Story 1 - P1: Migrate Affiliations Data to Builder.io (Priority: P1)

A system administrator needs to migrate all affiliations from the Wix CSV export to Builder.io, ensuring that all tag references (projectTag, organisationTag, personTag, extraOrganisationTag) are correctly mapped to their corresponding Builder.io tag IDs.

**Why this priority**: This is the foundation for the entire migration. Without the data being migrated to Builder.io, the application cannot switch to using Builder.io as the source of truth for affiliations.

**Independent Test**: Can be fully tested by running the migration script on a subset of data (e.g., 10 records), then verifying in Builder.io that the affiliations exist with correctly mapped tag references.

**Acceptance Scenarios**:

1. **Given** the Wix CSV file exists at `data/exports/Affiliations_wix.csv`, **When** the migration script is run with count argument, **Then** the specified number of affiliations are created in Builder.io's `affiliations` model
2. **Given** an affiliation has a `projectTag` Wix ID, **When** migrating, **Then** the projectTag field in Builder.io contains a reference to the corresponding Builder.io tag ID from the mapping file
3. **Given** an affiliation has a `personTag` Wix ID, **When** migrating, **Then** the personTag field in Builder.io contains a reference to the corresponding Builder.io tag ID
4. **Given** an affiliation has a `organisationTag` Wix ID, **When** migrating, **Then** the organisationTag field in Builder.io contains a reference to the corresponding Builder.io tag ID
5. **Given** an affiliation has a `extraOrganisationTag` Wix ID, **When** migrating, **Then** the extraOrganisationTag field in Builder.io contains a reference to the corresponding Builder.io tag ID
6. **Given** a tag reference Wix ID is not found in the mapping file, **When** migrating, **Then** the script logs a warning with the missing Wix ID and creates the affiliation without that reference (setting the reference field to null)
7. **Given** an affiliation was previously migrated, **When** running the migration again, **Then** the script skips the already-migrated affiliation
8. **Given** the migration completes, **Then** a mapping file is generated at `data/mappings/affiliation-migration-mapping.json` containing Wix ID → Builder.io ID mappings

---

### User Story 2 - P2: Fetch Affiliations from Builder.io (Priority: P2)

The application needs to fetch affiliations from Builder.io instead of Wix, ensuring all downstream features (cache, popularity calculations, search) work with Builder.io data.

**Why this priority**: This completes the migration by switching the application to use Builder.io as the source of truth. Depends on P1 being completed first.

**Independent Test**: Can be tested by updating the `/api/affiliations` endpoint, calling it, and verifying the response contains Builder.io affiliations with resolved tag references.

**Acceptance Scenarios**:

1. **Given** affiliations exist in Builder.io, **When** the `/api/affiliations` GET endpoint is called, **Then** it returns all affiliations from Builder.io instead of Wix
2. **Given** affiliations are fetched from Builder.io, **When** cache warming runs, **Then** the affiliations cache (`affiliations.json`) is populated with Builder.io data
3. **Given** affiliations are in cache, **When** tag popularity is calculated, **Then** the calculation uses Builder.io affiliations and Builder.io tag IDs (no Wix ID translation needed)
4. **Given** Builder.io API is unavailable, **When** affiliations are requested, **Then** system returns cached data if available or an appropriate error message
5. **Given** the `/api/affiliations` POST endpoint is called, **When** cache needs refreshing, **Then** it fetches fresh data from Builder.io and updates the cache

---

### Edge Cases

- **Missing tag mapping**: When a Wix tag ID in the CSV is not found in the tag-migration-mapping.json, the script logs a warning and creates the affiliation with that reference field set to null
- **Empty reference fields**: When a reference field (e.g., projectTag) is empty in the CSV, the corresponding Builder.io reference field is left empty
- **Malformed personTag data**: Some records have malformed personTag data (e.g., `{"id":"","name":"","arole":""}` JSON object instead of a Wix ID) - these should be detected and handled gracefully (set to null with warning)
- **Duplicate affiliations**: If the same affiliation (by Wix ID) is present multiple times in CSV, only the first occurrence is migrated
- **Builder.io API rate limiting**: The script implements rate limiting (200ms delay between requests) to avoid API throttling
- **Large dataset**: With ~1,826 records, the script supports both incremental migration (count argument) and full migration ("all" argument)

## Requirements _(mandatory)_

### Functional Requirements

**Phase 1 - Migration**:

- **FR-001**: System MUST provide a CLI migration script at `scripts/migrations/migrate-affiliations.js` following the same pattern as `migrate-tags.js`
- **FR-002**: Script MUST accept count argument (number or "all") to specify how many affiliations to migrate
- **FR-003**: Script MUST read affiliations from `data/exports/Affiliations_wix.csv`
- **FR-004**: Script MUST load tag mappings from `data/mappings/tag-migration-mapping.json`
- **FR-005**: Script MUST transform Wix affiliation data to Builder.io format with field mapping:
  - `Title` → `name` (content entry name) and `data.title`
  - `projectTag` (Wix ID) → `data.projectTag` (Builder.io reference using mapped ID)
  - `organisationTag` (Wix ID) → `data.organisationTag` (Builder.io reference)
  - `extraOrganisationTag` (Wix ID) → `data.extraOrganisationTag` (Builder.io reference)
  - `personTag` (Wix ID) → `data.personTag` (Builder.io reference)
  - `role` → `data.role`
  - `extraIdentifier` → `data.extraIdentifier`
  - `ID` → `data.wixId` (for reference)
- **FR-006**: Script MUST create Builder.io references in the format: `{ "@type": "@builder.io/core:Reference", "id": "<builderId>", "model": "tag" }`
- **FR-007**: Script MUST skip affiliations that have already been migrated (check mapping file)
- **FR-008**: Script MUST generate mapping file at `data/mappings/affiliation-migration-mapping.json`
- **FR-009**: Script MUST log warnings for any Wix tag IDs not found in the tag mapping file
- **FR-010**: Script MUST implement rate limiting (200ms delay between API calls)
- **FR-011**: Script MUST save progress incrementally to the mapping file after each successful creation
- **FR-012**: Script MUST handle malformed personTag values (JSON objects instead of UUIDs) by setting the reference to null
- **FR-013**: Script MUST display colored console output for progress, success, warnings, and errors
- **FR-014**: Script MUST continue processing remaining records when individual record migration fails (log error and skip)
- **FR-015**: Script MUST output a summary report at completion showing: total records, successful migrations, failed migrations, skipped (already migrated), and missing tag references
- **FR-016**: Script MUST support verification mode to spot-check migrated records (e.g., `--verify 10` to check 10 random records)

**Phase 2 - Fetch Switch**:

- **FR-017**: System MUST update `/api/affiliations` GET endpoint to fetch from Builder.io's `affiliations` model instead of Wix
- **FR-018**: System MUST update `/api/affiliations` POST endpoint to refresh cache from Builder.io
- **FR-019**: System MUST update `cacheWarmer.ts` to fetch affiliations from Builder.io
- **FR-020**: System MUST update tag popularity calculation to work with Builder.io affiliations (no Wix ID translation needed post-migration)
- **FR-021**: System MUST handle Builder.io pagination for fetching all affiliations (use limit/offset or Builder.io SDK's getAll)
- **FR-022**: System MUST transform Builder.io affiliations response to match existing Wix format (preserving `{ data: { ... } }` wrapper structure) for backwards compatibility
- **FR-023**: System MUST use Builder.io public API key for read operations in the API endpoint
- **FR-024**: System MUST create a Builder.io utility function for fetching affiliations (similar to existing tag utilities)

### Key Entities

- **Affiliation (Builder.io model)**: Represents a relationship between entities (person, organisation, project)

  - **title**: Display name describing the affiliation (e.g., "John Doe -to- Project X")
  - **projectTag**: Optional reference to a project tag
  - **organisationTag**: Optional reference to an organisation tag
  - **personTag**: Optional reference to a person tag
  - **extraOrganisationTag**: Optional reference to an additional organisation tag
  - **role**: Text describing the role in the relationship
  - **extraIdentifier**: Additional identifier (e.g., "current", "former", "participation", "coordination", "projectOrganisationRole")
  - **wixId**: Original Wix ID for migration reference (stored in data)

- **Affiliation Mapping Entry**: Records migration relationship between Wix and Builder.io
  - **wixId**: Original affiliation ID from Wix
  - **builderId**: New affiliation ID in Builder.io
  - **title**: Affiliation title for human reference

## Success Criteria _(mandatory)_

### Measurable Outcomes

**Phase 1 - Migration**:

- **SC-001**: Migration script successfully creates all ~1,826 affiliations in Builder.io
- **SC-002**: All valid tag references (projectTag, organisationTag, personTag, extraOrganisationTag) are correctly mapped to Builder.io tag IDs
- **SC-003**: Mapping file `data/mappings/affiliation-migration-mapping.json` is generated with complete Wix → Builder.io ID mappings
- **SC-004**: Script completes full migration in under 30 minutes (including rate limiting)
- **SC-005**: Zero data loss - all text fields (title, role, extraIdentifier) are preserved exactly

**Phase 2 - Fetch Switch**:

- **SC-006**: `/api/affiliations` endpoint returns affiliations from Builder.io with response time under 3 seconds
- **SC-007**: Tag popularity calculations produce identical results before and after the switch (verified by comparing mention counts)
- **SC-008**: Cache warming successfully fetches and caches Builder.io affiliations
- **SC-009**: After code changes, no code paths in the application reference Wix for affiliation read operations (verified via grep)
- **SC-010**: Zero affiliation-related errors during a one-week observation period after switching to Builder.io

## Assumptions

- The Builder.io `affiliations` model already exists with the correct field structure and reference configurations
- All tags referenced in affiliations have been migrated to Builder.io and exist in the tag-migration-mapping.json
- The Wix CSV export at `data/exports/Affiliations_wix.csv` is complete and up-to-date
- Builder.io API has sufficient rate limits and quota to handle the migration (~1,826 write operations)
- Builder.io references can point to the `tag` model (modelId: `a275c515afdb401b8b06f9fafe9bcbce`)
- Redis cache infrastructure remains unchanged and continues to work with Builder.io-sourced affiliation data
- The BUILDER_PRIVATE_API_KEY environment variable is configured with write permissions

## Dependencies

- Builder.io Write API must be accessible and functional
- `data/mappings/tag-migration-mapping.json` must exist and be complete
- `data/exports/Affiliations_wix.csv` must be available
- Redis cache service must be operational (for P2)
- Builder.io public API key must be configured for read operations (for P2)

## Out of Scope

- Creating new affiliations from the UI (will be separate spec)
- Updating existing affiliations from the UI (will be separate spec)
- Deleting affiliations
- Migrating affiliation-related images or media files
- Real-time synchronization between Wix and Builder.io
- UI/UX changes to affiliation display components
- Rollback mechanism to revert to Wix affiliations
- Historical audit trail of affiliation changes
