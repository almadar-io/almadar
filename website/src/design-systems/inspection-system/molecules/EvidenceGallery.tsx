/**
 * EvidenceGallery
 *
 * Gallery component for displaying evidence photos.
 * Supports viewing, adding, and removing photos.
 *
 * Event Contract:
 * - Emits: UI:VIEW_PHOTO with { photo }
 * - Emits: UI:ADD_PHOTO
 * - Emits: UI:DELETE_PHOTO with { photoId }
 */

import React, { useState } from "react";
import {
  Image,
  Plus,
  Trash2,
  ZoomIn,
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  cn,
  VStack,
  HStack,
  Typography,
  Card,
  Button,
  useEventBus,
} from '@almadar/ui';

export interface EvidencePhoto {
  id: string;
  url: string;
  thumbnail?: string;
  caption?: string;
  timestamp?: string;
  location?: string;
}

export interface EvidenceGalleryProps {
  /** Photos to display */
  photos?: EvidencePhoto[];
  /** Photos data alias */
  items?: EvidencePhoto[];
  /** Allow adding photos */
  allowAdd?: boolean;
  /** Allow deleting photos */
  allowDelete?: boolean;
  /** Max photos allowed */
  maxPhotos?: number;
  /** Empty state message */
  emptyMessage?: string;
  /** Grid columns */
  columns?: 2 | 3 | 4;
  /** Additional CSS classes */
  className?: string;
}

export const EvidenceGallery: React.FC<EvidenceGalleryProps> = ({
  photos,
  items,
  allowAdd = true,
  allowDelete = true,
  maxPhotos = 10,
  emptyMessage = "No photos attached",
  columns = 3,
  className,
}) => {
  const eventBus = useEventBus();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const photoList = photos || items || [];
  const canAddMore = photoList.length < maxPhotos;

  const handleViewPhoto = (photo: EvidencePhoto, index: number) => {
    setSelectedIndex(index);
    eventBus.emit("UI:VIEW_PHOTO", { photo, index });
  };

  const handleAddPhoto = () => {
    eventBus.emit("UI:ADD_PHOTO", {});
  };

  const handleDeletePhoto = (photo: EvidencePhoto, e: React.MouseEvent) => {
    e.stopPropagation();
    eventBus.emit("UI:DELETE_PHOTO", { photoId: photo.id, photo });
  };

  const handleClose = () => {
    setSelectedIndex(null);
  };

  const handlePrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < photoList.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  };

  if (photoList.length === 0 && !allowAdd) {
    return (
      <Card className={cn("p-8", className)}>
        <VStack align="center" gap="md">
          <Image className="h-12 w-12 text-[var(--color-muted-foreground)]" />
          <Typography variant="body" className="text-[var(--color-muted-foreground)]">
            {emptyMessage}
          </Typography>
        </VStack>
      </Card>
    );
  }

  return (
    <>
      <VStack gap="md" className={className}>
        {/* Gallery grid */}
        <div className={cn("grid gap-3", gridCols[columns])}>
          {photoList.map((photo, index) => (
            <div
              key={photo.id}
              className="relative group aspect-square rounded-lg overflow-hidden bg-neutral-100 cursor-pointer"
              onClick={() => handleViewPhoto(photo, index)}
            >
              {photo.url ? (
                <img
                  src={photo.thumbnail || photo.url}
                  alt={photo.caption || `Evidence ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Image className="h-8 w-8 text-[var(--color-muted-foreground)]" />
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <ZoomIn className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Delete button */}
              {allowDelete && (
                <button
                  onClick={(e) => handleDeletePhoto(photo, e)}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              )}

              {/* Caption */}
              {photo.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                  <Typography variant="small" className="text-white line-clamp-1">
                    {photo.caption}
                  </Typography>
                </div>
              )}
            </div>
          ))}

          {/* Add photo button */}
          {allowAdd && canAddMore && (
            <button
              onClick={handleAddPhoto}
              className="aspect-square rounded-lg border-2 border-dashed border-neutral-300 hover:border-neutral-400 flex flex-col items-center justify-center gap-2 text-[var(--color-muted-foreground)] transition-colors"
            >
              <Plus className="h-6 w-6" />
              <Typography variant="small">Add Photo</Typography>
            </button>
          )}
        </div>

        {/* Photo count */}
        <HStack justify="between" align="center">
          <Typography variant="small" className="text-[var(--color-muted-foreground)]">
            {photoList.length} of {maxPhotos} photos
          </Typography>
          {allowAdd && canAddMore && (
            <Button variant="ghost" size="sm" onClick={handleAddPhoto} className="gap-1">
              <Camera className="h-3 w-3" />
              Add Photo
            </Button>
          )}
        </HStack>
      </VStack>

      {/* Lightbox modal */}
      {selectedIndex !== null && photoList[selectedIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={handleClose}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation */}
          {selectedIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 p-2 text-white hover:bg-white/10 rounded-full"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
          )}
          {selectedIndex < photoList.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 p-2 text-white hover:bg-white/10 rounded-full"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          )}

          {/* Image */}
          <div className="max-w-4xl max-h-[80vh] p-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={photoList[selectedIndex].url}
              alt={photoList[selectedIndex].caption || `Evidence ${selectedIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            {photoList[selectedIndex].caption && (
              <Typography variant="body" className="text-white text-center mt-4">
                {photoList[selectedIndex].caption}
              </Typography>
            )}
          </div>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 rounded-full">
            <Typography variant="small" className="text-white">
              {selectedIndex + 1} / {photoList.length}
            </Typography>
          </div>
        </div>
      )}
    </>
  );
};

EvidenceGallery.displayName = "EvidenceGallery";
