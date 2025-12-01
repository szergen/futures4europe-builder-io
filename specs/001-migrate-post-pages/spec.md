# Feature Specification: Post Pages Migration from Wix to Builder.io

**Feature Branch**: `001-migrate-post-pages`  
**Created**: 2025-11-29  
**Status**: Draft  
**Input**: User description: "I want to create the migrations for the post pages from Wix to builder."

## Clarifications

### Session 2025-11-29

- Q: How should the migration script handle posts that reference entities (tags, people, projects, organisations) that don't exist in Builder.io? → A: Migrate the post but omit the invalid references, log warnings with details
- Q: How should the migration handle posts with duplicate slugs? → A: Auto-append suffix to duplicate slugs (e.g., "my-post", "my-post-2", "my-post-3") and log
- Q: How should the migration handle posts that are missing required fields like title or slug? → A: Skip the post entirely, log as failed with missing field details
- Q: Which Wix export format should the migration script primarily support? → A: CSV only
- Q: How should image/media references be handled during migration? → A: Migrate only the image URLs as-is - images stay at original host (Wix/CDN)

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Data Migration Administrator Migrates Posts (Priority: P1)

A platform administrator needs to migrate existing post pages from Wix to Builder.io to complete the CMS transition while preserving all content, metadata, and relationships.

**Why this priority**: This is the core functionality that enables the platform to transition away from Wix. Without it, the migration cannot proceed and the platform cannot fully utilize Builder.io.

**Independent Test**: Can be fully tested by running the migration script on a test Wix data export, verifying the created posts in Builder.io match the source data exactly, and validating that all references and relationships are maintained.

**Acceptance Scenarios**:

1. **Given** a CSV export of Wix post pages exists in `data/exports/`, **When** administrator runs the migration script with a count (e.g., `node scripts/migrations/migrate-posts.js 10`), **Then** the specified number of posts are created in Builder.io with all fields mapped correctly
2. **Given** posts have already been migrated, **When** administrator re-runs the migration script, **Then** previously migrated posts are skipped (not duplicated) using the mapping file at `data/mappings/post-migration-mapping.json` and only new posts are created
3. **Given** a post contains references to tags, people, projects, or organisations, **When** the post is migrated, **Then** these references are converted to Builder.io Reference format with correct model and ID mappings
4. **Given** the migration is in progress, **When** a single post fails to migrate, **Then** the error is logged with details and the script continues with the next post
5. **Given** migration completes, **When** administrator reviews the output, **Then** a summary report shows total posts processed, successful migrations, skipped (already migrated), and failed with error details

---

### User Story 2 - Administrator Validates Migration Results (Priority: P2)

After migration, administrators need to validate that all post data was correctly transferred and can generate backup/rollback options.

**Why this priority**: Validation ensures data integrity and provides confidence that the migration was successful before retiring the Wix system.

**Independent Test**: Can be tested by comparing a sample of migrated posts in Builder.io against their Wix source data, verifying field-by-field accuracy and checking that all reference relationships are intact.

**Acceptance Scenarios**:

1. **Given** posts have been migrated, **When** administrator runs validation mode, **Then** the script compares Wix source data against Builder.io entries and reports any discrepancies
2. **Given** migration mapping file exists, **When** administrator queries a Wix post ID, **Then** the corresponding Builder.io ID and migration timestamp are returned
3. **Given** posts are migrated, **When** administrator generates a field mapping report, **Then** a summary document shows which Wix fields map to which Builder.io fields with transformation notes

---

### User Story 3 - Batch Migration with Progress Tracking (Priority: P2)

Administrators need to migrate large numbers of posts (hundreds or thousands) with progress tracking and ability to resume after interruption.

**Why this priority**: Production migrations may involve thousands of posts and take significant time. Reliable batch processing prevents data loss and reduces migration time.

**Independent Test**: Can be tested by starting a large migration, interrupting it mid-process, and resuming to verify it continues from the last successful migration without duplicating or losing data.

**Acceptance Scenarios**:

1. **Given** administrator wants to migrate all posts, **When** running script with `all` parameter (e.g., `node scripts/migrations/migrate-posts.js all`), **Then** all posts from Wix are migrated in batches with progress indicators
2. **Given** migration is interrupted (network failure, manual stop), **When** script is restarted, **Then** migration resumes from last successful post using the mapping file at `data/mappings/post-migration-mapping.json`
3. **Given** a large batch is being migrated, **When** migration is running, **Then** progress updates appear in console showing current post number, total posts, success/failure counts, and estimated time remaining
4. **Given** rate limiting concerns exist, **When** posts are being migrated, **Then** script includes configurable delay between API calls (default 200ms) to avoid rate limits

---

### User Story 4 - Dry-Run Mode for Safety (Priority: P3)

Administrators want to preview migration results without actually creating posts in Builder.io to validate the migration process.

