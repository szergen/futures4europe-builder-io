# Feature Specification: Switch Tag Operations from Wix to Builder.io

**Feature Branch**: `004-tags-builder-migration`  
**Created**: 2024-12-03  
**Status**: Draft  
**Input**: User description: "Currently all of my tags are taken from Wix but now I want to take them from Builder. Based on those I make a lot of manipulations, like calculating mentions, when I create a new Tag it's created in Wix, but now it should be created in Builder. Cache is built based on the tags from Wix, but it should be from Builder, etc. All tags have already been migrated to Builder.io."

## Current State

**Tags Data**: All historical tags have been successfully migrated from Wix to Builder.io. The mapping file at `data/mappings/tag-migration-mapping.json` contains the complete Wix ID → Builder.io ID mapping for all migrated tags.

**Application Code**: The application currently uses Wix as the source of truth for all tag operations:

- Tag fetching: `/api/tags` queries Wix's Tags collection
- Tag creation: Components use Wix `insertDataItem()` API
- Cache: Built from Wix tag data
- Mentions: Calculated from Wix-sourced tags and pages

**Target**: Switch all application code to use Builder.io as the source of truth for tags while Wix tags remain available for reference/rollback purposes.

## Clarifications

### Session 2024-12-03

- Q: How should the code switch from Wix to Builder.io be deployed? → A: Big bang deployment - Switch all tag operations to Builder.io in a single deployment (Wix will only be used for user authentication)
- Q: What observability measures are needed for the cutover? → A: Basic logging only - Use existing logging infrastructure (Vercel, Posthog, or Sentry)
- Q: How should success be validated immediately after deployment? → A: Automated smoke tests + manual sampling - Run automated tests for critical tag operations, spot-check UI manually
- Q: How should affiliation tag references be handled during the cutover? → A: Affiliations remain in Wix with separate migration - Affiliations will have their own data model in Builder.io and be migrated separately in a future spec
- Q: How should mention calculations handle Wix affiliation tag IDs during the transition? → A: Use mapping file for affiliation IDs - Mention calculation translates Wix tag IDs from affiliations to Builder.io IDs using tag-migration-mapping.json

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Content Editor Creates New Tags in Builder.io (Priority: P1)

A content editor working with person, project, organisation, or domain tags needs to create new tags that are stored in Builder.io instead of Wix, ensuring all downstream features (mentions calculation, cache, search) automatically work with the new source.

**Why this priority**: This is the core functionality that enables the platform to create new tags in Builder.io. Without this, users cannot add new content classifications to the system after migration.

**Independent Test**: Can be fully tested by creating a tag through the TagPicker component, verifying it's saved to Builder.io, then confirming it appears in tag searches and mention calculations without any Wix dependency.

**Acceptance Scenarios**:

1. **Given** a user is editing a post or info page with a TagPicker, **When** they create a new tag (name, tagLine, tagType), **Then** the tag is saved to Builder.io's `tag` model and becomes immediately available for selection
2. **Given** a new user registers on the platform, **When** their person tag is auto-created during registration, **Then** the tag is created in Builder.io instead of Wix
3. **Given** a tag is created in Builder.io, **When** cache refresh is triggered, **Then** the new tag appears in the cached tags list used throughout the application
4. **Given** multiple users try to create the same tag simultaneously, **When** both requests reach Builder.io, **Then** system handles duplicate tag names gracefully (either by deduplication or unique constraint)
5. **Given** tag creation fails in Builder.io, **When** error occurs, **Then** user receives clear error message and can retry without data loss

---

### User Story 2 - System Fetches All Tags from Builder.io (Priority: P1)

The application needs to retrieve all tags from Builder.io for use in tag pickers, search filters, mention calculations, and caching, replacing the current Wix-based tag fetching.

**Why this priority**: This is essential for the application to function with Builder.io as the source of truth for tags. All features that depend on tags (search, filtering, mentions, cache) require this functionality.

**Independent Test**: Can be tested by switching the tag fetch endpoint to Builder.io, verifying all tags are retrieved, then confirming that TagPicker dropdowns, search filters, and mention pages display correct tag data.

**Acceptance Scenarios**:

