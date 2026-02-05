import { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'en'
      ? 'The Process | Kazuya Hibara'
      : 'プロセス | 桧原和也',
    description: locale === 'en'
      ? 'From consultation to implementation: How we build your automation system in 5 clear steps.'
      : '相談から実装まで：自動化システムを5つの明確なステップで構築する方法。',
  };
}

export default function ProcessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
