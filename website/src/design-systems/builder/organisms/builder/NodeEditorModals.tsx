/**
 * Node Editor Modals
 *
 * Modals for creating and editing graph nodes (states, events, pages, components).
 */

import React, { useState, useEffect } from 'react';
import { Typography, Button, Input, Badge, Modal, FormField, VStack, HStack, Box, Checkbox, Select, Label } from '@almadar/ui';

// =============================================================================
// State Modal
// =============================================================================

export interface StateFormData { name: string; description: string; isInitial: boolean; isFinal: boolean; }

export interface StateModalProps {
  isOpen: boolean; onClose: () => void; onSave: (data: StateFormData) => void;
  initialData?: Partial<StateFormData>; isEditing?: boolean;
}

export const StateModal: React.FC<StateModalProps> = ({ isOpen, onClose, onSave, initialData, isEditing = false }) => {
  const [formData, setFormData] = useState<StateFormData>({ name: '', description: '', isInitial: false, isFinal: false });

  useEffect(() => {
    if (initialData) {
      setFormData({ name: initialData.name || '', description: initialData.description || '', isInitial: initialData.isInitial || false, isFinal: initialData.isFinal || false });
    } else {
      setFormData({ name: '', description: '', isInitial: false, isFinal: false });
    }
  }, [initialData, isOpen]);

  const handleSave = () => { if (!formData.name.trim()) return; onSave(formData); onClose(); };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit State' : 'Create State'} size="md"
      footer={<><Button variant="ghost" onClick={onClose}>Cancel</Button><Button onClick={handleSave} disabled={!formData.name.trim()}>{isEditing ? 'Save Changes' : 'Create State'}</Button></>}>
      <VStack gap="md">
        <FormField label="State Name" required>
          <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g., Idle, Loading, Active" />
        </FormField>
        <FormField label="Description">
          <Input value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Optional description..." />
        </FormField>
        <HStack gap="md">
          <Checkbox
            label="Initial State"
            checked={formData.isInitial}
            onChange={(e) => setFormData({ ...formData, isInitial: e.target.checked, isFinal: e.target.checked ? false : formData.isFinal })}
          />
          <Checkbox
            label="Final State"
            checked={formData.isFinal}
            onChange={(e) => setFormData({ ...formData, isFinal: e.target.checked, isInitial: e.target.checked ? false : formData.isInitial })}
          />
        </HStack>
      </VStack>
    </Modal>
  );
};

// =============================================================================
// Event Modal
// =============================================================================

export interface EventFormData { key: string; name: string; description: string; }

export interface EventModalProps {
  isOpen: boolean; onClose: () => void; onSave: (data: EventFormData) => void;
  initialData?: Partial<EventFormData>; isEditing?: boolean;
}

export const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, onSave, initialData, isEditing = false }) => {
  const [formData, setFormData] = useState<EventFormData>({ key: '', name: '', description: '' });

  useEffect(() => {
    if (initialData) setFormData({ key: initialData.key || '', name: initialData.name || '', description: initialData.description || '' });
    else setFormData({ key: '', name: '', description: '' });
  }, [initialData, isOpen]);

  const handleKeyChange = (value: string) => {
    const formatted = value.toUpperCase().replace(/\s+/g, '_').replace(/[^A-Z0-9_]/g, '');
    setFormData({ ...formData, key: formatted });
  };

  const handleNameChange = (value: string) => {
    setFormData({ ...formData, name: value });
    if (!formData.key || formData.key === formData.name.toUpperCase().replace(/\s+/g, '_')) handleKeyChange(value);
  };

  const handleSave = () => { if (!formData.key.trim() || !formData.name.trim()) return; onSave(formData); onClose(); };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Event' : 'Create Event'} size="md"
      footer={<><Button variant="ghost" onClick={onClose}>Cancel</Button><Button onClick={handleSave} disabled={!formData.key.trim() || !formData.name.trim()}>{isEditing ? 'Save Changes' : 'Create Event'}</Button></>}>
      <VStack gap="md">
        <FormField label="Event Name" required>
          <Input value={formData.name} onChange={(e) => handleNameChange(e.target.value)} placeholder="e.g., Submit Form, Toggle Menu" />
        </FormField>
        <FormField label="Event Key" required>
          <Input value={formData.key} onChange={(e) => handleKeyChange(e.target.value)} placeholder="e.g., SUBMIT_FORM" />
          <Typography variant="caption" className="mt-1" style={{ color: 'var(--color-muted-foreground)' }}>
            Auto-generated from name. Used in code:{' '}
            <Typography as="span" variant="caption" className="font-mono" style={{ color: 'var(--color-primary)' }}>
              executeEvent("{formData.key || 'EVENT_KEY'}")
            </Typography>
          </Typography>
        </FormField>
        <FormField label="Description">
          <Input value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="What triggers this event?" />
        </FormField>
      </VStack>
    </Modal>
  );
};

