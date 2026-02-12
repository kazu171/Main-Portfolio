import { WhatIDoContent } from '@/components/what-i-do-content';
import { faqContent } from '@/lib/content/faq';
import { JsonLd } from '@/components/json-ld';
import { generateFAQSchema } from '@/lib/schema/faq';
import { BASE_URL } from '@/lib/schema/types';

interface PageProps {
  params: Promise<{ locale: 'en' | 'ja' }>;
}

export default async function WhatIDo({ params }: PageProps) {
  const { locale } = await params;

  // Generate FAQ schema from visible content
  const pageUrl = `${BASE_URL}/${locale}/what-i-do`;
  const faqSchema = generateFAQSchema(faqContent[locale], pageUrl, locale);

  return (
    <>
      <JsonLd data={faqSchema} />
      <WhatIDoContent locale={locale} />
    </>
  );
}
