import { coreMessages, localeMeta, type SupportedLocale } from '../../../packages/almadar-ui/locales';
import en from './en.json';
import ar from './ar.json';
import sl from './sl.json';

function stripMeta(obj: Record<string, unknown>): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;
    if (typeof value === 'string') result[key] = value;
  }
  return result;
}

export const projectMessages: Record<SupportedLocale, Record<string, string>> = {
  en: stripMeta(en), ar: stripMeta(ar), sl: stripMeta(sl),
};

export const allMessages: Record<SupportedLocale, Record<string, string>> = {
  en: { ...coreMessages.en, ...projectMessages.en },
  ar: { ...coreMessages.ar, ...projectMessages.ar },
  sl: { ...coreMessages.sl, ...projectMessages.sl },
};

export { localeMeta, type SupportedLocale };
