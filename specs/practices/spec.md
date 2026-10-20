# Practice Page Type – Design Spec

**Branch:** `feat/practices`
**Date:** 2026-10-20
**Status:** Approved

## Goal

Add a new post sub-type called **practice**, alongside the existing post sub-types (`post`, `event`, `project result`). Practices live in the same Builder.io `post-page` model, are served from the same `/post/[slug]` route, and are listed at `/pages/practice`.

## Decisions

| Topic | Decision |
|-------|----------|
| Date field | New editable `practiceDate` field (ISO string) on `post-page` |
| Listing URL | `/pages/practice` (same convention as `/pages/event`, `/pages/project-result`) |
| Creation entry points | "Add Practice" in the account dropdown and a new `/dashboard/practices` section |
| Builder content | `practice` page-type tag and two mock practice pages are created **published** |
| Architecture | Extend `PostPageComponent` with a practice branch (same pattern used for events and project results) |

## Editable Fields

Only the fields from [`data-model-fields.txt`](./data-model-fields.txt) are shown for a practice:

| UI section | Builder `post-page` field | Notes |
|------------|---------------------------|-------|
| Title | `title` | Same validation as posts |
| Subtitle | `subtitle` | |
| Date | `practiceDate` | **New** text field (ISO 8601), single date picker, shown in header as `DD MMMM YYYY` |
| Authors | `projectResultAuthor` | Same storage as post / project result authors |
| Foresight methods | `methods` | |
| Body (texts + images) | `postContentRIch1..10`, `postImage1..10` | Existing `ContentComponent` |
| Content related to this Page | `internalLinks` | Existing `MiniPagesListComponentPost`, titled **"Content related to this practice"** |
| Files | `mediaFiles` | Existing `FilesComponent`, titled **"Templates for applying this Practice"** (new optional `title` prop, default "Files") |

The page-type tag (`pageTypes`) is always shown because it drives the forking.

Hidden for practices: country, people, domains, project, organisation, event fields, project-result media and publication date.

## Behaviour

### Page type forking (`/post/[slug]`)

`PostPageComponent` reads `pageTypes[0].name`. When it equals `practice`:

- `HeaderComponent` renders title, subtitle and the practice date (view: formatted text, edit: `DatePickerComponent`); country picker is hidden.
- `PostPageComponent` renders Authors, Body, Foresight Methods, Content related to this Page and Files only.
- The page-type `TagPicker` excludes `post`, `event`, `project result` when `practice` is first, and excludes `practice` when any of those is first.

### Creation

- `/post/New_Post?pageType=practice` preselects the `practice` page-type tag.
- Entry points: account dropdown "Add Practice" and `/dashboard/practices` "Add practice" button.

### Listing (`/pages/practice`)

- `validParams` includes `practice`; cards link to `/post/...`.
- `decidePageTypeItems` / `decidePageTypesForMiniPages` return pages whose first page type is `practice`; the `post` bucket excludes `practice`.
- Sort: `practiceDate` descending, falling back to creation date (priority 3, like events / results).
- `Hero` subtitle: "sorted by practice date".
- `MiniPagePost` shows the practice date and hides the popularity counter (like other post sub-types).

### Header

Order: **Projects, Results, Events, Practices, Posts, Organisations, People**.

- "Project Results" is renamed to "Results" (link unchanged: `/pages/project-result`).
- "Practices" links to `/pages/practice` and shows the practice count.

### Dashboard

- New `/dashboard/practices` page listing the user's accessible practice pages (`allOwnedPages` filtered by `practice`), sorted by `practiceDate` desc, with the admin delete button, mirroring `/dashboard/events`.
- New "Practices" item in `NavDashboard`.

### Search

- `/pages/practice` pre-filters search to the `Practice` tag (same as other listing pages).
- `practice` is added to `allPagetypes` and to the `author` include list in `SearchContext.utils.ts`.
- The `practice` tag is suggested automatically since it comes from the tag model.

### Cache / revalidation

Create and update API routes revalidate `/pages/practice` and `/dashboard/practices` when the page type is `practice`; delete revalidates them unconditionally.

## Builder.io Changes

1. Tag: `{ name: "practice", tagType: "page type" }` in the `tag` model (published).
2. Model: add `practiceDate` (`text`) to `post-page`.
3. Two published mock practice pages with real author / foresight-method tags.

## Out of Scope

- Changing existing event / project-result / post behaviour (beyond the header label rename).
- A config-driven field-visibility refactor for all post types.
- Search "sort by" for practices (existing sort tags operate on legacy mock fields).
