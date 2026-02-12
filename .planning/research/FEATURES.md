# Feature Research: AEO/GEO Optimization

**Domain:** AI Search Optimization for Portfolio Site
**Researched:** 2026-02-12
**Confidence:** HIGH (Based on internal AEO/GEO Skill knowledge base + Princeton GEO Study)

## Feature Landscape

### Table Stakes (AI Won't Cite Without These)

Features that AI search systems expect to find. Without these, content will rarely be selected for AI responses.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **FAQPage Schema** | AI Overviews 3.2x more likely to cite FAQ-structured content | LOW | JSON-LD in page head, Q&A format in content |
| **Article Schema with Author** | E-E-AT signal; establishes content authorship | LOW | Requires author profile page |
| **Organization Schema** | Entity establishment; brand recognition by LLMs | LOW | Company/personal info structured |
| **Cite Sources (Inline)** | 30-40% visibility boost (Princeton); AI validates claims | MEDIUM | Need 5-7 citations per 1000 words |
| **Statistics with Sources** | 30-40% visibility boost; concrete data preferred | MEDIUM | Industry reports, studies with dates |
| **50-Word Direct Answer** | AI extracts first paragraph for responses | LOW | Lead each page with direct answer |
| **Clear Heading Hierarchy** | AI parses structure for context extraction | LOW | H1 > H2 > H3 consistent |
| **dateModified in Schema** | Perplexity: 76.4% of cited pages updated within 30 days | LOW | Track and display last update |
| **Short Paragraphs (2-4 lines)** | Fluency optimization; easier AI extraction | LOW | Break up walls of text |
| **Person Schema for Author** | Expertise signal; connects author to content | LOW | Link to LinkedIn, credentials |

### Differentiators (Competitive Advantage in AI Search)

Features that set apart from competitors. These increase citation probability when competing content exists.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Expert Quotations** | 30-40% visibility boost; authority signal | MEDIUM | Quote industry experts with attribution |
| **HowTo Schema** | "How to" queries directly match this format | LOW | Step-by-step automation tutorials |
| **Platform-Specific Content Variants** | ChatGPT/Perplexity/Google prioritize different signals | HIGH | Same topic, 3 optimization approaches |
| **Cross-Platform Entity Consistency** | LLM entity recognition across sources | MEDIUM | Identical NAP across all platforms |
| **Case Study with Metrics** | Experience signal (E-E-AT); concrete proof | MEDIUM | Before/After with actual numbers |
| **Bilingual Structured Data** | en/ja Schema for both markets | MEDIUM | Dual language JSON-LD |
| **Service Area Schema (areaServed)** | Local queries handled by LLMs | LOW | Japan-focused service area |
| **Knowledge Graph Presence** | Entity stability across LLM retraining | HIGH | Wikipedia/Wikidata presence |
| **YouTube Video Integration** | Google AI Overviews cites YouTube 18.8% | MEDIUM | Create/embed relevant videos |
| **LinkedIn Article Mirroring** | Google AI Mode sources LinkedIn | MEDIUM | Republish key content |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but actively harm AI search visibility.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| **Keyword Stuffing** | SEO muscle memory | Princeton: Actively decreases AI visibility | Natural language, semantic coverage |
| **Excessive Technical Jargon** | "Sounds professional" | Reduces Easy-to-Understand score | Explain terms, use analogies |
| **Generic Testimonials** | Social proof | No E-E-AT value without specifics | Case studies with metrics + named clients |
| **Popup/Modal Heavy UX** | Conversion optimization | AI can't extract content behind modals | Inline CTAs, schema-marked contact |
| **Thin Content Pages** | More pages = more chances | Low value pages dilute site authority | Consolidate into comprehensive guides |
| **Auto-Generated FAQ** | Quick win | Generic Q&A lacks expertise signal | Research actual user questions |
| **Overloaded Schema** | "More is better" | Invalid/spammy schema penalized | Validate with Google Rich Results Test |
| **Real-Time Everything** | "Fresh content" | Creates crawler inconsistency | Meaningful updates, clear timestamps |

