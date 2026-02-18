/**
 * Core locale loader for @almadar/ui.
 *
 * Exports message maps for en/ar/sl and a helper to merge
 * project-specific messages on top of core.
 */

import en from './en.json';
import ar from './ar.json';
import sl from './sl.json';

export type SupportedLocale = 'en' | 'ar' | 'sl';

export interface LocaleMeta {
  locale: string;
  direction: 'ltr' | 'rtl';
}

/** Core messages keyed by locale */
export const coreMessages: Record<SupportedLocale, Record<string, string>> = {
  en: stripMeta(en),
  ar: stripMeta(ar),
  sl: stripMeta(sl),
};

/** Locale metadata */
export const localeMeta: Record<SupportedLocale, LocaleMeta> = {
  en: { locale: 'en', direction: 'ltr' },
  ar: { locale: 'ar', direction: 'rtl' },
  sl: { locale: 'sl', direction: 'ltr' },
};

/**
 * Merge core messages with project-specific messages.
 * Project keys override core keys.
 */
export function mergeMessages(
  locale: SupportedLocale,
  projectMessages: Record<string, string>,
): Record<string, string> {
  return { ...coreMessages[locale], ...stripMeta(projectMessages) };
}

/** Remove $meta and $extends keys from a messages object */
function stripMeta(obj: Record<string, unknown>): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;
    if (typeof value === 'string') {
      result[key] = value;
    }
  }
  return result;
}
