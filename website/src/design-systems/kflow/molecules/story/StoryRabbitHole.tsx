/**
 * StoryRabbitHole Molecule
 *
 * Forward-navigation after story completion. Three conditional sections:
 * 1. "Next in Series" card (when nextStory is set)
 * 2. "Related Stories" horizontal scroll (when bridges has entries)
 * 3. "Explore This Topic" link (always shown when primarySubjectId is set)
 *
 * When no nextStory, shows generation CTA emitting UI:STORY_GENERATE_REQUEST.
 *
 * Event Contract:
 * - Emits: UI:STORY_SELECT, UI:NAV_EXPLORE, UI:STORY_GENERATE_REQUEST
 * - entityAware: false
 */

import React from 'react';
import {
  VStack,
  HStack,
  Box,
  Button,
  Typography,
  Icon,
  useEventBus,
  useTranslate,
} from '@almadar/ui';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';
import { StoryCard } from './StoryCard';
import { EpisodeContinueCard } from './EpisodeContinueCard';
import type { EpisodeContinueCardProps } from './EpisodeContinueCard';
import type { StorySummary, StoryBridge } from '../../types/knowledge';

export interface StoryRabbitHoleProps {
  nextStory?: StorySummary;
  bridges?: StoryBridge[];
  primarySubjectId?: string;
  primarySubjectName?: string;
  episodeContinue?: EpisodeContinueCardProps;
  className?: string;
}

export const StoryRabbitHole: React.FC<StoryRabbitHoleProps> = ({
  nextStory,
  bridges,
  primarySubjectId,
  primarySubjectName,
  episodeContinue,
  className,
}) => {
  const { emit } = useEventBus();
  const { t } = useTranslate();

  const handleStorySelect = (storyId: string) => {
    emit('UI:STORY_SELECT', { storyId });
  };

  const handleExplore = () => {
    if (primarySubjectId) {
      emit('UI:NAV_EXPLORE', { subjectId: primarySubjectId });
    }
  };

  const handleGenerate = () => {
    emit('UI:STORY_GENERATE_REQUEST', {
      topic: primarySubjectName ?? '',
      domain: nextStory?.domain ?? '',
    });
  };

  const hasBridges = bridges && bridges.length > 0;

  // When episodeContinue type is 'story', show ONLY the continue card (direct Continue)
  if (episodeContinue?.type === 'story') {
    return (
      <VStack gap="lg" className={className}>
        <EpisodeContinueCard {...episodeContinue} />
      </VStack>
    );
  }

  return (
    <VStack gap="lg" className={className}>
      {/* Episode/Season/Series continue card (above standard rabbit hole) */}
      {episodeContinue && (
        <EpisodeContinueCard {...episodeContinue} />
      )}

      {/* Next in Series */}
      {nextStory ? (
        <VStack gap="sm">
          <Typography variant="small" weight="bold" className="uppercase tracking-wider text-white/60">
            {t('story.nextInSeries')}
          </Typography>
          <Box className="max-w-sm">
            <StoryCard story={nextStory} onClick={handleStorySelect} />
          </Box>
        </VStack>
      ) : (
        <VStack gap="sm" align="center">
          <Typography variant="small" weight="bold" className="uppercase tracking-wider text-white/60">
            {t('story.wantMore')}
          </Typography>
          <Button variant="secondary" onClick={handleGenerate}>
            <Icon icon={Sparkles} size="sm" />
            {t('story.generateNew')}
          </Button>
        </VStack>
      )}

      {/* Related Stories (Bridges) */}
      {hasBridges && (
        <VStack gap="sm">
          <Typography variant="small" weight="bold" className="uppercase tracking-wider text-white/60">
            {t('story.relatedStories')}
          </Typography>
          <HStack gap="md" className="overflow-x-auto pb-2">
            {bridges.map((bridge) => (
              <VStack key={bridge.story.id} gap="xs" className="min-w-[220px] max-w-[260px] flex-shrink-0">
                <StoryCard story={bridge.story} onClick={handleStorySelect} />
                <HStack gap="xs" align="center" justify="center">
                  <Icon icon={ArrowRight} size="xs" className="text-white/40" />
                  <Typography variant="caption" className="text-white/50">
                    {bridge.connectionLabel}
                  </Typography>
                </HStack>
              </VStack>
            ))}
          </HStack>
        </VStack>
      )}

      {/* Explore This Topic */}
      {primarySubjectId && (
        <HStack justify="center">
          <Button variant="secondary" onClick={handleExplore}>
            <Icon icon={Compass} size="sm" />
            {t('story.exploreTopic', { subject: primarySubjectName ?? '' })}
          </Button>
        </HStack>
      )}
    </VStack>
  );
};

StoryRabbitHole.displayName = 'StoryRabbitHole';
