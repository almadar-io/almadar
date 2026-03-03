/**
 * StoryRewardView Molecule
 *
 * Cinematic full-bleed reward screen with cover image as background.
 * Displays trophy, resolution narrative, learning points, game stats,
 * and share/explore buttons — all overlaid on the cover image.
 *
 * Event Contract:
 * - No events emitted (callbacks passed from organism)
 * - entityAware: false
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Button,
  Typography,
  Badge,
  Icon,
  useTranslate,
} from '@almadar/ui';
import { Trophy, Share2, ArrowRight, CheckCircle, Clock, Target } from 'lucide-react';
import { StoryRabbitHole } from './StoryRabbitHole';
import type { StorySummary, StoryBridge } from '../../types/knowledge';

export interface GameResult {
  score: number;
  time: number;
  attempts: number;
}

export interface StoryRewardViewProps {
  resolution: string;
  learningPoints: string[];
  gameResult?: GameResult;
  coverImage?: string;
  nextStory?: StorySummary;
  bridges?: StoryBridge[];
  primarySubjectId?: string;
  primarySubjectName?: string;
  onShare?: () => void;
  onExploreMore?: () => void;
  className?: string;
}

export const StoryRewardView: React.FC<StoryRewardViewProps> = ({
  resolution,
  learningPoints,
  gameResult,
  coverImage,
  nextStory,
  bridges,
  primarySubjectId,
  primarySubjectName,
  onShare,
  onExploreMore,
  className,
}) => {
  const { t } = useTranslate();
  const [imgError, setImgError] = useState(false);

  useEffect(() => { setImgError(false); }, [coverImage]);

  const hasImage = Boolean(coverImage) && !imgError;

  /* --- Cinematic layout: cover as background --- */
  if (hasImage) {
    return (
      <Box className={className} style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Background image */}
        <img
          src={coverImage}
          alt=""
          onError={() => setImgError(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'blur(2px) brightness(0.3)',
          }}
        />

        {/* Gradient overlay */}
        <Box
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.85) 70%)',
          }}
        />

        {/* Content */}
        <Box
          style={{ position: 'relative', minHeight: '100vh' }}
          className="flex flex-col justify-center"
        >
          <VStack gap="lg" align="center" className="max-w-2xl mx-auto py-8 px-6">
            {/* Trophy */}
            <Box className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Icon icon={Trophy} size="lg" className="text-yellow-400" />
            </Box>

            {/* Resolution */}
            <Box className="w-full p-6 rounded-xl bg-white/10 backdrop-blur-sm">
              <VStack gap="sm">
                <Typography variant="small" weight="bold" className="uppercase tracking-wider text-white/60">
                  {t('story.resolution')}
                </Typography>
                <Typography variant="body" className="text-white/90">
                  {resolution}
                </Typography>
              </VStack>
            </Box>

            {/* Learning Points */}
            <Box className="w-full p-6 rounded-xl bg-white/10 backdrop-blur-sm">
              <VStack gap="md">
                <Typography variant="small" weight="bold" className="uppercase tracking-wider text-white/60">
                  {t('story.learningPoints')}
                </Typography>
                <VStack gap="sm">
                  {learningPoints.map((point, i) => (
                    <HStack key={i} gap="sm" align="start">
                      <Icon icon={CheckCircle} size="sm" className="text-green-400 mt-0.5 flex-shrink-0" />
                      <Typography variant="body" className="text-white/90">{point}</Typography>
                    </HStack>
                  ))}
                </VStack>
              </VStack>
            </Box>

            {/* Game Result */}
            {gameResult && (
              <Box className="w-full p-6 rounded-xl bg-white/10 backdrop-blur-sm">
                <HStack gap="lg" justify="center" className="flex-wrap">
                  <VStack align="center" gap="xs">
                    <Icon icon={Target} size="sm" className="text-white/60" />
                    <Typography variant="h3" weight="bold" className="text-white">{gameResult.score}</Typography>
                    <Typography variant="caption" className="text-white/60">
                      {t('story.gameResult.score')}
                    </Typography>
                  </VStack>
                  <VStack align="center" gap="xs">
                    <Icon icon={Clock} size="sm" className="text-white/60" />
                    <Typography variant="h3" weight="bold" className="text-white">{gameResult.time}s</Typography>
                    <Typography variant="caption" className="text-white/60">
                      {t('story.gameResult.time')}
                    </Typography>
                  </VStack>
                  <VStack align="center" gap="xs">
                    <Badge size="md">{gameResult.attempts}</Badge>
                    <Typography variant="caption" className="text-white/60">
                      {t('story.gameResult.attempts')}
                    </Typography>
                  </VStack>
                </HStack>
              </Box>
            )}

            {/* Rabbit Hole */}
            {(nextStory || bridges?.length || primarySubjectId) && (
              <StoryRabbitHole
                nextStory={nextStory}
                bridges={bridges}
                primarySubjectId={primarySubjectId}
                primarySubjectName={primarySubjectName}
                className="w-full"
              />
            )}

            {/* Actions */}
            <HStack gap="md" justify="center" className="flex-wrap">
              {onShare && (
                <Button variant="secondary" onClick={onShare}>
                  <Share2 size={16} />
                  {t('story.share')}
                </Button>
              )}
              {onExploreMore && (
                <Button variant="primary" onClick={onExploreMore}>
                  {t('story.exploreMore')}
                  <ArrowRight size={16} />
                </Button>
              )}
            </HStack>
          </VStack>
        </Box>
      </Box>
    );
  }

  /* --- Fallback: no image --- */
  return (
    <Box className={className}>
      <VStack gap="lg" align="center" className="max-w-2xl mx-auto py-8 px-4">
        <Box className="w-16 h-16 rounded-full bg-[var(--color-foreground)] flex items-center justify-center">
          <Icon icon={Trophy} size="lg" className="text-[var(--color-background)]" />
        </Box>

        <Box className="w-full p-6 rounded-xl bg-[var(--color-card)]">
          <VStack gap="sm">
            <Typography variant="small" weight="bold" className="uppercase tracking-wider text-[var(--color-muted-foreground)]">
              {t('story.resolution')}
            </Typography>
            <Typography variant="body" className="text-[var(--color-foreground)]">
              {resolution}
            </Typography>
          </VStack>
        </Box>

        <Box className="w-full p-6 rounded-xl bg-[var(--color-card)]">
          <VStack gap="md">
            <Typography variant="small" weight="bold" className="uppercase tracking-wider text-[var(--color-muted-foreground)]">
              {t('story.learningPoints')}
            </Typography>
            <VStack gap="sm">
              {learningPoints.map((point, i) => (
                <HStack key={i} gap="sm" align="start">
                  <Icon icon={CheckCircle} size="sm" className="text-[var(--color-success)] mt-0.5 flex-shrink-0" />
                  <Typography variant="body">{point}</Typography>
                </HStack>
              ))}
            </VStack>
          </VStack>
        </Box>

        {gameResult && (
          <Box className="w-full p-6 rounded-xl bg-[var(--color-card)]">
            <HStack gap="lg" justify="center" className="flex-wrap">
              <VStack align="center" gap="xs">
                <Icon icon={Target} size="sm" className="text-[var(--color-muted-foreground)]" />
                <Typography variant="h3" weight="bold">{gameResult.score}</Typography>
                <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
                  {t('story.gameResult.score')}
                </Typography>
              </VStack>
              <VStack align="center" gap="xs">
                <Icon icon={Clock} size="sm" className="text-[var(--color-muted-foreground)]" />
                <Typography variant="h3" weight="bold">{gameResult.time}s</Typography>
                <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
                  {t('story.gameResult.time')}
                </Typography>
              </VStack>
              <VStack align="center" gap="xs">
                <Badge size="md">{gameResult.attempts}</Badge>
                <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
                  {t('story.gameResult.attempts')}
                </Typography>
              </VStack>
            </HStack>
          </Box>
        )}

        {/* Rabbit Hole */}
        {(nextStory || bridges?.length || primarySubjectId) && (
          <StoryRabbitHole
            nextStory={nextStory}
            bridges={bridges}
            primarySubjectId={primarySubjectId}
            primarySubjectName={primarySubjectName}
            className="w-full"
          />
        )}

        <HStack gap="md" justify="center" className="flex-wrap">
          {onShare && (
            <Button variant="secondary" onClick={onShare}>
              <Share2 size={16} />
              {t('story.share')}
            </Button>
          )}
          {onExploreMore && (
            <Button variant="primary" onClick={onExploreMore}>
              {t('story.exploreMore')}
              <ArrowRight size={16} />
            </Button>
          )}
        </HStack>
      </VStack>
    </Box>
  );
};

StoryRewardView.displayName = 'StoryRewardView';
