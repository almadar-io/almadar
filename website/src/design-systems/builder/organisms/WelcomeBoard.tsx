/**
 * WelcomeBoard
 *
 * Welcome screen for the AI Builder — displayed when no conversation is active.
 * Shows the Orbitals logo and suggestion chips.
 */

import React from 'react';
import { Typography, useEventBus } from '@almadar/ui';
import { OrbitalsLogo } from '../atoms';

const SUGGESTIONS = [
  'Project management tool with tasks',
  'E-commerce checkout flow',
  'Patient appointment portal',
  'CRM for leads and deals',
];

export interface WelcomeBoardProps {
  className?: string;
  suggestions?: string[];
}

export const WelcomeBoard: React.FC<WelcomeBoardProps> = ({
  className,
  suggestions = SUGGESTIONS,
}) => {
  const { emit } = useEventBus();

  return (
    <div className={`flex-1 flex flex-col items-center justify-center p-8 pb-40 ${className || ''}`}>
      <div className="max-w-lg w-full text-center space-y-6">
        <OrbitalsLogo size={56} borderRadius={16} className="mx-auto" />
        <Typography variant="h3" className="text-[var(--color-foreground)]">
          What would you like to build?
        </Typography>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => emit('UI:EXAMPLE_CLICK', { example: s })}
              className="px-3 py-1.5 rounded-full text-sm border border-[var(--color-border)]
                bg-[var(--color-surface)] text-[var(--color-muted-foreground)]
                hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]
                transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

WelcomeBoard.displayName = 'WelcomeBoard';
export default WelcomeBoard;
