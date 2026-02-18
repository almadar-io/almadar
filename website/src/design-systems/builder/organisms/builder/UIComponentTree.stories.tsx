import type { Meta, StoryObj } from '@storybook/react';
import { UIComponentTree } from './UIComponentTree';
import type { BuilderGraph } from './types';

const meta: Meta<typeof UIComponentTree> = {
  title: 'Builder/Organisms/Builder/UIComponentTree',
  component: UIComponentTree,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof UIComponentTree>;

// =============================================================================
// Mock Data
// =============================================================================

const richGraph: BuilderGraph = {
  id: 'graph-ui',
  name: 'TaskManager UI',
  createdAt: Date.now(),
  updatedAt: Date.now(),
  version: 1,
  nodes: {
    'p1': { id: 'p1', type: 'Page', properties: { name: 'TasksPage', isInitial: true } },
    'p2': { id: 'p2', type: 'Page', properties: { name: 'SettingsPage' } },
    'o1': { id: 'o1', type: 'Organism', properties: { name: 'TaskList', componentType: 'DataTable' } },
    'o2': { id: 'o2', type: 'Organism', properties: { name: 'TaskHeader', componentType: 'Header' } },
    'm1': { id: 'm1', type: 'Molecule', properties: { name: 'TaskFilter', componentType: 'SearchBar' } },
    'm2': { id: 'm2', type: 'Molecule', properties: { name: 'TaskCard', componentType: 'Card' } },
    'a1': { id: 'a1', type: 'Atom', properties: { name: 'SubmitButton', componentType: 'Button' } },
    'a2': { id: 'a2', type: 'Atom', properties: { name: 'TitleInput', componentType: 'Input' } },
    'df1': { id: 'df1', type: 'DataField', properties: { name: 'title' } },
    'df2': { id: 'df2', type: 'DataField', properties: { name: 'status' } },
    'ev1': { id: 'ev1', type: 'Event', properties: { key: 'SUBMIT', name: 'Submit' } },
  },
  nodeTypes: {
    Page: ['p1', 'p2'],
    Organism: ['o1', 'o2'],
    Molecule: ['m1', 'm2'],
    Atom: ['a1', 'a2'],
    DataField: ['df1', 'df2'],
  },
  relationships: [
    { id: 'c1', source: 'p1', target: 'o1', type: 'COMPOSED_OF', direction: 'forward' },
    { id: 'c2', source: 'p1', target: 'o2', type: 'COMPOSED_OF', direction: 'forward' },
    { id: 'c3', source: 'o1', target: 'm1', type: 'COMPOSED_OF', direction: 'forward' },
    { id: 'c4', source: 'o1', target: 'm2', type: 'COMPOSED_OF', direction: 'forward' },
    { id: 'c5', source: 'm2', target: 'a1', type: 'COMPOSED_OF', direction: 'forward' },
    { id: 'c6', source: 'm2', target: 'a2', type: 'COMPOSED_OF', direction: 'forward' },
    { id: 'b1', source: 'a2', target: 'df1', type: 'BINDS_DATA', direction: 'forward', metadata: { bindingPath: 'value' } },
    { id: 'b2', source: 'm1', target: 'df2', type: 'BINDS_DATA', direction: 'forward', metadata: { bindingPath: 'filter' } },
    { id: 't1', source: 'a1', target: 'ev1', type: 'TRIGGERS_EVENT', direction: 'forward', metadata: { trigger: 'onClick' } },
  ],
};

const emptyGraph: BuilderGraph = {
  id: 'graph-empty',
  name: 'Empty Project',
  createdAt: Date.now(),
  updatedAt: Date.now(),
  version: 1,
  nodes: {},
  nodeTypes: {},
  relationships: [],
};

// =============================================================================
// Stories
// =============================================================================

/** Default editable component tree with pages, organisms, molecules, and atoms */
export const Default: Story = {
  args: {
    graph: richGraph,
    onCreatePage: () => {},
    onCreateComponent: () => {},
    onEditNode: () => {},
    onDeleteNode: () => {},
    onSelectNode: () => {},
  },
};

/** Read-only mode */
export const ReadOnly: Story = {
  args: {
    graph: richGraph,
    readOnly: true,
  },
};

/** Empty project with no pages */
export const EmptyProject: Story = {
  args: {
    graph: emptyGraph,
    onCreatePage: () => {},
  },
};

/** With a pre-selected node */
export const WithSelection: Story = {
  args: {
    graph: richGraph,
    selectedNodeId: 'o1',
    onSelectNode: () => {},
    onEditNode: () => {},
    onDeleteNode: () => {},
  },
};
