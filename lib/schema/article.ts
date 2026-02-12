// Article schema generator for workflows and case studies
// Source: https://developers.google.com/search/docs/appearance/structured-data/article
import type { Article, WithContext } from 'schema-dts'
import { BASE_URL, PERSON_ID, type Locale } from './types'

interface ArticleData {
  slug: string
  title: string
  description: string
  datePublished: string
  dateModified: string
  heroImage: string
  articleType: 'workflow' | 'case-study'
}

export function generateArticleSchema(
  data: ArticleData,
  locale: Locale
): WithContext<Article> {
  const articleUrl = `${BASE_URL}/${locale}/cases/${data.slug}`

  // Type assertion needed: inLanguage is valid schema.org but not in schema-dts types
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${articleUrl}#article`,
    headline: data.title,
    description: data.description,
    image: data.heroImage.startsWith('http')
      ? data.heroImage
      : `${BASE_URL}${data.heroImage}`,
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    author: {
      '@id': PERSON_ID,
    },
    publisher: {
      '@type': 'Person',
      '@id': PERSON_ID,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    inLanguage: locale,
    articleSection: data.articleType === 'workflow' ? 'Workflows' : 'Case Studies',
  } as WithContext<Article>
}
