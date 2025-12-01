# Builder.io Post Page Migration Guide

## 🎯 Overview

Your post pages (`/post-page/[slug]`) have been successfully integrated with Builder.io! The system loads posts **exclusively from Builder.io** - no Wix fallback.

This approach gives you:

- ✅ Clean separation: Builder.io posts only on this route
- ✅ Simplified codebase with no fallback logic
- ✅ Full control over Builder.io content
- ✅ Single source of truth for post data

---

## 📁 Files Created/Modified

### New Files:

1. **`app/utils/builderPostUtils.ts`** - Core utilities for Builder.io post data handling
   - `getBuilderPostBySlug()` - Fetch a single post by slug
   - `getAllBuilderPosts()` - Fetch all posts for static generation
   - `transformBuilderPostToWixFormat()` - Transform Builder.io data to match Wix structure
   - Helper functions for slug formatting

### Modified Files:

1. **`app/post-page/[slug]/page.tsx`** - Updated to support both Builder.io and Wix
2. **`app/shared-components/Builder/BuilderContent.tsx`** - Added "post-page" model type

---

## 🏗️ How It Works

### Data Flow:

```
User visits: /post/my-post-slug
        ↓
1. Query Builder.io
   └─→ Query: data.slug = "/post/my-post-slug"
        ↓
2. If found in Builder.io:
   └─→ Transform data to expected format
   └─→ Display with PostPageComponent ✅
        ↓
3. If NOT found in Builder.io:
   └─→ Show "Post Not Found" error ❌
```

### Development Indicator:

In development mode, you'll see a small badge in the bottom-right corner:

- 🔷 **Builder.io** - Post loaded from Builder.io

---

## 🔧 Setting Up Builder.io Post Model

### Step 1: Create the "post-page" Data Model

1. Go to https://builder.io/models
2. Click **"New Model"**
3. Select **"Data"** as the model type
4. Name it exactly: `post-page`
5. Click **"Create Model"**

### Step 2: Add Custom Fields

Add these fields to match your Wix structure:

#### Basic Information:

| Field Name | Type      | Required | Description                      |
| ---------- | --------- | -------- | -------------------------------- |
| `title`    | Text      | ✅       | Post title                       |
| `subtitle` | Long Text |          | Post subtitle/description        |
| `slug`     | Text      | ✅       | URL path (e.g., "/post/my-slug") |

#### Content Fields:

| Field Name         | Type      | Description                        |
| ------------------ | --------- | ---------------------------------- |
| `postContentRIch1` | Rich Text | First content section              |
| `postContentRIch2` | Rich Text | Second content section             |
| `postContentRIch3` | Rich Text | Third content section              |
| ...                | ...       | Continue up to `postContentRIch10` |

#### Images:

| Field Name   | Type   | Description                  |
| ------------ | ------ | ---------------------------- |
| `postImage1` | Object | First image (url, caption)   |
| `postImage2` | Object | Second image                 |
| ...          | ...    | Continue up to `postImage10` |

#### References (Link to "tag" model):

| Field Name      | Type | Reference Model | Description                   |
| --------------- | ---- | --------------- | ----------------------------- |
| `author`        | List | tag             | Post authors                  |
| `pageOwner`     | List | tag             | Page owners                   |
| `pageTypes`     | List | tag             | Page type (post, event, etc.) |
| `people`        | List | tag             | Related people                |
| `projects`      | List | tag             | Related projects              |
| `organisations` | List | tag             | Related organizations         |
| `domains`       | List | tag             | Related domains/topics        |
| `methods`       | List | tag             | Foresight methods used        |

#### Event-Specific Fields:

| Field Name          | Type           | Description           |
| ------------------- | -------------- | --------------------- |
| `speakers`          | List (tag ref) | Event speakers        |
| `moderators`        | List (tag ref) | Event moderators      |
| `eventStartDate`    | Date           | Event start date/time |
| `eventEndDate`      | Date           | Event end date/time   |
| `eventRegistration` | URL            | Registration link     |

