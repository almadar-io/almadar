/**
 * WelcomeBoard
 *
 * Welcome screen for the AI Builder — displayed when no conversation is active.
 * Shows the Orbitals logo and suggestion chips.
 */

import React from 'react';
import { Box, VStack, HStack, Typography, Button, useEventBus } from '@almadar/ui';
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
    <VStack
      flex
      align="center"
      justify="center"
      className={`p-8 pb-40 ${className || ''}`}
    >
      <VStack gap="lg" align="center" className="max-w-lg w-full text-center">
        <OrbitalsLogo size={56} borderRadius={16} className="mx-auto" />
        <Typography variant="h3" className="text-[var(--color-foreground)]">
          What would you like to build?
        </Typography>
        <HStack gap="sm" className="flex-wrap justify-center mt-4">
          {suggestions.map((s, i) => (
            <Button
              key={i}
              variant="ghost"
              size="sm"
              onClick={() => emit('UI:EXAMPLE_CLICK', { example: s })}
              className="px-3 py-1.5 rounded-full text-sm border border-[var(--color-border)]
                bg-[var(--color-surface)] text-[var(--color-muted-foreground)]
                hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]
                transition-colors"
            >
              {s}
            </Button>
          ))}
        </HStack>
      </VStack>
    </VStack>
  );
};

WelcomeBoard.displayName = 'WelcomeBoard';
export default WelcomeBoard;
