# Quick Fix for 413 Error on Vercel - UPDATED

## The Problem

You're getting "413 Content Too Large" errors when uploading files on Vercel (but it works locally).

## ✅ BEST SOLUTION: Direct Upload (Bypasses Vercel)

We've created a utility that **completely bypasses Vercel's body size limits** by uploading directly from the browser to Builder.io.

### How to Use:

```typescript
import { uploadFileToBuilder } from "@app/utils/builderUploadUtils";

// In your upload handler:
const result = await uploadFileToBuilder(file, {
  fileName: "my-file.pdf",
  folder: "uploads",
  altText: "My uploaded file",
});
```

### What It Does:

1. **For large files (>4MB)**: Uploads directly from browser → Builder.io (bypasses Vercel completely)
2. **For small files (<4MB)**: Uses your existing API route (faster)

### Benefits:

✅ Works with **any file size**
✅ **No Vercel configuration needed**
✅ **No dashboard changes required**
✅ Drop-in replacement for existing code
✅ Automatic selection of best upload method

---

## Alternative: Try Finding Vercel Setting (May Not Exist)

The "Maximum Request Body Size" setting that should be in **Functions** → **Advanced Settings** may not be visible in all Vercel plans/UI versions.

If you can find it:

1. Go to Settings → Functions → Advanced Settings
2. Look for "Maximum Request Body Size"
3. Change to 50 MB
4. Save and redeploy

⚠️ **However, this setting often doesn't exist in the UI**, which is why the direct upload approach is recommended.

---

## Why This Happens

Vercel has platform-level limits:

- **Edge Runtime**: 4 MB max (cannot be changed)
- **Node.js Runtime**: 4.5 MB default (may not be configurable via UI)
- The setting may only be available via Vercel API or for Enterprise plans

The direct upload approach **completely avoids** these limits!

---

## Implementation Steps

1. ✅ The utility is already created: `/app/utils/builderUploadUtils.ts`
2. ✅ The config endpoint exists: `/app/api/builder/upload-config/route.ts`
3. Find your upload components and replace fetch calls with `uploadFileToBuilder()`

Example integration:

```typescript
// Before:
const formData = new FormData();
formData.append("file", file);
const response = await fetch("/api/builder/upload", {
  method: "POST",
  body: formData,
});

// After:
import { uploadFileToBuilder } from "@app/utils/builderUploadUtils";
const response = await uploadFileToBuilder(file, {
  fileName: file.name,
  folder: "uploads",
});
```

Would you like me to help integrate this into your existing upload components?
