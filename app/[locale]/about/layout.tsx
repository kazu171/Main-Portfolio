import { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'en'
      ? 'About Me | Kazuya Hibara'
      : '自己紹介 | 桧原和也',
    description: locale === 'en'
      ? 'AI Marketing Engineer helping solopreneurs automate their winning formulas. I design systems with margin for continuous improvement.'
      : 'AIマーケティングエンジニア。個人事業主の勝ちパターンを自動化します。継続的な改善のための余白を持ったシステムを設計します。',
  };
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
