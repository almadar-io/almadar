/* eslint-disable almadar/organism-extends-entity-display, almadar/require-event-bus */
/**
 * AppShellBoard Organism
 *
 * Universal app chrome with sidebar navigation, mobile header,
 * theme toggle, and user section. Manages sidebar collapse/open state.
 *
 * Events Emitted:
 * - UI:NAV_CLICK — user clicks a navigation item, payload: { href }
 * - UI:TOGGLE_SIDEBAR — sidebar collapsed/expanded
 * - UI:TOGGLE_THEME — theme switch requested
 * - UI:SIGN_OUT — user signs out
 * - UI:USER_MENU — user avatar clicked
 */

import React, { useState, useCallback, useEffect } from 'react';
import type { LucideIcon } from 'lucide-react';
import { LogOut } from 'lucide-react';
import {
  Box,
  HStack,
  Avatar,
  Button,
  Typography,
  ThemeToggle,
  Sidebar,
  Header,
  Overlay,
  useEventBus,
  useEventListener,
  useTranslate,
  cn,
  type SidebarItem,
} from '@almadar/ui';

export interface AppShellNavItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  href: string;
  active?: boolean;
  badge?: string | number;
}

export interface AppShellUser {
  name: string;
  email?: string;
  avatar?: string;
}

export interface AppShellEntity {
  navigationItems: AppShellNavItem[];
  user?: AppShellUser;
  logo?: React.ReactNode;
  logoSrc?: string;
  brandName?: string;
  activeRoute: string;
  theme: 'light' | 'dark';
  sidebarCollapsed?: boolean;
}

export interface AppShellBoardProps {
  entity: AppShellEntity;
  children: React.ReactNode;
  className?: string;
}

export function AppShellBoard({
  entity,
  children,
  className = '',
}: AppShellBoardProps): React.JSX.Element {
  const { emit } = useEventBus();
  const { t } = useTranslate();
  const [collapsed, setCollapsed] = useState(entity.sidebarCollapsed ?? false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (entity.sidebarCollapsed !== undefined) {
      setCollapsed(entity.sidebarCollapsed);
    }
  }, [entity.sidebarCollapsed]);

  const handleNavClick = useCallback((href: string) => {
    emit('UI:NAV_CLICK', { href });
    setMobileOpen(false);
  }, [emit]);

  // Listen for sidebar collapse events from the Sidebar organism
  useEventListener('UI:SIDEBAR_COLLAPSE', useCallback((event: { payload?: { collapsed?: boolean } }) => {
    const newCollapsed = event.payload?.collapsed ?? !collapsed;
    setCollapsed(newCollapsed);
    emit('UI:TOGGLE_SIDEBAR', { collapsed: newCollapsed });
  }, [collapsed, emit]));

  // Listen for sidebar close events (mobile)
  useEventListener('UI:SIDEBAR_CLOSE', useCallback(() => {
    setMobileOpen(false);
  }, []));

  const handleThemeToggle = useCallback(() => {
    emit('UI:TOGGLE_THEME', {});
  }, [emit]);

  const handleSignOut = useCallback(() => {
    emit('UI:SIGN_OUT', {});
  }, [emit]);

  const handleUserMenu = useCallback(() => {
    emit('UI:USER_MENU', {});
  }, [emit]);

  const handleLogoClick = useCallback(() => {
    emit('UI:NAV_CLICK', { href: '/' });
  }, [emit]);

  // Listen for logo click events from the Sidebar organism
  useEventListener('UI:SIDEBAR_LOGO', handleLogoClick);

  const sidebarItems: SidebarItem[] = entity.navigationItems.map((item) => ({
    id: item.id,
    label: item.label,
    icon: item.icon,
    badge: item.badge,
    active: item.active ?? item.href === entity.activeRoute,
    onClick: () => handleNavClick(item.href),
  }));

  const userSection = entity.user ? (
    <HStack gap="sm" align="center">
      <Button
        variant="ghost"
        onClick={handleUserMenu}
        className="p-0"
      >
        <Avatar
          src={entity.user.avatar}
          alt={entity.user.name}
          size="sm"
          initials={entity.user.name.charAt(0).toUpperCase()}
        />
      </Button>
      {!collapsed && (
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className="p-1.5 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
          title={t('nav.signOut')}
        >
          <LogOut size={16} />
        </Button>
      )}
    </HStack>
  ) : undefined;

  const footerContent = (
    <ThemeToggle />
  );

  return (
    <Box className={cn('flex h-screen bg-[var(--color-background)]', className)}>
      {/* Desktop sidebar */}
      <Box className="hidden lg:flex flex-shrink-0">
        <Sidebar
          logo={entity.logo}
          logoSrc={entity.logoSrc}
          brandName={entity.brandName ?? 'KFlow'}
          items={sidebarItems}
          collapsed={collapsed}
          collapseChangeEvent="UI:SIDEBAR_COLLAPSE"
          userSection={userSection}
          footerContent={footerContent}
          logoClickEvent="UI:SIDEBAR_LOGO"
        />
      </Box>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <Box className="lg:hidden fixed inset-0 z-40">
          <Overlay onClick={() => setMobileOpen(false)} />
          <Box className="absolute left-0 top-0 bottom-0 w-64 z-50">
            <Sidebar
              logo={entity.logo}
              logoSrc={entity.logoSrc}
              brandName={entity.brandName ?? 'KFlow'}
              items={sidebarItems}
              userSection={userSection}
              footerContent={footerContent}
              showCloseButton
              closeEvent="UI:SIDEBAR_CLOSE"
              logoClickEvent="UI:SIDEBAR_LOGO"
            />
          </Box>
        </Box>
      )}

      {/* Main content area */}
      <Box className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile header */}
        <Header
          brandName={entity.brandName ?? 'KFlow'}
          logo={entity.logo}
          logoSrc={entity.logoSrc}
          isMenuOpen={mobileOpen}
          onMenuToggle={() => setMobileOpen(!mobileOpen)}
          userName={entity.user?.name}
          userAvatar={entity.user ? { src: entity.user.avatar, alt: entity.user.name } : undefined}
          onUserClick={entity.user ? handleUserMenu : undefined}
          onLogoClick={handleLogoClick}
          actions={
            <Button
              variant="ghost"
              onClick={handleThemeToggle}
              className="p-2 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
            >
              <ThemeToggle />
            </Button>
          }
        />

        {/* Page content */}
        <Box className="flex-1 overflow-y-auto">
          {children}
        </Box>
      </Box>
    </Box>
  );
}

AppShellBoard.displayName = 'AppShellBoard';
