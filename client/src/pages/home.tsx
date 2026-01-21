import { Layout } from "@/components/layout";
import { MochiCard } from "@/components/ui/mochi-card";
import { MochiButton } from "@/components/ui/mochi-button";
import chibiCharacter from "@assets/generated_images/cute_3d_chibi_character_sitting_on_a_mochi_cloud.png";
import { ArrowRight, Heart, Sparkles, Smile, Star } from "lucide-react";

export default function Home() {
  return (
    <Layout className="mochi-texture">
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 md:pt-24 md:pb-40 flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 space-y-10 z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/60 backdrop-blur-xl border border-white/80 text-[10px] font-black text-primary uppercase tracking-[0.2em] shadow-lg floating">
            <Sparkles className="w-3.5 h-3.5 fill-primary/20" />
            Soft Tech Era
          </div>
          
          <h1 className="text-6xl md:text-8xl font-[900] text-foreground tracking-tighter leading-[0.9] text-shadow-sm">
            Squishy <br/>
            <span className="text-primary relative inline-block">
              Design
              <div className="absolute -right-8 -top-8 animate-pulse">
                <Star className="w-8 h-8 fill-primary text-primary" />
              </div>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-lg font-medium">
            Interfaces that feel like a warm hug. 
            Tactile, bouncy, and delightfully human.
          </p>
          
          <div className="flex flex-wrap gap-6 pt-6 justify-center md:justify-start">
            <MochiButton size="lg" className="group">
              Get Started <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </MochiButton>
            <MochiButton variant="secondary" size="lg">
              View Specs
            </MochiButton>
          </div>
        </div>

        <div className="flex-1 relative w-full max-w-xl aspect-square flex items-center justify-center">
           {/* Glow background */}
           <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full scale-150" />
           
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
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">Built to be Touched</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
            We've combined deep claymorphism with soft glass for a unique 3D feel.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: <Smile className="w-8 h-8" />, title: "Friendly UI", desc: "No sharp edges, just soft curves and warm colors." },
            { icon: <Sparkles className="w-8 h-8" />, title: "Inner Glow", desc: "Subsurface scattering effects for a realistic mochi look." },
            { icon: <Star className="w-8 h-8" />, title: "Bounce Logic", desc: "Every interaction is springy and responsive." }
          ].map((item, i) => (
            <MochiCard key={i} className="group hover:-translate-y-4 transition-all duration-500 text-center py-12 px-10">
              <div className="w-20 h-20 rounded-[2.5rem] bg-secondary flex items-center justify-center text-primary mb-8 mx-auto shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform">
                {item.icon}
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
            <h2 className="text-4xl font-black">Low Rebound <br/>Interaction</h2>
            <p className="text-muted-foreground text-lg font-medium leading-relaxed">
              Experience buttons that feel like pressing into a soft pillow. 
              Our "Mochi-Bounce" physics provides satisfying tactile feedback.
            </p>
            <div className="flex gap-4">
               <MochiButton variant="secondary" className="px-12">Press Me</MochiButton>
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
