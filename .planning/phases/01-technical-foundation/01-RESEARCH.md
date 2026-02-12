# Phase 1: Technical Foundation - Research

**Researched:** 2026-02-12
**Domain:** Next.js Metadata API (robots.txt, sitemap.xml) + AI Crawler Configuration
**Confidence:** HIGH

## Summary

Phase 1 focuses on ensuring AI search crawlers (GPTBot, PerplexityBot, ClaudeBot, GoogleBot) can access and index the portfolio site. This requires two deliverables: (1) a robots.txt file that explicitly allows these AI crawlers, and (2) a sitemap.xml that includes all pages with proper lastmod dates and hreflang alternates for en/ja bilingual support.

Next.js 16 provides built-in support for both files through the App Router's metadata file conventions. The `app/robots.ts` and `app/sitemap.ts` special route handlers generate these files dynamically at build time. For multilingual sites using next-intl, the sitemap must include `alternates.languages` entries to generate proper hreflang tags in the XML output.

**Primary recommendation:** Use Next.js native `app/robots.ts` and `app/sitemap.ts` files with TypeScript types from `MetadataRoute`. Dynamically generate sitemap entries from the existing content data (`lib/content/`) to ensure all pages are indexed with correct hreflang alternates.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | Metadata file conventions (`robots.ts`, `sitemap.ts`) | Native support, no additional dependencies |
| TypeScript | 5.6.3 | Type safety with `MetadataRoute.Robots` and `MetadataRoute.Sitemap` | Already in project |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next-intl | 4.8.2 | `getPathname()` for locale-aware URL generation in sitemap | Already in project; use for hreflang URL construction |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Native `sitemap.ts` | next-sitemap package | next-sitemap adds complexity; native is sufficient for ~30 pages |
| Dynamic `robots.ts` | Static `robots.txt` file | Static works but dynamic allows environment-aware configuration |

**Installation:**
```bash
# No additional packages needed - all capabilities are built into Next.js 16
```

## Architecture Patterns

### Recommended Project Structure
```
app/
├── robots.ts           # Generates /robots.txt (root level, outside [locale])
├── sitemap.ts          # Generates /sitemap.xml (root level, outside [locale])
└── [locale]/
    ├── page.tsx        # Homepage
    ├── about/page.tsx  # etc.
    └── cases/[slug]/page.tsx  # Dynamic article pages
```

