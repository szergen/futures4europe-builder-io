# Implementation Plan: Post Pages Migration from Wix to Builder.io

**Branch**: `001-migrate-post-pages` | **Date**: 2025-11-29 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-migrate-post-pages/spec.md`

## Summary

Create a Node.js migration script to transfer post pages (including events and project results) from Wix to Builder.io, following the proven pattern established by the tag migration (`scripts/migrations/migrate-tags.js`). The script will read CSV exports, transform data to Builder.io format, handle references, support dry-run mode, provide progress tracking, and enable resume-after-interruption capability.

**Key Technical Approach**:

- Pattern-match existing `migrate-tags.js` architecture
- CSV parsing with `csv-parse/sync`
- Builder.io Write API with private API key
- Bidirectional ID mapping for duplicate prevention
- Rate-limited batch processing (200ms default delay)
- Comprehensive logging and error handling

## Technical Context

**Language/Version**: Node.js 18+ (matches existing project runtime)

**Primary Dependencies**:

- `dotenv` - Environment variable management (`.env.local` for API keys)
- `node-fetch@2.7.0` - HTTP requests to Builder.io Write API
- `csv-parse` - CSV file parsing for Wix exports
- Existing: `app/utils/builderPostUtils.ts` - Field mapping reference

**Storage**:

- **Input**: CSV file at `data/exports/Posts_Events_Project+Results+Pages_wix.csv` (Wix export containing all post pages including events and project results)
- **Reference Lookup**: `data/mappings/tag-migration-mapping.json` (for resolving pageTypes and other tag references)
- **Output**: JSON mapping file at `data/mappings/post-migration-mapping.json`
- **Target**: Builder.io `post-page` model via Write API

**Testing**: Manual validation (CLI execution, dry-run mode, comparison against Builder.io)

**Target Platform**: CLI script executed from repository root on Node.js 18+

**Project Type**: Single-purpose migration script (not integrated into web application)

**Performance Goals**:

- Process at least 100 posts/hour (accounting for 200ms rate limiting)
- Handle thousands of posts in batches with progress tracking
- Resume capability for interrupted migrations

**Constraints**:

- Rate limiting: 200ms delay between API calls (configurable)
- CSV format only (no JSON support in v1)
- Must not duplicate posts on re-run
- Must preserve all 40+ fields per post
- No data loss acceptable

**Scale/Scope**:

- Expected volume: Hundreds to thousands of posts
- 40+ fields per post (basic, metadata, content, references, sub-type specific)
- 10+ reference types requiring Builder.io Reference format conversion

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### ✅ Principle I: Migration-First Development

- **Compliant**: Script uses Builder.io Write API exclusively, no new Wix CMS dependencies
- **Alignment**: Advances Wix→Builder.io migration for posts (Phase 2 milestone)

### ✅ Principle II: Content Type Parity

- **Compliant**: Follows exact pattern from `migrate-tags.js`
- **Reusability**: Architecture designed for replication to projects, persons, organisations
- **Consistency**: Command-line interface, logging, and error handling match tag migration

### ✅ Principle III: Backward Compatibility

- **Compliant**: Uses transformation logic from `app/utils/builderPostUtils.ts`
- **Validation**: Migrated posts work with existing `PostPageComponent` without modifications
- **Format**: Builder.io data transformed to match Wix-format component expectations

### ✅ Principle IV: Data Integrity & Validation

- **Compliant**: Dry-run mode (FR-009), validation before upload (FR-023), comprehensive logging
- **Reversibility**: Mapping file enables tracking, duplicate prevention via ID checks
- **Error Handling**: Individual post failures don't block migration (FR-019)

### ✅ Principle V: Documentation & Migration Tracking

- **Compliant**:
  - Script location: `scripts/migrations/migrate-posts.js` ✓
  - Mapping file: `data/mappings/post-migration-mapping.json` ✓
  - Export location: `data/exports/` ✓
  - Will create: `docs/migration/posts/POST_MIGRATION_GUIDE.md`
- **Tracking**: Mapping file records all migrations with timestamps

### ✅ Principle VI: Performance & Caching

- **Compliant**: Rate limiting prevents API throttling, progress tracking for large batches
- **Optimization**: Resume capability avoids re-processing, mapping file provides skip logic

###✅ Principle VII: Testing & Quality Assurance

- **Compliant**:
  - Dry-run mode for testing without API writes
  - Manual validation against Builder.io entries
  - Field-by-field comparison capability (User Story 2)
  - Error logging with detailed diagnostics

**Constitution Compliance**: ✅ All 7 principles satisfied

## Project Structure

### Documentation (this feature)

```text
specs/001-migrate-post-pages/
├── spec.md              # ✅ Created - Feature specification
├── plan.md              # ✅ This file - Implementation plan
├── quickstart.md        # 📋 TODO - Quick reference guide
└── field-mapping.md     # 📋 TODO - Detailed CSV→Builder.io field mapping
```

### Source Code (repository root)

```text
scripts/
└── migrations/
    ├── migrate-tags.js       # ✅ Existing - Reference pattern
    └── migrate-posts.js      # 📋 TODO - Post migration script (THIS FEATURE)

