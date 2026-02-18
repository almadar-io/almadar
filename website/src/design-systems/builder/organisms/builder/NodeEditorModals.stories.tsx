import type { Meta, StoryObj } from '@storybook/react';
import {
  StateModal,
  EventModal,
  PageModal,
  ComponentModal,
  TransitionModal,
} from './NodeEditorModals';

// =============================================================================
// StateModal
// =============================================================================

const stateMeta: Meta<typeof StateModal> = {
  title: 'Builder/Organisms/Builder/NodeEditorModals/StateModal',
  component: StateModal,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default stateMeta;

type StateStory = StoryObj<typeof StateModal>;

/** Create a new state */
export const CreateState: StateStory = {
  args: {
    isOpen: true,
    onClose: () => {},
    onSave: () => {},
    isEditing: false,
  },
};

/** Edit an existing state */
export const EditState: StateStory = {
  args: {
    isOpen: true,
    onClose: () => {},
    onSave: () => {},
    isEditing: true,
    initialData: { name: 'Loading', description: 'Fetching data from API', isInitial: false, isFinal: false },
  },
};

/** Edit an initial state */
export const EditInitialState: StateStory = {
  args: {
    isOpen: true,
    onClose: () => {},
    onSave: () => {},
    isEditing: true,
    initialData: { name: 'Idle', description: 'Waiting for user input', isInitial: true, isFinal: false },
  },
};

// =============================================================================
// EventModal
// =============================================================================

export const CreateEvent: StoryObj<typeof EventModal> = {
  render: () => (
    <EventModal isOpen={true} onClose={() => {}} onSave={() => {}} />
  ),
};

export const EditEvent: StoryObj<typeof EventModal> = {
  render: () => (
    <EventModal
      isOpen={true}
      onClose={() => {}}
      onSave={() => {}}
      isEditing={true}
      initialData={{ key: 'SUBMIT_FORM', name: 'Submit Form', description: 'User submits the form' }}
    />
  ),
};

// =============================================================================
// PageModal
// =============================================================================

export const CreatePage: StoryObj<typeof PageModal> = {
  render: () => (
    <PageModal isOpen={true} onClose={() => {}} onSave={() => {}} />
  ),
};

export const EditPage: StoryObj<typeof PageModal> = {
  render: () => (
    <PageModal
      isOpen={true}
      onClose={() => {}}
      onSave={() => {}}
      isEditing={true}
      initialData={{ name: 'Dashboard', path: '/dashboard', title: 'Dashboard', description: 'Main dashboard page', isInitial: true }}
    />
  ),
};

// =============================================================================
// ComponentModal
// =============================================================================

export const AddOrganism: StoryObj<typeof ComponentModal> = {
  render: () => (
    <ComponentModal
      isOpen={true}
      onClose={() => {}}
      onSave={() => {}}
      nodeType="Organism"
    />
  ),
};

export const AddMolecule: StoryObj<typeof ComponentModal> = {
  render: () => (
    <ComponentModal
      isOpen={true}
      onClose={() => {}}
      onSave={() => {}}
      nodeType="Molecule"
    />
  ),
};

export const AddAtom: StoryObj<typeof ComponentModal> = {
  render: () => (
    <ComponentModal
      isOpen={true}
      onClose={() => {}}
      onSave={() => {}}
      nodeType="Atom"
    />
  ),
};

// =============================================================================
// TransitionModal
// =============================================================================

const mockStates = [
  { id: 's1', name: 'Idle' },
  { id: 's2', name: 'Loading' },
  { id: 's3', name: 'Active' },
  { id: 's4', name: 'Error' },
];

const mockEvents = [
  { id: 'e1', key: 'FETCH', name: 'Fetch Data' },
  { id: 'e2', key: 'SUCCESS', name: 'Fetch Success' },
  { id: 'e3', key: 'FAILURE', name: 'Fetch Failure' },
];

export const CreateTransition: StoryObj<typeof TransitionModal> = {
  render: () => (
    <TransitionModal
      isOpen={true}
      onClose={() => {}}
      onSave={() => {}}
      states={mockStates}
      events={mockEvents}
    />
  ),
};

export const CreateTransitionFromState: StoryObj<typeof TransitionModal> = {
  render: () => (
    <TransitionModal
      isOpen={true}
      onClose={() => {}}
      onSave={() => {}}
      states={mockStates}
      events={mockEvents}
      initialFromStateId="s1"
    />
  ),
};
