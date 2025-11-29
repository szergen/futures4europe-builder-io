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

### Dynamic Pages with Builder.io Content

The `/info/[slug]` route automatically renders Builder.io content based on the URL slug:

```typescript
// Automatically available at /info/your-page-slug
// Content is fetched from Builder.io using the slug
```

**How it works:**

1. Creates content in Builder.io with a URL path like `/info/your-slug`
2. Visit `/info/your-slug` on your site
3. The page automatically fetches and renders the content

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

### Example: Creating Dynamic Info Pages

1. Create a new **Page Model** in Builder.io
2. Set the URL to `/info/your-page-slug` (replace with your desired slug)
3. Design your page content using the visual editor
4. Publish the content
5. Visit `/info/your-page-slug` on your Next.js site

**Important Notes:**

- The URL path in Builder.io should match the slug you want
- Make sure to publish the content (not leave it as draft)
- The page will automatically handle metadata based on your content

## 🎨 Custom Components

### Tag Component Integration ✅

The **Tag component** has been successfully integrated with Builder.io and is available in the visual editor.

#### 🚀 Quick Test

Visit [`/tag-test`](http://localhost:3000/tag-test) to see the integration in action and get step-by-step instructions.

#### 📋 Available Properties

The Tag component includes the following configurable properties in Builder.io:

| Property                 | Type    | Description                                                    | Required |
| ------------------------ | ------- | -------------------------------------------------------------- | -------- |
| `name`                   | string  | Tag display name                                               | ✅ Yes   |
| `tagCategory`            | enum    | Category selection (person, organization, project, etc.)       | No       |
| `tagPageLink`            | url     | Custom link for the tag                                        | No       |
| `picture`                | file    | Tag icon/image (jpeg, jpg, png, svg)                           | No       |
| `pictureAlt`             | string  | Alt text for the tag image                                     | No       |
| `tagTrend`               | number  | Tag trend value (-100 to 100)                                  | No       |
| `enableLabel`            | boolean | Show category label before the tag                             | No       |
| `tagType`                | enum    | Type of tag for styling (person, organisation, project, other) | No       |
| `tagLine`                | string  | Subtitle or description for the tag                            | No       |
| `disableTooltip`         | boolean | Disable hover tooltip                                          | No       |
| `disableLink`            | boolean | Disable tag link functionality                                 | No       |
| `disablePopularityHover` | boolean | Disable popularity display on hover                            | No       |
| `mentions`               | number  | Number of mentions (popularity)                                | No       |
| `hardcodedMentions`      | number  | Override mentions with fixed number                            | No       |
| `disableUnderline`       | boolean | Disable underline styling                                      | No       |
| `masterTag`              | string  | Master tag ID for tag hierarchy                                | No       |
| `className`              | string  | Additional CSS classes                                         | No       |

#### 🎯 How to Use in Builder.io

1. **Open Builder.io Dashboard**

   - Go to your Builder.io workspace
   - Create or edit a Page/Section

2. **Add the Tag Component**

   - In the visual editor, click the "+" button to add components
   - Look for "Tag" in the **Custom Components** section
   - Drag and drop it onto your page

3. **Configure Properties**

   - Select the Tag component on your page
   - Use the properties panel on the right to configure:
     - **Required**: Set the `name` field
     - **Optional**: Configure category, link, image, styling options

4. **Preview and Publish**
   - Use the preview mode to see how it looks
   - Publish your content when ready

#### 🔧 Technical Implementation

The Tag component registration is handled in:

```
app/shared-components/Builder/components/TagComponent.tsx
```

Key features:

- **Automatic Integration**: Works with existing authentication and tag systems
- **Smart Defaults**: Pre-configured with sensible default values
- **Type Safety**: Full TypeScript support with proper type definitions
- **Accessibility**: Includes proper alt text and accessibility features
- **Flexibility**: All original Tag component features are preserved

#### 💡 Example Use Cases

- **Content Marketing**: Add tags to blog posts and articles
- **Project Showcases**: Tag projects with relevant technologies
- **Team Pages**: Tag team members with their expertise
- **Event Pages**: Tag events with relevant topics and speakers

### General Component Registration

You can register additional custom React components with Builder.io:

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

#### 📁 File Structure for Custom Components

```
app/shared-components/Builder/
├── components/
│   ├── TagComponent.tsx      ✅ Tag component registration
│   ├── index.ts              ✅ Component exports
│   └── [YourComponent].tsx   📝 Add more components here
├── BuilderProvider.tsx       ✅ Imports component registrations
├── BuilderContent.tsx        ✅ Content renderer
└── index.ts                  ✅ Main exports
```

## 🔧 Adding New Components to Builder.io

Follow these steps to integrate any existing component with Builder.io's visual editor:

### Step 1: Choose Your Component

Pick any component from `app/shared-components/` that you want to make available in Builder.io. Good candidates include:

- **Button** - Call-to-action buttons
- **Hero** - Page headers and banners
- **InputText** - Form inputs
- **Typography** - Text components
- **Card/MiniPage** - Content blocks
- **Carousel** - Image/content sliders

### Step 2: Create the Builder.io Registration File

Create a new file in `app/shared-components/Builder/components/`:

```typescript
// Example: app/shared-components/Builder/components/ButtonComponent.tsx
"use client";

import { Builder } from "@builder.io/react";
import { Button } from "../../Button/Button"; // Import your component

// Register the component with Builder.io
Builder.registerComponent(Button, {
  name: "CustomButton",
  image: "https://tabler-icons.io/static/tabler-icons/icons/button.svg",
  inputs: [
    {
      name: "children",
      type: "string",
      required: true,
      helperText: "Button text content",
      defaultValue: "Click me",
    },
    {
      name: "className",
      type: "string",
      helperText: "Additional CSS classes",
    },
    {
      name: "onClick",
      type: "string",
      helperText: "JavaScript code to execute on click (optional)",
    },
  ],
  defaultValue: {
    children: "Click me",
  },
  override: {
    canHaveChildren: false,
  },
});

export default Button;
```

### Step 3: Input Field Types Reference

Builder.io supports various input types for component properties:

| Type       | Description        | Example Use                    |
| ---------- | ------------------ | ------------------------------ |
| `string`   | Text input         | Titles, labels, short text     |
| `longText` | Textarea           | Descriptions, long content     |
| `richText` | Rich text editor   | Formatted content with HTML    |
| `number`   | Number input       | Counts, sizes, quantities      |
| `boolean`  | Checkbox           | Enable/disable options         |
| `color`    | Color picker       | Background colors, text colors |
| `file`     | File upload        | Images, documents              |
| `url`      | URL input          | Links, external resources      |
| `date`     | Date picker        | Event dates, deadlines         |
| `enum`     | Dropdown selection | Predefined options             |
| `list`     | Array of items     | Multiple values                |
| `object`   | Nested object      | Complex configurations         |

#### Advanced Input Options

```typescript
{
  name: "size",
  type: "string",
  enum: ["small", "medium", "large"],
  defaultValue: "medium",
  helperText: "Button size",
},
{
  name: "variant",
  type: "string",
  enum: ["primary", "secondary", "outline"],
  defaultValue: "primary",
},
{
  name: "disabled",
  type: "boolean",
  defaultValue: false,
  helperText: "Disable the button",
},
{
  name: "icon",
  type: "file",
  allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
  helperText: "Optional icon image",
},
{
  name: "count",
  type: "number",
  min: 0,
  max: 100,
  defaultValue: 1,
},
```

### Step 4: Update Component Exports

Add your new component to `app/shared-components/Builder/components/index.ts`:

```typescript
// Export all Builder.io registered components
export { default as TagComponent } from "./TagComponent";
export { default as ButtonComponent } from "./ButtonComponent";
export { default as HeroComponent } from "./HeroComponent";
// Add more exports here...
```

### Step 5: Import in BuilderProvider

Add the import to `app/shared-components/Builder/BuilderProvider.tsx`:

```typescript
// Import component registrations
import "./components/TagComponent";
import "./components/ButtonComponent";
import "./components/HeroComponent";
// Add more imports here...
```

### Step 6: Test Your Component

1. **Restart your development server** (important!)
2. **Visit your Builder.io dashboard**
3. **Create or edit a page/section**
4. **Look for your component** in the custom components panel
5. **Drag and drop** it onto your page
6. **Configure properties** and test functionality

### 🎯 Real-World Examples

#### Example: Hero Component Registration

```typescript
// app/shared-components/Builder/components/HeroComponent.tsx
"use client";

import { Builder } from "@builder.io/react";
import { Hero, HeroProps } from "../../Hero/Hero";

Builder.registerComponent(Hero, {
  name: "Hero",
  image: "https://tabler-icons.io/static/tabler-icons/icons/layout-header.svg",
  inputs: [
    {
      name: "title",
      type: "string",
      required: true,
      helperText: "Main hero title",
      defaultValue: "Welcome to Our Site",
    },
    {
      name: "subtitle",
      type: "string",
      helperText: "Optional subtitle text",
    },
    {
      name: "pageType",
      type: "string",
      enum: [
        "event",
        "project",
        "project-result",
        "organisation",
        "person",
        "post",
      ],
      helperText: "Page type for automatic subtitle generation",
    },
    {
      name: "children",
      type: "richText",
      helperText: "Additional content (HTML supported)",
    },
  ],
  defaultValue: {
    title: "Welcome to Our Site",
    pageType: "post",
  },
  override: {
    canHaveChildren: true, // Allows nesting other components
  },
});

export default Hero;
```

#### Example: Input Component Registration

```typescript
// app/shared-components/Builder/components/InputTextComponent.tsx
"use client";

import { Builder } from "@builder.io/react";
import { InputText, InputTextProps } from "../../InputText/InputText";

Builder.registerComponent(InputText, {
  name: "InputText",
  image: "https://tabler-icons.io/static/tabler-icons/icons/forms.svg",
  inputs: [
    {
      name: "label",
      type: "string",
      helperText: "Input field label",
    },
    {
      name: "placeholder",
      type: "string",
      helperText: "Placeholder text",
      defaultValue: "Enter text...",
    },
    {
      name: "helperText",
      type: "string",
      helperText: "Help text below the input",
    },
    {
      name: "type",
      type: "string",
      enum: ["text", "email", "password", "number", "tel", "url"],
      defaultValue: "text",
      helperText: "Input type",
    },
    {
      name: "isHorizontal",
      type: "boolean",
      defaultValue: false,
      helperText: "Horizontal layout",
    },
  ],
  defaultValue: {
    placeholder: "Enter text...",
    type: "text",
  },
});

export default InputText;
```

### 🚨 Important Notes

1. **Restart Required**: Always restart your dev server after adding new components
2. **Client Components**: All Builder.io registrations must use `"use client"`
3. **Unique Names**: Each component must have a unique `name` in Builder.io
4. **Import Path**: Make sure import paths to your components are correct
5. **Props Compatibility**: Only props that can be serialized work in Builder.io (no functions, unless as strings)

### 🔍 Troubleshooting New Components

**Component not appearing in Builder.io:**

- Check that the dev server was restarted
- Verify the import is added to `BuilderProvider.tsx`
- Check browser console for registration errors

**Properties not working:**

- Ensure input types match the component's prop types
- Check for typos in property names
- Verify required fields are marked correctly

**Styling issues:**

- Confirm CSS modules are imported in the original component
- Check that className props are being passed through
- Test the component works standalone first

### ✅ Quick Checklist for Adding Components

Use this checklist when adding any new component to Builder.io:

- [ ] **Choose component** from `app/shared-components/`
- [ ] **Create registration file** in `app/shared-components/Builder/components/[ComponentName]Component.tsx`
- [ ] **Add `"use client";`** at the top of the registration file
- [ ] **Import Builder and your component**
- [ ] **Call `Builder.registerComponent()`** with proper configuration
- [ ] **Define input fields** with correct types and validation
- [ ] **Set default values** for required props
- [ ] **Export component** in `app/shared-components/Builder/components/index.ts`
- [ ] **Import registration** in `app/shared-components/Builder/BuilderProvider.tsx`
- [ ] **Restart development server**
- [ ] **Test in Builder.io dashboard**
- [ ] **Verify properties work correctly**
- [ ] **Test published content**

### 🎨 Component Registration Template

Copy this template for quick component registration:

```typescript
"use client";

import { Builder } from "@builder.io/react";
import {
  YourComponent,
  YourComponentProps,
} from "../../YourComponent/YourComponent";

Builder.registerComponent(YourComponent, {
  name: "YourComponentName",
  image: "https://tabler-icons.io/static/tabler-icons/icons/your-icon.svg",
  inputs: [
    {
      name: "propName",
      type: "string", // or number, boolean, etc.
      required: true,
      helperText: "Description of this property",
      defaultValue: "Default value",
    },
    // Add more inputs here...
  ],
  defaultValue: {
    propName: "Default value",
  },
  override: {
    canHaveChildren: false, // or true if component accepts children
  },
});

export default YourComponent;
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

**Tag Component Issues**

- **Component not appearing**: Ensure the development server was restarted after adding the component
- **Properties not saving**: Check that all required fields (like `name`) are filled
- **Styling issues**: Verify that the Tag component's CSS modules are loading correctly
- **Authentication errors**: The Tag component uses `useAuth()` - ensure the AuthProvider is properly configured

## 📞 Need Help?

If you run into issues:

1. **For Tag Component**: Visit [`/tag-test`](http://localhost:3000/tag-test) to verify the integration
2. **General Issues**: Test with the [`/builder-test`](http://localhost:3000/builder-test) page first
3. Check the browser console for error messages
4. Verify your Builder.io dashboard has content
5. Ensure content is published (not in draft mode)
6. Check the Builder.io documentation for your specific use case

### Useful Test Pages

- **[`/tag-test`](http://localhost:3000/tag-test)** - Tag component integration test
- **[`/builder-test`](http://localhost:3000/builder-test)** - General Builder.io integration test
- **[`/info/[slug]`](http://localhost:3000/info)** - Dynamic page content test
