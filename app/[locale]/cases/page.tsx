'use client';

import { use } from 'react';

import { useRouter } from 'next/navigation';
import { MochiCard } from "@/components/ui/mochi-card";
import { MochiButton } from "@/components/ui/mochi-button";
import { ArrowRight, Languages, Sparkles, FileText, Workflow, BookOpen } from "lucide-react";
import { useState } from "react";

const translations = {
  en: {
    title: 'Cases & Workflows',
    intro: 'Real examples of automation systems built for solopreneurs and small teams.',
    filterAll: 'All',
    filterCaseStudy: 'Case Studies',
    filterWorkflow: 'Workflows',
    filterNotes: 'Notes',
    readMore: 'Read More →',
    ctaTitle: 'Want This Built for Your Business?',
    ctaText: "Every automation is tailored to your specific workflow. Let's discuss what's possible for your business.",
    ctaButton: 'Build This Pattern for Me',
    categoryLabels: {
      'case-study': 'Case Study',
      'workflow': 'Workflow',
      'notes': 'Notes',
    },
    comingSoon: 'Coming Soon',
    comingSoonDesc: 'Case studies and workflow examples will be added here as projects are completed.',
  },
  ja: {
    title: '事例・ワークフロー',
    intro: '個人事業主・少人数チーム向けに構築した自動化システムの実例。',
    filterAll: 'すべて',
    filterCaseStudy: '事例',
    filterWorkflow: 'ワークフロー',
    filterNotes: 'ノート',
    readMore: '続きを読む →',
    ctaTitle: 'あなたのビジネスにも構築しませんか？',
    ctaText: 'すべての自動化はあなたのワークフローに合わせてカスタマイズされます。あなたのビジネスで何が可能か、話し合いましょう。',
    ctaButton: 'このパターンを構築してもらう',
    categoryLabels: {
      'case-study': '事例',
      'workflow': 'ワークフロー',
      'notes': 'ノート',
    },
    comingSoon: '近日公開',
    comingSoonDesc: 'プロジェクト完了後、事例やワークフロー例がここに追加されます。',
  },
};

// Sample cases data (placeholder for now)
const sampleCases = [
  {
    id: 1,
    category: 'case-study',
    titleEn: 'Automated Lead Response System',
    titleJa: '自動リード対応システム',
    descEn: 'Reduced response time from 24 hours to 5 minutes with AI-powered initial contact.',
    descJa: 'AI駆動の初期対応で応答時間を24時間から5分に短縮。',
    tech: ['n8n', 'OpenAI', 'Gmail'],
  },
  {
    id: 2,
    category: 'workflow',
    titleEn: 'Invoice Automation Pipeline',
    titleJa: '請求書自動化パイプライン',
    descEn: 'End-to-end invoice generation from form submission to Stripe payment.',
    descJa: 'フォーム送信からStripe支払いまでのエンドツーエンド請求書生成。',
    tech: ['n8n', 'Google Sheets', 'Stripe'],
  },
  {
    id: 3,
    category: 'notes',
    titleEn: 'AI Integration Best Practices',
    titleJa: 'AI統合のベストプラクティス',
    descEn: 'Key learnings from implementing LLM-powered workflows.',
    descJa: 'LLM駆動ワークフロー実装からの主要な学び。',
    tech: ['OpenAI', 'Claude', 'n8n'],
  },
];

export default function Cases({ params }: { params: Promise<{ locale: 'en' | 'ja' }> }) {
  const { locale } = use(params);
  const router = useRouter();
  const t = translations[locale];
  const [filter, setFilter] = useState<string>('all');

  const filteredCases = filter === 'all'
    ? sampleCases
    : sampleCases.filter(c => c.category === filter);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'case-study': return <FileText className="w-4 h-4" />;
      case 'workflow': return <Workflow className="w-4 h-4" />;
      case 'notes': return <BookOpen className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const filterButtons = [
    { key: 'all', label: t.filterAll },
    { key: 'case-study', label: t.filterCaseStudy },
    { key: 'workflow', label: t.filterWorkflow },
    { key: 'notes', label: t.filterNotes },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center mochi-texture">
      {/* Language Toggle */}
      <div className="fixed top-8 right-8 z-50">
        <MochiButton
          variant="secondary"
          size="sm"
          className="gap-2 rounded-full border-white/60 shadow-xl"
          onClick={() => router.push(locale === "en" ? "/ja/cases" : "/en/cases")}
        >
          <Languages className="w-4 h-4 text-primary" />
          {locale === "en" ? "日本語" : "English"}
        </MochiButton>
      </div>

      <main className="w-full max-w-6xl px-6 pb-20">
        {/* Hero Section */}
        <section className="pt-12 pb-16 md:pt-24 md:pb-24">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/60 backdrop-blur-xl border border-white/80 text-[10px] font-black text-primary uppercase tracking-[0.2em] shadow-lg">
              <Sparkles className="w-3.5 h-3.5 fill-primary/20" />
              {locale === "en" ? "Portfolio" : "ポートフォリオ"}
            </div>

            <h1 className="text-5xl md:text-7xl font-[900] text-foreground tracking-tighter leading-[0.95]">
              {t.title}
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium max-w-3xl mx-auto">
              {t.intro}
            </p>
          </div>
        </section>

        {/* Filter Buttons */}
        <section className="pb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {filterButtons.map((btn) => (
              <MochiButton
                key={btn.key}
                variant={filter === btn.key ? undefined : "secondary"}
                size="sm"
                onClick={() => setFilter(btn.key)}
                className="rounded-full"
              >
                {btn.label}
              </MochiButton>
            ))}
          </div>
        </section>

        {/* Cases Grid */}
        <section className="pb-24">
          {filteredCases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCases.map((caseItem) => (
                <MochiCard
                  key={caseItem.id}
                  className="p-6 space-y-4 group hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                      {getCategoryIcon(caseItem.category)}
                      {t.categoryLabels[caseItem.category as keyof typeof t.categoryLabels]}
                    </span>
                  </div>

                  <h3 className="text-xl font-black group-hover:text-primary transition-colors">
                    {locale === "en" ? caseItem.titleEn : caseItem.titleJa}
                  </h3>

                  <p className="text-muted-foreground font-medium text-sm leading-relaxed">
                    {locale === "en" ? caseItem.descEn : caseItem.descJa}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {caseItem.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-secondary rounded-lg text-xs font-bold text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2">
                    <span className="text-primary font-bold text-sm group-hover:underline">
                      {t.readMore}
                    </span>
                  </div>
                </MochiCard>
              ))}
            </div>
          ) : (
            <MochiCard className="p-16 text-center">
              <Sparkles className="w-16 h-16 text-primary/40 mx-auto mb-6" />
              <h3 className="text-2xl font-black mb-2">{t.comingSoon}</h3>
              <p className="text-muted-foreground font-medium">{t.comingSoonDesc}</p>
            </MochiCard>
          )}
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-white/30 backdrop-blur-xl rounded-[4rem] border border-white/60 shadow-inner text-center space-y-8 px-8">
          <h2 className="text-4xl md:text-5xl font-black">{t.ctaTitle}</h2>
          <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">{t.ctaText}</p>
          <MochiButton size="lg" className="group" onClick={() => router.push(`/${locale}/contact`)}>
            {t.ctaButton} <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </MochiButton>
        </section>
      </main>
    </div>
  );
}