### Pattern 1: Dynamic robots.ts with AI Crawler Allow List
**What:** TypeScript file that exports a function returning `MetadataRoute.Robots`
**When to use:** Always for AEO/GEO optimization
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

  return {
    rules: [
      // AI Search Crawlers - ALLOW (for AEO/GEO)
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      // Default rule for all other crawlers
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
```

### Pattern 2: Multilingual Sitemap with hreflang Alternates
**What:** TypeScript file that dynamically generates sitemap entries with `alternates.languages`
**When to use:** For bilingual sites with next-intl routing
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
import type { MetadataRoute } from 'next'
import { routing } from '@/routing'
import { getAllArticles } from '@/lib/content'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'
const locales = routing.locales // ['en', 'ja']
const defaultLocale = routing.defaultLocale // 'en'

// Static pages in the site
const staticPages = ['', 'about', 'what-i-do', 'process', 'cases', 'contact', 'privacy']

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  // Static pages with hreflang alternates
  for (const page of staticPages) {
    const path = page ? `/${page}` : ''
    entries.push({
      url: `${baseUrl}/en${path}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'weekly' : 'monthly',
      priority: page === '' ? 1.0 : 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en${path}`,
          ja: `${baseUrl}/ja${path}`,
        },
      },
    })
  }

  // Dynamic article pages
  const articles = getAllArticles()
  for (const article of articles) {
    entries.push({
      url: `${baseUrl}/en/cases/${article.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/en/cases/${article.slug}`,
          ja: `${baseUrl}/ja/cases/${article.slug}`,
        },
      },
    })
  }

  return entries
}
```

### Anti-Patterns to Avoid
- **Placing robots.ts or sitemap.ts inside [locale] folder:** These must be at app root to generate `/robots.txt` and `/sitemap.xml` without locale prefix
- **Using static .txt or .xml files when content is dynamic:** Lose lastModified accuracy and risk stale data
- **Forgetting hreflang for bilingual pages:** AI crawlers use hreflang to understand language relationships
- **Blocking AI crawlers by default:** Many sites block AI bots; for AEO this defeats the purpose

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| XML sitemap generation | Manual string concatenation | `MetadataRoute.Sitemap` type | Next.js handles XML formatting, escaping, namespaces |
| hreflang tags | Custom XML attributes | `alternates.languages` property | Automatic `xhtml:link` generation with proper xmlns |
| robots.txt parsing | Custom text formatting | `MetadataRoute.Robots` type | Proper User-agent/Allow/Disallow formatting |

**Key insight:** Next.js 16's metadata file conventions handle all XML/text formatting edge cases. Manual generation risks malformed output that crawlers reject.

## Common Pitfalls

### Pitfall 1: Missing Sitemap Reference in robots.txt
**What goes wrong:** AI crawlers don't discover the sitemap automatically
**Why it happens:** Forgetting to add `sitemap` property to robots.ts return object
**How to avoid:** Always include `sitemap: '${baseUrl}/sitemap.xml'` in robots.ts
**Warning signs:** Search Console shows "Sitemap not found" or AI tools don't index pages

### Pitfall 2: Incorrect hreflang Self-Reference
**What goes wrong:** Search engines get confused about canonical language
**Why it happens:** Not including the current locale in its own alternates
**How to avoid:** Each URL's alternates must include ALL language versions including itself
**Warning signs:** Duplicate content warnings, wrong language showing in search results

### Pitfall 3: Static lastModified Dates
**What goes wrong:** Crawlers don't know content freshness, may deprioritize
**Why it happens:** Using `new Date()` at build time for all pages (same timestamp)
**How to avoid:** For dynamic content, track actual modification dates; for static, use build date
**Warning signs:** All pages show identical lastmod in sitemap

### Pitfall 4: Blocking Training Crawlers vs Search Crawlers
**What goes wrong:** Blocking GPTBot blocks ChatGPT search citations
**Why it happens:** Confusion between training-only bots and search/citation bots
**How to avoid:** For AEO, allow all major AI search crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot)
**Warning signs:** Site never appears in AI-generated answers despite relevant content

### Pitfall 5: Environment Variable Missing in Production
**What goes wrong:** Sitemap URLs point to localhost or undefined
**Why it happens:** NEXT_PUBLIC_SITE_URL not set in deployment environment
**How to avoid:** Ensure env variable is set in Vercel/hosting platform; add fallback
**Warning signs:** Sitemap shows "undefined/en/about" or "http://localhost:3000"

## Code Examples

Verified patterns from official Next.js 16.1.6 documentation:

### Complete robots.ts for AEO
```typescript
// app/robots.ts
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kazuya.work'

  return {
    rules: [
      // OpenAI crawlers
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      // Anthropic crawlers
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'claude-web', allow: '/' },
      // Perplexity crawlers
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Perplexity-User', allow: '/' },
      // Google crawlers
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      // Default for other crawlers
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
```

### Complete sitemap.ts for Bilingual Site
```typescript
// app/sitemap.ts
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
import type { MetadataRoute } from 'next'
import { routing } from '@/routing'
import { getAllArticles } from '@/lib/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kazuya.work'

  // Define all static pages
  const staticPages = [
    { path: '', priority: 1.0, changeFreq: 'weekly' as const },
    { path: 'about', priority: 0.8, changeFreq: 'monthly' as const },
    { path: 'what-i-do', priority: 0.9, changeFreq: 'monthly' as const },
    { path: 'process', priority: 0.7, changeFreq: 'monthly' as const },
    { path: 'cases', priority: 0.8, changeFreq: 'weekly' as const },
    { path: 'contact', priority: 0.6, changeFreq: 'yearly' as const },
    { path: 'privacy', priority: 0.3, changeFreq: 'yearly' as const },
  ]

  const entries: MetadataRoute.Sitemap = []

  // Generate entries for static pages
  for (const page of staticPages) {
    const path = page.path ? `/${page.path}` : ''
    entries.push({
      url: `${baseUrl}/en${path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFreq,
      priority: page.priority,
      alternates: {
        languages: {
          en: `${baseUrl}/en${path}`,
          ja: `${baseUrl}/ja${path}`,
        },
      },
    })
  }

  // Generate entries for dynamic article pages
  const articles = getAllArticles()
  for (const article of articles) {
    entries.push({
      url: `${baseUrl}/en/cases/${article.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/en/cases/${article.slug}`,
          ja: `${baseUrl}/ja/cases/${article.slug}`,
        },
      },
    })
  }

  return entries
}
```

### Expected XML Output for Bilingual Entry
```xml
<!-- Generated by Next.js sitemap.ts with alternates.languages -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://kazuya.work/en/about</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://kazuya.work/en/about"/>
    <xhtml:link rel="alternate" hreflang="ja" href="https://kazuya.work/ja/about"/>
    <lastmod>2026-02-12T00:00:00.000Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

