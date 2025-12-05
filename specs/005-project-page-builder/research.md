# Research: Project-Page Builder.io Migration

**Feature**: 005-project-page-builder
**Date**: 2025-12-05

## Research Summary

Investigation into patterns and best practices for migrating project-page create/update operations from Wix to Builder.io, following the established post-page migration pattern.

---

## Decision 1: API Route Structure for Info-Page

**Decision**: Create separate API routes at `/api/builder/info-page` and `/api/builder/info-page/[id]`

**Rationale**:

- Follows the established pattern from `/api/builder/post` routes
- Server-side routes required to protect `BUILDER_PRIVATE_API_KEY`
- Separation of concerns: POST for create, PUT for update
- Consistent with Next.js App Router conventions

**Alternatives Considered**:

- Single route with method switching: Rejected - less clear, harder to maintain
- Direct Builder.io SDK calls from client: Rejected - exposes private API key
- Shared route for all info-page types: Considered but deferred - current scope is project-page only

**Implementation Pattern** (from `/api/builder/post/route.ts`):

```typescript
const BUILDER_API_URL = "https://builder.io/api/v1/write";
const response = await fetch(`${BUILDER_API_URL}/info-page`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${BUILDER_PRIVATE_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
});
```

---

## Decision 2: Reference Field Format for Info-Page Model

**Decision**: Use wrapper keys matching the existing info-page model structure

**Rationale**:

- The `transformBuilderInfoPageToWixFormat` function expects specific wrapper keys
- Reference fields must use `{wrapperKey: {@type, id, model}}` format
- Wrapper keys are documented in spec's Reference Field Mapping table

**Wrapper Key Mapping** (from `builderInfoPageUtils.ts`):
| Field | Wrapper Key |
|-------|-------------|
| project | projectItem |
| pageOwner | pageOwnerItem |
| author | authorItem |
| pageTypes | pageTypeItem |
| countryTag | countryTagItem |
| methods | methodsItem |
| domains | domainsItem |
| projectCoordinator | projectCoordinatorItem |
| projectParticipantTeam | projectParticipantTeamItem |
| projectOrganisation | projectOrganisationItem |
| projectFunded | projectFundedItem |

**Implementation Pattern** (from `builderPostUtils.ts`):

```typescript
export function transformReferencesForBuilderCreate(
  tags: any[] | undefined,
  modelName: string = "tag",
  wrapperKey?: string
): any[] {
  return tags
    .filter((tag) => tag && tag._id)
    .map((tag) => {
      const reference = {
        "@type": "@builder.io/core:Reference",
        id: tag._id,
        model: modelName,
      };
      return wrapperKey ? { [wrapperKey]: reference } : reference;
    });
}
```

---

## Decision 3: Affiliation Write Operations

**Decision**: Create/delete affiliations via Builder.io API with cache updates (not full invalidation)

**Rationale**:

- Affiliations are already migrated to Builder.io `affiliations` model
- Current Wix calls (`bulkInsertItems`, `bulkRemoveItems`) must be replaced
- Cache optimization: append/remove from cache instead of full refetch
- Follow the same cache update pattern used for tags

**Affiliation Model Fields**:

- `projectTag`: Reference to tag model
- `personTag`: Reference to tag model (for coordination/participation)
- `organisationTag`: Reference to tag model (for projectOrganisationRole)
- `role`: String (for organisation roles)
- `extraIdentifier`: String ("coordination", "participation", "projectOrganisationRole")
- `title`: String (e.g., "ProjectName -to- PersonName")

**Cache Update Pattern** (from `builderTagUtils.ts`):

```typescript
// After successful create - append to cache
const cached = await RedisCacheService.getFromCache(AFFILIATIONS_CACHE_KEY);
if (cached && Array.isArray(cached)) {
  cached.push(transformedAffiliation);
  await RedisCacheService.saveToCache(
    AFFILIATIONS_CACHE_KEY,
    cached,
    CACHE_TTL
  );
}

// After successful delete - remove from cache
if (cached && Array.isArray(cached)) {
  const filtered = cached.filter((aff) => aff._id !== deletedId);
  await RedisCacheService.saveToCache(
    AFFILIATIONS_CACHE_KEY,
    filtered,
    CACHE_TTL
  );
}
```

---

## Decision 4: Tag Update Strategy

**Decision**: Reuse existing `/api/builder/tag/[id]` route for updating project tag's `name` and `tagPageLink`

**Rationale**:

- Tag update functionality already implemented and tested
- `updateBuilderTag` function handles cache updates
- No need to duplicate tag update logic

**Usage Pattern**:

```typescript
// Update project tag with new tagPageLink
const response = await fetch(`/api/builder/tag/${projectTag._id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: projectData.projectTag.name,
    tagPageLink: `/project/${slug}`,
  }),
});
```

---

## Decision 5: Slug Generation

**Decision**: Reuse existing `sanitizeTitleForSlug` + `generateUniqueHash` pattern

**Rationale**:

- Already implemented and used across the codebase
- Ensures unique slugs with hash suffix
- Format: `/project/{sanitized-name}-{hash}`

**Implementation**:

```typescript
const slug =
  sanitizeTitleForSlug(projectData?.projectTag?.name) +
  "-" +
  generateUniqueHash();
const fullSlug = `/project/${slug}`;
```

---

## Decision 6: Error Handling Strategy

**Decision**: Graceful degradation with user notification

**Rationale**:

- Page save is critical - should complete even if secondary operations fail
- User should be informed of partial failures
- Follow existing pattern from `invalidateProjectPageCache`

**Error Priority**:

1. Info-page save failure → Block, show error, keep edit state
2. Tag update failure → Continue, show warning
3. Affiliation create/delete failure → Continue, show warning
4. Cache update failure → Continue, log warning

---

## Decision 7: Component State to Builder.io Transformation

**Decision**: Create `transformProjectDataForBuilder` function in `builderInfoPageUtils.ts`

**Rationale**:

- Encapsulate all transformation logic in utility file
- Follow pattern from `transformPostDataForBuilderCreate` in `builderPostUtils.ts`
- Keep component code clean

**Fields to Transform**:

- Basic fields: title, description, slug
- Content sections: postContentRIch1-10
- Images: postImage1-10
- Dates: projectStartDate, projectEndDate
- Links: linkedinLink, websiteLink
- Media: mediaFiles array
- References: All tag references with wrapper keys

---

## Open Questions (Resolved)

1. ✅ **Q**: Should affiliations be created in a single batch call or individually?
   **A**: Create bulk endpoint for efficiency, but handle individual failures gracefully

2. ✅ **Q**: How to handle the "replace pattern" for affiliations (delete old, create new)?
   **A**: Delete old affiliations first, then create new ones. If delete fails, continue with creates.

3. ✅ **Q**: Should we use DELETE or PUT (unpublish) for affiliation removal?
   **A**: Use DELETE for clean removal. Builder.io supports DELETE on write API.

---

## References

- Post-page migration pattern: `app/api/builder/post/route.ts`
- Post utilities: `app/utils/builderPostUtils.ts`
- Tag utilities: `app/utils/builderTagUtils.ts`
- Affiliation utilities (read): `app/utils/builderAffiliationUtils.ts`
- Info-page utilities (read): `app/utils/builderInfoPageUtils.ts`
- Builder.io Write API: https://www.builder.io/c/docs/write-api
