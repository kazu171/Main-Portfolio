# Phase 3: Content Structure - Research

**Researched:** 2026-02-12
**Domain:** AEO/GEO content structure optimization for AI search visibility
**Confidence:** HIGH

## Summary

Phase 3 focuses on restructuring existing content for optimal AI extraction and citation. The research confirms that AI search engines (ChatGPT, Perplexity, Google AI Overviews) have specific content structure preferences that differ from traditional SEO: direct answers in the first 40-60 words, short self-contained paragraphs (2-3 sentences), strict heading hierarchy (H1 > H2 > H3 without skipping), and visible freshness signals (dateModified display).

The current codebase has well-structured pages but lacks: (1) direct answer patterns in opening paragraphs, (2) consistent heading hierarchy audit, (3) paragraph length optimization, and (4) datePublished/dateModified fields and UI display. All content types (WorkflowArticle, CaseStudyArticle) need schema extension to include date fields, and article pages need a new component to display update dates.

**Primary recommendation:** Implement a systematic content restructuring with direct answer patterns at page/section starts, heading hierarchy audit and fix, paragraph chunking for AI extraction, and a reusable LastUpdated component for all article pages.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next-intl | (existing) | Date formatting with locale support | Already in project; provides `useFormatter()` hook for bilingual date display |
| React/Next.js | 16.1.6 | Page components and content rendering | Existing stack |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| date-fns | 3.x (optional) | ISO date parsing if needed beyond next-intl | Only if `useFormatter` proves insufficient |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| next-intl `useFormatter()` | date-fns + manual locale handling | date-fns adds dependency; next-intl already handles locale automatically |
| Static TypeScript dates | CMS with auto-modified timestamps | Over-engineering for static content; manual update is fine |

**Installation:**
No new dependencies required. Use existing next-intl.

## Architecture Patterns

### Recommended Content Structure

```
Page/Article Structure:
├── H1 (title) — one per page
├── Direct Answer Paragraph — 40-60 words, standalone, answering the implied question
├── H2 (section) — primary sections
│   ├── Direct Answer — first 2 sentences answer the section topic
│   ├── Supporting Content — short paragraphs (2-3 sentences each)
│   └── H3 (subsection) — if needed
│       ├── Direct Answer
│       └── Supporting Content
└── Last Updated Display — visible dateModified
```

### Pattern 1: Direct Answer First
**What:** Every page and major section starts with a direct, complete answer in 40-60 words that works as a standalone excerpt.
**When to use:** All pages, all H2 section openings.
**Example:**
```typescript
// Instead of:
const intro = "In today's evolving digital landscape, automation has become...";

// Use:
const intro = "I help solopreneurs automate their winning business patterns with n8n and AI. My systems reduce manual work by 60+ hours monthly while keeping you in control of strategy and customer relationships.";
// (49 words, standalone, directly answers "What do you do?")
```

### Pattern 2: Self-Contained Paragraphs
**What:** Each paragraph expresses one complete idea in 2-3 sentences (under 120 words) that makes sense without surrounding context.
**When to use:** All body content.
**Example:**
```typescript
// Instead of long narrative paragraphs:
const longParagraph = "When we first started working together, Mai was spending 2 hours every morning creating posts for Instagram, Twitter, and LINE — often at the expense of product development. The blog had been abandoned months ago. Worst of all, there was no system to bring customers back after their first purchase. This was causing significant revenue leakage and Mai felt overwhelmed trying to manage everything manually while also developing new products...";

// Break into self-contained chunks:
const chunk1 = "Mai spent 2 hours daily creating posts for Instagram, Twitter, and LINE. This manual social media work was consuming time that should have gone to product development.";
const chunk2 = "The blog had been abandoned for months. Without consistent content, organic search traffic had dropped to near zero.";
const chunk3 = "No follow-up system existed after first purchases. Customers were not returning, causing significant revenue leakage.";
```

