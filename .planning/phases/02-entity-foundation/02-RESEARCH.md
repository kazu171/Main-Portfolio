# Phase 2: Entity Foundation - Research

**Researched:** 2026-02-12
**Domain:** JSON-LD Structured Data (Organization + Person Schema) for Bilingual Next.js Site
**Confidence:** HIGH

## Summary

Phase 2 establishes the site's entity identity for AI knowledge graphs through Organization and Person schemas. This is foundational for E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) signals that AI search engines use to evaluate content credibility. The implementation involves two primary schemas: (1) Organization schema on every page to establish consistent business identity, and (2) Person schema on the About page to establish author expertise and credentials.

For bilingual sites using next-intl, JSON-LD schemas should be generated per locale with the `inLanguage` property set appropriately. Each language version of a page gets its own schema block with localized content. The schemas are connected using `@id` references to avoid duplication and establish entity relationships (e.g., the Person is `founder` of the Organization).

Next.js 16 recommends rendering JSON-LD as a `<script type="application/ld+json">` tag in `layout.tsx` (for site-wide schemas like Organization) or `page.tsx` (for page-specific schemas like Person on About). TypeScript types from the `schema-dts` package provide compile-time validation of schema structure.

**Primary recommendation:** Use `schema-dts` for TypeScript types, inject Organization schema in `app/[locale]/layout.tsx` with locale-aware `inLanguage`, add Person schema in `app/[locale]/about/page.tsx` or a separate server component, and use `@id` references to connect entities.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | JSON-LD injection via `dangerouslySetInnerHTML` | Native pattern, no additional dependencies |
| TypeScript | 5.6.3 | Type safety for schema objects | Already in project |
| schema-dts | 1.1.5+ | TypeScript types for Schema.org vocabulary | Google-maintained, comprehensive, type-only (no runtime cost) |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next-intl | 4.8.2 | Locale detection for `inLanguage` property | Already in project; use to determine current locale |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| schema-dts | Manual type definitions | schema-dts provides complete Schema.org vocabulary with auto-complete |
| Inline schema objects | next-seo package | next-seo adds complexity; native JSON-LD is simpler for this use case |
| Single multilingual schema | Separate schemas per locale | Separate schemas per locale is recommended best practice |

**Installation:**
```bash
npm install --save-dev schema-dts
```

## Architecture Patterns

### Recommended Project Structure
```
lib/
├── schema/
│   ├── organization.ts    # Organization schema generator
│   ├── person.ts          # Person schema generator
│   └── types.ts           # Shared schema data types
app/
├── [locale]/
│   ├── layout.tsx         # Injects Organization schema (site-wide)
│   └── about/
│       └── page.tsx       # Injects Person schema (page-specific)
```

### Pattern 1: Organization Schema in Layout (Site-Wide)
**What:** Inject Organization schema in the locale layout to appear on every page
**When to use:** Always for establishing business entity identity
**Example:**
```typescript
// lib/schema/organization.ts
// Source: https://developers.google.com/search/docs/appearance/structured-data/organization
import type { Organization, WithContext } from 'schema-dts'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kazuya.work'

export function generateOrganizationSchema(locale: 'en' | 'ja'): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'Kazuya Hibara',
    alternateName: locale === 'ja' ? '日原和也' : undefined,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/opengraph.png`,
    description: locale === 'en'
      ? 'AI Marketing Engineer implementing winning formulas into 24/7 marketing systems'
      : 'AIマーケティングエンジニア - 勝ちパターンを24時間稼働するシステムに実装',
    email: 'contact@kazuya.work',
    sameAs: [
      'https://www.linkedin.com/in/kazuyahibara/',
      'https://github.com/kazuyahibara',
      // Add other verified profiles
    ],
    founder: {
      '@id': `${baseUrl}/#person`,
    },
    inLanguage: locale,
  }
}
```

### Pattern 2: Person Schema on About Page
**What:** Inject Person schema on About page to establish author expertise and E-E-A-T signals
**When to use:** On profile/about pages to establish author identity
**Example:**
```typescript
// lib/schema/person.ts
// Source: https://schema.org/Person, https://developers.google.com/search/docs/appearance/structured-data/profile-page
import type { Person, WithContext } from 'schema-dts'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kazuya.work'

