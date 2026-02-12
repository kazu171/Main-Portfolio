'use client';

import { use } from 'react';

import { useRouter } from 'next/navigation';
import { MochiCard } from "@/components/ui/mochi-card";
import { MochiButton } from "@/components/ui/mochi-button";
import { ArrowRight, Sparkles, Heart, Zap, Eye, Users, Code, Lightbulb, Search, CheckCircle, ShoppingCart, Handshake } from "lucide-react";

const translations = {
  en: {
    title: 'About Me',
    lead: 'AI Marketing Engineer / Marketer',
    tagline: '"The person who breaks through one-person limits with systems."',
    introTitle: "Hi, I'm Kazu.",
    introBody: [
      "I'm a marketing operations specialist who builds automation systems for solo business owners. I transform manual winning patterns into AI-powered workflows using n8n, helping clients save 60+ hours monthly and focus on growth strategy.",
      'Through designing and operating marketing strategies, and building the backend workflows (n8n / Google Tools / LLM), I settled into the position of an "Engineer who understands the field."',
      'Rather than launching temporary "attraction campaigns," I love the process of turning winning patterns into "reproducible systems."',
      'I excel at implementing "asset-based flows"—systems that keep working even while you rest.',
    ],
    conceptTitle: 'Main Concept',
    conceptStatement: 'Break Through the Limits of a One-Person Business with Systems.',
    conceptBody: 'I implement your "winning formula" into a system that operates 24 hours a day.',
    automationTitle: 'Automation is not about mindlessness.',
    automationBody: 'I do not offer "build-it-and-forget-it" automation. I design systems with "margin" regarding operations, allowing you to refine your product and strategy.',
    feedbackBody: 'I value feedback. I build systems where the data you need to make better business decisions naturally gathers through daily operations.',
    marketerTitle: 'My Stance as a Marketer',
    marketerIntro: 'I love AI and automation technology. However, I absolutely refuse to "introduce tools for the sake of tools."',
    marketerPriority: 'What I prioritize above all is increasing the resolution of the "Winning Formula" that is already working in your business.',
    journeyAnalysis: [
      { title: 'Awareness:', description: 'Where did they find you, and why did they stop?' },
      { title: 'Trust:', description: 'Which words resonated and made them feel "this person is trustworthy"?' },
      { title: 'Consideration:', description: 'What are they hesitating about right before applying (Bottlenecks)?' },
      { title: 'Action:', description: 'What was the "final push" (Trigger)?' },
    ],
    marketerConclusion: 'I design systems only after clarifying this "flow that sells because it works." Otherwise, the moment you automate, the customer\'s heart will drift away.',
    marketerOutro: 'I do not introduce complex workflows or non-essential tools. I polish your built-up "winning formula" into a robust system that runs 24/7.',
    engineerTitle: 'My Stance as an Engineer',
    engineerIntro: "I manage the entire technical backend (n8n, API, LLM, etc.) under my responsibility. You don't need to worry about code or tool specification changes.",
    engineerAnalogy: 'Think of it as hiring a "Monthly Systems Department." You just use the stable functions.',
    simplicityTitle: 'Simplicity and Clarity',
    simplicityBody: 'As an engineer, I am most particular about "Simplicity and Clarity."',
    simplicityLogs: 'Instead of showing maniacal logs, I prioritize reports that show the status at a glance and visuals that are intuitive.',
    simplicityLearn: "You don't need to learn new tools or admin screens.",
    simplicityExperience: 'I prioritize implementing an experience within your usual workflow where "processing advances automatically without adding extra screens or effort."',
    partnershipTitle: 'The Atmosphere of Our Partnership',
    partnershipIntro: 'I want to be involved not as a high-and-mighty consultant, but with the distance of an "external member who understands the field."',
    partnershipSpecs: "I don't need 100% complete specifications or fancy documents.",
    partnershipSearch: 'While looking at rough notes or the screens you actually use, we will search together for: "Wait, doesn\'t a human need to do this part anymore?"',
    partnershipCta: 'Start small, and if it doesn\'t fit, stop. I would be happy if you could consult with me with that level of ease.',
  },
  ja: {
    title: '自己紹介',
    lead: 'AIマーケティングエンジニア / マーケター',
    tagline: '「一人ビジネスの限界を、仕組みで突破する人。」',
    introTitle: 'こんにちは、カズです。',
    introBody: [
      "一人法人向け自動化システムを構築するマーケティングオペレーション専門家。手動の勝ちパターンをn8nとAIワークフローに変換し、クライアントが月60時間以上を節約して成長戦略に集中できるよう支援。",
      'マーケティング戦略の設計・運用、バックエンドワークフロー（n8n / Googleツール / LLM）の構築を通じて、「現場がわかるエンジニア」というポジションに落ち着きました。',
      '一時的な「集客キャンペーン」を打つよりも、勝ちパターンを「再現可能なシステム」に変えるプロセスが好きです。',
      '「アセット型のフロー」の実装が得意です—あなたが休んでいる間も動き続けるシステム。',
    ],
    conceptTitle: 'メインコンセプト',
    conceptStatement: '一人ビジネスの限界を、仕組みで突破する。',
    conceptBody: '「勝ちパターン」を24時間稼働するシステムに実装します。',
    automationTitle: '自動化は、思考停止ではない。',
    automationBody: '「作って終わり」の自動化は提供しません。運用面で「余白」を持ったシステムを設計し、プロダクトや戦略を磨く余地を残します。',
    feedbackBody: 'フィードバックを大切にします。日々の運用を通じて、より良いビジネス判断に必要なデータが自然に集まる仕組みを作ります。',
    marketerTitle: 'マーケターとしてのスタンス',
    marketerIntro: 'AIや自動化技術が大好きです。しかし、「ツールのためのツール導入」は絶対にしません。',
    marketerPriority: '何よりも優先するのは、あなたのビジネスですでにうまくいっている「勝ちパターン」の解像度を上げること。',
    journeyAnalysis: [
      { title: '認知：', description: 'どこであなたを見つけ、なぜ立ち止まったのか？' },
      { title: '信頼：', description: 'どの言葉が響き、「この人なら信頼できる」と感じさせたのか？' },
      { title: '検討：', description: '申し込み直前で何を躊躇しているのか（ボトルネック）？' },
      { title: '行動：', description: '「最後の一押し」は何だったのか（トリガー）？' },
    ],
    marketerConclusion: 'この「うまくいくから売れるフロー」を明確にしてから、システムを設計します。そうでなければ、自動化した瞬間に顧客の心は離れていきます。',
    marketerOutro: '複雑なワークフローや不要なツールは導入しません。積み上げてきた「勝ちパターン」を、24時間稼働する堅牢なシステムに磨き上げます。',
    engineerTitle: 'エンジニアとしてのスタンス',
    engineerIntro: '技術的なバックエンド（n8n, API, LLMなど）はすべて私の責任で管理します。コードやツール仕様の変更を心配する必要はありません。',
    engineerAnalogy: '「月額制のシステム部門を雇う」と考えてください。安定した機能を使うだけです。',
    simplicityTitle: 'シンプルさと明確さ',
    simplicityBody: 'エンジニアとして最もこだわるのは「シンプルさと明確さ」。',
    simplicityLogs: 'マニアックなログを見せるより、一目でステータスがわかるレポートと直感的なビジュアルを優先します。',
    simplicityLearn: '新しいツールや管理画面を覚える必要はありません。',
    simplicityExperience: '普段のワークフローの中で「余計な画面や手間を増やさず、処理が自動で進む」体験の実装を優先します。',
    partnershipTitle: 'お付き合いの雰囲気',
    partnershipIntro: '偉そうなコンサルタントとしてではなく、「現場がわかる外部メンバー」という距離感で関わりたい。',
    partnershipSpecs: '100%完璧な仕様書や、きれいなドキュメントは不要です。',
    partnershipSearch: 'ラフなメモや実際に使っている画面を見ながら、一緒に探していきます：「あれ、この部分、もう人がやらなくてよくない？」',
    partnershipCta: '小さく始めて、合わなければやめる。そのくらいの気軽さで相談していただけたら嬉しいです。',
  },
};