**Why this priority**: Provides safety net for testing migration logic and field mappings before committing changes to Builder.io.

**Independent Test**: Can be tested by running dry-run mode and verifying no posts are created in Builder.io while the script outputs what would have been created.

**Acceptance Scenarios**:

1. **Given** administrator wants to test migration, **When** running script in dry-run mode (e.g., `node scripts/migrations/migrate-posts.js 5 --dry-run`), **Then** script validates data transformation but does not create posts in Builder.io
2. **Given** dry-run mode is active, **When** script processes posts, **Then** output shows the exact JSON payload that would be sent to Builder.io for each post
3. **Given** validation errors exist in source data, **When** dry-run processes posts, **Then** errors are identified and reported without stopping the entire process

---

### Edge Cases

- **Missing references**: When a post references a tag/person/project/organisation that doesn't exist in Builder.io, the post is migrated successfully but the invalid reference is omitted from the reference array. A warning is logged with the post ID, reference type, and missing entity ID for later resolution.
- **Duplicate slugs**: When multiple posts have the same slug, the first post keeps the original slug. Subsequent posts with the same slug automatically get a numeric suffix appended (e.g., "my-post", "my-post-2", "my-post-3"). Each modification is logged with the original and new slug for administrator review.
- **Missing required fields**: Posts missing required fields (title or slug) are skipped entirely and logged as failed migrations with details of which fields are missing. These posts can be fixed in the source data and re-migrated.
- **Image/media references**: Image URLs (postImage1-10, projectResultMedia) are migrated as-is without downloading or re-uploading image files. Images remain hosted at their original location (Wix Media or CDN), and only the URL references are transferred to Builder.io.

### Open Questions (Not Yet Clarified)

- How are posts with all three sub-types (post, event, project-result) differentiated during migration?
- How does the script handle very large rich text content (postContentRIch1-10 fields)?
- What happens when Wix API is temporarily unavailable during migration?
- How does the script handle posts that were partially migrated (some fields succeeded, some failed)?

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST read post data from Wix CSV export file `data/exports/Posts_Events_Project+Results+Pages_wix.csv`
- **FR-002**: System MUST transform Wix post data to Builder.io `post-page` model format following the mapping in `app/utils/builderPostUtils.ts`
- **FR-003**: System MUST create posts in Builder.io using the Write API with private API key
- **FR-004**: System MUST handle all post sub-types (post, event, project-result) by resolving `pageTypes` Wix IDs via `data/mappings/tag-migration-mapping.json` to determine classification based on the resolved tag name (e.g., "Post", "Event", "Project Result" tags indicate respective sub-types)
- **FR-005**: System MUST convert Wix reference IDs to Builder.io Reference format `{@type: "@builder.io/core:Reference", id: "...", model: "..."}`
- **FR-006**: System MUST maintain bidirectional mapping between Wix IDs and Builder.io IDs in a JSON mapping file at `data/mappings/post-migration-mapping.json`
- **FR-007**: System MUST skip already-migrated posts by checking the mapping file at `data/mappings/post-migration-mapping.json` before creation
- **FR-008**: System MUST log all migration operations (success, skip, failure) with timestamps
- **FR-009**: System MUST accept command-line arguments for count (number or "all") and optional flags (dry-run, validate)
- **FR-010**: System MUST handle the following reference field arrays: author, pageOwner, people, methods, domains, projects, organisations, speakers, moderators, projectResultAuthor, pageTypes
- **FR-011**: System MUST transform the following text fields: title, subtitle, slug, postContentRIch1-10
- **FR-012**: System MUST transform the following metadata fields: createdDate, lastUpdated, published status, \_owner
- **FR-013**: System MUST handle the following media fields: postImage1-10, projectResultMedia
- **FR-014**: System MUST handle event-specific fields: eventRegistration, eventStartDate, eventEndDate, speakers, moderators
- **FR-015**: System MUST handle project-result-specific fields: projectResultAuthor, projectResultMedia, projectResultPublicationDate
- **FR-016**: System MUST format slugs with `/post/` prefix for Builder.io compatibility
- **FR-017**: System MUST preserve Wix post ID in Builder.io data for reference tracking
- **FR-018**: System MUST provide summary statistics after migration completes
- **FR-019**: System MUST handle API errors gracefully and continue with remaining posts
- **FR-020**: System MUST implement rate limiting delay (configurable via RATE_LIMIT constant in script, default 200ms) between API calls
- **FR-021**: System MUST handle missing reference entities by omitting them from reference arrays and logging warnings with post ID, reference type, and missing entity ID
- **FR-022**: System MUST handle duplicate slugs by auto-appending numeric suffix (e.g., "-2", "-3") to ensure uniqueness and logging the original and modified slugs
- **FR-023**: System MUST validate that required fields (title, slug) are present before migration and skip posts missing these fields, logging them as failed with specific missing field details
- **FR-024**: System MUST migrate image/media field URLs as-is without downloading or re-uploading files, preserving the original hosted location

