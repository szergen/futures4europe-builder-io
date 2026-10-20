# Futures4Europe - Builder.io Migration Project

A Next.js 13+ application migrating from Wix Headless CMS to Builder.io as the primary content management system for the Futures4Europe platform.

## 🎯 Project Overview

This project is undergoing a comprehensive migration from **Wix** as a Headless CMS to **Builder.io** as the primary CMS for all content management. The migration is designed to improve content management capabilities while maintaining the existing user experience.

### Key Points

- **From**: Wix Headless CMS
- **To**: Builder.io Headless CMS
- **Framework**: Next.js 13+ with App Router
- **Authentication**: Wix (maintained for user login)
- **Caching**: Redis (Upstash)
- **Status**: Partial migration completed, ongoing development

## 📋 Tech Stack

- **Frontend Framework**: Next.js 13+ (App Router)
- **CMS**: Builder.io (primary), Wix (authentication only)
- **Caching**: Redis via @upstash/redis
- **Styling**: Tailwind CSS, Flowbite, CSS Modules
- **UI Libraries**: Material-UI, Emotion
- **Animation**: Framer Motion, GSAP, React Spring
- **Forms**: React Hook Form, Draft.js, React Draft WYSIWYG
- **Analytics**: Vercel Analytics, PostHog
- **Error Tracking**: Sentry
- **Testing**: Playwright (E2E)
- **Package Manager**: Yarn 3.3.0

## 🗂️ Content Types

The platform manages 4 primary content types with specific sub-types:

### 1. **Post** (`post-page`)

- **Sub-types**: Post, Event, Project Result, Practice
- **Route**: `/post-page/[slug]`
- **Listings**: `/pages/post`, `/pages/event`, `/pages/project-result`, `/pages/practice`
- **Practice**: shares how a foresight practice was applied (title, subtitle, practice date, authors, foresight methods, body, related content, templates). See [`docs/practices/PRACTICE_PAGE_TYPE.md`](docs/practices/PRACTICE_PAGE_TYPE.md)
- **Status**: ✅ Migrated to Builder.io

### 2. **Project** (`project-page`)

- **Route**: `/project-page/[slug]`
- **Status**: ✅ Migrated to Builder.io

### 3. **Person** (`person-page`)

- **Route**: `/person-page/[slug]`
- **Status**: ✅ Migrated to Builder.io

### 4. **Organisation** (`organisation-page`)

- **Route**: `/organisation-page/[slug]`
- **Status**: ✅ Migrated to Builder.io

## 📁 Project Structure

```
futures4europe-builder-io/
├── app/
│   ├── post-page/           # Post content pages (migrated)
│   ├── project-page/        # Project content pages (migrated)
│   ├── person-page/         # Person profile pages (migrated)
│   ├── organisation-page/   # Organisation pages (migrated)
│   ├── page-components/     # Page-specific components
│   ├── shared-components/   # Reusable UI components
│   ├── utils/               # Utility functions
│   │   └── builderPostUtils.ts    # Builder.io transformation utilities
│   ├── services/            # Service layer (caching, etc.)
│   ├── api/                 # API routes
│   ├── custom-hooks/        # React hooks
│   └── dashboard/           # Admin dashboard
├── scripts/
│   ├── migrations/          # Migration scripts
│   │   └── migrate-tags.js           # Tag migration (completed)
│   └── utilities/           # Utility scripts
│       ├── list-builder-models.js    # List Builder.io models
│       ├── verify-builder.js         # Verify Builder.io setup
│       ├── mentions.js               # Mentions processing
│       └── cron.js                   # Cron jobs
├── data/
│   ├── examples/            # Reference/example data
│   │   ├── example_post_page.json
│   │   ├── example_info_page.json
│   │   └── example_tag.json
│   ├── exports/             # Wix data exports
│   │   └── Tags_wix.csv
│   └── mappings/            # Migration ID mappings (gitignored)
│       └── tag-migration-mapping.json
├── cache/                   # JSON cache files
├── docs/                    # Documentation
│   ├── builder-io/          # Builder.io setup guides
│   └── migration/           # Migration documentation
├── builder.config.ts        # Builder.io configuration
└── ...                      # Config files (package.json, tsconfig, etc.)
```

