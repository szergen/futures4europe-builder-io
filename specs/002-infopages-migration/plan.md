# Implementation Plan: Info Pages Migration from Wix to Builder.io

**Branch**: `002-infopages-migration` | **Date**: 2025-12-01 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-infopages-migration/spec.md`

## Summary

Create a Node.js migration script to transfer info pages (Person, Organisation, and Project pages) from Wix to Builder.io, following the proven pattern established by the post pages migration (`scripts/migrations/migrate-posts.js`). The script will read CSV exports, route pages to different Builder.io models based on type, transform data to Builder.io format, handle tag references, support dry-run mode, provide progress tracking, and enable resume-after-interruption capability.

**Key Technical Approach**:

- Pattern-match existing `migrate-posts.js` architecture
- CSV parsing with `csv-parse/sync` and case-insensitive column matching
- **Simplified multi-model routing**:
  - Extract Page Types tag ID from CSV
  - Look up tag name in tag-migration-mapping.json
  - Simple string matching: "person info" → `person-page`, "organisation info" → `organisation-page`, "project info" → `project-page`
  - Priority order only for rare mixed-type edge cases
- **Three separate mapping files** for tracking each page type independently
- Builder.io Write API with private API key
- Tag-only reference resolution (major simplification)
- Structured roles stored as JSON text (no reference resolution)
- Rate-limited batch processing (200ms default delay)
- Comprehensive logging and error handling

## Technical Context

**Language/Version**: Node.js 18+ (matches existing project runtime)

**Primary Dependencies**:

- `dotenv` - Environment variable management (`.env.local` for API keys)
- `node-fetch@2.7.0` - HTTP requests to Builder.io Write API
- `csv-parse` - CSV file parsing for Wix exports
- Pattern reference: `scripts/migrations/migrate-posts.js`

**Storage**:

- **Input**: CSV file at `data/exports/Project_Organisation_Person+Info+Pages_wix.csv` (Wix export containing all three info page types mixed together)
- **Reference Lookup**: `data/mappings/tag-migration-mapping.json` (for resolving page types and ALL tag references)
- **Output**: Three JSON mapping files:
  - `data/mappings/person-migration-mapping.json`
  - `data/mappings/organisation-migration-mapping.json`
  - `data/mappings/project-migration-mapping.json`
- **Target**: Builder.io models via Write API:
  - `person-page` model
  - `organisation-page` model
  - `project-page` model

**Testing**: Manual validation (CLI execution, dry-run mode, comparison against Builder.io)

**Target Platform**: CLI script executed from repository root on Node.js 18+

**Project Type**: Single-purpose migration script (not integrated into web application)

**Performance Goals**:

- Process at least 100 info pages/hour (accounting for 200ms rate limiting)
- Handle thousands of pages in batches with progress tracking
- Resume capability for interrupted migrations
- Single script execution migrates all three page types without manual intervention

**Constraints**:

- Rate limiting: 200ms delay between API calls (configurable)
- CSV format only (no JSON support in v1)
- Must not duplicate pages on re-run (per page type)
- Must preserve all fields per page type (varying by type)
- No data loss acceptable
- Case-insensitive column name matching for CSV robustness

**Scale/Scope**:

- Expected volume: Hundreds to thousands of info pages across three types
- Three distinct page type models with different field requirements
- All references resolve to tags only (no cross-page-type references)
- Structured roles fields stored as JSON text (no reference resolution needed)
- Page type determination via `Page Types` CSV field resolution

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### ✅ Principle I: Migration-First Development

- **Compliant**: Script uses Builder.io Write API exclusively, no new Wix CMS dependencies
- **Alignment**: Advances Wix→Builder.io migration for info pages (critical Phase 2 milestone)

### ✅ Principle II: Content Type Parity

- **Compliant**: Follows exact pattern from `migrate-posts.js`
- **Reusability**: Architecture extends proven migration pattern to info pages
- **Consistency**: Command-line interface, logging, and error handling match post/tag migrations

### ✅ Principle III: Backward Compatibility

- **Compliant**: Migrated pages work with existing page components without modifications
- **Validation**: Info pages will render correctly in their respective components
- **Format**: Builder.io data transformed to match expected component format

### ✅ Principle IV: Data Integrity & Validation

- **Compliant**: Dry-run mode, validation before upload, comprehensive logging
- **Reversibility**: Three mapping files enable tracking, duplicate prevention via ID checks per type
- **Error Handling**: Individual page failures don't block migration

### ✅ Principle V: Documentation & Migration Tracking

- **Compliant**:
  - Script location: `scripts/migrations/migrate-infopages.js` ✓
  - Mapping files: `data/mappings/{person,organisation,project}-migration-mapping.json` ✓
  - Export location: `data/exports/` ✓
  - Will create: `docs/migration/infopages/INFOPAGES_MIGRATION_GUIDE.md`
- **Tracking**: Three mapping files record all migrations with timestamps per page type

### ✅ Principle VI: Performance & Caching

- **Compliant**: Rate limiting prevents API throttling, progress tracking for large batches
- **Optimization**: Resume capability avoids re-processing, mapping files provide skip logic per type

### ✅ Principle VII: Testing & Quality Assurance

- **Compliant**:
  - Dry-run mode for testing without API writes
  - Manual validation against Builder.io entries
  - Field-by-field comparison capability per page type
  - Error logging with detailed diagnostics

**Constitution Compliance**: ✅ All 7 principles satisfied

## Project Structure

### Documentation (this feature)

```text
specs/002-infopages-migration/
├── spec.md              # ✅ Created - Feature specification
├── plan.md              # ✅ This file - Implementation plan
├── quickstart.md        # 📋 TODO - Quick reference guide
└── field-mapping.md     # 📋 TODO - Detailed CSV→Builder.io field mapping per type
```

### Source Code (repository root)

```text
scripts/
└── migrations/
    ├── migrate-tags.js       # ✅ Existing - Reference pattern
    ├── migrate-posts.js      # ✅ Existing - Primary reference pattern
    └── migrate-infopages.js  # 📋 TODO - Info pages migration script (THIS FEATURE)

