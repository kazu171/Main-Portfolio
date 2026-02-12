# Project Research Summary

**Project:** AEO/GEO Optimization for Next.js Portfolio
**Domain:** AI Search Optimization (Answer Engine Optimization / Generative Engine Optimization)
**Researched:** 2026-02-12
**Confidence:** HIGH

## Executive Summary

This project implements AEO/GEO optimization to make the portfolio visible in AI search results (ChatGPT, Perplexity, Google AI Overviews). The research reveals this is primarily a content architecture and structured data challenge rather than a technology adoption problem. Next.js 16 already provides all necessary technical capabilities natively.

The recommended approach focuses on three pillars: (1) JSON-LD structured data implementation using Schema.org types (FAQPage, Article, HowTo, Person, Organization), (2) content restructuring following entity-based optimization patterns with citations and statistics, and (3) platform-agnostic optimization that works across all major AI engines. The existing Next.js 16.1.6 + next-intl 4.8.2 stack requires zero new dependencies beyond an optional TypeScript typing library.

Key risks center on content quality rather than technical implementation. The critical pitfall is keyword stuffing (proven to decrease AI visibility by 30%+), which conflicts with traditional SEO instincts. Success depends on entity-focused content with citations (30-40% visibility boost), natural language, and proper schema validation. The project has a clear MVP path: implement structural schemas first (week 1), then enhance content progressively (weeks 2-4).

## Key Findings

### Recommended Stack

Next.js 16 native features eliminate the need for external SEO libraries. The recommended stack uses built-in App Router capabilities for all AEO/GEO requirements.

**Core technologies:**
- **Next.js 16.1.6**: Native sitemap.ts, robots.ts, generateMetadata — no external packages needed for SEO infrastructure
- **next-intl 4.8.2**: Already handles locale routing; sitemap alternates integrate naturally for bilingual schema
- **TypeScript 5.6.3**: Enables type-safe JSON-LD with optional schema-dts library

**Optional addition:**
- **schema-dts 1.1.5**: TypeScript types for Schema.org (dev dependency only, zero runtime cost)

**What NOT to use:**
- next-seo: Designed for Pages Router, adds unnecessary abstraction over native App Router APIs
- react-schemaorg: Adds React component overhead; direct script tag is Next.js recommended pattern
- next-sitemap: Next.js 15+ has native sitemap support with full i18n alternates

The implementation pattern uses direct `<script type="application/ld+json">` injection in Server Components, which is the Next.js official recommendation. All schema generation happens server-side for optimal crawlability.

### Expected Features

Research identifies a clear tier structure based on AI search visibility impact and implementation complexity.

**Must have (table stakes - MVP):**
- **FAQPage Schema**: 3.2x more likely to appear in AI Overviews (highest ROI)
- **Article Schema with Author**: E-E-AT signal for content credibility
- **Organization + Person Schema**: Entity establishment for brand recognition
- **50-word Direct Answers**: AI extracts first paragraph for responses
- **dateModified Display**: Perplexity cites 76.4% of pages updated within 30 days
- **Clear Heading Hierarchy**: AI parses structure for context extraction

**Should have (competitive advantage - v1.x):**
- **Inline Citations (5-7 per 1000 words)**: 30-40% visibility boost (Princeton research)
- **Statistics with Sources**: 30-40% visibility boost, concrete data preferred
- **Expert Quotations**: 30-40% visibility boost, authority signal
- **HowTo Schema**: Matches "how to" query patterns directly
- **Bilingual Schema**: Dual language JSON-LD for en/ja markets

**Defer (v2+ - platform expansion):**
- **YouTube Video Integration**: Google AI Overviews cites YouTube 18.8%, but high creation cost
- **LinkedIn Article Mirroring**: B2B lead channel, requires external platform presence
- **Knowledge Graph Registration**: Only valuable at brand search volume scale
- **Platform-Specific Content Variants**: 3x content creation effort, only justified by traffic analysis

**Anti-features (avoid):**
- Keyword stuffing: Princeton research proves it decreases AI visibility
- Generic testimonials: No E-E-AT value without specifics and metrics
- Auto-generated FAQ: Lacks expertise signal
- Real-time everything: Creates crawler inconsistency

### Architecture Approach

The architecture separates content data, schema generation, and presentation into distinct layers. Content stays in static TypeScript files (lib/content/) extended with AEO metadata (citations, FAQ, statistics). Pure functions in lib/schema/generators/ transform content to Schema.org JSON-LD. Server Components inject schemas via a reusable JsonLd component.

**Major components:**
1. **Content Layer** (lib/content/aeo/) — Extended article types with citations, statistics, FAQ data
2. **Schema Layer** (lib/schema/generators/) — Pure functions generating Schema.org JSON-LD (faq-page.ts, article.ts, how-to.ts, person.ts, organization.ts)
3. **Component Layer** (components/seo/) — JsonLd injection component, visual FAQ with dual rendering (visible + schema)
4. **Page Layer** (app/[locale]/) — Server Components with generateMetadata + schema injection

