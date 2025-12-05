# Implementation Plan: Person-Page Creation Migration from Wix to Builder.io

**Branch**: `007-person-page-builder` | **Date**: 2025-12-05 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/007-person-page-builder/spec.md`

## Summary

Migrate person-page create and update operations from Wix to Builder.io. This follows the **exact same pattern** established in `005-project-page-builder` and `006-organisation-page-builder`. The data is already migrated to Builder.io's `info-page` model. All API routes and utility functions from previous migrations are reusable.

**CRITICAL UNIQUE REQUIREMENT**: Unlike project/organisation pages, person-page MUST retain the Wix `updateMember()` call to sync the contact nickname when the person tag name changes. This is required for Wix authentication display.

Key aspects:

- Create/update person info-pages in Builder.io `info-page` model (reuse existing routes)
- Create/delete affiliations in Builder.io `affiliations` model (reuse existing routes)
- Update person tags via existing Builder.io tag utilities
- **RETAIN** Wix `updateMember()` call for nickname sync (DO NOT REMOVE)
- Optimize cache updates (no full refetch/invalidation)
- Remove problematic `handleTagCreated()` call on mount

## Technical Context

**Language/Version**: TypeScript, Next.js 13.4.9 (App Router)
**Primary Dependencies**: Builder.io SDK, React 18, Wix SDK (auth + member nickname), Redis (Upstash)
**Storage**: Builder.io CMS (info-page, affiliations, tag models), Redis cache
**Testing**: Playwright E2E tests, manual validation
**Target Platform**: Web (Next.js deployed on Netlify)
**Project Type**: Web application (Next.js full-stack)
**Performance Goals**: Page save <3 seconds, page load <2 seconds
**Constraints**: Server-side API routes required for private API key, cache optimization required, Wix `updateMember` must be retained
**Scale/Scope**: Single-user save operations, ~100s of person pages

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                             | Status  | Notes                                                             |
| ------------------------------------- | ------- | ----------------------------------------------------------------- |
| I. Migration-First Development        | ✅ PASS | Feature migrates from Wix to Builder.io (except `updateMember`)   |
| II. Content Type Parity               | ✅ PASS | Follows pattern from project-page and organisation-page           |
| III. Backward Compatibility           | ✅ PASS | Uses transformation utilities, maintains component interfaces     |
| IV. Data Integrity & Validation       | ✅ PASS | Validation before save, error handling                            |
| V. Documentation & Migration Tracking | ✅ PASS | Spec and plan documented in specs/ folder                         |
| VI. Performance & Caching             | ✅ PASS | Cache optimization specified (no full refetch, use `updateTag()`) |
| VII. Testing & Quality Assurance      | ✅ PASS | Manual testing plan included                                      |

**Constitution Check Result**: ALL GATES PASS ✅

**Note on Principle I**: The `updateMember()` Wix call is retained because it syncs the member nickname for authentication display purposes. This is NOT a CMS data operation - it's an authentication/identity sync. The Constitution allows Wix for user authentication (Section I: "Wix integration is ONLY maintained for user authentication").

## Project Structure

### Documentation (this feature)

```text
specs/007-person-page-builder/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Research findings (minimal - follows 005/006)
├── data-model.md        # Entity definitions
├── quickstart.md        # Implementation quick start
├── contracts/           # API contracts
│   └── builderInfoPageAPI.md  # References 005/006 contracts
└── checklists/
    └── requirements.md  # Quality checklist
```

### Source Code (repository root)

```text
app/
├── api/
│   └── builder/
│       ├── info-page/           # EXISTING: From 005/006 - Reuse 100%
│       │   ├── route.ts         # POST: Create info-page
│       │   └── [id]/
│       │       └── route.ts     # PUT: Update info-page
│       ├── affiliations/        # EXISTING: From 005/006 - Reuse 100%
│       │   ├── route.ts         # POST: Create affiliation (bulk)
│       │   ├── bulk-delete/
│       │   │   └── route.ts     # POST: Bulk delete affiliations
│       │   └── [id]/
│       │       └── route.ts     # DELETE: Delete affiliation
│       └── tag/                 # EXISTING: Tag API routes
│           └── [id]/
│               └── route.ts     # PUT: Update tag
├── page-components/
│   └── PersonPageComponent/
│       └── PersonPageComponent.tsx  # MODIFY: Replace Wix calls (keep updateMember)
├── utils/
│   ├── builderInfoPageUtils.ts      # EXTEND: Add person write functions
│   └── builderAffiliationUtils.ts   # EXISTING: From 005/006 - Reuse 100%
├── custom-hooks/
│   └── AuthContext/
│       └── AuthContext.tsx          # EXISTING: updateTag, appendAffiliations, removeAffiliations
├── wixUtils/
│   └── client-side.ts               # RETAIN: updateMember function (DO NOT REMOVE)
└── person-page/
    ├── [slug]/
    │   └── page.tsx                 # EXISTING: Read from Builder.io
    └── New_Person/
        └── page.tsx                 # EXISTING: New person page route