data/
├── exports/
│   ├── Tags_wix.csv                                    # ✅ Existing
│   ├── Posts_Events_Project+Results+Pages_wix.csv     # ✅ Existing
│   └── Project_Organisation_Person+Info+Pages_wix.csv # ✅ Provided - Info pages export (3 types)
├── mappings/
│   ├── tag-migration-mapping.json           # ✅ Existing - Tag mapping (for reference resolution)
│   ├── post-migration-mapping.json          # ✅ Existing
│   ├── person-migration-mapping.json        # 📋 Generated - Person pages ID mapping
│   ├── organisation-migration-mapping.json  # 📋 Generated - Organisation pages ID mapping
│   └── project-migration-mapping.json       # 📋 Generated - Project pages ID mapping
└── examples/
    └── example_post_page.json               # ✅ Existing - Builder.io format reference

docs/migration/infopages/
└── INFOPAGES_MIGRATION_GUIDE.md            # 📋 TODO - Migration documentation
```

**Structure Decision**: Single migration script at `scripts/migrations/migrate-infopages.js` following the established pattern from `migrate-posts.js`. No changes to existing app structure required. Script handles all three page types with internal routing logic.

## Architecture Overview

### Migration Script Architecture

```text
migrate-infopages.js
├── Configuration
│   ├── Environment (BUILDER_PRIVATE_API_KEY from .env.local)
│   ├── File paths (CSV_FILE, three MAPPING_FILES, TAG_MAPPING_FILE)
│   ├── Model names (person-page, organisation-page, project-page)
│   ├── API settings (rate limit, endpoints)
│   └── Logging utilities (colored console output)
│
├── Core Functions
│   ├── loadCSV() - Parse Wix export CSV with case-insensitive column matching
│   ├── normalizeColumnName() - Lowercase column names for matching
│   ├── loadMapping(pageType) - Load/initialize specific mapping file
│   ├── saveMapping(pageType) - Persist mapping updates for specific type
│   ├── determinePageType() - Identify Person/Organisation/Project from Page Types field
│   │   ├── resolvePageTypeTag() - Look up tag name from Wix ID
│   │   └── applyPriorityOrder() - Person > Organisation > Project for mixed types
│   ├── transformInfoPage() - Convert Wix→Builder.io format (model-specific)
│   │   ├── transformBasicFields()
│   │   ├── transformMetadata()
│   │   ├── transformReferences() - All resolve to tags only
│   │   ├── transformStructuredRoles() - Parse JSON, store as text
│   │   ├── transformDates()
│   │   ├── transformExternalLinks()
│   │   └── validateRequired()
│   ├── checkDuplicateSlug(pageType) - Detect slug collisions per model
│   ├── resolveTagReferences() - Look up Builder.io tag IDs
│   ├── createInfoPage(model) - Write API call to Builder.io (model-specific)
│   └── makeRequest() - HTTP helper with auth
│
├── Migration Modes
│   ├── migrate() - Standard migration with API writes (all types)
│   ├── dryRun() - Validation without API calls (all types)
│   └── validate() - Compare Wix vs Builder.io data (all types)
│
├── Utilities
│   ├── Progress tracking - Console updates with ETA (per type and overall)
│   ├── Error handling - Individual page failures logged, continue
│   ├── Summary report - Final statistics by type (success/skip/fail counts)
│   └── Resume logic - Skip already-migrated pages via appropriate mapping file
│
└── CLI Interface
    ├── Parse arguments (count, flags)
    ├── Display help text
    └── Execute selected mode
```

### Data Flow

```text
1. INPUT
   ├── Read: data/exports/Project_Organisation_Person+Info+Pages_wix.csv
   ├── Parse: CSV → JavaScript objects (case-insensitive column matching)
   ├── Load: data/mappings/{person,organisation,project}-migration-mapping.json (for duplicate detection)
   └── Load: data/mappings/tag-migration-mapping.json (for ALL reference resolution)

