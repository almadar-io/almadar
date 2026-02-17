import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sidebar } from './Sidebar';
import { Home, Users, Settings, FileText, BarChart, Mail, Calendar } from 'lucide-react';

const meta: Meta<typeof Sidebar> = {
    title: 'Organisms/Sidebar',
    component: Sidebar,
    parameters: {
        layout: 'fullscreen',
        backgrounds: { default: 'wireframe' },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, href: '#' },
    { id: 'users', label: 'Users', icon: Users, href: '#' },
    { id: 'reports', label: 'Reports', icon: BarChart, href: '#' },
    { id: 'documents', label: 'Documents', icon: FileText, href: '#' },
    { id: 'messages', label: 'Messages', icon: Mail, href: '#', badge: 5 },
    { id: 'calendar', label: 'Calendar', icon: Calendar, href: '#' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '#' },
];

export const Default: Story = {
    args: {
        items: sidebarItems.map(item => ({ ...item, active: item.id === 'dashboard' })),
        brandName: 'MyApp',
    },
    decorators: [
        (Story) => (
            <div className="h-screen">
                <Story />
            </div>
        ),
    ],
};

export const Collapsed: Story = {
    args: {
        items: sidebarItems.map(item => ({ ...item, active: item.id === 'dashboard' })),
        brandName: 'MA',
        defaultCollapsed: true,
    },
    decorators: [
        (Story) => (
            <div className="h-screen">
                <Story />
            </div>
        ),
    ],
};

export const WithManyItems: Story = {
    args: {
        items: [
            { id: 'dashboard', label: 'Dashboard', icon: Home, href: '#' },
            { id: 'users', label: 'Users', icon: Users, href: '#', active: true },
            { id: 'reports', label: 'Reports', icon: BarChart, href: '#' },
            { id: 'documents', label: 'Documents', icon: FileText, href: '#' },
            { id: 'messages', label: 'Messages', icon: Mail, href: '#', badge: 3 },
        ],
        brandName: 'MyApp',
    },
    decorators: [
        (Story) => (
            <div className="h-screen">
                <Story />
            </div>
        ),
    ],
};

export const WithFooter: Story = {
    args: {
        items: sidebarItems.map(item => ({ ...item, active: item.id === 'dashboard' })),
        brandName: 'MyApp',
        footerContent: (
            <div className="p-4 border-t-2 border-black">
                <p className="text-sm text-neutral-600">v1.0.0</p>
            </div>
        ),
    },
    decorators: [
        (Story) => (
            <div className="h-screen">
                <Story />
            </div>
        ),
    ],
};
