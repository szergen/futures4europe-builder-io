# 🚀 Quick Fix for Builder.io "admin-section" Not Loading

## What I've Added

I've enhanced your setup with debugging tools and comprehensive documentation to help you diagnose and fix the issue.

### Files Modified:

1. ✅ **`app/shared-components/Builder/builderUtils.ts`** - Added detailed logging
2. ✅ **`app/builder-test/page.tsx`** - Added environment check

### Files Created:

1. 📄 **`BUILDER_IO_TROUBLESHOOTING.md`** - Comprehensive troubleshooting guide
2. 🔧 **`verify-builder.js`** - Connection verification script
3. 📋 **`list-builder-models.js`** - Lists all your Builder.io models

---

## 🎯 Quick Diagnosis - Start Here

### Step 1: Run the Model Lister (Fastest Check)

```bash
node list-builder-models.js
```

This will:

- Verify your API key works
- Show all models in your Builder.io space
- Confirm if "admin-section" exists

**What you'll learn:**

- Does the "admin-section" model exist?
- What other models do you have?
- Is your API key working?

---

### Step 2: Run the Connection Verifier

```bash
node verify-builder.js
```

This will:

- Check your `.env.local` file
- Test the API connection
- Show available content entries
- Tell you exactly what's wrong

**Expected output if everything works:**

```
✅ API Key found
✅ Connection successful
✅ SUCCESS! Content is available
```

---

### Step 3: Check Your Development Server Logs

1. Restart your dev server:

   ```bash
   npm run dev
   ```

2. Visit: http://localhost:3000/builder-test

3. Look at your **terminal** (not browser) for debug output:
   ```
   ===== Builder.io Test Page - Debug Info =====
   Environment API Key: Set
   [Builder.io] Fetching content for model: "admin-section"
   [Builder.io] API Key configured: Yes
   [Builder.io] Content fetched for "admin-section": Found
   ===== End Debug Info =====
   ```

---

## 🔍 Most Common Issues & Fixes

### Issue #1: API Key Not Set ❌

**Symptoms:**

```
Environment API Key: NOT SET
```

**Fix:**

1. Create `.env.local` in your project root
2. Add this line:
   ```
   NEXT_PUBLIC_BUILDER_API_KEY=your-actual-key-here
   ```
3. Get your key from: https://builder.io/account/space
4. Restart your dev server

---

### Issue #2: Model Name Mismatch ❌

**Symptoms:**

```
[Builder.io] Content fetched for "admin-section": Not found
```

And `list-builder-models.js` shows the model doesn't exist.

**Fix Option A - Create the Model:**

1. Go to https://builder.io
2. Click **"Models"** → **"New Model"**
3. Name it exactly: `admin-section` (lowercase, with hyphen)
4. Choose type: Section, Page, or Data
5. Click Create

**Fix Option B - Use Existing Model:**

1. Run `node list-builder-models.js` to see your models
2. Update your code to use an existing model:
   ```typescript
   // In app/builder-test/page.tsx, line 20:
   const sectionContent = await getBuilderContent("your-existing-model-name", {
   ```

---

### Issue #3: No Published Content ❌

**Symptoms:**

- Model exists (✅)
- API key works (✅)
- But `verify-builder.js` shows: `Found entries: 0`

**Fix:**

1. Go to https://builder.io
2. Click on your **"admin-section"** model
3. Click **"New Entry"**
4. Add some content (even just a text block)
5. Click **"Publish"** (NOT just save)
   - Make sure it says "Published" not "Draft"
6. Refresh your test page

---

## 📝 Step-by-Step First-Time Setup

If you're setting this up for the first time:

1. **Get Builder.io Account**

   - Sign up at https://builder.io (free tier available)

2. **Get API Key**

   - Go to Settings → API Keys
   - Copy your **Public API Key**

3. **Configure Environment**

   ```bash
   # Create .env.local in project root
   echo "NEXT_PUBLIC_BUILDER_API_KEY=your-key-here" > .env.local
   ```

4. **Verify Connection**

   ```bash
   node verify-builder.js
   ```

5. **Create Model**

   - Go to Builder.io dashboard
   - Models → New Model
   - Name: `admin-section`
   - Type: Section (or Page/Data based on your needs)

6. **Create Content**

   - Click on admin-section model
   - New Entry
   - Add content using visual editor
   - **Important:** Click "Publish"

7. **Test**
   ```bash
   npm run dev
   # Visit http://localhost:3000/builder-test
   ```

---

## 🎓 Understanding the Debug Output

When you visit `/builder-test`, you'll see logs like this:

```
===== Builder.io Test Page - Debug Info =====
Environment API Key: Set                              ← ✅ Good
[Builder.io] Fetching content for model: "admin-section"
[Builder.io] API Key configured: Yes                  ← ✅ Good
[Builder.io] Options: { query: {}, limit: 1 }
[Builder.io] Content fetched for "admin-section": Found  ← ✅ Good!
[Builder.io] Content ID: abc123...
[Builder.io] Content name: My Admin Section
===== End Debug Info =====
```

**If you see "Not found" instead of "Found":**

- Run `node list-builder-models.js` to check if model exists
- Run `node verify-builder.js` to check for content entries
- Follow the fixes in the "Most Common Issues" section above

---

## 🧪 Quick Test with Default "page" Model

If you want to verify Builder.io works at all, test with the default "page" model:

```typescript
// Temporarily change in app/builder-test/page.tsx line 20:
const sectionContent = await getBuilderContent("page", {
  limit: 1,
});
```

Then:

1. Go to Builder.io dashboard
2. Create a "page" entry
3. Publish it
4. Refresh your test page

If this works but "admin-section" doesn't, it confirms the issue is with the model setup.

---

## 📚 Full Documentation

For comprehensive information, see:

- **`BUILDER_IO_TROUBLESHOOTING.md`** - Detailed troubleshooting guide
- **`BUILDER_IO_SETUP.md`** - Complete setup and integration guide

---

## 🆘 Still Having Issues?

1. **Share the output from:**

   ```bash
   node list-builder-models.js
   node verify-builder.js
   ```

2. **Check your terminal logs** when loading `/builder-test`

3. **Verify in Builder.io dashboard:**

   - Does the model exist?
   - Is content published?
   - Is the model name exactly `admin-section`?

4. **Test the API directly:**
   ```bash
   curl "https://cdn.builder.io/api/v3/content/admin-section?apiKey=YOUR_KEY&limit=1"
   ```

---

## ✅ Success Checklist

Your setup is working when you see:

- [ ] `list-builder-models.js` shows "admin-section" model exists
- [ ] `verify-builder.js` shows "SUCCESS! Content is available"
- [ ] Terminal logs show "Content fetched: Found"
- [ ] Test page displays your Builder.io content (not the yellow warning box)

---

## 🎉 Next Steps After It's Working

Once content is loading:

1. **Create more content** in Builder.io dashboard
2. **Add custom fields** to your model
3. **Register more components** (see BUILDER_IO_SETUP.md)
4. **Remove debug logs** (or reduce verbosity)
5. **Build your actual pages** with Builder.io content

---

**Need immediate help?** Run the diagnostic scripts and check the output!
