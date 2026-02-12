// Organization schema generator with bilingual support
// Source: https://developers.google.com/search/docs/appearance/structured-data/organization
import type { Organization, WithContext } from 'schema-dts'
import { BASE_URL, ORGANIZATION_ID, PERSON_ID, type Locale } from './types'

interface OrganizationData {
  name: string
  alternateName?: string
  description: string
  email: string
  sameAs: string[]
}

const organizationData: Record<Locale, OrganizationData> = {
  en: {
    name: 'Kazuya Hibara',
    description:
      'AI Marketing Engineer implementing winning formulas into 24/7 marketing systems for solopreneurs and small businesses',
    email: 'contact@kazuya.work',
    sameAs: [
      'https://www.linkedin.com/in/kazuyahibara/',
      'https://github.com/kazuyahibara',
    ],
  },
  ja: {
    name: 'Kazuya Hibara',
    alternateName: '日原和也',
    description:
      '個人事業主やスモールビジネス向けに、勝ちパターンを24時間稼働するマーケティングシステムに実装するAIマーケティングエンジニア',
    email: 'contact@kazuya.work',
    sameAs: [
      'https://www.linkedin.com/in/kazuyahibara/',
      'https://github.com/kazuyahibara',
    ],
  },
}

export function generateOrganizationSchema(
  locale: Locale
): WithContext<Organization> {
  const data = organizationData[locale]

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: data.name,
    alternateName: data.alternateName,
    url: BASE_URL,
    logo: `${BASE_URL}/opengraph.png`,
    description: data.description,
    email: data.email,
    sameAs: data.sameAs,
    founder: {
      '@id': PERSON_ID,
    },
    inLanguage: locale,
  }
}
