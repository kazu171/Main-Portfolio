'use client';

import { use } from 'react';

import { useRouter } from 'next/navigation';
import { MochiCard } from "@/components/ui/mochi-card";
import { MochiButton } from "@/components/ui/mochi-button";
import { Shield } from "lucide-react";

const translations = {
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: February 2026',
    sections: {
      introduction: {
        title: 'Introduction',
        body: 'This Privacy Policy describes how Kazuya Hibara ("I", "me", or "my") collects, uses, and protects your personal information when you visit this website or use my services.',
      },
      collection: {
        title: 'Information I Collect',
        providedTitle: 'Information You Provide',
        providedIntro: 'When you contact me through the contact form, I collect:',
        providedItems: [
          'Name',
          'Email address',
          'Business information you choose to share',
          'Information about your current workflows and challenges',
          'Your preferred contact method',
        ],
        automaticTitle: 'Automatically Collected Information',
        automaticIntro: 'When you visit this website, I may automatically collect certain information about your device and usage, including:',
        automaticItems: [
          'IP address',
          'Browser type and version',
          'Pages visited and time spent',
          'Referring website',
        ],
      },
      use: {
        title: 'How I Use Your Information',
        intro: 'I use the information I collect to:',
        items: [
          'Respond to your inquiries and consultation requests',
          'Provide the services you request',
          'Improve this website and my services',
          'Send relevant communications (with your consent)',
        ],
      },
      sharing: {
        title: 'Sharing Your Information',
        intro: 'I do not sell, trade, or rent your personal information to third parties. I may share your information only in the following circumstances:',
        items: [
          'With service providers who assist in operating this website',
          'When required by law or to protect legal rights',
          'With your explicit consent',
        ],
      },
      security: {
        title: 'Data Security',
        body: 'I implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and I cannot guarantee absolute security.',
      },
      rights: {
        title: 'Your Rights',
        intro: 'You have the right to:',
        items: [
          'Access the personal information I hold about you',
          'Request correction of inaccurate information',
          'Request deletion of your information',
          'Withdraw consent for data processing',
        ],
      },
      cookies: {
        title: 'Cookies',
        body: 'This website may use cookies to enhance your browsing experience. You can set your browser to refuse cookies, though this may affect some website functionality.',
      },
      contact: {
        title: 'Contact',
        body: 'If you have questions about this Privacy Policy or wish to exercise your rights, please contact me through the contact form on this website.',
      },
      changes: {
        title: 'Changes to This Policy',
        body: 'I may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.',
      },
    },
  },
  ja: {
    title: 'プライバシーポリシー',
    lastUpdated: '最終更新日: 2026年2月',
    sections: {
      introduction: {
        title: 'はじめに',
        body: 'このプライバシーポリシーは、桧原和也（以下「私」）がこのウェブサイトを訪問した際、またはサービスを利用した際に、どのように個人情報を収集、使用、保護するかを説明します。',
      },
      collection: {
        title: '収集する情報',
        providedTitle: 'ご提供いただく情報',
        providedIntro: 'お問い合わせフォームを通じてご連絡いただく際、以下の情報を収集します：',
        providedItems: [
          'お名前',
          'メールアドレス',
          'ご共有いただくビジネス情報',
          '現在のワークフローと課題に関する情報',
          'ご希望の連絡方法',
        ],
        automaticTitle: '自動的に収集される情報',
        automaticIntro: 'このウェブサイトを訪問した際、デバイスと利用状況に関する特定の情報を自動的に収集する場合があります：',
        automaticItems: [
          'IPアドレス',
          'ブラウザの種類とバージョン',
          '閲覧したページと滞在時間',
          '参照元ウェブサイト',
        ],
      },
      use: {
        title: '情報の利用目的',
        intro: '収集した情報は以下の目的で利用します：',
        items: [
          'お問い合わせやコンサルテーションの依頼への対応',
          'ご依頼のサービス提供',
          'このウェブサイトとサービスの改善',
          '関連する情報の送信（同意がある場合）',
        ],
      },
      sharing: {
        title: '情報の共有',
        intro: '個人情報を第三者に販売、交換、レンタルすることはありません。以下の場合にのみ情報を共有することがあります：',
        items: [
          'このウェブサイトの運営を支援するサービスプロバイダー',
          '法律で要求される場合、または法的権利を保護するため',
          'お客様の明示的な同意がある場合',
        ],
      },
      security: {
        title: 'データセキュリティ',
        body: '個人情報を保護するために適切なセキュリティ対策を実施しています。ただし、インターネット上での送信方法は100%安全ではなく、絶対的なセキュリティを保証することはできません。',
      },
      rights: {
        title: 'お客様の権利',
        intro: 'お客様には以下の権利があります：',
        items: [
          '保有する個人情報へのアクセス',
          '不正確な情報の訂正依頼',
          '情報の削除依頼',
          'データ処理への同意の撤回',
        ],
      },
      cookies: {
        title: 'クッキー',
        body: 'このウェブサイトでは、ブラウジング体験を向上させるためにクッキーを使用する場合があります。ブラウザでクッキーを拒否する設定ができますが、一部の機能に影響が出る場合があります。',
      },
      contact: {
        title: 'お問い合わせ',
        body: 'このプライバシーポリシーについてご質問がある場合、または権利を行使したい場合は、このウェブサイトのお問い合わせフォームからご連絡ください。',
      },
      changes: {
        title: 'ポリシーの変更',
        body: 'このプライバシーポリシーは随時更新される場合があります。変更があった場合は、改訂日を更新してこのページに掲載します。',
      },
    },
  },
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section = ({ title, children }: SectionProps) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-black text-foreground">{title}</h2>
    {children}
  </div>
);

