import { Metadata } from 'next';
import { Nunito, Zen_Maru_Gothic } from 'next/font/google';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {locales} from '@/i18n';
import { Navbar } from '@/components/ui/navbar';
import { generateOrganizationSchema } from '@/lib/schema/organization';
import { JsonLd } from '@/components/json-ld';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '../globals.css';

const nunito = Nunito({
  weight: ['400', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-nunito',
});

const zenMaruGothic = Zen_Maru_Gothic({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-zen-maru-gothic',
});

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Kazuya Hibara | AI Marketing Engineer',
    description: locale === 'en'
      ? 'I implement your winning formula into a marketing system that runs 24/7.'
      : 'あなたの「勝ちパターン」を、24時間365日稼働するマーケティングシステムとして実装する、AIマーケティングエンジニアです。',
    icons: {
      icon: '/favicon.png',
    },
    openGraph: {
      title: 'Kazuya Hibara | AI Marketing Engineer',
      description: locale === 'en'
        ? 'I implement your winning formula into a marketing system that runs 24/7.'
        : 'あなたの「勝ちパターン」を、24時間365日稼働するマーケティングシステムとして実装する、AIマーケティングエンジニアです。',
      type: 'website',
      images: ['/opengraph.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Kazuya Hibara | AI Marketing Engineer',
      description: locale === 'en'
        ? 'I implement your winning formula into a marketing system that runs 24/7.'
        : 'あなたの「勝ちパターン」を、24時間365日稼働するマーケティングシステムとして実装する、AIマーケティングエンジニアです。',
      images: ['/opengraph.png'],
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering for this locale
  setRequestLocale(locale);

  const messages = await getMessages();
  const organizationSchema = generateOrganizationSchema(locale as 'en' | 'ja');

  return (
    <html lang={locale} className={`${nunito.variable} ${zenMaruGothic.variable}`}>
      <body>
        <JsonLd data={organizationSchema} />
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale as 'en' | 'ja'} />
          {children}
        </NextIntlClientProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
