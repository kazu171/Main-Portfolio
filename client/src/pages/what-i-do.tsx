import { useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { MochiCard } from "@/components/ui/mochi-card";
import { MochiButton } from "@/components/ui/mochi-button";
import { ArrowRight, Languages, MessageSquare, FileSpreadsheet, Users, Sparkles, Zap, ArrowRightLeft } from "lucide-react";

const translations = {
  en: {
    title: 'Marketing Ops & Automation',
    intro: 'Before adding new tactics, replace the "winning patterns currently running manually" with systems. I place a "24-hour working, highly capable practical staff member" in your business.',
    solutionsTitle: 'Three Solutions',
    solutions: {
      frontOffice: {
        title: 'Category A: Front-Office Automation',
        subtitle: '(Inquiry & Lead Gen)',
        before: 'Chasing replies, missed leads, answering FAQs all day',
        afterTitle: 'After: AI Concierge',
        afterBody: 'AI learned from past data handles primary responses, hearings, and scheduling',
        tech: 'n8n, OpenAI, Gmail/Instagram API, Google Calendar',
      },
      backOffice: {
        title: 'Category B: Back-Office/Admin Automation',
        subtitle: '(Admin Ops)',
        before: 'Copy-pasting from forms to sheets, manual invoicing, missed data transfers',
        afterTitle: 'After: Data Pipelines',
        afterBody: 'Application → List Add → Invoice → Chat Notification. No human touch until final approval',
        tech: 'n8n, Google Sheets, Stripe, Slack/Chatwork',
      },
      fulfillment: {
        title: 'Category C: Fulfillment & CRM Automation',
        subtitle: '(Customer Success)',
        before: 'Manual "Thank you" emails, forgotten follow-ups, time-consuming individual advice',
        afterTitle: 'After: Systemized Service Flow',
        afterBody: 'Onboarding, follow-ups based on customer attributes, and AI-drafted individual reports',
        tech: 'n8n, OpenAI, CRM Tools, LINE Official Account',
      },
    },
    transformationTitle: 'The Transformation',
    chaos: 'Chaos',
    chaosDesc: 'Manual processes, scattered tools, missed opportunities',
    arrow: '→ n8n + AI →',
    order: 'Order',
    orderDesc: 'Automated flows, integrated systems, captured value',
    ctaTitle: 'Ready to Automate?',
    ctaText: 'Tell me your current flow exactly as it is.',
    ctaButton: 'Start the Conversation',
  },
  ja: {
    title: 'マーケティングオペレーション & 自動化',
    intro: '新しい施策を追加する前に、「手動で回している勝ちパターン」をシステムに置き換える。あなたのビジネスに「24時間働く、高性能な実務スタッフ」を配置します。',
    solutionsTitle: '3つのソリューション',
    solutions: {
      frontOffice: {
        title: 'カテゴリA：フロントオフィス自動化',
        subtitle: '（問い合わせ・リード獲得）',
        before: '返信に追われる、見込み客を逃す、FAQ対応で1日が終わる',
        afterTitle: 'After: AIコンシェルジュ',
        afterBody: '過去データから学習したAIが一次対応、ヒアリング、スケジュール調整を担当',
        tech: 'n8n, OpenAI, Gmail/Instagram API, Google Calendar',
      },
      backOffice: {
        title: 'カテゴリB：バックオフィス・管理業務自動化',
        subtitle: '（事務処理）',
        before: 'フォームからスプレッドシートへのコピペ、手動請求書発行、データ転記漏れ',
        afterTitle: 'After: データパイプライン',
        afterBody: '申込 → リスト追加 → 請求書発行 → チャット通知。最終承認まで人の手不要',
        tech: 'n8n, Google Sheets, Stripe, Slack/Chatwork',
      },
      fulfillment: {
        title: 'カテゴリC：フルフィルメント・CRM自動化',
        subtitle: '（顧客成功）',
        before: '手動の「ありがとう」メール、フォローアップ忘れ、個別アドバイスに時間がかかる',
        afterTitle: 'After: システム化されたサービスフロー',
        afterBody: 'オンボーディング、顧客属性に基づくフォローアップ、AI作成の個別レポート',
        tech: 'n8n, OpenAI, CRMツール, LINE公式アカウント',
      },
    },
    transformationTitle: '変革',
    chaos: 'カオス',
    chaosDesc: '手作業のプロセス、散在するツール、逃した機会',
    arrow: '→ n8n + AI →',
    order: '秩序',
    orderDesc: '自動化されたフロー、統合されたシステム、獲得した価値',
    ctaTitle: '自動化の準備はできましたか？',
    ctaText: '現在のフローをそのまま教えてください。',
    ctaButton: '相談を始める',
  },
};

interface WhatIDoProps {
  lang: "en" | "ja";
}

export default function WhatIDo({ lang }: WhatIDoProps) {
  const [, setLocation] = useLocation();
  const t = translations[lang];

  const solutionCards = [
    {
      key: 'frontOffice',
      icon: <MessageSquare className="w-8 h-8" />,
      data: t.solutions.frontOffice,
    },
    {
      key: 'backOffice',
      icon: <FileSpreadsheet className="w-8 h-8" />,
      data: t.solutions.backOffice,
    },
    {
      key: 'fulfillment',
      icon: <Users className="w-8 h-8" />,
      data: t.solutions.fulfillment,
    },
  ];

  return (
    <Layout className="mochi-texture" lang={lang}>
      {/* Language Toggle */}
      <div className="fixed top-8 right-8 z-50">
        <MochiButton
          variant="secondary"
          size="sm"
          className="gap-2 rounded-full border-white/60 shadow-xl"
          onClick={() => setLocation(lang === "en" ? "/ja/what-i-do" : "/en/what-i-do")}
        >
          <Languages className="w-4 h-4 text-primary" />
          {lang === "en" ? "日本語" : "English"}
        </MochiButton>
      </div>

      {/* Hero Section */}
      <section className="pt-12 pb-24 md:pt-24 md:pb-32">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/60 backdrop-blur-xl border border-white/80 text-[10px] font-black text-primary uppercase tracking-[0.2em] shadow-lg">
            <Sparkles className="w-3.5 h-3.5 fill-primary/20" />
            {lang === "en" ? "Services" : "サービス"}
          </div>

          <h1 className="text-5xl md:text-7xl font-[900] text-foreground tracking-tighter leading-[0.95]">
            {t.title}
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium max-w-3xl mx-auto">
            {t.intro}
          </p>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-16">{t.solutionsTitle}</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {solutionCards.map((solution, i) => (
            <MochiCard key={solution.key} className="p-8 space-y-6 group hover:-translate-y-2 transition-all duration-500">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                  {solution.icon}
                </div>
                <div>
                  <h3 className="text-lg font-black leading-tight">{solution.data.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{solution.data.subtitle}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-5 bg-destructive/10 rounded-xl border border-destructive/20">
                  <p className="text-base font-semibold text-destructive/90 leading-relaxed">
                    <span className="font-black">Before:</span> {solution.data.before}
                  </p>
                </div>

                <div className="p-5 bg-primary/10 rounded-xl border border-primary/20">
                  <p className="text-base font-black text-primary mb-2">{solution.data.afterTitle}</p>
                  <p className="text-base text-foreground/90 font-medium leading-relaxed">{solution.data.afterBody}</p>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-black text-muted-foreground uppercase tracking-wider">
                    Tech Stack
                  </p>
                  <p className="text-base text-foreground font-medium mt-2">{solution.data.tech}</p>
                </div>
              </div>
            </MochiCard>
          ))}
        </div>
      </section>

      {/* Transformation Section */}
      <section className="py-24 bg-white/30 backdrop-blur-xl rounded-[4rem] border border-white/60 shadow-inner">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-16">{t.transformationTitle}</h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 px-8">
          {/* Chaos */}
          <div className="text-center space-y-4 flex-1 max-w-xs">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-destructive/20 flex items-center justify-center border-2 border-destructive/30 rotate-6">
              <Zap className="w-12 h-12 text-destructive/70" />
            </div>
            <h3 className="text-2xl font-black text-destructive/80">{t.chaos}</h3>
            <p className="text-muted-foreground font-medium">{t.chaosDesc}</p>
          </div>

          {/* Arrow */}
          <div className="flex items-center gap-4">
            <ArrowRightLeft className="w-8 h-8 text-primary hidden md:block" />
            <div className="text-xl font-black text-primary whitespace-nowrap">{t.arrow}</div>
          </div>

          {/* Order */}
          <div className="text-center space-y-4 flex-1 max-w-xs">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-primary/20 flex items-center justify-center border-2 border-primary/30 -rotate-6">
              <Sparkles className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-2xl font-black text-primary">{t.order}</h3>
            <p className="text-muted-foreground font-medium">{t.orderDesc}</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 text-center space-y-8">
        <h2 className="text-4xl md:text-5xl font-black">{t.ctaTitle}</h2>
        <p className="text-xl text-muted-foreground font-medium max-w-lg mx-auto">{t.ctaText}</p>
        <MochiButton size="lg" className="group" onClick={() => setLocation(`/${lang}/contact`)}>
          {t.ctaButton} <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </MochiButton>
      </section>
    </Layout>
  );
}