data/
├── exports/
│   ├── Tags_wix.csv                              # ✅ Existing - Tag export example
│   └── Posts_Events_Project+Results+Pages_wix.csv  # ✅ Provided - Post export with all sub-types
├── mappings/
│   ├── tag-migration-mapping.json   # ✅ Existing - Tag mapping example
│   └── post-migration-mapping.json  # 📋 Generated - Post ID mapping
└── examples/
    └── example_post_page.json        # ✅ Existing - Builder.io format reference

app/utils/
└── builderPostUtils.ts       # ✅ Existing - Transformation reference

docs/migration/posts/
└── POST_MIGRATION_GUIDE.md  # 📋 TODO - Migration documentation
```

**Structure Decision**: Single migration script at `scripts/migrations/migrate-posts.js` following the established pattern from `migrate-tags.js`. No changes to existing app structure required.

## Architecture Overview

### Migration Script Architecture

```text
migrate-posts.js
├── Configuration
│   ├── Environment (BUILDER_PRIVATE_API_KEY from .env.local)
│   ├── File paths (CSV_FILE, MAPPING_FILE)
│   ├── API settings (rate limit, endpoints)
│   └── Logging utilities (colored console output)
│
├── Core Functions
│   ├── loadCSV() - Parse Wix export CSV
│   ├── loadMapping() - Load/initialize mapping file
│   ├── saveMapping() - Persist mapping updates
│   ├── transformPost() - Convert Wix→Builder.io format
│   │   ├── transformBasicFields()
│   │   ├── transformMetadata()
│   │   ├── transformContent()
│   │   ├── transformReferences()
│   │   └── validateRequired()
│   ├── checkDuplicateSlug() - Detect & handle slug collisions
│   ├── resolveReferences() - Look up Builder.io IDs for references
│   ├── createPost() - Write API call to Builder.io
│   └── makeRequest() - HTTP helper with auth
│
├── Migration Modes
│   ├── migrate() - Standard migration with API writes
│   ├── dryRun() - Validation without API calls
│   └── validate() - Compare Wix vs Builder.io data
│
├── Utilities
│   ├── Progress tracking - Console updates with ETA
│   ├── Error handling - Individual post failures logged, continue
│   ├── Summary report - Final statistics (success/skip/fail counts)
│   └── Resume logic - Skip already-migrated posts via mapping
│
└── CLI Interface
    ├── Parse arguments (count, flags)
    ├── Display help text
    └── Execute selected mode
```

### Data Flow

```text
1. INPUT
   ├── Read: data/exports/Posts_Events_Project+Results+Pages_wix.csv
   ├── Parse: CSV → JavaScript objects
   ├── Load: data/mappings/post-migration-mapping.json (for duplicate detection)
   └── Load: data/mappings/tag-migration-mapping.json (for reference resolution)

2. TRANSFORM (per post)
   ├── Validate: Required fields (title, slug)
   ├── Check: Already migrated? (mapping file)
   ├── Transform: Wix format → Builder.io format
   │   ├── Basic fields (title, subtitle, slug + /post/ prefix)
   │   ├── Metadata (dates as timestamps, published status)
   │   ├── Content (rich text HTML, image URLs)
   │   └── References (convert IDs to Builder.io Reference objects)
   ├── Resolve: Reference IDs (lookup in mapping files)
   ├── Handle: Missing references (omit, log warning)
   └── Handle: Duplicate slugs (append -2, -3, etc.)

3. WRITE (if not dry-run)
   ├── API: POST /api/v1/write/post-page
   ├── Auth: Bearer ${BUILDER_PRIVATE_API_KEY}
   ├── Rate limit: Wait 200ms before next request
   └── Response: Extract Builder.io ID

