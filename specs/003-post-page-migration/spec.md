# Feature Specification: Post-Page Creation Migration from Wix to Builder.io

**Feature Branch**: `003-post-page-migration`  
**Created**: 2025-12-01  
**Status**: Draft  
**Input**: User description: "I want to migrate the functionality of creating a post-page"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - User Creates New Post Page (Priority: P1)

A logged-in user navigates to the "New Post" page and creates a new post, event, or project result by filling in all necessary fields and saving it to Builder.io.

**Why this priority**: This is the core functionality that enables content creation on the Builder.io platform. Without it, users cannot create any new content and the platform migration cannot be considered complete.

**Independent Test**: Can be fully tested by logging in as a user, navigating to `/post-page/New_Post?pageType=post`, filling in title and content fields, clicking "Publish Page", and verifying the new post appears in Builder.io with all fields correctly saved and the user is redirected to the new post's page.

**Acceptance Scenarios**:

1. **Given** a logged-in user navigates to `/post-page/New_Post?pageType=post`, **When** they fill in the title, subtitle, content, and tags, then click "Publish Page", **Then** a new post is created in Builder.io with a unique slug, all fields are saved correctly, and the user is redirected to the new post page
2. **Given** a user is creating a new post, **When** they add multiple content sections with rich text and images, **Then** all 10 content sections (postContentRIch1-10) and images (postImage1-10) are saved correctly in Builder.io
3. **Given** a user is creating a new post, **When** they add tags for people, methods, domains, projects, and organisations, **Then** all references are created in Builder.io with correct Reference format in a single API call
4. **Given** a user is the page owner, **When** they create a new post, **Then** their user tag is automatically set as both the author and pageOwner in Builder.io
5. **Given** a user creates a new post with invalid data (missing title), **When** they try to publish, **Then** validation errors are displayed and the publish button is disabled until errors are corrected

---

### User Story 2 - User Edits Existing Post Page (Priority: P1)

A user who owns a post page can edit any field (title, content, tags, metadata) and save changes to Builder.io.

**Why this priority**: Editing is equally critical to creation - users need to update content, fix errors, and maintain their posts over time. Without this, the platform would be write-once-only which is not viable.

**Independent Test**: Can be fully tested by opening an existing post owned by the user, clicking "Edit Page", modifying multiple fields including title, content, and tags, clicking "Publish Page", and verifying all changes are persisted in Builder.io and visible immediately without requiring page refresh.

**Acceptance Scenarios**:

1. **Given** a user owns a post page, **When** they click "Edit Page", modify the title and subtitle, then click "Publish Page", **Then** the changes are saved to Builder.io and the updated page is displayed with cache invalidation
2. **Given** a user is editing a post, **When** they modify rich text content in any of the 10 content sections, **Then** only the changed sections are updated in Builder.io (not all 10) for optimization
3. **Given** a user is editing a post, **When** they add or remove tags (people, methods, domains, etc.), **Then** all reference field changes are sent in a single optimized API call to Builder.io
4. **Given** a user is editing a post, **When** they click "Discard Changes", **Then** all modifications are reverted to the last saved state and edit mode is exited without saving to Builder.io
5. **Given** a user is editing a post, **When** changes are being saved, **Then** a "Saving Page..." modal is displayed to prevent duplicate submissions and closes when the save is complete

---

### User Story 3 - User Creates Event-Specific Post (Priority: P2)

A user creates a post with `pageType=event` query parameter and fills in event-specific fields like speakers, moderators, event dates, and registration link.

**Why this priority**: Events are a distinct content type with unique requirements. Supporting event creation ensures the full content model is functional, though it's lower priority than basic post creation.

**Independent Test**: Can be tested by navigating to `/post-page/New_Post?pageType=event`, filling in event-specific fields (speakers, moderators, eventStartDate, eventEndDate, eventRegistration), publishing, and verifying all event fields are correctly saved in Builder.io.

**Acceptance Scenarios**:

