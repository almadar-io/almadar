/**
 * ConceptStoryLink Molecule
 *
 * Small inline card: "Learn this through a story" + story title, domain badge, difficulty badge.
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
  Typography,
  Badge,
  Icon,
  useEventBus,
  useTranslate,
} from '@almadar/ui';
import { BookOpen } from 'lucide-react';
import { DomainBadge } from '../../atoms/DomainBadge';
import type { KnowledgeDomainType, StorySummary } from '../../types/knowledge';

export interface ConceptStoryLinkProps {
  story: StorySummary;
  conceptName: string;
  className?: string;
}

export const ConceptStoryLink: React.FC<ConceptStoryLinkProps> = ({
  story,
  conceptName,
  className,
}) => {
  const { emit } = useEventBus();
  const { t } = useTranslate();

  const handleClick = () => {
    emit('UI:STORY_SELECT', { storyId: story.id });
  };

  return (
    <Card
      className={`p-3 cursor-pointer hover:border-[var(--color-foreground)] transition-colors ${className ?? ''}`}
      onClick={handleClick}
    >
      <HStack gap="sm" align="center">
        <Icon icon={BookOpen} size="sm" className="text-[var(--color-primary)] flex-shrink-0" />
        <VStack gap="xs" className="flex-1 min-w-0">
          <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
            {t('story.learnThrough', { concept: conceptName })}
          </Typography>
          <HStack gap="xs" align="center">
            <Typography variant="body" size="sm" weight="bold" truncate>
              {story.title}
            </Typography>
            <DomainBadge domain={story.domain as KnowledgeDomainType} size="sm" />
            <Badge size="sm">{t(`story.difficulty.${story.difficulty}`)}</Badge>
          </HStack>
        </VStack>
      </HStack>
    </Card>
  );
};

ConceptStoryLink.displayName = 'ConceptStoryLink';
