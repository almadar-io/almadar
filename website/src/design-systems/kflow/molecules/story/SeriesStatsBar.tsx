/**
 * SeriesStatsBar Molecule
 *
 * Horizontal stats row: total episodes, total stories, total duration,
 * average rating, completion rate. Pure display, no events.
 *
 * Event Contract:
 * - No events emitted
 * - entityAware: false
 */

import React from 'react';
import {
  HStack,
  VStack,
  Typography,
  Divider,
  Icon,
  useTranslate,
} from '@almadar/ui';
import { BookOpen, Clock, Star, Trophy } from 'lucide-react';

export interface SeriesStatsBarProps {
  totalEpisodes: number;
  totalStories: number;
  totalDurationMinutes: number;
  averageRating?: number;
  completionPercent?: number;
  className?: string;
}

export const SeriesStatsBar: React.FC<SeriesStatsBarProps> = ({
  totalEpisodes,
  totalStories,
  totalDurationMinutes,
  averageRating,
  completionPercent,
  className,
}) => {
  const { t } = useTranslate();

  const hours = Math.floor(totalDurationMinutes / 60);
  const minutes = totalDurationMinutes % 60;
  const durationLabel = hours > 0
    ? t('series.durationHoursMinutes', { hours: String(hours), minutes: String(minutes) })
    : t('series.durationMinutes', { minutes: String(minutes) });

  return (
    <HStack
      gap="lg"
      align="center"
      className={`px-4 py-3 bg-[var(--color-card)] border border-[var(--color-border)] rounded ${className ?? ''}`}
    >
      <VStack gap="none" align="center">
        <Icon icon={BookOpen} size="sm" className="text-[var(--color-muted-foreground)]" />
        <Typography variant="caption" weight="bold" className="text-[var(--color-foreground)]">
          {totalEpisodes}
        </Typography>
        <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
          {t('series.episodes')}
        </Typography>
      </VStack>

      <Divider orientation="vertical" className="h-10" />

      <VStack gap="none" align="center">
        <Icon icon={BookOpen} size="sm" className="text-[var(--color-muted-foreground)]" />
        <Typography variant="caption" weight="bold" className="text-[var(--color-foreground)]">
          {totalStories}
        </Typography>
        <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
          {t('series.stories')}
        </Typography>
      </VStack>

      <Divider orientation="vertical" className="h-10" />

      <VStack gap="none" align="center">
        <Icon icon={Clock} size="sm" className="text-[var(--color-muted-foreground)]" />
        <Typography variant="caption" weight="bold" className="text-[var(--color-foreground)]">
          {durationLabel}
        </Typography>
        <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
          {t('series.duration')}
        </Typography>
      </VStack>

      {averageRating !== undefined && (
        <>
          <Divider orientation="vertical" className="h-10" />
          <VStack gap="none" align="center">
            <Icon icon={Star} size="sm" className="text-[var(--color-warning)]" />
            <Typography variant="caption" weight="bold" className="text-[var(--color-foreground)]">
              {averageRating.toFixed(1)}
            </Typography>
            <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
              {t('series.rating')}
            </Typography>
          </VStack>
        </>
      )}

      {completionPercent !== undefined && (
        <>
          <Divider orientation="vertical" className="h-10" />
          <VStack gap="none" align="center">
            <Icon icon={Trophy} size="sm" className="text-[var(--color-success)]" />
            <Typography variant="caption" weight="bold" className="text-[var(--color-foreground)]">
              {completionPercent}%
            </Typography>
            <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
              {t('series.completion')}
            </Typography>
          </VStack>
        </>
      )}
    </HStack>
  );
};

SeriesStatsBar.displayName = 'SeriesStatsBar';
