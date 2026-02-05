import { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'en'
      ? 'Marketing Ops & Automation | Kazuya Hibara'
      : 'マーケティングオペレーション & 自動化 | 桧原和也',
    description: locale === 'en'
      ? 'Replace your manual processes with AI and automation systems. Front-office, back-office, and fulfillment automation solutions.'
      : '手動で回している勝ちパターンをシステムに置き換える。フロントオフィス、バックオフィス、フルフィルメント自動化ソリューション。',
  };
}

export default function WhatIDoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
