/**
 * Avatar Atom Component
 * 
 * A versatile avatar component supporting images, initials, icons, and status indicators.
 */

import React from 'react';
import { User } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/cn';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';

export interface AvatarProps {
  /**
   * Image source URL
   */
  src?: string;

  /**
   * Alt text for the image
   */
  alt?: string;

  /**
   * Full name - initials will be generated automatically
   */
  name?: string;

  /**
   * Initials to display (e.g., "JD" for John Doe)
   * If not provided but name is, initials will be auto-generated
   */
  initials?: string;

  /**
   * Icon to display when no image or initials
   */
  icon?: LucideIcon;

  /**
   * Size of the avatar
   * @default 'md'
   */
  size?: AvatarSize;

  /**
   * Status indicator
   */
  status?: AvatarStatus;

  /**
   * Badge content (e.g., notification count)
   */
  badge?: string | number;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Click handler
   */
  onClick?: () => void;
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
};

const iconSizeClasses: Record<AvatarSize, string> = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
};

const statusSizeClasses: Record<AvatarSize, string> = {
  xs: 'w-1.5 h-1.5',
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
  xl: 'w-4 h-4',
};

const statusClasses: Record<AvatarStatus, string> = {
  online: 'bg-black',
  offline: 'bg-neutral-400',
  away: 'bg-neutral-600',
  busy: 'bg-black',
};

const badgeSizeClasses: Record<AvatarSize, string> = {
  xs: 'w-3 h-3 text-[8px]',
  sm: 'w-4 h-4 text-[10px]',
  md: 'w-5 h-5 text-xs',
  lg: 'w-6 h-6 text-sm',
  xl: 'w-7 h-7 text-base',
};

/**
 * Generate initials from a full name
 */
function generateInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  initials: providedInitials,
  icon: Icon,
  size = 'md',
  status,
  badge,
  className,
  onClick,
}) => {
  // Auto-generate initials from name if not provided
  const initials = providedInitials ?? (name ? generateInitials(name) : undefined);

  const hasImage = !!src;
  const hasInitials = !!initials;
  const hasIcon = !!Icon;

  // Generate background based on initials (wireframe: black/white only)
  const getInitialsBackground = () => 'bg-black text-white';

  return (
    <div className="relative inline-block">
      <div
        className={cn(
          'relative inline-flex items-center justify-center',
          'bg-neutral-200 border-2 border-black',
          'overflow-hidden',
          sizeClasses[size],
          onClick && 'cursor-pointer hover:bg-neutral-100 transition-colors',
          className
        )}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
      >
        {hasImage ? (
          <img
            src={src}
            alt={alt || 'Avatar'}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to initials or icon on image error
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        ) : hasInitials ? (
          <div
            className={cn(
              'w-full h-full flex items-center justify-center font-bold',
              getInitialsBackground()
            )}
          >
            {initials.substring(0, 2).toUpperCase()}
          </div>
        ) : hasIcon ? (
          <Icon className={cn('text-black', iconSizeClasses[size])} />
        ) : (
          <User className={cn('text-black', iconSizeClasses[size])} />
        )}
      </div>

      {/* Status indicator */}
      {status && (
        <div
          className={cn(
            'absolute bottom-0 right-0 border-2 border-white',
            statusClasses[status],
            statusSizeClasses[size]
          )}
          aria-label={`Status: ${status}`}
        />
      )}

      {/* Badge */}
      {badge !== undefined && (
        <div
          className={cn(
            'absolute -top-1 -right-1 flex items-center justify-center',
            'bg-black text-white font-bold',
            'border-2 border-white',
            badgeSizeClasses[size]
          )}
          aria-label={`Badge: ${badge}`}
        >
          {typeof badge === 'number' && badge > 99 ? '99+' : badge}
        </div>
      )}
    </div>
  );
};

Avatar.displayName = 'Avatar';

