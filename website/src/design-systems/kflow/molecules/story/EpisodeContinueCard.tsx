/**
 * EpisodeContinueCard Molecule
 *
 * Shown within StoryRewardView when the reader finishes a story.
 * Handles: next story in episode, next episode, next season, series complete.
 *
 * Event Contract:
 * - Emits: UI:STORY_SELECT, UI:SERIES_SELECT
 * - entityAware: false
 */

import React from 'react';
import {
  Card,
  HStack,
  VStack,
  Typography,
  Button,
  Icon,
  useEventBus,
  useTranslate,
} from '@almadar/ui';
import { ArrowRight, PartyPopper, Play } from 'lucide-react';

export interface EpisodeContinueCardProps {
  type: 'story' | 'episode' | 'season' | 'series_complete';
  title: string;
  subtitle?: string;
  storyId?: string;
  seriesId?: string;
  className?: string;
}

export const EpisodeContinueCard: React.FC<EpisodeContinueCardProps> = ({
  type,
  title,
  subtitle,
  storyId,
  seriesId,
  className,
}) => {
  const { emit } = useEventBus();
  const { t } = useTranslate();

  const handleContinue = () => {
    if (type === 'series_complete' && seriesId) {
      emit('UI:SERIES_SELECT', { seriesId });
    } else if (storyId) {
      emit('UI:STORY_SELECT', { storyId });
    }
  };

  const isComplete = type === 'series_complete';
  const iconForType = isComplete ? PartyPopper : type === 'story' ? Play : ArrowRight;
  const labelForType = isComplete
    ? t('episode.seriesComplete')
    : type === 'story'
      ? t('episode.continueStory')
      : type === 'episode'
        ? t('episode.nextEpisode')
        : t('episode.nextSeason');

  return (
    <Card className={`p-4 ${isComplete ? 'border-[var(--color-success)]' : 'border-[var(--color-primary)]'} ${className ?? ''}`}>
      <VStack gap="sm" align="center">
        {isComplete && (
          <Icon icon={PartyPopper} size="lg" className="text-[var(--color-success)]" />
        )}

        <Typography
          variant="small"
          weight="bold"
          className="uppercase tracking-wider text-[var(--color-muted-foreground)]"
        >
          {labelForType}
        </Typography>

        <Typography variant="body" weight="bold" className="text-[var(--color-foreground)] text-center">
          {title}
        </Typography>

        {subtitle && (
          <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
            {subtitle}
          </Typography>
        )}

        <HStack justify="center" className="mt-2">
          <Button
            variant={isComplete ? 'secondary' : 'primary'}
            size="sm"
            onClick={handleContinue}
          >
            <Icon icon={iconForType} size="sm" />
            {isComplete
              ? t('episode.backToSeries')
              : t('episode.continue')}
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
};

EpisodeContinueCard.displayName = 'EpisodeContinueCard';
