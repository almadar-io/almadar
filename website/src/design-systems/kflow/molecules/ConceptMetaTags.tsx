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
import { HStack, VStack, Badge, Button, Typography, useEventBus, useTranslate } from '@almadar/ui';

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

export const ConceptMetaTags = ({
  layer,
  isSeed,
  parents,
  className = '',
}: ConceptMetaTagsProps) => {
  const { emit } = useEventBus();
  const { t } = useTranslate();

  const handleParentClick = (parent: string) => {
    emit('UI:NAVIGATE_TO_PARENT', { parentName: parent });
  };

  return (
    <VStack gap="sm" className={className}>
      {(layer !== undefined || isSeed) && (
        <HStack gap="sm" wrap>
          {layer !== undefined && (
            <Badge variant="info">
              <HStack gap="xs" align="center">
                <Layers size={12} />
                <Typography variant="small">{t('concept.level', { layer })}</Typography>
              </HStack>
            </Badge>
          )}
          {isSeed && (
            <Badge variant="warning">
              <Typography variant="small">{t('concept.seedConcept')}</Typography>
            </Badge>
          )}
        </HStack>
      )}

      {parents.length > 0 && (
        <HStack gap="sm" wrap align="center">
          <Typography variant="small" className="font-medium">{t('concept.parents')}</Typography>
          {parents.map((parent) => (
            <Button
              key={parent}
              variant="ghost"
              size="sm"
              onClick={() => handleParentClick(parent)}
              className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200"
            >
              ← {parent}
            </Button>
          ))}
        </HStack>
      )}
    </VStack>
  );
};

ConceptMetaTags.displayName = 'ConceptMetaTags';
