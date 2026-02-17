import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { CodeEditorPanel } from "./CodeEditorPanel";

const meta: Meta<typeof CodeEditorPanel> = {
  title: "Builder/Organisms/CodeEditorPanel",
  component: CodeEditorPanel,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ height: "100vh", width: "100%" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    onChange: fn(),
    onMount: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof CodeEditorPanel>;

// =============================================================================
// Mock Content
// =============================================================================

const jsonContent = JSON.stringify(
  {
    name: "TaskManager",
    version: "1.0.0",
    orbitals: [
      {
        name: "TaskManagement",
        entity: {
          name: "Task",
          collection: "tasks",
          fields: [
            { name: "title", type: "string", required: true },
            { name: "status", type: "enum", values: ["pending", "active", "done"] },
          ],
        },
      },
    ],
  },
  null,
  2,
);

const typescriptContent = `import React from 'react';
import { useEventBus } from '@almadar/ui';

interface TaskListProps {
  entity: string;
  isLoading?: boolean;
  error?: Error | null;
  className?: string;
}

export const TaskList: React.FC<TaskListProps> = ({
  entity,
  isLoading = false,
  error = null,
  className = '',
}) => {
  const { emit } = useEventBus();

  const handleCreate = () => {
    emit('UI:CREATE', { entity });
  };

  if (isLoading) return <LoadingState message="Loading tasks..." />;
  if (error) return <ErrorState error={error} />;

  return (
    <div className={className}>
      <button onClick={handleCreate}>New Task</button>
    </div>
  );
};

TaskList.displayName = 'TaskList';
`;

const cssContent = `:root {
  --color-primary: #6366f1;
  --color-primary-foreground: #ffffff;
  --color-background: #0a0a0f;
  --color-foreground: #e6edf3;
  --color-card: #161b22;
  --color-border: #30363d;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.orbital-card {
  background-color: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1rem;
  transition: border-color 0.2s ease;
}

.orbital-card:hover {
  border-color: var(--color-primary);
  box-shadow: 0 0 12px rgba(99, 102, 241, 0.15);
}
`;

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    path: "schema.json",
    content: jsonContent,
  },
};

export const TypeScript: Story = {
  args: {
    path: "components/TaskList.tsx",
    content: typescriptContent,
    language: "typescript",
  },
};

export const ReadOnly: Story = {
  args: {
    path: "schema.json",
    content: jsonContent,
    readOnly: true,
  },
};

export const SmallFont: Story = {
  args: {
    path: "components/TaskList.tsx",
    content: typescriptContent,
    fontSize: 10,
  },
};

export const WithMinimap: Story = {
  args: {
    path: "styles/theme.css",
    content: cssContent,
    showMinimap: true,
  },
};
