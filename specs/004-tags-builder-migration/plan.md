# Implementation Plan: Switch Tag Operations from Wix to Builder.io

**Branch**: `004-tags-builder-migration` | **Date**: 2024-12-03 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-tags-builder-migration/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Switch all tag operations (fetch, create, cache, mentions calculation) from Wix to Builder.io as the source of truth. All historical tags have been migrated to Builder.io. This work focuses on updating application code to use Builder.io APIs and data structures while maintaining Wix authentication. Deploy as big bang cutover with automated smoke tests for validation.

## Technical Context

**Language/Version**: TypeScript 4.8.4 with Next.js 13.4.9 (App Router)
**Primary Dependencies**:

- `@builder.io/sdk` for Builder.io integration
- Redis (Upstash) for caching
- Next.js App Router for API routes and pages
- React 18 for UI components

**Storage**:

- Builder.io (primary): Tag data model
- Redis (Upstash): Cache layer for tags and mentions
- Wix: Authentication only (affiliations temporarily until separate migration)

**Testing**:

- Playwright for E2E tests
- Jest for unit tests
- Automated smoke tests for post-deployment validation

**Target Platform**: Web application (Vercel deployment)

**Project Type**: Web application (Next.js)

**Performance Goals**:

- Tag fetch: < 3 seconds for typical datasets (< 5000 tags)
- Tag creation: Appears in pickers within 5 seconds
- Cache warming: Complete within 30 seconds for 5000 tags dataset (< 60 seconds maximum)

**Constraints**:

- Big bang deployment (no feature flags or gradual rollout)
- Must maintain backward compatibility with existing component interfaces
- Affiliation data remains in Wix temporarily (separate migration)
- Zero downtime requirement during deployment

**Scale/Scope**:

- ~5000 tags (estimated current dataset)
- 13 API endpoints/functions to update:
  - 4 new Builder.io CRUD routes (GET/POST /api/builder/tag, GET/PUT/DELETE /api/builder/tag/[id])
  - 3 existing routes updated (GET/POST /api/tags, GET /api/tags-with-popularity)
  - 2 utility routes (POST /api/getCollectionItems, POST /api/invalidate-cache)
  - 3 utility files (builderTagUtils.ts, tags.utils.ts, cacheWarmer.ts)
  - 1 hook (useFetchListTags.tsx)
- 4 major UI components (TagPicker, AuthContext, register page, tag lists)
- Multiple cache invalidation points

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### I. Migration-First Development ✅

- **Status**: PASS
- **Evidence**: Feature explicitly switches from Wix to Builder.io for all tag operations. No new Wix CMS dependencies introduced. Wix maintained only for authentication per constitution.
- **Action**: None required

### II. Content Type Parity ✅

- **Status**: PASS
- **Evidence**: Tags are shared infrastructure across all content types (post, project, person, organisation). Changes apply uniformly to all content types' tag handling.
- **Action**: None required

### III. Backward Compatibility ✅

- **Status**: PASS
- **Evidence**: Transformation utilities will adapt Builder.io tag structure to match existing component interfaces. No breaking changes to TagPicker, Tag components, or consumer code.
- **Action**: Implement `transformBuilderTagToWixFormat` utility

### IV. Data Integrity & Validation ✅

- **Status**: PASS
- **Evidence**: Historical migration complete with mapping file. Runtime mention calculations validated against Wix baseline. Automated smoke tests verify data integrity post-deployment.
- **Action**: None required

### V. Documentation & Migration Tracking ✅

- **Status**: PASS
- **Evidence**:
- Spec in `specs/004-tags-builder-migration/`
- Plan, research, data-model in same directory
- Migration scripts were in `scripts/migrations/` (already run)
- Mapping file in `data/mappings/tag-migration-mapping.json` (exists)
- **Action**: Update README.md after completion to mark tags as migrated

### VI. Performance & Caching ✅

- **Status**: PASS
- **Evidence**: Redis caching layer explicitly maintained. Cache warming from Builder.io. Multiple cache keys (`tags.json`, `tags-with-popularity.json`). Performance goals defined (3s fetch, 5s picker).
- **Action**: Verify cache TTLs appropriate for Builder.io refresh patterns