#### Project Result Fields:

| Field Name                     | Type           | Description      |
| ------------------------------ | -------------- | ---------------- |
| `projectResultAuthor`          | List (tag ref) | Result authors   |
| `projectResultMedia`           | Object         | Media file data  |
| `projectResultPublicationDate` | Date           | Publication date |

#### Additional Fields:

| Field Name            | Type            | Description               |
| --------------------- | --------------- | ------------------------- |
| `recommendations`     | Number          | Number of recommendations |
| `countryTag`          | Reference (tag) | Country tag               |
| `internalLinks`       | List            | Internal links            |
| `mediaFiles`          | List            | Attached media files      |
| `postPublicationDate` | Date            | Publication date          |

---

## 📝 Creating Your First Post in Builder.io

### Step 1: Create a New Entry

1. Go to https://builder.io
2. Click on the **"post-page"** model
3. Click **"New Entry"**

### Step 2: Fill in Required Fields

**Important:** The `slug` field must be in the format: `/post/your-slug-here`

Example:

```
slug: /post/my-first-builder-post
title: My First Builder.io Post
subtitle: This is a test post
```

### Step 3: Add Content

Add your content to the rich text fields:

- `postContentRIch1`: Your first paragraph
- `postContentRIch2`: Your second paragraph
- etc.

### Step 4: Link References

If you have tags set up, link them:

- Select an author from your existing tags
- Select page types (post, event, project result)
- Add related people, projects, organizations

### Step 5: Publish

**Critical:** Click **"Publish"** (not just save as draft!)

Only published posts will be visible on your site.

---

## 🧪 Testing Your Builder.io Post

### Test a Single Post:

1. Create a post in Builder.io with slug: `/post/test-builder-post`
2. Visit: http://localhost:3000/post/test-builder-post
3. Check the bottom-right indicator - should show 🔷 Builder.io
4. Verify all content displays correctly

### Check Console Logs:

In your terminal (where `npm run dev` runs), you'll see:

```
[Builder.io] ✅ Using Builder.io post data for: test-builder-post
```

Or if it falls back:

```
[Wix] ℹ️ Using Wix post data for: test-builder-post
```

---

## 🗺️ Data Structure Mapping

### Builder.io Format → Wix Format

The transformation handles these differences automatically:

#### References:

**Builder.io:**

```json
{
  "author": [
    {
      "authorItem": {
        "@type": "@builder.io/core:Reference",
        "id": "abc123",
        "model": "tag",
        "value": {
          "data": {
            "name": "John Doe",
            "tagType": "person",
            "tagLine": "Software Developer"
          }
        }
      }
    }
  ]
}
```

**Transformed to Wix Format:**

```json
{
  "author": [
    {
      "_id": "abc123",
      "name": "John Doe",
      "tagType": "person",
      "tagLine": "Software Developer"
    }
  ]
}
```

#### Content Arrays:

**Builder.io:** Individual fields (`postContentRIch1`, `postContentRIch2`, etc.)

**Wix Format:** Same structure (no transformation needed)

---

## 🔄 Migration Strategy

### Phase 1: Test with One Post (Current)

1. ✅ Integration is complete
2. Create 1-2 test posts in Builder.io
3. Verify they display correctly
4. Compare with Wix posts to ensure parity

### Phase 2: Gradual Migration

1. Identify high-priority posts to migrate
2. Create them in Builder.io
3. Test each one
4. Keep Wix as fallback

### Phase 3: Bulk Migration

1. Use Builder.io's [Write API](https://www.builder.io/c/docs/write-api) to bulk upload posts
2. Script to transform Wix data to Builder.io format
3. Verify all posts work correctly

### Phase 4: Complete Migration

1. All posts in Builder.io
2. Optional: Remove Wix fallback logic
3. Update to use only Builder.io