2. PAGE TYPE ROUTING (per row) - **SIMPLIFIED**
   ├── Extract: Page Types field (typically single Wix tag ID)
   ├── Lookup: Wix tag ID → tag name via tag-migration-mapping.json
   │   Example: "abc123" → {name: "person info", ...}
   ├── Match: Simple string check on tag name
   │   ├── Contains "person" → Person page
   │   ├── Contains "organisation" → Organisation page
   │   └── Contains "project" → Project page
   ├── Route: Select target model (person-page, organisation-page, or project-page)
   ├── Edge case: If multiple Page Types map to different types, use priority: Person > Organisation > Project
   └── Skip: If no valid Page Types field or unrecognized tag name, log error and skip row

3. TRANSFORM (per page, model-specific)
   ├── Validate: Required fields (title, slug)
   ├── Check: Already migrated? (appropriate mapping file by type)
   ├── Transform: Wix format → Builder.io format (model-specific fields)
   │   ├── Basic fields (title, slug + appropriate prefix, description)
   │   ├── Metadata (dates as timestamps, published status)
   │   ├── Tag references (ALL resolve to tags: methods, domains, types, etc.)
   │   │   └── Lookup: Wix tag ID → Builder.io tag ID via tag-migration-mapping.json
   │   ├── Structured roles (parse JSON from CSV, store as JSON text - NO reference resolution)
   │   ├── External links (direct text fields)
   │   └── Dates (parse to timestamps)
   ├── Resolve: Tag reference IDs (lookup in tag-migration-mapping.json)
   ├── Handle: Missing tag references (omit, log warning)
   └── Handle: Duplicate slugs within same page type (append -2, -3, etc.)

4. WRITE (if not dry-run)
   ├── API: POST /api/v1/write/{person-page|organisation-page|project-page}
   ├── Auth: Bearer ${BUILDER_PRIVATE_API_KEY}
   ├── Rate limit: Wait 200ms before next request
   └── Response: Extract Builder.io ID

5. TRACK
   ├── Update: appropriate mapping file by type (Wix ID ↔ Builder.io ID)
   ├── Log: Success/skip/failure with details (including page type)
   └── Count: Processed/successful/skipped/failed (per type and overall)

6. OUTPUT
   ├── Save: Three updated mapping files
   ├── Display: Summary report (broken down by page type)
   └── Exit: Status code (0 = success, 1 = errors occurred)
```

### Page Type Routing Strategy - **SIMPLIFIED APPROACH**

```text
Page Type Determination Process (Straightforward):
├── 1. Extract Page Types field from CSV row (typically single Wix tag ID)
├── 2. Look up Wix tag ID in tag-migration-mapping.json
│      Example: "abc123" → {name: "person info", builderId: "xyz789"}
├── 3. Simple string matching on tag name:
│      ├── Tag name contains "person" → Person page
│      ├── Tag name contains "organisation" → Organisation page
│      └── Tag name contains "project" → Project page
├── 4. Select target Builder.io model:
│      ├── Person → person-page model
│      ├── Organisation → organisation-page model
│      └── Project → project-page model
└── 5. Edge case only: If CSV row has multiple Page Types IDs mapping to
       different types, apply priority: Person > Organisation > Project
       (This should be rare if data is clean)

Slug Prefix Assignment:
├── Person → /person/
├── Organisation → /organisation/
└── Project → /project/

Mapping File Selection:
├── Person → data/mappings/person-migration-mapping.json
├── Organisation → data/mappings/organisation-migration-mapping.json
└── Project → data/mappings/project-migration-mapping.json

Key Simplification:
✅ Most rows have a single Page Types ID (e.g., "person info" tag)
✅ Simple string matching (contains "person"/"organisation"/"project")
✅ Priority order only needed for rare mixed-type edge cases
✅ No complex resolution logic - just one lookup + string check
```

### Reference Resolution Strategy

```text
**SIMPLIFIED: All References Are Tags Only**

Reference Types (Per Page Type):
├── **Common** (all page types):
│   ├── methods → tag references
│   ├── domains → tag references
│   ├── countryTag → single tag reference
│   └── activity → tag references
│
├── **Person-specific**:
│   ├── person → tag reference (self-reference)
│   ├── personType → tag references
│   ├── personProjectCoordination → tag references to project tags
│   ├── personProjectParticipation → tag references to project tags
│   ├── personOrganisation → tag references to organisation tags
│   └── personOrganisationFormer → tag references to organisation tags
│
├── **Organisation-specific**:
│   ├── organisationType → tag references
│   ├── organisationProject → tag references to project tags
│   ├── organisationPeople → tag references to person tags
│   ├── organisationHasMember → tag references
│   └── organisationMemberOf → tag references
│
└── **Project-specific**:
    ├── projectFunded → tag references to funding tags
    ├── projectCoordinator → tag references to organisation/person tags
    ├── projectParticipantTeam → tag references to organisation/person tags
    └── projectOrganisation → tag references to organisation tags