## ✅ Migration Status

### Completed

- [x] **Display Components**: All 4 content types (post, project, person, organisation)
- [x] **Schema Definition**: Builder.io models created and configured
- [x] **Data Transformations**: Wix → Builder.io transform functions implemented
- [x] **Tag Migration**: **✅ COMPLETE** - All tag operations migrated to Builder.io
  - [x] Data migration: 3,077 tags migrated
  - [x] Tag fetching: All GET operations use Builder.io
  - [x] Tag creation: UI components create in Builder.io
  - [x] CRUD API: Full RESTful API for tags (GET/POST/PUT/DELETE)
  - [x] Cache system: Redis caching with `_builder` suffix for isolation
  - [x] Mentions calculation: Popularity with Wix affiliation translation
  - [x] Zero Wix dependencies for tag operations
  - [x] Cache isolation: Builder.io caches separate from production with `_builder` suffix
  - [x] Cache optimizations:
    - Append-to-cache for tag creation (vs. invalidate+refetch)
    - Update-in-cache for tag updates (vs. invalidate+refetch)
    - Removed unnecessary cache invalidation on New_Post page load
    - 100x performance improvement for tag operations
- [x] **Caching Layer**: Redis integration for performance
- [x] **Static Site Generation**: ISR (Incremental Static Regeneration) setup

### In Progress

- [x] **Administration Panel**: Migration from Wix upload APIs to Builder.io

  - Current location: `app/dashboard/` and page templates
  - Needs: API endpoint updates for Builder.io

- [ ] **Editing Functionality**: Migrate content editing from Wix to Builder.io

  - [ ] Post editing (currently uses Wix)
  - [ ] Project editing (currently uses Wix)
  - [ ] Person editing (currently uses Wix)
  - [ ] Organisation editing (currently uses Wix)
  - Update to use Builder.io Write API or Visual Editor

- [ ] **Data Migration Scripts**:

  - [ ] Posts migration
  - [ ] InfoPages migration
  - [ ] Affiliations migration
  - [x] Tags migration (completed)

- [ ] **Homepage Configuration**: Migrate homepage content to Builder.io

### Remaining

- [ ] **Wix Authentication Improvements**: Identify and fix missing items
- [ ] **Complete Documentation**: Ensure all features are documented
- [ ] **Route Migration**: Switch from Wix routes to Builder.io routes after validation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Yarn 3.3.0
- Redis instance (or Upstash account)
- Builder.io account and API key
- Wix account (for authentication)

### Installation

```bash
# Install dependencies
yarn install

# Set up environment variables (see Configuration section)
cp .env.example .env.local

# Run development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

### Available Scripts

```bash
yarn dev              # Start development server
yarn debug            # Start with Node.js inspector on port 3005
yarn build            # Build for production
yarn start            # Start production server
yarn lint             # Run ESLint with auto-fix
yarn test             # Run E2E tests with Playwright
yarn storybook        # Start Storybook on port 6006
yarn clean:cache      # Clear cache directory
```

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Builder.io
NEXT_PUBLIC_BUILDER_API_KEY=your_builder_api_key

# Redis/Upstash
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token

# Wix (Authentication)
WIX_CLIENT_ID=your_wix_client_id
WIX_CLIENT_SECRET=your_wix_client_secret

# Other
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Builder.io Models

The following Builder.io models are configured:

- `post-page`: Blog posts, events, project results, and practices (sub-type chosen by the first `pageTypes` tag; practices use the `practiceDate` field)
- `project-page`: Project information
- `person-page`: Person profiles
- `organisation-page`: Organisation profiles
- `tag`: Tags for categorization (migrated from Wix)

## 📚 Key Features

### 1. **Builder.io Integration**

All content is fetched from Builder.io using the SDK:

```typescript
// Example: Fetching a post by slug
import { getBuilderPostBySlug } from "@app/utils/builderPostUtils";

