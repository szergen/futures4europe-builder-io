# Futures4Europe

Futures4Europe is an online platform for the European research and innovation (R&I) foresight community. Further developed through the EU-funded Eye of Europe – The Research and Innovation Foresight Community project (Horizon Europe, Grant Agreement No. 101131738), it connects foresight practitioners, researchers, policymakers and wider audiences, supporting the exchange of projects, methods, resources and opportunities for collaboration.

This repository makes the platform’s source code available to support transparent development, maintenance and reuse. It is intended for developers and technical teams working on foresight platforms or research infrastructures, open-source and open-science communities, and institutions or projects interested in adapting the code for similar digital environments.

In line with the project’s Data Management Plan, GitHub supports ongoing development and version control, while software releases are intended for archiving in Zenodo for long-term preservation and citation. The software is the output designated for reuse; user profiles and other user-generated platform content are outside the scope of that software release.

## What this repository is

A [Next.js](https://nextjs.org/) application (App Router) that serves the Futures4Europe website. Editorial content is stored in [Builder.io](https://www.builder.io/). Sign-in stays with [Wix](https://www.wix.com/). Pages are cached with Redis ([Upstash](https://upstash.com/)) and with Next.js incremental static regeneration.

## Tech stack

- **Framework**: Next.js 13+ (App Router), React 18
- **Content**: Builder.io
- **Authentication**: Wix
- **Cache**: Redis via `@upstash/redis`
- **Styling**: Tailwind CSS, Flowbite, CSS Modules
- **UI**: Material UI, Emotion
- **Animation**: Framer Motion, GSAP, React Spring
- **Editing**: React Hook Form, Draft.js
- **Analytics and errors**: Vercel Analytics, PostHog, Sentry
- **Tests**: Playwright
- **Package manager**: Yarn 3.3.0

## Content types

| Model | What it holds | Public route |
| --- | --- | --- |
| `post-page` | Posts, events, and project results | `/post-page/[slug]` |
| `info-page` | Projects, people, and organisations | `/project-page/[slug]`, `/person-page/[slug]`, `/organisation-page/[slug]` |
| `tag` | Topics, methods, domains, countries, and related labels | Used across content |
| `affiliations` | Links between people, organisations, and projects | Used across content |
| `homepage-config` | Featured items on the home page | `/` |
| `page` | Builder-managed pages | As configured in Builder.io |
| `admin-section` | Reusable admin sections | Dashboard |

Field definitions exported from Builder.io, plus fictive examples, are in [`docs/schema/`](docs/schema/).

## Getting started

### Prerequisites

- Node.js 18+
- Yarn 3.3.0
- A Redis instance (or an Upstash account)
- A Builder.io public API key
- A Wix client ID (authentication)

### Install and run

```bash
yarn install
yarn dev
```

The development server runs at [http://localhost:3000](http://localhost:3000).

```bash
yarn build    # production build
yarn start    # serve the production build
yarn lint     # ESLint
yarn test     # Playwright end-to-end tests
yarn storybook
```

### Environment variables

Create `.env.local` in the repository root before `yarn dev`. Do not commit it.

```env
# Builder.io
NEXT_PUBLIC_BUILDER_API_KEY=your_builder_api_key
BUILDER_PRIVATE_API_KEY=your_builder_private_key

# Redis / Upstash
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token

# Wix authentication
NEXT_PUBLIC_WIX_CLIENT_ID=your_wix_client_id
NEXT_PUBLIC_WIX_SITE_ID=your_wix_site_id
NEXT_PUBLIC_WIX_API_KEY=your_wix_api_key
NEXT_PUBLIC_WIX_ACCOUNT_ID=your_wix_account_id

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Project structure

```
app/                  # Next.js routes, components, and API handlers
docs/schema/          # Builder.io model schemas and fictive examples
docs/builder-io/      # Builder.io setup notes
scripts/              # Maintenance and data scripts
builder.config.ts     # Builder.io component registration
```

`data/data-set/` is a local backup of the Builder.io content and of the Wix contacts and site-member lists. It is listed in `.gitignore` and is not part of the public repository. User profiles and other user-generated content stay out of the software release.

## Testing

```bash
yarn test
yarn playwright test tests/e2e/home.spec.ts
yarn playwright test --ui
```

## License

The source code is released under the MIT License. The same text is in [`LICENSE`](LICENSE).

```
The MIT License (MIT)

Copyright (c) 2015 Wix.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
