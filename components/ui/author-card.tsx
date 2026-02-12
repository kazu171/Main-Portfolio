'use client';

import Link from 'next/link';
import { User } from 'lucide-react';
import { MochiCard } from './mochi-card';

interface AuthorCardProps {
  locale: 'en' | 'ja';
}

const authorData = {
  en: {
    name: 'Kazuya Hibara',
    tagline: 'AI Marketing Engineer specializing in n8n automation for solopreneurs',
    cta: 'Learn more about the author →',
  },
  ja: {
    name: 'Kazuya Hibara',
    tagline: '一人法人向けn8n自動化を専門とするAIマーケティングエンジニア',
    cta: '著者について詳しく見る →',
  },
};

export function AuthorCard({ locale }: AuthorCardProps) {
  const data = authorData[locale];

  return (
    <Link href={`/${locale}/about`}>
      <MochiCard className="p-6 hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
            <User className="w-7 h-7 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-black text-foreground group-hover:text-primary transition-colors">
              {data.name}
            </p>
            <p className="text-sm text-muted-foreground font-medium mt-0.5 truncate">
              {data.tagline}
            </p>
            <p className="text-xs text-primary font-bold mt-2 group-hover:underline">
              {data.cta}
            </p>
          </div>
        </div>
      </MochiCard>
    </Link>
  );
}
