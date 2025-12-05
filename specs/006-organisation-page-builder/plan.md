# Implementation Plan: Organisation-Page Creation Migration from Wix to Builder.io

**Branch**: `006-organisation-page-builder` | **Date**: 2025-12-05 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/006-organisation-page-builder/spec.md`

## Summary

Migrate organisation-page create and update operations from Wix to Builder.io. This follows the **exact same pattern** established in `005-project-page-builder`. The data is already migrated to Builder.io's `info-page` model. All API routes and utility functions from the project-page migration are reusable.

Key aspects:

- Create/update organisation info-pages in Builder.io `info-page` model (reuse existing routes)
- Create/delete affiliations in Builder.io `affiliations` model (reuse existing routes)
- Update organisation tags via existing Builder.io tag utilities
- Optimize cache updates (no full refetch/invalidation)
- Remove problematic `handleTagCreated()` call on mount

## Technical Context

**Language/Version**: TypeScript, Next.js 13.4.9 (App Router)
**Primary Dependencies**: Builder.io SDK, React 18, Wix SDK (auth only), Redis (Upstash)
**Storage**: Builder.io CMS (info-page, affiliations, tag models), Redis cache
**Testing**: Playwright E2E tests, manual validation
**Target Platform**: Web (Next.js deployed on Netlify)
**Project Type**: Web application (Next.js full-stack)
**Performance Goals**: Page save <3 seconds, page load <2 seconds
**Constraints**: Server-side API routes required for private API key, cache optimization required
**Scale/Scope**: Single-user save operations, ~50s of organisation pages

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                             | Status  | Notes                                                             |
| ------------------------------------- | ------- | ----------------------------------------------------------------- |
| I. Migration-First Development        | ✅ PASS | Feature migrates from Wix to Builder.io                           |
| II. Content Type Parity               | ✅ PASS | Follows pattern established for project-page (same as post-page)  |
| III. Backward Compatibility           | ✅ PASS | Uses transformation utilities, maintains component interfaces     |
| IV. Data Integrity & Validation       | ✅ PASS | Validation before save, error handling                            |
| V. Documentation & Migration Tracking | ✅ PASS | Spec and plan documented in specs/ folder                         |
| VI. Performance & Caching             | ✅ PASS | Cache optimization specified (no full refetch, use `updateTag()`) |
| VII. Testing & Quality Assurance      | ✅ PASS | Manual testing plan included                                      |

**Constitution Check Result**: ALL GATES PASS ✅

## Project Structure

### Documentation (this feature)

```text
specs/006-organisation-page-builder/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Research findings (minimal - follows 005)
├── data-model.md        # Entity definitions
├── quickstart.md        # Implementation quick start
├── contracts/           # API contracts
│   └── builderInfoPageAPI.md  # References 005 contracts
└── checklists/
    └── requirements.md  # Quality checklist
```

### Source Code (repository root)

```text
app/
├── api/
│   └── builder/
│       ├── info-page/           # EXISTING: From 005 - Reuse 100%
│       │   ├── route.ts         # POST: Create info-page
│       │   └── [id]/
│       │       └── route.ts     # PUT: Update info-page
│       ├── affiliations/        # EXISTING: From 005 - Reuse 100%
│       │   ├── route.ts         # POST: Create affiliation (bulk)
│       │   ├── bulk-delete/
│       │   │   └── route.ts     # POST: Bulk delete affiliations
│       │   └── [id]/
│       │       └── route.ts     # DELETE: Delete affiliation
│       └── tag/                 # EXISTING: Tag API routes
│           └── [id]/
│               └── route.ts     # PUT: Update tag
├── page-components/
│   └── OrganisationPageComponent/
│       └── OrganisationPageComponent.tsx  # MODIFY: Replace Wix calls
├── utils/
│   ├── builderInfoPageUtils.ts       # EXTEND: Add organisation write functions
│   └── builderAffiliationUtils.ts    # EXISTING: From 005 - Reuse 100%
└── organisation-page/
    ├── [slug]/
    │   └── page.tsx                  # EXISTING: Read from Builder.io
    └── New_Organisation/
        └── page.tsx                  # EXISTING: New organisation page
