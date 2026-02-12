'use client';

import { useFormatter } from 'next-intl';

interface LastUpdatedProps {
  date: string; // ISO 8601 format: "2026-02-12"
  locale: 'en' | 'ja';
  className?: string;
}

export function LastUpdated({ date, locale, className = '' }: LastUpdatedProps) {
  const format = useFormatter();
  const dateObj = new Date(date);

  const label = locale === 'en' ? 'Last updated' : '最終更新';
  const formattedDate = format.dateTime(dateObj, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <time
      dateTime={date}
      className={`text-sm text-muted-foreground font-medium ${className}`}
    >
      {label}: {formattedDate}
    </time>
  );
}