interface ListItemsProps {
  items: string[];
}

const ListItems = ({ items }: ListItemsProps) => (
  <ul className="space-y-2 pl-6">
    {items.map((item, i) => (
      <li key={i} className="list-disc text-foreground/80 font-medium">{item}</li>
    ))}
  </ul>
);

export default function Privacy({ params }: { params: Promise<{ locale: 'en' | 'ja' }> }) {
  const { locale } = use(params);
  const router = useRouter();
  const t = translations[locale];
  const s = t.sections;

  return (
    <div className="min-h-screen w-full flex flex-col items-center mochi-texture">
      <main className="w-full max-w-6xl px-6 pb-20">
        {/* Hero Section */}
        <section className="pt-24 pb-16 md:pt-32 md:pb-20">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/60 backdrop-blur-xl border border-white/80 text-[10px] font-black text-primary uppercase tracking-[0.2em] shadow-lg">
              <Shield className="w-3.5 h-3.5" />
              {locale === "en" ? "Legal" : "法的情報"}
            </div>

            <h1 className="text-5xl md:text-7xl font-[900] text-foreground tracking-tighter leading-[0.95]">
              {t.title}
            </h1>

            <p className="text-muted-foreground font-medium">
              {t.lastUpdated}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="pb-24">
          <MochiCard className="p-8 md:p-12 max-w-4xl mx-auto space-y-12">
            {/* Introduction */}
            <Section title={s.introduction.title}>
              <p className="text-foreground/80 font-medium leading-relaxed">{s.introduction.body}</p>
            </Section>

            {/* Collection */}
            <Section title={s.collection.title}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-black mb-2">{s.collection.providedTitle}</h3>
                  <p className="text-foreground/80 font-medium mb-3">{s.collection.providedIntro}</p>
                  <ListItems items={s.collection.providedItems} />
                </div>
                <div>
                  <h3 className="text-lg font-black mb-2">{s.collection.automaticTitle}</h3>
                  <p className="text-foreground/80 font-medium mb-3">{s.collection.automaticIntro}</p>
                  <ListItems items={s.collection.automaticItems} />
                </div>
              </div>
            </Section>

            {/* Use */}
            <Section title={s.use.title}>
              <p className="text-foreground/80 font-medium mb-3">{s.use.intro}</p>
              <ListItems items={s.use.items} />
            </Section>

            {/* Sharing */}
            <Section title={s.sharing.title}>
              <p className="text-foreground/80 font-medium mb-3">{s.sharing.intro}</p>
              <ListItems items={s.sharing.items} />
            </Section>

            {/* Security */}
            <Section title={s.security.title}>
              <p className="text-foreground/80 font-medium leading-relaxed">{s.security.body}</p>
            </Section>

            {/* Rights */}
            <Section title={s.rights.title}>
              <p className="text-foreground/80 font-medium mb-3">{s.rights.intro}</p>
              <ListItems items={s.rights.items} />
            </Section>

            {/* Cookies */}
            <Section title={s.cookies.title}>
              <p className="text-foreground/80 font-medium leading-relaxed">{s.cookies.body}</p>
            </Section>

            {/* Contact */}
            <Section title={s.contact.title}>
              <p className="text-foreground/80 font-medium leading-relaxed">{s.contact.body}</p>
            </Section>

            {/* Changes */}
            <Section title={s.changes.title}>
              <p className="text-foreground/80 font-medium leading-relaxed">{s.changes.body}</p>
            </Section>
          </MochiCard>
        </section>

        {/* Back Link */}
        <section className="pb-16 text-center">
          <MochiButton
            variant="secondary"
            onClick={() => router.push(`/${locale}`)}
          >
            {locale === "en" ? "← Back to Home" : "← ホームに戻る"}
          </MochiButton>
        </section>
      </main>
    </div>
  );
}
