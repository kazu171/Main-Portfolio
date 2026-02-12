// FAQPage schema generator for AI search optimization
// Source: https://developers.google.com/search/docs/appearance/structured-data/faqpage
import type { FAQPage, WithContext } from 'schema-dts'
import { BASE_URL, type Locale } from './types'

export interface FAQItem {
  question: string
  answer: string
}

export function generateFAQSchema(
  faqs: FAQItem[],
  pageUrl: string,
  locale: Locale
): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question' as const,
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: faq.answer,
      },
    })),
    inLanguage: locale,
  } as WithContext<FAQPage>
}
