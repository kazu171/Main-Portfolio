// HowTo schema generator for step-by-step workflow articles
// Source: https://developers.google.com/search/docs/appearance/structured-data/how-to
import type { HowTo, WithContext } from 'schema-dts'
import { BASE_URL, PERSON_ID, type Locale } from './types'

interface HowToStep {
  name: string
  text: string
}

interface HowToData {
  slug: string
  title: string
  description: string
  heroImage: string
  steps: HowToStep[]
  estimatedTime?: string // ISO 8601 duration: "PT30M", "PT1H"
  tools?: string[] // Tech stack used
}

export function generateHowToSchema(
  data: HowToData,
  locale: Locale
): WithContext<HowTo> {
  const howToUrl = `${BASE_URL}/${locale}/cases/${data.slug}`

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${howToUrl}#howto`,
    name: data.title,
    description: data.description,
    image: data.heroImage.startsWith('http')
      ? data.heroImage
      : `${BASE_URL}${data.heroImage}`,
    step: data.steps.map((step, index) => ({
      '@type': 'HowToStep' as const,
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
    ...(data.estimatedTime && { totalTime: data.estimatedTime }),
    ...(data.tools &&
      data.tools.length > 0 && {
        tool: data.tools.map((tool) => ({
          '@type': 'HowToTool' as const,
          name: tool,
        })),
      }),
    author: {
      '@id': PERSON_ID,
    },
    inLanguage: locale,
  } as WithContext<HowTo>
}

// Helper to extract step name and text from workflow howItWorks format
// Input: "Trigger: Manual input or scheduled RSS/webhook for new content"
// Output: { name: "Trigger", text: "Manual input or scheduled RSS/webhook for new content" }
export function parseWorkflowStep(stepText: string): HowToStep {
  const colonIndex = stepText.indexOf(':')
  if (colonIndex > 0 && colonIndex < 30) {
    return {
      name: stepText.substring(0, colonIndex).trim(),
      text: stepText.substring(colonIndex + 1).trim(),
    }
  }
  // Fallback: use full text for both
  return {
    name: stepText.substring(0, 50) + (stepText.length > 50 ? '...' : ''),
    text: stepText,
  }
}
