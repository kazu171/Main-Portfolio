'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Languages, Menu, X } from 'lucide-react';
import { MochiButton } from './mochi-button';

const navLinks = {
  en: [
    { href: '', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/what-i-do', label: 'Services' },
    { href: '/process', label: 'Process' },
    { href: '/cases', label: 'Cases' },
    { href: '/contact', label: 'Contact' },
  ],
  ja: [
    { href: '', label: 'ホーム' },
    { href: '/about', label: '自己紹介' },
    { href: '/what-i-do', label: 'サービス' },
    { href: '/process', label: 'プロセス' },
    { href: '/cases', label: '事例' },
    { href: '/contact', label: 'お問い合わせ' },
  ],
};

export function Navbar({ locale }: { locale: 'en' | 'ja' }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = navLinks[locale];

  const switchLocale = () => {
    const targetLocale = locale === 'en' ? 'ja' : 'en';
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '';
    router.push(`/${targetLocale}${pathWithoutLocale}`);
  };

  const isActive = (href: string) => {
    const fullPath = `/${locale}${href}`;
    if (href === '') return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(fullPath);
  };

  const navigate = (href: string) => {
    router.push(`/${locale}${href}`);
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 md:px-6 md:pt-6">
        <div className="max-w-6xl mx-auto bg-white/60 backdrop-blur-2xl border border-white/80 rounded-2xl shadow-lg px-4 md:px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate('')}
            className="text-lg font-[900] tracking-tight text-foreground hover:text-primary transition-colors"
          >
            Kazu
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => navigate(link.href)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${
                  isActive(link.href)
                    ? 'bg-primary/15 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-black/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side: Language Toggle + Hamburger */}
          <div className="flex items-center gap-2">
            <button
              onClick={switchLocale}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold text-muted-foreground hover:text-foreground hover:bg-black/5 transition-all"
            >
              <Languages className="w-3.5 h-3.5 text-primary" />
              {locale === 'en' ? '日本語' : 'EN'}
            </button>

            {/* Hamburger (mobile only) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-black/5 transition-all"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setIsOpen(false)}>
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
          <div
            className="absolute top-20 left-4 right-4 bg-white/90 backdrop-blur-2xl border border-white/80 rounded-2xl shadow-xl p-4 space-y-1"
            onClick={(e) => e.stopPropagation()}
          >
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => navigate(link.href)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-extrabold transition-all ${
                  isActive(link.href)
                    ? 'bg-primary/15 text-primary'
                    : 'text-foreground hover:bg-black/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
