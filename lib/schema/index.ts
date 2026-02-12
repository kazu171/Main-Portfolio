// Schema exports for AEO/GEO optimization
// All schemas follow schema.org specifications and are validated for Rich Results

export * from './types'
export * from './organization'
export * from './person'
export * from './article'
export * from './faq'
export * from './howto'
export * from './contact'

/*
Schema Implementation Summary:
=============================

1. Organization Schema (lib/schema/organization.ts)
   - Injected: Root layout (all pages)
   - Purpose: Site-wide entity identity
   - Bilingual: Yes (en/ja content)

2. Person Schema (lib/schema/person.ts)
   - Injected: About page
   - Purpose: E-E-A-T author expertise
   - Bilingual: Yes (name, jobTitle, knowsAbout)

3. Article Schema (lib/schema/article.ts)
   - Injected: Workflow & Case Study pages
   - Purpose: Content markup with dates/author
   - Bilingual: Yes (headline, description)

4. FAQPage Schema (lib/schema/faq.ts)
   - Injected: What I Do page
   - Purpose: AI-extractable Q&A content
   - Bilingual: Yes (questions, answers)

5. HowTo Schema (lib/schema/howto.ts)
   - Injected: Workflow article pages
   - Purpose: Step-by-step tutorials
   - Bilingual: Yes (steps, tools)

6. ContactPage Schema (lib/schema/contact.ts)
   - Injected: Contact page
   - Purpose: Conversion optimization
   - Bilingual: Yes (title, description)

Testing:
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema Markup Validator: https://validator.schema.org/
*/
