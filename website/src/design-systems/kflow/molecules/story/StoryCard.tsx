/**
 * StoryCard Molecule
 *
 * Card for displaying a story summary in the catalog.
 * Shows title, teaser, domain badge, duration, difficulty, play count.
 *
 * Event Contract:
 * - No events emitted (callback passed from organism)
 * - entityAware: false
 */

import React from 'react';
import {
  Card,
  VStack,
  HStack,
  Typography,
  Badge,
  Icon,
  useEventBus,
  useTranslate,
} from '@almadar/ui';
import { Clock, Users, Star, Library } from 'lucide-react';
import { DomainBadge } from '../../atoms/DomainBadge';
import type { KnowledgeDomainType, StorySummary } from '../../types/knowledge';

export type { StorySummary } from '../../types/knowledge';

export interface StoryCardProps {
  story: StorySummary;
  onClick?: (storyId: string) => void;
  className?: string;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  story,
  onClick,
  className,
}) => {
  const { emit } = useEventBus();
  const { t } = useTranslate();

  const handleSeriesBadgeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (story.seriesId) {
      emit('UI:SERIES_SELECT', { seriesId: story.seriesId });
    }
  };

  return (
    <Card
      className={`p-4 cursor-pointer hover:border-[var(--color-foreground)] transition-colors ${className ?? ''}`}
      onClick={() => onClick?.(story.id)}
    >
      <VStack gap="sm">
        {story.coverImage && (
          <img
            src={story.coverImage}
            alt={story.title}
            className="w-full h-32 object-cover rounded"
          />
        )}

        <HStack gap="xs" align="center">
          <DomainBadge domain={story.domain as KnowledgeDomainType} size="sm" />
          <Badge size="sm">{t(`story.difficulty.${story.difficulty}`)}</Badge>
          {story.seriesId && (
            <Badge
              size="sm"
              variant="secondary"
              className="cursor-pointer"
              onClick={handleSeriesBadgeClick}
            >
              <Icon icon={Library} size="xs" />
              {t('story.series')}
            </Badge>
          )}
        </HStack>

        <Typography variant="body" weight="bold" className="text-[var(--color-foreground)]">
          {story.title}
        </Typography>

        <Typography variant="caption" className="text-[var(--color-muted-foreground)] line-clamp-2">
          {story.teaser}
        </Typography>

        <HStack gap="md" align="center">
          <HStack gap="xs" align="center">
            <Icon icon={Clock} size="xs" className="text-[var(--color-muted-foreground)]" />
            <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
              {t('story.duration', { minutes: String(story.duration) })}
            </Typography>
          </HStack>

          {story.rating !== undefined && (
            <HStack gap="xs" align="center">
              <Icon icon={Star} size="xs" className="text-[var(--color-warning)]" />
              <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
                {story.rating.toFixed(1)}
              </Typography>
            </HStack>
          )}

          {story.playCount !== undefined && (
            <HStack gap="xs" align="center">
              <Icon icon={Users} size="xs" className="text-[var(--color-muted-foreground)]" />
              <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
                {story.playCount.toLocaleString()}
              </Typography>
            </HStack>
          )}
        </HStack>
      </VStack>
    </Card>
  );
};

StoryCard.displayName = 'StoryCard';
