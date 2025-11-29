<!--
  SYNC IMPACT REPORT

  Version Change: 1.0.0 → 1.0.1

  Modified Sections:
  - [UPDATED] V. Documentation & Migration Tracking - Updated file paths to reflect new docs/ folder structure

  Changes:
  - Documentation now organized in docs/ folder with subfolders
  - Updated references: docs/migration/[content-type]/ structure
  - Added documentation organization requirements

  Templates Requiring Updates:
  ✅ plan-template.md - No changes needed
  ✅ spec-template.md - No changes needed
  ✅ tasks-template.md - No changes needed

  Follow-up TODOs: None
-->

# Futures4Europe Builder.io Migration Constitution

## Core Principles

### I. Migration-First Development

**All new features and changes MUST support the ongoing CMS migration from Wix to Builder.io.**

- Every feature implementation MUST work with Builder.io as the primary data source
- Wix integration is ONLY maintained for user authentication
- Legacy Wix CMS code paths MUST be clearly marked for deprecation
- New code MUST NOT introduce additional Wix CMS dependencies
- All content fetching MUST use Builder.io SDK or transformation utilities

**Rationale**: The project is in active migration. Any deviation from Builder.io-first development creates technical debt that delays completion of the migration and creates maintenance burden.

### II. Content Type Parity

**All 4 content types (post, project, person, organisation) MUST be treated with equal priority and consistency.**

- Schema changes to one content type MUST be evaluated for applicability to others
- Transformation utilities MUST follow the same patterns across all content types
- Display components MUST maintain consistent structure and behavior
- Editing interfaces MUST provide equivalent functionality across all types
- Migration scripts MUST handle all content types systematically

**Rationale**: The platform's value depends on consistent user experience across all content types. Treating any type as secondary leads to fragmented functionality and user confusion.

### III. Backward Compatibility

**Data transformations MUST maintain compatibility with existing component interfaces.**

- Builder.io data MUST be transformed to match existing Wix-format component contracts
- Breaking changes to component interfaces require migration plan and approval
- Transformation utilities (e.g., `transformBuilderPostToWixFormat`) are non-negotiable during migration
- Date formats, reference structures, and field naming MUST match legacy expectations
- Phase 4 cleanup MAY remove transformation layers after full validation

**Rationale**: Existing components have proven functionality. Maintaining their interfaces reduces risk during migration and enables incremental progress without requiring simultaneous refactoring of the entire UI layer.

### IV. Data Integrity & Validation

**Content migration and synchronization MUST preserve data integrity at all stages.**

- Migration scripts MUST validate source data before transformation
- Transformed data MUST be validated against Builder.io schema before upload
- All migrations MUST support dry-run mode for validation
- Migration results MUST be logged with success/failure counts
- Failed migrations MUST provide detailed error information for remediation
- No data loss is acceptable - all migration operations MUST be reversible or auditable

**Rationale**: The platform contains valuable foresight research and community contributions. Any data loss or corruption undermines trust and may be unrecoverable.

### V. Documentation & Migration Tracking

**All migration work MUST be documented with current status and remaining tasks.**

- All documentation MUST be organized in the `docs/` folder with logical grouping
- Migration documentation MUST be organized by content type: `docs/migration/[content-type]/`
- Each content type MUST have migration status documents in their respective folders:
  - Posts: `docs/migration/posts/`
  - Projects: `docs/migration/projects/`
  - Persons: `docs/migration/persons/`
  - Organisations: `docs/migration/organisations/`
  - Tags: `docs/migration/tags/`
  - Info Pages: `docs/migration/info-pages/`
- Builder.io setup documentation MUST be in `docs/builder-io/`
- README.md MUST reflect current migration state with checkboxes and updated doc links
- New features MUST update relevant migration documentation
- Breaking changes MUST be documented in migration guides
- Scripts MUST include inline documentation explaining transformation logic
- Quick-start guides MUST be created for each migrated content type

**Rationale**: The project involves complex, multi-phase migration work. Without comprehensive, well-organized documentation, team members cannot understand current state, make informed decisions, or coordinate effectively. Organized documentation structure improves discoverability and maintainability.

### VI. Performance & Caching

**Content delivery MUST leverage caching at multiple layers for optimal performance.**

- Builder.io content MUST be cached using Redis (Upstash)
- JSON file cache MUST be maintained for fallback and local development
- Next.js ISR (Incremental Static Regeneration) MUST be configured for all content pages
- Cache invalidation endpoints MUST be provided for content updates
- Cache warming strategies MUST be implemented for critical content
- Performance goals: Page load <2s, Time to Interactive <3s

**Rationale**: CMS-based websites depend on effective caching to deliver good user experience. Multiple cache layers provide resilience and optimal performance across different deployment scenarios.

### VII. Testing & Quality Assurance

**All content types and migration work MUST include appropriate testing coverage.**