export function generatePersonSchema(locale: 'en' | 'ja'): WithContext<Person> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${baseUrl}/#person`,
    name: 'Kazuya Hibara',
    alternateName: locale === 'ja' ? '日原和也' : undefined,
    url: `${baseUrl}/${locale}/about`,
    image: `${baseUrl}/profile.jpg`,
    jobTitle: locale === 'en' ? 'AI Marketing Engineer' : 'AIマーケティングエンジニア',
    description: locale === 'en'
      ? 'AI Marketing Engineer specializing in automation and marketing systems'
      : 'AIと自動化を専門とするマーケティングエンジニア',
    knowsAbout: [
      'AI Automation',
      'Marketing Systems',
      'n8n Workflows',
      'Next.js',
      'LLM Integration',
    ],
    sameAs: [
      'https://www.linkedin.com/in/kazuyahibara/',
      'https://github.com/kazuyahibara',
      // Add other verified profiles
    ],
    worksFor: {
      '@id': `${baseUrl}/#organization`,
    },
    inLanguage: locale,
  }
}
```

### Pattern 3: JSON-LD Script Injection
**What:** Secure injection of JSON-LD into page HTML
**When to use:** All JSON-LD implementations
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/guides/json-ld
interface JsonLdProps {
  data: object
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}

// Usage in layout.tsx
import { generateOrganizationSchema } from '@/lib/schema/organization'
import { JsonLd } from '@/components/json-ld'

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const organizationSchema = generateOrganizationSchema(locale as 'en' | 'ja')

  return (
    <html lang={locale}>
      <body>
        <JsonLd data={organizationSchema} />
        {children}
      </body>
    </html>
  )
}
```

### Pattern 4: @graph for Multiple Entities (Alternative)
**What:** Combine multiple entities in a single JSON-LD block using @graph
**When to use:** When multiple related entities appear on the same page
**Example:**
```typescript
// Source: https://github.com/google/schema-dts
import type { Graph } from 'schema-dts'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kazuya.work'

export function generateAboutPageGraph(locale: 'en' | 'ja'): Graph {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: 'Kazuya Hibara',
        // ... organization properties
      },
      {
        '@type': 'Person',
        '@id': `${baseUrl}/#person`,
        name: 'Kazuya Hibara',
        worksFor: { '@id': `${baseUrl}/#organization` },
        // ... person properties
      },
      {
        '@type': 'ProfilePage',
        '@id': `${baseUrl}/${locale}/about`,
        mainEntity: { '@id': `${baseUrl}/#person` },
        dateModified: new Date().toISOString(),
        inLanguage: locale,
      },
    ],
  }
}
```

### Anti-Patterns to Avoid
- **Duplicating full schema objects:** Use `@id` references instead of repeating entire Organization schema within Person
- **Inconsistent NAP data:** Organization name, address, contact must be identical across all pages
- **Mixing localized and non-localized content:** Each schema should be fully in one language
- **Missing inLanguage property:** Always include `inLanguage` for bilingual sites
- **Schema-content mismatch:** JSON-LD data must match visible page content exactly

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Schema type definitions | Manual TypeScript interfaces | `schema-dts` package | Google-maintained, complete vocabulary, auto-complete |
| JSON escaping | Manual string replacement | `.replace(/</g, '\\u003c')` pattern | XSS prevention per Next.js docs |
| Schema validation | Guessing at properties | Rich Results Test + Schema Markup Validator | Official validation catches errors |
| Entity references | Duplicating full objects | `@id` references | DRY principle, consistent entity graph |

**Key insight:** Schema.org has 800+ types with complex property relationships. Manual typing is error-prone; `schema-dts` provides compile-time validation that catches mistakes before deployment.

## Common Pitfalls

### Pitfall 1: Schema-Content Mismatch
**What goes wrong:** JSON-LD data doesn't match visible content; Google may ignore or penalize
**Why it happens:** Copying template schemas without customization, or using different data sources
**How to avoid:** Generate schemas from the same data source as visible content; verify in Rich Results Test
**Warning signs:** Rich Results Test warnings about mismatched data

### Pitfall 2: Inconsistent Organization Data Across Pages
**What goes wrong:** Different pages show different Organization details (logo size, contact info)
**Why it happens:** Schemas added at different times with slightly different values
**How to avoid:** Single source of truth in `lib/schema/organization.ts`; inject from layout, not per-page
**Warning signs:** Validation tools show different Organization entities on different pages

### Pitfall 3: Missing inLanguage for Bilingual Sites
**What goes wrong:** Search engines confused about content language; wrong language appears in results
**Why it happens:** Treating JSON-LD as static without locale awareness
**How to avoid:** Pass locale to schema generators; set `inLanguage` explicitly
**Warning signs:** Japanese content appearing for English queries or vice versa

### Pitfall 4: Breaking @id References
**What goes wrong:** Entity graph disconnected; search engines can't link Person to Organization
**Why it happens:** Inconsistent URL fragments or missing @id properties
**How to avoid:** Use consistent `@id` patterns (`${baseUrl}/#organization`, `${baseUrl}/#person`)
**Warning signs:** Rich Results Test shows unconnected entities