// =============================================================================
// Page Modal
// =============================================================================

export interface PageFormData { name: string; path: string; title: string; description: string; isInitial: boolean; }

export interface PageModalProps {
  isOpen: boolean; onClose: () => void; onSave: (data: PageFormData) => void;
  initialData?: Partial<PageFormData>; isEditing?: boolean;
}

export const PageModal: React.FC<PageModalProps> = ({ isOpen, onClose, onSave, initialData, isEditing = false }) => {
  const [formData, setFormData] = useState<PageFormData>({ name: '', path: '', title: '', description: '', isInitial: false });

  useEffect(() => {
    if (initialData) setFormData({ name: initialData.name || '', path: initialData.path || '', title: initialData.title || '', description: initialData.description || '', isInitial: initialData.isInitial || false });
    else setFormData({ name: '', path: '', title: '', description: '', isInitial: false });
  }, [initialData, isOpen]);

  const handleNameChange = (value: string) => {
    setFormData({ ...formData, name: value, title: value });
    if (!formData.path || formData.path === `/${formData.name.toLowerCase().replace(/\s+/g, '-')}`) {
      const path = `/${value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
      setFormData(prev => ({ ...prev, name: value, title: value, path }));
    }
  };

  const handleSave = () => { if (!formData.name.trim() || !formData.path.trim()) return; onSave(formData); onClose(); };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Page' : 'Create Page'} size="md"
      footer={<><Button variant="ghost" onClick={onClose}>Cancel</Button><Button onClick={handleSave} disabled={!formData.name.trim() || !formData.path.trim()}>{isEditing ? 'Save Changes' : 'Create Page'}</Button></>}>
      <VStack gap="md">
        <FormField label="Page Name" required><Input value={formData.name} onChange={(e) => handleNameChange(e.target.value)} placeholder="e.g., Home, Login" /></FormField>
        <FormField label="URL Path" required><Input value={formData.path} onChange={(e) => setFormData({ ...formData, path: e.target.value })} placeholder="e.g., /, /login" /></FormField>
        <FormField label="Page Title"><Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Browser tab title" /></FormField>
        <FormField label="Description"><Input value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="What is this page for?" /></FormField>
        <Checkbox
          label="Initial Page (shown first)"
          checked={formData.isInitial}
          onChange={(e) => setFormData({ ...formData, isInitial: e.target.checked })}
        />
      </VStack>
    </Modal>
  );
};

// =============================================================================
// Component Modal
// =============================================================================

export interface ComponentFormData { name: string; componentType: string; props: Record<string, unknown>; }

export interface ComponentModalProps {
  isOpen: boolean; onClose: () => void; onSave: (data: ComponentFormData) => void;
  initialData?: Partial<ComponentFormData>; nodeType: 'Organism' | 'Molecule' | 'Atom'; isEditing?: boolean;
}

const COMPONENT_OPTIONS: Record<string, string[]> = {
  Organism: ['Header', 'Sidebar', 'Form', 'DataTable', 'Navbar', 'Footer', 'Navigation', 'List'],
  Molecule: ['Card', 'Alert', 'Modal', 'FormField', 'Tabs', 'Dropdown', 'SearchBar', 'Tooltip'],
  Atom: ['Button', 'Input', 'Typography', 'Badge', 'Spinner', 'Avatar', 'Icon', 'Checkbox'],
};

export const ComponentModal: React.FC<ComponentModalProps> = ({ isOpen, onClose, onSave, initialData, nodeType, isEditing = false }) => {
  const [formData, setFormData] = useState<ComponentFormData>({ name: '', componentType: '', props: {} });

  useEffect(() => {
    if (initialData) setFormData({ name: initialData.name || '', componentType: initialData.componentType || '', props: initialData.props || {} });
    else setFormData({ name: '', componentType: '', props: {} });
  }, [initialData, isOpen]);

  const handleTypeChange = (value: string) => setFormData({ ...formData, componentType: value, name: formData.name || value });
  const handleSave = () => { if (!formData.name.trim() || !formData.componentType.trim()) return; onSave(formData); onClose(); };
  const componentOptions = COMPONENT_OPTIONS[nodeType] || [];

  const selectOptions = [
    ...componentOptions.map((opt) => ({ value: opt, label: opt })),
    { value: 'custom', label: 'Custom Component' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? `Edit ${nodeType}` : `Add ${nodeType}`} size="md"
      footer={<><Button variant="ghost" onClick={onClose}>Cancel</Button><Button onClick={handleSave} disabled={!formData.name.trim() || !formData.componentType.trim()}>{isEditing ? 'Save Changes' : `Add ${nodeType}`}</Button></>}>
      <VStack gap="md">
        <FormField label="Component Type" required>
          <Select
            value={formData.componentType}
            onChange={(e) => handleTypeChange(e.target.value)}
            options={selectOptions}
            placeholder="Select a component..."
            className="w-full px-3 py-2 rounded-lg border focus:ring-1"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-foreground)' }}
          />
        </FormField>
        {formData.componentType === 'custom' && (
          <FormField label="Custom Component Name" required>
            <Input value="" onChange={(e) => setFormData({ ...formData, componentType: e.target.value })} placeholder="Enter custom component name" />
          </FormField>
        )}
        <FormField label="Instance Name" required>
          <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder={`e.g., Main${formData.componentType || nodeType}`} />
        </FormField>
        <Box
          className="p-3 rounded-lg border"
          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          <Typography variant="caption" className="block mb-2" style={{ color: 'var(--color-muted-foreground)' }}>Atomic Design Level</Typography>
          <Badge variant={nodeType === 'Organism' ? 'success' : nodeType === 'Molecule' ? 'warning' : 'danger'}>{nodeType}</Badge>
          <Typography variant="caption" className="block mt-2" style={{ color: 'var(--color-muted-foreground)' }}>
            {nodeType === 'Organism' && 'Complex UI sections composed of molecules and atoms'}
            {nodeType === 'Molecule' && 'Composite components made from atoms'}
            {nodeType === 'Atom' && 'Basic building blocks (buttons, inputs, text)'}
          </Typography>
        </Box>
      </VStack>
    </Modal>
  );
};

// =============================================================================
// Transition Modal
// =============================================================================

export interface TransitionFormData { fromStateId: string; toStateId: string; eventId: string; guardExpression?: string; }

export interface TransitionModalProps {
  isOpen: boolean; onClose: () => void; onSave: (data: TransitionFormData) => void;
  states: Array<{ id: string; name: string }>; events: Array<{ id: string; key: string; name: string }>;
  initialFromStateId?: string;
}

export const TransitionModal: React.FC<TransitionModalProps> = ({ isOpen, onClose, onSave, states, events, initialFromStateId }) => {
  const [formData, setFormData] = useState<TransitionFormData>({ fromStateId: '', toStateId: '', eventId: '', guardExpression: '' });

  useEffect(() => {
    if (initialFromStateId) setFormData(prev => ({ ...prev, fromStateId: initialFromStateId }));
  }, [initialFromStateId, isOpen]);

  const handleSave = () => { if (!formData.fromStateId || !formData.toStateId || !formData.eventId) return; onSave(formData); onClose(); };

  const stateOptions = states.map((s) => ({ value: s.id, label: s.name }));
  const eventOptions = events.map((e) => ({ value: e.id, label: `${e.key} - ${e.name}` }));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Transition" size="md"
      footer={<><Button variant="ghost" onClick={onClose}>Cancel</Button><Button onClick={handleSave} disabled={!formData.fromStateId || !formData.toStateId || !formData.eventId}>Create Transition</Button></>}>
      <VStack gap="md">
        <FormField label="From State" required>
          <Select
            value={formData.fromStateId}
            onChange={(e) => setFormData({ ...formData, fromStateId: e.target.value })}
            options={stateOptions}
            placeholder="Select source state..."
            className="w-full px-3 py-2 rounded-lg border focus:ring-1"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-foreground)' }}
          />
        </FormField>
        <FormField label="On Event" required>
          <Select
            value={formData.eventId}
            onChange={(e) => setFormData({ ...formData, eventId: e.target.value })}
            options={eventOptions}
            placeholder="Select event..."
            className="w-full px-3 py-2 rounded-lg border focus:ring-1"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-foreground)' }}
          />
        </FormField>
        <FormField label="To State" required>
          <Select
            value={formData.toStateId}
            onChange={(e) => setFormData({ ...formData, toStateId: e.target.value })}
            options={stateOptions}
            placeholder="Select target state..."
            className="w-full px-3 py-2 rounded-lg border focus:ring-1"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-foreground)' }}
          />
        </FormField>
        <FormField label="Guard Expression (optional)">
          <Input value={formData.guardExpression || ''} onChange={(e) => setFormData({ ...formData, guardExpression: e.target.value })} placeholder="e.g., state.isValid == true" />
        </FormField>
        <Box
          className="p-3 rounded-lg border"
          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          <Typography variant="caption" style={{ color: 'var(--color-muted-foreground)' }}>
            This creates a transition: When in{' '}
            <Typography as="span" variant="caption" className="font-bold">{states.find(s => s.id === formData.fromStateId)?.name || '?'}</Typography>
            {' '}state and{' '}
            <Typography as="span" variant="caption" className="font-bold">{events.find(e => e.id === formData.eventId)?.key || '?'}</Typography>
            {' '}event fires, transition to{' '}
            <Typography as="span" variant="caption" className="font-bold">{states.find(s => s.id === formData.toStateId)?.name || '?'}</Typography>.
          </Typography>
        </Box>
      </VStack>
    </Modal>
  );
};
