# Vercel Configuration Guide - File Upload Size Limit

## Problem

Getting "413 Content Too Large" errors when uploading PDFs larger than ~4.5MB on Vercel, even though the code is configured correctly.

## Root Cause

Vercel has a **platform-level limit** that overrides code configuration. For Pro plans, this defaults to 4.5MB and **must be manually changed in the dashboard**.

## Solution: Configure in Vercel Dashboard

### Step-by-Step Instructions:

1. **Open Vercel Dashboard**

   - Go to https://vercel.com
   - Navigate to your `futures4europe-builder-io` project

2. **Go to Project Settings**

   - Click **Settings** in the top navigation bar

3. **Navigate to Functions Settings**

   - In the left sidebar, click **Functions**

4. **Update Maximum Request Body Size**

   - Scroll down to find **"Maximum Request Body Size"**
   - You should see a dropdown or input field showing the current limit (likely 4.5 MB)
   - Change it to **50 MB** (or your desired limit up to 100 MB for Pro plan)
   - Click **Save**

5. **Redeploy (if needed)**
   - Go back to **Deployments** tab
   - Click **"Redeploy"** on your latest deployment
   - Or push a new commit to trigger a deployment

### Important Notes:

- **This setting is REQUIRED for Vercel deployments** - code configuration alone is not enough
- **Pro Plan Limits**: Up to 100 MB (we're setting 50 MB for safety)
- **Hobby Plan**: Limited to 4.5 MB (cannot be increased)
- This setting applies to **all** API routes in your project

## Verification

After configuring:

1. Try uploading a 5MB+ PDF through your app
2. Check the browser Network tab:

   - ✅ Should return 200 OK (success)
   - ❌ If still 413, the setting may not have taken effect - try redeploying

3. Check Vercel Function Logs:
   - Look for `[Builder.io Upload API] File size: X.XXmb`
   - Should not reject files under 50MB

## Alternative: Environment-Specific Check

If you continue to have issues, you can add environment-specific handling in the code to detect Vercel's limits and provide better error messages.

## Code Configuration (Already Done)

The code is already configured with:

- ✅ `next.config.js`: `experimental.serverActions.bodySizeLimit: '50mb'`
- ✅ `vercel.json`: Function configuration for upload route
- ✅ `app/api/builder/upload/route.ts`: Runtime config and size validation

## Support

If the issue persists after dashboard configuration:

1. Check your Vercel plan type (Pro required for >4.5MB)
2. Contact Vercel support with your project ID
3. They can verify if the setting is properly applied

## Reference Links

- Vercel Functions Documentation: https://vercel.com/docs/functions
- Vercel Pro Plan Limits: https://vercel.com/docs/limits/overview
