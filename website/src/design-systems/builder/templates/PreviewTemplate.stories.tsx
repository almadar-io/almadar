import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PreviewTemplate } from "./PreviewTemplate";
import type { PreviewEntity } from "./PreviewTemplate";

const meta: Meta<typeof PreviewTemplate> = {
  title: "Builder/Templates/PreviewTemplate",
  component: PreviewTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PreviewTemplate>;

const baseEntity: PreviewEntity = {
  appName: "TaskManager",
  appVersion: "1.0",
  appId: "app_123",
  currentStateName: "Browsing",
  isExecutingEvent: false,
  isFullscreen: false,
  inspectMode: false,
  forceOffline: false,
  isOffline: false,
  pendingCount: 0,
  isSyncing: false,
  showAgentPanel: false,
  showVisualizerModal: false,
  errorToast: null,
  isLoading: false,
  loadError: null,
};

const MockRuntime = () => (
  <div
    style={{
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--color-background)",
      padding: 24,
    }}
  >
    <div
      style={{
        padding: 32,
        background: "var(--color-card)",
        borderRadius: 12,
        border: "1px solid var(--color-border)",
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: 16, fontWeight: 600, color: "var(--color-foreground)" }}>
        Orbital Runtime Content
      </p>
      <p style={{ fontSize: 13, color: "var(--color-muted-foreground)", marginTop: 8 }}>
        The compiled application renders here
      </p>
    </div>
  </div>
);

const MockSidebar = () => (
  <div
    style={{
      width: 240,
      height: "100%",
      background: "var(--color-card)",
      borderRight: "1px solid var(--color-border)",
      padding: 16,
    }}
  >
    <p style={{ fontSize: 12, color: "var(--color-muted-foreground)", textTransform: "uppercase" }}>
      Pages
    </p>
    {["TasksPage", "DashboardPage", "SettingsPage"].map((page) => (
      <div
        key={page}
        style={{
          padding: "8px 12px",
          marginTop: 4,
          borderRadius: 6,
          fontSize: 13,
          color: "var(--color-foreground)",
          cursor: "pointer",
        }}
      >
        {page}
      </div>
    ))}
  </div>
);

export const Default: Story = {
  args: {
    entity: baseEntity,
    runtimeSlot: <MockRuntime />,
  },
};

export const Loading: Story = {
  args: {
    entity: {
      ...baseEntity,
      isLoading: true,
    },
  },
};

export const WithError: Story = {
  args: {
    entity: {
      ...baseEntity,
      loadError: "App not found. The application may have been deleted or the ID is invalid.",
    },
  },
};

export const InspectMode: Story = {
  args: {
    entity: {
      ...baseEntity,
      inspectMode: true,
    },
    runtimeSlot: <MockRuntime />,
  },
};

export const Offline: Story = {
  args: {
    entity: {
      ...baseEntity,
      forceOffline: true,
      pendingCount: 3,
    },
    runtimeSlot: <MockRuntime />,
  },
};

export const WithAgent: Story = {
  args: {
    entity: {
      ...baseEntity,
      showAgentPanel: true,
    },
    runtimeSlot: <MockRuntime />,
    sidebarSlot: <MockSidebar />,
  },
};
