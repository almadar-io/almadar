/**
 * JumpBackInCard Molecule
 *
 * Card showing an in-progress story: cover thumbnail, title, DomainBadge,
 * progress text ("Scene 3 of 5"), progress bar, and Continue button.
 * Click emits UI:STORY_SELECT with { storyId }.
 *
 * Event Contract:
 * - Emits: UI:STORY_SELECT
 * - entityAware: false
 */

import React from 'react';
import {
  Card,
  HStack,
  VStack,
  Button,
  Typography,
  ProgressBar,
  Icon,
  useEventBus,
  useTranslate,
} from '@almadar/ui';
import { Play } from 'lucide-react';
import { DomainBadge } from '../../atoms/DomainBadge';
import type { KnowledgeDomainType, StorySummary } from '../../types/knowledge';

export interface JumpBackInStory extends StorySummary {
  currentSection: number;
  totalSections: number;
}

export interface JumpBackInCardProps {
  story: JumpBackInStory;
  className?: string;
}

export const JumpBackInCard: React.FC<JumpBackInCardProps> = ({
  story,
  className,
}) => {
  const { emit } = useEventBus();
  const { t } = useTranslate();

  const handleContinue = () => {
    emit('UI:STORY_SELECT', { storyId: story.id });
  };

  return (
    <Card
      className={`p-4 cursor-pointer hover:border-[var(--color-foreground)] transition-colors ${className ?? ''}`}
      onClick={handleContinue}
    >
      <VStack gap="sm">
        {story.coverImage && (
          <img
            src={story.coverImage}
            alt={story.title}
            className="w-full h-24 object-cover rounded"
          />
        )}

        <HStack gap="xs" align="center">
          <DomainBadge domain={story.domain as KnowledgeDomainType} size="sm" />
        </HStack>

        <Typography variant="body" weight="bold" truncate>
          {story.title}
        </Typography>

        <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
          {t('story.progress', {
            current: String(story.currentSection),
            total: String(story.totalSections),
          })}
        </Typography>

        <ProgressBar
          value={story.currentSection}
          max={story.totalSections}
          variant="primary"
        />

        <Button variant="primary" size="sm" onClick={handleContinue}>
          <Icon icon={Play} size="xs" />
          {t('story.continue')}
        </Button>
      </VStack>
    </Card>
  );
};

JumpBackInCard.displayName = 'JumpBackInCard';
