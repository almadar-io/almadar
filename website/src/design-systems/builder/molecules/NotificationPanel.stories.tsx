import type { Meta, StoryObj } from '@storybook/react';
import { NotificationPanel, NotificationBell } from './NotificationPanel';
import type { Notification } from './NotificationPanel';

const meta: Meta<typeof NotificationPanel> = {
  title: 'Builder/Molecules/NotificationPanel',
  component: NotificationPanel,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof NotificationPanel>;

// =============================================================================
// Mock Data
// =============================================================================

const now = Date.now();

const sampleNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'success',
    title: 'Build Succeeded',
    message: 'Your project "TaskManager" compiled successfully with 0 errors.',
    timestamp: now - 60_000,
    read: false,
  },
  {
    id: 'n2',
    type: 'error',
    title: 'Validation Failed',
    message: 'Schema validation found 3 errors in orbital "UserManagement". Missing INIT transition.',
    timestamp: now - 300_000,
    read: false,
    actionLabel: 'View Errors',
    onAction: () => {},
  },
  {
    id: 'n3',
    type: 'warning',
    title: 'Deprecated Pattern',
    message: 'The "legacy-table" pattern is deprecated. Please migrate to "entity-table".',
    timestamp: now - 3_600_000,
    read: true,
  },
  {
    id: 'n4',
    type: 'info',
    title: 'New Version Available',
    message: 'Almadar CLI v2.4.0 is available. Run "npm update" to get the latest features.',
    timestamp: now - 86_400_000,
    read: true,
  },
];

// =============================================================================
// Stories
// =============================================================================

/** Default open panel with mixed notification types */
export const Default: Story = {
  args: {
    notifications: sampleNotifications,
    isOpen: true,
    onClose: () => {},
    onDismiss: () => {},
    onRead: () => {},
    onClearAll: () => {},
    position: 'right',
  },
};

/** Empty state - no notifications */
export const Empty: Story = {
  args: {
    notifications: [],
    isOpen: true,
    onClose: () => {},
    onDismiss: () => {},
    onRead: () => {},
    onClearAll: () => {},
  },
};

/** Panel positioned on the left */
export const LeftPosition: Story = {
  args: {
    notifications: sampleNotifications.slice(0, 2),
    isOpen: true,
    onClose: () => {},
    onDismiss: () => {},
    position: 'left',
  },
};

/** All unread notifications */
export const AllUnread: Story = {
  args: {
    notifications: sampleNotifications.map((n) => ({ ...n, read: false })),
    isOpen: true,
    onClose: () => {},
    onDismiss: () => {},
    onRead: () => {},
    onClearAll: () => {},
  },
};

// =============================================================================
// NotificationBell Stories
// =============================================================================

const bellMeta: Meta<typeof NotificationBell> = {
  title: 'Builder/Molecules/NotificationBell',
  component: NotificationBell,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export const BellDefault: StoryObj<typeof NotificationBell> = {
  render: () => <NotificationBell count={3} onClick={() => {}} />,
};

export const BellNoUnread: StoryObj<typeof NotificationBell> = {
  render: () => <NotificationBell count={0} onClick={() => {}} />,
};

export const BellHighCount: StoryObj<typeof NotificationBell> = {
  render: () => <NotificationBell count={150} onClick={() => {}} />,
};
