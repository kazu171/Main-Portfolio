# Architecture Research: AEO/GEO Optimization for Next.js App Router

**Domain:** AI Search Optimization (AEO/GEO)
**Researched:** 2026-02-12
**Confidence:** HIGH (based on existing AEO/GEO skill knowledge + Next.js App Router patterns)

## System Overview

```
+----------------------------------------------------------------+
|                      AEO/GEO Architecture                       |
+----------------------------------------------------------------+
|                                                                  |
|  +-----------------------+    +----------------------------+    |
|  |  Content Layer        |    |  Schema Layer              |    |
|  +-----------------------+    +----------------------------+    |
|  | lib/content/          |    | lib/schema/                |    |
|  | - types.ts            |--->| - types.ts (Schema types)  |    |
|  | - workflows.ts        |    | - generators/              |    |
|  | - case-studies.ts     |    |   - faq.ts                 |    |
|  | - aeo/                |    |   - article.ts             |    |
|  |   - enhanced-types.ts |    |   - how-to.ts              |    |
|  |   - faq-content.ts    |    |   - person.ts              |    |
|  +-----------+-----------+    |   - organization.ts        |    |
|              |                +-------------+--------------+    |
|              v                              |                   |
|  +-----------------------+                  v                   |
|  |  Page Layer           |    +----------------------------+    |
|  +-----------------------+    |  Component Layer           |    |
|  | app/[locale]/         |    +----------------------------+    |
|  | - layout.tsx          |<---| components/seo/            |    |
|  | - page.tsx            |    | - JsonLd.tsx               |    |
|  | - cases/[slug]/       |    | - FAQ.tsx (visual + data)  |    |
|  |   - page.tsx          |    | - AuthorProfile.tsx        |    |
|  +-----------------------+    +----------------------------+    |
|                                                                  |
+----------------------------------------------------------------+
```

## Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| **Content Layer** (`lib/content/`) | Static content data + AEO metadata | TypeScript objects with bilingual content |
| **Schema Layer** (`lib/schema/`) | JSON-LD schema generators | Pure functions that transform content to Schema.org |
| **Page Layer** (`app/[locale]/`) | Route handling + metadata + RSC | Server Components with `generateMetadata` |
| **Component Layer** (`components/seo/`) | Reusable schema injection + visual FAQ | React components for JSON-LD and visible content |

## Recommended Project Structure

```
lib/
├── content/
│   ├── types.ts                    # Existing: base article types
│   ├── workflows.ts                # Existing: workflow data
│   ├── case-studies.ts             # Existing: case study data
│   ├── index.ts                    # Existing: exports
│   └── aeo/                        # NEW: AEO-specific enhancements
│       ├── types.ts                # Extended types with FAQ, stats, quotes
│       ├── faq-content.ts          # FAQ data for pages
│       └── author.ts               # Author/expertise info
├── schema/                          # NEW: Schema.org generators
│   ├── types.ts                    # Schema.org TypeScript types
│   ├── index.ts                    # Unified schema generator
│   └── generators/
│       ├── faq-page.ts             # FAQPage schema generator
│       ├── article.ts              # Article schema with author
│       ├── how-to.ts               # HowTo schema for workflows
│       ├── person.ts               # Person schema (author)
│       ├── organization.ts         # Organization schema
│       └── breadcrumb.ts           # BreadcrumbList schema
└── utils.ts                         # Existing: utilities

components/
├── ui/                              # Existing: Mochi design system
└── seo/                             # NEW: SEO/AEO components
    ├── JsonLd.tsx                  # JSON-LD script injection
    ├── FAQ.tsx                     # Visible FAQ + schema
    ├── AuthorCard.tsx              # E-E-AT author display
    └── StructuredContent.tsx       # Content wrapper with schema

app/
└── [locale]/
    ├── layout.tsx                  # Organization + Person schemas (global)
    ├── page.tsx                    # Home page with WebPage schema
    ├── about/
    │   └── page.tsx                # Enhanced E-E-AT content
    ├── what-i-do/
    │   └── page.tsx                # Service descriptions + schema
    ├── cases/
    │   ├── page.tsx                # CollectionPage schema
    │   └── [slug]/
    │       └── page.tsx            # Article/HowTo schemas per article
    └── process/
        └── page.tsx                # HowTo schema for process
```

### Structure Rationale