### Key Entities

- **Post Page**: Core content entity with title, subtitle, slug, rich text content (10 sections), images (10), metadata, and relationships
- **Reference**: Link to other entities (tags, people, projects, organisations) stored as Builder.io Reference objects
- **Migration Mapping**: Persistent record linking Wix post IDs to Builder.io post IDs for tracking and preventing duplicates
- **Page Type**: Sub-classification of posts (post, event, project-result) determining which fields are relevant

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Administrator can migrate a single test post and verify all 40+ fields are correctly mapped in Builder.io within 5 minutes of migration completion (excluding environment setup time, measured from command execution to field verification in Builder.io UI)
- **SC-002**: System successfully migrates 100% of posts without data loss when source data is valid
- **SC-003**: Migration script processes at least 100 posts per hour (accounting for rate limits)
- **SC-004**: Re-running migration script with same or larger count parameter results in 0 duplicate posts (100% skip rate for already-migrated content, verified via mapping file and Builder.io post count remaining unchanged)
- **SC-005**: All reference fields (tags, people, projects, organisations) maintain correct relationships after migration
- **SC-006**: Migration can be interrupted and resumed without requiring full restart or losing progress
- **SC-007**: Error messages provide sufficient detail to diagnose and fix source data issues
- **SC-008**: Migrated posts render without errors in PostPageComponent and all fields display values matching source CSV data, verified via manual spot-check of 10 representative posts (covering all 3 sub-types: post, event, project-result), with no code changes required to components

## Field Mapping Summary

### Wix to Builder.io Field Mapping

Based on `builderPostUtils.ts` transformation logic:

**Basic Fields**:

- `title` → `data.title`
- `subtitle` → `data.subtitle`
- `slug` → `data.slug` (formatted with `/post/` prefix)
- `wixId` → `data.wixId` (preserved for reference)

**Metadata**:

- `createdDate` → `createdDate` (root level, millisecond timestamp)
- `lastUpdated` → `lastUpdated` (root level, millisecond timestamp)
- `published` → `published` (root level, "published" status)
- `_owner` → `createdBy` (Builder.io user ID)

**Content**:

- `postContentRIch1-10` → `data.postContentRIch1-10` (HTML/rich text)
- `postImage1-10` → `data.postImage1-10` (image objects)

**References** (converted to Builder.io Reference format):

- `author[]` → `data.author[]` with `authorItem` wrapper
- `pageOwner[]` → `data.pageOwner[]` with `pageOwnerItem` wrapper
- `people[]` → `data.people[]` with `peopleItem` wrapper
- `methods[]` → `data.methods[]` with `methodsItem` wrapper
- `domains[]` → `data.domains[]` with `domainsItem` wrapper
- `projects[]` → `data.projects[]` with `projectsItem` wrapper
- `organisations[]` → `data.organisations[]` with `organisationsItem` wrapper
- `pageTypes[]` → `data.pageTypes[]` with `pageTypeItem` wrapper
- `countryTag` → `data.countryTag` (single reference)

**Event-Specific**:

- `speakers[]` → `data.speakers[]` with `speakersItem` wrapper
- `moderators[]` → `data.moderators[]` with `moderatorsItem` wrapper
- `eventRegistration` → `data.eventRegistration`
- `eventStartDate` → `data.eventStartDate` (timestamp)
- `eventEndDate` → `data.eventEndDate` (timestamp)

**Project Result-Specific**:

- `projectResultAuthor[]` → `data.projectResultAuthor[]` with `projectResultAuthorItem` wrapper
- `projectResultMedia` → `data.projectResultMedia` (media object)
- `projectResultPublicationDate` → `data.projectResultPublicationDate` (timestamp)

**Additional**:

- `internalLinks[]` → `data.internalLinks[]`
- `mediaFiles[]` → `data.mediaFiles[]`
- `recommendations` → `data.recommendations` (numeric count)

## Assumptions

1. Tag migration has already been completed (script at `scripts/migrations/migrate-tags.js`)
2. Wix post data will be exported as CSV file to `data/exports/` with consistent column structure matching Wix field names
3. Builder.io Private API key is available in `.env.local` as `BUILDER_PRIVATE_API_KEY`
4. The `post-page` model is already configured in Builder.io with correct schema
5. Referenced entities (tags for people, projects, organisations, methods, domains) already exist in Builder.io
6. The transformation logic in `app/utils/builderPostUtils.ts` represents the correct field mappings
7. Rate limiting allows at least 5 requests per second (200ms delay between requests)
8. Script will be run from the repository root directory
9. Node.js environment with required dependencies (dotenv, node-fetch, csv-parse) is available
10. Mapping file will be stored at `data/mappings/post-migration-mapping.json` following project conventions
11. Example reference data is available in `data/examples/example_post_page.json`
