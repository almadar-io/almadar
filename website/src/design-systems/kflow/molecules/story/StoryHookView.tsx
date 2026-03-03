/**
 * StoryHookView Molecule
 *
 * Full-screen cinematic hook for a Knowledge Story.
 * Cover image fills the viewport as background; title, hook question,
 * and narrative teaser are overlaid on a dark gradient.
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
  useTranslate,
} from '@almadar/ui';
import {
  Play,
  ChevronDown,
  Sword,
  Map,
  Cpu,
  Network,
  FlaskConical,
  Gamepad2,
  Puzzle,
  SlidersHorizontal,
  FolderKanban,
  Wrench,
  Bug,
  Handshake,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { MarkdownContent } from '../markdown/MarkdownContent';
import { DomainBadge } from '../../atoms/DomainBadge';
import type { KnowledgeDomainType, StoryGameType } from '../../types/knowledge';

/** Map game type to a lucide icon for the hook metadata row. */
const GAME_TYPE_ICON: Record<string, LucideIcon> = {
  sequencer: Puzzle,
  simulator: SlidersHorizontal,
  classifier: FolderKanban,
  builder: Wrench,
  debugger: Bug,
  negotiator: Handshake,
  'event-handler': Cpu,
  'state-architect': Network,
  battle: Sword,
  adventure: Map,
  'physics-lab': FlaskConical,
};

export interface StoryHookViewProps {
  hookQuestion: string;
  hookNarrative: string;
  title: string;
  domain: string;
  difficulty: string;
  duration: number;
  coverImage?: string;
  gameType?: StoryGameType | string;
  /** When provided, renders a Begin button. When omitted, shows a scroll indicator. */
  onBegin?: () => void;
  className?: string;
}

export const StoryHookView: React.FC<StoryHookViewProps> = ({
  hookQuestion,
  hookNarrative,
  title,
  domain,
  difficulty,
  duration,
  coverImage,
  gameType,
  onBegin,
  className,
}) => {
  const { t } = useTranslate();

  const GameIcon = gameType ? (GAME_TYPE_ICON[gameType] ?? Gamepad2) : null;
  const [imgError, setImgError] = useState(false);

  useEffect(() => { setImgError(false); }, [coverImage]);

  const hasImage = Boolean(coverImage) && !imgError;

  /* --- Cinematic layout: cover image fills viewport --- */
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
          }}
        />

        {/* Gradient overlay */}
        <Box
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.85) 70%)',
          }}
        />

        {/* Content — positioned at the bottom */}
        <Box
          style={{ position: 'relative', minHeight: '100vh' }}
          className="flex flex-col justify-end"
        >
          <VStack gap="lg" align="center" className="max-w-3xl mx-auto px-6 pb-12 pt-[50vh] text-center">
            {/* Metadata badges */}
            <HStack gap="sm" align="center" justify="center" className="flex-wrap">
              <DomainBadge domain={domain as KnowledgeDomainType} size="sm" />
              <Badge size="sm">{t(`story.difficulty.${difficulty}`)}</Badge>
              <Badge size="sm" variant="secondary">{t('story.duration', { minutes: String(duration) })}</Badge>
              {GameIcon && (
                <Badge size="sm" variant="secondary">
                  <GameIcon size={14} />
                </Badge>
              )}
            </HStack>

            {/* Title */}
            <Typography variant="h1" weight="bold" className="text-white">
              {title}
            </Typography>

            {/* Hook question */}
            <Typography variant="h3" weight="bold" className="text-white/90">
              {hookQuestion}
            </Typography>

            {/* Narrative teaser */}
            <Box className="text-white/80 [&_p]:text-white/80 [&_strong]:text-white [&_em]:text-white/70">
              <MarkdownContent content={hookNarrative} />
            </Box>

            {/* CTA */}
            {onBegin ? (
              <Button variant="primary" size="lg" onClick={onBegin} className="px-8">
                <Play size={20} />
                {t('story.beginStory')}
              </Button>
            ) : (
              <VStack gap="xs" align="center" className="animate-bounce">
                <Typography variant="caption" className="text-white/60">
                  {t('story.scrollToBegin')}
                </Typography>
                <ChevronDown size={24} className="text-white/60" />
              </VStack>
            )}
          </VStack>
        </Box>
      </Box>
    );
  }

  /* --- Fallback: no cover image — simple centered layout --- */
  return (
    <Box className={className}>
      <VStack gap="xl" align="center" className="max-w-2xl mx-auto py-8 px-4">
        <VStack gap="md" align="center" className="text-center">
          <HStack gap="sm" align="center" justify="center">
            <DomainBadge domain={domain as KnowledgeDomainType} size="sm" />
            <Badge size="sm">{t(`story.difficulty.${difficulty}`)}</Badge>
            <Badge size="sm" variant="secondary">{t('story.duration', { minutes: String(duration) })}</Badge>
            {GameIcon && (
              <Badge size="sm" variant="secondary">
                <GameIcon size={14} />
              </Badge>
            )}
          </HStack>

          <Typography variant="h2" weight="bold" className="text-[var(--color-foreground)]">
            {title}
          </Typography>
        </VStack>

        <VStack gap="lg" className="w-full">
          <Typography variant="h3" weight="bold" className="text-[var(--color-foreground)] text-center">
            {hookQuestion}
          </Typography>
          <MarkdownContent content={hookNarrative} />
        </VStack>

        {onBegin ? (
          <Button variant="primary" size="lg" onClick={onBegin} className="px-8">
            <Play size={20} />
            {t('story.beginStory')}
          </Button>
        ) : (
          <VStack gap="xs" align="center" className="animate-bounce">
            <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
              {t('story.scrollToBegin')}
            </Typography>
            <ChevronDown size={24} className="text-[var(--color-muted-foreground)]" />
          </VStack>
        )}
      </VStack>
    </Box>
  );
};

StoryHookView.displayName = 'StoryHookView';
