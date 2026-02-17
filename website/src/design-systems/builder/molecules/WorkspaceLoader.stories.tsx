import type { Meta, StoryObj } from "@storybook/react";
import { WorkspaceLoader } from "./WorkspaceLoader";

const meta: Meta<typeof WorkspaceLoader> = {
  title: "Builder/Molecules/WorkspaceLoader",
  component: WorkspaceLoader,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof WorkspaceLoader>;

export const Booting: Story = {
  args: {
    status: "booting",
    isLoading: true,
  },
};

export const Installing: Story = {
  args: {
    status: "installing",
    isLoading: true,
  },
};

export const Starting: Story = {
  args: {
    status: "starting",
    isLoading: true,
  },
};

export const Running: Story = {
  args: {
    status: "running",
    isLoading: false,
  },
};

export const Error: Story = {
  args: {
    status: "error",
    isLoading: false,
    error: "Failed to start WebContainer: network timeout after 30s",
  },
};

export const WithAppName: Story = {
  args: {
    status: "installing",
    isLoading: true,
    appName: "HealthcarePortal v2.1",
  },
};
