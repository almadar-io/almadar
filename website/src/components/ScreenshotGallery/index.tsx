import React, { useState } from 'react';
import { ExternalLink, ImageOff } from 'lucide-react';

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
  optimized?: boolean;
}

export function ScreenshotGallery({
  projectKey,
  storybookUrl,
  screenshots,
  baseUrl = '/screenshots',
  optimized = true,
}: ScreenshotGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageError, setImageError] = useState<Set<string>>(new Set());

  const selectedScreenshot = screenshots[selectedIndex];

  const handleImageError = (filename: string) => {
    setImageError(prev => new Set([...prev, filename]));
  };

  if (screenshots.length === 0) {
    return (
      <div className="p-8 text-center border border-dashed border-slate-300 rounded-lg">
        <span className="text-slate-500">No screenshots available</span>
      </div>
    );
  }

  // Build the Storybook story URL for the external link
  const storybookStoryUrl = `${storybookUrl}/?path=/story/${selectedScreenshot?.storyId}`;

  return (
    <div className="flex flex-col gap-6 screenshot-gallery">
      {/* Main Screenshot Display */}
      <div className="relative border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
        {selectedScreenshot && (
          <>
            <div className="aspect-video w-full overflow-hidden">
              {imageError.has(selectedScreenshot.filename.replace('.png', '.jpg')) ? (
                <div className="flex flex-col items-center justify-center w-full h-full bg-slate-100">
                  <ImageOff className="w-12 h-12 text-slate-400" />
                  <span className="mt-2 text-slate-500">Screenshot not found</span>
                </div>
              ) : (
                <img
                  src={`${baseUrl}/${projectKey}/${selectedScreenshot.filename.replace('.png', '.jpg')}`}
                  alt={selectedScreenshot.storyName}
                  className="w-full h-full object-cover object-top"
                  onError={() => handleImageError(selectedScreenshot.filename.replace('.png', '.jpg'))}
                />
              )}
            </div>
            
            {/* Overlay with info and link */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-white font-medium text-base">
                    {selectedScreenshot.storyName}
                  </span>
                  <span className="text-white/70 text-sm">
                    {selectedScreenshot.title}
                  </span>
                </div>
                <a
                  href={storybookStoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-900 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium whitespace-nowrap"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open in Storybook
                </a>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      <div className="overflow-x-auto">
        <div className="flex gap-2 pb-2 min-w-full">
          {screenshots.map((screenshot, index) => (
            <button
              key={screenshot.storyId}
              onClick={() => setSelectedIndex(index)}
              className={`flex-shrink-0 w-32 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                index === selectedIndex
                  ? 'border-indigo-500 ring-2 ring-indigo-200'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
              title={screenshot.storyName}
            >
              {imageError.has(screenshot.filename.replace('.png', '.jpg')) ? (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                  <ImageOff className="w-6 h-6 text-slate-300" />
                </div>
              ) : (
                <img
                  src={`${baseUrl}/${projectKey}/${screenshot.filename.replace('.png', '.jpg')}`}
                  alt={screenshot.storyName}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  onError={() => handleImageError(screenshot.filename.replace('.png', '.jpg'))}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <span className="text-sm text-slate-500 text-center">
        {selectedIndex + 1} of {screenshots.length}
      </span>
    </div>
  );
}
