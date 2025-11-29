# 🚀 Quick Start: Builder.io Posts

> **Note:** This route (`/post-page/[slug]`) loads posts **exclusively from Builder.io**. No Wix fallback.

## ⚡ 5-Minute Setup

### 1. Create Model (2 minutes)

```
→ Go to: https://builder.io/models
→ Click: "New Model"
→ Type: "Data"
→ Name: "post-page"
→ Click: "Create Model"
```

### 2. Add Fields (2 minutes)

**Required fields:**

- `title` (Text)
- `subtitle` (Long Text)
- `slug` (Text) - Format: `/post/your-slug`

**Content fields:**

- `postContentRIch1` (Rich Text)
- `postContentRIch2` (Rich Text)
- ...continue up to `postContentRIch10`

**Reference fields:**

- `author` (List → Reference → tag model)
- `pageTypes` (List → Reference → tag model)
- `pageOwner` (List → Reference → tag model)

### 3. Create Test Post (1 minute)

```
→ Click: "New Entry"
→ Fill in:
   - slug: /post/test-builder
   - title: My First Builder Post
   - Add some content to postContentRIch1
→ Click: "Publish" (not draft!)
```

### 4. Test It!

```bash
npm run dev
# Visit: http://localhost:3000/post/test-builder
# Look for: 🔷 Builder.io indicator (bottom-right)
```

---

## 📝 Important Rules

### ✅ DO:

- Use slug format: `/post/lowercase-with-hyphens`
- Always **PUBLISH** (not just save)
- Test on localhost first
- Check console logs

### ❌ DON'T:

- Forget the `/post/` prefix in slug
- Leave posts as drafts
- Use spaces or special characters in slugs

---

## 🔍 Quick Debug

### Post Not Loading?

**Check these in order:**

1. **Is it published?**

   ```
   Go to Builder.io → Check status says "Published"
   ```

2. **Is slug correct?**

   ```
   Must be: /post/your-slug (with /post/ prefix!)
   ```

3. **Is model name correct?**

   ```
   Must be exactly: post-page (lowercase, hyphen)
   ```

4. **Is API key set?**

   ```
   Check .env.local has: NEXT_PUBLIC_BUILDER_API_KEY=...
   ```

5. **Check terminal logs:**
   ```
   Should see: [Builder.io] ✅ Using Builder.io post data
   ```

---

## 🎯 Field Quick Reference

### Basic Content:

```typescript
title: "My Post Title";
subtitle: "Post description";
slug: "/post/my-post-title";
postContentRIch1: "<p>First paragraph</p>";
postContentRIch2: "<p>Second paragraph</p>";
```

### References (Tags):

```typescript
author: [Link to tag with tagType="person"]
pageTypes: [Link to tag with tagType="page type"]
people: [Link to tags with tagType="person"]
projects: [Link to tags with tagType="project"]
```

### Images:

```typescript
postImage1: { url: "https://...", caption: "..." }
postImage2: { url: "https://...", caption: "..." }
```

---

## 📊 How It Works

```
Request → Check Builder.io → Found? → Display ✅
                  ↓
              Not Found
                  ↓
           Show 404 Error ❌
```

**Note:** Posts are loaded **only from Builder.io** on this route.

---

## 🎨 Development Indicator

**Bottom-right corner of page:**

- 🔷 **Builder.io** = Posts loaded from Builder.io

_(Only visible in development mode)_

---

## 📚 Full Documentation

Need more details? Check these files:

1. **`BUILDER_POST_MIGRATION_GUIDE.md`** ⭐ - Complete guide
2. **`MIGRATION_SUMMARY.md`** - Technical overview
3. **`BUILDER_IO_TROUBLESHOOTING.md`** - Debug help

---

## ✅ Success Checklist

- [ ] Model `post-page` created
- [ ] Required fields added
- [ ] Test post created
- [ ] Test post published
- [ ] Visited `/post/test-builder`
- [ ] Saw 🔷 Builder.io indicator
- [ ] Content displays correctly

---

## 💬 Common Questions

**Q: Does this route load posts from Wix?**
A: No, this route loads **only from Builder.io**. No Wix fallback.

**Q: What if I want Wix posts too?**
A: You can keep Wix posts on a different route, or add back the fallback logic.

**Q: What happens if a post doesn't exist?**
A: You'll see a "Post Not Found" error with helpful instructions.

**Q: How do I verify posts are from Builder.io?**
A: Check the 🔷 indicator (dev mode) or terminal logs.

---

**Ready to start? Create your model and first post! 🎉**
