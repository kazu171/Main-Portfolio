import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

// Re-export locales and type for backwards compatibility
export const locales = routing.locales;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({requestLocale}) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure the incoming locale is valid
  if (!locale || !locales.includes(locale as Locale)) {
    locale = routing.defaultLocale; // fallback to default locale
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
