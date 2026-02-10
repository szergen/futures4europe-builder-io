# Cache Invalidation Fix - Summary

## Problem

Users were experiencing inconsistent behavior where edits and new pages would sometimes show old data or incorrect payloads. This was caused by **missing Next.js cache revalidation** after create/update/delete operations.

## Root Cause

The API routes were updating the Redis cache but **NOT** invalidating Next.js's server-side cache using `revalidatePath()`. This meant:

1. Redis cache would be updated ✅
2. But Next.js pages would still serve stale cached HTML ❌
3. Users would see old data until the cache naturally expired (24 hours)

## Solution Applied

Added proper cache revalidation using Next.js's `revalidatePath()` function to all CRUD operations:

### Files Modified:

1. **`app/api/builder/post/route.ts`** (POST - Create)

   - Added `revalidatePath()` for new post pages
   - Revalidates: `/post/{slug}`, `/pages/post`, `/dashboard/posts`

2. **`app/api/builder/post/[id]/route.ts`** (PUT & DELETE - Update/Delete)

   - Added `revalidatePath()` for updated/deleted posts
   - Revalidates: `/post/{slug}`, `/pages/post`, `/dashboard/posts`

3. **`app/api/builder/info-page/route.ts`** (POST - Create)

   - Added `revalidatePath()` for new info pages
   - Dynamically revalidates based on pageType (project/person/organisation)

4. **`app/api/builder/info-page/[id]/route.ts`** (PUT & DELETE - Update/Delete)
   - Added `revalidatePath()` for updated/deleted info pages
   - Dynamically revalidates based on pageType

## How It Works Now

### Before (Broken):

```
User saves post → API updates Builder.io → API updates Redis cache → User still sees old data
```

### After (Fixed):

```
User saves post → API updates Builder.io → API updates Redis cache → API calls revalidatePath() → Next.js regenerates pages → User sees new data immediately
```

## Revalidation Strategy

### For Posts:

- Individual post page: `/post/{slug}`
- Post list pages: `/pages/post`, `/dashboard/posts`

### For Info Pages (Projects/Organisations/Persons):

- Individual page: `/{slug}` or `/project/{slug}` or `/organisation/{slug}` or `/person/{slug}`
- List pages: `/dashboard/projects`, `/dashboard/organisations`

## Testing

After deploying this fix:

1. Create a new post → Should appear immediately in lists
2. Edit an existing post → Changes should be visible immediately
3. Delete a post → Should disappear immediately from lists
4. Same for projects, organisations, and persons

## Additional Improvements

### Also Fixed: File Upload Size Limit

- Updated `vercel.json` to allow 40MB uploads (was 10MB)
- Added runtime configuration for Node.js environment
- Added file size checking with helpful error messages

## Deployment Notes

- These changes require a full redeploy to Vercel
- No database migrations needed
- Redis cache will automatically refresh with new data
- Users will see immediate updates after deployment

## Files Changed:

- ✅ `app/api/builder/post/route.ts`
- ✅ `app/api/builder/post/[id]/route.ts`
- ✅ `app/api/builder/info-page/route.ts`
- ✅ `app/api/builder/info-page/[id]/route.ts`
- ✅ `app/api/builder/upload/route.ts`
- ✅ `vercel.json`
- ✅ `next.config.js`

## Monitoring

After deployment, check the Vercel logs for these messages:

- `"[Builder.io API] Revalidating post page: /post/{slug}"`
- `"[Builder.io API] Revalidating info page: /{slug}"`
- These confirm that revalidation is happening correctly
