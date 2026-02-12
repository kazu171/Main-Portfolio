// Person schema generator with bilingual support and E-E-A-T signals
// Source: https://schema.org/Person, https://developers.google.com/search/docs/appearance/structured-data/profile-page
import type { Person, WithContext } from 'schema-dts'
import { BASE_URL, ORGANIZATION_ID, PERSON_ID, type Locale } from './types'

interface PersonData {
  name: string
  alternateName?: string
  jobTitle: string
  description: string
  knowsAbout: string[]
  sameAs: string[]
}

const personData: Record<Locale, PersonData> = {
  en: {
    name: 'Kazuya Hibara',
    jobTitle: 'AI Marketing Engineer',
    description:
      'AI Marketing Engineer specializing in automation and marketing systems for solopreneurs and small businesses',
    knowsAbout: [
      'AI Automation',
      'Marketing Systems',
      'n8n Workflows',
      'Next.js Development',
      'LLM Integration',
      'Business Process Automation',
    ],
    sameAs: [
      'https://www.linkedin.com/in/kazuyahibara/',
      'https://github.com/kazuyahibara',
    ],
  },
  ja: {
    name: 'Kazuya Hibara',
    alternateName: '日原和也',
    jobTitle: 'AIマーケティングエンジニア',
    description:
      '個人事業主やスモールビジネス向けのAI自動化とマーケティングシステムを専門とするエンジニア',
    knowsAbout: [
      'AI自動化',
      'マーケティングシステム',
      'n8nワークフロー',
      'Next.js開発',
      'LLM統合',
      'ビジネスプロセス自動化',
    ],
    sameAs: [
      'https://www.linkedin.com/in/kazuyahibara/',
      'https://github.com/kazuyahibara',
    ],
  },
}

export function generatePersonSchema(locale: Locale): WithContext<Person> {
  const data = personData[locale]

  // Type assertion needed: inLanguage is valid schema.org but not in schema-dts types
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: data.name,
    alternateName: data.alternateName,
    url: `${BASE_URL}/${locale}/about`,
    image: `${BASE_URL}/opengraph.png`,
    jobTitle: data.jobTitle,
    description: data.description,
    knowsAbout: data.knowsAbout,
    sameAs: data.sameAs,
    worksFor: {
      '@id': ORGANIZATION_ID,
    },
    inLanguage: locale,
  } as WithContext<Person>
}
