import type { Meta, StoryObj } from "@storybook/react";
import { MindMapConnections, MindMapConnection } from "./MindMapConnections";

const meta: Meta<typeof MindMapConnections> = {
  title: "KFlow/Atoms/MindMapConnections",
  component: MindMapConnections,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <svg width="400" height="300" style={{ border: "1px solid #e5e7eb" }}>
        <Story />
      </svg>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MindMapConnections>;

const simpleConnections: MindMapConnection[] = [
  { source: { x: 200, y: 50 }, target: { x: 100, y: 150 } },
  { source: { x: 200, y: 50 }, target: { x: 300, y: 150 } },
  { source: { x: 200, y: 50 }, target: { x: 200, y: 150 } },
];

const treeConnections: MindMapConnection[] = [
  // Root to level 1
  { source: { x: 200, y: 30 }, target: { x: 80, y: 100 } },
  { source: { x: 200, y: 30 }, target: { x: 200, y: 100 } },
  { source: { x: 200, y: 30 }, target: { x: 320, y: 100 } },
  // Level 1 to level 2
  { source: { x: 80, y: 100 }, target: { x: 40, y: 180 } },
  { source: { x: 80, y: 100 }, target: { x: 120, y: 180 } },
  { source: { x: 320, y: 100 }, target: { x: 280, y: 180 } },
  { source: { x: 320, y: 100 }, target: { x: 360, y: 180 } },
];

export const Default: Story = {
  args: {
    connections: simpleConnections,
    zoom: 1,
    pan: { x: 0, y: 0 },
  },
};

export const TreeStructure: Story = {
  args: {
    connections: treeConnections,
    zoom: 1,
    pan: { x: 0, y: 0 },
  },
};

export const CustomColor: Story = {
  args: {
    connections: simpleConnections,
    strokeColor: "#3b82f6",
    strokeWidth: 3,
  },
};

export const Zoomed: Story = {
  args: {
    connections: [
      { source: { x: 100, y: 50 }, target: { x: 50, y: 100 } },
      { source: { x: 100, y: 50 }, target: { x: 150, y: 100 } },
    ],
    zoom: 1.5,
    pan: { x: 50, y: 25 },
  },
};

export const WithPan: Story = {
  args: {
    connections: simpleConnections,
    zoom: 1,
    pan: { x: -50, y: 20 },
  },
};
