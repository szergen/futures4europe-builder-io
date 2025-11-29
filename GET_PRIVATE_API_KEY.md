# Get Your Builder.io Private API Key

## 🔴 Required for Migration Script

The migration script has been updated to use **fetch** with proper Bearer token authentication.

For **writing/creating** content in Builder.io (like migrating tags), you need a **Private API Key**, not the public key.

- ❌ `NEXT_PUBLIC_BUILDER_API_KEY` - Public key (read-only)
- ✅ `BUILDER_PRIVATE_API_KEY` - Private key (read + write) **← YOU NEED THIS**

## How to Get It

### Step 1: Go to Builder.io Account Settings

Open: **https://builder.io/account/space**

Or navigate:

1. Login to https://builder.io
2. Click your profile (bottom left)
3. Click "Account Settings"
4. Select your space
5. Go to "Space Settings"

### Step 2: Copy Your Private API Key

Look for the **Private API Key** section (not the Public key).

### Step 3: Add to `.env.local`

Add this line to your `.env.local` file:

```bash
BUILDER_PRIVATE_API_KEY=bpk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Important:**

- Keep your public key too (for reading content)
- The private key starts with `bpk-`
- Never commit the `.env.local` file to git

### Your `.env.local` Should Look Like:

```bash
# Public key (for reading content in your app)
NEXT_PUBLIC_BUILDER_API_KEY=your-public-key-here

# Private key (for migration scripts and content creation)
BUILDER_PRIVATE_API_KEY=bpk-your-private-key-here
```

## Test It

After adding the private key, test the migration:

```bash
node migrate-tags.js 1
```

If you see ✅ instead of ❌, you're all set!

---

**Need Help?**

- Builder.io Docs: https://www.builder.io/c/docs/account-settings
- Make sure you're in the correct space/organization
