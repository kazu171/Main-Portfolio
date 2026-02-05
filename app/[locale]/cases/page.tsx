'use client';

import { use } from 'react';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MochiCard } from "@/components/ui/mochi-card";
import { MochiButton } from "@/components/ui/mochi-button";
import { ArrowRight, Sparkles, FileText, Workflow } from "lucide-react";
import { useState } from "react";
import { getAllArticles, isWorkflow } from '@/lib/content';

const translations = {
  en: {
    title: 'Cases & Workflows',
    intro: 'Real examples of automation systems built for solopreneurs and small teams.',
    filterAll: 'All',
    filterCaseStudy: 'Case Studies',
    filterWorkflow: 'Workflows',
    readMore: 'Read More →',
    ctaTitle: 'Want This Built for Your Business?',
    ctaText: "Every automation is tailored to your specific workflow. Let's discuss what's possible for your business.",
    ctaButton: 'Build This Pattern for Me',
    categoryLabels: {
      'case-study': 'Case Study',
      'workflow': 'Workflow',
    },
    solutionLabels: {
      A: 'Front-Office',
      B: 'Back-Office',
      C: 'Fulfillment',
    },
  },
  ja: {
    title: '事例・ワークフロー',
    intro: '個人事業主・少人数チーム向けに構築した自動化システムの実例。',
    filterAll: 'すべて',
    filterCaseStudy: '事例',
    filterWorkflow: 'ワークフロー',
    readMore: '続きを読む →',
    ctaTitle: 'あなたのビジネスにも構築しませんか？',
    ctaText: 'すべての自動化はあなたのワークフローに合わせてカスタマイズされます。あなたのビジネスで何が可能か、話し合いましょう。',
    ctaButton: 'このパターンを構築してもらう',
    categoryLabels: {
      'case-study': '事例',
      'workflow': 'ワークフロー',
    },
    solutionLabels: {
      A: 'フロントオフィス',
      B: 'バックオフィス',
      C: 'フルフィルメント',
    },
  },
};

const articles = getAllArticles();

export default function Cases({ params }: { params: Promise<{ locale: 'en' | 'ja' }> }) {
  const { locale } = use(params);
  const router = useRouter();
  const t = translations[locale];
  const [filter, setFilter] = useState<string>('all');

  const filteredArticles = filter === 'all'
    ? articles
    : articles.filter(a => a.category === filter);

  // Show case studies first, then workflows
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (a.category === 'case-study' && b.category !== 'case-study') return -1;
    if (a.category !== 'case-study' && b.category === 'case-study') return 1;
    return 0;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'case-study': return <FileText className="w-4 h-4" />;
      case 'workflow': return <Workflow className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const filterButtons = [
    { key: 'all', label: t.filterAll },
    { key: 'case-study', label: t.filterCaseStudy },
    { key: 'workflow', label: t.filterWorkflow },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center mochi-texture">
      <main className="w-full max-w-6xl px-6 pb-20">
        {/* Hero Section */}
        <section className="pt-24 pb-16 md:pt-32 md:pb-24">
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

        {/* Articles Grid */}
        <section className="pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedArticles.map((article) => (
              <MochiCard
                key={article.slug}
                className="p-6 space-y-4 group hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                onClick={() => router.push(`/${locale}/cases/${article.slug}`)}
              >
                {/* Hero Image Thumbnail */}
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-white/40 border border-white/60">
                  <Image
                    src={article.heroImage}
                    alt={locale === 'en' ? article.titleEn : article.titleJa}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                    {getCategoryIcon(article.category)}
                    {t.categoryLabels[article.category]}
                  </span>
                  {isWorkflow(article) && (
                    <span className="px-3 py-1 rounded-full bg-secondary text-muted-foreground text-xs font-bold">
                      {t.solutionLabels[article.solutionCategory]}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-black group-hover:text-primary transition-colors leading-tight">
                  {locale === "en" ? article.titleEn : article.titleJa}
                </h3>

                <p className="text-muted-foreground font-medium text-sm leading-relaxed">
                  {locale === "en" ? article.descriptionEn : article.descriptionJa}
                </p>

                {isWorkflow(article) && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {article.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-secondary rounded-lg text-xs font-bold text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-2">
                  <span className="text-primary font-bold text-sm group-hover:underline">
                    {t.readMore}
                  </span>
                </div>
              </MochiCard>
            ))}
          </div>
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
