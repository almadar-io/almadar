/**
 * NotificationPanel Molecule
 *
 * Sliding panel for displaying in-app notifications.
 */

import React, { useEffect } from 'react';
import { clsx as cn } from 'clsx';
import { X, Bell, CheckCircle, AlertCircle, AlertTriangle, Info, Trash2 } from 'lucide-react';
import { Typography, Button, Badge, Box, HStack, VStack, Icon, Overlay, useTranslate } from '@almadar/ui';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: number;
  read?: boolean;
  actionLabel?: string;
  onAction?: () => void;
  autoDismiss?: boolean;
  dismissAfter?: number;
}

export interface NotificationPanelProps {
  notifications: Notification[];
  isOpen: boolean;
  onClose: () => void;
  onDismiss: (id: string) => void;
  onRead?: (id: string) => void;
  onClearAll?: () => void;
  position?: 'right' | 'left';
  width?: string;
  className?: string;
}

const typeColorVars: Record<NotificationType, string> = {
  success: 'var(--color-success)',
  error: 'var(--color-error)',
  warning: 'var(--color-warning)',
  info: 'var(--color-info)',
};

const typeBgStyles: Record<NotificationType, React.CSSProperties> = {
  success: {
    backgroundColor: 'color-mix(in srgb, var(--color-success) 10%, transparent)',
    borderColor: 'color-mix(in srgb, var(--color-success) 20%, transparent)',
  },
  error: {
    backgroundColor: 'color-mix(in srgb, var(--color-error) 10%, transparent)',
    borderColor: 'color-mix(in srgb, var(--color-error) 20%, transparent)',
  },
  warning: {
    backgroundColor: 'color-mix(in srgb, var(--color-warning) 10%, transparent)',
    borderColor: 'color-mix(in srgb, var(--color-warning) 20%, transparent)',
  },
  info: {
    backgroundColor: 'color-mix(in srgb, var(--color-info) 10%, transparent)',
    borderColor: 'color-mix(in srgb, var(--color-info) 20%, transparent)',
  },
};

const typeIcons: Record<NotificationType, React.FC<{ className?: string; style?: React.CSSProperties }>> = {
  success: CheckCircle, error: AlertCircle, warning: AlertTriangle, info: Info,
};

