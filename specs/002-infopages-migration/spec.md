# Feature Specification: Info Pages Migration from Wix to Builder.io

**Feature Branch**: `002-infopages-migration`  
**Created**: 2025-12-01  
**Status**: Draft  
**Input**: User description: "I want to create the migrations for infoPages, the same as it was done for post pages in branch 001-... and now we need to migrate the info pages from Project_Organisation_Person+Info+Pages_wix.csv"

## Clarifications

### Session 2025-12-01

- Q: When a CSV row has multiple Page Types IDs that include more than one valid page type (e.g., both Person AND Organisation type IDs), what should the migration script do? → A: Use the first recognized type ID (Person > Organisation > Project priority order) and log a warning
- Q: How should the migration script parse and store structured roles fields (Person Organisation Roles, Organisation Project Roles, Project Organisation Roles) in Builder.io? → A: Parse as JSON array of objects, preserving the {"organisation":"X","role":"Y"} structure in Builder.io
- Q: Should the migration script handle case-insensitive column name matching to be more resilient to CSV export variations? → A: Yes, use case-insensitive column name matching (e.g., "title", "Title", "TITLE" all work)
- Q: Should the migration script attempt to resolve organisation/person names in structured roles fields to Builder.io Reference IDs, or store them as plain text strings? → A: Store as plain text strings exactly as they appear in CSV (no resolution)
- Q: How should the migration script handle CSV rows with empty/missing Page Types field? → A: Skip the row entirely and log as error with row ID for manual review and source data correction
- Q: What types of entities do the reference fields in info pages point to, and how should model resolution work? → A: All reference fields point to tags only. Use tag-migration-mapping.json to resolve all Wix reference IDs to Builder.io tag IDs

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Data Migration Administrator Migrates Info Pages (Priority: P1)

A platform administrator needs to migrate existing info pages (Person, Organisation, and Project pages) from Wix to Builder.io to complete the CMS transition while preserving all content, metadata, and relationships.

**Why this priority**: This is the core functionality that enables the platform to transition info pages away from Wix. These pages are essential for displaying information about people, organisations, and projects on the platform.

**Independent Test**: Can be fully tested by running the migration script on the Wix data export, verifying the created info pages in Builder.io match the source data exactly, and validating that all references and relationships are maintained.

**Acceptance Scenarios**:

1. **Given** a CSV export of Wix info pages exists at `data/exports/Project_Organisation_Person+Info+Pages_wix.csv`, **When** administrator runs the migration script with a count (e.g., `node scripts/migrations/migrate-infopages.js 10`), **Then** the specified number of info pages are created in Builder.io with all fields mapped correctly
2. **Given** info pages have already been migrated, **When** administrator re-runs the migration script, **Then** previously migrated pages are skipped (not duplicated) using the mapping file at `data/mappings/infopage-migration-mapping.json` and only new pages are created
3. **Given** an info page contains references to tags (methods, domains, types, etc.), **When** the page is migrated, **Then** these tag references are converted to Builder.io Reference format using the tag-migration-mapping.json
4. **Given** the migration is in progress, **When** a single info page fails to migrate, **Then** the error is logged with details and the script continues with the next page
5. **Given** migration completes, **When** administrator reviews the output, **Then** a summary report shows total info pages processed, successful migrations, skipped (already migrated), and failed with error details

---

### User Story 2 - Separate Migration for Different Info Page Types (Priority: P1)

Administrators need to migrate Person, Organisation, and Project pages separately to different Builder.io models based on their page type.

**Why this priority**: Each info page type (Person, Organisation, Project) has distinct field structures and requirements, and must be stored in separate Builder.io data models for proper organization and retrieval.

**Independent Test**: Can be tested by running the migration and verifying that Person pages go to the `person-page` model, Organisation pages to the `organisation-page` model, and Project pages to the `project-page` model in Builder.io.

**Acceptance Scenarios**:

