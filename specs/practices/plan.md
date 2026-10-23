# Practice Page Type Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `practice` post sub-type with its own fields, listing page, header entry, dashboard section and search support.

**Architecture:** Practices are `post-page` entries whose first page-type tag is `practice`. `PostPageComponent` / `HeaderComponent` fork on that tag (same as events / project results). Listing, header counts, search and revalidation get a `practice` branch next to the existing `event` / `project result` ones.

**Tech Stack:** Next.js 14 App Router, React, TypeScript, Builder.io (Content + Write API, MCP for content setup).

## Global Constraints

- Page-type tag name: `practice` (lowercase). Listing slug: `practice`. Listing URL: `/pages/practice`.
- New Builder field: `practiceDate` (text, ISO 8601).
- Header order: Projects, Results, Events, Practices, Posts, Organisations, People.
- No regressions for post / event / project result pages.
- TypeScript: no new `tsc --noEmit` errors versus baseline (`/tmp/tsc_baseline.txt`, 319 pre-existing errors).

---

### Task 1: Builder.io setup

**Files:** none (Builder.io MCP)

- [ ] Create published tag in `tag` model: `{ name: "practice", tagType: "page type", tagLine: "Foresight practice" }`.
- [ ] Add field `{ name: "practiceDate", type: "text", helperText: "Practice date (ISO 8601)" }` to `post-page` model, keeping all existing fields.
- [ ] Verify with `get_content` / `get_model_schema`.

### Task 2: Data layer (`practiceDate` + type filters)

**Files:**
- Modify: `app/utils/builderPostUtils.ts` (create transform + read transform)
- Modify: `app/utils/parse-utils.ts` (`decidePageTypeItems`, `decidePageTypesForMiniPages`)
- Modify: `app/api/builder/post/route.ts`, `app/api/builder/post/[id]/route.ts` (revalidation)

**Interfaces – Produces:**
- `post.data.practiceDate?: string` on transformed posts.
- `decidePageTypeItems("practice", postPages, infoPages)` / `decidePageTypesForMiniPages("practice", ...)` return practice pages; `"post"` excludes them.

- [ ] Add `practiceDate: postData.practiceDate || undefined` to `transformPostDataForBuilderCreate`.
- [ ] Add `practiceDate: data.practiceDate` to `transformBuilderPostToWixFormat`.
- [ ] Add `practice` cases and exclude `practice` from `post` in both parse-utils functions.
- [ ] Add `else if (pageTypeName === "practice")` revalidation of `/pages/practice` + `/dashboard/practices` in POST/PUT; add both paths to DELETE.

### Task 3: Practice page view / edit

**Files:**
- Modify: `app/page-components/PostPageComponent/PostPageComponent.tsx`
- Modify: `app/page-components/PostPageComponent/components/HeaderComponent/HeaderComponent.tsx`
- Modify: `app/post/New_Post/page.tsx`

- [ ] `PostPageComponent`: map `practiceDate` into state and both save payloads; compute `isPractice`; hide People, Domains, Project, Organisation for practices; update `extraFilterTags` so `practice` is mutually exclusive with `post` / `event` / `project result`.
- [ ] `HeaderComponent`: practice date (view `DD MMMM YYYY`, edit `DatePickerComponent` writing ISO string to `practiceDate`); hide country for practices; practice-specific placeholders.
- [ ] `New_Post`: `case "practice": return "practice";`.

### Task 4: Listing page + cards

**Files:**
- Modify: `app/pages/[slug]/page.tsx`
- Modify: `app/shared-components/Hero/Hero.tsx`
- Modify: `app/page-components/shared-page-components/MiniPagesListComponentPost/components/MiniPagesListItemPost/MiniPagesListItemPost.tsx`
- Modify: `.../MiniPagesListItemPost/MiniPagesListItemPost.utils.ts`
- Modify: `app/shared-components/MiniPagePost/MiniPagePost.tsx` + `.module.css`

- [ ] Add `{ id: "practice" }` to `validParams` and to the `post` path list.
- [ ] Hero subtitle `sorted by practice date`.
- [ ] Sort config `PageType.Practice` → `practiceDate`, fallback `_createdDate`, priority 3.
- [ ] Card props case `practice` (authors as primary tags, methods as domains, `practiceDate`).
- [ ] `MiniPagePost`: `practiceDate` prop rendered `DD MMMM YYYY`; hide popularity for practice; `.practice_TypeTagImage img { object-fit: cover; }`.

### Task 5: Header + account dropdown

**Files:** Modify `app/shared-components/Layout/Header.tsx`

- [ ] Add `practice` to `pageTypeCounts`.
- [ ] Reorder tags: Projects, Results, Events, Practices, Posts, Organisations, People; rename "Project Results" → "Results".
- [ ] Add "Add Practice" (`/post/New_Post?pageType=practice`) to the dropdown.

### Task 6: Dashboard section

**Files:**
- Create: `app/dashboard/practices/page.tsx` (mirrors `app/dashboard/events/page.tsx`, filter `practice`, sort by `practiceDate` desc)
- Modify: `app/shared-components/Layout/NavDashboard/NavDashboard.tsx` (new "Practices" item after Events)

### Task 7: Search

**Files:**
- Modify: `app/shared-components/SearchComponentV1/SearchComponentV1.tsx` (`/pages/practice` branch)
- Modify: `app/custom-hooks/SearchContext/SearchContext.utils.ts` (`allPagetypes`, `fieldIncludePageTypes.author`)

### Task 8: Mock content + docs + verification

- [ ] Create two published practice pages via Builder MCP (`post-page`, slug `/post/<slug>`).
- [ ] README: content types, Builder models, "Adding a new post sub-type" section.
- [ ] `npx tsc --noEmit` – compare against baseline; `npx next lint` on changed files.
- [ ] Browser check: header order + counts, `/pages/practice`, both mock pages, search pre-filter, `/dashboard/practices`.
