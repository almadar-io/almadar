import type { Meta, StoryObj } from "@storybook/react";
import { GraphJSONViewer } from "./GraphJSONViewer";

const meta: Meta<typeof GraphJSONViewer> = {
  title: "Builder/Molecules/GraphJSONViewer",
  component: GraphJSONViewer,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GraphJSONViewer>;

export const Default: Story = {
  args: {
    isOpen: true,
    data: {
      name: "Test",
      orbitals: [
        {
          name: "TaskManagement",
          entity: { name: "Task", fields: ["title", "status"] },
          traits: ["TaskInteraction"],
          pages: ["/tasks"],
        },
      ],
    },
    onClose: () => {},
  },
};

export const Loading: Story = {
  args: {
    isOpen: true,
    data: null,
    isLoading: true,
    onClose: () => {},
  },
};

export const WithError: Story = {
  args: {
    isOpen: true,
    data: null,
    error: "Failed to load schema graph. Please try again.",
    onClose: () => {},
  },
};

export const CustomTitle: Story = {
  args: {
    isOpen: true,
    data: { nodes: 12, edges: 18, connected: true },
    title: "Orbital Graph Data",
    onClose: () => {},
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    data: { name: "Hidden" },
    onClose: () => {},
  },
};