1. **Given** CSV contains Person, Organisation, and Project pages mixed together, **When** migration script processes pages, **Then** each page is routed to the correct Builder.io model based on its `Page Types` field value
2. **Given** a row has `Page Types` containing a Person type ID, **When** the row is migrated, **Then** it is created in the `person-page` model with person-specific field mappings
3. **Given** a row has `Page Types` containing an Organisation type ID, **When** the row is migrated, **Then** it is created in the `organisation-page` model with organisation-specific field mappings
4. **Given** a row has `Page Types` containing a Project type ID, **When** the row is migrated, **Then** it is created in the `project-page` model with project-specific field mappings
5. **Given** separate mapping files exist for each info page type, **When** administrator queries a Wix ID, **Then** the script identifies which model the page was migrated to and returns the corresponding Builder.io ID

---

### User Story 3 - Administrator Validates Migration Results (Priority: P2)

After migration, administrators need to validate that all info page data was correctly transferred and can generate backup/rollback options.

**Why this priority**: Validation ensures data integrity and provides confidence that the migration was successful before retiring the Wix system.

**Independent Test**: Can be tested by comparing a sample of migrated info pages in Builder.io against their Wix source data, verifying field-by-field accuracy and checking that all reference relationships are intact.

**Acceptance Scenarios**:

1. **Given** info pages have been migrated, **When** administrator runs validation mode, **Then** the script compares Wix source data against Builder.io entries and reports any discrepancies
2. **Given** migration mapping file exists, **When** administrator queries a Wix info page ID, **Then** the corresponding Builder.io ID, model type, and migration timestamp are returned
3. **Given** info pages are migrated, **When** administrator generates a field mapping report, **Then** a summary document shows which Wix fields map to which Builder.io fields with transformation notes

---

### User Story 4 - Batch Migration with Progress Tracking (Priority: P2)

Administrators need to migrate large numbers of info pages (hundreds or thousands) with progress tracking and ability to resume after interruption.

**Why this priority**: Production migrations may involve thousands of info pages and take significant time. Reliable batch processing prevents data loss and reduces migration time.

**Independent Test**: Can be tested by starting a large migration, interrupting it mid-process, and resuming to verify it continues from the last successful migration without duplicating or losing data.

**Acceptance Scenarios**:

1. **Given** administrator wants to migrate all info pages, **When** running script with `all` parameter (e.g., `node scripts/migrations/migrate-infopages.js all`), **Then** all info pages from Wix are migrated in batches with progress indicators
2. **Given** migration is interrupted (network failure, manual stop), **When** script is restarted, **Then** migration resumes from last successful page using the mapping file
3. **Given** a large batch is being migrated, **When** migration is running, **Then** progress updates appear in console showing current page number, total pages, success/failure counts, and page type being processed
4. **Given** rate limiting concerns exist, **When** info pages are being migrated, **Then** script includes configurable delay between API calls (default 200ms) to avoid rate limits

---

### User Story 5 - Dry-Run Mode for Safety (Priority: P3)

Administrators want to preview migration results without actually creating info pages in Builder.io to validate the migration process.

**Why this priority**: Provides safety net for testing migration logic and field mappings before committing changes to Builder.io.

**Independent Test**: Can be tested by running dry-run mode and verifying no info pages are created in Builder.io while the script outputs what would have been created.

**Acceptance Scenarios**:

1. **Given** administrator wants to test migration, **When** running script in dry-run mode (e.g., `node scripts/migrations/migrate-infopages.js 5 --dry-run`), **Then** script validates data transformation but does not create pages in Builder.io
2. **Given** dry-run mode is active, **When** script processes info pages, **Then** output shows the exact JSON payload that would be sent to Builder.io for each page
3. **Given** validation errors exist in source data, **When** dry-run processes pages, **Then** errors are identified and reported without stopping the entire process

---

### Edge Cases

