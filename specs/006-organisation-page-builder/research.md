# Research: Organisation-Page Builder Migration

**Branch**: `006-organisation-page-builder` | **Date**: 2025-12-05

## Summary

This migration follows the **exact pattern** established in `005-project-page-builder`. All technical decisions and patterns have been validated in the previous implementation. This document references those decisions rather than re-researching.

## Decisions (Inherited from 005)

### 1. API Route Pattern

**Decision**: Use Next.js API routes as proxy to Builder.io Write API
**Rationale**: Private API key must not be exposed to client-side code
**Reference**: `005-project-page-builder/research.md`
**Reuse**: 100% - same routes work for organisation pages

### 2. Reference Field Format

**Decision**: Use wrapper keys for list reference fields (e.g., `{organisationItem: {...}}`)
**Rationale**: Builder.io requires this format for Reference fields in lists
**Reference**: Validated in project-page implementation
**Reuse**: Same `transformReferencesForBuilderCreate` function

### 3. Cache Optimization Strategy

**Decision**: Update cache entries directly instead of full invalidation
**Rationale**: Prevents unnecessary network requests and improves UX
**Key Learning**: Do NOT call `handleTagCreated()` on mount - use `updateTag()` instead
**Reference**: Fix applied in 005 during testing

### 4. Affiliation Management

**Decision**: Delete old affiliations before creating new ones (replace pattern)
**Rationale**: Simpler than diff-based updates, avoids orphaned records
**Reference**: `bulkDeleteAffiliations` + `bulkCreateAffiliations` pattern from 005
**Reuse**: 100% - same functions, different `extraIdentifier` values

## Organisation-Specific Decisions

### 5. Affiliation ExtraIdentifier Values

**Decision**: Use `projectOrganisationRole` for project affiliations, `current` for people affiliations
**Rationale**: Matches existing Wix data structure and read-side expectations
**Source**: `OrganisationPageComponent.tsx` lines 112-141

### 6. Organisation Type Handling

**Decision**: Treat as single-select wrapped in array (matches existing component behavior)
**Rationale**: Current Wix code wraps single selection in array for `replaceDataItemReferences`
**Source**: `OrganisationPageComponent.tsx` lines 728-736

### 7. Member Organisations

**Decision**: Use reference arrays for `organisationHasMember` and `organisationMemberOf`
**Rationale**: These are multi-select organisation tag references
**Wrapper Keys**: `organisationHasMemberItem`, `organisationMemberOfItem`

## No Additional Research Required

All patterns, utilities, and API routes have been validated in `005-project-page-builder`. This implementation is a straightforward application of those patterns to the organisation page component.