**Critical pattern:** FAQ component renders both visible accordion UI and FAQPage schema from single data source, ensuring content-schema match (Google penalizes mismatches).

**Data flow:** Content object → Schema generator function → JSON-LD object → JsonLd component → `<script>` tag in HTML → AI crawler ingestion.

### Critical Pitfalls

Research identified 8 major pitfalls with varying severity. The top 5 requiring immediate prevention:

1. **Keyword Stuffing** — Traditional SEO tactics actively hurt AI visibility. Princeton research confirms it's the only GEO technique with negative impact. **Prevention:** Focus on entity-based content, natural language variation, comprehensive topic coverage. Apply in Phase 1.

2. **Blocking AI Crawlers** — Cloudflare and CDN defaults recently changed to block AI bots. Sites become invisible despite quality content. **Prevention:** Audit robots.txt and CDN firewall rules, explicitly allow GPTBot, PerplexityBot, ClaudeBot. Verify before any content work (Phase 1).

3. **Schema Markup Mismatch** — FAQPage schema without actual FAQ content destroys trust. **Prevention:** Validate every schema with Rich Results Test, ensure visible content matches structured data. Critical validation step in Phase 2.

4. **Burying Key Information** — Placing answers in paragraph 5 instead of first 50 words means AI won't extract it. **Prevention:** Lead with direct answers, make sections self-contained, use Answer Box structure. Apply in Phase 1 content restructuring.

5. **Unsourced Claims** — "Marketing automation increases efficiency" without citation has zero credibility. **Prevention:** 5-7 citations per 1000 words, source all statistics with year, prefer primary sources. Apply in Phase 1 to all 15 articles.

**Additional critical pitfalls:**
- **Platform Tunnel Vision**: Only 11% URL overlap between ChatGPT/Perplexity/Google — must optimize cross-platform
- **Ignoring Content Freshness**: Perplexity heavily favors recent updates (76.4% cited pages updated within 30 days)
- **Missing Entity Consistency**: Inconsistent NAP (Name/Address/Phone) across platforms reduces trust scores

## Implications for Roadmap

Based on research, suggested 4-phase structure balancing quick wins with sustainable quality:

### Phase 1: Foundation + Content Restructuring (Week 1)
**Rationale:** Schema infrastructure and content patterns must be established before enhancement work. This phase delivers immediate visibility improvements through structural changes that apply site-wide.

**Delivers:**
- Organization + Person schemas (global entity establishment)
- Article schema template for all content
- FAQPage schema on key service pages
- 50-word direct answer pattern implemented
- Verified AI crawler access (robots.txt + CDN audit)

**Technical stack:** Native Next.js features only (sitemap.ts, robots.ts, generateMetadata)

**Addresses features:** FAQPage schema, Organization schema, Person schema, direct answers, dateModified display

**Avoids pitfalls:** Blocking AI crawlers (verification step), burying key information (content restructuring), keyword stuffing (entity-based approach from start)

**Research needs:** Standard patterns (skip research-phase) — Next.js App Router + Schema.org are well-documented

### Phase 2: Content Enhancement - Citations & E-E-AT (Weeks 2-3)
**Rationale:** With schema foundation working, enhance content quality with high-impact GEO techniques (30-40% visibility boost per Princeton research). This phase requires manual content editing but dramatically improves citation probability.

**Delivers:**
- 5-7 citations per article added to 12 workflow articles + 3 case studies
- Statistics with sources and years
- Expert quotations with attribution
- AuthorCard component for E-E-AT display
- Cross-platform entity consistency audit

**Addresses features:** Inline citations, statistics addition, expert quotations, case study metrics

**Avoids pitfalls:** Unsourced claims, entity inconsistency, platform tunnel vision (test across ChatGPT/Perplexity/Google)

**Research needs:** Minimal — citation formats and expert sourcing are standard practices

### Phase 3: Advanced Schema - HowTo & Platform Testing (Week 3)
**Rationale:** With base schemas and content quality established, add specialized schemas for workflow content and validate cross-platform visibility. HowTo schema directly matches query patterns for tutorial content.

**Delivers:**
- HowTo schema for 12 workflow articles (step-by-step structure)
- Enhanced FAQ sections on service pages
- Cross-platform visibility testing (ChatGPT, Perplexity, Google AI Overviews)
- Bilingual schema validation (en/ja with hreflang)

**Addresses features:** HowTo schema, bilingual structured data, platform-specific considerations

**Avoids pitfalls:** Schema mismatch (comprehensive validation), platform tunnel vision (systematic testing)

**Research needs:** Low — HowTo schema patterns are documented in existing skill

