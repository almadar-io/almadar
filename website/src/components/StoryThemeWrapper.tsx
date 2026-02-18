import React, { useMemo } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { I18nProvider, createTranslate } from '../design-systems/almadar-ui/hooks/useTranslate';
import { coreMessages, localeMeta, type SupportedLocale } from '../design-systems/almadar-ui/locales';

// Import @almadar/ui theme CSS — provides data-theme CSS variable definitions.
// Tailwind utilities come from custom.css via @tailwind components/utilities.
// We do NOT import index.css here — its @tailwind base conflicts with Docusaurus resets.
import '../design-systems/almadar-ui/themes/index.css';

interface StoryThemeWrapperProps {
    children: React.ReactNode;
    /** Theme name from @almadar/ui (e.g. "ocean-light", "midnight-dark") */
    theme?: string;
}

const SUPPORTED_LOCALES = new Set<string>(['en', 'ar', 'sl']);

/**
 * Wraps composed stories with a theme context and i18n provider.
 * Bridges Docusaurus locale to @almadar/ui I18nProvider so
 * component demos render translated strings in en/ar/sl.
 */
export default function StoryThemeWrapper({ children, theme = 'minimalist-light' }: StoryThemeWrapperProps): React.JSX.Element {
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

    const isDark = theme.endsWith('-dark');
    return (
        <I18nProvider value={i18nValue}>
            <div
                data-theme={theme}
                dir={i18nValue.direction}
                style={{
                    backgroundColor: 'var(--color-background)',
                    color: 'var(--color-foreground)',
                    minHeight: '100%',
                    colorScheme: isDark ? 'dark' : 'light',
                }}
            >
                {children}
            </div>
        </I18nProvider>
    );
}
