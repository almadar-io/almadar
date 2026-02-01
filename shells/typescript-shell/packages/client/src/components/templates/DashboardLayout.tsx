import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/cn";
import {
  Menu,
  X,
  Home,
  Users,
  Calendar,
  Settings,
  Bell,
  Search,
  ChevronDown,
  LogOut,
  LucideIcon,
} from "lucide-react";
import { Button, Input, Badge, Spinner, ThemeToggle, Avatar } from "../atoms";
import { useAuthContext } from "@/features/auth";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
  children?: NavItem[];
}

export interface DashboardLayoutProps {
  /** App name shown in sidebar */
  appName?: string;
  /** Logo component or URL */
  logo?: React.ReactNode;
  /** Navigation items */
  navItems?: NavItem[];
  /** Current user info (optional - auto-populated from auth context if not provided) */
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  /** Header actions (notifications, etc.) */
  headerActions?: React.ReactNode;
  /** Show search in header */
  showSearch?: boolean;
  /** Custom sidebar footer */
  sidebarFooter?: React.ReactNode;
  /** Callback when user clicks sign out (optional - uses auth context signOut if not provided) */
  onSignOut?: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  appName = "{{APP_TITLE}}",
  logo,
  navItems = [],
  user: userProp,
  headerActions,
  showSearch = true,
  sidebarFooter,
  onSignOut: onSignOutProp,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();

  // Get user and signOut from auth context (with prop overrides)
  const { user: authUser, signOut: authSignOut } = useAuthContext();

  // Use props if provided, otherwise use auth context
  const user =
    userProp ||
    (authUser
      ? {
          name: authUser.displayName || authUser.email?.split("@")[0] || "User",
          email: authUser.email || "",
          avatar: authUser.photoURL || undefined,
        }
      : null);

  const handleSignOut = onSignOutProp || authSignOut;

  return (
    <div className="min-h-screen bg-[var(--color-background)] dark:bg-[var(--color-background)]">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[var(--color-foreground)]/50 dark:bg-[var(--color-foreground)]/70 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-[var(--color-card)] dark:bg-[var(--color-card)] border-r border-[var(--color-border)] dark:border-[var(--color-border)]",
          "transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Sidebar header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[var(--color-border)] dark:border-[var(--color-border)]">
          <Link to="/" className="flex items-center gap-2">
            {logo || (
              <div className="w-8 h-8 bg-primary-600 rounded-[var(--radius-lg)] flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {appName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <span className="font-semibold text-[var(--color-foreground)] dark:text-[var(--color-foreground)]">
              {appName}
            </span>
          </Link>
          <button
            className="lg:hidden p-2 rounded-[var(--radius-md)] hover:bg-[var(--color-muted)] dark:hover:bg-[var(--color-muted)] text-[var(--color-muted-foreground)] dark:text-[var(--color-muted-foreground)]"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              currentPath={location.pathname}
            />
          ))}
        </nav>

        {/* Sidebar footer */}
        {sidebarFooter || (
          <div className="p-4 border-t border-[var(--color-border)] dark:border-[var(--color-border)]">
            <Link
              to="/settings"
              className="flex items-center gap-3 px-3 py-2 text-sm text-[var(--color-muted-foreground)] dark:text-[var(--color-muted-foreground)] rounded-[var(--radius-lg)] hover:bg-[var(--color-muted)] dark:hover:bg-[var(--color-muted)]"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </div>
        )}
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 h-16 bg-[var(--color-card)] dark:bg-[var(--color-card)] border-b border-[var(--color-border)] dark:border-[var(--color-border)]">
          <div className="h-full px-4 flex items-center justify-between gap-4">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-[var(--radius-md)] hover:bg-[var(--color-muted)] dark:hover:bg-[var(--color-muted)] text-[var(--color-muted-foreground)] dark:text-[var(--color-muted-foreground)] touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Search */}
            {showSearch && (
              <div className="hidden sm:block flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted-foreground)] dark:text-[var(--color-muted-foreground)]" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-10 w-full"
                  />
                </div>
              </div>
            )}

            {/* Right side */}
            <div className="flex items-center gap-2">
              {headerActions}

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Notifications */}
              <button className="relative p-2 rounded-[var(--radius-full)] hover:bg-[var(--color-muted)] dark:hover:bg-[var(--color-muted)]">
                <Bell className="h-5 w-5 text-[var(--color-muted-foreground)] dark:text-[var(--color-muted-foreground)]" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--color-error)] rounded-[var(--radius-full)]" />
              </button>

              {/* User menu */}
              {user && (
                <div className="relative">
                  <button
                    className="flex items-center gap-2 p-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-muted)] dark:hover:bg-[var(--color-muted)]"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                    <Avatar
                      src={user.avatar}
                      alt={user.name}
                      initials={user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)}
                      size="sm"
                    />
                    <span className="hidden sm:block text-sm font-medium text-[var(--color-foreground)] dark:text-[var(--color-foreground)]">
                      {user.name}
                    </span>
                    <ChevronDown className="hidden sm:block h-4 w-4 text-[var(--color-muted-foreground)] dark:text-[var(--color-muted-foreground)]" />
                  </button>

                  {userMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-48 bg-[var(--color-card)] dark:bg-[var(--color-card)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] border border-[var(--color-border)] dark:border-[var(--color-border)] py-1 z-50">
                        <div className="px-4 py-2 border-b border-[var(--color-border)] dark:border-[var(--color-border)]">
                          <p className="text-sm font-medium text-[var(--color-foreground)] dark:text-[var(--color-foreground)]">
                            {user.name}
                          </p>
                          <p className="text-xs text-[var(--color-muted-foreground)] dark:text-[var(--color-muted-foreground)]">
                            {user.email}
                          </p>
                        </div>
                        <Link
                          to="/settings"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-foreground)] dark:text-[var(--color-foreground)] hover:bg-[var(--color-muted)] dark:hover:bg-[var(--color-muted)]"
                        >
                          <Settings className="h-4 w-4" />
                          Settings
                        </Link>
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            handleSignOut?.();
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-error)] dark:text-[var(--color-error)] hover:bg-[var(--color-error)]/10 dark:hover:bg-[var(--color-error)]/20"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 pb-20 sm:pb-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// NavLink component
const NavLink: React.FC<{ item: NavItem; currentPath: string }> = ({
  item,
  currentPath,
}) => {
  const isActive =
    currentPath === item.href || currentPath.startsWith(item.href + "/");
  const Icon = item.icon;

  return (
    <Link
      to={item.href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-[var(--radius-lg)] text-sm font-medium transition-colors",
        isActive
          ? "bg-[var(--color-foreground)] text-[var(--color-background)] shadow-[var(--shadow-sm)]"
          : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]",
      )}
    >
      <Icon
        className={cn(
          "h-5 w-5",
          isActive
            ? "text-[var(--color-background)]"
            : "text-[var(--color-muted-foreground)]",
        )}
      />
      <span className="flex-1">{item.label}</span>
      {item.badge && (
        <Badge variant={isActive ? "primary" : "default"} size="sm">
          {item.badge}
        </Badge>
      )}
    </Link>
  );
};
