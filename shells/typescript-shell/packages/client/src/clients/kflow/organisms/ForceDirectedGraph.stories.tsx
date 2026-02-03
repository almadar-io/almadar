import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ForceDirectedGraph, KnowledgeGraph } from "./ForceDirectedGraph";

const meta: Meta<typeof ForceDirectedGraph> = {
  title: "KFlow/Organisms/ForceDirectedGraph",
  component: ForceDirectedGraph,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ height: "600px", width: "100%" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ForceDirectedGraph>;

// Mock knowledge graph data
const mockGraph: KnowledgeGraph = {
  seedConceptId: "concept-1",
  nodes: {
    "concept-1": {
      id: "concept-1",
      type: "Concept",
      properties: {
        name: "Photosynthesis",
        description: "The process by which plants convert light energy into chemical energy",
        layer: 0,
        isSeed: true,
      },
    },
    "concept-2": {
      id: "concept-2",
      type: "Concept",
      properties: {
        name: "Chlorophyll",
        description: "Green pigment that absorbs light",
        layer: 1,
      },
    },
    "concept-3": {
      id: "concept-3",
      type: "Concept",
      properties: {
        name: "Light Reactions",
        description: "First stage of photosynthesis",
        layer: 1,
      },
    },
    "concept-4": {
      id: "concept-4",
      type: "Concept",
      properties: {
        name: "Calvin Cycle",
        description: "Second stage of photosynthesis",
        layer: 1,
      },
    },
    "concept-5": {
      id: "concept-5",
      type: "Concept",
      properties: {
        name: "ATP",
        description: "Energy currency of cells",
        layer: 2,
      },
    },
    "concept-6": {
      id: "concept-6",
      type: "Concept",
      properties: {
        name: "NADPH",
        description: "Electron carrier",
        layer: 2,
      },
    },
    "layer-1": {
      id: "layer-1",
      type: "Layer",
      properties: {
        name: "Layer 1",
        layer: 1,
      },
    },
    "layer-2": {
      id: "layer-2",
      type: "Layer",
      properties: {
        name: "Layer 2",
        layer: 2,
      },
    },
    "goal-1": {
      id: "goal-1",
      type: "LearningGoal",
      properties: {
        name: "Understand Photosynthesis",
      },
    },
    "lesson-1": {
      id: "lesson-1",
      type: "Lesson",
      properties: {
        name: "Introduction to Photosynthesis",
      },
    },
  },
  relationships: [
    { source: "concept-1", target: "concept-2", type: "hasChild" },
    { source: "concept-1", target: "concept-3", type: "hasChild" },
    { source: "concept-1", target: "concept-4", type: "hasChild" },
    { source: "concept-3", target: "concept-5", type: "hasChild" },
    { source: "concept-3", target: "concept-6", type: "hasChild" },
    { source: "concept-4", target: "concept-5", type: "hasPrerequisite" },
    { source: "concept-2", target: "layer-1", type: "belongsToLayer" },
    { source: "concept-3", target: "layer-1", type: "belongsToLayer" },
    { source: "concept-4", target: "layer-1", type: "belongsToLayer" },
    { source: "concept-5", target: "layer-2", type: "belongsToLayer" },
    { source: "concept-6", target: "layer-2", type: "belongsToLayer" },
    { source: "concept-1", target: "goal-1", type: "hasLearningGoal" },
    { source: "concept-1", target: "lesson-1", type: "hasLesson" },
  ],
};

// Smaller graph for simple example
const simpleGraph: KnowledgeGraph = {
  seedConceptId: "node-1",
  nodes: {
    "node-1": {
      id: "node-1",
      type: "Concept",
      properties: { name: "Main Concept", isSeed: true },
    },
    "node-2": {
      id: "node-2",
      type: "Concept",
      properties: { name: "Child A", layer: 1 },
    },
    "node-3": {
      id: "node-3",
      type: "Concept",
      properties: { name: "Child B", layer: 1 },
    },
    "node-4": {
      id: "node-4",
      type: "Concept",
      properties: { name: "Child C", layer: 1 },
    },
  },
  relationships: [
    { source: "node-1", target: "node-2", type: "hasChild" },
    { source: "node-1", target: "node-3", type: "hasChild" },
    { source: "node-1", target: "node-4", type: "hasChild" },
    { source: "node-2", target: "node-3", type: "hasPrerequisite" },
  ],
};

export const Default: Story = {
  args: {
    graph: mockGraph,
    showLabels: true,
    showLegend: true,
    onNodeClick: action("UI:SELECT_NODE"),
  },
};

export const SimpleGraph: Story = {
  args: {
    graph: simpleGraph,
    showLabels: true,
    showLegend: true,
    onNodeClick: action("UI:SELECT_NODE"),
  },
};

export const NoLegend: Story = {
  args: {
    graph: mockGraph,
    showLabels: true,
    showLegend: false,
    onNodeClick: action("UI:SELECT_NODE"),
  },
};

export const NoLabels: Story = {
  args: {
    graph: mockGraph,
    showLabels: false,
    showLegend: true,
    onNodeClick: action("UI:SELECT_NODE"),
  },
};

export const Loading: Story = {
  args: {
    graph: null,
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    graph: null,
    isLoading: false,
  },
};

export const FixedDimensions: Story = {
  args: {
    graph: simpleGraph,
    width: 600,
    height: 400,
    showLabels: true,
    showLegend: false,
    onNodeClick: action("UI:SELECT_NODE"),
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "20px", backgroundColor: "#f5f5f5" }}>
        <Story />
      </div>
    ),
  ],
};
