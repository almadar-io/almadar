/**
 * PhotoAttachment
 *
 * Photo capture and display component for inspection evidence.
 * Supports camera capture and file upload.
 *
 * Event Contract:
 * - Emits: UI:PHOTO_CAPTURED { photo, context }
 * - Emits: UI:PHOTO_REMOVED { photoId, context }
 */

import React, { useState, useCallback, useRef } from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { VStack, HStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Button } from "../../../components/atoms/Button";
import { useEventBus } from "../../../hooks/useEventBus";
import { Camera, Upload, X, Image, ZoomIn, Trash2 } from "lucide-react";

export interface Photo {
  id: string;
  url: string;
  thumbnail?: string;
  caption?: string;
  timestamp?: string;
}

export interface PhotoAttachmentProps {
  /** Attached photos */
  photos?: Photo[];
  /** Context for events (e.g., ruleId, findingId) */
  context?: Record<string, string>;
  /** Maximum photos allowed */
  maxPhotos?: number;
  /** Allow camera capture */
  allowCamera?: boolean;
  /** Allow file upload */
  allowUpload?: boolean;
  /** Read-only mode */
  readOnly?: boolean;
  /** Compact mode (thumbnails only) */
  compact?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Photo added handler */
  onPhotoAdded?: (file: File) => void;
  /** Photo removed handler */
  onPhotoRemoved?: (photoId: string) => void;
  /** Photo clicked handler */
  onPhotoClick?: (photo: Photo) => void;
}

export const PhotoAttachment: React.FC<PhotoAttachmentProps> = ({
  photos = [],
  context = {},
  maxPhotos = 5,
  allowCamera = true,
  allowUpload = true,
  readOnly = false,
  compact = false,
  className,
  onPhotoAdded,
  onPhotoRemoved,
  onPhotoClick,
}) => {
  const eventBus = useEventBus();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewPhoto, setPreviewPhoto] = useState<Photo | null>(null);

  const canAddMore = photos.length < maxPhotos && !readOnly;

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files || files.length === 0) return;

      const file = files[0];
      onPhotoAdded?.(file);
      eventBus.emit("UI:PHOTO_CAPTURED", { photo: file, context });

      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [context, onPhotoAdded, eventBus]
  );

  const handleRemove = useCallback(
    (photoId: string) => {
      onPhotoRemoved?.(photoId);
      eventBus.emit("UI:PHOTO_REMOVED", { photoId, context });
    },
    [context, onPhotoRemoved, eventBus]
  );

  const handlePhotoClick = useCallback(
    (photo: Photo) => {
      onPhotoClick?.(photo);
      setPreviewPhoto(photo);
    },
    [onPhotoClick]
  );

  const triggerFileInput = useCallback((capture?: boolean) => {
    if (fileInputRef.current) {
      if (capture) {
        fileInputRef.current.setAttribute("capture", "environment");
      } else {
        fileInputRef.current.removeAttribute("capture");
      }
      fileInputRef.current.click();
    }
  }, []);

  return (
    <VStack gap="sm" className={cn("w-full", className)}>
      {/* Photo grid */}
      {photos.length > 0 && (
        <Box
          className={cn(
            "grid gap-2",
            compact ? "grid-cols-6" : "grid-cols-3 md:grid-cols-4"
          )}
        >
          {photos.map((photo) => (
            <Box
              key={photo.id}
              rounded="lg"
              className={cn(
                "relative group overflow-hidden bg-neutral-100",
                compact ? "aspect-square" : "aspect-video"
              )}
            >
              <img
                src={photo.thumbnail || photo.url}
                alt={photo.caption || "Photo"}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => handlePhotoClick(photo)}
              />

              {/* Overlay actions */}
              <Box
                className={cn(
                  "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity",
                  "flex items-center justify-center gap-2"
                )}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePhotoClick(photo)}
                  className="text-white hover:text-white hover:bg-white/20"
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
                {!readOnly && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(photo.id)}
                    className="text-white hover:text-red-300 hover:bg-white/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </Box>

              {/* Caption */}
              {!compact && photo.caption && (
                <Box
                  padding="xs"
                  className="absolute bottom-0 left-0 right-0 bg-black/60"
                >
                  <Typography variant="small" className="text-white truncate">
                    {photo.caption}
                  </Typography>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* Add photo buttons */}
      {canAddMore && (
        <HStack gap="sm">
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {allowCamera && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => triggerFileInput(true)}
              className="gap-1"
            >
              <Camera className="h-4 w-4" />
              {!compact && "Camera"}
            </Button>
          )}

          {allowUpload && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => triggerFileInput(false)}
              className="gap-1"
            >
              <Upload className="h-4 w-4" />
              {!compact && "Upload"}
            </Button>
          )}

          {photos.length > 0 && (
            <Typography variant="small" className="text-neutral-500 self-center">
              {photos.length}/{maxPhotos}
            </Typography>
          )}
        </HStack>
      )}

      {/* Empty state */}
      {photos.length === 0 && !canAddMore && (
        <Box
          rounded="lg"
          padding="md"
          className="bg-neutral-50 border border-dashed border-neutral-300"
        >
          <VStack align="center" gap="xs" className="text-neutral-400">
            <Image className="h-6 w-6" />
            <Typography variant="small">No photos attached</Typography>
          </VStack>
        </Box>
      )}

      {/* Photo preview modal - simplified */}
      {previewPhoto && (
        <Box
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setPreviewPhoto(null)}
        >
          <Box className="relative max-w-4xl max-h-full">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPreviewPhoto(null)}
              className="absolute top-2 right-2 text-white hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </Button>
            <img
              src={previewPhoto.url}
              alt={previewPhoto.caption || "Photo preview"}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            {previewPhoto.caption && (
              <Typography variant="body" className="text-white text-center mt-2">
                {previewPhoto.caption}
              </Typography>
            )}
          </Box>
        </Box>
      )}
    </VStack>
  );
};

PhotoAttachment.displayName = "PhotoAttachment";