const post = await getBuilderPostBySlug("my-post-slug");
```

### 2. **Data Transformation Layer**

Wix-to-Builder.io transformation utilities ensure backward compatibility:

```typescript
// Transform Builder.io data to Wix format for existing components
import { transformBuilderPostToWixFormat } from "@app/utils/builderPostUtils";

const transformedPost = transformBuilderPostToWixFormat(builderPost);
```

### 3. **Caching Strategy**

Redis caching layer for improved performance:

- **JSON Cache**: Local file-based cache (`cache/`)
- **Redis Cache**: Distributed cache via Upstash
- **ISR**: Next.js Incremental Static Regeneration

### 4. **Wix Authentication**

User authentication remains with Wix:

- Login/Register flows maintained
- User profiles and permissions
- Future improvements planned

## 📖 Documentation

All documentation is organized in the `docs/` folder:

### Builder.io Setup & Configuration

- `docs/builder-io/BUILDER_IO_SETUP.md` - Complete setup guide
- `docs/builder-io/BUILDER_IO_TROUBLESHOOTING.md` - Common issues and solutions
- `docs/builder-io/BUILDER_IO_ONLY_UPDATE.md` - Builder.io-only updates
- `docs/builder-io/QUICK_FIX_BUILDER.md` - Quick fixes and tips
- `docs/builder-io/GET_PRIVATE_API_KEY.md` - API key setup

### Migration Guides

- `docs/migration/MIGRATION_SUMMARY.md` - Overall migration summary and status
- `docs/migration/MIGRATION_SCRIPT_UPDATE.md` - Migration script updates

#### Content Type Migrations

- **Posts**: `docs/migration/posts/BUILDER_POST_MIGRATION_GUIDE.md`, `docs/migration/posts/QUICK_START_BUILDER_POSTS.md`
- **Projects**: `docs/migration/projects/PROJECT_PAGE_MIGRATION_SUMMARY.md`
- **Persons**: `docs/migration/persons/PERSON_PAGE_MIGRATION.md`, `docs/migration/persons/PERSON_PAGE_SUMMARY.md`
- **Organisations**: `docs/migration/organisations/ORGANISATION_PAGE_MIGRATION.md`, `docs/migration/organisations/ORGANISATION_MIGRATION_SUMMARY.md`, `docs/migration/organisations/ORGANISATION_PAGE_QUICK_START.md`
- **Tags**: `docs/migration/tags/TAG_MIGRATION_GUIDE.md`, `docs/migration/tags/TAG_MIGRATION_SUMMARY.md`, `docs/migration/tags/MIGRATE_TAGS_QUICK_REF.md`
- **Info Pages**: `docs/migration/info-pages/INFO_PAGES_MIGRATION_COMPLETE.md`

### Features

- `docs/practices/PRACTICE_PAGE_TYPE.md` - Practice page type (fields, routes, Builder.io setup, test checklist)

### Other Documentation

- `docs/integration-guide.md` - Integration documentation

## 🛠️ Development Guidelines

### Adding New Content Types

1. Create Builder.io model in the Builder.io dashboard
2. Define schema and fields
3. Create transformation utilities in `app/utils/`
4. Implement page components in `app/[content-type]-page/`
5. Add migration script if needed
6. Update documentation

### Adding a New Post Sub-type

Post sub-types (post, event, project result, practice) share the `post-page` model and the `/post/[slug]` route. Practice is the most recent example; see `docs/practices/PRACTICE_PAGE_TYPE.md`.

1. Create a `tag` entry with `tagType: "page type"` in Builder.io, and add any new fields to `post-page`
2. Map new fields in `app/utils/builderPostUtils.ts` (create payload + `transformBuilderPostToWixFormat`)
3. Add the type to `decidePageTypeItems` / `decidePageTypesForMiniPages` in `app/utils/parse-utils.ts` and exclude it from `post`
4. Fork fields in `PostPageComponent` / `HeaderComponent` and update `extraFilterTags`
5. Add the listing slug to `validParams` in `app/pages/[slug]/page.tsx`, plus sort config and card props
6. Add the header tag (`headerPageTypeTags` in `Header.tsx`), dashboard page, search pre-filter, and API revalidation paths

### Code Organization

- **Page Components**: `app/page-components/[ComponentName]/`
- **Shared Components**: `app/shared-components/[ComponentName]/`
- **Utilities**: `app/utils/`
- **Services**: `app/services/`
- **API Routes**: `app/api/`
- **Hooks**: `app/custom-hooks/`

### Styling Conventions

- Use CSS Modules for component-specific styles
- Use Tailwind utility classes for common patterns
- Global styles in `app/globals.css` and `app/variables.css`

## 🧪 Testing

### E2E Testing with Playwright

```bash
# Run all tests
yarn test

