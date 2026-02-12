import { generatePersonSchema } from '@/lib/schema/person';
import { JsonLd } from '@/components/json-ld';
import { AboutContent } from '@/components/about-content';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: 'en' | 'ja' }>;
}) {
  const { locale } = await params;
  const personSchema = generatePersonSchema(locale);

  return (
    <>
      <JsonLd data={personSchema} />
      <AboutContent locale={locale} />
    </>
  );
}
