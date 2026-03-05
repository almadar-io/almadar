import React, { useState, useCallback } from 'react';
import { 
  VStack, 
  HStack, 
  Box,
  Button,
  Icon,
  Typography,
  Modal,
} from '@almadar/ui';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2,
  ExternalLink,
  ImageOff,
  Grid3X3,
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

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullscreen) {
        if (e.key === 'ArrowRight') goToNext();
        if (e.key === 'ArrowLeft') goToPrevious();
        if (e.key === 'Escape') setIsFullscreen(false);
      }
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
        {/* Main Image Container */}
        <Box className="relative border border-[var(--color-border)] rounded-[var(--radius-lg)] overflow-hidden bg-[var(--color-muted)]">
          {/* Image Display - Fixed height for better visibility */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--color-background)]">
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
                className="w-full h-full object-cover object-top transition-transform duration-300"
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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={goToPrevious}
                    className="bg-[var(--color-background)]/80 backdrop-blur-sm hover:bg-[var(--color-background)] shadow-md"
                    leftIcon={<Icon icon={ChevronLeft} size="md" />}
                    aria-label="Previous screenshot"
                  />
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-auto">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={goToNext}
                    className="bg-[var(--color-background)]/80 backdrop-blur-sm hover:bg-[var(--color-background)] shadow-md"
                    leftIcon={<Icon icon={ChevronRight} size="md" />}
                    aria-label="Next screenshot"
                  />
                </div>
              </>
            )}

            {/* Top Right Controls */}
            <div className="absolute top-4 right-4 pointer-events-auto flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(true)}
                className="bg-[var(--color-background)]/80 backdrop-blur-sm hover:bg-[var(--color-background)] shadow-md"
                leftIcon={<Icon icon={Maximize2} size="sm" />}
                aria-label="Enter fullscreen"
              />
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
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => window.open(storybookStoryUrl, '_blank', 'noopener,noreferrer')}
                    rightIcon={<Icon icon={ExternalLink} size="sm" />}
                  >
                    Open in Storybook
                  </Button>
                </HStack>
              </div>
            </div>
          </div>

          {/* Counter Badge */}
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
            {selectedIndex + 1} / {totalScreenshots}
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
            Click thumbnails to navigate
          </Typography>
        </HStack>
      </VStack>

      {/* Fullscreen Modal */}
      <Modal
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        size="full"
        showCloseButton={false}
        className="bg-black/95"
      >
        <div className="fixed inset-0 flex flex-col">
          {/* Fullscreen Toolbar */}
          <div className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-sm">
            <VStack gap="xs">
              <Typography className="text-white font-medium">
                {selectedScreenshot?.storyName}
              </Typography>
              <Typography size="sm" className="text-white/70">
                {selectedScreenshot?.title}
              </Typography>
            </VStack>
            <HStack gap="sm">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(storybookStoryUrl, '_blank', 'noopener,noreferrer')}
                className="text-white hover:bg-white/20"
                rightIcon={<Icon icon={ExternalLink} size="sm" />}
              >
                Storybook
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(false)}
                className="text-white hover:bg-white/20"
                leftIcon={<Icon icon={Minimize2} size="sm" />}
              >
                Exit
              </Button>
            </HStack>
          </div>

          {/* Fullscreen Image */}
          <div className="flex-1 relative flex items-center justify-center p-4">
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
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={goToPrevious}
                    className="bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
                    leftIcon={<Icon icon={ChevronLeft} size="lg" />}
                    aria-label="Previous"
                  />
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={goToNext}
                    className="bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
                    leftIcon={<Icon icon={ChevronRight} size="lg" />}
                    aria-label="Next"
                  />
                </div>
              </>
            )}
          </div>

          {/* Fullscreen Thumbnail Strip */}
          <div className="bg-black/50 backdrop-blur-sm p-4">
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
      </Modal>
    </>
  );
}