- **Missing references**: When an info page references a tag ID that doesn't exist in `tag-migration-mapping.json` (tag not yet migrated to Builder.io), the page is migrated successfully but the invalid reference is omitted from the reference array. A warning is logged with the page ID, reference field name, and missing Wix tag ID for later resolution.
- **Duplicate slugs**: When multiple info pages have the same slug within the same page type, the first page keeps the original slug. Subsequent pages with the same slug automatically get a numeric suffix appended (e.g., "john-doe", "john-doe-2", "john-doe-3"). Each modification is logged with the original and new slug for administrator review.
- **Missing required fields**: Info pages missing required fields (title or slug) are skipped entirely and logged as failed migrations with details of which fields are missing. These pages can be fixed in the source data and re-migrated.
- **Missing Page Types field**: CSV rows with empty or missing `Page Types` field are skipped entirely and logged as errors with the row ID, since the script cannot determine which Builder.io model to use without a valid page type.
- **Image/media references**: Image URLs are migrated as-is without downloading or re-uploading image files. Images remain hosted at their original location (Wix Media or CDN), and only the URL references are transferred to Builder.io.
- **Mixed page types**: When a CSV row contains multiple valid page type IDs (e.g., both Person and Organisation type IDs), the script uses the first recognized type ID following priority order (Person > Organisation > Project) to determine the target model. A warning is logged including the Wix ID, all detected page types, and which type was selected for migration.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST read info page data from Wix CSV export file `data/exports/Project_Organisation_Person+Info+Pages_wix.csv`
- **FR-001a**: System MUST use case-insensitive column name matching when reading CSV headers to handle variations in column name casing
- **FR-002**: System MUST identify page type (Person, Organisation, or Project) by parsing `Page Types` field and resolving type IDs via `data/mappings/tag-migration-mapping.json`
- **FR-002a**: System MUST skip CSV rows with empty or missing `Page Types` field and log them as errors with row ID, since the target Builder.io model cannot be determined
- **FR-002b**: System MUST apply priority order (Person > Organisation > Project) when multiple valid page type IDs exist in a single row, selecting the first recognized type and logging a warning with all detected types
- **FR-003**: System MUST route pages to the correct Builder.io model based on page type:
  - Person pages → `person-page` model
  - Organisation pages → `organisation-page` model
  - Project pages → `project-page` model
- **FR-004**: System MUST transform Wix info page data to Builder.io format with model-specific field mappings
- **FR-005**: System MUST create info pages in Builder.io using the Write API with private API key
- **FR-006**: System MUST convert Wix tag reference IDs to Builder.io Reference format `{@type: "@builder.io/core:Reference", id: "...", model: "tag"}` using mappings from `data/mappings/tag-migration-mapping.json`
- **FR-006a**: System MUST resolve all reference fields (methods, domains, personType, organisationType, projectFunded, etc.) as tag references since all referenced entities are tags
- **FR-007**: System MUST maintain separate bidirectional mapping files for each page type at:
  - `data/mappings/person-migration-mapping.json`
  - `data/mappings/organisation-migration-mapping.json`
  - `data/mappings/project-migration-mapping.json`
- **FR-008**: System MUST skip already-migrated info pages by checking the appropriate mapping file before creation
- **FR-009**: System MUST log all migration operations (success, skip, failure) with timestamps and page type
- **FR-010**: System MUST accept command-line arguments for count (number or "all") and optional flags (dry-run, validate)
- **FR-011**: System MUST format slugs with appropriate prefix for Builder.io compatibility:
  - Person pages: `/person/` prefix
  - Organisation pages: `/organisation/` prefix
  - Project pages: `/project/` prefix
- **FR-012**: System MUST preserve Wix page ID in Builder.io data for reference tracking
- **FR-013**: System MUST provide summary statistics after migration completes, broken down by page type
- **FR-014**: System MUST handle API errors gracefully and continue with remaining pages
- **FR-015**: System MUST implement rate limiting delay (configurable, default 200ms) between API calls
- **FR-016**: System MUST handle missing tag references (Wix tag IDs not found in tag-migration-mapping.json) by omitting them from reference arrays and logging warnings with page ID, field name, and missing Wix tag ID
- **FR-017**: System MUST handle duplicate slugs within the same page type by auto-appending numeric suffix
- **FR-018**: System MUST validate that required fields (title, slug) are present before migration and skip pages missing these fields
- **FR-019**: System MUST migrate image/media field URLs as-is without downloading or re-uploading files
- **FR-020**: System MUST parse structured roles fields from CSV as JSON arrays of objects (e.g., `[{"organisation":"X","role":"Y"}]`) and preserve this structure in Builder.io data
- **FR-020a**: System MUST store organisation/person names within structured roles fields as plain text strings without attempting to resolve them to Builder.io Reference IDs

### Person Page Field Requirements

