---
phase: 03-content-structure
plan: 01
subsystem: content
tags: [typescript, next-intl, content-types, date-display]

# Dependency graph
requires:
  - phase: 01-technical-foundation
    provides: Next.js project with next-intl setup
provides:
  - Extended article types with directAnswer and date fields
  - LastUpdated component for bilingual date display
affects: [03-02, 03-03, article-pages, schema-generation]

# Tech tracking
tech-stack:
  added: []
  patterns: [direct-answer-pattern, iso8601-dates, semantic-time-element]

key-files:
  created:
    - components/ui/last-updated.tsx
  modified:
    - lib/content/types.ts

key-decisions:
  - "Use next-intl useFormatter for locale-aware date formatting"
  - "Semantic <time> element with dateTime attribute for machine-readability"
  - "ISO 8601 date format for consistent parsing"

patterns-established:
  - "Direct answer fields (40-60 words): directAnswerEn/Ja for AI extraction"
  - "Date fields: datePublished/dateModified in ISO 8601 format"
  - "LastUpdated component pattern for article freshness display"

# Metrics
duration: 3min
completed: 2026-02-12
---

# Phase 03 Plan 01: Types & Component Summary

**Extended WorkflowArticle and CaseStudyArticle types with direct answer and date fields, created reusable LastUpdated component for bilingual date display**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-12T07:14:49Z
- **Completed:** 2026-02-12T07:17:49Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Extended WorkflowArticle interface with directAnswerEn/Ja and datePublished/dateModified
- Extended CaseStudyArticle interface with same four fields
- Created LastUpdated component using next-intl useFormatter for locale-aware formatting
- Semantic HTML with machine-readable dateTime attribute

## Task Commits

Each task was committed atomically:

1. **Task 1: Extend content type definitions** - `f98959d` (feat)
2. **Task 2: Create LastUpdated component** - `2f15827` (feat)

## Files Created/Modified
- `lib/content/types.ts` - Added 4 new fields to both article interfaces
- `components/ui/last-updated.tsx` - Reusable bilingual date display component

## Decisions Made
- Used next-intl useFormatter instead of date-fns to avoid adding dependencies
- Positioned date fields after heroImage in type definitions for logical grouping
- Made className prop optional with empty string default for flexibility

## Deviations from Plan
None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Type definitions ready for Plan 03-02 (workflows) and Plan 03-03 (case studies)
- LastUpdated component ready for integration in article pages
- Data files will show TypeScript errors until plans 03-02 and 03-03 add the required fields

---
*Phase: 03-content-structure*
*Completed: 2026-02-12*
