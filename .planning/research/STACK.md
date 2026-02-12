# Stack Research: AEO/GEO Optimization for Next.js Portfolio

**Domain:** AEO/GEO (Answer Engine Optimization / Generative Engine Optimization)
**Researched:** 2026-02-12
**Confidence:** HIGH

## Executive Summary

AEO/GEO optimization for Next.js does not require additional dependencies beyond what Next.js 16 provides natively. The key technologies are:

1. **JSON-LD Structured Data** - Native `<script type="application/ld+json">` (no library needed, optional `schema-dts` for TypeScript)
2. **Sitemap** - Native `app/sitemap.ts` with i18n alternates
3. **Robots.txt** - Native `app/robots.ts`
4. **Metadata** - Native `generateMetadata` API

The existing stack (Next.js 16.1.6 + next-intl 4.8.2) is sufficient. The work is primarily content architecture and markup implementation, not library adoption.

---

## Recommended Stack

### Core Technologies (Already Installed - No Changes Needed)

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js | 16.1.6 | Framework | Native sitemap.ts, robots.ts, generateMetadata - no external packages needed |
| next-intl | 4.8.2 | i18n | Already handles locale routing; sitemap alternates integrate naturally |
| TypeScript | 5.6.3 | Type safety | JSON-LD type checking with schema-dts |

