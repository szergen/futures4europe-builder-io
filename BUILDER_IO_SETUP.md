# Builder.io Integration Setup Guide

This guide walks you through integrating Builder.io into your Next.js project as a headless CMS alongside your existing Wix setup.

## 🚀 Quick Start

### 1. Environment Setup

Add the following to your `.env.local` file:

```bash
NEXT_PUBLIC_BUILDER_API_KEY=your-builder-io-api-key-here
```

To get your API key:

1. Go to [Builder.io](https://builder.io) and sign in to your account
2. Navigate to **Settings** > **API Keys**
3. Copy your API key and add it to your `.env.local` file

### 2. Test the Integration

Visit `/builder-test` to see the integration in action. This page demonstrates:

- Server-side content fetching
- Client-side content loading
- Hybrid layouts (fixed components + dynamic content)
- Different content models (Page, Section, Data Model)

## 📚 Content Models Overview

Builder.io offers three main content model types:

### 🎨 Page Model

- **Use for**: Complete page layouts
- **Best for**: Landing pages, marketing pages, full page designs
- **Features**: Full visual editor with drag-and-drop components

### 🧩 Section Model

- **Use for**: Reusable page sections
- **Best for**: Hero sections, feature blocks, testimonials
- **Features**: Modular content that can be inserted into existing pages

### 📊 Data Model

- **Use for**: Structured content
- **Best for**: Blog posts, product information, structured data
- **Features**: Schema-based content with custom fields

## 🛠 Implementation Examples

### Server-Side Content Fetching

```typescript
import { getBuilderContent } from "@app/shared-components/Builder";

export default async function MyPage() {
  const content = await getBuilderContent("section", {
    query: { "data.published": true },
    limit: 1,
  });

  return <BuilderContent model="section" content={content} />;
}
```

### Client-Side Content Fetching

```typescript
"use client";
import { builder } from "@builder.io/react";
import { BuilderContent } from "@app/shared-components/Builder";

export default function MyComponent() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    builder
      .get("section", {
        query: { "data.published": true },
      })
      .toPromise()
      .then(setContent);
  }, []);

  return <BuilderContent model="section" content={content} />;
}
```

## 🎯 Migration Strategy

### Phase 1: Content Testing (Current)

- ✅ Builder.io SDK installed
- ✅ Test page created
- ✅ Basic content models set up
- 🎯 Create content in Builder.io dashboard
- 🎯 Test different content types

### Phase 2: Gradual Migration

- Replace specific Wix content sections with Builder.io
- Start with non-critical content (marketing pages, blog posts)
- Keep Wix authentication and user management

### Phase 3: Full Migration

- Migrate all content to Builder.io
- Keep only Wix authentication
- Consider migrating auth to a different solution if needed

## 🔧 Builder.io Dashboard Setup

### Creating Content Models

1. **Go to Models** in your Builder.io dashboard
2. **Click "New Model"**
3. **Choose model type**:
   - **Page**: For full page layouts
   - **Section**: For reusable components
   - **Data**: For structured content

### Example: Creating a Blog Post Data Model

1. Create a new **Data Model** called "blog-post"
2. Add fields:
   - `title` (Text)
   - `content` (Rich Text)
   - `author` (Text)
   - `publishDate` (Date)
   - `tags` (List of Text)
   - `featured` (Boolean)

### Example: Creating a Hero Section

1. Create a new **Section Model** called "hero-section"
2. Use the visual editor to design your hero section
3. Add dynamic fields for title, subtitle, CTA button, etc.

## 🎨 Custom Components

You can register custom React components with Builder.io:

```typescript
import { Builder } from "@builder.io/react";
import MyCustomComponent from "./MyCustomComponent";

Builder.registerComponent(MyCustomComponent, {
  name: "MyCustomComponent",
  inputs: [
    { name: "title", type: "string" },
    { name: "description", type: "longText" },
  ],
});
```

## 🔗 Useful Links

- [Builder.io Documentation](https://www.builder.io/c/docs)
- [Next.js Integration Guide](https://www.builder.io/c/docs/frameworks/next)
- [React SDK Reference](https://www.builder.io/c/docs/sdk-react)
- [Builder.io API Reference](https://www.builder.io/c/docs/api-reference)

## 🐛 Troubleshooting

### Common Issues

**API Key not working**

- Ensure your API key is correctly set in `.env.local`
- Restart your development server after adding the key
- Check that the key starts with your Builder.io space ID

**Content not loading**

- Verify content exists in your Builder.io dashboard
- Check that content is published (not draft)
- Ensure the model name matches exactly

**TypeScript errors**

- Make sure you're importing from the correct paths
- Check that all Builder.io packages are properly installed

## 📞 Need Help?

If you run into issues:

1. Check the browser console for error messages
2. Verify your Builder.io dashboard has content
3. Test with the `/builder-test` page first
4. Check the Builder.io documentation for your specific use case
