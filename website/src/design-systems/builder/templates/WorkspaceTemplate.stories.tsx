import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { WorkspaceTemplate } from "./WorkspaceTemplate";
import type { WorkspaceEntity } from "./WorkspaceTemplate";

const meta: Meta<typeof WorkspaceTemplate> = {
  title: "Builder/Templates/WorkspaceTemplate",
  component: WorkspaceTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof WorkspaceTemplate>;

const mockFiles = [
  {
    name: "src",
    path: "/src",
    type: "directory" as const,
    children: [
      {
        name: "components",
        path: "/src/components",
        type: "directory" as const,
        children: [
          { name: "TaskList.tsx", path: "/src/components/TaskList.tsx", type: "file" as const },
          { name: "TaskForm.tsx", path: "/src/components/TaskForm.tsx", type: "file" as const },
          { name: "TaskDetail.tsx", path: "/src/components/TaskDetail.tsx", type: "file" as const },
        ],
      },
      {
        name: "features",
        path: "/src/features",
        type: "directory" as const,
        children: [
          { name: "TaskInteraction.ts", path: "/src/features/TaskInteraction.ts", type: "file" as const },
        ],
      },
      { name: "App.tsx", path: "/src/App.tsx", type: "file" as const },
      { name: "main.tsx", path: "/src/main.tsx", type: "file" as const },
    ],
  },
  { name: "package.json", path: "/package.json", type: "file" as const },
  { name: "tsconfig.json", path: "/tsconfig.json", type: "file" as const },
];

const baseEntity: WorkspaceEntity = {
  appName: "TaskManager",
  appId: "app_123",
  containerStatus: "ready",
  isContainerLoading: false,
  isCompiling: false,
  containerError: null,
  files: mockFiles,
  selectedPath: null,
  selectedFile: null,
  previewUrl: null,
  isSaving: false,
  toast: null,
  isLoading: false,
  loadError: null,
  showLoader: false,
};

const MockSidebar = () => (
  <div
    style={{
      width: 240,
      height: "100%",
      background: "var(--color-card)",
      borderRight: "1px solid var(--color-border)",
      padding: 16,
    }}
  >
    <p style={{ fontSize: 14, color: "var(--color-muted-foreground)" }}>
      App Sidebar
    </p>
  </div>
);

export const Default: Story = {
  args: {
    entity: baseEntity,
    sidebarSlot: <MockSidebar />,
  },
};

export const WithSelectedFile: Story = {
  args: {
    entity: {
      ...baseEntity,
      selectedPath: "/src/components/TaskList.tsx",
      selectedFile: {
        path: "/src/components/TaskList.tsx",
        content: `import React from 'react';
import { useEventBus } from '@almadar/ui';

interface TaskListProps {
  entity: string;
  items: Array<{ id: string; title: string; status: string }>;
}

export const TaskList: React.FC<TaskListProps> = ({ entity, items }) => {
  const { emit } = useEventBus();

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="p-3 border rounded-lg">
          <span>{item.title}</span>
          <button onClick={() => emit('UI:VIEW', { id: item.id })}>
            View
          </button>
        </div>
      ))}
    </div>
  );
};`,
        language: "typescript",
        isDirty: false,
      },
      previewUrl: "about:blank",
    },
    sidebarSlot: <MockSidebar />,
  },
};

export const WithAllSlots: Story = {
  args: {
    entity: {
      ...baseEntity,
      selectedPath: "/src/App.tsx",
      selectedFile: {
        path: "/src/App.tsx",
        content: `import { TaskList } from './components/TaskList';\n\nexport default function App() {\n  return <TaskList entity="Task" items={[]} />;\n}`,
        language: "typescript",
        isDirty: true,
      },
      previewUrl: "about:blank",
      containerStatus: "ready",
    },
    sidebarSlot: <MockSidebar />,
  },
};

export const Booting: Story = {
  args: {
    entity: {
      ...baseEntity,
      containerStatus: "booting",
      isContainerLoading: true,
      showLoader: true,
    },
    sidebarSlot: <MockSidebar />,
  },
};

export const WithError: Story = {
  args: {
    entity: {
      ...baseEntity,
      loadError: "Failed to load workspace. The application schema could not be found.",
    },
  },
};
