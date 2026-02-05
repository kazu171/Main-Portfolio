import { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'en'
      ? 'Privacy Policy | Kazuya Hibara'
      : 'プライバシーポリシー | 桧原和也',
    description: locale === 'en'
      ? 'Information about how we collect, use, and protect your personal data.'
      : '個人データの収集、使用、保護方法に関する情報。',
  };
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
