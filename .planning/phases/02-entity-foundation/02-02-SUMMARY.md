---
phase: 02-entity-foundation
plan: 02
subsystem: schema
tags: [json-ld, schema.org, person, structured-data, e-e-a-t, seo, aeo]

# Dependency graph
requires:
  - phase: 02-entity-foundation
    plan: 01
    provides: JsonLd component, schema types, Organization schema with @id
provides:
  - Person JSON-LD schema generator with E-E-A-T fields
  - Person schema on About page
  - Complete bidirectional entity graph (Organization <-> Person)
affects: [article-schemas, author-attribution, e-e-a-t-signals]

# Tech tracking
tech-stack:
  added: []
  patterns: [server-client-component-split, page-level-schema-injection]

key-files:
  created:
    - lib/schema/person.ts
    - components/about-content.tsx
  modified:
    - app/[locale]/about/page.tsx

key-decisions:
  - "Split About page into Server (schema) + Client (interactivity) components"
  - "Person schema includes knowsAbout array for AI expertise recognition"
  - "worksFor references Organization via @id (bidirectional graph)"
  - "Image uses opengraph.png as fallback (profile.jpg not available)"

patterns-established:
  - "Page-level schema injection: Server Component wraps Client Content"
  - "E-E-A-T fields: jobTitle, knowsAbout, sameAs for expertise signals"
  - "Bidirectional @id references: Organization.founder <-> Person.worksFor"

# Metrics
duration: 4min
completed: 2026-02-12
---

# Phase 02 Plan 02: Person Schema Summary

**Person JSON-LD schema with E-E-A-T expertise signals (jobTitle, knowsAbout, sameAs) and bidirectional Organization link**

## Performance

- **Duration:** 4 min
- **Started:** 2026-02-12T07:20:00Z
- **Completed:** 2026-02-12T07:24:00Z
- **Tasks:** 3
- **Files modified:** 3

## Accomplishments
- Implemented Person schema generator with bilingual E-E-A-T content
- Restructured About page: Server Component for schema + Client Component for interactivity
- Created connected entity graph: Organization.founder <-> Person.worksFor
- Added expertise areas via knowsAbout array (6 areas in both languages)
- Verified bidirectional @id references work correctly for both locales

## Task Commits

Each task was committed atomically:

1. **Task 1: Implement Person schema generator** - `6db317b` (feat)
2. **Task 2: Convert About page and inject Person schema** - `180d0ea` (feat)
3. **Task 3: Verify entity graph connections** - (verification only, no commit)

## Files Created/Modified
- `lib/schema/person.ts` - Person schema generator with E-E-A-T fields
- `components/about-content.tsx` - Client component extracted from About page
- `app/[locale]/about/page.tsx` - Server component with Person schema injection

## Decisions Made
- Split About page into Server + Client components to enable server-side schema injection while preserving router.push interactivity
- Person schema includes 6 expertise areas in knowsAbout for AI knowledge graph understanding
- Used same sameAs URLs in both Organization and Person schemas for consistency
- Image URL uses opengraph.png since profile.jpg doesn't exist

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- About page content had been modified externally (intro text updated) - detected during file read, synced updated content to extracted client component
- Dev server verification blocked by font loading issue - verified schema structure programmatically via tsx script instead

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Entity foundation complete: Organization + Person schemas with bidirectional @id graph
- Both schemas appear on About page (Organization from layout, Person from page)
- Ready for article-level schema implementation (Article, HowTo schemas)

---
*Phase: 02-entity-foundation*
*Completed: 2026-02-12*
