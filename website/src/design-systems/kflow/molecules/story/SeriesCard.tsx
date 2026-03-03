/**
 * SeriesCard Molecule
 *
 * Card displaying a series summary: cover image, title, creator,
 * domain badge, season/episode counts, subscriber count, rating.
 *
 * Event Contract:
 * - Emits: UI:SERIES_SELECT
 * - entityAware: false
 */

import React from 'react';
import {
  Card,
  VStack,
  HStack,
  Typography,
  Badge,
  Avatar,
  Icon,
  useEventBus,
  useTranslate,
} from '@almadar/ui';
import { Users, Star, BookOpen, Layers } from 'lucide-react';
import { DomainBadge } from '../../atoms/DomainBadge';
import type { SeriesSummary } from '../../types/knowledge';

export interface SeriesCardProps {
  series: SeriesSummary;
  className?: string;
}

export const SeriesCard: React.FC<SeriesCardProps> = ({
  series,
  className,
}) => {
  const { emit } = useEventBus();
  const { t } = useTranslate();

  const handleClick = () => {
    emit('UI:SERIES_SELECT', { seriesId: series.id });
  };

  return (
    <Card
      className={`p-4 cursor-pointer hover:border-[var(--color-foreground)] transition-colors ${className ?? ''}`}
      onClick={handleClick}
    >
      <VStack gap="sm">
        {series.coverImage && (
          <img
            src={series.coverImage}
            alt={series.title}
            className="w-full h-32 object-cover rounded"
          />
        )}

        <HStack gap="xs" align="center">
          <DomainBadge domain={series.domain} size="sm" />
          {series.status === 'featured' && (
            <Badge size="sm" variant="warning">
              {t('series.featured')}
            </Badge>
          )}
        </HStack>

        <Typography variant="body" weight="bold" className="text-[var(--color-foreground)]">
          {series.title}
        </Typography>

        <HStack gap="xs" align="center">
          <Avatar name={series.creator.displayName} src={series.creator.avatar} size="xs" />
          <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
            {series.creator.displayName}
          </Typography>
        </HStack>

        <HStack gap="md" align="center">
          <HStack gap="xs" align="center">
            <Icon icon={Layers} size="xs" className="text-[var(--color-muted-foreground)]" />
            <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
              {t('series.seasonCount', { count: String(series.seasonCount) })}
            </Typography>
          </HStack>

          <HStack gap="xs" align="center">
            <Icon icon={BookOpen} size="xs" className="text-[var(--color-muted-foreground)]" />
            <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
              {t('series.episodeCount', { count: String(series.episodeCount) })}
            </Typography>
          </HStack>
        </HStack>

        <HStack gap="md" align="center">
          <HStack gap="xs" align="center">
            <Icon icon={Users} size="xs" className="text-[var(--color-muted-foreground)]" />
            <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
              {series.subscriberCount.toLocaleString()}
            </Typography>
          </HStack>

          {series.rating !== undefined && (
            <HStack gap="xs" align="center">
              <Icon icon={Star} size="xs" className="text-[var(--color-warning)]" />
              <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
                {series.rating.toFixed(1)}
              </Typography>
            </HStack>
          )}
        </HStack>
      </VStack>
    </Card>
  );
};

SeriesCard.displayName = 'SeriesCard';