- **lib/content/aeo/:** Extends existing content types without breaking current structure. FAQ content, statistics, and quotes are added as optional properties or separate files.
- **lib/schema/:** Centralized schema generation allows reuse across pages and keeps JSON-LD logic out of components.
- **components/seo/:** Separates AEO concerns from UI. JsonLd handles injection; FAQ renders both visible and structured.
- **app/[locale]/:** Each page exports `generateMetadata` for SEO meta and embeds schemas via layout or page.

## Architectural Patterns

### Pattern 1: Schema Generator Functions

**What:** Pure functions that take content objects and return Schema.org JSON-LD objects
**When to use:** Every page that needs structured data
**Trade-offs:** Clean separation, but requires maintaining type mappings

**Example:**
```typescript
// lib/schema/generators/article.ts
import type { WorkflowArticle } from '@/lib/content/types';
import type { Article } from 'schema-dts';

export function generateArticleSchema(
  article: WorkflowArticle,
  locale: 'en' | 'ja',
  url: string
): Article {
  return {
    '@type': 'Article',
    headline: locale === 'en' ? article.titleEn : article.titleJa,
    description: locale === 'en' ? article.descriptionEn : article.descriptionJa,
    image: article.heroImage,
    datePublished: article.datePublished, // NEW field
    dateModified: article.dateModified,   // NEW field
    author: {
      '@type': 'Person',
      name: 'Kazuya Hibara',
      url: `https://example.com/${locale}/about`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}
```

### Pattern 2: JsonLd Component

**What:** React component that safely injects JSON-LD scripts
**When to use:** In page components or layouts to add structured data
**Trade-offs:** Simple injection, but must handle SSR correctly

**Example:**
```typescript
// components/seo/JsonLd.tsx
import { Thing, WithContext } from 'schema-dts';

interface JsonLdProps<T extends Thing> {
  schema: WithContext<T>;
}