### Pitfall 5: Blocking Logo/Image Access
**What goes wrong:** Organization logo doesn't appear in Knowledge Panel
**Why it happens:** robots.txt blocks image URLs or images are external URLs that need authentication
**How to avoid:** Verify logo URL is publicly accessible (minimum 112x112px); test in Rich Results Test
**Warning signs:** "Logo could not be fetched" errors in validation

### Pitfall 6: XSS Vulnerability in JSON-LD
**What goes wrong:** Malicious content injected via schema data
**Why it happens:** Using `JSON.stringify` without sanitization
**How to avoid:** Always replace `<` with `\u003c`: `JSON.stringify(data).replace(/</g, '\\u003c')`
**Warning signs:** Security audit findings

## Code Examples

Verified patterns from official sources:

### Complete Organization Schema for Bilingual Site
```typescript
// lib/schema/organization.ts
// Source: https://developers.google.com/search/docs/appearance/structured-data/organization
import type { Organization, WithContext } from 'schema-dts'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kazuya.work'

interface OrganizationData {
  name: string
  alternateName?: string
  description: string
  email: string
  logo: string
  sameAs: string[]
}

const organizationData: Record<'en' | 'ja', OrganizationData> = {
  en: {
    name: 'Kazuya Hibara',
    description: 'AI Marketing Engineer implementing winning formulas into 24/7 marketing systems',
    email: 'contact@kazuya.work',
    logo: `${baseUrl}/logo.png`,
    sameAs: [
      'https://www.linkedin.com/in/kazuyahibara/',
      'https://github.com/kazuyahibara',
    ],
  },
  ja: {
    name: 'Kazuya Hibara',
    alternateName: '日原和也',
    description: 'AIマーケティングエンジニア - 勝ちパターンを24時間稼働するシステムに実装',
    email: 'contact@kazuya.work',
    logo: `${baseUrl}/logo.png`,
    sameAs: [
      'https://www.linkedin.com/in/kazuyahibara/',
      'https://github.com/kazuyahibara',
    ],
  },
}

export function generateOrganizationSchema(locale: 'en' | 'ja'): WithContext<Organization> {
  const data = organizationData[locale]

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: data.name,
    alternateName: data.alternateName,
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: data.logo,
      width: '512',
      height: '512',
    },
    description: data.description,
    email: data.email,
    sameAs: data.sameAs,
    founder: {
      '@id': `${baseUrl}/#person`,
    },
    inLanguage: locale,
  }
}
```

### Complete Person Schema for About Page
```typescript
// lib/schema/person.ts
// Source: https://schema.org/Person
import type { Person, WithContext } from 'schema-dts'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kazuya.work'

interface PersonData {
  name: string
  alternateName?: string
  jobTitle: string
  description: string
  knowsAbout: string[]
  sameAs: string[]
}

const personData: Record<'en' | 'ja', PersonData> = {
  en: {
    name: 'Kazuya Hibara',
    jobTitle: 'AI Marketing Engineer',
    description: 'AI Marketing Engineer specializing in automation and marketing systems for solopreneurs and small businesses',
    knowsAbout: [
      'AI Automation',
      'Marketing Systems',
      'n8n Workflows',
      'Next.js Development',
      'LLM Integration',
      'Business Process Automation',
    ],
    sameAs: [
      'https://www.linkedin.com/in/kazuyahibara/',
      'https://github.com/kazuyahibara',
    ],
  },
  ja: {
    name: 'Kazuya Hibara',
    alternateName: '日原和也',
    jobTitle: 'AIマーケティングエンジニア',
    description: '個人事業主やスモールビジネス向けのAI自動化とマーケティングシステムを専門とするエンジニア',
    knowsAbout: [
      'AI自動化',
      'マーケティングシステム',
      'n8nワークフロー',
      'Next.js開発',
      'LLM統合',
      'ビジネスプロセス自動化',
    ],
    sameAs: [
      'https://www.linkedin.com/in/kazuyahibara/',
      'https://github.com/kazuyahibara',
    ],
  },
}

