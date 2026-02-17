import type { Meta, StoryObj } from "@storybook/react";
import { StudioHomeElectronBoard } from "./StudioHomeElectronBoard";
import type { StudioHomeElectronEntity } from "./StudioHomeElectronBoard";

const meta: Meta<typeof StudioHomeElectronBoard> = {
  title: "Builder/Organisms/StudioHomeElectronBoard",
  component: StudioHomeElectronBoard,
  tags: ["autodocs"],
  args: {
    openFileEvent: "OPEN_FILE",
    createProjectEvent: "CREATE_PROJECT",
    openRecentEvent: "OPEN_RECENT",
    importEvent: "IMPORT",
  },
  decorators: [
    (Story) => (
      <div style={{ height: "100vh", width: "100%", position: "relative" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StudioHomeElectronBoard>;

// =============================================================================
// Mock Data
// =============================================================================

const threeRecentFiles: StudioHomeElectronEntity = {
  recentFiles: [
    { name: "task-manager.orb", path: "/home/user/projects/task-manager/task-manager.orb", lastOpened: "2 hours ago" },
    { name: "ecommerce.orb", path: "/home/user/projects/ecommerce/ecommerce.orb", lastOpened: "Yesterday" },
    { name: "crm-dashboard.orb", path: "/home/user/projects/crm/crm-dashboard.orb", lastOpened: "3 days ago" },
  ],
  version: "1.2.0",
};

const manyRecentFiles: StudioHomeElectronEntity = {
  recentFiles: [
    { name: "task-manager.orb", path: "/home/user/projects/task-manager/task-manager.orb", lastOpened: "Just now" },
    { name: "ecommerce.orb", path: "/home/user/projects/ecommerce/ecommerce.orb", lastOpened: "1 hour ago" },
    { name: "crm-dashboard.orb", path: "/home/user/projects/crm/crm-dashboard.orb", lastOpened: "3 hours ago" },
    { name: "blog-engine.orb", path: "/home/user/projects/blog/blog-engine.orb", lastOpened: "Yesterday" },
    { name: "chat-app.orb", path: "/home/user/projects/chat/chat-app.orb", lastOpened: "2 days ago" },
    { name: "analytics.orb", path: "/home/user/projects/analytics/analytics.orb", lastOpened: "Last week" },
    { name: "inventory.orb", path: "/home/user/projects/inventory/inventory.orb", lastOpened: "Last week" },
    { name: "scheduler.orb", path: "/home/user/projects/scheduler/scheduler.orb", lastOpened: "2 weeks ago" },
  ],
  version: "1.2.0",
};

const noRecentFiles: StudioHomeElectronEntity = {
  recentFiles: [],
  version: "1.0.0",
};

// =============================================================================
// Stories
// =============================================================================

/** Default view with 3 recent files */
export const Default: Story = {
  args: {
    entity: threeRecentFiles,
  },
};

/** Empty state with no recent files */
export const NoRecentFiles: Story = {
  args: {
    entity: noRecentFiles,
  },
};

/** Many recent files in the list */
export const ManyFiles: Story = {
  args: {
    entity: manyRecentFiles,
  },
};
