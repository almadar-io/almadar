import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { StudioSidebar } from "./StudioSidebar";
import type { AppSummary } from "./StudioSidebar";

const meta: Meta<typeof StudioSidebar> = {
  title: "Builder/Organisms/StudioSidebar",
  component: StudioSidebar,
  tags: ["autodocs"],
  args: {
    onCollapsedChange: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ height: "100vh", display: "flex" }}>
        <Story />
        <div style={{ flex: 1, backgroundColor: "var(--color-background)" }} />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StudioSidebar>;

// =============================================================================
// Mock Data
// =============================================================================

const now = Date.now();

const fiveApps: AppSummary[] = [
  { id: "app-1", name: "TaskManager", updatedAt: now - 60_000, hasValidationErrors: false },
  { id: "app-2", name: "E-Commerce Platform", updatedAt: now - 3_600_000, hasValidationErrors: true },
  { id: "app-3", name: "CRM Dashboard", updatedAt: now - 7_200_000, hasValidationErrors: false },
  { id: "app-4", name: "Blog Engine", updatedAt: now - 86_400_000, hasValidationErrors: false },
  { id: "app-5", name: "Chat Application", updatedAt: now - 172_800_000, hasValidationErrors: true },
];

const singleApp: AppSummary[] = [
  { id: "app-solo", name: "My First App", updatedAt: now, hasValidationErrors: false },
];

// =============================================================================
// Stories
// =============================================================================

/** Default sidebar with 5 apps */
export const Default: Story = {
  args: {
    apps: fiveApps,
  },
};

/** Sidebar with a selected app highlighted */
export const WithSelection: Story = {
  args: {
    apps: fiveApps,
    currentAppId: "app-2",
  },
};

/** Collapsed sidebar showing only icons */
export const Collapsed: Story = {
  args: {
    apps: fiveApps,
    collapsed: true,
    currentAppId: "app-3",
  },
};

/** Empty sidebar with no apps */
export const Empty: Story = {
  args: {
    apps: [],
  },
};

/** Sidebar with a single app */
export const SingleApp: Story = {
  args: {
    apps: singleApp,
    currentAppId: "app-solo",
  },
};

/** Sidebar in loading state */
export const Loading: Story = {
  args: {
    apps: [],
    isLoading: true,
  },
};

/** Sidebar showing an error */
export const WithError: Story = {
  args: {
    apps: [],
    error: "Failed to load applications. Please try again.",
  },
};

/** Sidebar with new app button hidden */
export const HiddenNewAppButton: Story = {
  args: {
    apps: fiveApps,
    hideNewAppButton: true,
  },
};
