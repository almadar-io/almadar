/**
 * ConceptMetaTags - Displays concept metadata tags (layer, seed status, parents)
 *
 * Orbital Entity Binding:
 * - Data flows through props from Orbital state
 * - User interactions emit events via useEventBus()
 *
 * Events Emitted:
 * - UI:NAVIGATE_TO_PARENT - When a parent concept is clicked
 */

import React from 'react';
import { Layers } from 'lucide-react';
import { HStack, VStack, useEventBus } from '@almadar/ui';

export interface ConceptMetaTagsProps {
  /** Layer number */
  layer?: number;
  /** Whether this is a seed concept */
  isSeed?: boolean;
  /** Parent concept names */
  parents: string[];
  /** Additional CSS classes */
  className?: string;
}

export const ConceptMetaTags: React.FC<ConceptMetaTagsProps> = ({
  layer,
  isSeed,
  parents,
  className = '',
}) => {
  const { emit } = useEventBus();

  const handleParentClick = (parent: string) => {
    emit('UI:NAVIGATE_TO_PARENT', { parentName: parent });
  };

  return (
    <VStack gap="sm" className={className}>
      {(layer !== undefined || isSeed) && (
        <HStack gap="sm" wrap>
          {layer !== undefined && (
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">
              <Layers size={12} />
              Level {layer}
            </span>
          )}
          {isSeed && (
            <span className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-700 rounded">
              Seed Concept
            </span>
          )}
        </HStack>
      )}

      {parents.length > 0 && (
        <HStack gap="sm" wrap align="center">
          <span className="text-sm text-[var(--color-foreground)] font-medium">Parents:</span>
          {parents.map((parent) => (
            <button
              key={parent}
              onClick={() => handleParentClick(parent)}
              className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
            >
              ← {parent}
            </button>
          ))}
        </HStack>
      )}
    </VStack>
  );
};

ConceptMetaTags.displayName = 'ConceptMetaTags';
