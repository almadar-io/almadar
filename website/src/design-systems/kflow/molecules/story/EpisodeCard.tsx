/**
 * EpisodeCard Molecule
 *
 * Card for one episode within a season: episode number, title, story count,
 * duration, difficulty badge, completion status indicator.
 *
 * Event Contract:
 * - Emits: UI:EPISODE_SELECT
 * - entityAware: false
 */

import React from 'react';
import {
  Card,
  HStack,
  VStack,
  Typography,
  Badge,
  ProgressBar,
  Icon,
  useEventBus,
  useTranslate,
} from '@almadar/ui';
import { Play, Check, Clock, BookOpen } from 'lucide-react';
import type { Episode, EpisodeProgress } from '../../types/knowledge';

export interface EpisodeCardProps {
  episode: Episode;
  storyTitles?: string[];
  progress?: EpisodeProgress;
  isCurrentlyPlaying?: boolean;
  className?: string;
}

export const EpisodeCard: React.FC<EpisodeCardProps> = ({
  episode,
  storyTitles,
  progress,
  isCurrentlyPlaying,
  className,
}) => {
  const { emit } = useEventBus();
  const { t } = useTranslate();

  const handleClick = () => {
    emit('UI:EPISODE_SELECT', {
      episodeId: episode.id,
      firstStoryId: episode.stories[0],
    });
  };

  const storyCount = episode.stories.length;
  const isCompleted = progress?.status === 'completed';
  const isInProgress = progress?.status === 'in_progress';
  const progressPercent = progress
    ? Math.round((progress.storiesCompleted / progress.storiesTotal) * 100)
    : 0;

  return (
    <Card
      className={`p-4 cursor-pointer hover:border-[var(--color-foreground)] transition-colors ${isCurrentlyPlaying ? 'border-[var(--color-primary)]' : ''} ${className ?? ''}`}
      onClick={handleClick}
    >
      <HStack gap="md" align="start">
        {/* Episode number / status icon */}
        <VStack align="center" justify="center" className="w-10 h-10 rounded-full bg-[var(--color-muted)] flex-shrink-0">
          {isCompleted ? (
            <Icon icon={Check} size="sm" className="text-[var(--color-success)]" />
          ) : isCurrentlyPlaying ? (
            <Icon icon={Play} size="sm" className="text-[var(--color-primary)]" />
          ) : (
            <Typography variant="caption" weight="bold" className="text-[var(--color-foreground)]">
              {episode.number}
            </Typography>
          )}
        </VStack>

        {/* Content */}
        <VStack gap="xs" className="flex-1 min-w-0">
          <Typography variant="body" weight="bold" className="text-[var(--color-foreground)]">
            {episode.title}
          </Typography>

          <Typography variant="caption" className="text-[var(--color-muted-foreground)] line-clamp-2">
            {episode.description}
          </Typography>

          {/* Story titles preview */}
          {storyTitles && storyTitles.length > 0 && (
            <VStack gap="none" className="mt-1">
              {storyTitles.map((title, i) => (
                <Typography key={title} variant="caption" className="text-[var(--color-muted-foreground)] truncate">
                  {i + 1}. {title}
                </Typography>
              ))}
            </VStack>
          )}

          {/* Metadata row */}
          <HStack gap="md" align="center" className="mt-1">
            <HStack gap="xs" align="center">
              <Icon icon={BookOpen} size="xs" className="text-[var(--color-muted-foreground)]" />
              <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
                {t('episode.storyCount', { count: String(storyCount) })}
              </Typography>
            </HStack>

            <HStack gap="xs" align="center">
              <Icon icon={Clock} size="xs" className="text-[var(--color-muted-foreground)]" />
              <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
                {t('episode.duration', { minutes: String(episode.duration) })}
              </Typography>
            </HStack>

            <Badge size="sm">{t(`story.difficulty.${episode.difficulty}`)}</Badge>
          </HStack>

          {/* Progress bar */}
          {progress && isInProgress && (
            <ProgressBar value={progressPercent} className="mt-1" />
          )}
        </VStack>
      </HStack>
    </Card>
  );
};

EpisodeCard.displayName = 'EpisodeCard';