1. **Given** the application starts up or cache expires, **When** tag data is needed, **Then** system fetches all tags from Builder.io's `tag` model instead of Wix's Tags collection
2. **Given** tags exist in Builder.io, **When** a tag picker is displayed, **Then** all tags of the appropriate tagType are available for selection
3. **Given** user searches or filters by tags, **When** they view tag options, **Then** only Builder.io tags are shown (no Wix tags)
4. **Given** Builder.io contains thousands of tags, **When** system fetches tags, **Then** pagination or batch loading is handled efficiently to retrieve all tags
5. **Given** tag fetch from Builder.io fails, **When** error occurs, **Then** system logs error and provides graceful degradation (cached data if available, clear error message if not)

---

### User Story 3 - System Calculates Tag Mentions from Builder.io Data (Priority: P1)

Tag popularity and mention counts need to be calculated based on references in Builder.io info pages and post pages instead of Wix data.

**Why this priority**: Tag mentions (popularity) are displayed throughout the UI and used for sorting and relevance. This must work with Builder.io data for the migration to be complete.

**Independent Test**: Can be tested by comparing mention counts calculated from Builder.io data against expected results, then verifying the counts display correctly in Tag components, TagList views, and mention pages.

**Acceptance Scenarios**:

1. **Given** tags, info pages, and post pages exist in Builder.io, **When** mention calculation runs, **Then** each tag's mention count equals the number of references to that tag across all pages
2. **Given** a tag has a masterTag reference, **When** calculating mentions, **Then** mentions of the masterTag are also counted toward the tag's total
3. **Given** tags reference info pages and post pages, **When** system builds the mentions cache, **Then** the `tags-with-popularity.json` cache is populated from Builder.io data sources
4. **Given** new pages are created or updated in Builder.io, **When** cache refresh is triggered, **Then** tag mention counts are recalculated based on current Builder.io data
5. **Given** a tag is referenced in affiliations data (stored in Wix with Wix tag IDs), **When** calculating mentions, **Then** affiliation Wix tag IDs are translated to Builder.io IDs using the mapping file and counted in the tag's popularity score

---

### User Story 4 - Cache System Uses Builder.io Tags (Priority: P1)

The Redis cache system needs to be rebuilt to use Builder.io as the source for tags instead of Wix, ensuring cache warming and cache invalidation work with Builder.io data.

**Why this priority**: The cache system is critical for application performance. All cached tag data must come from Builder.io for the migration to be successful and for cache to remain synchronized with the source of truth.

**Independent Test**: Can be tested by warming the cache, verifying cache keys contain Builder.io data, then triggering cache invalidation and confirming it refreshes from Builder.io sources.

**Acceptance Scenarios**:

1. **Given** cache warming is triggered, **When** `warmCache()` executes, **Then** it fetches tags from Builder.io API and stores them in Redis under `tags.json` key
2. **Given** cache expires or is invalidated, **When** tag data is requested, **Then** system fetches fresh data from Builder.io and repopulates cache
3. **Given** a new tag is created in Builder.io, **When** cache refresh is triggered (via `handleTagCreated`), **Then** the cache invalidation process fetches updated tags from Builder.io
4. **Given** tags-with-popularity needs updating, **When** `/api/tags-with-popularity` endpoint is called, **Then** it fetches tags from Builder.io (or Builder.io-sourced cache) and calculates mentions
5. **Given** cache fetch fails, **When** tags are needed, **Then** system falls back to direct Builder.io API call and logs the cache miss

---

### User Story 5 - Historical Data Migration (Status: ✅ COMPLETED)

**Note**: Historical tag data migration from Wix to Builder.io has been completed. All tags now exist in Builder.io with the mapping file available at `data/mappings/tag-migration-mapping.json`. This user story is included for reference only.

The migration successfully:

- Created all tags in Builder.io's `tag` model with field mappings preserved
- Resolved masterTag references to Builder.io tag IDs
- Generated the mapping file recording Wix ID → Builder.io ID for all tags
- Preserved all tag relationships and metadata

**Current Focus**: The remaining work is to update application code to use Builder.io tags instead of Wix tags (User Stories 1-4 above).

---

### Edge Cases

