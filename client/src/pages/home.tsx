import { useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { MochiCard } from "@/components/ui/mochi-card";
import { MochiButton } from "@/components/ui/mochi-button";
import chibiCharacter from "@assets/generated_images/cute_3d_chibi_character_sitting_on_a_mochi_cloud.png";
import { ArrowRight, Heart, Sparkles, Smile, Star, Languages } from "lucide-react";

type Content = {
  badge: string;
  title1: string;
  title2: string;
  heroDesc: string;
  btnStart: string;
  btnSpecs: string;
  phiTitle: string;
  phiDesc: string;
  cards: { title: string; desc: string }[];
  showcaseTitle: string;
  showcaseDesc: string;
  showcaseBtn: string;
};

const translations: Record<"en" | "ja", Content> = {
  en: {
    badge: "The Soft Tech Era",
    title1: "Delightfully",
    title2: "Squishy",
    heroDesc: "Interfaces that feel like a warm hug. Soft, springy, and wonderfully alive.",
    btnStart: "Start Exploring",
    btnSpecs: "See the Details",
    phiTitle: "Made to Be Touched",
    phiDesc: "We blend the depth of clay with the clarity of glass—creating surfaces that invite your fingertips.",
    cards: [
      { title: "Gentle by Design", desc: "No harsh edges here. Just soft curves and colors that feel like home." },
      { title: "Lit from Within", desc: "Subtle inner glow mimics the way light passes through real mochi." },
      { title: "Spring in Every Click", desc: "Interactions that bounce back—responsive, playful, satisfying." }
    ],
    showcaseTitle: "The Joy of Low Rebound",
    showcaseDesc: "Buttons that yield like a soft pillow. Our mochi-bounce physics delivers that perfect, satisfying give.",
    showcaseBtn: "Go Ahead, Press"
  },
  ja: {
    badge: "やわらかいテクノロジー",
    title1: "ふれたくなる",
    title2: "やさしさ",
    heroDesc: "冷たいはずの画面が、なぜかあたたかい。ぷにっと押したくなる、人肌のインターフェース。",
    btnStart: "体験する",
    btnSpecs: "くわしく見る",
    phiTitle: "ふれることから、はじまる",
    phiDesc: "透明感と、もちもちの弾力. ガラスのようにクリアで、お餅のようにやわらかい、新しい手ざわりです。",
    cards: [
      { title: "まるい、やさしい", desc: "とがったものは、ひとつもない。曲線と、ぬくもりのある色だけ。" },
      { title: "内側から、ほのかに", desc: "光が奥からにじみ出るような、本物のお餅みたいな透け感。" },
      { title: "押すと、もどってくる", desc: "ぽよん、と返ってくる心地よさ。すべてに弾力を。" }
    ],
    showcaseTitle: "低反発の、ここちよさ",
    showcaseDesc: "やわらかい枕に指が沈むような、ボタン。押した感触が、ちゃんと返ってくる。",
    showcaseBtn: "押してみて"
  }
};

interface HomeProps {
  lang: "en" | "ja";
}

export default function Home({ lang }: HomeProps) {
  const [, setLocation] = useLocation();
  const t = translations[lang];

  return (
    <Layout className="mochi-texture" lang={lang}>
      {/* Language Toggle */}
      <div className="fixed top-8 right-8 z-50">
        <MochiButton 
          variant="secondary" 
          size="sm" 
          className="gap-2 rounded-full border-white/60 shadow-xl"
          onClick={() => setLocation(lang === "en" ? "/ja" : "/en")}
        >
          <Languages className="w-4 h-4 text-primary" />
          {lang === "en" ? "日本語" : "English"}
        </MochiButton>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 md:pt-24 md:pb-40 flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 space-y-10 z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/60 backdrop-blur-xl border border-white/80 text-[10px] font-black text-primary uppercase tracking-[0.2em] shadow-lg floating">
            <Sparkles className="w-3.5 h-3.5 fill-primary/20" />
            {t.badge}
          </div>
          
          <h1 className="text-6xl md:text-8xl font-[900] text-foreground tracking-tighter leading-[0.9] text-shadow-sm">
            {t.title1} <br/>
            <span className="text-primary relative inline-block">
              {t.title2}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-lg font-medium">
            {t.heroDesc}
          </p>
          
          <div className="flex flex-wrap gap-6 pt-6 justify-center md:justify-start">
            <MochiButton size="lg" className="group">
              {t.btnStart} <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </MochiButton>
            <MochiButton variant="secondary" size="lg">
              {t.btnSpecs}
            </MochiButton>
          </div>
        </div>

        <div className="flex-1 relative w-full max-w-xl aspect-square flex items-center justify-center">
           {/* Glow background */}
           <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full scale-150" />
           
           {/* Glass Panel Background */}
           <div className="absolute inset-0 bg-white/20 backdrop-blur-3xl rounded-[4rem] border border-white/40 shadow-xl" />
           
           <div className="relative z-10 w-full h-full p-8 floating flex items-center justify-center">
             {/* Chibi Character Overlay */}
             <div className="w-3/4 h-3/4 animate-[floating_10s_infinite_ease-in-out_2s]">
               <img 
                 src={chibiCharacter} 
                 alt="Cute Chibi Character" 
                 className="w-full h-full object-contain drop-shadow-xl"
               />
             </div>
           </div>
           
           {/* Interactive Squishy Elements */}
           <MochiCard className="absolute -bottom-10 right-0 md:right-10 w-72 z-20 scale-110 animate-[floating_8s_infinite_ease-in-out_1s]">
             <div className="flex items-center gap-5 mb-4">
               <div className="w-14 h-14 rounded-3xl bg-primary flex items-center justify-center text-white shadow-inner">
                 <Heart className="w-7 h-7 fill-current" />
               </div>
               <div>
                 <h3 className="font-black text-lg">Mochi-ness</h3>
                 <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Tactile Score: 99%</p>
               </div>
             </div>
             <div className="h-4 w-full bg-secondary rounded-full overflow-hidden shadow-inner">
               <div className="h-full w-[90%] bg-primary rounded-full animate-[pulse_3s_infinite]" />
             </div>
           </MochiCard>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">{t.phiTitle}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
            {t.phiDesc}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {t.cards.map((item, i) => (
            <MochiCard key={i} className="group hover:-translate-y-4 transition-all duration-500 text-center py-12 px-10">
              <div className="w-20 h-20 rounded-[2.5rem] bg-secondary flex items-center justify-center text-primary mb-8 mx-auto shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform">
                {[<Smile className="w-8 h-8" />, <Sparkles className="w-8 h-8" />, <Star className="w-8 h-8" />][i]}
              </div>
              <h3 className="text-2xl font-black mb-4">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed font-medium">{item.desc}</p>
            </MochiCard>
          ))}
        </div>
      </section>

      {/* Squishy Button Showcase */}
      <section className="py-24 bg-white/30 backdrop-blur-xl rounded-[4rem] border border-white/60 shadow-inner px-12 overflow-hidden">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl font-black leading-tight">{t.showcaseTitle}</h2>
            <p className="text-muted-foreground text-lg font-medium leading-relaxed">
              {t.showcaseDesc}
            </p>
            <div className="flex gap-4">
               <MochiButton variant="secondary" className="px-12">{t.showcaseBtn}</MochiButton>
               <MochiButton size="icon" className="rounded-full"><Smile /></MochiButton>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-6 scale-110">
            <div className="space-y-6 pt-12">
              <div className="h-40 bg-primary/20 rounded-[3rem] border-4 border-white/60 shadow-xl floating" />
              <div className="h-24 bg-white/60 rounded-[2rem] border-2 border-white shadow-lg" />
            </div>
            <div className="space-y-6">
              <div className="h-24 bg-white/60 rounded-[2rem] border-2 border-white shadow-lg" />
              <div className="h-40 bg-secondary rounded-[3rem] border-4 border-white/60 shadow-xl floating [animation-delay:1s]" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