- **FR-021**: System MUST map Person-specific fields including:
  - Basic: title, slug, description
  - Tag references: methods, domains, person (self-reference tag), personType, personProjectCoordination, personProjectParticipation, personOrganisation, personOrganisationFormer, activity, countryTag
  - Structured roles: personOrganisationRoles, personOrganisationRolesFormer (JSON arrays of organisation/role text objects, not references)
  - External links: linkedinLink, websiteLink, researchGateLink, orcidLink

### Organisation Page Field Requirements

- **FR-022**: System MUST map Organisation-specific fields including:
  - Basic: title, slug, description
  - Tag references: organisationType, organisationProject, organisationPeople, organisationHasMember, organisationMemberOf, activity, countryTag
  - Structured roles: organisationProjectRoles, organisationPeopleRoles (JSON arrays of organisation/person and role text objects, not references)
  - Date: organisationEstablishedDate
  - External links: websiteLink

### Project Page Field Requirements

- **FR-023**: System MUST map Project-specific fields including:
  - Basic: title, slug, description
  - Tag references: projectFunded, projectCoordinator, projectParticipantTeam, projectOrganisation, activity, countryTag
  - Structured roles: projectOrganisationRoles (JSON array of organisation/role text objects, not references)
  - Dates: projectStartDate, projectEndDate
  - Content: postContent1-10, postImage1-10
  - External links: websiteLink

### Key Entities

- **Person Page**: Info page for individuals with profile information, tag-based affiliations, and external links
- **Organisation Page**: Info page for organizations with tag-based relationships, roles, and establishment information
- **Project Page**: Info page for projects with timeline, tag-based participants, coordinators, and rich content sections
- **Tag Reference**: Link to tag entities stored as Builder.io Reference objects (`{@type: "@builder.io/core:Reference", id: "...", model: "tag"}`)
- **Migration Mapping**: Persistent record linking Wix info page IDs to Builder.io page IDs for tracking and preventing duplicates (separate files per page type)
- **Page Type**: Classification of info pages (person, organisation, project) determining which fields are relevant and which Builder.io model to use

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Administrator can migrate a single test info page and verify all fields are correctly mapped in Builder.io within 5 minutes of migration completion
- **SC-002**: System successfully migrates 100% of info pages without data loss when source data is valid
- **SC-003**: Migration script processes at least 100 info pages per hour (accounting for rate limits)
- **SC-004**: Re-running migration script with same or larger count results in 0 duplicate pages (100% skip rate for already-migrated content)
- **SC-005**: All reference fields maintain correct relationships after migration across all three page types
- **SC-006**: Migration can be interrupted and resumed without requiring full restart or losing progress
- **SC-007**: Error messages provide sufficient detail to diagnose and fix source data issues
- **SC-008**: Migrated info pages render without errors in their respective page components and all fields display values matching source CSV data
- **SC-009**: Person, Organisation, and Project pages are correctly distributed to their respective Builder.io models with 100% accuracy
- **SC-010**: All three page types can be migrated in a single script execution without manual intervention

## Field Mapping Summary

### Common Fields (All Info Page Types)

**Basic Fields**:

- `Title` → `data.title`
- `slug` → `data.slug` (with appropriate prefix: `/person/`, `/organisation/`, or `/project/`)
- `ID` → `data.wixId` (preserved for reference)
- `Description` → `data.description` (HTML/rich text)

**Metadata**:

- `Created Date` → `createdDate` (millisecond timestamp)
- `Updated Date` → `lastUpdated` (millisecond timestamp)
- `published` → `published` ("published" status)
- `Owner` → `createdBy` (Builder.io user ID)

**Common References** (all are tag references):

- `Methods` → `data.methods[]` with Builder.io tag Reference format
- `Domains` → `data.domains[]` with Builder.io tag Reference format
- `Country Tag` → `data.countryTag` (single tag reference)
- `Activity` → `data.activity[]` (tag references to activity tags)

### Person Page Specific Fields

**References** (all are tag references):