## Feature Dependencies

```
[Person Schema]
    |
    +--> [Article Schema] (requires author)
    |         |
    |         +--> [FAQ within Article] (requires article context)
    |
    +--> [E-E-AT Signals] (requires established identity)

[Organization Schema]
    |
    +--> [LocalBusiness Schema] (inherits from Organization)
    |
    +--> [sameAs Links] (connects to external profiles)
    |
    +--> [Knowledge Graph] (builds on Organization)

[Content with Citations]
    |
    +--> [Statistics Addition] (citations enable stats credibility)
    |
    +--> [Expert Quotations] (citations contextualize quotes)

[50-Word Direct Answer]
    |
    +--> [FAQPage Schema] (answers feed into FAQ)
    |
    +--> [AI Snippet Extraction] (first paragraph optimized)

[Platform-Specific Optimization]
    |-- requires --> [Base Content Structure]
    |-- requires --> [Schema Markup]
    |-- requires --> [Update Timestamps]
```

### Dependency Notes

- **Person Schema before Article Schema:** Author information must exist before articles can properly attribute authorship
- **Organization Schema before Knowledge Graph:** Entity must be defined before external platforms can reference it
- **Citations before Statistics:** Sources establish credibility pattern that statistics can leverage
- **Base Structure before Platform Variants:** Core content structure must work before creating platform-specific optimizations

## MVP Definition

### Launch With (v1 - Immediate Impact)

Minimum implementation to start getting AI citations. Focus on structural changes that apply site-wide.

- [x] **FAQPage Schema on key pages** - Highest ROI: 3.2x AI Overview visibility
- [x] **Organization Schema** - Establish entity identity
- [x] **Person Schema for author** - E-E-AT foundation
- [x] **Article Schema on case studies** - Content attribution
- [x] **50-word direct answers** - Immediate answer extraction
- [x] **dateModified timestamps** - Freshness signal for Perplexity

**Why these first:** Structural changes that apply automatically to all content. No content rewriting needed.

### Add After Validation (v1.x - Content Enhancement)

Features to add once schema foundation is working.

- [ ] **Inline citations (5-7 per 1000 words)** - Trigger: After confirming schema is valid
- [ ] **Statistics addition** - Trigger: When creating new content
- [ ] **Expert quotations** - Trigger: When building relationships with industry figures
- [ ] **HowTo Schema on tutorial pages** - Trigger: After workflow articles are structured

**Why defer:** Requires content editing/creation. More effort per page.

### Future Consideration (v2+ - Platform Expansion)

Features to defer until core optimization is working.

- [ ] **YouTube video creation** - Trigger: Google AI Mode traction
- [ ] **LinkedIn article mirroring** - Trigger: Need B2B lead channel
- [ ] **Knowledge Graph registration** - Trigger: Brand search volume justifies effort
- [ ] **Platform-specific content variants** - Trigger: Sufficient traffic to justify 3x content

**Why defer:** High effort, requires external platform presence. Only valuable at scale.

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| FAQPage Schema | HIGH | LOW | **P1** |
| Organization Schema | HIGH | LOW | **P1** |
| Person Schema | HIGH | LOW | **P1** |
| Article Schema | HIGH | LOW | **P1** |
| 50-word Direct Answers | HIGH | LOW | **P1** |
| dateModified Display | MEDIUM | LOW | **P1** |
| Clear Heading Hierarchy | MEDIUM | LOW | **P1** |
| Short Paragraphs | MEDIUM | LOW | **P1** |
| Inline Citations | HIGH | MEDIUM | **P2** |
| Statistics Addition | HIGH | MEDIUM | **P2** |
| HowTo Schema | MEDIUM | LOW | **P2** |
| Expert Quotations | MEDIUM | MEDIUM | **P2** |
| Case Study Metrics | MEDIUM | MEDIUM | **P2** |
| Bilingual Schema | MEDIUM | MEDIUM | **P2** |
| YouTube Integration | MEDIUM | HIGH | **P3** |
| LinkedIn Mirroring | MEDIUM | HIGH | **P3** |
| Knowledge Graph | LOW | HIGH | **P3** |
| Platform Variants | LOW | HIGH | **P3** |