const NotificationItem: React.FC<{
  notification: Notification;
  onDismiss: (id: string) => void;
  onRead?: (id: string) => void;
}> = ({ notification, onDismiss, onRead }) => {
  const { id, type, title, message, timestamp, read, actionLabel, onAction, autoDismiss, dismissAfter } = notification;
  const IconComponent = typeIcons[type];

  useEffect(() => {
    if (autoDismiss && dismissAfter) {
      const timer = setTimeout(() => onDismiss(id), dismissAfter);
      return () => clearTimeout(timer);
    }
  }, [autoDismiss, dismissAfter, id, onDismiss]);

  useEffect(() => {
    if (!read && onRead) onRead(id);
  }, [id, read, onRead]);

  const formatTime = (ts: number) => {
    const diffMs = Date.now() - ts;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return new Date(ts).toLocaleDateString();
  };

  return (
    <Box
      className={cn('p-3 rounded-lg border-l-4 transition-all', !read && 'ring-2 ring-teal-500/20')}
      style={typeBgStyles[type]}
    >
      <HStack gap="sm" align="start">
        <IconComponent className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: typeColorVars[type] }} />
        <Box className="flex-1 min-w-0">
          <HStack justify="between" align="start" gap="sm">
            <Typography variant="body2" className="font-medium text-[var(--color-foreground)]">{title}</Typography>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDismiss(id)}
              className="flex-shrink-0 p-1 rounded hover:bg-[var(--color-secondary)] transition-colors"
              aria-label="Dismiss"
            >
              <Icon icon={X} size="xs" className="text-[var(--color-muted-foreground)]" />
            </Button>
          </HStack>
          <Typography variant="caption" className="text-[var(--color-muted-foreground)] mt-1 line-clamp-2">{message}</Typography>
          <HStack justify="between" align="center" className="mt-2">
            <Typography variant="caption" className="text-[var(--color-muted-foreground)] text-xs">{formatTime(timestamp)}</Typography>
            {actionLabel && onAction && (
              <Button variant="ghost" size="sm" onClick={onAction} className="text-xs py-0.5 px-2 h-auto">{actionLabel}</Button>
            )}
          </HStack>
        </Box>
      </HStack>
    </Box>
  );
};

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  notifications, isOpen, onClose, onDismiss, onRead, onClearAll, position = 'right', width = 'w-80', className,
}) => {
  const { t } = useTranslate();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <Overlay isVisible={isOpen} onClick={onClose} blur={false} className="bg-black/40 z-40 transition-opacity" />
      <Box
        className={cn(
          'fixed top-0 bottom-0 z-50 backdrop-blur-xl border-l shadow-2xl',
          'transform transition-transform duration-300 ease-out flex flex-col',
          width, position === 'right' ? 'right-0' : 'left-0',
          isOpen ? 'translate-x-0' : position === 'right' ? 'translate-x-full' : '-translate-x-full',
          className,
        )}
        style={{ backgroundColor: 'var(--color-card)', borderColor: 'color-mix(in srgb, var(--color-primary) 20%, transparent)' }}
        role="dialog"
        aria-modal="true"
        aria-label="Notifications"
      >
        <HStack justify="between" align="center" className="px-4 py-3 border-b border-[var(--color-border)]">
          <HStack gap="sm" align="center">
            <Icon icon={Bell} size="md" className="text-[var(--color-muted-foreground)]" />
            <Typography variant="h6" className="text-[var(--color-foreground)]">Notifications</Typography>
            {unreadCount > 0 && <Badge variant="primary" size="sm">{unreadCount}</Badge>}
          </HStack>
          <HStack gap="xs" align="center">
            {onClearAll && notifications.length > 0 && (
              <Button variant="ghost" size="sm" onClick={onClearAll} leftIcon={<Trash2 className="w-4 h-4" />} className="text-[var(--color-muted-foreground)]" style={{ color: 'var(--color-muted-foreground)' }}>Clear</Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-[var(--color-secondary)] transition-colors"
              aria-label="Close"
            >
              <Icon icon={X} size="md" className="text-[var(--color-muted-foreground)]" />
            </Button>
          </HStack>
        </HStack>
        <Box className="flex-1 overflow-y-auto p-3 space-y-2">
          {notifications.length === 0 ? (
            <VStack align="center" justify="center" className="h-full text-center py-8">
              <Icon icon={Bell} size="xl" className="text-[var(--color-muted-foreground)] mb-3" style={{ width: '3rem', height: '3rem' }} />
              <Typography variant="body2" className="text-[var(--color-muted-foreground)]">{t('empty.noItems')}</Typography>
              <Typography variant="caption" className="text-[var(--color-muted-foreground)] mt-1">You're all caught up!</Typography>
            </VStack>
          ) : (
            notifications.map(n => <NotificationItem key={n.id} notification={n} onDismiss={onDismiss} onRead={onRead} />)
          )}
        </Box>
      </Box>
    </>
  );
};

NotificationPanel.displayName = 'NotificationPanel';

export interface NotificationBellProps {
  count: number;
  onClick: () => void;
  className?: string;
}

export const NotificationBell: React.FC<NotificationBellProps> = ({ count, onClick, className }) => (
  <Button
    variant="ghost"
    size="sm"
    onClick={onClick}
    className={cn('relative p-2 rounded-lg transition-colors text-[var(--color-muted-foreground)] hover:bg-[var(--color-secondary)]', className)}
    aria-label={`Notifications${count > 0 ? ` (${count} unread)` : ''}`}
  >
    <Icon icon={Bell} size="md" />
    {count > 0 && (
      <Typography
        variant="caption"
        className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-xs font-medium rounded-full"
        style={{ color: 'var(--color-foreground)', backgroundColor: 'var(--color-error)' }}
      >
        {count > 99 ? '99+' : count}
      </Typography>
    )}
  </Button>
);

NotificationBell.displayName = 'NotificationBell';
