import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { PageNavigation } from './PageNavigation';
import type { PreviewPage } from './PageNavigation';

const meta: Meta<typeof PageNavigation> = {
  title: 'Builder/Organisms/Preview/PageNavigation',
  component: PageNavigation,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ height: '500px', width: '260px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PageNavigation>;

// =============================================================================
// Mock Data
// =============================================================================

const threePages: PreviewPage[] = [
  {
    name: 'PatientList',
    path: '/patients',
    viewType: 'list',
    sections: [{ pattern: { type: 'entity-table' } }],
  },
  {
    name: 'PatientDetail',
    path: '/patients/:id',
    viewType: 'detail',
    sections: [{ pattern: { type: 'entity-detail' } }],
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    viewType: 'dashboard',
    sections: [{ pattern: { type: 'stats-grid' } }],
  },
];

const singlePage: PreviewPage[] = [
  {
    name: 'HomePage',
    path: '/',
    viewType: 'dashboard',
    sections: [{ pattern: { type: 'stats-grid' } }],
  },
];

const manyPages: PreviewPage[] = [
  { name: 'Dashboard', path: '/dashboard', viewType: 'dashboard', sections: [{ pattern: { type: 'stats-grid' } }] },
  { name: 'PatientList', path: '/patients', viewType: 'list', sections: [{ pattern: { type: 'entity-table' } }] },
  { name: 'PatientDetail', path: '/patients/:id', viewType: 'detail', sections: [{ pattern: { type: 'entity-detail' } }] },
  { name: 'PatientCreate', path: '/patients/new', viewType: 'create', sections: [{ pattern: { type: 'form-section' } }] },
  { name: 'DoctorList', path: '/doctors', viewType: 'list', sections: [{ pattern: { type: 'entity-table' } }] },
  { name: 'DoctorDetail', path: '/doctors/:id', viewType: 'detail', sections: [{ pattern: { type: 'entity-detail' } }] },
  { name: 'Appointments', path: '/appointments', viewType: 'list', sections: [{ pattern: { type: 'entity-table' } }] },
  { name: 'Schedule', path: '/schedule', viewType: 'detail', sections: [{ pattern: { type: 'calendar' } }] },
  { name: 'Reports', path: '/reports', viewType: 'dashboard', sections: [{ pattern: { type: 'stats-grid' } }] },
  { name: 'Settings', path: '/settings', viewType: 'edit', sections: [{ pattern: { type: 'form-section' } }] },
];

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    pages: threePages,
    currentPage: 'PatientList',
    onPageChange: fn(),
  },
};

export const SinglePage: Story = {
  args: {
    pages: singlePage,
    currentPage: 'HomePage',
    onPageChange: fn(),
  },
};

export const ActivePage: Story = {
  args: {
    pages: threePages,
    currentPage: 'PatientDetail',
    onPageChange: fn(),
  },
};

export const Collapsed: Story = {
  args: {
    pages: threePages,
    currentPage: 'PatientList',
    onPageChange: fn(),
    collapsed: true,
  },
  decorators: [
    (Story) => (
      <div style={{ height: '500px', width: '60px' }}>
        <Story />
      </div>
    ),
  ],
};

export const ManyPages: Story = {
  args: {
    pages: manyPages,
    currentPage: 'Dashboard',
    onPageChange: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ height: '500px', width: '260px' }}>
        <Story />
      </div>
    ),
  ],
};
