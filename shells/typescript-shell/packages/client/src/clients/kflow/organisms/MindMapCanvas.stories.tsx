import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { MindMapCanvas } from "./MindMapCanvas";

const meta: Meta<typeof MindMapCanvas> = {
  title: "KFlow/Organisms/MindMapCanvas",
  component: MindMapCanvas,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ height: "500px", width: "100%", padding: "20px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MindMapCanvas>;

// Sample mindmap content for stories
const SampleContent = () => (
  <>
    {/* Root node */}
    <g transform="translate(300, 200)">
      <rect
        x="-60"
        y="-25"
        width="120"
        height="50"
        rx="8"
        fill="#8b5cf6"
        stroke="#7c3aed"
        strokeWidth="2"
      />
      <text
        x="0"
        y="5"
        textAnchor="middle"
        fill="white"
        fontSize="14"
        fontWeight="bold"
      >
        Main Topic
      </text>
    </g>

    {/* Child nodes */}
    <g transform="translate(150, 100)">
      <rect
        x="-50"
        y="-20"
        width="100"
        height="40"
        rx="6"
        fill="#3b82f6"
        stroke="#2563eb"
        strokeWidth="1"
      />
      <text x="0" y="5" textAnchor="middle" fill="white" fontSize="12">
        Subtopic A
      </text>
    </g>

    <g transform="translate(450, 100)">
      <rect
        x="-50"
        y="-20"
        width="100"
        height="40"
        rx="6"
        fill="#3b82f6"
        stroke="#2563eb"
        strokeWidth="1"
      />
      <text x="0" y="5" textAnchor="middle" fill="white" fontSize="12">
        Subtopic B
      </text>
    </g>

    <g transform="translate(150, 300)">
      <rect
        x="-50"
        y="-20"
        width="100"
        height="40"
        rx="6"
        fill="#10b981"
        stroke="#059669"
        strokeWidth="1"
      />
      <text x="0" y="5" textAnchor="middle" fill="white" fontSize="12">
        Subtopic C
      </text>
    </g>

    <g transform="translate(450, 300)">
      <rect
        x="-50"
        y="-20"
        width="100"
        height="40"
        rx="6"
        fill="#10b981"
        stroke="#059669"
        strokeWidth="1"
      />
      <text x="0" y="5" textAnchor="middle" fill="white" fontSize="12">
        Subtopic D
      </text>
    </g>

    {/* Connections */}
    <path
      d="M 240 200 Q 195 150 150 120"
      fill="none"
      stroke="#94a3b8"
      strokeWidth="2"
    />
    <path
      d="M 360 200 Q 405 150 450 120"
      fill="none"
      stroke="#94a3b8"
      strokeWidth="2"
    />
    <path
      d="M 240 200 Q 195 250 150 280"
      fill="none"
      stroke="#94a3b8"
      strokeWidth="2"
    />
    <path
      d="M 360 200 Q 405 250 450 280"
      fill="none"
      stroke="#94a3b8"
      strokeWidth="2"
    />
  </>
);

export const Default: Story = {
  args: {
    width: 600,
    height: 400,
    enablePan: true,
    enableZoom: true,
    onZoomChange: action("UI:MINDMAP_ZOOM"),
    onPanChange: action("UI:MINDMAP_PAN"),
  },
  render: (args) => (
    <MindMapCanvas {...args}>
      <SampleContent />
    </MindMapCanvas>
  ),
};

export const ZoomedIn: Story = {
  args: {
    width: 600,
    height: 400,
    initialZoom: 1.5,
    enablePan: true,
    enableZoom: true,
  },
  render: (args) => (
    <MindMapCanvas {...args}>
      <SampleContent />
    </MindMapCanvas>
  ),
};

export const ZoomedOut: Story = {
  args: {
    width: 600,
    height: 400,
    initialZoom: 0.5,
    enablePan: true,
    enableZoom: true,
  },
  render: (args) => (
    <MindMapCanvas {...args}>
      <SampleContent />
    </MindMapCanvas>
  ),
};

export const PanOnly: Story = {
  args: {
    width: 600,
    height: 400,
    enablePan: true,
    enableZoom: false,
  },
  render: (args) => (
    <MindMapCanvas {...args}>
      <SampleContent />
    </MindMapCanvas>
  ),
};

export const ZoomOnly: Story = {
  args: {
    width: 600,
    height: 400,
    enablePan: false,
    enableZoom: true,
  },
  render: (args) => (
    <MindMapCanvas {...args}>
      <SampleContent />
    </MindMapCanvas>
  ),
};

export const NoInteraction: Story = {
  args: {
    width: 600,
    height: 400,
    enablePan: false,
    enableZoom: false,
  },
  render: (args) => (
    <MindMapCanvas {...args}>
      <SampleContent />
    </MindMapCanvas>
  ),
};

export const AutoSize: Story = {
  args: {
    enablePan: true,
    enableZoom: true,
  },
  render: (args) => (
    <MindMapCanvas {...args}>
      <SampleContent />
    </MindMapCanvas>
  ),
};

export const Empty: Story = {
  args: {
    width: 600,
    height: 400,
  },
  render: (args) => (
    <MindMapCanvas {...args}>
      <text x="300" y="200" textAnchor="middle" fill="#9ca3af" fontSize="14">
        Click to add a node
      </text>
    </MindMapCanvas>
  ),
};
