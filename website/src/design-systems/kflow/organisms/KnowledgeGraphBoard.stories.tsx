import type { Meta, StoryObj } from '@storybook/react-vite';
import { KnowledgeGraphBoard } from './KnowledgeGraphBoard';
import type { KnowledgeGraphEntity, GraphNode, GraphRelationship, ConceptEntity, LayerInfo } from './KnowledgeGraphBoard';

const mockNodes: GraphNode[] = [
  { id: 'node-1', type: 'concept', properties: { label: 'Data Structures', size: 20 } },
  { id: 'node-2', type: 'concept', properties: { label: 'Arrays', size: 15 } },
  { id: 'node-3', type: 'concept', properties: { label: 'Linked Lists', size: 15 } },
  { id: 'node-4', type: 'concept', properties: { label: 'Trees', size: 18 } },
  { id: 'node-5', type: 'concept', properties: { label: 'Binary Search', size: 14 } },
  { id: 'node-6', type: 'skill', properties: { label: 'Sorting', size: 16 } },
  { id: 'node-7', type: 'skill', properties: { label: 'Searching', size: 16 } },
  { id: 'node-8', type: 'topic', properties: { label: 'Algorithms', size: 20 } },
];

const mockLinks: GraphRelationship[] = [
  { source: 'node-1', target: 'node-2', type: 'contains' },
  { source: 'node-1', target: 'node-3', type: 'contains' },
  { source: 'node-1', target: 'node-4', type: 'contains' },
  { source: 'node-2', target: 'node-5', type: 'prerequisite', strength: 0.8 },
  { source: 'node-8', target: 'node-6', type: 'contains' },
  { source: 'node-8', target: 'node-7', type: 'contains' },
  { source: 'node-5', target: 'node-7', type: 'related', strength: 0.6 },
];

const mockLayers: LayerInfo[] = [
  { name: 'Foundations', number: 0, conceptCount: 3 },
  { name: 'Core Concepts', number: 1, conceptCount: 4 },
  { name: 'Advanced Topics', number: 2, conceptCount: 1 },
];

const mockConcepts: ConceptEntity[] = [
  { id: 'node-2', name: 'Arrays', description: 'Contiguous memory data structure', layer: 0, hasLesson: true, isCompleted: true, progress: 100 },
  { id: 'node-3', name: 'Linked Lists', description: 'Sequential access data structure', layer: 0, hasLesson: true, progress: 60 },
  { id: 'node-4', name: 'Trees', description: 'Hierarchical data structure', layer: 1, hasLesson: true, isCurrent: true, progress: 30 },
  { id: 'node-5', name: 'Binary Search', description: 'Efficient search in sorted data', layer: 1, hasLesson: false, prerequisites: ['Arrays'] },
];

const mockEntity: KnowledgeGraphEntity = {
  id: 'graph-cs-101',
  title: 'Computer Science Fundamentals',
  description: 'A comprehensive knowledge graph covering core CS concepts and algorithms.',
  nodes: mockNodes,
  links: mockLinks,
  layers: mockLayers,
  currentLayer: 0,
  concepts: mockConcepts,
  learningGoal: 'Master fundamental data structures and algorithms to build efficient software solutions.',
};

const meta: Meta<typeof KnowledgeGraphBoard> = {
  title: 'KFlow/Organisms/KnowledgeGraphBoard',
  component: KnowledgeGraphBoard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KnowledgeGraphBoard>;

export const Default: Story = {
  args: {
    entity: mockEntity,
    selectNodeEvent: 'SELECT_NODE',
    toggleViewEvent: 'TOGGLE_VIEW',
    viewConceptEvent: 'VIEW_CONCEPT',
  },
};

export const ListView: Story = {
  args: {
    entity: mockEntity,
    defaultView: 'list',
  },
};

export const NoLayerNav: Story = {
  args: {
    entity: mockEntity,
    showLayerNav: false,
  },
};

export const NoLegend: Story = {
  args: {
    entity: mockEntity,
    showLegend: false,
  },
};

export const NoLearningGoal: Story = {
  args: {
    entity: {
      ...mockEntity,
      learningGoal: undefined,
    },
  },
};

export const EmptyGraph: Story = {
  args: {
    entity: {
      id: 'empty-graph',
      title: 'Empty Knowledge Graph',
      description: 'This graph has no concepts yet.',
      nodes: [],
      links: [],
      layers: [],
      currentLayer: 0,
      concepts: [],
    },
  },
};

export const Empty: Story = {
  args: {
    entity: {
      id: 'empty',
      title: 'New Graph',
      nodes: [],
      links: [],
      layers: [],
      currentLayer: 0,
    },
  },
};

export const SingleNode: Story = {
  args: {
    entity: {
      ...mockEntity,
      nodes: [mockNodes[0]],
      links: [],
      concepts: [mockConcepts[0]],
    },
  },
};