### VII. Testing & Quality Assurance ✅

- **Status**: PASS
- **Evidence**: E2E tests for tag operations. Smoke tests for post-deployment validation. Unit tests for transformation utilities. Manual spot-checks defined.
- **Action**: Ensure test coverage for all 4 P1 user stories

### Re-evaluation Post-Design

**Status**: ✅ PASS (Re-evaluated after Phase 1)

All constitution principles remain satisfied after design phase:

- Migration-first development maintained (Builder.io as source of truth)
- Content type parity preserved (tags shared across all content types)
- Backward compatibility ensured through transformation utilities
- Data integrity validated through smoke tests
- Documentation complete (spec, plan, research, data-model, contracts, quickstart)
- Performance targets defined with caching strategy
- Testing contracts established

No new violations introduced during design.

## Project Structure

### Documentation (this feature)

```text
specs/004-tags-builder-migration/
├── spec.md              # Feature specification
├── checklists/          # Quality validation
│   └── requirements.md
├── README.md            # Feature overview
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output ✅
├── data-model.md        # Phase 1 output ✅
├── quickstart.md        # Phase 1 output ✅
├── contracts/           # Phase 1 output ✅
│   ├── builder-tag-api.md
│   └── tag-transformation.md
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
app/
├── api/
│   ├── builder/
│   │   └── tag/                    # NEW: Builder.io tag CRUD operations
│   │       ├── route.ts            # GET/POST for tag operations
│   │       └── [id]/route.ts       # GET/PUT/DELETE for specific tags
│   ├── tags/
│   │   └── route.ts                # UPDATE: Switch from Wix to Builder.io
│   ├── tags-with-popularity/
│   │   └── route.ts                # UPDATE: Calculate from Builder.io data
│   ├── getCollectionItems/
│   │   └── route.ts                # UPDATE: Route Tags to Builder.io
│   └── invalidate-cache/
│       └── route.ts                # UPDATE: Invalidate Builder.io-sourced cache
│
├── utils/
│   ├── builderTagUtils.ts          # NEW: Builder.io tag operations
│   │   ├── getAllBuilderTags()
│   │   ├── getBuilderTagById()
│   │   ├── createBuilderTag()
│   │   ├── transformBuilderTagToWixFormat()
│   │   └── transformWixTagIdToBuilderIdFromMapping()
│   └── tags.utils.ts               # UPDATE: Adapt for Builder.io structures
│
├── services/
│   ├── cacheWarmer.ts              # UPDATE: Fetch tags from Builder.io
│   └── redisCache.ts               # No changes (reuse existing)
│
├── shared-components/
│   ├── TagPicker/
│   │   └── TagPicker.tsx           # UPDATE: Create tags in Builder.io
│   └── Tag/
│       └── Tag.tsx                 # No major changes (uses transformed data)
│
├── custom-hooks/
│   ├── AuthContext/
│   │   └── AuthContext.tsx         # UPDATE: uploadTag to Builder.io
│   ├── useFetchListTags.tsx        # UPDATE: Fetch from Builder.io
│   └── useFetchTags.tsx            # UPDATE: Fetch from Builder.io
│
├── register/
│   └── page.tsx                    # UPDATE: Create person tags in Builder.io
│
└── page-components/
    ├── PostPageComponent/
    │   └── PostPageComponent.tsx   # No changes (uses transformed tags)
    └── shared-page-components/
        └── TagList/
            └── TagsList.tsx        # No changes (uses transformed tags)

data/
└── mappings/
    └── tag-migration-mapping.json  # EXISTS: Wix ID → Builder.io ID mapping

scripts/
└── migrations/
    └── migrate-tags.js             # COMPLETED: Already run

tests/
└── e2e/
    └── tags-builder.spec.ts        # NEW: E2E smoke tests for Builder.io tag operations
```

**Structure Decision**: Web application using Next.js App Router structure. API routes in `app/api/`, utilities in `app/utils/`, components in `app/shared-components/` and `app/page-components/`. Following existing project patterns per constitution.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

