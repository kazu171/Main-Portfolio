'use client';

import { ExternalLink } from 'lucide-react';
import { Citation } from '@/lib/content/types';

interface CitationsListProps {
  citations: Citation[];
  locale: 'en' | 'ja';
}

const translations = {
  en: {
    title: 'Sources & References',
  },
  ja: {
    title: '参考文献・出典',
  },
};

export function CitationsList({ citations, locale }: CitationsListProps) {
  const t = translations[locale];

  if (!citations || citations.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 pt-8 border-t border-border/50">
      <h3 className="text-sm font-black uppercase tracking-wider text-muted-foreground mb-4">
        {t.title}
      </h3>
      <ul className="space-y-2">
        {citations.map((citation, index) => (
          <li key={index} className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{citation.source}</span>
            {' — '}
            {citation.url ? (
              <a
                href={citation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary hover:underline inline-flex items-center gap-1"
              >
                {citation.title}
                <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <span>{citation.title}</span>
            )}
            {', '}
            <span>{citation.year}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
