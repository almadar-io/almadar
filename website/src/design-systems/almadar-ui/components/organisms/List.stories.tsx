import type { Meta, StoryObj } from '@storybook/react-vite';
import { List } from './List';

const meta: Meta<typeof List> = {
    title: 'Organisms/List',
    component: List,
    parameters: {
        layout: 'padded',
        backgrounds: { default: 'wireframe' },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
    {
        id: '1',
        title: 'Design new landing page',
        status: 'active',
        priority: 'high',
        dueDate: '2026-03-01',
    },
    {
        id: '2',
        title: 'Review pull requests',
        status: 'pending',
        priority: 'medium',
        dueDate: '2026-02-20',
    },
    {
        id: '3',
        title: 'Write unit tests for auth module',
        status: 'complete',
        priority: 'low',
        dueDate: '2026-02-15',
    },
    {
        id: '4',
        title: 'Deploy to production',
        status: 'blocked',
        priority: 'high',
        dueDate: '2026-02-25',
    },
    {
        id: '5',
        title: 'Update documentation',
        status: 'pending',
        priority: 'low',
        dueDate: '2026-03-10',
    },
];

export const Default: Story = {
    args: {
        data: sampleItems,
        fields: ['title', 'status', 'priority', 'dueDate'],
        entityType: 'Tasks',
    },
};

export const WithItemActions: Story = {
    args: {
        data: sampleItems,
        fields: ['title', 'status', 'priority'],
        entityType: 'Tasks',
        itemActions: [
            { label: 'View', event: 'VIEW' },
            { label: 'Edit', event: 'EDIT' },
            { label: 'Delete', event: 'DELETE', variant: 'danger' },
        ],
    },
};

export const Selectable: Story = {
    args: {
        data: sampleItems,
        fields: ['title', 'status', 'priority'],
        entityType: 'Tasks',
        selectable: true,
        selectedItems: ['1', '3'],
        onSelectionChange: (ids: string[]) => console.log('Selected:', ids),
    },
};

export const Loading: Story = {
    args: {
        data: [],
        fields: ['title', 'status'],
        entityType: 'Tasks',
        isLoading: true,
    },
};

export const Empty: Story = {
    args: {
        data: [],
        fields: ['title', 'status'],
        entityType: 'Tasks',
        emptyMessage: 'No tasks found. Create your first task to get started.',
    },
};

export const WithProgress: Story = {
    args: {
        data: [
            { id: '1', title: 'Website Redesign', status: 'active', progress: 65, dueDate: '2026-03-15' },
            { id: '2', title: 'Mobile App', status: 'active', progress: 30, dueDate: '2026-04-01' },
            { id: '3', title: 'API Integration', status: 'complete', progress: 100, dueDate: '2026-02-10' },
            { id: '4', title: 'Database Migration', status: 'pending', progress: 10, dueDate: '2026-03-30' },
        ],
        fields: ['title', 'status', 'progress', 'dueDate'],
        entityType: 'Projects',
    },
};