---

## 🎨 Customizing the Data Model

### Adding New Fields:

1. Add the field in Builder.io model settings
2. Update `transformBuilderPostToWixFormat()` in `builderPostUtils.ts`:

```typescript
// Add your new field
export function transformBuilderPostToWixFormat(builderPost: any) {
  // ... existing code ...

  data: {
    // ... existing fields ...

    // Add your new field
    myNewField: data.myNewField || '',
  }
}
```

3. PostPageComponent will automatically have access to it via `post.data.myNewField`

### Adding New Reference Types:

For new reference arrays (like tags):

```typescript
// In transformBuilderPostToWixFormat()
myNewTags: transformReferenceArray(data.myNewTags, "myNewTagsItem"),
```

---

## 🐛 Troubleshooting

### Post Not Loading from Builder.io

**Check:**

1. ✅ Post is **Published** (not draft)
2. ✅ Slug is correct format: `/post/your-slug`
3. ✅ Model name is exactly `post-page`
4. ✅ API key is set in `.env.local`

**Debug:**

```bash
# Test the API directly
node verify-builder.js
```

Change the `MODEL_NAME` in the script to `post-page`.

### Data Not Displaying Correctly

**Check:**

1. Console logs for transformation errors
2. Verify field names match exactly in Builder.io
3. Check that references are properly linked

**Debug:**
Add temporary logging:

```typescript
// In app/post-page/[slug]/page.tsx
console.log("Raw Builder.io data:", postPageItem);
console.log("Transformed data:", transformBuilderPostToWixFormat(postPageItem));
```

### References Not Working

**Common Issues:**

- Tag model must be named exactly `tag`
- References must be published
- Field names must match (e.g., `authorItem` wraps the reference)

---

## 📊 Performance Considerations

### Caching:

The Builder.io SDK includes built-in caching. You can customize it:

```typescript
// In builderPostUtils.ts
const content = await getBuilderContent("post-page", {
  query: { "data.slug": `/post/${slug}` },
  limit: 1,
  cacheSeconds: 300, // Cache for 5 minutes
});
```

### Static Generation:

Posts are statically generated at build time using `generateStaticParams()`. The system:

1. Fetches all posts from both Builder.io and Wix
2. Generates static pages for all unique slugs
3. Uses ISR (Incremental Static Regeneration) with 5-minute revalidation

---

## 🔐 Environment Variables

Required in `.env.local`:

```bash
NEXT_PUBLIC_BUILDER_API_KEY=your-builder-io-api-key
```

---

## 📚 Useful References

- [Builder.io Content API](https://www.builder.io/c/docs/content-api)
- [Builder.io Data Models](https://www.builder.io/c/docs/models)
- [Builder.io References](https://www.builder.io/c/docs/custom-fields#references)
- [Builder.io Write API](https://www.builder.io/c/docs/write-api) (for bulk uploads)

---

## ✅ Quick Checklist

Before going live with Builder.io posts:

- [ ] `post-page` model created in Builder.io
- [ ] All required fields added to the model
- [ ] Test post created and published
- [ ] Test post displays correctly on localhost
- [ ] References (tags) are working
- [ ] Images are displaying
- [ ] Rich text content is rendering
- [ ] Metadata (OG images, titles) are correct
- [ ] Mobile display is working
- [ ] Edit mode works (if applicable)

---

## 🚀 Next Steps

1. **Create your `post-page` model** in Builder.io with the fields listed above
2. **Create a test post** with slug `/post/test-builder`
3. **Visit** http://localhost:3000/post/test-builder
4. **Verify** you see the 🔷 Builder.io indicator
5. **Gradually migrate** more posts as you gain confidence

---

Need help? Check the troubleshooting section or review the implementation in:

- `app/utils/builderPostUtils.ts` - Core transformation logic
- `app/post-page/[slug]/page.tsx` - Integration with your app