### Pattern 3: Heading Hierarchy Enforcement
**What:** Strict H1 > H2 > H3 without skipping levels.
**When to use:** All pages.
**Example:**
```tsx
// Correct hierarchy:
<h1>Marketing Ops & Automation</h1>         // Page title
  <h2>Three Solutions</h2>                   // Major section
    <h3>Category A: Front-Office</h3>        // Subsection within Solutions
    <h3>Category B: Back-Office</h3>
  <h2>The Transformation</h2>                // Another major section
  <h2>Ready to Automate?</h2>                // CTA section

// Incorrect - skipping levels:
<h1>Marketing Ops</h1>
  <h3>Front-Office</h3>  // Wrong: H3 without H2 parent
```

### Pattern 4: Last Updated Component
**What:** Reusable component showing dateModified with bilingual support.
**When to use:** All article pages (workflows, case studies).
**Example:**
```tsx
// components/ui/last-updated.tsx
'use client';

import { useFormatter } from 'next-intl';

interface LastUpdatedProps {
  date: string; // ISO 8601 format: "2026-02-12"
  locale: 'en' | 'ja';
}

export function LastUpdated({ date, locale }: LastUpdatedProps) {
  const format = useFormatter();
  const dateObj = new Date(date);

  const label = locale === 'en' ? 'Last updated' : '最終更新';
  const formattedDate = format.dateTime(dateObj, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <time
      dateTime={date}
      className="text-sm text-muted-foreground font-medium"
    >
      {label}: {formattedDate}
    </time>
  );
}
```

### Anti-Patterns to Avoid
- **Burying the answer:** Starting with "In today's evolving landscape..." instead of direct answers
- **Skipping heading levels:** Going from H1 directly to H3
- **Wall-of-text paragraphs:** Paragraphs exceeding 4 lines / 120 words
- **Relative dates in content:** Using "recently" or "last month" instead of specific dates
- **Missing dateModified:** Having no visible freshness signal on article pages

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Date formatting with locale | Manual string formatting | next-intl `useFormatter()` | Handles en/ja automatically, avoids hydration issues |
| Heading hierarchy validation | Manual code review | Linter rule or test | Scalable, catches issues in CI |
| Paragraph length checking | Manual review | Word count utility function | Consistent enforcement |

**Key insight:** Content structure optimization is primarily a content editing task, not a technical implementation task. The code changes are minimal (add date fields, create LastUpdated component, audit headings). The bulk of work is systematically editing existing content.

## Common Pitfalls

### Pitfall 1: Hydration Mismatch on Dates
**What goes wrong:** Server renders date differently than client due to timezone differences.
**Why it happens:** Date objects serialize differently between server/client.
**How to avoid:** Use ISO string format in data, format only at render time with consistent options.
**Warning signs:** Console warning about hydration mismatch on date elements.

### Pitfall 2: Over-Aggressive Paragraph Splitting
**What goes wrong:** Content becomes choppy and loses narrative flow.
**Why it happens:** Following "2-3 sentence" rule too rigidly.
**How to avoid:** Prioritize self-containment over strict sentence count. A 4-sentence paragraph that forms one coherent idea is better than two disconnected 2-sentence chunks.
**Warning signs:** Reading the content feels like bullet points, not prose.

### Pitfall 3: Direct Answers That Don't Answer
**What goes wrong:** First paragraph restates the question instead of answering it.
**Why it happens:** Habit of building up to an answer rather than leading with it.
**How to avoid:** Test: "Can someone read just this paragraph and walk away with useful information?"
**Warning signs:** First paragraph contains phrases like "Let me explain..." or "There are several factors to consider..."

### Pitfall 4: Heading-Level Drift in Components
**What goes wrong:** Component uses H2 internally but is placed inside an H2 section, breaking hierarchy.
**Why it happens:** Components are built in isolation without context.
**How to avoid:** Design heading components to accept level prop, or use semantic elements like `<section>` with aria-labelledby.
**Warning signs:** Browser accessibility tools showing heading hierarchy errors.

