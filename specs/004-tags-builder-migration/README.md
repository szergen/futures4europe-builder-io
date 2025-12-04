# Switch Tag Operations from Wix to Builder.io

**Feature Number**: 004  
**Branch**: `004-tags-builder-migration`  
**Status**: ✅ Specification Complete - Ready for Planning  
**Created**: 2024-12-03

## Overview

This feature switches the application's tag operations from Wix to Builder.io as the source of truth. All historical tag data has already been migrated to Builder.io. This work focuses on updating application code to use Builder.io for tag fetching, creation, caching, and mention calculations.

## Data Migration Status

✅ **COMPLETE** - All Wix tags have been successfully migrated to Builder.io

- Mapping file exists at: `data/mappings/tag-migration-mapping.json`
- All tags created in Builder.io with proper field mappings
- MasterTag relationships preserved

## Current Application State

**Application still using Wix for tags**:

- Tags are fetched from Wix's Tags collection via `wixClient.items.queryDataItems()`
- New tags are created in Wix via `insertDataItem()` in multiple components (TagPicker, AuthContext, register page)
- Cache is built from Wix tag data and stored in Redis
- Tag mentions/popularity are calculated from Wix-sourced info pages, post pages, and affiliations

## Target Application State

**Switch application to use Builder.io**:

- Tags are fetched from Builder.io's `tag` model
- New tags are created in Builder.io via Write API
- Cache is built from Builder.io tag data
- Tag mentions/popularity are calculated from Builder.io-sourced pages
- Wix tags remain available for reference but are not actively used

## Key Deliverables

1. **Tag Creation Update**: Update TagPicker, AuthContext, and registration to create tags in Builder.io
2. **Tag Fetching Update**: Update `/api/tags` and related hooks to fetch from Builder.io
3. **Cache System Update**: Update cache warming and invalidation to use Builder.io data
4. **Mentions Calculation Update**: Update popularity calculation to work with Builder.io data

## User Stories Priority

- **P1**: Tag Creation in Builder.io (critical for new content)
- **P1**: Tag Fetching from Builder.io (critical for application functionality)
- **P1**: Mentions Calculation from Builder.io (critical for tag popularity)
- **P1**: Cache System using Builder.io (critical for performance)
- **✅ COMPLETE**: Historical Data Migration (already done)

## Success Metrics

- Tags created through UI appear in all pickers within 5 seconds
- Tag fetch completes in under 3 seconds for typical datasets
- Mention counts from Builder.io match Wix counts with 100% accuracy
- Zero tag-related errors during one-week observation post-switch
- No code references to Wix Tags collection remain in application
- All migrated tags accessible through Builder.io endpoints

## Dependencies

- ✅ Tag migration mapping file exists at `data/mappings/tag-migration-mapping.json`
- Builder.io Write API access
- Redis cache infrastructure
- Info pages and post pages already using Builder.io tag IDs (prerequisite: completed)

## Files

- [spec.md](./spec.md) - Complete feature specification
- [checklists/requirements.md](./checklists/requirements.md) - Specification quality validation

## Builder.io Schema Validation

✅ Validated against Builder.io `tag` model schema via MCP:

- name (text)
- tagType (select: page type, project result, post, event, person, project, organisation, foresight method, domain, activity, country)
- tagLine (text)
- picture (file)
- tagPageLink (text)
- masterTag (reference to tag model)
- wixId (text)

## Next Steps

1. Run `/speckit.plan` to create technical implementation plan
2. Implement tag creation code updates (TagPicker, AuthContext, register page)
3. Implement tag fetching code updates (`/api/tags`, hooks)
4. Implement cache system updates (cacheWarmer, invalidation)
5. Implement mentions calculation updates
6. Validate and test thoroughly with existing migrated tags
7. Deploy to production

## Related Features

- 001-migrate-post-pages (completed)
- 002-infopages-migration (completed)
- 003-post-page-migration (in progress)
