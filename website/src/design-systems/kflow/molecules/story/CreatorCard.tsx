/**
 * CreatorCard Molecule
 *
 * Small card showing a creator: avatar, display name, bio, series count.
 *
 * Event Contract:
 * - Emits: UI:CREATOR_CLICK
 * - entityAware: false
 */

import React from 'react';
import {
  Card,
  HStack,
  VStack,
  Typography,
  Avatar,
  Icon,
  useEventBus,
  useTranslate,
} from '@almadar/ui';
import { BookOpen } from 'lucide-react';
import type { SeriesCreator } from '../../types/knowledge';

export interface CreatorCardProps {
  creator: SeriesCreator & { bio?: string; seriesCount?: number };
  className?: string;
}

export const CreatorCard: React.FC<CreatorCardProps> = ({
  creator,
  className,
}) => {
  const { emit } = useEventBus();
  const { t } = useTranslate();

  const handleClick = () => {
    emit('UI:CREATOR_CLICK', { creatorId: creator.uid });
  };

  return (
    <Card
      className={`p-4 cursor-pointer hover:border-[var(--color-foreground)] transition-colors ${className ?? ''}`}
      onClick={handleClick}
    >
      <HStack gap="md" align="center">
        <Avatar name={creator.displayName} src={creator.avatar} size="md" />
        <VStack gap="xs" className="flex-1 min-w-0">
          <Typography variant="body" weight="bold" className="text-[var(--color-foreground)]">
            {creator.displayName}
          </Typography>
          {creator.bio && (
            <Typography variant="caption" className="text-[var(--color-muted-foreground)] line-clamp-2">
              {creator.bio}
            </Typography>
          )}
          {creator.seriesCount !== undefined && (
            <HStack gap="xs" align="center">
              <Icon icon={BookOpen} size="xs" className="text-[var(--color-muted-foreground)]" />
              <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
                {t('creator.seriesCount', { count: String(creator.seriesCount) })}
              </Typography>
            </HStack>
          )}
        </VStack>
      </HStack>
    </Card>
  );
};

CreatorCard.displayName = 'CreatorCard';
