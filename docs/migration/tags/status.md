# Tag Migration Status

**Migration Type**: Tags (Classifications and Labels)
**Started**: 2024-11-XX (Historical migration)
**Code Switch Started**: 2024-12-03
**Status**: 🟡 In Progress

## Overview

Migrating all tag operations from Wix to Builder.io as the source of truth. Historical tag data has been successfully migrated. This document tracks the application code updates.

## Migration Phases

### Phase 1: Historical Data Migration ✅ COMPLETE

**Status**: ✅ Complete
**Completed**: 2024-11-XX

- [x] All tags migrated to Builder.io tag model
- [x] Mapping file generated (data/mappings/tag-migration-mapping.json)
- [x] 3,077 tags successfully migrated
- [x] masterTag references resolved
- [x] wixId field populated for legacy compatibility

### Phase 2: Application Code Migration 🟡 IN PROGRESS

**Status**: 🟡 In Progress
**Started**: 2024-12-03

#### Tag Fetching

- [ ] Fetch operations switched to Builder.io
- [ ] TagPicker displays Builder.io tags
- [ ] Search filters use Builder.io source
- [ ] API endpoints return Builder.io data

#### Tag Creation

- [ ] Create operations use Builder.io Write API
- [ ] TagPicker uploads to Builder.io
- [ ] Registration creates person tags in Builder.io
- [ ] Validation works with Builder.io schema

#### Cache System

- [ ] Cache warming uses Builder.io
- [ ] Cache invalidation refreshes from Builder.io
- [ ] Tags cache (tags.json) sources from Builder.io
- [ ] Tags with popularity cache sources from Builder.io

#### Mentions Calculation

- [ ] Mention counts calculated from Builder.io data
- [ ] Info pages references counted correctly
- [ ] Post pages references counted correctly
- [ ] Affiliation tag IDs translated via mapping file
- [ ] MasterTag references included in counts

### Phase 3: Validation & Testing ⏳ PENDING

**Status**: ⏳ Pending

- [ ] Smoke tests executed
- [ ] Performance validated (< 3s tag fetch, < 5s creation)
- [ ] Zero Wix code paths verified
- [ ] One-week observation period completed
- [ ] Manual UI spot-checks completed

## Technical Details

### Builder.io Tag Model

**Model ID**: `a275c515afdb401b8b06f9fafe9bcbce`
**Model Name**: `tag`
**Kind**: `data`

**Fields**:

- name (text)
- tagType (select: person, organisation, project, domain, foresight method, activity, country, etc.)
- tagLine (text, optional)
- picture (file, optional)
- tagPageLink (text, optional)
- masterTag (reference to tag, optional)
- wixId (text, for legacy compatibility)

### Mapping File

**Location**: `data/mappings/tag-migration-mapping.json`
**Format**: `{ "wixToBuilder": { "wixId": { "builderId": "...", "name": "..." } } }`
**Entries**: 3,077 tag mappings

### Dependencies

- ✅ Builder.io Write API configured
- ✅ Redis/Upstash cache operational
- ✅ @builder.io/sdk v6.1.2 installed
- ✅ Info pages and post pages reference Builder.io tag IDs
- ⚠️ Affiliation data remains in Wix (separate migration planned)

## Current Sprint (2024-12-03)

**Goal**: Complete Phase 2 - Application Code Migration

**Tasks**:

1. Create transformation utilities (builderTagUtils.ts)
2. Switch tag fetching endpoints to Builder.io
3. Update tag creation components
4. Rebuild cache system with Builder.io source
5. Update mention calculation logic
6. Execute smoke tests

**Blockers**: None

## Rollback Plan

If issues occur post-deployment:

1. Revert code changes via git
2. Wix tags remain available as backup
3. No data loss - all tags exist in both systems temporarily
4. Mapping file enables quick ID translation

## Success Criteria

- [ ] Tag fetch < 3 seconds for 3,077+ tags
- [ ] Tag creation appears in pickers within 5 seconds
- [ ] 100% mention count accuracy vs. Wix baseline
- [ ] Zero Wix code paths for tag operations
- [ ] Zero tag-related errors for one week post-deployment

## Notes

- Historical migration preserved all tag data and relationships
- Builder.io is now the authoritative source
- Wix authentication remains unchanged
- Affiliation migration is separate (future work)

---

**Last Updated**: 2024-12-03
**Next Review**: After Phase 2 completion
