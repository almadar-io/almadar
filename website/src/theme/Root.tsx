/**
 * Docusaurus Root wrapper — provides @almadar/ui I18nProvider globally.
 *
 * This MUST be at the Root level (not inside lazy-loaded components)
 * so that the React context is shared across all webpack chunks.
 * Without this, lazy-loaded demo components get a separate context
 * instance and translations don't reach them.
 */

import React, { useMemo } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { I18nProvider, createTranslate } from '@almadar/ui';
import { coreMessages, localeMeta, type SupportedLocale } from '../design-systems/almadar-ui/locales';

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
            t: createTranslate(coreMessages[locale]),
        };
    }, [locale]);

    return (
        <I18nProvider value={i18nValue}>
            {children}
        </I18nProvider>
    );
}
