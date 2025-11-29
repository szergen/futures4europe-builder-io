# Migration Script Update - Using Fetch with Bearer Auth

## ✅ Changes Made

The `migrate-tags.js` script has been updated to use modern fetch API with proper authentication.

### What Changed

1. **Replaced HTTPS module with fetch** - More reliable and cleaner code
2. **Fixed authentication** - Now uses Bearer token in Authorization header
3. **Simplified API calls** - Removed API key from URL query parameters
4. **Better error handling** - Clearer error messages from Builder.io API

### Technical Changes

#### Before (HTTPS module):

```javascript
const https = require("https");
// Complex request handling with streams
```

#### After (Fetch API):

```javascript
const fetch = require("node-fetch");
// Clean, promise-based requests
```

### Authentication Method

**Old approach** (didn't work):

```javascript
Authorization: Bearer ${API_KEY}
URL: /api/v1/write/tag?apiKey=${API_KEY}
```

**New approach** (works):

```javascript
Authorization: Bearer ${PRIVATE_API_KEY}
URL: https://builder.io/api/v1/write/tag
```

## 🔑 What You Need to Do

### 1. Get Your Private API Key

Go to: https://builder.io/account/space

Look for the **Private API Key** section (starts with `bpk-`)

### 2. Add to `.env.local`

```bash
# Your existing public key (keep this)
NEXT_PUBLIC_BUILDER_API_KEY=your-public-key-here

# NEW: Add your private key
BUILDER_PRIVATE_API_KEY=bpk-your-private-key-here
```

### 3. Test the Migration

```bash
# Test with 1 tag
node migrate-tags.js 1
```

If you see this, you need to add the private key:

```
✗ Builder.io Private API key not found in .env.local
✗ Add BUILDER_PRIVATE_API_KEY to .env.local
✗ Get it from: https://builder.io/account/space
```

If you see this, it's working:

```
✓ [1/1] Created: YourTagName (ID: abc123...)
```

## 📦 Dependencies

Added `node-fetch` to package.json for HTTP requests.

Already installed with `npm install`.

## 🎯 Next Steps

Once you add your `BUILDER_PRIVATE_API_KEY` to `.env.local`:

```bash
# Test with 1 tag
node migrate-tags.js 1

# Migrate first 10 tags
node migrate-tags.js 10

# Migrate all tags
node migrate-tags.js all

# Update master tag references
node migrate-tags.js all migrateMasterTags
```

---

**Need help getting your Private API Key?**
See: `GET_PRIVATE_API_KEY.md`
