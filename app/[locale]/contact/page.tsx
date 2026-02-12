import { ContactForm } from '@/components/contact-form';
import { JsonLd } from '@/components/json-ld';
import { generateContactPageSchema } from '@/lib/schema/contact';

interface PageProps {
  params: Promise<{ locale: 'en' | 'ja' }>;
}

export default async function Contact({ params }: PageProps) {
  const { locale } = await params;

  // Generate ContactPage schema for JSON-LD
  const contactSchema = generateContactPageSchema(locale);

  return (
    <>
      <JsonLd data={contactSchema} />
      <ContactForm locale={locale} />
    </>
  );
}