### Pitfall 5: Forgetting Bilingual Content Updates
**What goes wrong:** English content is updated but Japanese version is stale.
**Why it happens:** Both translations are in same file; easy to update one and miss the other.
**How to avoid:** Always update both `en` and `ja` versions in same commit. Consider a checklist in PR template.
**Warning signs:** Translation date mismatch, inconsistent information between locales.

## Code Examples

Verified patterns from research:

### Direct Answer Pattern Implementation
```typescript
// lib/content/workflows.ts - Updated structure
export interface WorkflowArticle {
  slug: string;
  category: 'workflow';
  enabled?: boolean;
  solutionCategory: SolutionCategory;
  titleEn: string;
  titleJa: string;
  // NEW: Direct answer fields (40-60 words each)
  directAnswerEn: string;  // Standalone answer to "What is this workflow?"
  directAnswerJa: string;
  descriptionEn: string;
  descriptionJa: string;
  techStack: string[];
  heroImage: string;
  // NEW: Date fields
  datePublished: string;  // ISO 8601: "2026-01-15"
  dateModified: string;   // ISO 8601: "2026-02-12"
  sections: {
    // ... existing sections
  };
}

// Example direct answer:
directAnswerEn: "This workflow automatically generates platform-optimized social media posts from a single topic. It creates Twitter threads, Instagram captions, and LinkedIn articles, reducing content creation from 2 hours daily to 15 minutes.",
// 40 words, answers "What does this do?" directly
```

### Heading Hierarchy Audit Utility
```typescript
// lib/utils/heading-audit.ts
export function auditHeadingHierarchy(headings: { level: number; text: string }[]): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  let lastLevel = 0;
  let h1Count = 0;

  for (const heading of headings) {
    // Check for single H1
    if (heading.level === 1) {
      h1Count++;
      if (h1Count > 1) {
        errors.push(`Multiple H1 found: "${heading.text}"`);
      }
    }

    // Check for skipped levels
    if (lastLevel > 0 && heading.level > lastLevel + 1) {
      errors.push(`Skipped heading level: H${lastLevel} to H${heading.level} at "${heading.text}"`);
    }

    lastLevel = heading.level;
  }

  if (h1Count === 0) {
    errors.push('No H1 found on page');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
```

### Paragraph Length Checker
```typescript
// lib/utils/content-audit.ts
export function checkParagraphLength(text: string, maxWords: number = 120): {
  withinLimit: boolean;
  wordCount: number;
  suggestion?: string;
} {
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;

  if (wordCount <= maxWords) {
    return { withinLimit: true, wordCount };
  }

  return {
    withinLimit: false,
    wordCount,
    suggestion: `Paragraph has ${wordCount} words. Consider splitting into ${Math.ceil(wordCount / 60)} shorter paragraphs.`,
  };
}

// For AI extraction optimization, also check if paragraph is self-contained
export function isSelfContained(paragraph: string): boolean {
  const vagueReferences = [
    /^(this|that|these|those|it) (is|are|was|were)/i,
    /as mentioned (above|earlier|previously)/i,
    /see (above|below)/i,
  ];

  return !vagueReferences.some(pattern => pattern.test(paragraph));
}
```