- `Person` → `data.person` (tag reference to person's own profile tag)
- `Person Type` → `data.personType[]` (tag references)
- `Person Project Coordonation` → `data.personProjectCoordination[]` (tag references to project tags)
- `Person Project Participation` → `data.personProjectParticipation[]` (tag references to project tags)
- `Person Organisation` → `data.personOrganisation[]` (tag references to organisation tags)
- `Person Organisation - Former` → `data.personOrganisationFormer[]` (tag references to organisation tags)

**Structured Roles** (stored as JSON text, not references):

- `Person Organisation Roles` → `data.personOrganisationRoles` (JSON array of objects: `[{"organisation":"X","role":"Y"}]`, organisation/role stored as text strings)
- `Person Organisation Roles Former` → `data.personOrganisationRolesFormer` (JSON array of objects: `[{"organisation":"X","role":"Y"}]`, organisation/role stored as text strings)

**External Links**:

- `Linkedin Link` → `data.linkedinLink`
- `Website Link` → `data.websiteLink`
- `Research Gate Link` → `data.researchGateLink`
- `ORCID Link` → `data.orcidLink`

### Organisation Page Specific Fields

**References** (all are tag references):

- `Organisation Type` → `data.organisationType[]` (tag references)
- `Organisation Project` → `data.organisationProject[]` (tag references to project tags)
- `Organisation People` → `data.organisationPeople[]` (tag references to person tags)
- `Organisation Has Member` → `data.organisationHasMember[]` (tag references)
- `Organisation Member Of` → `data.organisationMemberOf[]` (tag references)

**Structured Roles** (stored as JSON text, not references):

- `Organisation Project Roles` → `data.organisationProjectRoles` (JSON array of objects: `[{"organisation":"X","role":"Y"}]`, organisation/role stored as text strings)
- `Organisation People Roles` → `data.organisationPeopleRoles` (JSON array of objects: `[{"organisation":"X","role":"Y"}]`, organisation/role stored as text strings)

**Dates**:

- `Organisation Established Date` → `data.organisationEstablishedDate` (timestamp)

**External Links**:

- `Website Link` → `data.websiteLink`

### Project Page Specific Fields

**References** (all are tag references):

- `Project Funded` → `data.projectFunded[]` (tag references to funding tags)
- `Project Coordinator` → `data.projectCoordinator[]` (tag references to organisation/person tags)
- `Project Participant Team` → `data.projectParticipantTeam[]` (tag references to organisation/person tags)
- `Project Organisation` → `data.projectOrganisation[]` (tag references to organisation tags)

**Structured Roles** (stored as JSON text, not references):

- `Project Organisation Roles` → `data.projectOrganisationRoles` (JSON array of objects: `[{"organisation":"X","role":"Y"}]`, organisation/role stored as text strings)

**Dates**:

- `Project Start Date` → `data.projectStartDate` (timestamp)
- `Project End Date` → `data.projectEndDate` (timestamp)

**Content**:

- `Post Content Rich 1-10` → `data.postContentRich1-10` (HTML/rich text)
- `Post Image 1-10` → `data.postImage1-10` (image objects)

**External Links**:

- `Website Link` → `data.websiteLink`

**Additional**:

- `Internal Links` → `data.internalLinks[]`
- `Media Files` → `data.mediaFiles[]`

## Assumptions

1. Tag migration has already been completed (script at `scripts/migrations/migrate-tags.js`)
2. Post pages migration has already been completed (script at `scripts/migrations/migrate-posts.js`)
3. Wix info page data will be exported as CSV file to `data/exports/Project_Organisation_Person+Info+Pages_wix.csv` with consistent column structure
4. Builder.io Private API key is available in `.env.local` as `BUILDER_PRIVATE_API_KEY`
5. The `person-page`, `organisation-page`, and `project-page` models are already configured in Builder.io with correct schemas
6. All tags referenced by info pages have been migrated and are available in `data/mappings/tag-migration-mapping.json`
7. Rate limiting allows at least 5 requests per second (200ms delay between requests)
8. Script will be run from the repository root directory
9. Node.js environment with required dependencies (dotenv, node-fetch, csv-parse) is available
10. The CSV contains columns matching expected field names (case-insensitive): `Title`, `ID`, `slug`, `Page Types`, etc.
11. The script will follow the same architecture pattern as `scripts/migrations/migrate-posts.js` for consistency

## Dependencies

- **Tag migration must be completed first** (provides tag-migration-mapping.json for both page type resolution and all tag reference resolution)
- Post pages migration should be completed first (provides reference IDs if internal links reference post pages)
- Builder.io models (`person-page`, `organisation-page`, `project-page`) must be configured with appropriate schemas
- All info page reference fields resolve to tags only - no cross-references between Person/Organisation/Project pages