```

**Structure Decision**: Reuses existing structure from 005/006. No new API routes needed - only utility functions and component modifications. The Wix `updateMember` function in `wixUtils/client-side.ts` MUST be retained.

## Complexity Tracking

No constitution violations to justify.

## Implementation Phases

### Phase 1: Utility Functions (Data Layer)

Extend `builderInfoPageUtils.ts` with person-specific write operations.

**Files to modify:**

- `app/utils/builderInfoPageUtils.ts` - Add person create/update/transform functions:
  - `transformPersonDataForBuilder(personData, contentText, contentImages)`
  - `createBuilderPersonPage(personData, contentText, contentImages)`
  - `updateBuilderPersonPage(pageId, personData, contentText, contentImages)`

**Pattern to follow:** `transformOrganisationDataForBuilder` from same file

### Phase 2: Component Integration (UI Layer)

Replace Wix API calls in PersonPageComponent with Builder.io calls, EXCEPT `updateMember()`.

**Files to modify:**

- `app/page-components/PersonPageComponent/PersonPageComponent.tsx`
  - Replace `createNewPersonPage` function (keep `updateMember` call)
  - Replace `updateDataToServer` function (keep `updateMember` call)
  - Remove Wix imports for CMS operations (`items`, `insertDataItem`, `bulkInsertItems`, `bulkRemoveItems`, `replaceDataItemReferences`)
  - **RETAIN** Wix import for `updateMember` from `wixUtils/client-side`
  - Remove `handleTagCreated()` call on mount (useEffect around line ~1114)
  - Add `updateTag()` call after tag updates in Builder.io
  - Add `appendAffiliations()` and `removeAffiliations()` calls after affiliation changes
  - Use existing `bulkCreateAffiliations` and `bulkDeleteAffiliations`

### Phase 3: Testing & Validation

- Manual testing of create/update flows
- Verify cache behavior (no full refetch)
- Verify all 4 affiliation types (`current`, `former`, `coordination`, `participation`)
- Verify Wix nickname sync (when person tag name changes, `updateMember` is called)
- Verify no Wix CMS API calls in network tab (only `updateMember` allowed)

## Dependencies

### Existing Code to Reuse (100% from 005/006)

| Component                             | Location                               | Usage                                 |
| ------------------------------------- | -------------------------------------- | ------------------------------------- |
| Info-page POST route                  | `/api/builder/info-page/route.ts`      | Create person info-page               |
| Info-page PUT route                   | `/api/builder/info-page/[id]/route.ts` | Update person info-page               |
| Affiliations routes                   | `/api/builder/affiliations/*`          | Create/delete affiliations            |
| Tag update API                        | `/api/builder/tag/[id]/route.ts`       | Update person tag                     |
| `bulkCreateAffiliations`              | `builderAffiliationUtils.ts`           | Create org/project affiliations       |
| `bulkDeleteAffiliations`              | `builderAffiliationUtils.ts`           | Delete old affiliations               |
| `appendToAffiliationsCache`           | `builderAffiliationUtils.ts`           | Update Redis cache after create       |
| `removeFromAffiliationsCache`         | `builderAffiliationUtils.ts`           | Update Redis cache after delete       |
| `transformReferencesForBuilderCreate` | `builderPostUtils.ts`                  | Convert tags to Builder.io references |
| `updateTag` in AuthContext            | `AuthContext.tsx`                      | Update React state after tag update   |
| `appendAffiliations` in AuthContext   | `AuthContext.tsx`                      | Update React state after affiliations |
| `removeAffiliations` in AuthContext   | `AuthContext.tsx`                      | Update React state after deletions    |

### Code to Retain (Wix - DO NOT REMOVE)

| Component      | Location                  | Why Retained                             |
| -------------- | ------------------------- | ---------------------------------------- |
| `updateMember` | `wixUtils/client-side.ts` | Sync contact nickname for authentication |

### New Code Required

| Component                       | Purpose                                                               |
| ------------------------------- | --------------------------------------------------------------------- |
| `transformPersonDataForBuilder` | Convert component state to Builder.io format (person-specific fields) |
| `createBuilderPersonPage`       | Call POST `/api/builder/info-page` with person data                   |
| `updateBuilderPersonPage`       | Call PUT `/api/builder/info-page/[id]` with person data               |
| Modified `PersonPageComponent`  | Replace Wix CMS calls with Builder.io calls (keep `updateMember`)     |

## Key Differences from Project/Organisation Pages

| Aspect                   | Project-Page                    | Organisation-Page                          | Person-Page                                          |
| ------------------------ | ------------------------------- | ------------------------------------------ | ---------------------------------------------------- |
| Main tag field           | `projectTag` → `project`        | `organisationTag` → `organisation`         | `personTag` → `person`                               |
| Affiliation types        | `coordination`, `participation` | `projectOrganisationRole`, `current`       | `current`, `former`, `coordination`, `participation` |
| Affiliation references   | `projectTag` + `personTag`      | `organisationTag` + `projectTag/personTag` | `personTag` + `organisationTag/projectTag`           |
| Extra link fields        | N/A                             | N/A                                        | `researchGateLink`, `orcidLink`                      |
| Wix integration retained | None                            | None                                       | **`updateMember()` for nickname sync**               |
| Member relationships     | N/A                             | `organisationHasMember/MemberOf`           | N/A                                                  |

## Reference Field Mapping (Person-Specific)

| Component Field | Builder.io Field | Wrapper Key    |
| --------------- | ---------------- | -------------- |
| personTag       | person           | personItem     |
| pageOwner       | pageOwner        | pageOwnerItem  |
| author          | author           | authorItem     |
| pageType        | pageTypes        | pageTypeItem   |
| countryTag      | countryTag       | countryTagItem |
| methods         | methods          | methodsItem    |
| domains         | domains          | domainsItem    |
| activity        | activity         | activityItem   |

## Affiliation Types for Person-Page

| Type             | extraIdentifier | Fields                                          | Description                     |
| ---------------- | --------------- | ----------------------------------------------- | ------------------------------- |
| Current Org      | `current`       | `personTag`, `organisationTag`, `role`, `title` | Current employer/affiliation    |
| Former Org       | `former`        | `personTag`, `organisationTag`, `role`, `title` | Past employer/affiliation       |
| Project Coord    | `coordination`  | `personTag`, `projectTag`, `title`              | Projects person coordinates     |
| Project Particip | `participation` | `personTag`, `projectTag`, `title`              | Projects person participates in |

## Risk Assessment

| Risk                               | Likelihood | Impact | Mitigation                                        |
| ---------------------------------- | ---------- | ------ | ------------------------------------------------- |
| Reference format mismatch          | Low        | High   | Follow exact pattern from organisation-page       |
| Accidentally removing updateMember | Low        | High   | Clear documentation, code review                  |
| Cache update race condition        | Low        | Medium | Update cache after successful API call only       |
| Affiliation delete fails           | Low        | Medium | Continue with successful operations, report fails |
| Missing wrapper key                | Low        | Medium | Reference field mapping table in spec             |
| Wix nickname sync fails            | Low        | Low    | Log warning but don't fail page save              |

## Success Metrics

1. ✅ Create new person page saves to Builder.io `info-page` model
2. ✅ Update existing person page saves to Builder.io
3. ✅ Person tag's `tagPageLink` updated correctly in Builder.io
4. ✅ All 4 affiliation types created/deleted in Builder.io `affiliations` model
5. ✅ **Wix nickname synced via `updateMember()` when person tag name changes**
6. ✅ No Wix CMS API calls in person page save flow (only `updateMember` allowed)
7. ✅ No `handleTagCreated()` on mount - no full cache invalidation
8. ✅ `updateTag()` called after tag updates - React state reflects changes
9. ✅ `appendAffiliations()` and `removeAffiliations()` called after affiliation changes
10. ✅ All existing UI behaviors preserved

## Estimated Effort

| Phase     | Description           | Time Estimate   |
| --------- | --------------------- | --------------- |
| 1         | Utility Functions     | 30 minutes      |
| 2         | Component Integration | 45 minutes      |
| 3         | Testing & Validation  | 30 minutes      |
| **Total** |                       | **~1.75 hours** |

**Note**: Same as organisation-page due to 70%+ code reuse. The Wix `updateMember` retention adds minimal complexity as it's just keeping existing code.
