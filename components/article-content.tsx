'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MochiCard } from '@/components/ui/mochi-card';
import { MochiButton } from '@/components/ui/mochi-button';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Workflow,
  FileText,
  User,
  MapPin,
  DollarSign,
  Users,
  TrendingUp,
} from 'lucide-react';
import { isWorkflow, isCaseStudy, workflows } from '@/lib/content';
import type { WorkflowArticle, CaseStudyArticle, Article } from '@/lib/content';
import { LastUpdated } from '@/components/ui/last-updated';
import { AuthorCard } from '@/components/ui/author-card';

const translations = {
  en: {
    back: '← Back to Cases',
    workflow: 'Workflow',
    caseStudy: 'Case Study',
    categoryA: 'Front-Office',
    categoryB: 'Back-Office',
    categoryC: 'Fulfillment & CRM',
    problem: 'The Problem',
    solution: 'The Solution',
    howItWorks: 'How It Works',
    results: 'Results',
    techStack: 'Tech Stack',
    persona: 'Client Profile',
    painPoints: 'Challenges',
    workflowsUsed: 'Workflows Deployed',
    metrics: 'Key Metrics',
    before: 'Before',
    after: 'After',
    story: 'Full Story',
    cta: 'Want This Built for Your Business?',
    ctaText: 'Every automation is tailored to your specific workflow.',
    ctaButton: 'Start the Conversation',
    notFound: 'Article not found',
    notFoundDesc: 'The article you are looking for does not exist.',
    writtenBy: 'Written by',
  },
  ja: {
    back: '← 事例一覧に戻る',
    workflow: 'ワークフロー',
    caseStudy: '事例',
    categoryA: 'フロントオフィス',
    categoryB: 'バックオフィス',
    categoryC: 'フルフィルメント & CRM',
    problem: '課題',
    solution: 'ソリューション',
    howItWorks: '仕組み',
    results: '成果',
    techStack: '技術スタック',
    persona: 'クライアントプロフィール',
    painPoints: '課題',
    workflowsUsed: '導入ワークフロー',
    metrics: '主要指標',
    before: 'Before',
    after: 'After',
    story: 'ストーリー',
    cta: 'あなたのビジネスにも構築しませんか？',
    ctaText: 'すべての自動化はあなたのワークフローに合わせてカスタマイズされます。',
    ctaButton: '相談を始める',
    notFound: '記事が見つかりません',
    notFoundDesc: 'お探しの記事は存在しません。',
    writtenBy: '著者',
  },
};

const categoryLabels = {
  A: { en: 'Front-Office', ja: 'フロントオフィス' },
  B: { en: 'Back-Office', ja: 'バックオフィス' },
  C: { en: 'Fulfillment & CRM', ja: 'フルフィルメント & CRM' },
};

