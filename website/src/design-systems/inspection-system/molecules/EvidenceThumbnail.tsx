/**
 * EvidenceThumbnail
 *
 * Thumbnail component for evidence photos.
 * Compact display with view/delete actions.
 *
 * Event Contract:
 * - Emits: UI:VIEW_PHOTO with { photo }
 * - Emits: UI:DELETE_PHOTO with { photoId }
 */

import React from "react";
import { Image, ZoomIn, Trash2, Camera } from "lucide-react";
import {
  cn,
  HStack,
  Typography,
  useEventBus,
} from '@almadar/ui';

export interface EvidenceThumbnailProps {
  /** Photo ID */
  id?: string;
  /** Photo URL */
  url?: string;
  /** Thumbnail URL (smaller version) */
  thumbnail?: string;
  /** Photo caption */
  caption?: string;
  /** Photo timestamp */
  timestamp?: string;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Allow deletion */
  allowDelete?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Click handler */
  onClick?: () => void;
  /** Delete handler */
  onDelete?: () => void;
}

const sizeConfig = {
  sm: { container: "w-12 h-12", icon: "h-4 w-4" },
  md: { container: "w-16 h-16", icon: "h-5 w-5" },
  lg: { container: "w-24 h-24", icon: "h-6 w-6" },
};

export const EvidenceThumbnail: React.FC<EvidenceThumbnailProps> = ({
  id,
  url,
  thumbnail,
  caption,
  timestamp,
  size = "md",
  allowDelete = true,
  className,
  onClick,
  onDelete,
}) => {
  const eventBus = useEventBus();
  const sizeStyle = sizeConfig[size];

  const handleClick = () => {
    onClick?.();
    eventBus.emit("UI:VIEW_PHOTO", { photo: { id, url, thumbnail, caption, timestamp } });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
    eventBus.emit("UI:DELETE_PHOTO", { photoId: id });
  };

  return (
    <div
      className={cn(
        "relative group rounded-lg overflow-hidden bg-neutral-100 cursor-pointer",
        sizeStyle.container,
        className
      )}
      onClick={handleClick}
    >
      {url ? (
        <img
          src={thumbnail || url}
          alt={caption || "Evidence photo"}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Camera className={cn("text-[var(--color-muted-foreground)]", sizeStyle.icon)} />
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
        <ZoomIn className={cn("text-white opacity-0 group-hover:opacity-100 transition-opacity", sizeStyle.icon)} />
      </div>

      {/* Delete button */}
      {allowDelete && (
        <button
          onClick={handleDelete}
          className={cn(
            "absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full",
            "opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600",
            size === "sm" ? "p-0.5" : "p-1"
          )}
        >
          <Trash2 className={size === "sm" ? "h-2 w-2" : "h-3 w-3"} />
        </button>
      )}
    </div>
  );
};

// Compound component for a row of thumbnails
export interface EvidenceThumbnailRowProps {
  /** Photos to display */
  photos?: Array<{ id: string; url: string; thumbnail?: string; caption?: string }>;
  /** Max visible thumbnails */
  maxVisible?: number;
  /** Size of thumbnails */
  size?: "sm" | "md" | "lg";
  /** Allow deletion */
  allowDelete?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const EvidenceThumbnailRow: React.FC<EvidenceThumbnailRowProps> = ({
  photos = [],
  maxVisible = 4,
  size = "sm",
  allowDelete = false,
  className,
}) => {
  const eventBus = useEventBus();
  const visiblePhotos = photos.slice(0, maxVisible);
  const hiddenCount = photos.length - maxVisible;

  const handleViewAll = () => {
    eventBus.emit("UI:VIEW_GALLERY", { photos });
  };

  if (photos.length === 0) return null;

  return (
    <HStack gap="xs" className={className}>
      {visiblePhotos.map((photo) => (
        <EvidenceThumbnail
          key={photo.id}
          id={photo.id}
          url={photo.url}
          thumbnail={photo.thumbnail}
          caption={photo.caption}
          size={size}
          allowDelete={allowDelete}
        />
      ))}
      {hiddenCount > 0 && (
        <button
          onClick={handleViewAll}
          className={cn(
            "rounded-lg bg-neutral-200 flex items-center justify-center text-[var(--color-foreground)] hover:bg-neutral-300 transition-colors",
            sizeConfig[size].container
          )}
        >
          <Typography variant="small" className="font-medium">
            +{hiddenCount}
          </Typography>
        </button>
      )}
    </HStack>
  );
};

EvidenceThumbnail.displayName = "EvidenceThumbnail";
EvidenceThumbnailRow.displayName = "EvidenceThumbnailRow";