# Run specific test suite
yarn playwright test tests/e2e/home.spec.ts

# Run tests in UI mode
yarn playwright test --ui
```

Test coverage includes:

- Home page navigation and highlights
- News page and detail pages
- Projects page and detail pages
- Team page

## 📊 Performance & Monitoring

- **Analytics**: Vercel Analytics, PostHog
- **Error Tracking**: Sentry
- **Speed Insights**: Vercel Speed Insights
- **Caching**: Redis + ISR for optimal performance

### Cache Optimizations

The platform implements intelligent cache management for Builder.io data:

- **Append-to-Cache**: New tags are appended to existing cache instead of full invalidation
- **Update-in-Cache**: Tag updates modify cached entries in-place
- **Selective Invalidation**: Only affected caches are updated, not all data
- **Performance Impact**:
  - New_Post page load: ~10-15s → <100ms (100x faster)
  - Tag creation: Instant availability (no cache rebuild wait)
  - Tag updates: Instant reflection (preserves mentions count)

Cache keys use `_builder` suffix to isolate Builder.io data from production Wix caches during migration.

## 🔄 Migration Process

### Phase 1: Display Layer (✅ Completed)

- Migrated all page displays
- Created transformation utilities
- Implemented caching

### Phase 2: Content Migration (🚧 In Progress)

- Migrate posts, info pages, and affiliations
- Validate data integrity
- Switch routes to Builder.io sources

### Phase 3: Administration (🚧 In Progress)

- Migrate admin dashboard to use Builder.io APIs
- Migrate content creation/editing flows for all page types:
  - Post editing interface
  - Project editing interface
  - Person editing interface
  - Organisation editing interface
- Implement Builder.io Write API integration or Visual Editor
- Test and validate admin functionality

### Phase 4: Cleanup & Optimization (📋 Planned)

- Remove deprecated Wix CMS dependencies
- Clean up legacy Wix API routes and utilities
- Remove old transformation layers once fully migrated
- Archive or remove backup scripts and migration files
- Optimize Builder.io queries and caching strategies
- Improve authentication flow
- Code cleanup and refactoring
- Complete documentation
- Final testing and validation

## 🤝 Contributing

This is a private project for Futures4Europe. For team members:

1. Create a feature branch from `main`
2. Make your changes
3. Test thoroughly (including E2E tests)
4. Submit a pull request with clear description
5. Ensure all checks pass

## 📝 License

[Add license information]

## 📞 Support

For issues, questions, or contributions, please contact the development team.

---

**Note**: This project is under active development. Routes and APIs may change as the migration progresses. Until migration and validation are complete, legacy Wix routes will remain active alongside new Builder.io routes.
