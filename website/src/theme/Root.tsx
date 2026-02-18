/**
 * Docusaurus Root wrapper — provides @almadar/ui I18nProvider globally.
 *
 * This MUST be at the Root level (not inside lazy-loaded components)
 * so that the React context is shared across all webpack chunks.
 * Without this, lazy-loaded demo components get a separate context
 * instance and translations don't reach them.
 *
 * Merges core + all project locale messages so every demo component
 * can resolve its translation keys (e.g. 'trust.title', 'sessions.error').
 */

import React, { useMemo } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { I18nProvider, createTranslate } from '@almadar/ui';
import { coreMessages, localeMeta, type SupportedLocale } from '../design-systems/almadar-ui/locales';

// Project locale JSON — merged on top of core
import winning11En from '../design-systems/winning-11/locales/en.json';
import winning11Ar from '../design-systems/winning-11/locales/ar.json';
import winning11Sl from '../design-systems/winning-11/locales/sl.json';

import blazEn from '../design-systems/blaz-klemenc/locales/en.json';
import blazAr from '../design-systems/blaz-klemenc/locales/ar.json';
import blazSl from '../design-systems/blaz-klemenc/locales/sl.json';

import kflowEn from '../design-systems/kflow/locales/en.json';
import kflowAr from '../design-systems/kflow/locales/ar.json';
import kflowSl from '../design-systems/kflow/locales/sl.json';

import inspectionEn from '../design-systems/inspection-system/locales/en.json';
import inspectionAr from '../design-systems/inspection-system/locales/ar.json';
import inspectionSl from '../design-systems/inspection-system/locales/sl.json';

import builderEn from '../design-systems/builder/locales/en.json';
import builderAr from '../design-systems/builder/locales/ar.json';
import builderSl from '../design-systems/builder/locales/sl.json';

/** Strip $meta / $extends keys from JSON imports */
function stripMeta(obj: Record<string, unknown>): Record<string, string> {
    const result: Record<string, string> = {};
    for (const [key, value] of Object.entries(obj)) {
        if (key.startsWith('$')) continue;
        if (typeof value === 'string') result[key] = value;
    }
    return result;
}

/** All messages merged: core + every project */
const allMessages: Record<SupportedLocale, Record<string, string>> = {
    en: {
        ...coreMessages.en,
        ...stripMeta(winning11En),
        ...stripMeta(blazEn),
        ...stripMeta(kflowEn),
        ...stripMeta(inspectionEn),
        ...stripMeta(builderEn),
    },
    ar: {
        ...coreMessages.ar,
        ...stripMeta(winning11Ar),
        ...stripMeta(blazAr),
        ...stripMeta(kflowAr),
        ...stripMeta(inspectionAr),
        ...stripMeta(builderAr),
    },
    sl: {
        ...coreMessages.sl,
        ...stripMeta(winning11Sl),
        ...stripMeta(blazSl),
        ...stripMeta(kflowSl),
        ...stripMeta(inspectionSl),
        ...stripMeta(builderSl),
    },
};

const SUPPORTED_LOCALES = new Set<string>(['en', 'ar', 'sl']);

interface RootProps {
    children: React.ReactNode;
}

export default function Root({ children }: RootProps): React.JSX.Element {
    const { i18n } = useDocusaurusContext();
    const locale = SUPPORTED_LOCALES.has(i18n.currentLocale)
        ? (i18n.currentLocale as SupportedLocale)
        : 'en';

    const i18nValue = useMemo(() => {
        const meta = localeMeta[locale];
        return {
            locale: meta.locale,
            direction: meta.direction,
            t: createTranslate(allMessages[locale]),
        };
    }, [locale]);

    return (
        <I18nProvider value={i18nValue}>
            {children}
        </I18nProvider>
    );
}
