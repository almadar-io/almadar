/**
 * SeriesHeader Molecule
 *
 * Top section of the Series View: banner image background, title overlay,
 * creator avatar + name, domain badge, subscriber count, description,
 * Subscribe/Unsubscribe button.
 *
 * Event Contract:
 * - Emits: UI:CREATOR_CLICK, UI:SERIES_SUBSCRIBE, UI:SERIES_UNSUBSCRIBE
 * - entityAware: false
 */

import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Typography,
  Avatar,
  Button,
  Icon,
  useEventBus,
  useTranslate,
} from '@almadar/ui';
import { Users, Bell, BellOff } from 'lucide-react';
import { DomainBadge } from '../../atoms/DomainBadge';
import type { Series } from '../../types/knowledge';

export interface SeriesHeaderProps {
  series: Series;
  isSubscribed: boolean;
  className?: string;
}

export const SeriesHeader: React.FC<SeriesHeaderProps> = ({
  series,
  isSubscribed,
  className,
}) => {
  const { emit } = useEventBus();
  const { t } = useTranslate();

  const handleCreatorClick = () => {
    emit('UI:CREATOR_CLICK', { creatorId: series.creator.uid });
  };

  const handleSubscribe = () => {
    if (isSubscribed) {
      emit('UI:SERIES_UNSUBSCRIBE', { seriesId: series.id });
    } else {
      emit('UI:SERIES_SUBSCRIBE', { seriesId: series.id });
    }
  };

  return (
    <Box className={`relative overflow-hidden ${className ?? ''}`}>
      {/* Banner background */}
      {series.coverImage ? (
        <>
          <img
            src={series.coverImage}
            alt={series.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <Box className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
        </>
      ) : (
        <Box className="absolute inset-0 bg-[var(--color-card)]" />
      )}

      {/* Content overlay */}
      <VStack gap="md" className="relative z-10 p-6 pb-8 pt-16">
        <HStack gap="xs" align="center">
          <DomainBadge domain={series.domain} size="sm" />
          {series.tags.slice(0, 3).map((tag) => (
            <Typography key={tag} variant="caption" className="text-white/60 bg-white/10 px-2 py-0.5 rounded">
              {tag}
            </Typography>
          ))}
        </HStack>

        <Typography variant="h1" size="xl" weight="bold" className={series.coverImage ? 'text-white' : 'text-[var(--color-foreground)]'}>
          {series.title}
        </Typography>

        <Typography variant="body" className={series.coverImage ? 'text-white/80' : 'text-[var(--color-muted-foreground)]'}>
          {series.description}
        </Typography>

        {/* Creator row */}
        <HStack gap="sm" align="center">
          <HStack
            gap="xs"
            align="center"
            className="cursor-pointer"
            onClick={handleCreatorClick}
          >
            <Avatar name={series.creator.displayName} src={series.creator.avatar} size="sm" />
            <Typography variant="caption" weight="bold" className={series.coverImage ? 'text-white' : 'text-[var(--color-foreground)]'}>
              {series.creator.displayName}
            </Typography>
          </HStack>

          <HStack gap="xs" align="center">
            <Icon icon={Users} size="xs" className={series.coverImage ? 'text-white/60' : 'text-[var(--color-muted-foreground)]'} />
            <Typography variant="caption" className={series.coverImage ? 'text-white/60' : 'text-[var(--color-muted-foreground)]'}>
              {t('series.subscribers', { count: series.subscriberCount.toLocaleString() })}
            </Typography>
          </HStack>
        </HStack>

        {/* Subscribe button */}
        <HStack>
          <Button
            variant={isSubscribed ? 'secondary' : 'primary'}
            size="sm"
            onClick={handleSubscribe}
          >
            <Icon icon={isSubscribed ? BellOff : Bell} size="sm" />
            {isSubscribed
              ? t('series.unsubscribe')
              : t('series.subscribe')}
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

SeriesHeader.displayName = 'SeriesHeader';
