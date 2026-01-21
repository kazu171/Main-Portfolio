import { Layout } from "@/components/layout";
import { MochiCard } from "@/components/ui/mochi-card";
import { MochiButton } from "@/components/ui/mochi-button";
import generatedImage from "@assets/generated_images/soft_abstract_3d_shapes_in_warm_sand_and_soft_coral_colors.png";
import { ArrowRight, Heart, Layers, Sparkles, Smile } from "lucide-react";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border border-white/60 text-xs font-bold text-primary uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3 h-3" />
            Warmth in Technology
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight leading-[1.1]">
            Soft <br/>
            <span className="text-primary relative">
              Technology
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
            A design language blending the clarity of glass with the warmth of clay. 
            Tactile, friendly, and human-centered.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <MochiButton size="lg" className="gap-2">
              Explore Concept <ArrowRight className="w-4 h-4" />
            </MochiButton>
            <MochiButton variant="secondary" size="lg">
              Documentation
            </MochiButton>
          </div>
        </div>

        <div className="flex-1 relative w-full aspect-square md:aspect-auto md:h-[600px] flex items-center justify-center">
           <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent blur-3xl rounded-full opacity-50 animate-pulse duration-[5000ms]" />
           <img 
             src={generatedImage} 
             alt="Abstract Mochi Glass Shapes" 
             className="relative z-10 w-full h-full object-contain drop-shadow-2xl animate-mochi-hover"
           />
           
           {/* Floating Cards */}
           <MochiCard className="absolute -bottom-6 -left-6 md:bottom-20 md:-left-12 w-64 z-20 backdrop-blur-3xl bg-white/80 animate-[bounce_4s_infinite_ease-in-out_1s]">
             <div className="flex items-center gap-4 mb-3">
               <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary">
                 <Heart className="w-5 h-5 fill-current" />
               </div>
               <div>
                 <h3 className="font-bold text-sm">Human First</h3>
                 <p className="text-xs text-muted-foreground">Tactile feedback</p>
               </div>
             </div>
             <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden">
               <div className="h-full w-2/3 bg-primary rounded-full" />
             </div>
           </MochiCard>
        </div>
      </section>

      {/* Philosophy Grid */}
      <section className="py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <MochiCard className="md:col-span-2 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/20 transition-colors" />
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Layers className="w-6 h-6 text-primary" />
            Claymorphism & Glassmorphism
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-xl">
            We fuse the depth and softness of clay (40%) with the modern transparency of glass (30%). 
            The result is an interface that feels like "frosted candy" or "soft electronics." 
            It invites touch and reduces digital fatigue.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
             <div className="p-4 bg-background/50 rounded-2xl border border-white/20">
               <div className="text-xs font-bold uppercase text-muted-foreground mb-2">Structure</div>
               <div className="h-8 w-2/3 bg-white/80 rounded-lg mb-2 shadow-sm" />
               <div className="h-4 w-full bg-white/40 rounded-md" />
             </div>
             <div className="p-4 bg-primary/10 rounded-2xl border border-primary/10">
               <div className="text-xs font-bold uppercase text-primary mb-2">Accent</div>
               <div className="h-8 w-1/2 bg-primary rounded-lg mb-2 shadow-sm" />
               <div className="h-4 w-3/4 bg-primary/30 rounded-md" />
             </div>
          </div>
        </MochiCard>

        <MochiCard className="flex flex-col justify-center items-center text-center space-y-6 bg-gradient-to-b from-white/70 to-white/40">
           <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center shadow-lg text-white transform rotate-3 transition-transform hover:rotate-0">
             <Smile className="w-10 h-10" />
           </div>
           <div>
             <h3 className="text-xl font-bold mb-2">Playful Minimal</h3>
             <p className="text-sm text-muted-foreground">
               Adult Chibi 3D aesthetics meets rigorous grid systems.
             </p>
           </div>
           <MochiButton size="sm" variant="ghost">Learn More</MochiButton>
        </MochiCard>
      </section>

      {/* Interactive Elements Showcase */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-10 text-center">Interactive Elements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {/* Card 1 */}
           <MochiCard className="hover:scale-[1.02] transition-transform cursor-pointer">
             <div className="h-32 rounded-2xl bg-secondary mb-4 flex items-center justify-center text-4xl">
               🥪
             </div>
             <h3 className="font-bold text-lg mb-1">Sandwich Layout</h3>
             <p className="text-sm text-muted-foreground">Stacked layers for depth.</p>
           </MochiCard>
           
           {/* Card 2 */}
           <MochiCard className="hover:scale-[1.02] transition-transform cursor-pointer">
             <div className="h-32 rounded-2xl bg-[#E8F1F2] mb-4 flex items-center justify-center text-4xl">
               💧
             </div>
             <h3 className="font-bold text-lg mb-1">Fluid Motion</h3>
             <p className="text-sm text-muted-foreground">Organic transitions.</p>
           </MochiCard>

           {/* Card 3 */}
           <MochiCard className="hover:scale-[1.02] transition-transform cursor-pointer">
             <div className="h-32 rounded-2xl bg-[#FFF8E7] mb-4 flex items-center justify-center text-4xl">
               🧸
             </div>
             <h3 className="font-bold text-lg mb-1">Soft Touch</h3>
             <p className="text-sm text-muted-foreground">Low rebound buttons.</p>
           </MochiCard>

           {/* Card 4 */}
           <MochiCard className="hover:scale-[1.02] transition-transform cursor-pointer">
             <div className="h-32 rounded-2xl bg-[#FDEFEF] mb-4 flex items-center justify-center text-4xl">
               🌸
             </div>
             <h3 className="font-bold text-lg mb-1">Gentle Color</h3>
             <p className="text-sm text-muted-foreground">Calming palette.</p>
           </MochiCard>
        </div>
      </section>

      {/* Input Field Showcase */}
      <section className="py-20 w-full max-w-2xl mx-auto">
        <MochiCard>
          <h3 className="text-2xl font-bold mb-6 text-center">Join the Waitlist</h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1 text-muted-foreground">First Name</label>
                <input 
                  type="text" 
                  className="w-full h-12 rounded-2xl bg-white/50 border border-transparent focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all px-4 outline-none placeholder:text-muted-foreground/50 text-foreground"
                  placeholder="Mochi"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1 text-muted-foreground">Last Name</label>
                <input 
                  type="text" 
                  className="w-full h-12 rounded-2xl bg-white/50 border border-transparent focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all px-4 outline-none placeholder:text-muted-foreground/50 text-foreground"
                  placeholder="Designer"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1 text-muted-foreground">Email Address</label>
              <input 
                type="email" 
                className="w-full h-12 rounded-2xl bg-white/50 border border-transparent focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all px-4 outline-none placeholder:text-muted-foreground/50 text-foreground"
                placeholder="hello@mochi.design"
              />
            </div>
            <div className="pt-4">
              <MochiButton className="w-full" size="lg">
                Get Early Access
              </MochiButton>
            </div>
          </form>
        </MochiCard>
      </section>
    </Layout>
  );
}