### Updated Article Page with Date Display
```tsx
// app/[locale]/cases/[slug]/page.tsx - Key changes
import { LastUpdated } from '@/components/ui/last-updated';

function WorkflowDetail({ article, locale, t }) {
  return (
    <>
      {/* Badges */}
      <div className="flex flex-wrap gap-3 justify-center">
        {/* ... existing badges ... */}
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-[900]">
        {locale === 'en' ? article.titleEn : article.titleJa}
      </h1>

      {/* NEW: Direct Answer (first content, before description) */}
      <p className="text-lg md:text-xl text-foreground font-medium leading-relaxed max-w-3xl mx-auto text-center">
        {locale === 'en' ? article.directAnswerEn : article.directAnswerJa}
      </p>

      {/* NEW: Last Updated Display */}
      <div className="flex justify-center">
        <LastUpdated date={article.dateModified} locale={locale} />
      </div>

      {/* Tech Stack */}
      {/* ... rest of component ... */}
    </>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Long-form narrative openings | Direct answer in first 40-60 words | 2024-2025 (GEO research) | 3.2x more AI citations |
| SEO keyword density focus | Self-contained extractable paragraphs | 2024-2025 (AI search rise) | Better AI extraction |
| Meta-only date display | Visible UI date display | 2025 (Perplexity prioritization) | 40% weight in Perplexity ranking |
| Single datePublished | Both datePublished + dateModified | 2025-2026 | Freshness signals critical |

**Deprecated/outdated:**
- **Keyword stuffing in headings:** AI systems understand semantic meaning; natural headings outperform keyword-stuffed ones
- **Long-form SEO content (2000+ words):** AI extracts specific passages; shorter, focused content often performs better
- **Hidden meta dates:** Perplexity weights visible dateModified heavily; schema-only dates insufficient

## Open Questions

1. **Static vs Dynamic Dates**
   - What we know: Static TypeScript content requires manual date updates
   - What's unclear: Should dateModified auto-update on any edit, or only "substantial" edits?
   - Recommendation: Manual dateModified updates for substantial changes only (new sections, major revisions). Document policy in content guidelines.

2. **Direct Answer for Non-Article Pages**
   - What we know: Article pages clearly need direct answers
   - What's unclear: Do static pages (About, Contact, Process) need formal direct answer optimization?
   - Recommendation: Yes, but lighter touch. Ensure first paragraph of each page directly states its purpose.

3. **Paragraph Length in Narrative Content**
   - What we know: 2-3 sentences / 120 words is the target
   - What's unclear: Case study narratives are story-driven; overly choppy feels unnatural
   - Recommendation: Allow 4-sentence paragraphs in narratives if they form one cohesive scene. Prioritize self-containment over strict line count.

## Sources

### Primary (HIGH confidence)
- [Search Engine Land: GEO Content Structure](https://searchengineland.com/what-is-generative-engine-optimization-geo-444418) - Self-contained paragraphs, front-loading key information
- [Yoast: Heading Structure Best Practices](https://yoast.com/how-to-use-headings-on-your-site/) - Single H1, no skipped levels, AI optimization
- [Search Engine Land: Answer-First Content](https://searchengineland.com/guide/how-to-create-answer-first-content) - Direct answer patterns, paragraph structure
- [next-intl: Date Formatting](https://next-intl.dev/docs/usage/dates-times) - useFormatter() for bilingual date display

### Secondary (MEDIUM confidence)
- [CXL: AEO Comprehensive Guide 2026](https://cxl.com/blog/answer-engine-optimization-aeo-the-comprehensive-guide/) - 40-60 word direct answers
- [LLMrefs: GEO 2026 Guide](https://llmrefs.com/generative-engine-optimization) - Paragraph length, AI extraction patterns
- [Perplexity AI Ranking Factors](https://metehan.ai/blog/perplexity-ai-seo-59-ranking-patterns/) - Freshness weighting (40%), dateModified importance
- [Search Engine Land: Byline Dates](https://searchengineland.com/guide/byline-dates) - datePublished vs dateModified best practices

### Tertiary (LOW confidence)
- Various SEO blog posts on 2026 AEO trends (need validation with official sources)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Using existing next-intl, no new dependencies needed
- Architecture patterns: HIGH - Verified against multiple authoritative sources
- Pitfalls: MEDIUM - Based on general React/Next.js patterns and AEO research

**Research date:** 2026-02-12
**Valid until:** 2026-03-15 (30 days - AEO/GEO best practices evolving but stable patterns established)
