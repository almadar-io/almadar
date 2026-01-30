/**
 * Header Organism Component
 * 
 * A header component for mobile/responsive layouts with menu toggle, brand, and user avatar.
 * Styled to match the main Layout component's mobile header.
 */

import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Menu, X } from 'lucide-react';
import { SearchInput } from '../molecules/SearchInput';
import { Avatar } from '../atoms/Avatar';
import { Badge } from '../atoms/Badge';
import { cn } from '../../lib/cn';

export interface HeaderProps {
  /**
   * Logo/Brand content
   */
  logo?: React.ReactNode;

  /**
   * Logo image source
   */
  logoSrc?: string;

  /**
   * Brand/App name
   */
  brandName?: string;

  /**
   * Navigation items (for desktop header variant)
   */
  navigationItems?: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: LucideIcon;
    badge?: string | number;
    active?: boolean;
  }>;

  /**
   * Show menu toggle button
   * @default true
   */
  showMenuToggle?: boolean;

  /**
   * Is menu open (for toggle icon)
   */
  isMenuOpen?: boolean;

  /**
   * Menu toggle callback
   */
  onMenuToggle?: () => void;

  /**
   * Show search input
   * @default false
   */
  showSearch?: boolean;

  /**
   * Search placeholder
   */
  searchPlaceholder?: string;

  /**
   * Search callback
   */
  onSearch?: (value: string) => void;

  /**
   * User avatar configuration
   */
  userAvatar?: {
    src?: string;
    alt?: string;
    initials?: string;
  };

  /**
   * User name (display name or email)
   */
  userName?: string;

  /**
   * Callback when user avatar is clicked
   */
  onUserClick?: () => void;

  /**
   * Action buttons (right side)
   */
  actions?: React.ReactNode;

  /**
   * Sticky header
   * @default true
   */
  sticky?: boolean;

  /**
   * Variant - mobile shows menu toggle, desktop shows full nav
   * @default 'mobile'
   */
  variant?: 'mobile' | 'desktop';

  /**
   * Callback when logo/brand is clicked
   */
  onLogoClick?: () => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  logo,
  logoSrc,
  brandName = 'KFlow',
  navigationItems,
  showMenuToggle = true,
  isMenuOpen = false,
  onMenuToggle,
  showSearch = false,
  searchPlaceholder = 'Search...',
  onSearch,
  userAvatar,
  userName,
  onUserClick,
  actions,
  sticky = true,
  variant = 'mobile',
  onLogoClick,
  className,
}) => {
  // Get user initials
  const userInitials = userAvatar?.initials || userName?.[0]?.toUpperCase() || 'U';

  return (
    <header
      className={cn(
        'h-16 border-b border-black',
        'flex items-center px-4 justify-between bg-white',
        sticky && 'sticky top-0 z-50',
        variant === 'mobile' && 'lg:hidden',
        className
      )}
    >
      {/* Left section: Menu toggle + Brand */}
      <div className="flex items-center gap-3">
        {/* Menu toggle button */}
        {showMenuToggle && (
          <button
            onClick={onMenuToggle}
            className="p-2 -ml-2 text-black hover:bg-neutral-100 transition-colors"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}

        {/* Logo/Brand */}
        <div
          className={cn('flex items-center gap-2', onLogoClick && 'cursor-pointer')}
          onClick={onLogoClick}
        >
          {logo ? (
            typeof logo === 'string' ? (
              <img src={logo} alt={brandName} className="h-8 w-8" />
            ) : (
              logo
            )
          ) : logoSrc ? (
            <img src={logoSrc} alt={brandName} className="h-8 w-8" />
          ) : null}

          {brandName && (
            <span className="text-lg font-bold text-black">
              {brandName}
            </span>
          )}
        </div>
      </div>

      {/* Center section: Navigation (desktop variant) or Search */}
      {variant === 'desktop' && navigationItems && navigationItems.length > 0 && (
        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {navigationItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors',
                item.active
                  ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
              )}
            >
              {item.icon && <item.icon size={18} />}
              <span className="font-medium">{item.label}</span>
              {item.badge !== undefined && (
                <Badge variant="danger" size="sm">{item.badge}</Badge>
              )}
            </button>
          ))}
        </nav>
      )}

      {/* Search (if enabled) */}
      {showSearch && (
        <div className="hidden lg:block flex-1 max-w-md mx-4">
          <SearchInput
            placeholder={searchPlaceholder}
            onSearch={onSearch}
          />
        </div>
      )}

      {/* Right section: Actions + User */}
      <div className="flex items-center gap-3">
        {/* Custom actions */}
        {actions}

        {/* User avatar */}
        {(userAvatar || userName) && (
          <button
            onClick={onUserClick}
            className={cn(
              'w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center',
              'text-indigo-700 dark:text-indigo-300 font-bold text-xs',
              'hover:ring-2 hover:ring-indigo-300 dark:hover:ring-indigo-700 transition-all',
              onUserClick && 'cursor-pointer'
            )}
          >
            {userAvatar?.src ? (
              <Avatar
                src={userAvatar.src}
                alt={userAvatar.alt || userName}
                size="sm"
              />
            ) : (
              userInitials
            )}
          </button>
        )}
      </div>
    </header>
  );
};

Header.displayName = 'Header';
