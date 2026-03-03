/* eslint-disable almadar/organism-extends-entity-display */
/**
 * StoryCatalogBoard Organism
 *
 * Displays a browsable catalog of Knowledge Stories with domain
 * filtering, a featured story, and a grid of story cards.
 *
 * Events Emitted:
 * - UI:STORY_SELECT — user clicks a story card
 * - UI:STORY_DOMAIN_FILTER — user changes domain filter
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  Box,
  VStack,
  HStack,
  Container,
  Typography,
  Tabs,
  SimpleGrid,
  PageHeader,
  useEventBus,
  useTranslate,
} from '@almadar/ui';
import { StoryCard } from '../molecules/story/StoryCard';
import { SeriesCard } from '../molecules/story/SeriesCard';
import type { StorySummary } from '../molecules/story/StoryCard';
import type { SeriesSummary } from '../types/knowledge';

export interface StoryCatalogEntity {
  stories: StorySummary[];
  featuredStory?: StorySummary;
  selectedDomain?: string;
  domains: string[];
  series?: SeriesSummary[];
}

export interface StoryCatalogBoardProps {
  entity: StoryCatalogEntity;
  className?: string;
}

export function StoryCatalogBoard({
  entity,
  className = '',
}: StoryCatalogBoardProps): React.JSX.Element {
  const { emit } = useEventBus();
  const { t } = useTranslate();
  const [activeDomain, setActiveDomain] = useState(entity.selectedDomain ?? 'all');

  const handleStoryClick = useCallback((storyId: string) => {
    emit('UI:STORY_SELECT', { storyId });
  }, [emit]);

  const handleDomainChange = useCallback((domain: string) => {
    setActiveDomain(domain);
    emit('UI:STORY_DOMAIN_FILTER', { domain });
  }, [emit]);

  const filteredStories = useMemo(() => {
    if (activeDomain === 'all') return entity.stories;
    return entity.stories.filter((s) => s.domain === activeDomain);
  }, [entity.stories, activeDomain]);

  const hasSeries = entity.series && entity.series.length > 0;
  const isSeriesTab = activeDomain === 'series';

  const domainTabs = useMemo(() => [
    { id: 'all', label: t('catalog.all') },
    ...entity.domains.map((d) => ({
      id: d,
      label: t(`story.domain.${d}`),
    })),
    ...(hasSeries ? [{ id: 'series', label: t('catalog.series') }] : []),
  ], [entity.domains, hasSeries, t]);

  return (
    <Box className={`min-h-screen bg-[var(--color-background)] ${className}`}>
      <PageHeader
        title={t('catalog.title')}
        subtitle={t('catalog.subtitle')}
      />

      <Container size="lg" padding="sm" className="py-6">
        <VStack gap="lg">
          {/* Featured story */}
          {entity.featuredStory && (
            <VStack gap="sm">
              <Typography variant="small" weight="bold" className="uppercase tracking-wider text-[var(--color-muted-foreground)]">
                {t('catalog.featured')}
              </Typography>
              <StoryCard
                story={entity.featuredStory}
                onClick={handleStoryClick}
              />
            </VStack>
          )}

          {/* Domain filter tabs */}
          <Tabs
            items={domainTabs}
            activeTab={activeDomain}
            onTabChange={handleDomainChange}
          />

          {/* Content grid */}
          {isSeriesTab ? (
            <SimpleGrid minChildWidth="280px" gap="md">
              {entity.series?.map((s) => (
                <SeriesCard key={s.id} series={s} />
              ))}
            </SimpleGrid>
          ) : (
            <>
              <SimpleGrid minChildWidth="280px" gap="md">
                {filteredStories.map((story) => (
                  <StoryCard
                    key={story.id}
                    story={story}
                    onClick={handleStoryClick}
                  />
                ))}
              </SimpleGrid>

              {filteredStories.length === 0 && (
                <Typography variant="body" className="text-center text-[var(--color-muted-foreground)] py-8">
                  {t('catalog.noStories')}
                </Typography>
              )}
            </>
          )}
        </VStack>
      </Container>
    </Box>
  );
}

StoryCatalogBoard.displayName = 'StoryCatalogBoard';
