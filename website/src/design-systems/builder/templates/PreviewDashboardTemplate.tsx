/**
 * PreviewDashboardTemplate
 *
 * Page: PreviewDashboard | Entity: N/A | ViewType: layout
 *
 * A dashboard layout wrapper for the preview page.
 * Shows how the Orbital Runtime content would look inside a real app shell
 * with a sidebar, header with search, and main content area.
 */

import React from "react";
import { Typography, Badge, Avatar, Box, HStack, VStack, cn } from "@almadar/ui";
import {
  Home,
  Bell,
  Search,
  Settings,
  ChevronDown,
  LayoutDashboard,
  ShoppingCart,
  Users,
  Package,
  FileText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PreviewNavItem {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
  active?: boolean;
  badge?: string | number;
}

export interface PreviewDashboardTemplateProps {
  /** App name shown in sidebar */
  appName: string;
  /** Navigation items (derived from schema pages) */
  navItems: PreviewNavItem[];
  /** Current page title */
  pageTitle?: string;
  /** Content to render in main area */
  children: React.ReactNode;
  /** Additional class name */
  className?: string;
}

// ---------------------------------------------------------------------------
// Inline styles for CSS-variable-based hover
// ---------------------------------------------------------------------------

const navItemBaseStyle: React.CSSProperties = {
  color: "var(--color-muted-foreground)",
  backgroundColor: "transparent",
};

const navItemActiveStyle: React.CSSProperties = {
  backgroundColor: "var(--color-primary)",
  color: "var(--color-primary-foreground)",
  boxShadow: "var(--shadow-sm)",
};

function applyHoverBg(e: React.MouseEvent<HTMLElement>) {
  (e.currentTarget as HTMLElement).style.backgroundColor =
    "var(--color-secondary)";
}

function clearHoverBg(e: React.MouseEvent<HTMLElement>) {
  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
}

// ---------------------------------------------------------------------------
// Icon mapping helper
// ---------------------------------------------------------------------------

const iconMap: Record<string, LucideIcon> = {
  product: Package,
  cart: ShoppingCart,
  checkout: FileText,
  order: FileText,
  customer: Users,
  dashboard: LayoutDashboard,
  home: Home,
  settings: Settings,
};

function getIconForPage(pageName: string): LucideIcon {
  const lower = pageName.toLowerCase();
  for (const [key, icon] of Object.entries(iconMap)) {
    if (lower.includes(key)) return icon;
  }
  return LayoutDashboard;
}

// ---------------------------------------------------------------------------
// Nav item sub-component
// ---------------------------------------------------------------------------

function NavItem({ item }: { item: PreviewNavItem }) {
  const Icon = item.icon;
  return (
    <Box
      as="button"
      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
      style={item.active ? navItemActiveStyle : navItemBaseStyle}
      onClick={item.onClick}
      onMouseEnter={item.active ? undefined : applyHoverBg}
      onMouseLeave={item.active ? undefined : clearHoverBg}
    >
      <Icon
        className="h-5 w-5 flex-shrink-0"
        style={{
          color: item.active
            ? "var(--color-primary-foreground)"
            : "var(--color-muted-foreground)",
        }}
      />
      <Typography
        variant="body"
        className="flex-1 text-left text-sm"
        style={{ color: "inherit" }}
      >
        {item.label}
      </Typography>
      {item.badge != null && (
        <Badge variant={item.active ? "default" : "secondary"} size="sm">
          {item.badge}
        </Badge>
      )}
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function PreviewDashboardTemplate({
  appName,
  navItems,
  pageTitle,
  children,
  className,
}: PreviewDashboardTemplateProps): React.ReactElement {
  return (
    <HStack
      className={cn("h-full", className)}
      gap="none"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {/* ---- Sidebar ---- */}
      <VStack
        as="aside"
        gap="none"
        className="w-64 flex-shrink-0"
        style={{
          backgroundColor: "var(--color-card)",
          borderRight: "1px solid var(--color-border)",
        }}
      >
        {/* Sidebar header */}
        <HStack
          align="center"
          justify="between"
          className="h-14 px-4"
          style={{ borderBottom: "1px solid var(--color-border)" }}
        >
          <HStack align="center" gap="sm">
            <Box className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-teal-500 to-cyan-600">
              <Typography
                variant="body"
                className="font-bold text-sm"
                style={{ color: "#fff" }}
              >
                {appName.charAt(0).toUpperCase()}
              </Typography>
            </Box>
            <Typography
              variant="body"
              className="font-semibold text-sm"
              style={{ color: "var(--color-foreground)" }}
            >
              {appName}
            </Typography>
          </HStack>
        </HStack>

        {/* Navigation */}
        <Box as="nav" className="flex-1 px-3 py-3 overflow-y-auto">
          <VStack gap="xs">
            {navItems.map((item, idx) => (
              <NavItem key={idx} item={item} />
            ))}
          </VStack>
        </Box>

        {/* Sidebar footer */}
        <Box
          className="p-3"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <HStack
            align="center"
            gap="sm"
            className="px-3 py-2 text-sm"
            style={{ color: "var(--color-muted-foreground)" }}
          >
            <Settings className="h-5 w-5" />
            <Typography
              variant="body"
              className="text-sm"
              style={{ color: "inherit" }}
            >
              Settings
            </Typography>
          </HStack>
        </Box>
      </VStack>

      {/* ---- Main content area ---- */}
      <VStack gap="none" className="flex-1 min-w-0 overflow-hidden">
        {/* Header */}
        <HStack
          as="header"
          align="center"
          justify="between"
          gap="md"
          className="h-14 px-4 flex-shrink-0"
          style={{
            backgroundColor: "var(--color-card)",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          {/* Page title */}
          {pageTitle && (
            <Typography
              variant="h3"
              className="text-lg font-semibold hidden sm:block"
              style={{ color: "var(--color-foreground)" }}
            >
              {pageTitle}
            </Typography>
          )}

          {/* Search */}
          <Box className="hidden sm:flex flex-1 max-w-md">
            <Box className="relative w-full">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                style={{ color: "var(--color-muted-foreground)" }}
              />
              <input
                type="search"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border-0 outline-none focus:ring-2"
                style={{
                  backgroundColor:
                    "var(--color-surface, var(--color-secondary))",
                  color: "var(--color-foreground)",
                }}
              />
            </Box>
          </Box>

          {/* Right side actions */}
          <HStack align="center" gap="sm">
            {/* Notifications */}
            <Box
              as="button"
              className="relative p-2 rounded-full transition-colors cursor-pointer"
              style={{ color: "var(--color-muted-foreground)" }}
              onMouseEnter={applyHoverBg}
              onMouseLeave={clearHoverBg}
            >
              <Bell className="h-5 w-5" />
              <Box
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style={{
                  backgroundColor: "var(--color-destructive, #ef4444)",
                }}
              />
            </Box>

            {/* User avatar */}
            <Box
              as="button"
              className="flex items-center gap-1 p-1.5 rounded-lg transition-colors cursor-pointer"
              onMouseEnter={applyHoverBg}
              onMouseLeave={clearHoverBg}
            >
              <Avatar initials="JD" size="sm" />
              <ChevronDown
                className="hidden sm:block h-4 w-4"
                style={{ color: "var(--color-muted-foreground)" }}
              />
            </Box>
          </HStack>
        </HStack>

        {/* Page content */}
        <Box
          as="main"
          className="flex-1 overflow-auto p-4 sm:p-6"
          style={{ backgroundColor: "var(--color-background)" }}
        >
          {children}
        </Box>
      </VStack>
    </HStack>
  );
}

PreviewDashboardTemplate.displayName = "PreviewDashboardTemplate";

export { PreviewDashboardTemplate, getIconForPage };
export default PreviewDashboardTemplate;