export function generatePersonSchema(locale: 'en' | 'ja'): WithContext<Person> {
  const data = personData[locale]

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${baseUrl}/#person`,
    name: data.name,
    alternateName: data.alternateName,
    url: `${baseUrl}/${locale}/about`,
    image: `${baseUrl}/profile.jpg`,
    jobTitle: data.jobTitle,
    description: data.description,
    knowsAbout: data.knowsAbout,
    sameAs: data.sameAs,
    worksFor: {
      '@id': `${baseUrl}/#organization`,
    },
    inLanguage: locale,
  }
}
```

### JSON-LD Component with XSS Protection
```typescript
// components/json-ld.tsx
// Source: https://nextjs.org/docs/app/guides/json-ld

interface JsonLdProps {
  data: object
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // Replace < with unicode to prevent XSS
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}
```

### Layout Integration Example
```typescript
// app/[locale]/layout.tsx
import { generateOrganizationSchema } from '@/lib/schema/organization'
import { JsonLd } from '@/components/json-ld'

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const organizationSchema = generateOrganizationSchema(locale as 'en' | 'ja')

  return (
    <html lang={locale}>
      <body>
        <JsonLd data={organizationSchema} />
        {/* rest of layout */}
        {children}
      </body>
    </html>
  )
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Microdata in HTML attributes | JSON-LD in script tags | ~2020 | Cleaner separation, easier maintenance |
| Manual schema typing | schema-dts TypeScript types | 2021 (v1.0) | Compile-time validation, auto-complete |
| Single schema for all languages | Separate schema per locale with inLanguage | 2024-2025 | Better AI/search engine language understanding |
| Inline duplicate schemas | @id references between entities | Current | DRY, connected entity graph |

**Deprecated/outdated:**
- Microdata format: Use JSON-LD instead
- RDFa format: Use JSON-LD instead
- Placing JSON-LD in head-only: Next.js allows body placement; both are valid

## Open Questions

1. **Logo Size Requirements**
   - What we know: Google requires minimum 112x112px for Organization logo
   - What's unclear: Whether the project has a suitable logo image at this size
   - Recommendation: Verify `/public/logo.png` exists and meets size requirements; create if needed

2. **sameAs URL Verification**
   - What we know: LinkedIn, GitHub, and other profile URLs should be in sameAs
   - What's unclear: The actual profile URLs for this individual/business
   - Recommendation: Collect verified profile URLs before implementation

3. **ProfilePage vs Direct Person Schema**
   - What we know: Google supports ProfilePage wrapper for Person on profile pages
   - What's unclear: Whether ProfilePage adds SEO value over direct Person schema
   - Recommendation: Start with direct Person schema; add ProfilePage wrapper if needed

## Sources

### Primary (HIGH confidence)
- [Next.js JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld) - Official implementation pattern (v16.1.6, updated 2026-02-11)
- [Google Organization Schema Documentation](https://developers.google.com/search/docs/appearance/structured-data/organization) - Required/recommended properties
- [Google ProfilePage Documentation](https://developers.google.com/search/docs/appearance/structured-data/profile-page) - Person schema for profiles
- [schema-dts GitHub](https://github.com/google/schema-dts) - Google-maintained TypeScript types
- [Schema.org Person Type](https://schema.org/Person) - Complete property reference

### Secondary (MEDIUM confidence)
- [Linguise Multilingual Schema Guide](https://www.linguise.com/blog/guide/using-schema-markup-and-structured-data-for-multilingual-websites-seo/) - inLanguage best practices
- [sameAs Schema for E-E-A-T](https://weekendgrowth.com/sameas-schema/) - sameAs property guidance
- [nystudio107 JSON-LD Examples](https://nystudio107.com/blog/annotated-json-ld-structured-data-examples) - @id reference patterns

### Tertiary (LOW confidence)
- Community patterns for @graph usage (needs validation with Rich Results Test)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official Next.js docs + Google-maintained schema-dts
- Architecture: HIGH - Patterns verified from multiple authoritative sources
- Pitfalls: MEDIUM - Based on documented issues and community experience; may miss edge cases

**Research date:** 2026-02-12
**Valid until:** 2026-03-15 (30 days - Schema.org vocabulary and Next.js patterns are stable)
