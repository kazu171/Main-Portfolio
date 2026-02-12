'use client';

import { useRouter } from 'next/navigation';
import { MochiCard } from "@/components/ui/mochi-card";
import { MochiButton } from "@/components/ui/mochi-button";
import { ArrowRight, MessageSquare, FileSpreadsheet, Users, Sparkles, Zap, ArrowRightLeft, ChevronDown } from "lucide-react";
import { useState } from 'react';

const translations = {
  en: {
    title: 'Marketing Ops & Automation',
    intro: "I automate your winning business patterns with n8n and AI. My systems handle inquiries, invoicing, content creation, and customer follow-ups — reducing manual work by 60+ hours monthly while keeping you in control of strategy.",
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
    casesButton: 'View Real Examples',
    faqTitle: 'Frequently Asked Questions',
    ctaTitle: 'Ready to Automate?',
    ctaText: 'Tell me your current flow exactly as it is.',
    ctaButton: 'Start the Conversation',
  },
  ja: {
    title: 'マーケティングオペレーション & 自動化',
    intro: "n8nとAIであなたの勝ちパターンを自動化。問い合わせ対応、請求書発行、コンテンツ制作、顧客フォローアップをシステム化し、月60時間以上の手作業を削減。戦略はあなたがコントロール。",
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
    casesButton: '具体的な事例を見る',
    faqTitle: 'よくある質問',
    ctaTitle: '自動化の準備はできましたか？',
    ctaText: '現在のフローをそのまま教えてください。',
    ctaButton: '相談を始める',
  },
};

export const faqContent = {
  en: [
    {
      question: 'What is n8n automation and how does it help solopreneurs?',
      answer: 'n8n is an open-source workflow automation platform that connects your business tools (Gmail, Sheets, Stripe, OpenAI) without code. For solopreneurs, it eliminates repetitive tasks like data entry, follow-up emails, and invoice generation — typically saving 60+ hours monthly.',
    },
    {
      question: 'How long does it take to set up an automation system?',
      answer: 'Most automation projects take 2-4 weeks from initial consultation to deployment. Simple workflows (like email automation) can be live in a week, while complex multi-step systems with AI integration typically require 3-4 weeks for proper testing.',
    },
    {
      question: 'Do I need technical skills to use the automated systems?',
      answer: 'No technical skills required. I design systems that work within your existing tools (Gmail, Sheets, Slack). You continue using familiar interfaces while automation handles the backend. I also provide simple documentation and training.',
    },
    {
      question: 'What happens if something breaks or needs to change?',
      answer: 'All my automation packages include monthly maintenance and monitoring. I proactively fix issues before they affect your business and handle updates when your tools change their APIs. You also get priority support for urgent issues.',
    },
    {
      question: 'How much does automation cost compared to hiring staff?',
      answer: 'A typical automation system costs 3-6 months of a part-time employee salary as one-time setup, then minimal monthly maintenance. Unlike staff, automation works 24/7 without sick days, errors from fatigue, or training overhead.',
    },
    {
      question: 'Can AI really handle customer inquiries professionally?',
      answer: 'Yes, with proper setup. I train AI on your past successful interactions, brand voice, and edge cases. The AI handles 80% of routine inquiries while flagging complex cases for your personal attention. Many clients report improved response times and customer satisfaction.',
    },
  ],
  ja: [
    {
      question: 'n8n自動化とは何ですか？一人法人にどう役立ちますか？',
      answer: 'n8nはオープンソースのワークフロー自動化プラットフォームで、ビジネスツール（Gmail、Sheets、Stripe、OpenAI）をコード不要で連携します。一人法人にとっては、データ入力、フォローアップメール、請求書作成などの繰り返し作業を排除し、通常月60時間以上を節約できます。',
    },
    {
      question: '自動化システムの構築にはどのくらい時間がかかりますか？',
      answer: 'ほとんどの自動化プロジェクトは、初回相談から導入まで2〜4週間です。シンプルなワークフロー（メール自動化など）は1週間で稼働可能、AI統合を含む複雑なマルチステップシステムは適切なテストのため通常3〜4週間必要です。',
    },
    {
      question: '自動化システムを使うのに技術スキルは必要ですか？',
      answer: '技術スキルは不要です。既存のツール（Gmail、Sheets、Slack）内で機能するシステムを設計します。使い慣れたインターフェースを引き続き使用しながら、バックエンドは自動化が処理します。簡単なドキュメントとトレーニングも提供します。',
    },
    {
      question: '何か壊れたり変更が必要な場合はどうなりますか？',
      answer: 'すべての自動化パッケージには月次メンテナンスとモニタリングが含まれています。問題がビジネスに影響する前に事前に修正し、ツールのAPI変更時もアップデートを対応します。緊急の問題には優先サポートも受けられます。',
    },
    {
      question: '自動化のコストはスタッフ雇用と比べてどうですか？',
      answer: '典型的な自動化システムは、パートタイム従業員の給与3〜6ヶ月分を一度きりの初期費用として、その後は最小限の月次メンテナンス費用です。スタッフと違い、自動化は病欠なし、疲労によるミスなし、研修オーバーヘッドなしで24時間365日稼働します。',
    },
    {
      question: 'AIは本当に顧客問い合わせをプロフェッショナルに対応できますか？',
      answer: 'はい、適切なセットアップがあれば可能です。過去の成功したやり取り、ブランドボイス、エッジケースでAIをトレーニングします。AIは定型的な問い合わせの80%を処理し、複雑なケースはあなたの個人的な対応のためにフラグを立てます。多くのクライアントが応答時間と顧客満足度の向上を報告しています。',
    },
  ],
};

interface WhatIDoContentProps {
  locale: 'en' | 'ja';
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MochiCard
      className="p-6 cursor-pointer hover:-translate-y-1 transition-all duration-300"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-black text-foreground leading-relaxed">{question}</h3>
        <ChevronDown className={`w-5 h-5 text-primary shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && (
        <p className="mt-4 text-muted-foreground font-medium leading-relaxed">
          {answer}
        </p>
      )}
    </MochiCard>
  );
}

export function WhatIDoContent({ locale }: WhatIDoContentProps) {
  const router = useRouter();
  const t = translations[locale];
  const faqs = faqContent[locale];

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
    <div className="min-h-screen w-full flex flex-col items-center mochi-texture">
      <main className="w-full max-w-6xl px-6 pb-20">
        {/* Hero Section */}
        <section className="pt-24 pb-24 md:pt-32 md:pb-32">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/60 backdrop-blur-xl border border-white/80 text-[10px] font-black text-primary uppercase tracking-[0.2em] shadow-lg">
              <Sparkles className="w-3.5 h-3.5 fill-primary/20" />
              {locale === "en" ? "Services" : "サービス"}
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

          <div className="mt-12 text-center">
            <MochiButton
              variant="secondary"
              size="lg"
              className="group"
              onClick={() => router.push(`/${locale}/cases`)}
            >
              {t.casesButton} <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </MochiButton>
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

        {/* FAQ Section */}
        <section className="py-20">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12">{t.faqTitle}</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-black">{t.ctaTitle}</h2>
          <p className="text-xl text-muted-foreground font-medium max-w-lg mx-auto">{t.ctaText}</p>
          <MochiButton size="lg" className="group" onClick={() => router.push(`/${locale}/contact`)}>
            {t.ctaButton} <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </MochiButton>
        </section>
      </main>
    </div>
  );
}
