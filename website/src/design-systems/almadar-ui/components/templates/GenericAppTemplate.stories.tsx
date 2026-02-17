import type { Meta, StoryObj } from '@storybook/react-vite';
import { GenericAppTemplate } from './GenericAppTemplate';
import { Button } from '../atoms/Button';
import { Card } from '../atoms/Card';
import { Typography } from '../atoms/Typography';
import { Plus, Settings, Download } from 'lucide-react';

const meta: Meta<typeof GenericAppTemplate> = {
    title: 'Templates/GenericAppTemplate',
    component: GenericAppTemplate,
    parameters: {
        layout: 'fullscreen',
        backgrounds: { default: 'wireframe' },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'My Application',
        children: (
            <div className="space-y-4">
                <Typography variant="body1">
                    This is the main content area of your application.
                </Typography>
                <Card className="p-4">
                    <Typography variant="h5">Welcome!</Typography>
                    <Typography variant="body2" color="secondary">
                        Start building your application from this template.
                    </Typography>
                </Card>
            </div>
        ),
    },
};

export const WithSubtitle: Story = {
    args: {
        title: 'Dashboard',
        subtitle: 'Overview of your system metrics and activities',
        children: (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                    <Typography variant="h6">Metric 1</Typography>
                    <Typography variant="h3">2,543</Typography>
                </Card>
                <Card className="p-4">
                    <Typography variant="h6">Metric 2</Typography>
                    <Typography variant="h3">$45,231</Typography>
                </Card>
                <Card className="p-4">
                    <Typography variant="h6">Metric 3</Typography>
                    <Typography variant="h3">156</Typography>
                </Card>
            </div>
        ),
    },
};

export const WithHeaderActions: Story = {
    args: {
        title: 'Projects',
        subtitle: 'Manage your active projects',
        headerActions: (
            <>
                <Button variant="ghost" size="sm" leftIcon={<Settings className="h-4 w-4" />}>
                    Settings
                </Button>
                <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
                    New Project
                </Button>
            </>
        ),
        children: (
            <div className="space-y-4">
                <Card className="p-4">
                    <Typography variant="h6">Project Alpha</Typography>
                    <Typography variant="body2" color="secondary">Last updated 2 hours ago</Typography>
                </Card>
                <Card className="p-4">
                    <Typography variant="h6">Project Beta</Typography>
                    <Typography variant="body2" color="secondary">Last updated 1 day ago</Typography>
                </Card>
            </div>
        ),
    },
};

export const WithFooter: Story = {
    args: {
        title: 'Document Editor',
        children: (
            <div className="h-[300px] border-2 border-dashed border-neutral-300 flex items-center justify-center">
                <Typography color="secondary">Editor content goes here</Typography>
            </div>
        ),
        footer: (
            <div className="flex justify-between items-center">
                <Typography variant="body2" color="secondary">
                    Last saved: 5 minutes ago
                </Typography>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm">Cancel</Button>
                    <Button variant="primary" size="sm" leftIcon={<Download className="h-4 w-4" />}>
                        Save Document
                    </Button>
                </div>
            </div>
        ),
    },
};

export const FullFeatured: Story = {
    args: {
        title: 'User Management',
        subtitle: 'View and manage all users in your organization',
        headerActions: (
            <>
                <Button variant="ghost" size="sm">Export</Button>
                <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
                    Add User
                </Button>
            </>
        ),
        children: (
            <div className="space-y-4">
                <Card className="p-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <Typography variant="body1" className="font-bold">John Doe</Typography>
                            <Typography variant="body2" color="secondary">john@example.com</Typography>
                        </div>
                        <span className="px-2 py-1 border-2 border-emerald-600 text-emerald-600 text-xs font-bold">Active</span>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <Typography variant="body1" className="font-bold">Jane Smith</Typography>
                            <Typography variant="body2" color="secondary">jane@example.com</Typography>
                        </div>
                        <span className="px-2 py-1 border-2 border-amber-500 text-amber-500 text-xs font-bold">Pending</span>
                    </div>
                </Card>
            </div>
        ),
        footer: (
            <div className="flex justify-between items-center">
                <Typography variant="body2" color="secondary">
                    Showing 2 of 156 users
                </Typography>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm">Previous</Button>
                    <Button variant="ghost" size="sm">Next</Button>
                </div>
            </div>
        ),
    },
};