### Phase 4: Maintenance & Freshness Protocol (Ongoing)
**Rationale:** Perplexity favors fresh content (76.4% of cited pages updated within 30 days). Establish sustainable update cycle to maintain visibility over time.

**Delivers:**
- Monthly content review calendar
- Statistics refresh protocol (annual minimum)
- dateModified tracking system
- Quarterly entity consistency audit
- Visibility monitoring across platforms

**Addresses features:** Content freshness signals, dateModified updates

**Avoids pitfalls:** Stale content (Perplexity invisibility)

**Research needs:** None — maintenance processes are project-specific

### Phase Ordering Rationale

**Why Phase 1 first:** Schema infrastructure and crawler access are prerequisites for any content work. No point optimizing content if AI can't access it or parse it structurally. The 50-word direct answer pattern establishes content structure that subsequent phases build upon.

**Why Phase 2 before Phase 3:** Citations and E-E-AT signals (30-40% impact) are higher ROI than specialized schemas. Content quality improvements work across all AI platforms, while HowTo schema is query-pattern specific. Build credibility foundation before specialization.

**Why Phase 3 before Phase 4:** HowTo implementation provides baseline visibility to monitor in Phase 4. Need working schemas before establishing maintenance protocols. Platform testing in Phase 3 informs what metrics to track in Phase 4.

**Why Phase 4 ongoing:** Freshness is continuous, not one-time. Start maintenance cycle after initial implementation completes.

### Research Flags

**Phases with standard patterns (skip research-phase):**
- **Phase 1:** Next.js App Router patterns well-documented, Schema.org types standardized
- **Phase 2:** Citation and E-E-AT practices are established content quality techniques
- **Phase 3:** HowTo schema documented in existing AEO/GEO skill
- **Phase 4:** Maintenance workflows are project-specific, no external research needed

**No phases require /gsd:research-phase** — This domain is well-covered by existing skill knowledge and official documentation.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Next.js 16.1.6 official docs verified; all features native |
| Features | HIGH | Princeton GEO Study quantifies impact; existing skill validated |
| Architecture | HIGH | Based on Next.js official patterns + Schema.org standards |
| Pitfalls | MEDIUM-HIGH | Multiple sources + skill knowledge, but evolving domain |

**Overall confidence:** HIGH

Research is backed by academic study (Princeton GEO 2023), existing comprehensive skill documentation (aeo-geo-optimizer), and official Next.js/Schema.org documentation. The only uncertainty is AI platform algorithm changes, which is inherent to the domain.

### Gaps to Address

**During planning:**
- **Exact citation format:** Decide footnote-style vs inline links vs reference section (test UX)
- **FAQ question sources:** Research actual user questions vs inferring from content (validate assumptions)
- **Update frequency:** Determine realistic monthly content review scope based on team capacity

**During execution:**
- **Schema validation workflow:** Establish process for testing each page with Rich Results Test
- **Platform visibility tracking:** Define baseline metrics before optimization to measure impact
- **Bilingual content sync:** Ensure en/ja schema updates happen together (avoid drift)

**Not critical for MVP:**
- YouTube/LinkedIn integration: Defer until Phase 2+ traffic justifies effort
- Knowledge Graph presence: Only relevant at brand search volume scale
- Platform-specific variants: Requires significant traffic data to justify 3x content creation

## Sources

### Primary (HIGH confidence)
- Princeton GEO Study (2023): [Generative Engine Optimization](https://arxiv.org/pdf/2311.09735) — Quantified 9 optimization techniques
- Next.js 16.1.6 Official Documentation: JSON-LD, sitemap.ts, robots.ts, generateMetadata — All native features verified
- Schema.org Official Documentation: FAQPage, Article, HowTo, Person, Organization schemas
- Internal AEO/GEO Optimizer Skill: `~/.claude/skills/aeo-geo-optimizer/` — Comprehensive implementation guides (GEO_TECHNIQUES.md, SCHEMA_MARKUP.md, EEAT_ENTITY.md, PLATFORM_STRATEGIES.md)

### Secondary (MEDIUM confidence)
- CXL AEO Guide: Best practices and common mistakes patterns
- Averi Platform-Specific GEO Guide: 11% URL overlap statistic between platforms
- BrightEdge/Gartner: 25% organic search shift to AI chatbots by 2026 trend
- 2025 FAQ Schema Study: 3.2x AI Overview visibility boost

### Statistics Referenced
- FAQPage AI Overview visibility: 3.2x increase (2025 study)
- High-impact GEO techniques: 30-40% visibility boost (citations, statistics, expert quotes - Princeton)
- Perplexity fresh content preference: 76.4% cited pages updated within 30 days
- Platform source overlap: 11% between ChatGPT/Perplexity/Google (Averi)
- Wikipedia in ChatGPT citations: 47.9%
- YouTube in Google AI Overviews: 18.8%

---
*Research completed: 2026-02-12*
*Ready for roadmap: yes*
