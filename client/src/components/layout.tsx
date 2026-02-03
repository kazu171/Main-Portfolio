import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  lang?: "en" | "ja";
}

export function Layout({ children, className, lang = "ja" }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const basePath = `/${lang}`;

  const navItems = {
    en: [
      { label: 'Home', href: `${basePath}` },
      { label: 'What I Do', href: `${basePath}/what-i-do` },
      { label: 'Cases & Workflows', href: `${basePath}/cases` },
      { label: 'Process', href: `${basePath}/process` },
      { label: 'About', href: `${basePath}/about` },
      { label: 'Contact', href: `${basePath}/contact` },
    ],
    ja: [
      { label: 'ホーム', href: `${basePath}` },
      { label: '事業内容', href: `${basePath}/what-i-do` },
      { label: '事例・制作フロー', href: `${basePath}/cases` },
      { label: 'プロセス', href: `${basePath}/process` },
      { label: 'プロフィール', href: `${basePath}/about` },
      { label: 'お問い合わせ', href: `${basePath}/contact` },
    ],
  };

  const footerText = {
    en: "© 2026 Kazuya Hibara. All rights reserved.",
    ja: "© 2026 桧原 和也. All rights reserved.",
  };

  const privacyText = {
    en: "Privacy Policy",
    ja: "プライバシーポリシー",
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full max-w-6xl px-6 py-8 flex justify-between items-center z-10">
        <Link href={basePath} className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm shadow-inner">K</span>
          Kazuya Hibara
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 text-sm font-semibold text-muted-foreground">
          {navItems[lang].map((item) => (
            <Link key={item.label} href={item.href} className="hover:text-primary transition-colors">
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-xl bg-white/50 backdrop-blur-xl border border-white/60 hover:bg-white/70 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full max-w-6xl px-6 pb-6 z-20">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 p-4 space-y-2 shadow-xl">
            {navItems[lang].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block py-3 px-4 rounded-xl hover:bg-primary/10 text-foreground font-semibold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <main className={cn("w-full max-w-6xl px-6 pb-20 flex-1", className)}>
        {children}
      </main>

      <footer className="w-full py-8 text-center text-sm text-muted-foreground/60 space-y-2">
        <p>{footerText[lang]}</p>
        <Link href={`/${lang}/privacy`} className="hover:text-primary transition-colors">
          {privacyText[lang]}
        </Link>
      </footer>
    </div>
  );
}
