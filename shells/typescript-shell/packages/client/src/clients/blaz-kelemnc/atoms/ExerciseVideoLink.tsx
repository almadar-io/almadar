/**
 * ExerciseVideoLink
 *
 * Compact display of exercise with video thumbnail and play action.
 * Video demonstrations are key for exercise instruction.
 *
 * Event Contract:
 * - Emits: UI:PLAY_VIDEO - when video link is clicked
 * - Payload: { videoUrl, exerciseName, entity }
 */

import React, { useCallback } from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { HStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { useEventBus } from "../../../hooks/useEventBus";
import { Play, ExternalLink, Youtube } from "lucide-react";

export interface ExerciseVideoLinkProps {
  /** Exercise name */
  exerciseName: string;
  /** Video URL (YouTube) */
  videoUrl: string;
  /** Compact mode */
  compact?: boolean;
  /** Entity context for events */
  entity?: string;
  /** Additional CSS classes */
  className?: string;
}

// Extract YouTube video ID from URL
const getYoutubeVideoId = (url: string | undefined | null): string | null => {
  if (!url) return null;

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

// Get YouTube thumbnail URL
const getYoutubeThumbnail = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
};

export const ExerciseVideoLink: React.FC<ExerciseVideoLinkProps> = ({
  exerciseName,
  videoUrl,
  compact = false,
  entity = "Exercise",
  className,
}) => {
  const eventBus = useEventBus();
  const videoId = getYoutubeVideoId(videoUrl);

  // Emit PLAY_VIDEO event
  const handleClick = useCallback(() => {
    eventBus.emit("UI:PLAY_VIDEO", {
      videoUrl,
      exerciseName,
      entity,
    });
  }, [eventBus, videoUrl, exerciseName, entity]);

  if (compact) {
    return (
      <Box
        as="button"
        onClick={handleClick}
        className={cn(
          "inline-flex items-center gap-1 cursor-pointer text-red-600 hover:text-red-700",
          className,
        )}
      >
        <Youtube className="h-4 w-4" />
        <Typography variant="small" className="underline">
          Watch
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      rounded="lg"
      border
      className={cn(
        "overflow-hidden cursor-pointer hover:shadow-md transition-shadow",
        className,
      )}
      onClick={handleClick}
    >
      {/* Thumbnail */}
      <Box position="relative" className="aspect-video bg-neutral-100">
        {videoId ? (
          <>
            <img
              src={getYoutubeThumbnail(videoId)}
              alt={exerciseName}
              className="w-full h-full object-cover"
            />
            <Box
              position="absolute"
              className="inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
            >
              <Box
                display="flex"
                rounded="full"
                className="h-12 w-12 items-center justify-center bg-red-600"
              >
                <Play className="h-6 w-6 text-white fill-white" />
              </Box>
            </Box>
          </>
        ) : (
          <Box className="w-full h-full flex items-center justify-center">
            <Youtube className="h-8 w-8 text-neutral-300" />
          </Box>
        )}
      </Box>

      {/* Label */}
      <Box padding="sm" className="bg-white">
        <HStack justify="between" align="center">
          <Typography variant="body" className="font-medium truncate">
            {exerciseName}
          </Typography>
          <ExternalLink className="h-4 w-4 text-neutral-400 flex-shrink-0" />
        </HStack>
      </Box>
    </Box>
  );
};

ExerciseVideoLink.displayName = "ExerciseVideoLink";
