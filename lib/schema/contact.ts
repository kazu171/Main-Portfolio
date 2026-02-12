// ContactPage schema for conversion optimization
// Source: https://schema.org/ContactPage
import type { ContactPage, WithContext } from 'schema-dts'
import { BASE_URL, ORGANIZATION_ID, type Locale } from './types'

interface ContactPageData {
  title: string
  description: string
}

const contactData: Record<Locale, ContactPageData> = {
  en: {
    title: '30-Minute Online Consultation',
    description:
      'Free consultation to identify automation opportunities for your business. Share your workflow challenges and receive concrete solutions within 2 business days.',
  },
  ja: {
    title: '30分オンライン相談',
    description:
      'ビジネスの自動化機会を特定する無料相談。ワークフローの課題を共有いただければ、2営業日以内に具体的なソリューションをご提案します。',
  },
}

export function generateContactPageSchema(
  locale: Locale
): WithContext<ContactPage> {
  const data = contactData[locale]
  const contactUrl = `${BASE_URL}/${locale}/contact`

  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${contactUrl}#webpage`,
    name: data.title,
    description: data.description,
    url: contactUrl,
    mainEntity: {
      '@id': ORGANIZATION_ID,
    },
    inLanguage: locale,
  } as WithContext<ContactPage>
}