### Supporting Libraries (Optional - Add Only If Needed)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| schema-dts | 1.1.5 | TypeScript types for Schema.org | Add for type-safe JSON-LD authoring; purely dev-time benefit |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| [Rich Results Test](https://search.google.com/test/rich-results) | Validate JSON-LD for Google | Run after each schema implementation |
| [Schema Markup Validator](https://validator.schema.org/) | Validate JSON-LD generically | For non-Google AI engines |

---

## Detailed Technology Decisions

### 1. JSON-LD Structured Data

**Recommendation:** Native implementation with optional `schema-dts`

**Confidence:** HIGH (verified with Next.js 16.1.6 official docs)

**Implementation Pattern (from Next.js official docs):**

```tsx
// app/[locale]/cases/[slug]/page.tsx
import type { Article, WithContext } from 'schema-dts';

export default async function Page({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);

  const jsonLd: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    author: { '@type': 'Person', name: 'Kazuya Hibara' },
    datePublished: article.publishedAt,
    dateModified: article.modifiedAt,
  };

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      {/* Page content */}
    </section>
  );
}
```

**Why not alternatives:**
- `next-seo`: Legacy package, not optimized for App Router. generateMetadata is native and sufficient.
- `react-schemaorg`: Adds React component wrapper overhead. Direct script tag is cleaner and Next.js recommended.

**AEO/GEO Impact (from Skill knowledge):**
- FAQPage schema: AI Overviewsに3.2倍表示されやすい
- Article schema with author: E-E-ATシグナルを伝達
- Person schema: 専門性・権威性のシグナル

---

### 2. Sitemap Generation

**Recommendation:** Native `app/sitemap.ts` with i18n alternates

**Confidence:** HIGH (verified with Next.js 16.1.6 official docs)

**Implementation Pattern:**

```tsx
// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/content';

const BASE_URL = 'https://kazuyahibara.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();

  const staticPages = ['', '/about', '/what-i-do', '/process', '/contact', '/cases'];

  const staticEntries = staticPages.map((path) => ({
    url: `${BASE_URL}/en${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
    alternates: {
      languages: {
        en: `${BASE_URL}/en${path}`,
        ja: `${BASE_URL}/ja${path}`,
      },
    },
  }));

  const articleEntries = articles.map((article) => ({
    url: `${BASE_URL}/en/cases/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
    alternates: {
      languages: {
        en: `${BASE_URL}/en/cases/${article.slug}`,
        ja: `${BASE_URL}/ja/cases/${article.slug}`,
      },
    },
  }));

  return [...staticEntries, ...articleEntries];
}
```

**Why not next-sitemap:**
- Next.js 15+ has native sitemap.ts support with full i18n alternates
- Reduces dependencies
- Better integration with App Router caching

---

### 3. Robots.txt

**Recommendation:** Native `app/robots.ts`

**Confidence:** HIGH (verified with Next.js 16.1.6 official docs)

**Implementation Pattern:**

```tsx
// app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/private/'],
      },
    ],
    sitemap: 'https://kazuyahibara.com/sitemap.xml',
  };
}
```

---

### 4. Metadata (Already Implemented)

**Current State:** generateMetadata in `app/[locale]/layout.tsx` - already correct pattern.

**Enhancement Needed:** Add per-page metadata with article-specific titles/descriptions.

---

## Installation

```bash
# Optional: Add schema-dts for TypeScript JSON-LD types
npm install -D schema-dts
```

**Note:** This is the only new dependency. Everything else uses Next.js native features.

---

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Native sitemap.ts | next-sitemap | Legacy projects on Pages Router |
| Native robots.ts | Static robots.txt | Never (dynamic is better) |
| schema-dts | No typing | If team doesn't use TypeScript strictly |
| generateMetadata | next-seo | Legacy Pages Router projects |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| next-seo | Designed for Pages Router; adds unnecessary abstraction over native App Router APIs | Native generateMetadata + JSON-LD script |
| react-schemaorg | Adds React component overhead; not needed with native script approach | Direct script tag with schema-dts types |
| next-sitemap | Adds build step complexity; Next.js native is sufficient for this project size | Native sitemap.ts |
| External SEO plugins | Most are outdated or designed for pre-App Router Next.js | Native Next.js features |

---

## Stack Patterns by Content Type

**Workflow Articles (12 articles):**
- Schema: `Article` + `HowTo` (for howItWorks section)
- Metadata: Dynamic generateMetadata with locale-aware titles
- Sitemap: Include with monthly changeFrequency

**Case Studies (3 articles):**
- Schema: `Article` + `FAQPage` (extract Q&A from painPoints)
- Metadata: Dynamic generateMetadata with business persona context
- Sitemap: Include with monthly changeFrequency

**Static Pages (About, Process, Contact, etc.):**
- Schema: `Person` (About), `Organization` (implicit via author)
- Metadata: Static metadata export
- Sitemap: Include with lower changeFrequency

---

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| Next.js 16.1.6 | sitemap.ts, robots.ts, generateMetadata | All native features verified |
| next-intl 4.8.2 | sitemap alternates | Locale routing pattern compatible |
| schema-dts 1.1.5 | TypeScript 5.6.3 | Dev dependency only, no runtime cost |

---

## AEO/GEO-Specific Implementation Notes

Based on the aeo-geo-optimizer Skill:

### High-Priority Schema Types

1. **FAQPage** - 3.2x more likely to appear in AI Overviews
2. **Article** - With full author attribution for E-E-AT
3. **Person** - For author entity establishment
4. **HowTo** - For workflow step-by-step content

### Platform-Specific Considerations

| Platform | Key Requirement | How Stack Addresses |
|----------|-----------------|---------------------|
| ChatGPT | Bing indexing | sitemap.xml + robots.txt allow Bingbot |
| Perplexity | Fresh content signals | dateModified in Article schema |
| Google AI Overviews | Structured data | FAQPage, HowTo, Article schemas |

### Content Structure Checklist (from Skill)

These are content requirements, not stack requirements:

- [ ] 50-word direct answer in H1
- [ ] FAQ Q&A blocks with FAQPage schema
- [ ] 5-7 citations per 1000 words
- [ ] Statistics with sources
- [ ] Expert quotes

---

## Sources

- [Next.js JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld) - Official docs (v16.1.6), verified 2026-02-12 (HIGH confidence)
- [Next.js Sitemap Reference](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) - Official docs (v16.1.6), verified 2026-02-12 (HIGH confidence)
- [Next.js Robots Reference](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) - Official docs (v16.1.6), verified 2026-02-12 (HIGH confidence)
- [schema-dts npm](https://www.npmjs.com/package/schema-dts) - Google's TypeScript types for Schema.org (HIGH confidence)
- [aeo-geo-optimizer Skill](~/.agents/skills/aeo-geo-optimizer/) - Internal Skill with Princeton research references (HIGH confidence)

---

*Stack research for: AEO/GEO Optimization on Next.js Portfolio*
*Researched: 2026-02-12*