1. **Given** a user navigates to `/post-page/New_Post?pageType=event`, **When** they fill in event-specific fields and publish, **Then** speakers, moderators, and event date fields are saved to Builder.io with correct data types
2. **Given** a user is creating an event, **When** they select a page type tag, **Then** only valid event-related page type tags are available (excluding "post" and "project result" tags)
3. **Given** a user publishes an event, **When** the page is saved, **Then** event-specific fields (eventStartDate, eventEndDate, eventRegistration) are validated for proper format before submission

---

### User Story 4 - User Creates Project Result Post (Priority: P2)

A user creates a post with `pageType=projectResult` query parameter and fills in project-result-specific fields like project result authors, media file, and publication date.

**Why this priority**: Project results are the third content sub-type. Supporting this ensures complete content model coverage, though it's lower priority than basic post and event creation.

**Independent Test**: Can be tested by navigating to `/post-page/New_Post?pageType=projectResult`, filling in project-result-specific fields (projectResultAuthor, projectResultMedia, projectResultPublicationDate), publishing, and verifying all fields are correctly saved in Builder.io.

**Acceptance Scenarios**:

1. **Given** a user navigates to `/post-page/New_Post?pageType=projectResult`, **When** they fill in project result fields and publish, **Then** projectResultAuthor, projectResultMedia, and projectResultPublicationDate are saved to Builder.io correctly
2. **Given** a user is creating a project result, **When** they upload project result media, **Then** the media file (PDF, video, etc.) is stored with correct file metadata (url, displayName, thumbnail)
3. **Given** a user is creating a project result, **When** they select authors, **Then** projectResultAuthor field is populated (separate from the general author field used for other post types)

---

### User Story 5 - Optimized Batch Reference Updates (Priority: P3)

When a user saves a post with multiple reference field changes (tags, people, projects), all reference updates are batched into a single optimized API call instead of separate calls for each reference field.

**Why this priority**: This is a performance optimization that improves user experience by reducing save time from several seconds to under one second. While important for UX, the feature is functional without it, making it lower priority.

**Independent Test**: Can be tested by editing a post and changing multiple reference fields (e.g., add 3 people tags, 2 project tags, 1 organisation tag), monitoring network requests during save, and verifying only 1-2 API calls are made to Builder.io instead of 6+ separate calls.

**Acceptance Scenarios**:

1. **Given** a user modifies multiple reference fields in a post, **When** they click "Publish Page", **Then** all reference field updates are sent in a single Builder.io API call (not separate calls per field as in Wix)
2. **Given** a user creates a new post with all fields populated, **When** the post is published, **Then** the entire post (including all references, content, and metadata) is created in a single API call to Builder.io
3. **Given** a post save operation completes, **When** measuring performance, **Then** total save time is under 2 seconds for posts with 10+ reference fields (vs 5-10+ seconds with Wix's approach)

---

### Edge Cases

- **Missing page type query parameter**: When a user navigates to `/post-page/New_Post` without a `pageType` query parameter, the system defaults to `pageType=post` (basic post type)
- **Invalid page type query parameter**: When a user provides an invalid `pageType` value (not "post", "event", or "projectResult"), the system defaults to "post"
- **User not logged in**: When a non-authenticated user tries to access `/post-page/New_Post`, they should be redirected to login page or see an error message
- **Validation errors during save**: When a user tries to publish a post with validation errors (e.g., missing required title), the save operation is blocked and error messages are displayed
- **Network failure during save**: When the Builder.io API call fails due to network issues, an error message is displayed to the user and the data remains in edit state (not lost)
- **Duplicate slug generation**: When a generated slug already exists in Builder.io, the system appends a unique hash to ensure slug uniqueness
- **Concurrent edits**: When multiple users try to edit the same post simultaneously, the last save wins (Builder.io handles this via its API)
- **Cache invalidation failure**: When cache invalidation fails after a successful save, the post is still saved correctly but may not appear immediately on listing pages until cache expires naturally
- **Missing user tag**: When a new user who doesn't have a corresponding person tag in Builder.io tries to create a post, the system should create the post without author/pageOwner fields or display an error

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST migrate route from `/app/post/New_Post/page.tsx` to `/app/post-page/New_Post/page.tsx` while maintaining all existing functionality
- **FR-002**: System MUST accept `pageType` query parameter with values "post", "event", or "projectResult" and default to "post" if missing or invalid
- **FR-003**: System MUST render `PostPageComponent` with `isNewPost={true}` when on the new post page
- **FR-004**: System MUST replace Wix `insertDataItem` API call in `createNewPost` function with Builder.io Write API call
- **FR-005**: System MUST replace Wix `updateDataItem` API call in `updateDataToServer` function with Builder.io Update API call
- **FR-006**: System MUST replace Wix `replaceDataItemReferences` API calls with Builder.io Reference field updates
- **FR-007**: System MUST create new post in Builder.io with a single API call containing all fields (title, subtitle, content, images, references, metadata)
- **FR-008**: System MUST update existing post in Builder.io with a single API call containing all changed fields (not separate calls per field)
- **FR-009**: System MUST generate unique slug using `sanitizeTitleForSlug(title)` + unique hash for new posts
- **FR-010**: System MUST set `author` and `pageOwner` reference fields to the logged-in user's tag ID when creating new posts
- **FR-011**: System MUST set default `pageType` reference based on query parameter when creating new posts
- **FR-012**: System MUST validate required fields (title at minimum) before allowing save/publish
- **FR-013**: System MUST display "Saving Page..." modal during API calls to prevent duplicate submissions
- **FR-014**: System MUST redirect user to `/post-page/{slug}` after successful new post creation
- **FR-015**: System MUST call `invalidatePostPageCache(slug)` after successful save to refresh cached pages
- **FR-016**: System MUST handle all 10 content sections (postContentRIch1-10) and 10 image sections (postImage1-10)
- **FR-017**: System MUST handle all reference fields: author, pageOwner, people, methods, domains, projects, organisations, pageTypes, countryTag, internalLinks
- **FR-018**: System MUST handle event-specific fields: speakers, moderators, eventStartDate, eventEndDate, eventRegistration
- **FR-019**: System MUST handle project-result-specific fields: projectResultAuthor, projectResultMedia, projectResultPublicationDate
- **FR-020**: System MUST handle media files field (mediaFiles array with url, displayName, and thumbnail properties)
- **FR-021**: System MUST convert tag objects to Builder.io Reference format: `{@type: "@builder.io/core:Reference", id: tag._id, model: "tag-page"}`
- **FR-022**: System MUST preserve all existing UI/UX behavior (edit/publish buttons, discard changes, validation states)
- **FR-023**: System MUST maintain page ownership check logic using `pageOwner` field from Builder.io data
- **FR-024**: System MUST refresh user data after creating new post to update dashboard lists
- **FR-025**: System MUST log all save operations (success, error) to browser console for debugging
- **FR-026**: System MUST handle API errors gracefully with user-friendly error messages
- **FR-027**: System MUST detect which fields have changed and only send changed fields in update API calls (optimization)
- **FR-028**: System MUST batch all reference field updates into a single API call instead of separate calls per reference type
- **FR-029**: System MUST revalidate Builder.io cache paths (`/post` and `/post/{slug}`) after successful saves
- **FR-030**: System MUST create new API utility functions in `app/utils/builderPostUtils.ts` or similar for Builder.io create/update operations

### Key Entities

- **Post Page**: Core content entity with title, subtitle, slug, 10 rich text content sections, 10 images, metadata, and multiple reference fields
- **Reference Field**: Link to other Builder.io content (tags, people, projects, organisations) stored as Builder.io Reference objects with `@type`, `id`, and `model` properties
- **Page Owner**: User who created the page and has edit permissions, stored as reference to person tag
- **Page Type**: Sub-classification determining content structure - "post", "event", or "project result"
- **Query Parameter**: `pageType` URL parameter that determines initial page type selection for new posts

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: User can create a new post by filling in title and content, clicking publish, and seeing the new post page load within 3 seconds of clicking publish
- **SC-002**: User can edit an existing post, modify any field, click publish, and see changes reflected immediately without page refresh within 2 seconds
- **SC-003**: System creates new post in Builder.io with single API call (verified in network tab showing 1 POST request, not 6+ as with Wix)
- **SC-004**: System updates existing post with all reference field changes in 1-2 API calls maximum (down from 10+ separate calls with Wix approach)
- **SC-005**: User can successfully create posts of all three types (post, event, project result) with type-specific fields saving correctly
- **SC-006**: User who owns a post can see "Edit Page" and "Publish Page" buttons, while non-owners cannot edit (100% permission accuracy)
- **SC-007**: Validation errors prevent saving and display clear messages to user, with publish button disabled until errors are resolved
- **SC-008**: Cache invalidation occurs within 5 seconds of save, ensuring new/updated posts appear on listing pages immediately
- **SC-009**: All existing UI behaviors (edit mode, discard changes, loading spinners) work identically to pre-migration state (verified by manual testing of 20+ user interactions)
- **SC-010**: 100% of reference fields (people, methods, domains, projects, organisations, etc.) are correctly saved and retrievable after post creation/update

## API Design Requirements

### Builder.io API Integration

**Create Post API**:

- **Endpoint**: `POST https://builder.io/api/v1/write/post-page`
- **Headers**: `Authorization: Bearer {BUILDER_PRIVATE_API_KEY}`, `Content-Type: application/json`
- **Request Body**: Single JSON object with all fields:
  ```json
  {
    "data": {
      "title": "string",
      "subtitle": "string",
      "slug": "string",
      "postContentRIch1-10": "string (HTML)",
      "postImage1-10": { "url": "string", "displayName": "string" },
      "author": [{ "@type": "@builder.io/core:Reference", "id": "string", "model": "tag-page" }],
      "pageOwner": [{ "@type": "@builder.io/core:Reference", "id": "string", "model": "tag-page" }],
      "people": [{ "@type": "@builder.io/core:Reference", "id": "string", "model": "tag-page" }],
      "methods": [...],
      "domains": [...],
      "projects": [...],
      "organisations": [...],
      "pageTypes": [...],
      "countryTag": { "@type": "@builder.io/core:Reference", "id": "string", "model": "tag-page" },
      "eventStartDate": "timestamp",
      "eventEndDate": "timestamp",
      "eventRegistration": "string",
      "speakers": [...],
      "moderators": [...],
      "projectResultAuthor": [...],
      "projectResultMedia": { "url": "string", "displayName": "string", "thumbnail": "string" },
      "projectResultPublicationDate": "timestamp",
      "mediaFiles": [{ "url": "string", "displayName": "string", "thumbnail": "string" }],
      "internalLinks": [...]
    },
    "published": "published"
  }
  ```
- **Response**: Returns created post with Builder.io `id`, `data`, `published`, `createdDate`, etc.

**Update Post API**:

- **Endpoint**: `PUT https://builder.io/api/v1/write/post-page/{id}`
- **Headers**: Same as create
- **Request Body**: Same structure as create, but only include changed fields for optimization
- **Response**: Returns updated post with same structure as create

**Utility Functions** (to be created in `app/utils/builderPostUtils.ts`):

- `createBuilderPost(postData)`: Creates new post in Builder.io, returns created post object
- `updateBuilderPost(postId, postData)`: Updates existing post, returns updated post object
- `transformPostDataForBuilder(postData)`: Converts component state to Builder.io API format
- `transformReferencesForBuilder(references)`: Converts tag arrays to Builder.io Reference format
- `generatePostSlug(title)`: Generates unique slug from title

## Assumptions

1. Builder.io `post-page` model is already configured with all required fields
2. Builder.io Private API key is available in environment as `BUILDER_PRIVATE_API_KEY`
3. User authentication and `useAuth` hook provide user details including user tag ID
4. Tag migration is complete and all tags exist in Builder.io with correct IDs
5. PostPageComponent currently works with Wix data structure and will continue to work with Builder.io data structure (minimal changes to component needed)
6. Builder.io Write API supports creating/updating all reference fields in a single call
7. Cache invalidation utility `invalidatePostPageCache` is already implemented and works with Builder.io
8. Route structure `/post-page/{slug}` is correct for Builder.io-based posts
9. Tag picker and other UI components work with Builder.io reference format
10. Builder.io API has sufficient rate limits for single-call create/update operations (no rate limiting needed)