- E2E tests MUST cover page navigation and content display for all content types
- Migration scripts MUST be tested on sample data before production runs
- Transformation utilities MUST have unit tests for edge cases
- Visual regression testing SHOULD be performed on component changes
- Test data MUST include all content type variations (post, event, project result, etc.)
- Breaking changes MUST include test updates before implementation

**Rationale**: The migration involves complex data transformations and multiple content types. Testing prevents regressions, validates transformations, and ensures consistent behavior across all page types.

## CMS Integration Standards

### Builder.io Models

**All content MUST use properly configured Builder.io models with defined schemas:**

- Model naming: `[content-type]-page` (e.g., `post-page`, `project-page`)
- Required fields: `slug`, `title`, `createdDate`, `lastUpdated`, `published`
- Reference fields MUST use Builder.io Reference type with proper model linking
- Date fields MUST use Unix timestamps (milliseconds) for JavaScript compatibility
- Rich text fields MUST be validated for supported HTML/formatting
- Tag and relationship fields MUST use Builder.io Reference arrays

### Data Transformation Layer

**All Builder.io data MUST pass through transformation utilities:**

- Location: `app/utils/builder[ContentType]Utils.ts`
- Required functions:
  - `getBuilder[ContentType]BySlug(slug: string)` - fetch single item
  - `getAllBuilder[ContentType]s()` - fetch all for static generation
  - `transformBuilder[ContentType]ToWixFormat(data: any)` - transform for components
- Transformations MUST handle nested Builder.io References
- Transformations MUST preserve all metadata (id, createdDate, lastUpdated, published)
- Error handling MUST log failures and return null gracefully

### API Routes

**All Builder.io interactions MUST use centralized utilities:**

- Use `getBuilderContent()` from `app/shared-components/Builder/builderUtils.ts`
- Never call Builder.io SDK directly from components
- API routes MAY bypass transformation for admin/editing functionality
- All API routes MUST implement error handling and logging
- API routes MUST support cache invalidation after content updates

## Development Workflow

### Feature Development

1. **Planning**: Review relevant migration documentation before starting
2. **Constitution Check**: Verify alignment with all 7 core principles
3. **Implementation**: Follow established patterns from migrated content types
4. **Testing**: Include E2E tests for new functionality
5. **Documentation**: Update migration status and relevant guides
6. **Review**: PR must include checklist verifying constitution compliance

### Code Organization

- **Page Components**: `app/page-components/[ComponentName]/` - display logic
- **Shared Components**: `app/shared-components/[ComponentName]/` - reusable UI
- **Utilities**: `app/utils/` - data fetching and transformation
- **Services**: `app/services/` - caching, external integrations
- **API Routes**: `app/api/` - server-side operations
- **Hooks**: `app/custom-hooks/` - React state and effects

### Styling Standards

- CSS Modules for component-specific styles (`.module.css` files)
- Tailwind utility classes for common patterns and spacing
- Global styles limited to `app/globals.css` and `app/variables.css`
- Material-UI components for complex interactions (date pickers, modals)
- Consistent naming: component file → `Component.tsx`, styles → `Component.module.css`

### Version Control

- Feature branches from `main`: `[issue-number]-feature-description`
- Commit messages: `type(scope): description` (conventional commits)
- PR titles: Clear description of changes and migration impact
- All PRs MUST pass E2E tests before merge
- Migration documentation updates MUST be included in relevant PRs

## Governance

### Amendment Process

1. Proposed changes MUST be documented with rationale and impact analysis
2. Constitution changes MUST increment version per semantic versioning:
   - **MAJOR**: Backward incompatible governance/principle changes
   - **MINOR**: New principle added or materially expanded guidance
   - **PATCH**: Clarifications, wording fixes, non-semantic refinements
3. All amendments MUST include Sync Impact Report showing affected templates
4. Dependent templates MUST be updated in same commit as constitution changes
5. Team review and approval required before finalizing amendments

### Compliance Review

- All PRs MUST be verified against core principles during code review
- Migration status documentation MUST be kept current
- Quarterly reviews MUST assess progress toward migration completion
- Constitution violations MUST be justified in PR description or rejected
- Technical debt from constitutional deviations MUST be tracked and prioritized

### Migration Phase Governance

**Current Phase: Phase 2 & 3 (Content Migration & Administration)**

- **Phase 1 Complete**: Display layer, schemas, transformations, caching
- **Phase 2 In Progress**: Content migration scripts (posts, info pages, affiliations)
- **Phase 3 In Progress**: Admin dashboard and editing interfaces
- **Phase 4 Planned**: Cleanup, optimization, final testing

**Phase Transition Requirements**:

- Phase 2 → 3: All content successfully migrated and validated
- Phase 3 → 4: All editing interfaces migrated to Builder.io
- Phase 4 → Complete: All Wix CMS dependencies removed, full test coverage

**Use `.specify/memory/constitution.md` for governance reference and `README.md` for migration status tracking.**

---

**Version**: 1.0.1 | **Ratified**: 2025-11-29 | **Last Amended**: 2025-11-29
