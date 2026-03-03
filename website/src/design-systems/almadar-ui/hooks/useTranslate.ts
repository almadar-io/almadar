'use client';
/**
 * useTranslate — i18n hook for Almadar UI components.
 *
 * Provides locale-aware string translation via React context.
 * No provider = passthrough: t('key') returns 'key' as-is (never crashes).
 *
 * Usage in organisms:
 *   const { t, locale, direction } = useTranslate();
 *   <Button>{t('common.save')}</Button>
 *   <Typography>{t('table.showing', { count: 5, total: 20 })}</Typography>
 *
 * Templates MUST NOT use this hook (flattener rule). They receive
 * translated strings via entity props from the organism above.
 */

import { createContext, useContext } from 'react';

export type TranslateFunction = (
  key: string,
  params?: Record<string, string | number>,
) => string;

export interface I18nContextValue {
  /** Current locale code (e.g. 'en', 'ar', 'sl') */
  locale: string;
  /** Text direction for the current locale */
  direction: 'ltr' | 'rtl';
  /** Translate a key, with optional interpolation params */
  t: TranslateFunction;
}

const I18nContext = createContext<I18nContextValue>({
  locale: 'en',
  direction: 'ltr',
  t: (key) => key, // passthrough fallback
});

I18nContext.displayName = 'I18nContext';

/**
 * Provider component — wrap your app or Storybook decorator with this.
 *
 * ```tsx
 * <I18nProvider value={{ locale: 'ar', direction: 'rtl', t: createTranslate(arMessages) }}>
 *   <App />
 * </I18nProvider>
 * ```
 */
export const I18nProvider = I18nContext.Provider;

/**
 * Hook to access the current locale and translate function.
 * Safe to call without a provider — returns passthrough t().
 */
export function useTranslate(): I18nContextValue {
  return useContext(I18nContext);
}

/**
 * Create a translate function from a flat messages object.
 *
 * ```ts
 * const t = createTranslate({ 'common.save': 'Save', 'table.showing': 'Showing {{count}} of {{total}}' });
 * t('common.save') // → 'Save'
 * t('table.showing', { count: 5, total: 20 }) // → 'Showing 5 of 20'
 * t('missing.key') // → 'missing.key' (fallback)
 * ```
 */
export function createTranslate(
  messages: Record<string, string>,
): TranslateFunction {
  return (key, params) => {
    let msg = messages[key] ?? key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        msg = msg.split(`{{${k}}}`).join(String(v));
      }
    }
    return msg;
  };
}
