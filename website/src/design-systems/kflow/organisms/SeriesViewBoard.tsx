/* eslint-disable almadar/organism-extends-entity-display */
/**
 * SeriesViewBoard Organism
 *
 * Powers the Series View page. Manages season selection state,
 * computes stats, and wires all events to child molecules.
 *
 * Events Emitted (via children):
 * - UI:EPISODE_SELECT, UI:STORY_SELECT, UI:SEASON_SELECT
 * - UI:SERIES_SUBSCRIBE, UI:SERIES_UNSUBSCRIBE
 * - UI:CREATOR_CLICK, UI:SERIES_SELECT
 */

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Container,
  Typography,
  SimpleGrid,
  useEventBus,
  useTranslate,
} from '@almadar/ui';
import { SeriesHeader } from '../molecules/story/SeriesHeader';
import { SeriesStatsBar } from '../molecules/story/SeriesStatsBar';
import { SeasonSelector } from '../molecules/story/SeasonSelector';
import { EpisodeCard } from '../molecules/story/EpisodeCard';
import { CreatorCard } from '../molecules/story/CreatorCard';
import { SeriesCard } from '../molecules/story/SeriesCard';
import type {
  Series,
  StorySummary,
  SeriesProgress,
  SeriesSummary,
} from '../types/knowledge';

export interface SeriesViewEntity {
  series: Series;
  storyMap: Record<string, StorySummary>;
  isSubscribed: boolean;
  progress?: SeriesProgress;
  creatorOtherSeries?: SeriesSummary[];
}

export interface SeriesViewBoardProps {
  entity: SeriesViewEntity;
  className?: string;
}

export function SeriesViewBoard({
  entity,
  className = '',
}: SeriesViewBoardProps): React.JSX.Element {
  const { on } = useEventBus();
  const { t } = useTranslate();

  // Determine initial season: the one containing the current episode, or the first
  const initialSeasonId = useMemo(() => {
    if (entity.progress?.currentEpisodeId) {
      const found = entity.series.seasons.find((s) =>
        s.episodes.some((ep) => ep.id === entity.progress?.currentEpisodeId),
      );
      if (found) return found.id;
    }
    return entity.series.seasons[0]?.id ?? '';
  }, [entity.series.seasons, entity.progress?.currentEpisodeId]);

  const [activeSeasonId, setActiveSeasonId] = useState(initialSeasonId);

  // Listen for season selection events from SeasonSelector
  useEffect(() => {
    const unsub = on('UI:SEASON_SELECT', (event) => {
      const seasonId = (event.payload as Record<string, string> | undefined)?.seasonId;
      if (seasonId) setActiveSeasonId(seasonId);
    });
    return unsub;
  }, [on]);

  const activeSeason = useMemo(
    () => entity.series.seasons.find((s) => s.id === activeSeasonId),
    [entity.series.seasons, activeSeasonId],
  );

  // Compute aggregate stats
  const stats = useMemo(() => {
    const allEpisodes = entity.series.seasons.flatMap((s) => s.episodes);
    const totalStories = allEpisodes.reduce((sum, ep) => sum + ep.stories.length, 0);
    const totalDuration = allEpisodes.reduce((sum, ep) => sum + ep.duration, 0);
    const completionPercent = entity.progress
      ? Math.round((entity.progress.seasonsCompleted / entity.progress.seasonsTotal) * 100)
      : undefined;

    return {
      totalEpisodes: allEpisodes.length,
      totalStories,
      totalDurationMinutes: totalDuration,
      averageRating: entity.series.rating,
      completionPercent,
    };
  }, [entity.series, entity.progress]);

  // Resolve story titles for episode cards
  const getStoryTitles = useCallback(
    (storyIds: string[]): string[] =>
      storyIds
        .map((id) => entity.storyMap[id]?.title)
        .filter((title): title is string => Boolean(title)),
    [entity.storyMap],
  );

  return (
    <Box className={`min-h-screen bg-[var(--color-background)] ${className}`}>
      {/* Series header with banner */}
      <SeriesHeader series={entity.series} isSubscribed={entity.isSubscribed} />

      <Container size="lg" padding="sm" className="py-6">
        <VStack gap="lg">
          {/* Stats bar */}
          <SeriesStatsBar
            totalEpisodes={stats.totalEpisodes}
            totalStories={stats.totalStories}
            totalDurationMinutes={stats.totalDurationMinutes}
            averageRating={stats.averageRating}
            completionPercent={stats.completionPercent}
          />

          {/* Season selector */}
          {entity.series.seasons.length > 1 && (
            <SeasonSelector
              seasons={entity.series.seasons}
              activeSeasonId={activeSeasonId}
              seasonProgress={entity.progress?.seasonProgress}
            />
          )}

          {/* Episode list */}
          {activeSeason && (
            <VStack gap="md">
              <Typography variant="label" weight="bold" className="text-[var(--color-foreground)]">
                {activeSeason.title}
              </Typography>
              <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
                {activeSeason.description}
              </Typography>
              <VStack gap="sm">
                {activeSeason.episodes.map((episode) => {
                  const seasonProg = entity.progress?.seasonProgress[activeSeasonId];
                  const epProgress = seasonProg?.episodeProgress[episode.id];
                  const isCurrent = entity.progress?.currentEpisodeId === episode.id;

                  return (
                    <EpisodeCard
                      key={episode.id}
                      episode={episode}
                      storyTitles={getStoryTitles(episode.stories)}
                      progress={epProgress}
                      isCurrentlyPlaying={isCurrent}
                    />
                  );
                })}
              </VStack>
            </VStack>
          )}

          {/* Creator section */}
          {entity.creatorOtherSeries && entity.creatorOtherSeries.length > 0 && (
            <VStack gap="md">
              <Typography variant="small" weight="bold" className="uppercase tracking-wider text-[var(--color-muted-foreground)]">
                {t('series.moreByCreator', { name: entity.series.creator.displayName })}
              </Typography>

              <CreatorCard
                creator={{
                  ...entity.series.creator,
                  seriesCount: (entity.creatorOtherSeries.length + 1),
                }}
              />

              <HStack gap="md" className="overflow-x-auto pb-2">
                <SimpleGrid minChildWidth="260px" gap="md">
                  {entity.creatorOtherSeries.map((s) => (
                    <SeriesCard key={s.id} series={s} />
                  ))}
                </SimpleGrid>
              </HStack>
            </VStack>
          )}
        </VStack>
      </Container>
    </Box>
  );
}

SeriesViewBoard.displayName = 'SeriesViewBoard';
