---
phase: 02-entity-foundation
plan: 01
subsystem: schema
tags: [json-ld, schema.org, organization, structured-data, seo, aeo]

# Dependency graph
requires:
  - phase: 01-technical-foundation
    provides: Next.js app structure with locale routing
provides:
  - Organization JSON-LD schema generator
  - JsonLd component for XSS-safe injection
  - Schema type constants (BASE_URL, ORGANIZATION_ID, PERSON_ID)
  - Site-wide schema injection via layout
affects: [02-02-person-schema, content-phases, article-schemas]

# Tech tracking
tech-stack:
  added: [schema-dts]
  patterns: [locale-aware-schema-generation, id-reference-pattern]

key-files:
  created:
    - lib/schema/types.ts
    - lib/schema/organization.ts
    - components/json-ld.tsx
  modified:
    - app/[locale]/layout.tsx
    - package.json

key-decisions:
  - "Used schema-dts for TypeScript types (Google-maintained, complete vocabulary)"
  - "Organization schema at layout level for site-wide presence"
  - "Used @id references for entity graph connections (founder -> #person)"
  - "Logo uses opengraph.png as fallback (logo.png not available)"

patterns-established:
  - "Schema generators: lib/schema/{entity}.ts with locale parameter"
  - "@id pattern: BASE_URL/#entity for consistent entity references"
  - "XSS protection: JSON.stringify().replace(/</g, '\\u003c')"

# Metrics
duration: 5min
completed: 2026-02-12
---

# Phase 02 Plan 01: Organization Schema Summary

**Organization JSON-LD schema with bilingual support and @id entity graph references for AI knowledge graph recognition**

## Performance

- **Duration:** 5 min
- **Started:** 2026-02-12T07:14:54Z
- **Completed:** 2026-02-12T07:20:00Z
- **Tasks:** 3
- **Files modified:** 5

## Accomplishments
- Installed schema-dts for TypeScript-validated schema generation
- Created JsonLd component with XSS protection for safe JSON-LD injection
- Implemented Organization schema generator with bilingual content (en/ja)
- Injected Organization schema site-wide via locale layout
- Established @id reference pattern connecting to Person schema (#person)

## Task Commits

Each task was committed atomically:

1. **Task 1: Install schema-dts and create schema infrastructure** - `d8c19fc` (feat)
2. **Task 2: Implement Organization schema generator** - `3abc625` (feat)
3. **Task 3: Inject Organization schema into layout** - `7944cdc` (feat)

## Files Created/Modified
- `lib/schema/types.ts` - Shared constants: BASE_URL, ORGANIZATION_ID, PERSON_ID
- `lib/schema/organization.ts` - Organization schema generator with bilingual support
- `components/json-ld.tsx` - XSS-safe JSON-LD script injection component
- `app/[locale]/layout.tsx` - Layout with Organization schema injection
- `package.json` - Added schema-dts devDependency

## Decisions Made
- Used schema-dts for TypeScript types - Google-maintained, provides compile-time validation
- Logo URL uses opengraph.png as fallback since dedicated logo.png doesn't exist
- Organization schema at layout level ensures it appears on every page
- Used @id references (founder: { @id: "#person" }) for entity graph rather than duplicating full objects

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- Pre-existing TypeScript errors in lib/content/*.ts (missing directAnswerEn/Ja, datePublished, dateModified fields) - unrelated to this plan, did not block execution
- Google Fonts (Zen Maru Gothic) network timeout in Turbopack - pre-existing issue, did not affect schema implementation
- Dev server verification blocked by font loading issue - verified schema structure programmatically instead

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Organization schema foundation complete
- @id references established for Person schema connection
- Ready for Plan 02-02 (Person schema on About page)

---
*Phase: 02-entity-foundation*
*Completed: 2026-02-12*
