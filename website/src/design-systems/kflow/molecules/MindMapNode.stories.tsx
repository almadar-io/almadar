import type { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import { MindMapNode, MindMapNodeData } from "./MindMapNode";

const meta: Meta<typeof MindMapNode> = {
  title: "KFlow/Molecules/MindMapNode",
  component: MindMapNode,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <svg width="300" height="150" style={{ border: "1px solid #e5e7eb" }}>
        <Story />
      </svg>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MindMapNode>;

const baseNode: MindMapNodeData = {
  id: "node-1",
  x: 150,
  y: 75,
  width: 120,
  height: 50,
  title: "Sample Node",
};

export const Default: Story = {
  args: {
    node: baseNode,
    isSelected: false,
    isEditing: false,
    zoom: 1,
    pan: { x: 0, y: 0 },
    onClick: action("UI:SELECT_NODE"),
    onDoubleClick: action("UI:EDIT_NODE"),
  },
};

export const Selected: Story = {
  args: {
    node: baseNode,
    isSelected: true,
    isEditing: false,
    onClick: action("UI:SELECT_NODE"),
    onDoubleClick: action("UI:EDIT_NODE"),
  },
};

export const Editing: Story = {
  args: {
    node: baseNode,
    isSelected: true,
    isEditing: true,
    editValue: "Sample Node",
    onClick: action("UI:SELECT_NODE"),
    onSaveEdit: action("onSaveEdit"),
    onCancelEdit: action("onCancelEdit"),
    onEditChange: action("onEditChange"),
  },
};

export const SeedNode: Story = {
  args: {
    node: {
      ...baseNode,
      id: "seed-node",
      title: "Main Topic",
      isSeed: true,
    },
    isSelected: false,
    onClick: action("UI:SELECT_NODE"),
    onDoubleClick: action("UI:EDIT_NODE"),
  },
};

export const WithChildren: Story = {
  args: {
    node: {
      ...baseNode,
      hasChildren: true,
      isExpanded: true,
    },
    isSelected: false,
    onClick: action("UI:SELECT_NODE"),
    onToggleExpand: action("UI:EXPAND_NODE"),
  },
};

export const CollapsedWithChildren: Story = {
  args: {
    node: {
      ...baseNode,
      hasChildren: true,
      isExpanded: false,
    },
    isSelected: false,
    onClick: action("UI:SELECT_NODE"),
    onToggleExpand: action("UI:EXPAND_NODE"),
  },
};

export const Layer1: Story = {
  args: {
    node: {
      ...baseNode,
      layer: 1,
      title: "Layer 1 Node",
    },
    onClick: action("UI:SELECT_NODE"),
  },
};

export const Layer2: Story = {
  args: {
    node: {
      ...baseNode,
      layer: 2,
      title: "Layer 2 Node",
    },
    onClick: action("UI:SELECT_NODE"),
  },
};

export const LongTitle: Story = {
  args: {
    node: {
      ...baseNode,
      title: "This is a very long title that will be truncated",
    },
    onClick: action("UI:SELECT_NODE"),
  },
};

export const Zoomed: Story = {
  args: {
    node: {
      id: "node-zoomed",
      x: 100,
      y: 50,
      width: 120,
      height: 50,
      title: "Zoomed Node",
    },
    zoom: 1.5,
    pan: { x: 0, y: 0 },
    onClick: action("UI:SELECT_NODE"),
  },
};

export const MultipleNodes: Story = {
  render: () => (
    <svg width="500" height="300" style={{ border: "1px solid #e5e7eb" }}>
      <MindMapNode
        node={{
          id: "root",
          x: 250,
          y: 50,
          width: 120,
          height: 50,
          title: "Root Topic",
          isSeed: true,
          hasChildren: true,
          isExpanded: true,
        }}
        onClick={action("click-root")}
      />
      <MindMapNode
        node={{
          id: "child-1",
          x: 100,
          y: 150,
          width: 100,
          height: 40,
          title: "Child A",
          layer: 1,
        }}
        onClick={action("click-child-1")}
      />
      <MindMapNode
        node={{
          id: "child-2",
          x: 250,
          y: 150,
          width: 100,
          height: 40,
          title: "Child B",
          layer: 1,
        }}
        isSelected={true}
        onClick={action("click-child-2")}
      />
      <MindMapNode
        node={{
          id: "child-3",
          x: 400,
          y: 150,
          width: 100,
          height: 40,
          title: "Child C",
          layer: 1,
        }}
        onClick={action("click-child-3")}
      />
    </svg>
  ),
};