function WorkflowDetail({ article, locale, t }: { article: WorkflowArticle; locale: 'en' | 'ja'; t: typeof translations['en'] }) {
  const catLabel = categoryLabels[article.solutionCategory][locale];

  return (
    <>
      {/* Badges */}
      <div className="flex flex-wrap gap-3 justify-center">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
          <Workflow className="w-3.5 h-3.5" />
          {t.workflow}
        </span>
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-secondary text-muted-foreground text-xs font-bold">
          {catLabel}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-[900] text-foreground tracking-tighter leading-[0.95] text-center">
        {locale === 'en' ? article.titleEn : article.titleJa}
      </h1>

      {/* Direct Answer - AI extraction optimized */}
      <p className="text-lg md:text-xl text-foreground/90 font-medium leading-relaxed max-w-3xl mx-auto text-center">
        {locale === 'en' ? article.directAnswerEn : article.directAnswerJa}
      </p>

      {/* Last Updated - Freshness signal */}
      <div className="flex justify-center">
        <LastUpdated date={article.dateModified} locale={locale} />
      </div>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 justify-center">
        {article.techStack.map((tech) => (
          <span key={tech} className="px-3 py-1.5 bg-white/60 backdrop-blur-sm rounded-xl text-xs font-bold text-muted-foreground border border-white/80">
            {tech}
          </span>
        ))}
      </div>

      {/* Hero Image */}
      <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-white/40 border border-white/60">
        <Image
          src={article.heroImage}
          alt={locale === 'en' ? article.titleEn : article.titleJa}
          fill
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
      </div>

      {/* Problem Section */}
      <MochiCard className="p-8 md:p-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-destructive/20 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-destructive/80" />
          </div>
          <h2 className="text-2xl font-black">{t.problem}</h2>
        </div>
        <p className="text-lg text-muted-foreground font-medium leading-relaxed">
          {article.sections.problem[locale]}
        </p>
      </MochiCard>

      {/* Solution Section */}
      <MochiCard className="p-8 md:p-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-black">{t.solution}</h2>
        </div>
        <p className="text-lg text-muted-foreground font-medium leading-relaxed">
          {article.sections.solution[locale]}
        </p>
      </MochiCard>

      {/* How It Works */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-center">{t.howItWorks}</h2>
        <div className="space-y-4">
          {article.sections.howItWorks[locale].map((step, i) => (
            <MochiCard key={i} className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-black text-sm shrink-0">
                  {i + 1}
                </div>
                <p className="text-foreground/90 font-medium leading-relaxed pt-2">
                  {step}
                </p>
              </div>
            </MochiCard>
          ))}
        </div>
      </div>

      {/* Results */}
      <MochiCard className="p-8 md:p-10 bg-primary/5">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-black">{t.results}</h2>
        </div>
        <p className="text-lg text-foreground font-medium leading-relaxed">
          {article.sections.results[locale]}
        </p>
      </MochiCard>
    </>
  );
}

function CaseStudyDetail({ article, locale, t }: { article: CaseStudyArticle; locale: 'en' | 'ja'; t: typeof translations['en'] }) {
  const relatedWorkflows = workflows.filter((w) => article.workflows.includes(w.slug));

  return (
    <>
      {/* Badge */}
      <div className="flex justify-center">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
          <FileText className="w-3.5 h-3.5" />
          {t.caseStudy}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-[900] text-foreground tracking-tighter leading-[0.95] text-center">
        {locale === 'en' ? article.titleEn : article.titleJa}
      </h1>

      {/* Direct Answer - AI extraction optimized */}
      <p className="text-lg md:text-xl text-foreground/90 font-medium leading-relaxed max-w-3xl mx-auto text-center">
        {locale === 'en' ? article.directAnswerEn : article.directAnswerJa}
      </p>

      {/* Last Updated - Freshness signal */}
      <div className="flex justify-center">
        <LastUpdated date={article.dateModified} locale={locale} />
      </div>

      {/* Hero Image */}
      <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-white/40 border border-white/60">
        <Image
          src={article.heroImage}
          alt={locale === 'en' ? article.titleEn : article.titleJa}
          fill
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
      </div>

      {/* Persona Card */}
      <MochiCard className="p-8 md:p-10">
        <h2 className="text-2xl font-black mb-6">{t.persona}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-primary shrink-0" />
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Name</p>
              <p className="font-bold">{locale === 'en' ? article.persona.nameEn : article.persona.nameJa}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-primary shrink-0" />
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Business</p>
              <p className="font-bold">{locale === 'en' ? article.persona.businessTypeEn : article.persona.businessTypeJa}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary shrink-0" />
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Location</p>
              <p className="font-bold">{locale === 'en' ? article.persona.locationEn : article.persona.locationJa}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DollarSign className="w-5 h-5 text-primary shrink-0" />
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Revenue</p>
              <p className="font-bold">{article.persona.revenue}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-primary shrink-0" />
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Staff</p>
              <p className="font-bold">{article.persona.staffSize}</p>
            </div>
          </div>
        </div>
      </MochiCard>

      {/* Pain Points */}
      <MochiCard className="p-8 md:p-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-destructive/20 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-destructive/80" />
          </div>
          <h2 className="text-2xl font-black">{t.painPoints}</h2>
        </div>
        <ul className="space-y-4">
          {article.painPoints[locale].map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center text-destructive/70 text-xs font-black shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-muted-foreground font-medium leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </MochiCard>

      {/* Workflows Used */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-center">{t.workflowsUsed}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relatedWorkflows.map((wf) => (
            <MochiCard
              key={wf.slug}
              className="p-6 group hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <a href={`/${locale}/cases/${wf.slug}`} className="block">
                <div className="flex items-center gap-2 mb-2">
                  <Workflow className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold text-primary">{categoryLabels[wf.solutionCategory][locale]}</span>
                </div>
                <h3 className="font-black group-hover:text-primary transition-colors">
                  {locale === 'en' ? wf.titleEn : wf.titleJa}
                </h3>
                <p className="text-sm text-muted-foreground font-medium mt-1">
                  {locale === 'en' ? wf.descriptionEn : wf.descriptionJa}
                </p>
              </a>
            </MochiCard>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-center">{t.metrics}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {article.results.map((result, i) => (
            <MochiCard key={i} className="p-6 text-center">
              <p className="text-sm font-bold text-muted-foreground mb-3">
                {locale === 'en' ? result.metricEn : result.metricJa}
              </p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-lg font-bold text-destructive/60 line-through">{result.before}</span>
                <ArrowRight className="w-4 h-4 text-primary" />
                <span className="text-2xl font-black text-primary">{result.after}</span>
              </div>
            </MochiCard>
          ))}
        </div>
      </div>

      {/* Full Narrative */}
      <MochiCard className="p-8 md:p-10">
        <h2 className="text-2xl font-black mb-6">{t.story}</h2>
        <div className="prose prose-lg max-w-none text-foreground/80 font-medium leading-relaxed whitespace-pre-line">
          {locale === 'en' ? article.narrativeEn : article.narrativeJa}
        </div>
      </MochiCard>
    </>
  );
}

