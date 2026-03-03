/**
 * LocalePicker
 *
 * Language switcher with 3 locale buttons (EN / عربي / SL).
 * Emits UI:LOCALE_CHANGED with the selected locale code.
 *
 * entityAware: false
 * eventContract: emits UI:LOCALE_CHANGED
 */

import React from 'react';
import { HStack, Button, useEventBus } from '@almadar/ui';
import { cn } from '@almadar/ui';

const LOCALES = [
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'عربي' },
  { code: 'sl', label: 'SL' },
] as const;

export interface LocalePickerProps {
  /** Currently active locale */
  activeLocale?: string;
  /** Called when user picks a locale (in addition to event bus emit) */
  onLocaleChange?: (locale: string) => void;
  className?: string;
}

export function LocalePicker({
  activeLocale = 'en',
  onLocaleChange,
  className,
}: LocalePickerProps): React.JSX.Element {
  const { emit } = useEventBus();

  const handlePick = (code: string) => {
    emit('UI:LOCALE_CHANGED', { locale: code });
    onLocaleChange?.(code);
  };

  return (
    <HStack className={cn('gap-1', className)}>
      {LOCALES.map(({ code, label }) => (
        <Button
          key={code}
          size="sm"
          variant={code === activeLocale ? 'primary' : 'secondary'}
          onClick={() => handlePick(code)}
        >
          {label}
        </Button>
      ))}
    </HStack>
  );
}

LocalePicker.displayName = 'LocalePicker';
