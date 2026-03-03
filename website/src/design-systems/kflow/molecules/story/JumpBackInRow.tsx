/**
 * JumpBackInRow Molecule
 *
 * Horizontal row of up to 3 JumpBackInCard components with section title.
 * Empty state shows "No stories in progress" with browse CTA.
 *
 * Event Contract:
 * - Emits: UI:NAV_STORIES (via empty state CTA)
 * - entityAware: false
 */

import React from 'react';
import {
  HStack,
  VStack,
  Typography,
  Button,
  EmptyState,
  useEventBus,
  useTranslate,
} from '@almadar/ui';
import { BookOpen } from 'lucide-react';
import { JumpBackInCard } from './JumpBackInCard';
import type { JumpBackInStory } from './JumpBackInCard';

export interface JumpBackInRowProps {
  stories: JumpBackInStory[];
  title?: string;
  className?: string;
}

export const JumpBackInRow: React.FC<JumpBackInRowProps> = ({
  stories,
  title,
  className,
}) => {
  const { emit } = useEventBus();
  const { t } = useTranslate();

  const displayTitle = title ?? t('story.jumpBackIn');
  const visible = stories.slice(0, 3);

  return (
    <VStack gap="md" className={className}>
      <Typography variant="label" size="lg">
        {displayTitle}
      </Typography>

      {visible.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title={t('story.noInProgress')}
          description={t('story.browsePrompt')}
          actionLabel={t('story.browseCatalog')}
          onAction={() => emit('UI:NAV_STORIES', {})}
        />
      ) : (
        <HStack gap="md" className="overflow-x-auto">
          {visible.map((story) => (
            <JumpBackInCard
              key={story.id}
              story={story}
              className="min-w-[240px] max-w-[300px] flex-shrink-0"
            />
          ))}
        </HStack>
      )}
    </VStack>
  );
};

JumpBackInRow.displayName = 'JumpBackInRow';