4. TRACK
   ├── Update: mapping file (Wix ID ↔ Builder.io ID)
   ├── Log: Success/skip/failure with details
   └── Count: Processed/successful/skipped/failed

5. OUTPUT
   ├── Save: Updated mapping file
   ├── Display: Summary report
   └── Exit: Status code (0 = success, 1 = errors occurred)
```

### Reference Resolution Strategy

```text
Reference Types (10+):
├── author, pageOwner, people → tag model (person type)
├── methods, domains → tag model (activity/domain types)
├── projects → tag model (project type)
├── organisations → tag model (organisation type)
├── speakers, moderators → tag model (person type)
├── projectResultAuthor → tag model (person type)
├── **pageTypes → tag model (page type)** - **CRITICAL: Determines sub-type (post/event/project-result)**
└── countryTag → tag model (country type)

Resolution Process:
1. Extract Wix reference IDs from CSV columns
2. Look up Builder.io ID in `data/mappings/tag-migration-mapping.json`
   - **Important**: The CSV file `Posts_Events_Project+Results+Pages_wix.csv` contains Wix IDs for pageTypes
   - These Wix IDs must be resolved to Builder.io IDs using the tag migration mapping
   - The pageTypes field determines whether the post is a regular post, event, or project result
3. If found: Create Builder.io Reference object
   {
     "@type": "@builder.io/core:Reference",
     "id": "<builder-id>",
     "model": "tag"
   }
4. If NOT found:
   - Omit reference from array
   - Log warning: "Post [wix-id]: Missing reference [type]:[wix-ref-id]"
5. Wrap in array with item wrapper:
   [{authorItem: {<Reference>}}, ...]
