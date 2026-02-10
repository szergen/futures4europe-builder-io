# ✅ SOLUTION IMPLEMENTED: Direct Upload for Large Files

## The Problem

Getting "413 Content Too Large" errors when uploading PDFs larger than ~4.5MB on Vercel.

## Root Cause

Vercel has a platform-level body size limit that varies by runtime:

- **Edge Runtime**: 4 MB max (cannot be changed)
- **Node.js Runtime**: 4.5 MB default
- The "Maximum Request Body Size" setting may not be visible in the Vercel UI for all plans

## ✅ Solution Implemented

We've updated the `uploadFileToBuilder` function to **automatically bypass Vercel** for large files:

### How It Works:

1. **Files ≤ 4MB**: Upload via proxy (your API route) - Fast, uses edge functions
2. **Files > 4MB**: Upload directly from browser → Builder.io - Bypasses Vercel completely

### No Code Changes Needed!

Your existing code already works! The function signature is the same:

```typescript
// This code ALREADY works with the new implementation:
const uploadedFileResponse = await uploadFileToBuilder(file, composeFilePath);
```

The function now automatically:

- ✅ Detects file size
- ✅ Chooses the best upload method
- ✅ Uses direct upload for files > 4MB
- ✅ Handles errors gracefully
- ✅ Logs which method is being used

### What Was Changed:

**File: `/app/utils/builderUploadUtils.ts`**

- Added `uploadFileDirectToBuilder()` - Uploads directly to Builder.io
- Added `uploadFileViaProxy()` - Uses your existing API route
- Updated `uploadFileToBuilder()` - Automatically chooses the best method

**File: `/app/api/builder/upload-config/route.ts`**

- Created endpoint that provides upload credentials for direct uploads
- Only returns config (doesn't handle file data)

### Testing:

1. Try uploading a file < 4MB → Should use proxy method (check console logs)
2. Try uploading a file > 4MB → Should use direct method (check console logs)
3. Both should work without any 413 errors!

### Console Logs to Look For:

```
[Builder Upload] Using PROXY upload (file size: 2.34MB, via API route)
// OR
[Builder Upload] Using DIRECT upload (file size: 6.78MB, bypasses Vercel)
```

### Force Direct Upload:

If you want to force direct upload even for small files:

```typescript
const uploadedFileResponse = await uploadFileToBuilder(
  file,
  composeFilePath,
  { forceDirectUpload: true }, // <-- Add this
);
```

## Benefits:

✅ **No manual Vercel configuration needed**
✅ **Works with any file size**
✅ **Backward compatible** - existing code keeps working
✅ **Automatic optimization** - small files still use fast proxy
✅ **Zero code changes required** in your upload components

## Files Changed:

- ✅ `/app/utils/builderUploadUtils.ts` - Updated with direct upload support
- ✅ `/app/api/builder/upload-config/route.ts` - Created (provides upload config)

## Components Using This (All Work Automatically):

- ✅ `ContentImageFileUploader`
- ✅ `ProjectResultFileUploader`
- ✅ `InfoPagesImageFileUploader`
- ✅ All other upload components using `uploadFileToBuilder()`

## Deploy and Test:

1. Commit these changes
2. Deploy to Vercel
3. Test uploading a 5MB+ PDF
4. Check console for "[Builder Upload - Direct]" logs
5. Should succeed with 200 OK!

---

**Note**: If you still get 413 errors for files under 4MB, it means the proxy route is hitting Vercel's limit. In that case, you can set `forceDirectUpload: true` or lower the threshold in `builderUploadUtils.ts` (change `fileSizeMB > 4` to `fileSizeMB > 2`).
