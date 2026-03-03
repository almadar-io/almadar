/**
 * StoriesNavHeader Molecule
 *
 * Horizontal navigation header for story surfaces: logo (left),
 * nav links Stories + Explore (center), auth area (right).
 *
 * Event Contract:
 * - Emits: UI:NAV_STORIES, UI:NAV_EXPLORE, UI:NAV_SIGN_IN, UI:NAV_SIGN_OUT
 * - entityAware: false
 */

import React from 'react';
import {
  HStack,
  Box,
  Button,
  Typography,
  Avatar,
  useEventBus,
  useTranslate,
} from '@almadar/ui';
import { cn } from '@almadar/ui';
import { BookOpen, Compass, Library, LogIn, LogOut } from 'lucide-react';

export type StoriesActiveRoute = 'catalog' | 'explore' | 'story' | 'series';

export interface StoriesNavUser {
  name: string;
  avatar?: string;
}

export interface StoriesNavHeaderProps {
  activeRoute: StoriesActiveRoute;
  user?: StoriesNavUser;
  className?: string;
}

export const StoriesNavHeader: React.FC<StoriesNavHeaderProps> = ({
  activeRoute,
  user,
  className,
}) => {
  const { emit } = useEventBus();
  const { t } = useTranslate();

  return (
    <HStack
      gap="md"
      align="center"
      justify="between"
      className={cn(
        'px-6 py-3 border-b border-[var(--color-border)] bg-[var(--color-background)]',
        className,
      )}
    >
      {/* Logo / Brand */}
      <HStack gap="xs" align="center">
        <Typography variant="label" size="lg" weight="bold">
          {t('nav.knowledge')}
        </Typography>
      </HStack>

      {/* Nav Links */}
      <HStack gap="sm" align="center">
        <Button
          variant={activeRoute === 'catalog' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => emit('UI:NAV_STORIES', {})}
        >
          <BookOpen size={16} />
          {t('nav.stories')}
        </Button>
        <Button
          variant={activeRoute === 'explore' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => emit('UI:NAV_EXPLORE', {})}
        >
          <Compass size={16} />
          {t('nav.explore')}
        </Button>
        <Button
          variant={activeRoute === 'series' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => emit('UI:NAV_SERIES', {})}
        >
          <Library size={16} />
          {t('nav.series')}
        </Button>
      </HStack>

      {/* Auth Area */}
      <HStack gap="sm" align="center">
        {user ? (
          <>
            <Avatar name={user.name} src={user.avatar} size="sm" />
            <Typography variant="caption">{user.name}</Typography>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => emit('UI:NAV_SIGN_OUT', {})}
            >
              <LogOut size={16} />
            </Button>
          </>
        ) : (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => emit('UI:NAV_SIGN_IN', {})}
          >
            <LogIn size={16} />
            {t('nav.signIn')}
          </Button>
        )}
      </HStack>
    </HStack>
  );
};

StoriesNavHeader.displayName = 'StoriesNavHeader';
