import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'ja'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Redirect to locale prefix for root path
  localePrefix: 'always'
});

// Re-export locales for backwards compatibility
export const locales = routing.locales;
