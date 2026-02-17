import type { Meta, StoryObj } from '@storybook/react-vite';
import { ListTemplate } from './ListTemplate';

const meta: Meta<typeof ListTemplate> = {
    title: 'Templates/ListTemplate',
    component: ListTemplate,
    parameters: {
        layout: 'fullscreen',
        backgrounds: { default: 'wireframe' },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
    { id: '1', title: 'Buy groceries', completed: true },
    { id: '2', title: 'Finish project report', completed: false },
    { id: '3', title: 'Call the dentist', completed: false },
    { id: '4', title: 'Review pull requests', completed: true },
    { id: '5', title: 'Update documentation', completed: false },
];

export const Default: Story = {
    args: {
        title: 'My Todo List',
        items: sampleItems,
        onAdd: (title: string) => console.log('Add:', title),
        onToggle: (id: string) => console.log('Toggle:', id),
        onDelete: (id: string) => console.log('Delete:', id),
    },
};

export const Empty: Story = {
    args: {
        title: 'Empty List',
        items: [],
        emptyMessage: 'No tasks yet. Add your first task to get started!',
        onAdd: (title: string) => console.log('Add:', title),
    },
};

export const Loading: Story = {
    args: {
        title: 'Loading Items',
        items: [],
        isLoading: true,
    },
};

export const WithError: Story = {
    args: {
        title: 'Failed to Load',
        items: [],
        error: 'Failed to fetch items. Please try again.',
        onRetry: () => console.log('Retry clicked'),
    },
};

export const Minimal: Story = {
    args: {
        title: 'Quick Notes',
        items: sampleItems,
        variant: 'minimal',
        showFilters: false,
        showCount: false,
        onAdd: (title: string) => console.log('Add:', title),
        onToggle: (id: string) => console.log('Toggle:', id),
        onDelete: (id: string) => console.log('Delete:', id),
    },
};

export const Full: Story = {
    args: {
        title: 'Project Tasks',
        items: sampleItems,
        variant: 'full',
        showFilters: true,
        showCount: true,
        placeholder: 'Add a new task...',
        onAdd: (title: string) => console.log('Add:', title),
        onToggle: (id: string) => console.log('Toggle:', id),
        onDelete: (id: string) => console.log('Delete:', id),
        onFilterChange: (filter: string) => console.log('Filter:', filter),
    },
};

export const FilteredActive: Story = {
    args: {
        title: 'Active Tasks Only',
        items: sampleItems,
        filter: 'active',
        showFilters: true,
        onAdd: (title: string) => console.log('Add:', title),
        onToggle: (id: string) => console.log('Toggle:', id),
        onDelete: (id: string) => console.log('Delete:', id),
        onFilterChange: (filter: string) => console.log('Filter:', filter),
    },
};

export const FilteredCompleted: Story = {
    args: {
        title: 'Completed Tasks',
        items: sampleItems,
        filter: 'completed',
        showFilters: true,
        onAdd: (title: string) => console.log('Add:', title),
        onToggle: (id: string) => console.log('Toggle:', id),
        onDelete: (id: string) => console.log('Delete:', id),
        onFilterChange: (filter: string) => console.log('Filter:', filter),
    },
};

export const ShoppingList: Story = {
    args: {
        title: 'Shopping List',
        items: [
            { id: '1', title: 'Milk', completed: false },
            { id: '2', title: 'Bread', completed: true },
            { id: '3', title: 'Eggs', completed: false },
            { id: '4', title: 'Butter', completed: false },
            { id: '5', title: 'Coffee', completed: true },
        ],
        placeholder: 'Add item to list...',
        showFilters: false,
        onAdd: (title: string) => console.log('Add:', title),
        onToggle: (id: string) => console.log('Toggle:', id),
        onDelete: (id: string) => console.log('Delete:', id),
    },
};
