# Builder.io Troubleshooting Guide

## Issue: Content Not Loading for "admin-section" Model

This guide will help you diagnose why your Builder.io content isn't being fetched.

---

## Step 1: Verify API Key Configuration

### Check if `.env.local` exists and has the correct key:

1. **Create or check `.env.local` file** in your project root:

   ```bash
   # .env.local
   NEXT_PUBLIC_BUILDER_API_KEY=your-actual-api-key-here
   ```

2. **Get your API key from Builder.io:**

   - Go to https://builder.io
   - Navigate to **Settings** → **API Keys**
   - Copy your **Public API Key**
   - Paste it in `.env.local`

3. **Restart your development server** after adding/updating the key:
   ```bash
   # Stop your current server (Ctrl+C), then:
   npm run dev
   # or
   yarn dev
   ```

---

## Step 2: Verify the Model Name in Builder.io Dashboard

The model name **MUST match exactly** (case-sensitive):

1. Go to your **Builder.io dashboard**
2. Click on **Models** in the left sidebar
3. Check if you have a model named **exactly** `admin-section`

### Common Issues:

- ❌ Model named `Admin Section` (with space)
- ❌ Model named `Admin-Section` (capital A)
- ❌ Model named `adminsection` (no hyphen)
- ✅ Model named `admin-section` (lowercase with hyphen)

### If the model doesn't exist:

**Option A: Create the model with the correct name**

1. Click **"New Model"** in Builder.io
2. Choose model type (**Section** or **Page** or **Data**)
3. Name it exactly: `admin-section`

**Option B: Update your code to match the existing model name**

```typescript
// In app/builder-test/page.tsx, change:
const sectionContent = await getBuilderContent("admin-section", {
// to match your actual model name, for example:
const sectionContent = await getBuilderContent("your-actual-model-name", {
```

---

## Step 3: Check if Content is Published

1. Go to your **Builder.io dashboard**
2. Click on the **admin-section** model
3. Check if you have any content entries
4. If you have content entries, verify they are **Published** (not Draft)

### To publish content:

1. Click on the content entry
2. Look for the **"Publish"** button (usually top-right)
3. Click **"Publish"** to make it live

---

## Step 4: Check Console Output

With the enhanced debugging added, check your **server terminal** (where `npm run dev` is running):

You should see output like:

```
===== Builder.io Test Page - Debug Info =====
Environment API Key: Set
[Builder.io] Fetching content for model: "admin-section"
[Builder.io] API Key configured: Yes
[Builder.io] Options: { query: {}, limit: 1 }
[Builder.io] Content fetched for "admin-section": Found
[Builder.io] Content ID: abc123...
[Builder.io] Content name: Your Content Name
===== End Debug Info =====
```

### What to look for:

**If you see:**

```
Environment API Key: NOT SET
```

→ **Fix:** Go back to Step 1 and set up your `.env.local` file

**If you see:**

```
[Builder.io] Content fetched for "admin-section": Not found
```

→ **Fix:** Go to Step 2 or Step 3 - model doesn't exist or no published content

**If you see an error:**

```
[Builder.io] Error fetching content for model "admin-section": [error details]
```

→ **Fix:** Check the error message for specific details

---

## Step 5: Test with a Different Model

Try fetching content from Builder.io's default "page" model to verify your API key works:

```typescript
// In app/builder-test/page.tsx, temporarily change:
const sectionContent = await getBuilderContent("page", {
  // ...
});
```

Then create a test "page" in Builder.io:

1. Go to your Builder.io dashboard
2. Click **"New Entry"** under the **page** model
3. Add some content
4. **Publish** it
5. Refresh your test page

If this works, the issue is with the `admin-section` model specifically.

---

## Step 6: Verify Model Type in BuilderContent Component

Check that your model is registered in the TypeScript types:

In `app/shared-components/Builder/BuilderContent.tsx`, the interface should include your model:

```typescript
interface BuilderContentProps {
  model: "page" | "admin-section" | "tag";
  // ...
}
```

This is already set correctly in your code. ✅

---

## Step 7: Remove Query Restrictions (Temporarily)

Try fetching without any query filters:

```typescript
const sectionContent = await getBuilderContent("admin-section", {
  limit: 1,
  // Remove the query object entirely to get ANY content
});
```

Sometimes content might not match your query criteria.

---

## Quick Checklist

Use this checklist to verify everything:

- [ ] `.env.local` file exists in project root
- [ ] `NEXT_PUBLIC_BUILDER_API_KEY` is set in `.env.local`
- [ ] Development server was restarted after adding API key
- [ ] Model named **exactly** `admin-section` exists in Builder.io dashboard
- [ ] At least one content entry exists for the `admin-section` model
- [ ] Content entry is **Published** (not Draft)
- [ ] Console shows "API Key configured: Yes"
- [ ] No error messages in console

---

## Common Solutions

### Solution 1: The Fast Track

If you just want to test that Builder.io works:

1. Use the default `page` model instead of `admin-section`
2. Create a new page in Builder.io dashboard
3. Set the URL path to anything (e.g., `/test`)
4. Add some content
5. Publish it
6. Update your code to fetch `"page"` model

### Solution 2: Start Fresh with Admin Section

1. Go to Builder.io dashboard
2. Create a new model named **exactly** `admin-section`
3. Choose "Section" as the model type
4. Create a new entry
5. Add some content (even just a text block)
6. **Publish** the entry
7. Refresh your test page

---

## Testing Your Fix

After making changes, test by:

1. **Restart your development server**
2. Visit http://localhost:3000/builder-test
3. Check the **terminal console** for debug logs
4. Check the **browser console** for any errors
5. The page should show content instead of "No content found in Builder.io"

---

## Still Not Working?

If you've tried all the steps above and it still doesn't work:

1. **Share the console output** - Copy the debug logs from your terminal
2. **Verify your API key** - Make sure it's the Public API Key (starts with your space ID)
3. **Check Builder.io status** - Visit https://status.builder.io to ensure the service is operational
4. **Try the Builder.io API directly** - Test with curl:

```bash
curl -X GET "https://cdn.builder.io/api/v3/content/admin-section?apiKey=YOUR_API_KEY&limit=1"
```

Replace `YOUR_API_KEY` with your actual API key and `admin-section` with your model name.

If this returns content, then the issue is in your code configuration. If it returns an error or empty results, the issue is in your Builder.io setup.

---

## Next Steps After Fixing

Once you get content loading:

1. Remove or reduce the debug console.log statements
2. Create more content entries
3. Add custom fields to your model
4. Register custom components (like the Tag component already set up)
5. Build out your actual pages with Builder.io content

---

## Need More Help?

- Builder.io Docs: https://www.builder.io/c/docs
- Builder.io Community: https://forum.builder.io
- Next.js Integration: https://www.builder.io/c/docs/frameworks/next
