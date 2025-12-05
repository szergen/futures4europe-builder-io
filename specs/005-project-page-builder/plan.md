# Implementation Plan: Project-Page Creation Migration from Wix to Builder.io

**Branch**: `005-project-page-builder` | **Date**: 2025-12-05 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-project-page-builder/spec.md`

## Summary

Migrate project-page create and update operations from Wix to Builder.io. The data is already migrated to Builder.io's `info-page` model. This involves replacing Wix API calls (`insertDataItem`, `updateDataItem`, `replaceDataItemReferences`, `bulkInsertItems`, `bulkRemoveItems`) in `ProjectPageComponent.tsx` with Builder.io Write API calls, following the established pattern from the post-page migration.

Key aspects:

- Create/update project info-pages in Builder.io `info-page` model
- Create/delete affiliations in Builder.io `affiliations` model
- Update project tags via existing Builder.io tag utilities
- Optimize cache updates (no full refetch/invalidation)

## Technical Context

**Language/Version**: TypeScript, Next.js 13.4.9 (App Router)
**Primary Dependencies**: Builder.io SDK, React 18, Wix SDK (auth only), Redis (Upstash)
**Storage**: Builder.io CMS (info-page, affiliations, tag models), Redis cache
**Testing**: Playwright E2E tests
**Target Platform**: Web (Next.js deployed on Netlify)
**Project Type**: Web application (Next.js full-stack)
**Performance Goals**: Page save <3 seconds, page load <2 seconds
**Constraints**: Server-side API routes required for private API key, cache optimization required
**Scale/Scope**: Single-user save operations, ~100s of project pages

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                             | Status  | Notes                                                         |
| ------------------------------------- | ------- | ------------------------------------------------------------- |
| I. Migration-First Development        | ✅ PASS | Feature migrates from Wix to Builder.io                       |
| II. Content Type Parity               | ✅ PASS | Follows pattern established for post-page                     |
| III. Backward Compatibility           | ✅ PASS | Uses transformation utilities, maintains component interfaces |
| IV. Data Integrity & Validation       | ✅ PASS | Validation before save, error handling                        |
| V. Documentation & Migration Tracking | ✅ PASS | Spec and plan documented in specs/ folder                     |
| VI. Performance & Caching             | ✅ PASS | Cache optimization specified (no full refetch)                |
| VII. Testing & Quality Assurance      | ✅ PASS | E2E test plan included                                        |

**Constitution Check Result**: ALL GATES PASS ✅

## Project Structure

### Documentation (this feature)

```text
specs/005-project-page-builder/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Research findings
├── data-model.md        # Entity definitions
├── quickstart.md        # Implementation quick start
├── contracts/           # API contracts
│   └── builderInfoPageAPI.md
└── checklists/
    └── requirements.md  # Quality checklist
```

### Source Code (repository root)

```text
app/
├── api/
│   └── builder/
│       ├── info-page/           # NEW: Info-page API routes
│       │   ├── route.ts         # POST: Create info-page
│       │   └── [id]/
│       │       └── route.ts     # PUT: Update info-page
│       ├── affiliations/        # NEW: Affiliation API routes
│       │   ├── route.ts         # POST: Create affiliation (bulk)
│       │   └── [id]/
│       │       └── route.ts     # DELETE: Delete affiliation
│       ├── tag/                 # EXISTING: Tag API routes
│       │   └── [id]/
│       │       └── route.ts     # PUT: Update tag
│       └── post/                # EXISTING: Post API routes (reference)
├── page-components/
│   └── ProjectPageComponent/
│       └── ProjectPageComponent.tsx  # MODIFY: Replace Wix calls
├── utils/
│   ├── builderInfoPageUtils.ts       # EXTEND: Add write functions
│   └── builderAffiliationUtils.ts    # EXTEND: Add write functions
└── project-page/
    ├── [slug]/
    │   └── page.tsx                  # EXISTING: Read from Builder.io
    └── New_Project/
        └── page.tsx                  # EXISTING: New project page
```

**Structure Decision**: Follows existing Next.js App Router structure with API routes in `app/api/builder/` and utilities in `app/utils/`. New API routes for info-page and affiliations follow the same pattern as existing post and tag routes.

## Complexity Tracking

No constitution violations to justify.

## Implementation Phases

### Phase 1: API Infrastructure (Foundation)

Create the server-side API routes that handle Builder.io Write API calls with the private key.

**Files to create:**

- `app/api/builder/info-page/route.ts` - Create info-page
- `app/api/builder/info-page/[id]/route.ts` - Update info-page
- `app/api/builder/affiliations/route.ts` - Bulk create affiliations
- `app/api/builder/affiliations/[id]/route.ts` - Delete affiliation

### Phase 2: Utility Functions (Data Layer)

Extend existing utilities with write operations.

**Files to modify:**

- `app/utils/builderInfoPageUtils.ts` - Add create/update/transform functions
- `app/utils/builderAffiliationUtils.ts` - Add create/delete functions with cache updates

### Phase 3: Component Integration (UI Layer)

Replace Wix API calls in ProjectPageComponent with Builder.io calls.

**Files to modify:**

- `app/page-components/ProjectPageComponent/ProjectPageComponent.tsx`
  - Replace `createNewProjectPage` function
  - Replace `updateDataToServer` function
  - Remove Wix imports (`useWixModules`, `items`)

### Phase 4: Testing & Validation

- Manual testing of create/update flows
- E2E test for project page creation
- Verify cache behavior (no full refetch)
- Verify affiliation management

## Dependencies

### Existing Code to Reuse

| Component           | Location                | Usage                                     |
| ------------------- | ----------------------- | ----------------------------------------- |
| Tag update API      | `/api/builder/tag/[id]` | Update project tag's name and tagPageLink |
| Tag cache update    | `builderTagUtils.ts`    | Cache optimization pattern                |
| Post API pattern    | `/api/builder/post/`    | Template for info-page routes             |
| Reference transform | `builderPostUtils.ts`   | `transformReferencesForBuilderCreate`     |

### New Code Required

| Component                   | Purpose                                      |
| --------------------------- | -------------------------------------------- |
| Info-page API routes        | Server-side create/update with private key   |
| Affiliation API routes      | Server-side create/delete with private key   |
| Project transform function  | Convert component state to Builder.io format |
| Affiliation write functions | Create/delete with cache update              |

## Risk Assessment

| Risk                        | Likelihood | Impact | Mitigation                                           |
| --------------------------- | ---------- | ------ | ---------------------------------------------------- |
| Reference format mismatch   | Medium     | High   | Use existing post-page pattern, test thoroughly      |
| Cache update race condition | Low        | Medium | Update cache after successful API call only          |
| Affiliation delete fails    | Low        | Medium | Continue with successful operations, report failures |
| API rate limiting           | Low        | Low    | Single-user operations, unlikely to hit limits       |

## Success Metrics

1. ✅ Create new project page saves to Builder.io `info-page` model
2. ✅ Update existing project page saves to Builder.io
3. ✅ Project tag's `tagPageLink` updated correctly
4. ✅ Affiliations created/deleted in Builder.io `affiliations` model
5. ✅ No Wix API calls in project page save flow
6. ✅ No full cache refetch/invalidation during save
7. ✅ All existing UI behaviors preserved