const journeyIcons = [
  <Eye className="w-5 h-5" />,
  <Heart className="w-5 h-5" />,
  <Search className="w-5 h-5" />,
  <ShoppingCart className="w-5 h-5" />,
];

export default function About({ params }: { params: Promise<{ locale: 'en' | 'ja' }> }) {
  const { locale } = use(params);
  const router = useRouter();
  const t = translations[locale];

  return (
    <div className="min-h-screen w-full flex flex-col items-center mochi-texture">
      <main className="w-full max-w-6xl px-6 pb-20">
        {/* Hero Section */}
        <section className="pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/60 backdrop-blur-xl border border-white/80 text-[10px] font-black text-primary uppercase tracking-[0.2em] shadow-lg">
              <Sparkles className="w-3.5 h-3.5 fill-primary/20" />
              {t.lead}
            </div>

            <h1 className="text-5xl md:text-7xl font-[900] text-foreground tracking-tighter leading-[0.95]">
              {t.title}
            </h1>

            <p className="text-2xl md:text-3xl text-primary font-black italic">
              {t.tagline}
            </p>
          </div>
        </section>

        {/* Intro Section */}
        <section className="pb-20">
          <MochiCard className="p-8 md:p-12">
            <h2 className="text-3xl font-black mb-8">{t.introTitle}</h2>
            <div className="space-y-6">
              {t.introBody.map((paragraph, i) => (
                <p key={i} className="text-lg text-foreground/80 font-medium leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </MochiCard>
        </section>

        {/* Main Concept Section */}
        <section className="py-20 bg-white/30 backdrop-blur-xl rounded-[4rem] border border-white/60 shadow-inner px-8 md:px-12 mb-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-black">{t.conceptTitle}</h2>
            <p className="text-4xl md:text-5xl font-[900] text-primary leading-tight">
              {t.conceptStatement}
            </p>
            <p className="text-xl text-muted-foreground font-medium">
              {t.conceptBody}
            </p>
          </div>
        </section>

        {/* Automation Philosophy */}
        <section className="pb-20">
          <MochiCard className="p-8 md:p-12 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                <Zap className="w-7 h-7" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black">{t.automationTitle}</h2>
            </div>

            <div className="space-y-6 pl-0 md:pl-18">
              <p className="text-lg text-foreground/80 font-medium leading-relaxed">
                {t.automationBody}
              </p>
              <p className="text-lg text-foreground/80 font-medium leading-relaxed">
                {t.feedbackBody}
              </p>
            </div>
          </MochiCard>
        </section>

        {/* Marketer Stance */}
        <section className="pb-20">
          <MochiCard className="p-8 md:p-12 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                <Heart className="w-7 h-7" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black">{t.marketerTitle}</h2>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-foreground/80 font-medium leading-relaxed">
                {t.marketerIntro}
              </p>
              <p className="text-lg text-primary font-black">
                {t.marketerPriority}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                {t.journeyAnalysis.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-secondary/50 rounded-xl">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
                      {journeyIcons[i]}
                    </div>
                    <div>
                      <span className="font-black text-foreground">{item.title}</span>
                      <p className="text-sm text-muted-foreground font-medium mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-lg text-foreground/80 font-medium leading-relaxed">
                {t.marketerConclusion}
              </p>
              <p className="text-lg text-foreground/80 font-medium leading-relaxed">
                {t.marketerOutro}
              </p>
            </div>
          </MochiCard>
        </section>

        {/* Engineer Stance */}
        <section className="pb-20">
          <MochiCard className="p-8 md:p-12 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                <Code className="w-7 h-7" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black">{t.engineerTitle}</h2>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-foreground/80 font-medium leading-relaxed">
                {t.engineerIntro}
              </p>
              <p className="text-lg text-primary font-black italic">
                {t.engineerAnalogy}
              </p>

              <div className="bg-secondary/50 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Lightbulb className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-black">{t.simplicityTitle}</h3>
                </div>
                <p className="text-foreground/80 font-medium">{t.simplicityBody}</p>
                <ul className="space-y-3 pt-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground/80 font-medium">{t.simplicityLogs}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground/80 font-medium">{t.simplicityLearn}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground/80 font-medium">{t.simplicityExperience}</span>
                  </li>
                </ul>
              </div>
            </div>
          </MochiCard>
        </section>

        {/* Partnership Section */}
        <section className="pb-20">
          <MochiCard className="p-8 md:p-12 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                <Handshake className="w-7 h-7" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black">{t.partnershipTitle}</h2>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-foreground/80 font-medium leading-relaxed">
                {t.partnershipIntro}
              </p>
              <p className="text-lg text-foreground/80 font-medium leading-relaxed">
                {t.partnershipSpecs}
              </p>
              <p className="text-lg text-foreground/80 font-medium leading-relaxed">
                {t.partnershipSearch}
              </p>
              <p className="text-xl text-primary font-black text-center pt-4">
                {t.partnershipCta}
              </p>
            </div>
          </MochiCard>
        </section>

        {/* CTA Section */}
        <section className="py-16 text-center">
          <MochiButton size="lg" className="group" onClick={() => router.push(`/${locale}/contact`)}>
            {locale === "en" ? "Get in Touch" : "お問い合わせ"} <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </MochiButton>
        </section>
      </main>
    </div>
  );
}