## AI Crawler Reference

### Crawlers to ALLOW for AEO/GEO Optimization
| User-Agent | Company | Purpose | Why Allow |
|------------|---------|---------|-----------|
| `GPTBot` | OpenAI | Model training & ChatGPT search | Primary AI search citation source |
| `OAI-SearchBot` | OpenAI | ChatGPT search indexing | Real-time search results |
| `ChatGPT-User` | OpenAI | User-initiated browsing | Direct user citations |
| `ClaudeBot` | Anthropic | Claude model & search | AI assistant citations |
| `claude-web` | Anthropic | Web-focused crawling | Search feature support |
| `PerplexityBot` | Perplexity AI | Answer engine indexing | AI search visibility |
| `Perplexity-User` | Perplexity AI | User-initiated fetch | Real-time answers |
| `Google-Extended` | Google | AI/Gemini training | Future-proofing |
| `Googlebot` | Google | Traditional + AI search | Essential for SEO |

### Official Documentation URLs
- OpenAI crawlers: https://platform.openai.com/docs/bots
- Anthropic crawlers: https://privacy.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
- Perplexity crawlers: https://docs.perplexity.ai/guides/bots
- Google crawlers: https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Block all AI crawlers | Selectively allow AI search crawlers | 2024-2025 | AEO optimization requires allowing crawlers |
| Static sitemap.xml | Dynamic sitemap.ts with TypeScript | Next.js 13.3+ | Type safety, dynamic content support |
| Manual hreflang tags | `alternates.languages` in sitemap.ts | Next.js 14.2+ | Automatic xmlns handling |

**Deprecated/outdated:**
- `pages/sitemap.xml.tsx` pattern: Use App Router `app/sitemap.ts` instead
- next-sitemap package for simple sites: Native Next.js support is sufficient

## Open Questions

1. **Crawl Rate Limiting**
   - What we know: AI crawlers can be aggressive (500-1300 pages/hour)
   - What's unclear: Whether Vercel's edge network handles rate limiting automatically
   - Recommendation: Monitor analytics post-launch; add Crawl-delay if needed

2. **x-default hreflang**
   - What we know: Next.js sitemap doesn't automatically generate x-default
   - What's unclear: Whether x-default is critical for AI crawlers or primarily traditional search
   - Recommendation: Start without x-default; add via custom middleware if needed

## Sources

### Primary (HIGH confidence)
- [Next.js robots.txt Documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) - API reference, code examples (v16.1.6, updated 2026-02-11)
- [Next.js sitemap.xml Documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) - API reference, hreflang support (v16.1.6, updated 2026-02-11)
- [next-intl Server Actions, Metadata & Route Handlers](https://next-intl.dev/docs/environments/actions-metadata-route-handlers) - getPathname() for sitemaps

### Secondary (MEDIUM confidence)
- [OpenAI Crawlers Documentation](https://platform.openai.com/docs/bots) - Official GPTBot/OAI-SearchBot user-agents
- [Anthropic Privacy Center](https://privacy.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler) - ClaudeBot documentation
- [Perplexity Bots Guide](https://docs.perplexity.ai/guides/bots) - PerplexityBot documentation
- [Search Engine Journal AI Crawler List](https://www.searchenginejournal.com/ai-crawler-user-agents-list/558130/) - Comprehensive crawler reference (Dec 2025)

### Tertiary (LOW confidence)
- [ai-robots-txt GitHub](https://github.com/ai-robots-txt/ai.robots.txt/blob/main/robots.txt) - Community-maintained crawler list (may be overly comprehensive)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official Next.js documentation verified, version-specific
- Architecture: HIGH - next-intl integration pattern verified via official docs
- Pitfalls: MEDIUM - Based on documented issues and best practices; may miss edge cases

**Research date:** 2026-02-12
**Valid until:** 2026-03-15 (30 days for stable Next.js metadata API)
