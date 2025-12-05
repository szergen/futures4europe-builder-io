# Research: Person-Page Builder.io Migration

**Feature**: 007-person-page-builder
**Date**: 2025-12-05

## Overview

This research document captures findings for the person-page migration. Due to the established patterns from `005-project-page-builder` and `006-organisation-page-builder`, minimal additional research is required.

## Decision Log

### D1: API Route Strategy

**Decision**: Reuse existing `/api/builder/info-page` routes (100% reuse)

**Rationale**: The `info-page` model handles all info-page types (project, organisation, person). The existing routes are generic and accept any valid info-page data structure.

**Alternatives Considered**:

- Create person-specific routes → Rejected (unnecessary duplication)
- Direct Builder.io SDK calls → Rejected (exposes private API key)

### D2: Affiliation Management

**Decision**: Reuse existing `bulkCreateAffiliations` and `bulkDeleteAffiliations` utilities

**Rationale**: The affiliation model is generic. The `extraIdentifier` field distinguishes between affiliation types (`current`, `former`, `coordination`, `participation`). Person-page has 4 affiliation types, which is more than project (2) or organisation (2), but the same utility handles all.

**Alternatives Considered**:

- Create person-specific affiliation functions → Rejected (unnecessary duplication)

### D3: Wix `updateMember` Retention

**Decision**: RETAIN Wix `updateMember()` call for nickname synchronization

**Rationale**: The person tag name is synced with the Wix member nickname for authentication display purposes. This is NOT a CMS data operation - it falls under the Constitution's allowance for "Wix integration for user authentication" (Principle I).

**Alternatives Considered**:

- Remove `updateMember` call → Rejected (breaks authentication display)
- Migrate nickname to Builder.io → Not feasible (Wix controls member identity)

### D4: Cache Optimization Strategy

**Decision**: Follow same pattern as organisation-page (remove `handleTagCreated()` on mount, use granular updates)

**Rationale**: The existing pattern from 006 successfully prevents full cache invalidation while maintaining data consistency.

**Alternatives Considered**:

- Full cache refresh → Rejected (poor performance, already proven unnecessary)

### D5: Reference Field Format

**Decision**: Use wrapper keys for all reference fields (same as project/organisation pages)

**Rationale**: Builder.io list reference fields require wrapper keys for correct storage.

**Reference Field Mapping**:
| Component Field | Builder.io Field | Wrapper Key |
|-----------------|------------------|-----------------|
| personTag | person | personItem |
| pageOwner | pageOwner | pageOwnerItem |
| author | author | authorItem |
| pageType | pageTypes | pageTypeItem |
| countryTag | countryTag | countryTagItem |
| methods | methods | methodsItem |
| domains | domains | domainsItem |
| activity | activity | activityItem |

## Key Learnings from 005/006

1. **Wrapper Keys**: Every reference field needs its unique wrapper key - always check the transform function
2. **Cache Optimization**: Never call `handleTagCreated()` on component mount - causes full Redis invalidation
3. **State Updates**: Always call `updateTag()`, `appendAffiliations()`, `removeAffiliations()` after changes
4. **Affiliation Flow**: Delete old affiliations first, then create new ones (not atomic, but works)
5. **Error Handling**: Log failures but continue with successful operations for partial success

## Resolved Clarifications

All technical unknowns were resolved by referencing 005/006 implementations. No new clarifications required.
