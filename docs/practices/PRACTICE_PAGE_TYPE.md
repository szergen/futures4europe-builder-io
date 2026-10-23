# Practice Page Type

A **practice** is a post sub-type (like `post`, `event` and `project result`) used to share how a foresight practice was applied, with the templates needed to reuse it.

- Design spec: [`specs/practices/spec.md`](../../specs/practices/spec.md)
- Implementation plan: [`specs/practices/plan.md`](../../specs/practices/plan.md)
- Source field list: [`specs/practices/data-model-fields.txt`](../../specs/practices/data-model-fields.txt)

## How it works

Practices are entries of the Builder.io `post-page` model whose **first page-type tag** is `practice`. They are served by the same route as every other post (`/post/[slug]`); `PostPageComponent` and its `HeaderComponent` decide which fields to render based on that tag.

| URL | What it shows |
|-----|---------------|
| `/post/<slug>` | A single practice (view + edit for owners) |
| `/post/New_Post?pageType=practice` | Create a new practice |
| `/pages/practice` | All practices, sorted by practice date (newest first) |
| `/dashboard/practices` | Practices the logged-in user has access to |

The header shows a **Practices** tag with the number of practice pages, in this order: Projects, Results, Events, Practices, Posts, Organisations, People.

## Fields

| Section on the page | Builder `post-page` field |
|---------------------|---------------------------|
| Title | `title` |
| Subtitle | `subtitle` |
| Date | `practiceDate` (`YYYY-MM-DD`) |
| Authors | `projectResultAuthor` |
| Foresight Methods | `methods` |
| Body (texts + images) | `postContentRIch1..10`, `postImage1..10` |
| Content related to this practice | `internalLinks` |
| Templates for applying this Practice | `mediaFiles` |

Country, people, domains, project, organisation and all event / project-result fields are hidden for practices. In the page-type picker, `practice` cannot be combined with `post`, `event` or `project result`.

## Builder.io setup

| Item | Value |
|------|-------|
| Page-type tag | `tag` entry `practice` (`tagType: "page type"`), id `e1dfadde5f5a4efc9ba5766aa3ce8f37` |
| Model field | `practiceDate` (text) on `post-page` |
| Mock pages | `/post/participatory-scenario-building-for-regional-futures-prc01` (id `789c066d122c4b94b63d0bf8b242cfb1`), `/post/delphi-survey-for-policy-roadmaps-prc02` (id `9948ffd3959140f88b27b3857fad042e`) |

The mock pages are marked `[MOCK PRACTICE – for testing]` in their first paragraph. Delete or unpublish them in Builder.io before going live.

## Where the code lives

| Concern | File |
|---------|------|
| Read / write `practiceDate` | `app/utils/builderPostUtils.ts` |
| Page-type filtering (`practice` vs `post`) | `app/utils/parse-utils.ts` |
| Field forking | `app/page-components/PostPageComponent/PostPageComponent.tsx`, `.../components/HeaderComponent/HeaderComponent.tsx` |
| New practice entry point | `app/post/New_Post/page.tsx` |
| Listing page | `app/pages/[slug]/page.tsx`, `app/shared-components/Hero/Hero.tsx` |
| Listing sort + cards | `.../MiniPagesListItemPost/MiniPagesListItemPost.tsx`, `.../MiniPagesListItemPost.utils.ts`, `app/shared-components/MiniPagePost/MiniPagePost.tsx` |
| Header tags + "Add Practice" | `app/shared-components/Layout/Header.tsx` (`headerPageTypeTags`) |
| Dashboard | `app/dashboard/practices/page.tsx`, `app/shared-components/Layout/NavDashboard/NavDashboard.tsx` |
| Search | `app/shared-components/SearchComponentV1/SearchComponentV1.tsx`, `app/custom-hooks/SearchContext/SearchContext.utils.ts` |
| Cache revalidation | `app/api/builder/post/route.ts`, `app/api/builder/post/[id]/route.ts` |

## Manual test checklist

1. Header shows Projects, Results, Events, Practices, Posts, Organisations, People; Practices shows a count.
2. `/pages/practice` lists both mock practices, newest practice date first; `/pages/post` does not list them.
3. Opening a mock practice shows only the fields above, with "Content related to this practice" and "Templates for applying this Practice".
4. Logged in as an owner: Edit Page shows the practice date picker; publishing persists `practiceDate`.
5. "Add Practice" (account dropdown or `/dashboard/practices`) opens `/post/New_Post?pageType=practice` with the `practice` tag preselected.
6. On `/pages/practice`, the search bar is pre-filtered to "Practice".
