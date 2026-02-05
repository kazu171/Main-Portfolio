import { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'en'
      ? 'Cases & Workflows | Kazuya Hibara'
      : '事例・ワークフロー | 桧原和也',
    description: locale === 'en'
      ? 'Real examples of automation systems built for solopreneurs and small teams. Case studies, workflows, and implementation notes.'
      : '個人事業主・少人数チーム向けに構築した自動化システムの実例。事例、ワークフロー、実装ノート。',
  };
}

export default function CasesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
