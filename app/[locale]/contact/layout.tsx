import { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'en'
      ? 'Contact | Kazuya Hibara'
      : 'お問い合わせ | 桧原和也',
    description: locale === 'en'
      ? 'Schedule a 30-minute consultation to identify automation opportunities in your business. No preparation needed.'
      : '30分のコンサルテーションで、あなたのビジネスの自動化の機会を特定します。事前準備不要。',
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