Resolution Process:
1. Extract Wix tag IDs from CSV columns (JSON arrays or single values)
2. Look up Builder.io tag ID in `data/mappings/tag-migration-mapping.json`
3. If found: Create Builder.io Reference object
   {
     "@type": "@builder.io/core:Reference",
     "id": "<builder-tag-id>",
     "model": "tag"
   }
4. If NOT found:
   - Omit reference from array
   - Log warning: "Page [wix-id] ([page-type]): Missing tag reference [field]:[wix-tag-id]"
5. No wrapper needed for arrays - direct reference objects

**Structured Roles (NOT References)**:
├── personOrganisationRoles - JSON text: [{"organisation":"X","role":"Y"}]
├── personOrganisationRolesFormer - JSON text: [{"organisation":"X","role":"Y"}]
├── organisationProjectRoles - JSON text: [{"organisation":"X","role":"Y"}]
├── organisationPeopleRoles - JSON text: [{"organisation":"X","role":"Y"}]
└── projectOrganisationRoles - JSON text: [{"organisation":"X","role":"Y"}]
    └── Parse from CSV, store as JSON text - NO reference resolution
```

## Field Transformation Matrix

### Common Fields (All Page Types)

| CSV Column (Wix) | Builder.io Path    | Transform                                        | Notes                               |
| ---------------- | ------------------ | ------------------------------------------------ | ----------------------------------- |
| `ID`             | `data.wixId`       | Direct                                           | Preserved for tracking              |
| `Title`          | `data.title`       | Direct (case-insensitive match)                  | Required, validation                |
| `slug`           | `data.slug`        | Add prefix (/person/, /organisation/, /project/) | Required, uniqueness check per type |
| `Description`    | `data.description` | Direct HTML                                      | Rich text content                   |
| `Created Date`   | `createdDate`      | Parse timestamp                                  | Root level, milliseconds            |
| `Updated Date`   | `lastUpdated`      | Parse timestamp                                  | Root level, milliseconds            |
| `published`      | `published`        | Map to "published"                               | Root level                          |
| `Owner`          | `createdBy`        | Direct                                           | Builder.io user ID                  |
| `Methods` (IDs)  | `data.methods[]`   | Resolve to tag references                        | Tag reference array                 |
| `Domains` (IDs)  | `data.domains[]`   | Resolve to tag references                        | Tag reference array                 |
| `Country Tag`    | `data.countryTag`  | Resolve to tag reference                         | Single tag reference (not array)    |
| `Activity` (IDs) | `data.activity[]`  | Resolve to tag references                        | Tag reference array                 |

### Person Page Specific Fields

| CSV Column (Wix)                   | Builder.io Path                      | Transform                 | Notes                                                     |
| ---------------------------------- | ------------------------------------ | ------------------------- | --------------------------------------------------------- |
| `Person` (ID)                      | `data.person`                        | Resolve to tag reference  | Self-reference tag                                        |
| `Person Type` (IDs)                | `data.personType[]`                  | Resolve to tag references | Tag reference array                                       |
| `Person Project Coordonation`      | `data.personProjectCoordination[]`   | Resolve to tag references | Tag references to project tags                            |
| `Person Project Participation`     | `data.personProjectParticipation[]`  | Resolve to tag references | Tag references to project tags                            |
| `Person Organisation` (IDs)        | `data.personOrganisation[]`          | Resolve to tag references | Tag references to organisation tags                       |
| `Person Organisation - Former`     | `data.personOrganisationFormer[]`    | Resolve to tag references | Tag references to organisation tags                       |
| `Person Organisation Roles`        | `data.personOrganisationRoles`       | Parse JSON, store as text | JSON array: `[{"organisation":"X","role":"Y"}]` (NO refs) |
| `Person Organisation Roles Former` | `data.personOrganisationRolesFormer` | Parse JSON, store as text | JSON array: `[{"organisation":"X","role":"Y"}]` (NO refs) |
| `Linkedin Link`                    | `data.linkedinLink`                  | Direct text               | External URL                                              |
| `Website Link`                     | `data.websiteLink`                   | Direct text               | External URL                                              |
| `Research Gate Link`               | `data.researchGateLink`              | Direct text               | External URL                                              |
| `ORCID Link`                       | `data.orcidLink`                     | Direct text               | External URL                                              |

### Organisation Page Specific Fields

| CSV Column (Wix)                | Builder.io Path                    | Transform                 | Notes                                                     |
| ------------------------------- | ---------------------------------- | ------------------------- | --------------------------------------------------------- |
| `Organisation Type` (IDs)       | `data.organisationType[]`          | Resolve to tag references | Tag reference array                                       |
| `Organisation Project` (IDs)    | `data.organisationProject[]`       | Resolve to tag references | Tag references to project tags                            |
| `Organisation People` (IDs)     | `data.organisationPeople[]`        | Resolve to tag references | Tag references to person tags                             |
| `Organisation Has Member`       | `data.organisationHasMember[]`     | Resolve to tag references | Tag reference array                                       |
| `Organisation Member Of`        | `data.organisationMemberOf[]`      | Resolve to tag references | Tag reference array                                       |
| `Organisation Project Roles`    | `data.organisationProjectRoles`    | Parse JSON, store as text | JSON array: `[{"organisation":"X","role":"Y"}]` (NO refs) |
| `Organisation People Roles`     | `data.organisationPeopleRoles`     | Parse JSON, store as text | JSON array: `[{"organisation":"X","role":"Y"}]` (NO refs) |
| `Organisation Established Date` | `data.organisationEstablishedDate` | Parse timestamp           | Date field                                                |
| `Website Link`                  | `data.websiteLink`                 | Direct text               | External URL                                              |

### Project Page Specific Fields

| CSV Column (Wix)             | Builder.io Path                 | Transform                 | Notes                                                     |
| ---------------------------- | ------------------------------- | ------------------------- | --------------------------------------------------------- |
| `Project Funded` (IDs)       | `data.projectFunded[]`          | Resolve to tag references | Tag references to funding tags                            |
| `Project Coordinator` (IDs)  | `data.projectCoordinator[]`     | Resolve to tag references | Tag references to organisation/person tags                |
| `Project Participant Team`   | `data.projectParticipantTeam[]` | Resolve to tag references | Tag references to organisation/person tags                |
| `Project Organisation` (IDs) | `data.projectOrganisation[]`    | Resolve to tag references | Tag references to organisation tags                       |
| `Project Organisation Roles` | `data.projectOrganisationRoles` | Parse JSON, store as text | JSON array: `[{"organisation":"X","role":"Y"}]` (NO refs) |
| `Project Start Date`         | `data.projectStartDate`         | Parse timestamp           | Date field                                                |
| `Project End Date`           | `data.projectEndDate`           | Parse timestamp           | Date field                                                |
| `Post Content Rich 1-10`     | `data.postContentRich1-10`      | Direct HTML               | 10 rich text fields (same as posts)                       |
| `Post Image 1-10`            | `data.postImage1-10`            | Parse JSON/URL            | 10 image object fields (same as posts)                    |
| `Website Link`               | `data.websiteLink`              | Direct text               | External URL                                              |
| `Internal Links`             | `data.internalLinks[]`          | Parse JSON array          | Optional                                                  |
| `Media Files`                | `data.mediaFiles[]`             | Parse JSON array          | Optional                                                  |

**Total**: 30+ unique fields across three page types (many shared, some type-specific)

## Error Handling Strategy

### Error Categories

| Error Type                    | Handling                              | Example                                   | Impact                                   |
| ----------------------------- | ------------------------------------- | ----------------------------------------- | ---------------------------------------- |
| **Critical - Abort**          | Exit immediately                      | Missing API key, CSV file not found       | Script terminates                        |
| **Validation - Skip Page**    | Skip page, log details, continue      | Missing title/slug, no valid Page Types   | Page not migrated, logged                |
| **API - Retry/Skip**          | Log error, continue to next           | Network timeout, rate limit hit           | Page logged as failed, retryable         |
| **Tag Reference - Warn**      | Omit reference, log warning, continue | Tag ID not in tag-migration-mapping.json  | Page migrated without that tag reference |
| **Slug Collision (per type)** | Auto-fix (append -2), log, continue   | Duplicate slug within same page type      | Page migrated with modified slug         |
| **Mixed Page Types**          | Use priority order, log warning       | Both Person & Organisation types detected | Page routed to highest priority type     |
| **Page Type Not Found**       | Skip page, log error                  | Page Types field empty or invalid         | Page not migrated, needs manual review   |

### Logging Levels

```javascript
log.info(); // ℹ Blue - Progress updates, informational
log.success(); // ✓ Green - Successful operations
log.error(); // ✗ Red - Failures, critical issues
log.warning(); // ⚠ Yellow - Warnings, missing refs, auto-fixes, mixed types
log.title(); // Cyan/Bold - Section headers, summary
```

### Recovery Mechanisms

1. **Resume After Interruption**: Three mapping files track completed pages per type, script skips on restart
2. **Partial Failure**: Individual page failures don't block remaining pages
3. **Dry-Run Validation**: Test full migration without API writes
4. **Manual Retry**: Failed pages logged with Wix IDs and page types for re-export and retry

## Implementation Phases

### Phase 0: Research & Preparation ✅ COMPLETE

**Objective**: Understand requirements, patterns, and constraints

**Deliverables**:

- ✅ Spec clarified (6 critical questions answered including reference simplification)
- ✅ Constitution check passed (all 7 principles)
- ✅ Existing `migrate-posts.js` analyzed for patterns
- ✅ Key insight: All references are tags only (major simplification)
- ✅ Field mappings documented per page type

**Time Estimate**: Complete

---

### Phase 1: Core Script Development 📋 NEXT

**Objective**: Create functional migration script with multi-model routing

**Tasks**:

1. **Script Scaffold** (1.5 hours)

   - Create `scripts/migrations/migrate-infopages.js`
   - Copy boilerplate from `migrate-posts.js` (env, logging, CLI parsing)
   - Define configuration constants (file paths, three model names, API settings)
   - Set up three mapping file paths

2. **CSV Parsing with Case-Insensitive Matching** (2 hours)

   - Implement `loadCSV()` function
   - Add `normalizeColumnName()` utility (lowercase for matching)
   - Parse CSV with `csv-parse/sync` from `data/exports/Project_Organisation_Person+Info+Pages_wix.csv`
   - Map normalized column names to actual column names
   - Validate CSV structure (required columns present: Title, slug, Page Types, etc.)

3. **Page Type Determination** (2 hours) - **SIMPLIFIED**

   - Load tag-migration-mapping.json for page type resolution
   - Implement `determinePageType()` function
   - Extract `Page Types` field from CSV row (typically single Wix tag ID)
   - Look up Wix tag ID in tag-migration-mapping.json to get tag name
   - **Simple string matching** on tag name:
     - Contains "person" → Person page
     - Contains "organisation" → Organisation page
     - Contains "project" → Project page
   - **Fallback only**: Apply priority order (Person > Organisation > Project) if multiple Page Types IDs exist
   - Return: {type: 'person'|'organisation'|'project', model: 'person-page'|..., prefix: '/person/'|...}
   - Handle missing/invalid Page Types (return null, will skip)

4. **Three Mapping File Management** (2 hours)

   - Implement `loadMapping(pageType)` - load or initialize JSON file by type
   - Implement `saveMapping(pageType, data)` - atomic file writes by type
   - Structure: `{wixToBuilder: {}, builderToWix: {}, migratedCount: 0, lastMigrated: null}`
   - Three files: person-migration-mapping.json, organisation-migration-mapping.json, project-migration-mapping.json

5. **Basic Field Transformation** (4 hours)

   - Implement `transformInfoPage(row, pageType)` core function
   - Transform common fields (title, slug + prefix, description)
   - Transform metadata (dates as timestamps, published status)
   - Transform external links (direct text fields)
   - Add validation for required fields (title, slug)
   - Model-specific field selection based on pageType

6. **Builder.io API Integration** (2 hours)

   - Implement `makeRequest()` HTTP helper
   - Implement `createInfoPage(model, data)` Write API call (model-specific endpoint)
   - Handle authentication (Bearer token)
   - Parse response for Builder.io ID

7. **Basic Migration Loop with Routing** (3 hours)

   - Implement `migrate()` main function
   - Loop through CSV rows
   - Determine page type (call determinePageType())
   - Skip if no valid page type
   - Check if already migrated (appropriate mapping file by type)
   - Transform, create, track (route to correct model)
   - Add rate limiting (200ms delay)

8. **CLI Interface** (1.5 hours)
   - Parse command-line arguments (count, flags)
   - Implement help text display
   - Basic error handling and exit codes
   - Display page type in progress messages

**Deliverables**:

- ✅ Functional migration script (migrate 1-N pages of any type)
- ✅ Page type routing to three different models
- ✅ Three mapping files for duplicate prevention per type
- ✅ Case-insensitive column matching
- ✅ Basic logging and error handling
- ✅ Rate limiting

**Time Estimate**: 18 hours (reduced from 19 due to simplified page type logic)

**Testing Criteria**:

- Successfully migrate 3 test pages (1 Person, 1 Organisation, 1 Project)
- Verify all basic fields in Builder.io for each type
- Verify pages go to correct models (person-page, organisation-page, project-page)
- Re-run script: 3 pages skipped (no duplicates)
- Three mapping files correctly track Wix↔Builder.io IDs per type

---

### Phase 2: Tag References & Structured Roles 📋 PLANNED

**Objective**: Handle tag references, structured roles, and edge cases

**Tasks**:

1. **Tag Reference Resolution** (3 hours)

   - Load tag-migration-mapping.json
   - Implement `resolveTagReferences()` function
   - Look up Builder.io tag IDs for all reference fields
   - Handle missing tag references (omit + log warning)
   - Create Builder.io Reference objects: `{@type: "@builder.io/core:Reference", id: "...", model: "tag"}`
   - Support all common and type-specific tag reference fields
   - **Simplified**: All references point to "tag" model (no multi-model lookup needed)

2. **Structured Roles Parsing** (2 hours)

   - Implement `parseStructuredRoles()` function
   - Parse JSON from CSV columns (personOrganisationRoles, organisationProjectRoles, etc.)
   - Validate JSON structure: `[{"organisation":"X","role":"Y"}]`
   - Store as JSON text (NO reference resolution)
   - Handle malformed JSON (log warning, store as empty array)

3. **Model-Specific Field Mapping** (3 hours)

   - Implement Person-specific transformations
   - Implement Organisation-specific transformations (including established date)
   - Implement Project-specific transformations (including start/end dates, content fields)
   - Handle optional fields gracefully (omit if not present)

4. **Slug Collision Detection (per type)** (2 hours)

   - Implement `checkDuplicateSlug(slug, pageType)` function
   - Query Builder.io for existing slugs in specific model
   - Auto-append numeric suffix (-2, -3, etc.) within same page type
   - Log slug modifications

5. **Dry-Run Mode** (2 hours)

   - Implement `dryRun()` function
   - Skip API calls, display transformation output
   - Validate data transformations per page type
   - Show JSON payload that would be sent
   - Display page type routing decisions

6. **Progress Tracking (per type)** (2 hours)

   - Console progress updates (current/total)
   - Success/skip/fail counters per page type
   - Overall counters
   - Estimated time remaining (ETA)
   - Summary report broken down by page type

7. **Enhanced Error Handling** (2 hours)
   - Categorize errors (critical/validation/API/reference)
   - Individual page failure logging with page type
   - Continue on error (don't abort migration)
   - Failed pages list with page types for retry
   - Warning for mixed page types

**Deliverables**:

- ✅ Tag reference resolution for all reference fields
- ✅ Structured roles parsing and storage
- ✅ Model-specific field transformations
- ✅ Slug collision handling per page type
- ✅ Dry-run mode (--dry-run flag)
- ✅ Progress tracking by page type and overall
- ✅ Comprehensive error handling

**Time Estimate**: 16 hours

**Testing Criteria**:

- Migrate pages with tag references: all references resolved correctly
- Migrate pages with structured roles: JSON parsed and stored correctly
- Migrate pages with duplicate slugs (same type): auto-suffixed (-2, -3)
- Dry-run 50 pages: no API calls, transformations validated, page types shown
- Interrupt migration at page 25: resume continues at page 26

---

### Phase 3: Validation & Documentation 📋 PLANNED

**Objective**: Add validation mode and complete documentation

**Tasks**:

1. **Validation Mode** (4 hours)

   - Implement `validate()` function
   - Query Builder.io for migrated pages (all three models)
   - Compare Wix CSV data vs Builder.io data per page type
   - Field-by-field comparison (model-specific)
   - Report discrepancies (missing fields, incorrect values)
   - Generate validation report by page type

2. **Field Mapping Report** (3 hours)

   - Generate `field-mapping.md` from spec
   - Document CSV column → Builder.io path for each page type
   - Include transformation notes, edge cases
   - Tag reference resolution examples
   - Structured roles format examples
   - Page type routing logic

3. **Quick Start Guide** (2 hours)

   - Create `specs/002-infopages-migration/quickstart.md`
   - Step-by-step migration instructions
   - Page type routing explanation
   - Common error troubleshooting
   - Example commands with outputs

4. **Migration Documentation** (3 hours)

   - Create `docs/migration/infopages/INFOPAGES_MIGRATION_GUIDE.md`
   - Comprehensive guide following post migration pattern
   - Prerequisites, setup, execution, validation
   - Page type determination section
   - Troubleshooting section
   - FAQ

5. **Script Documentation** (1 hour)
   - Add comprehensive inline comments
   - Update file header with usage examples
   - Document all functions with JSDoc
   - Explain page type routing logic

**Deliverables**:

- ✅ Validation mode (--validate flag)
- ✅ Field mapping documentation per page type
- ✅ Quick start guide
- ✅ Comprehensive migration guide
- ✅ Inline code documentation

**Time Estimate**: 13 hours

**Testing Criteria**:

- Validation mode compares 50 pages: reports 0 discrepancies
- Documentation tested by following guide from scratch
- All edge cases documented with examples
- Page type routing clearly explained

---

### Phase 4: Production Readiness 📋 PLANNED

**Objective**: Final testing, optimization, and production deployment

**Tasks**:

1. **Full Migration Test** (4 hours)

   - Export all info pages from Wix to CSV
   - Run dry-run on full dataset
   - Execute full migration (all three types)
   - Validate results per page type
   - Document issues and fixes

2. **Performance Optimization** (2 hours)

   - Profile script execution time
   - Optimize CSV parsing (streaming for large files)
   - Memory usage optimization
   - Verify page type routing efficiency

3. **Edge Case Testing** (4 hours)

   - Test with missing tag references
   - Test with duplicate slugs (per type)
   - Test with missing optional fields
   - Test with mixed page types (priority order)
   - Test with missing Page Types field
   - Test with malformed structured roles JSON
   - Test interruption and resume
   - Test with malformed CSV data

4. **Final Documentation** (2 hours)

   - Update README with info pages migration status
   - Update constitution compliance notes
   - Add to migration summary docs
   - Create backup/rollback plan

5. **Production Execution** (3 hours)
   - Final dry-run on production data
   - Execute production migration
   - Monitor progress (by page type)
   - Validate results (all three types)
   - Update migration status

**Deliverables**:

- ✅ Production-ready script
- ✅ Full migration completed (all three types)
- ✅ Validation passed
- ✅ Documentation updated
- ✅ Migration status tracked

**Time Estimate**: 15 hours

**Success Criteria**:

- All info pages migrated successfully (100% or documented failures)
- Zero duplicates on re-run (per page type)
- All tag references resolved
- Correct page type routing (100% accuracy)
- Documentation complete
- Constitution compliance maintained

---

## Timeline Summary

| Phase     | Duration     | Status  | Deliverable                        |
| --------- | ------------ | ------- | ---------------------------------- |
| Phase 0   | Complete     | ✅      | Research & specification           |
| Phase 1   | 18 hours     | 📋 Next | Core migration script with routing |
| Phase 2   | 16 hours     | 📋      | Tag references & structured roles  |
| Phase 3   | 13 hours     | 📋      | Validation & documentation         |
| Phase 4   | 15 hours     | 📋      | Production readiness               |
| **Total** | **62 hours** |         | **Production migration complete**  |

**Recommended Approach**:

- Phase 1: 2.5 days (core functionality with simplified page type routing)
- Phase 2: 2 days (tag references and structured roles)
- Phase 3: 2 days (validation & docs)
- Phase 4: 2 days (production deployment)
- **Total**: 8.5 working days

## Risk Assessment

| Risk                           | Impact   | Mitigation                                                        |
| ------------------------------ | -------- | ----------------------------------------------------------------- |
| **CSV format mismatch**        | High     | Case-insensitive matching, validate structure early, clear errors |
| **Page type ambiguity**        | High     | Priority order defined, log warnings for mixed types              |
| **Missing Page Types field**   | Medium   | Skip rows with clear error messages, track for manual review      |
| **Missing tag references**     | Medium   | Handled gracefully (omit + warn), documented for manual fix       |
| **API rate limiting**          | Medium   | 200ms delay enforced, resume capability for interruptions         |
| **Duplicate slugs (per type)** | Medium   | Auto-suffix mechanism per model, logging for review               |
| **Data loss**                  | Critical | Dry-run mode, three mapping files tracking, validation mode       |
| **Large file memory**          | Low      | Streaming CSV parser if needed, batch processing                  |
| **Malformed structured roles** | Low      | JSON parsing with error handling, log warnings, continue          |
| **Page type routing errors**   | High     | Priority order defined, extensive testing, clear logging          |

## Success Metrics

Aligned with Success Criteria from spec.md:

- **SC-001**: ✅ Single test info page migrated and verified in <5 minutes
- **SC-002**: ✅ 100% migration success rate (valid source data)
- **SC-003**: ✅ 100+ info pages/hour processing rate
- **SC-004**: ✅ 0 duplicates on re-run (100% skip rate per type)
- **SC-005**: ✅ All tag references correctly resolved
- **SC-006**: ✅ Resume capability functional
- **SC-007**: ✅ Detailed error messages for debugging
- **SC-008**: ✅ Migrated pages display correctly (no component changes)
- **SC-009**: ✅ 100% accuracy in page type routing (Person, Organisation, Project)
- **SC-010**: ✅ All three page types migrated in single script execution

## Key Differences from Post Pages Migration

**Simplifications**:

- ✅ All references are tags only (no multi-model resolution)
- ✅ Structured roles are plain JSON text (no reference resolution)

**Additional Complexity**:

- ⚠️ Three target models requiring routing logic (but simplified with string matching)
- ⚠️ Three separate mapping files to manage
- ⚠️ Page type determination via straightforward tag name lookup
- ⚠️ Model-specific field transformations
- ⚠️ Case-insensitive column matching

**Net Impact**: Comparable complexity to post pages migration, with different challenges

## Next Steps

1. **Immediate**: Begin Phase 1 - Core Script Development

   - Create script scaffold
   - Implement CSV parsing with case-insensitive matching
   - Implement page type determination logic
   - Set up three mapping file management

2. **After Phase 1**: Test with small dataset (3 pages, 1 of each type)

   - Validate page type routing
   - Verify basic field transformations per type
   - Confirm three mapping files work correctly
   - Verify duplicate prevention per type

3. **After Phase 2**: Test with tag references and structured roles

   - Validate tag reference resolution
   - Test structured roles parsing
   - Verify slug collision handling per type
   - Verify dry-run and progress tracking by type

4. **After Phase 3**: Final validation and documentation review

   - Run validation mode on migrated pages
   - Review all documentation for completeness
   - Prepare for production execution

5. **Phase 4**: Production migration
   - Execute on full dataset
   - Monitor and validate all three page types
   - Update project documentation

**Command to proceed**: `/speckit.tasks` to generate detailed task breakdown
