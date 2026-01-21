import React from "react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  lang?: "en" | "ja";
}

export function Layout({ children, className, lang = "ja" }: LayoutProps) {
  const navItems = {
    en: [
      { label: "Philosophy", href: "#" },
      { label: "Components", href: "#" },
      { label: "About", href: "#" },
    ],
    ja: [
      { label: "哲学", href: "#" },
      { label: "コンポーネント", href: "#" },
      { label: "概要", href: "#" },
    ],
  };

  const footerText = {
    en: "© 2026 Mochi Glass Design System. Warmth in Technology.",
    ja: "© 2026 モチ・グラス デザインシステム。テクノロジーに温もりを。",
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      {/* Navbar Placeholder */}
      <nav className="w-full max-w-6xl px-6 py-8 flex justify-between items-center z-10">
        <div className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm shadow-inner">M</span>
          Mochi Glass
        </div>
        <div className="flex gap-8 text-sm font-semibold text-muted-foreground">
          {navItems[lang].map((item) => (
            <a key={item.label} href={item.href} className="hover:text-primary transition-colors">
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <main className={cn("w-full max-w-6xl px-6 pb-20 flex-1", className)}>
        {children}
      </main>

      <footer className="w-full py-8 text-center text-sm text-muted-foreground/60">
        <p>{footerText[lang]}</p>
      </footer>
    </div>
  );
}
