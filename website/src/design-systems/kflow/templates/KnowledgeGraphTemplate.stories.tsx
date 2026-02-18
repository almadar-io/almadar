import type { Meta, StoryObj } from "@storybook/react";
import { KnowledgeGraphTemplate } from "./KnowledgeGraphTemplate";

const meta: Meta<typeof KnowledgeGraphTemplate> = {
  title: "KFlow/Templates/KnowledgeGraphTemplate",
  component: KnowledgeGraphTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof KnowledgeGraphTemplate>;

const sampleNodes = [
  {
    id: "1",
    type: "topic",
    properties: { label: "Machine Learning", layer: 0 },
  },
  {
    id: "2",
    type: "concept",
    properties: { label: "Supervised Learning", layer: 1 },
  },
  {
    id: "3",
    type: "concept",
    properties: { label: "Unsupervised Learning", layer: 1 },
  },
  {
    id: "4",
    type: "concept",
    properties: { label: "Neural Networks", layer: 2 },
  },
  {
    id: "5",
    type: "concept",
    properties: { label: "Decision Trees", layer: 2 },
  },
  { id: "6", type: "concept", properties: { label: "Clustering", layer: 2 } },
  { id: "7", type: "topic", properties: { label: "Deep Learning", layer: 3 } },
  {
    id: "8",
    type: "skill",
    properties: { label: "Backpropagation", layer: 3 },
  },
];

const sampleLinks = [
  { source: "1", target: "2", type: "related" },
  { source: "1", target: "3", type: "related" },
  { source: "2", target: "4", type: "prerequisite" },
  { source: "2", target: "5", type: "prerequisite" },
  { source: "3", target: "6", type: "prerequisite" },
  { source: "4", target: "7", type: "related" },
  { source: "4", target: "8", type: "related" },
];

const sampleLayers = [
  { number: 0, name: "Foundations", conceptCount: 1, completed: true },
  { number: 1, name: "Core Concepts", conceptCount: 2, completed: true },
  { number: 2, name: "Techniques", conceptCount: 3, completed: false },
  { number: 3, name: "Advanced", conceptCount: 2, completed: false },
];

const sampleConcepts = [
  {
    id: "4",
    name: "Neural Networks",
    description: "Computational models inspired by biological neural networks.",
    layer: 2,
    hasLesson: true,
    progress: 60,
  },
  {
    id: "5",
    name: "Decision Trees",
    description: "A tree-structured model for classification and regression.",
    layer: 2,
    hasLesson: true,
    progress: 100,
    isCompleted: true,
  },
  {
    id: "6",
    name: "Clustering",
    description: "Grouping similar data points together.",
    layer: 2,
    hasLesson: false,
    progress: 0,
  },
];

export const Default: Story = {
  args: {
    entity: {
      id: "graph-1",
      title: "Machine Learning Fundamentals",
      description: "A comprehensive knowledge graph covering ML concepts.",
      nodes: sampleNodes,
      links: sampleLinks,
      layers: sampleLayers,
      currentLayer: 2,
      concepts: sampleConcepts,
      learningGoal: "Master the fundamental techniques of machine learning.",
    },
  },
};

export const ListView: Story = {
  args: {
    entity: {
      id: "graph-2",
      title: "Deep Learning Course",
      nodes: sampleNodes,
      links: sampleLinks,
      layers: sampleLayers,
      currentLayer: 2,
      concepts: sampleConcepts,
    },
    defaultView: "list",
  },
};

export const NoLegend: Story = {
  args: {
    entity: {
      id: "graph-3",
      title: "Python Programming",
      nodes: sampleNodes.slice(0, 4),
      links: sampleLinks.slice(0, 3),
      layers: sampleLayers.slice(0, 2),
      currentLayer: 1,
    },
    showLegend: false,
  },
};

export const NoLayerNav: Story = {
  args: {
    entity: {
      id: "graph-4",
      title: "Single Layer Graph",
      nodes: sampleNodes.filter(
        (n) => n.properties.layer === 0 || n.properties.layer === 1,
      ),
      links: sampleLinks.slice(0, 2),
      layers: [{ number: 0, name: "All Concepts", conceptCount: 3 }],
      currentLayer: 0,
    },
    showLayerNav: false,
  },
};

export const EmptyLayer: Story = {
  args: {
    entity: {
      id: "graph-5",
      title: "Data Science Path",
      nodes: sampleNodes,
      links: sampleLinks,
      layers: [...sampleLayers, { number: 4, name: "Expert", conceptCount: 0 }],
      currentLayer: 4,
      concepts: [],
    },
    defaultView: "list",
  },
};

export const LargeGraph: Story = {
  args: {
    entity: {
      id: "graph-6",
      title: "Complete AI Curriculum",
      description:
        "An extensive knowledge graph covering all aspects of artificial intelligence.",
      nodes: [
        ...sampleNodes,
        { id: "9", type: "concept", properties: { label: "CNNs", layer: 4 } },
        { id: "10", type: "concept", properties: { label: "RNNs", layer: 4 } },
        {
          id: "11",
          type: "concept",
          properties: { label: "Transformers", layer: 4 },
        },
        { id: "12", type: "concept", properties: { label: "GANs", layer: 4 } },
        {
          id: "13",
          type: "topic",
          properties: { label: "Reinforcement Learning", layer: 3 },
        },
        { id: "14", type: "topic", properties: { label: "NLP", layer: 3 } },
      ],
      links: [
        ...sampleLinks,
        { source: "7", target: "9", type: "related" },
        { source: "7", target: "10", type: "related" },
        { source: "7", target: "11", type: "related" },
        { source: "7", target: "12", type: "related" },
        { source: "1", target: "13", type: "related" },
        { source: "1", target: "14", type: "related" },
        { source: "13", target: "14", type: "related" },
      ],
      layers: [
        ...sampleLayers,
        { number: 4, name: "Architectures", conceptCount: 4 },
      ],
      currentLayer: 0,
      learningGoal:
        "Become proficient in all major areas of artificial intelligence.",
    },
  },
};