- **Missing tagType**: When a tag is created without a tagType specified, the system assigns a default tagType of "general" and logs a warning, allowing the tag to be created successfully.
- **Duplicate tag names**: When attempting to create a tag with a name that already exists in Builder.io (case-insensitive match), the system returns the existing tag instead of creating a duplicate and logs an informational message.
- **Builder.io API failures**: When Builder.io API calls fail (network error, rate limit, service unavailable), the system retries up to 3 times with exponential backoff before failing gracefully with a user-friendly error message.
- **Cache inconsistency**: When cache data is outdated or corrupted, the system detects this via timestamp validation and automatically invalidates and rebuilds cache from Builder.io source.
- **MasterTag circular references**: When a tag references itself as a masterTag (directly or through a chain), the system detects the circular reference, breaks the cycle by ignoring the invalid masterTag, and logs an error for administrator review.
- **Tag references in mentions calculation**: When calculating mentions for a tag that no longer exists in Builder.io but is referenced in pages, the system logs the missing tag reference but continues calculating mentions for valid tags without failing.
- **Empty tag lists**: When Builder.io returns zero tags (empty model), the system displays an empty state message to users and logs a warning, allowing administrators to identify if tags failed to migrate.
- **Concurrent tag creation**: When multiple users create the same tag simultaneously, Builder.io's eventual consistency may result in duplicate tags within a 2-5 second window; system implements client-side duplicate checking before creation and server-side deduplication scripts for periodic cleanup. This is acceptable eventual consistency per clarifications.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST fetch all tags from Builder.io's `tag` model instead of Wix's Tags collection
- **FR-002**: System MUST create new tags in Builder.io's `tag` model with fields: name, tagType, tagLine, picture, tagPageLink, masterTag, wixId
- **FR-003**: System MUST replace `uploadTag()` function in TagPicker component to use Builder.io Write API instead of Wix insertDataItem
- **FR-004**: System MUST replace `uploadTag()` function in AuthContext to use Builder.io API for tag creation
- **FR-005**: System MUST replace tag creation in register page to use Builder.io API instead of Wix
- **FR-006**: System MUST update `/api/tags` GET endpoint to fetch tags from Builder.io instead of Wix
- **FR-007**: System MUST update `/api/tags` POST endpoint to rebuild cache from Builder.io tags
- **FR-008**: System MUST update `cacheWarmer.ts` to fetch tags from Builder.io API endpoint
- **FR-009**: System MUST update `/api/tags-with-popularity` to calculate mentions using tags from Builder.io
- **FR-010**: System MUST update mention calculation (`calculatePopularity`) to work with Builder.io tag structure and translate Wix tag IDs from affiliations to Builder.io IDs using the mapping file (if mapping entry not found: log warning with Wix ID, skip that mention from count, continue processing other tags)
- **FR-011**: System MUST update `useFetchListTags` hook to filter tags from Builder.io source
- **FR-012**: System MUST use existing mapping file (`data/mappings/tag-migration-mapping.json`) for any legacy Wix ID to Builder.io ID conversions if needed
- **FR-013**: System MUST handle tag fetch pagination if Builder.io returns tags in batches (Builder.io SDK getAll() automatically handles pagination with 100-item pages; implementation should use getAll() or implement manual pagination with limit: 100, offset-based iteration)
- **FR-014**: System MUST validate tag data structure before creation (required: name and tagType)
- **FR-015**: System MUST implement retry logic for Builder.io API calls (3 retries with exponential backoff)
- **FR-016**: System MUST update cache invalidation (`invalidateAllCache`) to work with Builder.io-sourced data
- **FR-017**: System MUST log all tag creation, fetch, and cache operations using existing logging infrastructure (Vercel, Posthog, or Sentry)
- **FR-018**: System MUST handle Builder.io API errors gracefully with user-friendly error messages (following error format standards defined in contracts/builder-tag-api.md)
- **FR-019**: System MUST support tag filtering by tagType when fetching from Builder.io (via query parameter `?tagType=value` on GET /api/tags endpoint, filtered client-side from cache or via Builder.io query)
- **FR-020**: System MUST update `getCollectionItems` API endpoint to support fetching from Builder.io when collection is "Tags"
- **FR-021**: System MUST completely replace Wix tag operations with Builder.io operations in a single deployment (no gradual rollout or feature flags)
- **FR-022**: System MUST provide automated smoke tests for post-deployment validation covering tag fetch, tag creation, cache operations, and mention calculations

### Key Entities

- **Tag (Builder.io model)**: Represents a classification or label that can be applied to pages and content

  - **name**: Display name of the tag
  - **tagType**: Category of tag (person, organisation, project, domain, method, activity, country, etc.)
  - **tagLine**: Optional description or subtitle for the tag
  - **picture**: Optional image URL for visual representation
  - **tagPageLink**: Optional URL to dedicated page for this tag
  - **masterTag**: Optional reference to parent/canonical tag for grouping related tags
  - **wixId**: Original Wix ID for migration reference and legacy compatibility
  - **mentions**: Calculated field showing number of references across pages (not stored in Builder.io, computed at runtime)