interface ArticleContentProps {
  article: Article;
  locale: 'en' | 'ja';
}

export function ArticleContent({ article, locale }: ArticleContentProps) {
  const router = useRouter();
  const t = translations[locale];

  return (
    <div className="min-h-screen w-full flex flex-col items-center mochi-texture">
      <main className="w-full max-w-4xl px-6 pb-20">
        {/* Back Button */}
        <div className="pt-24 md:pt-28 pb-8">
          <MochiButton
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/${locale}/cases`)}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.back}
          </MochiButton>
        </div>

        {/* Article Content */}
        <article className="space-y-8">
          {isWorkflow(article) && <WorkflowDetail article={article} locale={locale} t={t} />}
          {isCaseStudy(article) && <CaseStudyDetail article={article} locale={locale} t={t} />}
        </article>

        {/* Author Card - E-E-A-T signal */}
        <section className="mt-12">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
            {t.writtenBy}
          </h3>
          <AuthorCard locale={locale} />
        </section>

        {/* CTA Section */}
        <section className="mt-16 py-16 bg-white/30 backdrop-blur-xl rounded-[3rem] border border-white/60 shadow-inner text-center space-y-6 px-8">
          <h2 className="text-3xl md:text-4xl font-black">{t.cta}</h2>
          <p className="text-lg text-muted-foreground font-medium max-w-xl mx-auto">{t.ctaText}</p>
          <MochiButton size="lg" className="group" onClick={() => router.push(`/${locale}/contact`)}>
            {t.ctaButton} <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </MochiButton>
        </section>
      </main>
    </div>
  );
}

export function ArticleNotFound({ locale }: { locale: 'en' | 'ja' }) {
  const router = useRouter();
  const t = translations[locale];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center mochi-texture">
      <MochiCard className="p-16 text-center max-w-md">
        <Sparkles className="w-16 h-16 text-primary/40 mx-auto mb-6" />
        <h1 className="text-2xl font-black mb-2">{t.notFound}</h1>
        <p className="text-muted-foreground font-medium mb-6">{t.notFoundDesc}</p>
        <MochiButton onClick={() => router.push(`/${locale}/cases`)}>
          {t.back}
        </MochiButton>
      </MochiCard>
    </div>
  );
}