```

## Field Transformation Matrix

### CSV Column → Builder.io Mapping

Based on `app/utils/builderPostUtils.ts` transformation logic:

| CSV Column (Wix)               | Builder.io Path                     | Transform                          | Notes                                                                |
| ------------------------------ | ----------------------------------- | ---------------------------------- | -------------------------------------------------------------------- |
| `_id`                          | `data.wixId`                        | Direct                             | Preserved for tracking                                               |
| `title`                        | `data.title`                        | Direct                             | Required, validation                                                 |
| `subtitle`                     | `data.subtitle`                     | Direct                             | Optional                                                             |
| `slug`                         | `data.slug`                         | Add `/post/` prefix                | Required, uniqueness check                                           |
| `_createdDate`                 | `createdDate`                       | Parse timestamp                    | Root level, milliseconds                                             |
| `_updatedDate`                 | `lastUpdated`                       | Parse timestamp                    | Root level, milliseconds                                             |
| `published`                    | `published`                         | Map to "published"                 | Root level                                                           |
| `_owner`                       | `createdBy`                         | Direct                             | Builder.io user ID                                                   |
| `postContentRIch1-10`          | `data.postContentRIch1-10`          | Direct HTML                        | 10 rich text fields                                                  |
| `postImage1-10`                | `data.postImage1-10`                | Parse JSON/URL                     | 10 image object fields                                               |
| `author` (IDs)                 | `data.author[]`                     | Resolve + wrap `authorItem`        | Reference array                                                      |
| `pageOwner` (IDs)              | `data.pageOwner[]`                  | Resolve + wrap `pageOwnerItem`     | Reference array                                                      |
| `people` (IDs)                 | `data.people[]`                     | Resolve + wrap `peopleItem`        | Reference array                                                      |
| `methods` (IDs)                | `data.methods[]`                    | Resolve + wrap `methodsItem`       | Reference array                                                      |
| `domains` (IDs)                | `data.domains[]`                    | Resolve + wrap `domainsItem`       | Reference array                                                      |
| `projects` (IDs)               | `data.projects[]`                   | Resolve + wrap `projectsItem`      | Reference array                                                      |
| `organisations` (IDs)          | `data.organisations[]`              | Resolve + wrap `organisationsItem` | Reference array                                                      |
| `pageTypes` (IDs)              | `data.pageTypes[]`                  | Resolve + wrap `pageTypeItem`      | **Reference array, determines sub-type (post/event/project-result)** |
| `countryTag` (ID)              | `data.countryTag`                   | Resolve, single ref                | Not array                                                            |
| `speakers` (IDs)               | `data.speakers[]`                   | Resolve + wrap `speakersItem`      | Event-specific                                                       |
| `moderators` (IDs)             | `data.moderators[]`                 | Resolve + wrap `moderatorsItem`    | Event-specific                                                       |
| `eventRegistration`            | `data.eventRegistration`            | Direct                             | Event-specific URL                                                   |
| `eventStartDate`               | `data.eventStartDate`               | Parse timestamp                    | Event-specific                                                       |
| `eventEndDate`                 | `data.eventEndDate`                 | Parse timestamp                    | Event-specific                                                       |
| `projectResultAuthor` (IDs)    | `data.projectResultAuthor[]`        | Resolve + wrap                     | Project result-specific                                              |
| `projectResultMedia`           | `data.projectResultMedia`           | Parse JSON/URL                     | Project result-specific                                              |
| `projectResultPublicationDate` | `data.projectResultPublicationDate` | Parse timestamp                    | Project result-specific                                              |
| `internalLinks`                | `data.internalLinks[]`              | Parse JSON array                   | Optional                                                             |
| `mediaFiles`                   | `data.mediaFiles[]`                 | Parse JSON array                   | Optional                                                             |
| `recommendations`              | `data.recommendations`              | Parse integer                      | Numeric count                                                        |

**Total**: 40+ fields requiring transformation

## Error Handling Strategy

### Error Categories

| Error Type                 | Handling                              | Example                             | Impact                               |
| -------------------------- | ------------------------------------- | ----------------------------------- | ------------------------------------ |
| **Critical - Abort**       | Exit immediately                      | Missing API key, CSV file not found | Script terminates                    |
| **Validation - Skip Post** | Skip post, log details, continue      | Missing title/slug, malformed data  | Post not migrated, logged            |
| **API - Retry/Skip**       | Log error, continue to next           | Network timeout, rate limit hit     | Post logged as failed, retryable     |
| **Reference - Warn**       | Omit reference, log warning, continue | Reference ID not in tag mapping     | Post migrated without that reference |
| **Slug Collision**         | Auto-fix (append -2), log, continue   | Duplicate slug detected             | Post migrated with modified slug     |

### Logging Levels

```javascript
log.info(); // ℹ Blue - Progress updates, informational
log.success(); // ✓ Green - Successful operations
log.error(); // ✗ Red - Failures, critical issues
log.warning(); // ⚠ Yellow - Warnings, missing refs, auto-fixes
log.title(); // Cyan/Bold - Section headers, summary
```

### Recovery Mechanisms

1. **Resume After Interruption**: Mapping file tracks completed posts, script skips on restart
2. **Partial Failure**: Individual post failures don't block remaining posts
3. **Dry-Run Validation**: Test full migration without API writes
4. **Manual Retry**: Failed posts logged with Wix IDs for re-export and retry

## Implementation Phases

### Phase 0: Research & Preparation ✅ COMPLETE

**Objective**: Understand requirements, patterns, and constraints

**Deliverables**:

- ✅ Spec clarified (5 critical questions answered)
- ✅ Constitution check passed (all 7 principles)
- ✅ Existing `migrate-tags.js` analyzed for patterns
- ✅ Field mappings documented from `builderPostUtils.ts`

**Time Estimate**: Complete

---

### Phase 1: Core Script Development 📋 NEXT

**Objective**: Create functional migration script with basic capabilities

**Tasks**:

1. **Script Scaffold** (1 hour)

   - Create `scripts/migrations/migrate-posts.js`
   - Copy boilerplate from `migrate-tags.js` (env, logging, CLI parsing)
   - Define configuration constants (file paths, API settings)

2. **CSV Parsing** (2 hours)

   - Implement `loadCSV()` function
   - Parse CSV with `csv-parse/sync` from `data/exports/Posts_Events_Project+Results+Pages_wix.csv`
   - Handle large files (streaming if needed)
   - Validate CSV structure (required columns present: title, slug, pageTypes, etc.)

3. **Mapping File Management** (1 hour)

   - Implement `loadMapping()` - load or initialize JSON file
   - Implement `saveMapping()` - atomic file writes
   - Structure: `{wixToBuilder: {}, builderToWix: {}, migratedCount: 0, lastMigrated: null}`

4. **Basic Field Transformation** (3 hours)

   - Implement `transformPost()` core function
   - Transform basic fields (title, subtitle, slug + prefix)
   - Transform metadata (dates as timestamps, published status)
   - Transform content fields (postContentRIch1-10, postImage1-10)
   - Add validation for required fields (title, slug)

5. **Builder.io API Integration** (2 hours)

   - Implement `makeRequest()` HTTP helper
   - Implement `createPost()` Write API call
   - Handle authentication (Bearer token)
   - Parse response for Builder.io ID

6. **Basic Migration Loop** (2 hours)

   - Implement `migrate()` main function
   - Loop through CSV rows
   - Check if already migrated (mapping file)
   - Transform, create, track
   - Add rate limiting (200ms delay)

7. **CLI Interface** (1 hour)
   - Parse command-line arguments (count, flags)
   - Implement help text display
   - Basic error handling and exit codes

**Deliverables**:

- ✅ Functional migration script (migrate 1-N posts)
- ✅ Duplicate prevention via mapping file
- ✅ Basic logging and error handling
- ✅ Rate limiting

**Time Estimate**: 12 hours

**Testing Criteria**:

- Successfully migrate 10 test posts
- Verify all basic fields in Builder.io
- Re-run script: 10 posts skipped (no duplicates)
- Mapping file correctly tracks Wix↔Builder.io IDs

---

### Phase 2: Reference Resolution & Advanced Features 📋 PLANNED

**Objective**: Handle references, slug collisions, and edge cases

**Tasks**:

1. **Reference Resolution** (4 hours)

   - Load tag mapping file (`data/mappings/tag-migration-mapping.json`)
   - Implement `resolveReferences()` function
   - Look up Builder.io IDs for all reference fields (including pageTypes from CSV)
   - **Critical**: pageTypes field contains Wix IDs that determine sub-type (post/event/project-result)
   - These Wix pageTypes IDs must be resolved to Builder.io references using tag-migration-mapping.json
   - Handle missing references (omit + log warning)
   - Create Builder.io Reference objects with correct wrapper
   - Support all 10+ reference types

2. **Slug Collision Detection** (2 hours)

   - Implement `checkDuplicateSlug()` function
   - Query Builder.io for existing slugs
   - Auto-append numeric suffix (-2, -3, etc.)
   - Log slug modifications

3. **Dry-Run Mode** (2 hours)

   - Implement `dryRun()` function
   - Skip API calls, display transformation output
   - Validate data transformations
   - Show JSON payload that would be sent

4. **Progress Tracking** (2 hours)

   - Console progress updates (current/total)
   - Success/skip/fail counters
   - Estimated time remaining (ETA)
   - Summary report at completion

5. **Enhanced Error Handling** (2 hours)
   - Categorize errors (critical/validation/API/reference)
   - Individual post failure logging with details
   - Continue on error (don't abort migration)
   - Failed posts list for retry

**Deliverables**:

- ✅ Reference resolution for all 10+ reference types
- ✅ Slug collision handling
- ✅ Dry-run mode (--dry-run flag)
- ✅ Progress tracking and ETA
- ✅ Comprehensive error handling

**Time Estimate**: 12 hours

**Testing Criteria**:

- Migrate posts with references: all references resolved correctly
- Migrate posts with duplicate slugs: auto-suffixed (-2, -3)
- Dry-run 100 posts: no API calls, transformations validated
- Interrupt migration at post 50: resume continues at post 51

---

### Phase 3: Validation & Documentation 📋 PLANNED

**Objective**: Add validation mode and complete documentation

**Tasks**:

1. **Validation Mode** (4 hours)

   - Implement `validate()` function
   - Query Builder.io for migrated posts
   - Compare Wix CSV data vs Builder.io data
   - Field-by-field comparison
   - Report discrepancies (missing fields, incorrect values)
   - Generate validation report

2. **Field Mapping Report** (2 hours)

   - Generate `field-mapping.md` from spec
   - Document CSV column → Builder.io path for all 40+ fields
   - Include transformation notes, edge cases
   - Reference resolution examples

3. **Quick Start Guide** (2 hours)

   - Create `specs/001-migrate-post-pages/quickstart.md`
   - Step-by-step migration instructions
   - Common error troubleshooting
   - Example commands with outputs

4. **Migration Documentation** (3 hours)

   - Create `docs/migration/posts/POST_MIGRATION_GUIDE.md`
   - Comprehensive guide following tag migration pattern
   - Prerequisites, setup, execution, validation
   - Troubleshooting section
   - FAQ

5. **Script Documentation** (1 hour)
   - Add comprehensive inline comments
   - Update file header with usage examples
   - Document all functions with JSDoc

**Deliverables**:

- ✅ Validation mode (--validate flag)
- ✅ Field mapping documentation
- ✅ Quick start guide
- ✅ Comprehensive migration guide
- ✅ Inline code documentation

**Time Estimate**: 12 hours

**Testing Criteria**:

- Validation mode compares 100 posts: reports 0 discrepancies
- Documentation tested by following guide from scratch
- All edge cases documented with examples

---

### Phase 4: Production Readiness 📋 PLANNED

**Objective**: Final testing, optimization, and production deployment

**Tasks**:

1. **Full Migration Test** (3 hours)

   - Export all posts from Wix to CSV
   - Run dry-run on full dataset
   - Execute full migration
   - Validate results
   - Document issues and fixes

2. **Performance Optimization** (2 hours)

   - Profile script execution time
   - Optimize CSV parsing (streaming for large files)
   - Batch API calls if possible (within rate limits)
   - Memory usage optimization

3. **Edge Case Testing** (3 hours)

   - Test with missing references
   - Test with duplicate slugs
   - Test with missing optional fields
   - Test interruption and resume
   - Test with malformed CSV data

4. **Final Documentation** (2 hours)

   - Update README with post migration status
   - Update constitution compliance notes
   - Add to migration summary docs
   - Create backup/rollback plan

5. **Production Execution** (2 hours)
   - Final dry-run on production data
   - Execute production migration
   - Monitor progress
   - Validate results
   - Update migration status

**Deliverables**:

- ✅ Production-ready script
- ✅ Full migration completed
- ✅ Validation passed
- ✅ Documentation updated
- ✅ Migration status tracked

**Time Estimate**: 12 hours

**Success Criteria**:

- All posts migrated successfully (100% or documented failures)
- Zero duplicates on re-run
- All references resolved
- Documentation complete
- Constitution compliance maintained

---

## Timeline Summary

| Phase     | Duration     | Status  | Deliverable                       |
| --------- | ------------ | ------- | --------------------------------- |
| Phase 0   | Complete     | ✅      | Research & specification          |
| Phase 1   | 12 hours     | 📋 Next | Core migration script             |
| Phase 2   | 12 hours     | 📋      | References & advanced features    |
| Phase 3   | 12 hours     | 📋      | Validation & documentation        |
| Phase 4   | 12 hours     | 📋      | Production readiness              |
| **Total** | **48 hours** |         | **Production migration complete** |

**Recommended Approach**:

- Phase 1-2: 3 days (core functionality)
- Phase 3: 2 days (validation & docs)
- Phase 4: 2 days (production deployment)
- **Total**: 7 working days

## Risk Assessment

| Risk                              | Impact   | Mitigation                                                  |
| --------------------------------- | -------- | ----------------------------------------------------------- |
| **CSV format mismatch**           | High     | Validate CSV structure early, provide clear error messages  |
| **Missing references**            | Medium   | Handled gracefully (omit + warn), documented for manual fix |
| **API rate limiting**             | Medium   | 200ms delay enforced, resume capability for interruptions   |
| **Duplicate slugs**               | Medium   | Auto-suffix mechanism, logging for review                   |
| **Data loss**                     | Critical | Dry-run mode, mapping file tracking, validation mode        |
| **Large file memory**             | Low      | Streaming CSV parser if needed, batch processing            |
| **Complex field transformations** | Medium   | Reference existing `builderPostUtils.ts`, extensive testing |

## Success Metrics

Aligned with Success Criteria from spec.md:

- **SC-001**: ✅ Single test post migrated and verified in <5 minutes
- **SC-002**: ✅ 100% migration success rate (valid source data)
- **SC-003**: ✅ 100+ posts/hour processing rate
- **SC-004**: ✅ 0 duplicates on re-run (100% skip rate)
- **SC-005**: ✅ All references correctly resolved
- **SC-006**: ✅ Resume capability functional
- **SC-007**: ✅ Detailed error messages for debugging
- **SC-008**: ✅ Migrated posts display correctly (no component changes)

## Next Steps

1. **Immediate**: Begin Phase 1 - Core Script Development

   - Create script scaffold
   - Implement CSV parsing
   - Set up mapping file management

2. **After Phase 1**: Test with small dataset (10-20 posts)

   - Validate basic field transformations
   - Verify Builder.io API integration
   - Confirm duplicate prevention

3. **After Phase 2**: Test with references and edge cases

   - Validate reference resolution
   - Test slug collision handling
   - Verify dry-run and progress tracking

4. **After Phase 3**: Final validation and documentation review

   - Run validation mode on migrated posts
   - Review all documentation for completeness
   - Prepare for production execution

5. **Phase 4**: Production migration
   - Execute on full dataset
   - Monitor and validate
   - Update project documentation

**Command to proceed**: `/speckit.tasks` to generate detailed task breakdown