- **Tag Mapping Entry**: Records migration relationship between Wix and Builder.io
  - **wixId**: Original tag ID from Wix system
  - **builderId**: New tag ID in Builder.io
  - **name**: Tag name for human reference
  - **tagType**: Tag category for validation

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Users can create new tags through the UI without any Wix dependency, and created tags appear in all tag pickers within 5 seconds
- **SC-002**: System fetches all tags from Builder.io in under 3 seconds for typical datasets (< 5000 tags)
- **SC-003**: Tag mention counts calculated from Builder.io data match the counts that were previously calculated from Wix data with 100% accuracy
- **SC-004**: Cache warming and invalidation complete successfully and fetch data exclusively from Builder.io endpoints
- **SC-005**: After code changes, no code paths in the application reference Wix for tag operations (verified via automated grep: `grep -r "wixClient.*Tags\|insertDataItem.*tag\|queryCollectionItems.*Tags" app/ --exclude-dir=node_modules` returns zero results)
- **SC-006**: Application performance remains the same or improves compared to Wix-based tag operations (measured via response times for tag fetch and creation)
- **SC-007**: Zero tag-related errors occur during a one-week observation period after switching to Builder.io (monitored via existing Vercel/Sentry error tracking with manual daily log review; dashboard setup optional)
- **SC-008**: All existing tags migrated to Builder.io are accessible through the new Builder.io-based endpoints with correct data and relationships
- **SC-009**: Post-deployment validation completes successfully through automated smoke tests covering tag fetch, tag creation, cache operations, and mention calculations, with manual UI spot-checks

## Assumptions

- **Historical Migration Complete**: All Wix tags have been successfully migrated to Builder.io, and the mapping file at `data/mappings/tag-migration-mapping.json` exists and is complete
- Builder.io's `tag` model already exists with the correct field structure (name, tagType, tagLine, picture, tagPageLink, masterTag, wixId)
- All migrated tags in Builder.io have their `wixId` field populated for cross-reference with legacy data
- Builder.io API has sufficient rate limits and quota to handle tag fetch and creation operations at current application usage levels
- Redis cache infrastructure remains unchanged and continues to work with Builder.io-sourced data
- Tag IDs in Builder.io are stable and do not change after creation (required for reference integrity)
- Info pages and post pages in Builder.io already reference Builder.io tag IDs (not Wix IDs) due to prior migrations
- Affiliation data remains in Wix with separate Builder.io data model and migration planned for future spec
- Current Wix authentication and session management will remain in place (only tag operations are being switched)
- Image URLs stored in tag `picture` field can remain at their current hosting location (no need to migrate image files)
- Application has Builder.io private API key configured with write permissions to create tags
- MCP (Model Context Protocol) connection to Builder.io is available for schema validation and data verification during development

## Dependencies

- Builder.io Write API must be accessible and functional
- `data/mappings/tag-migration-mapping.json` already exists from completed migration (required for translating Wix tag IDs to Builder.io IDs in mention calculations for affiliations)
- Redis cache service must be operational
- Info pages and post pages in Builder.io already reference Builder.io tag IDs (prerequisite: completed)
- Wix affiliations API remains accessible for fetching affiliation data during mention calculations (affiliations will be migrated separately in future spec)

## Out of Scope

- Historical tag data migration from Wix to Builder.io (already completed)
- Creating or running migration scripts for tag data (migration is complete)
- Migrating Wix authentication or user management to Builder.io (Wix authentication remains)
- Feature flag infrastructure for gradual rollout (using complete cutover deployment strategy)
- Changing the structure or fields of the tag model (using existing Builder.io tag model as-is)
- Migrating tag-related images or media files to a new hosting service
- Real-time synchronization between Wix and Builder.io during transition period
- Automated rollback mechanism to revert to Wix tags if issues occur (rollback via manual code revert if needed)
- UI/UX changes to tag pickers or tag display components (only changing data source)
- Performance optimization of Builder.io API calls beyond basic retry logic
- Custom Builder.io plugins or extensions for tag management
- Migrating affiliation data to Builder.io (separate spec with own data model and migration plan)