export function JsonLd<T extends Thing>({ schema }: JsonLdProps<T>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### Pattern 3: FAQ with Dual Rendering

**What:** Component that renders both visible FAQ accordion and FAQPage schema
**When to use:** Any page with Q&A content (critical for AI search visibility)
**Trade-offs:** Content appears twice (visible + structured), ensure sync

**Example:**
```typescript
// components/seo/FAQ.tsx
interface FAQProps {
  items: Array<{ question: string; answer: string }>;
  pageUrl: string;
}

export function FAQ({ items, pageUrl }: FAQProps) {
  const schema: FAQPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd schema={schema} />
      {/* Visible accordion UI */}
      <div className="space-y-4">
        {items.map((item, i) => (
          <details key={i} className="group">
            <summary className="font-bold cursor-pointer">{item.question}</summary>
            <p className="mt-2 text-muted-foreground">{item.answer}</p>
          </details>
        ))}
      </div>
    </>
  );
}
```

### Pattern 4: Extended Content Types

**What:** Extend existing content types with AEO-specific fields
**When to use:** When enhancing existing content for AI search
**Trade-offs:** Backward compatible, but increases type complexity

**Example:**
```typescript
// lib/content/aeo/types.ts
import { WorkflowArticle } from '../types';

export interface AEOEnhancedWorkflow extends WorkflowArticle {
  // GEO High Impact (30-40% visibility boost)
  citations?: Array<{
    source: string;
    url: string;
    quote?: string;
    year: number;
  }>;
  statistics?: Array<{
    value: string;
    description: { en: string; ja: string };
    source: string;
    year: number;
  }>;
  expertQuotes?: Array<{
    quote: { en: string; ja: string };
    author: string;
    title: string;
    url?: string;
  }>;

  // FAQ content for this article
  faq?: Array<{
    question: { en: string; ja: string };
    answer: { en: string; ja: string };
  }>;

  // Publication dates (critical for Perplexity)
  datePublished: string; // ISO 8601
  dateModified: string;  // ISO 8601
}
```

## Data Flow

### Schema Generation Flow

```
Content Data (lib/content/)
    |
    v
Schema Generator (lib/schema/generators/)
    |
    v
Schema Object (typed JSON-LD)
    |
    v
JsonLd Component (components/seo/)
    |
    v
<script type="application/ld+json"> in HTML
    |
    v
AI Search Engines (ChatGPT, Perplexity, Google AIO)
```

### Page Rendering Flow

```
Route Request (app/[locale]/cases/[slug])
    |
    v
generateMetadata() — Meta tags + OG
    |
    v
Page Component (Server Component)
    |
    +---> Content lookup (lib/content/)
    |
    +---> Schema generation (lib/schema/)
    |
    +---> Render with JsonLd + visible content
    |
    v
HTML Response with:
  - <head>: meta, OG, JSON-LD scripts
  - <body>: visible content matching schema
```

### Key Data Flows

1. **Content-to-Schema:** Content objects transformed to Schema.org via generator functions. One content item may generate multiple schemas (e.g., Article + FAQPage + HowTo).

2. **Metadata Pipeline:** Next.js `generateMetadata` handles meta tags. JSON-LD handled separately via component injection in page body or layout.

3. **Locale Branching:** Schema generators receive locale parameter and select appropriate language content. All schemas maintain language-appropriate text.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 15 articles (current) | Static generation, manual schema per page |
| 50+ articles | Abstract schema patterns, create page templates |
| 200+ articles | Consider CMS integration, automated schema injection |

### Scaling Priorities

1. **First bottleneck:** Manual FAQ content per page. Solution: Create FAQ content files in `lib/content/aeo/` and import per page.

2. **Second bottleneck:** Schema duplication across pages. Solution: Centralize schema generators, create page-type templates.

## Anti-Patterns

### Anti-Pattern 1: Schema in Client Components

**What people do:** Put JSON-LD generation in 'use client' components
**Why it's wrong:** Increases bundle size, delays schema availability, not indexed properly
**Do this instead:** Generate schemas in Server Components or `generateMetadata`

### Anti-Pattern 2: Visible Content Mismatch

**What people do:** Schema content differs from visible page content
**Why it's wrong:** Google penalizes schema spam; AI engines may ignore mismatched data
**Do this instead:** Single source of truth in content layer, render both from same data

### Anti-Pattern 3: Keyword Stuffing in Schema

**What people do:** Overload schema `description` with keywords
**Why it's wrong:** Princeton research shows keyword stuffing reduces AI visibility by 30%+
**Do this instead:** Natural language in schema, follow content guidelines

### Anti-Pattern 4: Missing dateModified

**What people do:** Only set datePublished, never update dateModified
**Why it's wrong:** Perplexity heavily favors recent content (76.4% of cited pages updated within 30 days)
**Do this instead:** Track and expose dateModified in content types and schema

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Schema Validator | Manual testing via schema.org/validator | Run before deploy |
| Google Rich Results Test | Manual testing | Verify FAQPage, Article, HowTo |
| AI Search Engines | Crawling | No direct integration; optimize for crawl |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Content <-> Schema | Import + function call | Schema generators import content types |
| Schema <-> Component | Props passing | JsonLd receives typed schema objects |
| Page <-> Layout | Component composition | Layout can inject global schemas (Organization) |

## Build Order Implications

Based on component dependencies, implement in this order:

```
Phase 1: Foundation (no dependencies)
├── lib/schema/types.ts         # Schema type definitions
├── lib/content/aeo/types.ts    # Extended content types
└── components/seo/JsonLd.tsx   # Schema injection component

Phase 2: Content Enhancement (depends on Phase 1)
├── lib/content/aeo/author.ts   # Author/E-E-AT data
├── lib/content/aeo/faq-content.ts  # FAQ data per page
└── Extend existing content with datePublished/dateModified

Phase 3: Schema Generators (depends on Phase 1)
├── lib/schema/generators/person.ts        # Author schema
├── lib/schema/generators/organization.ts  # Organization schema
├── lib/schema/generators/article.ts       # Article schema
├── lib/schema/generators/faq-page.ts      # FAQPage schema
├── lib/schema/generators/how-to.ts        # HowTo schema
└── lib/schema/index.ts                    # Unified export

Phase 4: Component Integration (depends on Phase 1-3)
├── components/seo/FAQ.tsx              # Visible FAQ + schema
├── components/seo/AuthorCard.tsx       # E-E-AT author display
└── app/[locale]/layout.tsx             # Global schemas (Organization)

Phase 5: Page-by-Page Integration (depends on Phase 1-4)
├── app/[locale]/about/page.tsx         # E-E-AT focused
├── app/[locale]/what-i-do/page.tsx     # Service + FAQ schemas
├── app/[locale]/cases/page.tsx         # CollectionPage schema
├── app/[locale]/cases/[slug]/page.tsx  # Article/HowTo per article
└── app/[locale]/process/page.tsx       # HowTo schema
```

## Sources

- AEO/GEO Skill (`~/.claude/skills/aeo-geo-optimizer/`) - HIGH confidence (verified internal knowledge)
- Princeton GEO Study (2023) - HIGH confidence (cited in skill)
- Schema.org Official Documentation - HIGH confidence
- Next.js App Router Documentation - HIGH confidence

---
*Architecture research for: AEO/GEO Optimization on Next.js App Router*
*Researched: 2026-02-12*