```

**Structure Decision**: Reuses existing structure from 005-project-page-builder. No new API routes needed - only utility functions and component modifications.

## Complexity Tracking

No constitution violations to justify.

## Implementation Phases

### Phase 1: Utility Functions (Data Layer)

Extend `builderInfoPageUtils.ts` with organisation-specific write operations.

**Files to modify:**

- `app/utils/builderInfoPageUtils.ts` - Add organisation create/update/transform functions:
  - `transformOrganisationDataForBuilder(organisationData, contentText, contentImages)`
  - `createBuilderOrganisationPage(organisationData, contentText, contentImages)`
  - `updateBuilderOrganisationPage(pageId, organisationData, contentText, contentImages)`

**Pattern to follow:** `transformProjectDataForBuilder` from same file

### Phase 2: Component Integration (UI Layer)

Replace Wix API calls in OrganisationPageComponent with Builder.io calls.

**Files to modify:**

- `app/page-components/OrganisationPageComponent/OrganisationPageComponent.tsx`
  - Replace `createNewOrganisationPage` function
  - Replace `updateDataToServer` function
  - Remove Wix imports (`useWixModules`, `items`, `bulkInsertItems`, `bulkRemoveItems`, etc.)
  - Remove `handleTagCreated()` call on mount (useEffect line ~988)
  - Add `updateTag()` call after tag updates
  - Use existing `bulkCreateAffiliations` and `bulkDeleteAffiliations`

### Phase 3: Testing & Validation

- Manual testing of create/update flows
- Verify cache behavior (no full refetch)
- Verify affiliation management (`projectOrganisationRole` and `current`)
- Verify no Wix API calls in network tab

## Dependencies

### Existing Code to Reuse (100% from 005)

| Component                             | Location                               | Usage                                 |
| ------------------------------------- | -------------------------------------- | ------------------------------------- |
| Info-page POST route                  | `/api/builder/info-page/route.ts`      | Create organisation info-page         |
| Info-page PUT route                   | `/api/builder/info-page/[id]/route.ts` | Update organisation info-page         |
| Affiliations routes                   | `/api/builder/affiliations/*`          | Create/delete affiliations            |
| Tag update API                        | `/api/builder/tag/[id]/route.ts`       | Update organisation tag               |
| `bulkCreateAffiliations`              | `builderAffiliationUtils.ts`           | Create project/people affiliations    |
| `bulkDeleteAffiliations`              | `builderAffiliationUtils.ts`           | Delete old affiliations               |
| `transformReferencesForBuilderCreate` | `builderPostUtils.ts`                  | Convert tags to Builder.io references |
| `updateTag` in AuthContext            | `AuthContext.tsx`                      | Update React state after tag update   |

### New Code Required

| Component                             | Purpose                                                                     |
| ------------------------------------- | --------------------------------------------------------------------------- |
| `transformOrganisationDataForBuilder` | Convert component state to Builder.io format (organisation-specific fields) |
| `createBuilderOrganisationPage`       | Call POST `/api/builder/info-page` with organisation data                   |
| `updateBuilderOrganisationPage`       | Call PUT `/api/builder/info-page/[id]` with organisation data               |
| Modified `OrganisationPageComponent`  | Replace Wix calls with Builder.io calls                                     |

## Key Differences from Project-Page

| Aspect                 | Project-Page                         | Organisation-Page                                 |
| ---------------------- | ------------------------------------ | ------------------------------------------------- |
| Main tag field         | `projectTag` → `project`             | `organisationTag` → `organisation`                |
| Affiliation types      | `coordination`, `participation`      | `projectOrganisationRole`, `current`              |
| Affiliation references | `projectTag` + `personTag`           | `organisationTag` + `projectTag`/`personTag`      |
| Extra fields           | `projectStartDate`, `projectEndDate` | `organisationEstablishedDate`, `organisationType` |
| Member relationships   | N/A                                  | `organisationHasMember`, `organisationMemberOf`   |
| Activity field         | N/A                                  | `activity` (reference array)                      |

## Risk Assessment

| Risk                        | Likelihood | Impact | Mitigation                                        |
| --------------------------- | ---------- | ------ | ------------------------------------------------- |
| Reference format mismatch   | Low        | High   | Follow exact pattern from project-page            |
| Cache update race condition | Low        | Medium | Update cache after successful API call only       |
| Affiliation delete fails    | Low        | Medium | Continue with successful operations, report fails |
| Missing wrapper key         | Low        | Medium | Reference field mapping table in spec             |

## Success Metrics

1. ✅ Create new organisation page saves to Builder.io `info-page` model
2. ✅ Update existing organisation page saves to Builder.io
3. ✅ Organisation tag's `tagPageLink` updated correctly
4. ✅ Affiliations created/deleted in Builder.io `affiliations` model
5. ✅ No Wix API calls in organisation page save flow
6. ✅ No `handleTagCreated()` on mount - no full cache invalidation
7. ✅ `updateTag()` called after tag updates - React state reflects changes
8. ✅ All existing UI behaviors preserved

## Estimated Effort

| Phase     | Description           | Time Estimate   |
| --------- | --------------------- | --------------- |
| 1         | Utility Functions     | 30 minutes      |
| 2         | Component Integration | 45 minutes      |
| 3         | Testing & Validation  | 30 minutes      |
| **Total** |                       | **~1.75 hours** |

**Note**: Significantly faster than project-page (~4 hours) due to 70%+ code reuse.