_No violations. All constitution principles satisfied._

## Phase 0: Research

**Status**: PENDING

Research tasks will investigate:

1. Builder.io SDK tag creation patterns
2. Best practices for Builder.io reference field handling
3. Cache invalidation strategies for Builder.io content
4. Builder.io API rate limits and batch operations
5. Transformation patterns for Builder.io → legacy format

Output: `research.md`

## Phase 1: Design & Contracts

**Status**: PENDING

Deliverables:

1. `data-model.md`: Tag entity structure, mapping file format, transformation rules
2. `contracts/builder-tag-api.md`: Builder.io tag API contract
3. `contracts/tag-transformation.md`: Transformation utility interfaces
4. `quickstart.md`: Developer guide for working with Builder.io tags

## Phase 2: Implementation Tasks

**Status**: NOT STARTED

To be generated by `/speckit.tasks` command after Phase 1 completion.

## Phase Summary

### Phase 0: Research ✅ COMPLETE

**Status**: COMPLETE
**Output**: `research.md`

Research completed covering:

1. ✅ Builder.io SDK tag creation patterns (Write API with private key)
2. ✅ Builder.io reference field handling (Reference type with model linking)
3. ✅ Cache invalidation strategies (Manual Redis + TTL)
4. ✅ Builder.io API rate limits and batch operations (Retry with exponential backoff)
5. ✅ Transformation patterns for Builder.io → legacy format (Utility functions)
6. ✅ Affiliation tag ID translation using mapping file

All technical unknowns resolved. Ready for implementation.

### Phase 1: Design & Contracts ✅ COMPLETE

**Status**: COMPLETE
**Outputs**:

- `data-model.md` ✅
- `contracts/builder-tag-api.md` ✅
- `contracts/tag-transformation.md` ✅
- `quickstart.md` ✅

Design deliverables:

1. ✅ Complete data model with Builder.io and Wix formats
2. ✅ 9 API endpoint contracts with request/response formats
3. ✅ 9 transformation utility function contracts
4. ✅ Developer quickstart guide with examples
5. ✅ Error handling patterns defined
6. ✅ Testing contracts established

All contracts defined. Ready for task breakdown.

### Phase 2: Implementation Tasks ✅ COMPLETE

**Status**: COMPLETE
**Output**: `tasks.md`

Task breakdown generated with:

- 66 tasks organized by 4 user stories (6 added for constitution compliance)
- 7 phases from Setup to Polish
- Dependency-ordered execution plan
- Parallel execution opportunities identified
- Independent test criteria per story
- Big bang deployment strategy defined
- Incremental README updates after each user story
- Performance comparison and automated code verification

Key deliverables:

1. ✅ Documentation structure (docs/migration/tags/) per constitution
2. ✅ Foundational utilities (builderTagUtils.ts)
3. ✅ User Story 2: Tag fetching from Builder.io
4. ✅ User Story 1: Tag creation in Builder.io
5. ✅ User Story 4: Cache system with Builder.io
6. ✅ User Story 3: Mentions calculation from Builder.io
7. ✅ Smoke tests for validation
8. ✅ Performance comparison for SC-006
9. ✅ Incremental README updates per constitution
10. ✅ Automated Wix code verification

Task breakdown complete. Ready for implementation via `/speckit.implement`.

## Notes

- Affiliation data remains in Wix until separate migration (out of scope)
- Mention calculation must use mapping file to translate Wix affiliation tag IDs to Builder.io
- Deploy as big bang (no feature flags per clarifications)
- Post-deployment validation via automated smoke tests + manual UI spot-checks
- Existing test infrastructure (Playwright) sufficient for E2E validation

## Next Steps

**Current Phase**: Tasks complete, ready for implementation

**Run Next**: `/speckit.implement` to begin implementation in phases

**Implementation Order**:

1. Phase 1: Setup (verify prerequisites)
2. Phase 2: Foundational (build transformation utilities)
3. Phase 3-6: User Stories (implement features independently)
4. Phase 7: Polish (smoke tests and documentation)
