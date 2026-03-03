/**
 * StoryNarrativeView Molecule
 *
 * Renders story scenes as a flat list of narrative cards (scroll-driven).
 * Each scene has a title and markdown narrative content.
 *
 * Exports:
 * - StorySceneCard — renders a single scene (used by scroll board)
 * - StoryNarrativeView — renders all scenes as a flat list
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
  Typography,
  useTranslate,
} from '@almadar/ui';
import { MarkdownContent } from '../markdown/MarkdownContent';

export interface StoryScene {
  title: string;
  narrative: string;
  /** Full CDN URL for scene illustration */
  illustration?: string;
  /** Image generation prompt (stored in .orb, not rendered) */
  imagePrompt?: string;
  /** Character portraits shown below the illustration */
  characters?: Array<{ name: string; portrait: string }>;
  /** Secondary diagram/infographic image */
  diagram?: string;
}

// ---------------------------------------------------------------------------
// StorySceneCard — renders a single scene
// ---------------------------------------------------------------------------

export interface StorySceneCardProps {
  scene: StoryScene;
  sceneNumber: number;
  totalScenes: number;
  className?: string;
}

export const StorySceneCard: React.FC<StorySceneCardProps> = ({
  scene,
  sceneNumber,
  totalScenes,
  className,
}) => {
  const { t } = useTranslate();
  const [imgError, setImgError] = useState(false);

  useEffect(() => { setImgError(false); }, [scene.illustration]);

  const hasIllustration = Boolean(scene.illustration) && !imgError;

  /* Character portraits */
  const charactersEl = scene.characters && scene.characters.length > 0 ? (
    <HStack gap="sm" className="flex-wrap">
      {scene.characters.map((char) => (
        <VStack key={char.name} gap="xs" align="center" className="w-16">
          <Box className="w-12 h-12 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm">
            <img
              src={char.portrait}
              alt={char.name}
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </Box>
          <Typography variant="caption" className="text-center text-white/80 truncate w-full">
            {char.name}
          </Typography>
        </VStack>
      ))}
    </HStack>
  ) : null;

  /* --- Illustrated scene: full-bleed background with text overlay --- */
  if (hasIllustration) {
    return (
      <Box
        className={className}
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        {/* Background image — fills the entire section */}
        <img
          src={scene.illustration}
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

        {/* Gradient overlay — dark at bottom for text readability */}
        <Box
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.85) 70%)',
          }}
        />

        {/* Text content — positioned at the bottom */}
        <Box
          style={{ position: 'relative', minHeight: '100vh' }}
          className="flex flex-col justify-end"
        >
          <VStack gap="md" className="max-w-3xl mx-auto px-6 pb-12 pt-[50vh]">
            {/* Scene counter */}
            <Typography variant="caption" className="text-white/60">
              {t('story.scene', { current: String(sceneNumber), total: String(totalScenes) })}
            </Typography>

            {/* Title */}
            <Typography variant="h2" weight="bold" className="text-white">
              {scene.title}
            </Typography>

            {/* Character portraits */}
            {charactersEl}

            {/* Narrative text */}
            <Box className="text-white/90 [&_p]:text-white/90 [&_strong]:text-white [&_em]:text-white/80">
              <MarkdownContent content={scene.narrative} />
            </Box>

            {/* Diagram — inline below text if present */}
            {scene.diagram && (
              <Box className="w-full max-h-40 overflow-hidden rounded-lg">
                <img
                  src={scene.diagram}
                  alt={`${scene.title} diagram`}
                  className="w-full h-full object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </Box>
            )}
          </VStack>
        </Box>
      </Box>
    );
  }

  /* --- Text-only scene (no illustration) — simple centered layout --- */
  return (
    <Box className={className}>
      <VStack gap="md" className="max-w-2xl mx-auto py-6 px-4">
        <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
          {t('story.scene', { current: String(sceneNumber), total: String(totalScenes) })}
        </Typography>

        <Typography variant="h3" weight="bold" className="text-[var(--color-foreground)]">
          {scene.title}
        </Typography>

        <MarkdownContent content={scene.narrative} />
      </VStack>
    </Box>
  );
};

StorySceneCard.displayName = 'StorySceneCard';

// ---------------------------------------------------------------------------
// StoryNarrativeView — flat list of all scenes (no navigation buttons)
// ---------------------------------------------------------------------------

export interface StoryNarrativeViewProps {
  scenes: StoryScene[];
  className?: string;
}

export const StoryNarrativeView: React.FC<StoryNarrativeViewProps> = ({
  scenes,
  className,
}) => {
  if (!scenes.length) return null;

  return (
    <Box className={className}>
      <VStack gap="none">
        {scenes.map((scene, i) => (
          <StorySceneCard
            key={i}
            scene={scene}
            sceneNumber={i + 1}
            totalScenes={scenes.length}
          />
        ))}
      </VStack>
    </Box>
  );
};

StoryNarrativeView.displayName = 'StoryNarrativeView';
