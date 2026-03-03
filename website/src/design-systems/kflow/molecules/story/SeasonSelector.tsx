/**
 * SeasonSelector Molecule
 *
 * Horizontal tab bar for switching between seasons.
 * Each tab shows: season number, title, episode count, completion status.
 *
 * Event Contract:
 * - Emits: UI:SEASON_SELECT
 * - entityAware: false
 */

import React from 'react';
import {
  Tabs,
  useEventBus,
  useTranslate,
} from '@almadar/ui';
import type { Season, SeasonProgress } from '../../types/knowledge';

export interface SeasonSelectorProps {
  seasons: Season[];
  activeSeasonId: string;
  seasonProgress?: Record<string, SeasonProgress>;
  className?: string;
}

export const SeasonSelector: React.FC<SeasonSelectorProps> = ({
  seasons,
  activeSeasonId,
  seasonProgress,
  className,
}) => {
  const { emit } = useEventBus();
  const { t } = useTranslate();

  const handleTabChange = (seasonId: string) => {
    emit('UI:SEASON_SELECT', { seasonId });
  };

  const tabItems = seasons.map((season) => {
    const progress = seasonProgress?.[season.id];
    const completionSuffix = progress
      ? ` (${progress.episodesCompleted}/${progress.episodesTotal})`
      : '';

    return {
      id: season.id,
      label: t(
        'season.tabLabel',
        {
          number: String(season.number),
          title: season.title,
          completion: completionSuffix,
        },
      ),
    };
  });

  return (
    <Tabs
      items={tabItems}
      activeTab={activeSeasonId}
      onTabChange={handleTabChange}
      className={className}
    />
  );
};

SeasonSelector.displayName = 'SeasonSelector';
