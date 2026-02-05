import { setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n';
import HomeClient from './home-client';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Home({ params }: { params: Promise<{ locale: 'en' | 'ja' }> }) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return <HomeClient locale={locale} />;
}
