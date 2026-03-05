import React, { useState, useCallback } from 'react';
import { 
  VStack, 
  HStack, 
  Box,
  Icon,
  Typography,
} from '@almadar/ui';
import { 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink,
  ImageOff,
  Grid3X3,
  X,
} from 'lucide-react';

interface Screenshot {
  storyId: string;
  storyName: string;
  title: string;
  filename: string;
}

interface ScreenshotGalleryProps {
  projectKey: string;
  storybookUrl: string;
  screenshots: Screenshot[];
  baseUrl?: string;
}

export function ScreenshotGallery({
  projectKey,
  storybookUrl,
  screenshots,
  baseUrl = '/screenshots',
}: ScreenshotGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageError, setImageError] = useState<Set<string>>(new Set());
  const [isFullscreen, setIsFullscreen] = useState(false);

  const selectedScreenshot = screenshots[selectedIndex];
  const totalScreenshots = screenshots.length;

  const handleImageError = (filename: string) => {
    setImageError(prev => new Set([...prev, filename]));
  };

  const goToNext = useCallback(() => {
    setSelectedIndex(prev => (prev + 1) % totalScreenshots);
  }, [totalScreenshots]);

  const goToPrevious = useCallback(() => {
    setSelectedIndex(prev => (prev - 1 + totalScreenshots) % totalScreenshots);
  }, [totalScreenshots]);

  const goToIndex = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  // Keyboard navigation for fullscreen
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, goToNext, goToPrevious]);

  if (screenshots.length === 0) {
    return (
      <Box className="p-8 text-center border border-dashed border-[var(--color-border)] rounded-[var(--radius-md)]">
        <Typography color="muted">No screenshots available</Typography>
      </Box>
    );
  }

  const storybookStoryUrl = `${storybookUrl}/?path=/story/${selectedScreenshot?.storyId}`;
  const imageFilename = selectedScreenshot?.filename.replace('.png', '.jpg');
  const imageSrc = `${baseUrl}/${projectKey}/${imageFilename}`;
  const hasImageError = imageError.has(imageFilename || '');

  return (
    <>
      <VStack gap="lg" className="screenshot-gallery">
        {/* Main Image Container - Click to open fullscreen */}
        <Box 
          className="relative border border-[var(--color-border)] rounded-[var(--radius-lg)] bg-[var(--color-muted)] cursor-pointer"
          onClick={() => setIsFullscreen(true)}
        >
          {/* Image Display */}
          <div className="relative aspect-[16/10] w-full bg-[var(--color-background)]">
            {hasImageError ? (
              <Box className="flex flex-col items-center justify-center w-full h-full bg-[var(--color-muted)]">
                <Icon icon={ImageOff} size="xl" color="text-[var(--color-muted-foreground)]" />
                <Typography color="muted" className="mt-4">
                  Screenshot not found
                </Typography>
              </Box>
            ) : (
              <img
                src={imageSrc}
                alt={selectedScreenshot?.storyName}
                className="w-full h-full object-cover object-top"
                onError={() => imageFilename && handleImageError(imageFilename)}
              />
            )}
          </div>
          
          {/* Overlay Controls */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Navigation Arrows - Center Left/Right */}
            {totalScreenshots > 1 && (
              <>
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrevious();
                    }}
                    className="button button--secondary button--sm shadow-md"
                    aria-label="Previous screenshot"
                  >
                    <Icon icon={ChevronLeft} size="md" />
                  </button>
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNext();
                    }}
                    className="button button--secondary button--sm shadow-md"
                    aria-label="Next screenshot"
                  >
                    <Icon icon={ChevronRight} size="md" />
                  </button>
                </div>
              </>
            )}

            {/* Counter Badge */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
              {selectedIndex + 1} / {totalScreenshots}
            </div>

            {/* Click hint - always visible */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
              Click to expand
            </div>
          </div>

          {/* Bottom Info Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent pointer-events-auto">
            <div className="p-4 pt-12">
              <HStack justify="between" align="center">
                <VStack gap="xs">
                  <Typography className="text-white font-medium text-base">
                    {selectedScreenshot?.storyName}
                  </Typography>
                  <Typography size="sm" className="text-white/70">
                    {selectedScreenshot?.title}
                  </Typography>
                </VStack>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(storybookStoryUrl, '_blank', 'noopener,noreferrer');
                  }}
                  className="button button--primary button--sm"
                >
                  <Icon icon={ExternalLink} size="sm" className="mr-2" />
                  Open in Storybook
                </button>
              </HStack>
            </div>
          </div>
        </Box>

        {/* Thumbnail Strip */}
        <div className="overflow-x-auto pb-2">
          <HStack gap="sm" className="min-w-full">
            {screenshots.map((screenshot, index) => {
              const thumbFilename = screenshot.filename.replace('.png', '.jpg');
              const thumbSrc = `${baseUrl}/${projectKey}/${thumbFilename}`;
              const isActive = index === selectedIndex;
              
              return (
                <button
                  key={screenshot.storyId}
                  onClick={() => goToIndex(index)}
                  className={`
                    flex-shrink-0 w-24 h-16 rounded-[var(--radius-md)] overflow-hidden 
                    border-2 transition-all duration-200
                    ${isActive 
                      ? 'border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20' 
                      : 'border-[var(--color-border)] hover:border-[var(--color-muted-foreground)]'
                    }
                  `}
                  title={screenshot.storyName}
                >
                  {imageError.has(thumbFilename) ? (
                    <Box className="w-full h-full bg-[var(--color-muted)] flex items-center justify-center">
                      <Icon icon={ImageOff} size="sm" color="text-[var(--color-muted-foreground)]" />
                    </Box>
                  ) : (
                    <img
                      src={thumbSrc}
                      alt={screenshot.storyName}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                      onError={() => handleImageError(thumbFilename)}
                    />
                  )}
                </button>
              );
            })}
          </HStack>
        </div>

        {/* Grid View Toggle */}
        <HStack justify="center" gap="sm">
          <Typography size="sm" color="muted">
            <Icon icon={Grid3X3} size="xs" className="inline mr-1" />
            Click thumbnails to navigate • Click image to expand
          </Typography>
        </HStack>
      </VStack>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-[2147483647] bg-black flex flex-col"
          onClick={() => setIsFullscreen(false)}
        >
          {/* Fullscreen Toolbar */}
          <div 
            className="flex items-center justify-between p-4 bg-black/80 backdrop-blur-sm z-10"
            onClick={e => e.stopPropagation()}
          >
            <VStack gap="xs">
              <Typography className="text-white font-medium">
                {selectedScreenshot?.storyName}
              </Typography>
              <Typography size="sm" className="text-white/70">
                {selectedScreenshot?.title}
              </Typography>
            </VStack>
            <HStack gap="sm">
              <button
                onClick={() => window.open(storybookStoryUrl, '_blank', 'noopener,noreferrer')}
                className="button button--primary button--sm"
              >
                <Icon icon={ExternalLink} size="sm" className="mr-2" />
                Storybook
              </button>
              <button
                onClick={() => setIsFullscreen(false)}
                className="button button--secondary button--sm"
              >
                <Icon icon={X} size="sm" className="mr-2" />
                Close
              </button>
            </HStack>
          </div>

          {/* Fullscreen Image */}
          <div 
            className="flex-1 relative flex items-center justify-center p-4"
            onClick={e => e.stopPropagation()}
          >
            {hasImageError ? (
              <Box className="flex flex-col items-center justify-center">
                <Icon icon={ImageOff} size="xl" color="text-[var(--color-muted-foreground)]" />
                <Typography color="muted" className="mt-4">
                  Screenshot not found
                </Typography>
              </Box>
            ) : (
              <img
                src={imageSrc}
                alt={selectedScreenshot?.storyName}
                className="max-w-full max-h-full object-contain rounded-[var(--radius-lg)]"
                onError={() => imageFilename && handleImageError(imageFilename)}
              />
            )}

            {/* Fullscreen Navigation */}
            {totalScreenshots > 1 && (
              <>
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <button
                    onClick={goToPrevious}
                    className="button button--secondary button--lg"
                    aria-label="Previous"
                  >
                    <Icon icon={ChevronLeft} size="lg" />
                  </button>
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <button
                    onClick={goToNext}
                    className="button button--secondary button--lg"
                    aria-label="Next"
                  >
                    <Icon icon={ChevronRight} size="lg" />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Fullscreen Thumbnail Strip */}
          <div 
            className="bg-black/80 backdrop-blur-sm p-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="overflow-x-auto">
              <HStack gap="sm" className="min-w-full justify-center">
                {screenshots.map((screenshot, index) => {
                  const thumbFilename = screenshot.filename.replace('.png', '.jpg');
                  const thumbSrc = `${baseUrl}/${projectKey}/${thumbFilename}`;
                  const isActive = index === selectedIndex;
                  
                  return (
                    <button
                      key={screenshot.storyId}
                      onClick={() => goToIndex(index)}
                      className={`
                        flex-shrink-0 w-20 h-14 rounded-[var(--radius-md)] overflow-hidden 
                        border-2 transition-all duration-200
                        ${isActive 
                          ? 'border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20' 
                          : 'border-white/30 hover:border-white/60'
                        }
                      `}
                      title={screenshot.storyName}
                    >
                      {imageError.has(thumbFilename) ? (
                        <Box className="w-full h-full bg-[var(--color-muted)] flex items-center justify-center">
                          <Icon icon={ImageOff} size="xs" color="text-[var(--color-muted-foreground)]" />
                        </Box>
                      ) : (
                        <img
                          src={thumbSrc}
                          alt={screenshot.storyName}
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                          onError={() => handleImageError(thumbFilename)}
                        />
                      )}
                    </button>
                  );
                })}
              </HStack>
            </div>
            <Typography size="sm" className="text-white/60 text-center mt-2">
              Use arrow keys to navigate • ESC to exit
            </Typography>
          </div>
        </div>
      )}
    </>
  );
}