**Priority key:**
- P1: Immediate implementation (schema + structure)
- P2: Content enhancement phase
- P3: Platform expansion phase

## Current State Analysis

Based on codebase review of `/Users/kazuya/Desktop/New-Portfolio`:

| Feature | Current State | Gap |
|---------|---------------|-----|
| FAQPage Schema | Not implemented | Full implementation needed |
| Organization Schema | Not implemented | Full implementation needed |
| Person Schema | Not implemented | Full implementation needed |
| Article Schema | Not implemented | Full implementation needed |
| dateModified | Not displayed | Add to UI + Schema |
| Structured Headings | Partial (inconsistent) | Standardize across pages |
| Citations | Not present | Content rewriting needed |
| Statistics | Limited | Add to case studies |
| FAQ Content | Not present | Create Q&A sections |

**GEO Score Context:** Current score of 19/70 (27%) indicates missing most table stakes features.

## Platform-Specific Considerations

### ChatGPT Optimization (via Bing)

| Signal | Current | Action |
|--------|---------|--------|
| Wikipedia-style writing | Partial | Add objective definitions |
| Educational structure | Partial | Add "What is X" sections |
| Bing Places | Unknown | Register if not done |
| Code examples | Present in workflows | Good, maintain |

### Perplexity Optimization

| Signal | Current | Action |
|--------|---------|--------|
| Update frequency | Unknown | Add visible timestamps |
| dateModified Schema | Missing | Implement |
| Inline citation URLs | Missing | Add to content |
| Academic style | Not present | Add sources |

### Google AI Overviews Optimization

| Signal | Current | Action |
|--------|---------|--------|
| FAQPage Schema | Missing | Implement |
| Backlinks | Unknown | Out of scope |
| YouTube presence | Unknown | Future consideration |
| LinkedIn presence | Unknown | Future consideration |

## Implementation Sequence Recommendation

```
Phase 1: Schema Foundation (Week 1)
├── Organization Schema (global)
├── Person Schema (author page)
├── Article Schema (case studies, workflows)
└── FAQPage Schema (key pages)

Phase 2: Content Structure (Week 2)
├── Add 50-word direct answers to all pages
├── Create FAQ sections on service pages
├── Standardize heading hierarchy
└── Add dateModified display

Phase 3: Content Enhancement (Week 3-4)
├── Add citations to existing content
├── Add statistics with sources
├── Create HowTo structured tutorials
└── Enhance case studies with metrics

Phase 4: Platform Expansion (Future)
├── YouTube video creation
├── LinkedIn article strategy
└── Knowledge Graph presence
```

## Sources

- Princeton GEO Study (2023): 9 optimization techniques quantified
- Internal AEO/GEO Optimizer Skill (`~/.claude/skills/aeo-geo-optimizer/`)
  - `GEO_TECHNIQUES.md`: Effectiveness percentages
  - `SCHEMA_MARKUP.md`: Implementation patterns
  - `EEAT_ENTITY.md`: Trust signals
  - `PLATFORM_STRATEGIES.md`: ChatGPT/Perplexity/Google differences
  - `LOCAL_SEO_LLM.md`: Local optimization patterns
  - `METRICS_TOOLS.md`: Measurement approaches
- Gartner 2024: 25% organic search to AI chatbots by 2026
- 2025 FAQ Schema Study: 3.2x AI Overview visibility

---
*Feature research for: AEO/GEO Portfolio Optimization*
*Researched: 2026-02-12*
