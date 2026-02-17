import type { Meta, StoryObj } from "@storybook/react";
import { FileTreePanel } from "./FileTreePanel";
import type { FileNode } from "./FileTreePanel";

const meta: Meta<typeof FileTreePanel> = {
  title: "Builder/Organisms/FileTreePanel",
  component: FileTreePanel,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          height: "500px",
          width: "280px",
          backgroundColor: "var(--color-card)",
          borderRight: "1px solid var(--color-border)",
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    onSelectFile: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof FileTreePanel>;

// =============================================================================
// Mock Data
// =============================================================================

const projectFiles: FileNode[] = [
  {
    name: "projects",
    path: "/projects",
    type: "directory",
    children: [
      {
        name: "task-manager",
        path: "/projects/task-manager",
        type: "directory",
        children: [
          {
            name: "task-manager.orb",
            path: "/projects/task-manager/task-manager.orb",
            type: "file",
            badge: "schema",
          },
          {
            name: "design-system",
            path: "/projects/task-manager/design-system",
            type: "directory",
            children: [
              {
                name: "atoms",
                path: "/projects/task-manager/design-system/atoms",
                type: "directory",
                children: [
                  { name: "Button.tsx", path: "/projects/task-manager/design-system/atoms/Button.tsx", type: "file" },
                  { name: "Input.tsx", path: "/projects/task-manager/design-system/atoms/Input.tsx", type: "file" },
                ],
              },
              {
                name: "organisms",
                path: "/projects/task-manager/design-system/organisms",
                type: "directory",
                children: [
                  { name: "TaskBoard.tsx", path: "/projects/task-manager/design-system/organisms/TaskBoard.tsx", type: "file" },
                  { name: "TaskBoard.stories.tsx", path: "/projects/task-manager/design-system/organisms/TaskBoard.stories.tsx", type: "file" },
                ],
              },
            ],
          },
          {
            name: "app",
            path: "/projects/task-manager/app",
            type: "directory",
            children: [
              { name: "App.tsx", path: "/projects/task-manager/app/App.tsx", type: "file", badge: "generated" },
              { name: "TasksPage.tsx", path: "/projects/task-manager/app/TasksPage.tsx", type: "file", badge: "generated" },
              { name: "routes.ts", path: "/projects/task-manager/app/routes.ts", type: "file", badge: "generated" },
            ],
          },
          { name: "package.json", path: "/projects/task-manager/package.json", type: "file", badge: "config" },
          { name: "tsconfig.json", path: "/projects/task-manager/tsconfig.json", type: "file", badge: "config" },
          { name: "patterns.json", path: "/projects/task-manager/patterns.json", type: "file", badge: "extension" },
        ],
      },
    ],
  },
  {
    name: "packages",
    path: "/packages",
    type: "directory",
    children: [
      {
        name: "almadar-ui",
        path: "/packages/almadar-ui",
        type: "directory",
        children: [
          { name: "index.ts", path: "/packages/almadar-ui/index.ts", type: "file" },
          { name: "package.json", path: "/packages/almadar-ui/package.json", type: "file", badge: "config" },
        ],
      },
      {
        name: "almadar-core",
        path: "/packages/almadar-core",
        type: "directory",
        children: [
          { name: "index.ts", path: "/packages/almadar-core/index.ts", type: "file" },
        ],
      },
    ],
  },
  { name: "CLAUDE.md", path: "/CLAUDE.md", type: "file" },
  { name: "pnpm-workspace.yaml", path: "/pnpm-workspace.yaml", type: "file", badge: "config" },
];

const emptyFiles: FileNode[] = [];

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    files: projectFiles,
    selectedPath: null,
    defaultExpanded: ["/projects", "/projects/task-manager"],
  },
};

export const WithSelection: Story = {
  args: {
    files: projectFiles,
    selectedPath: "/projects/task-manager/task-manager.orb",
    defaultExpanded: ["/projects", "/projects/task-manager"],
  },
};

export const WithBadges: Story = {
  args: {
    files: projectFiles,
    selectedPath: null,
    showBadges: true,
    defaultExpanded: [
      "/projects",
      "/projects/task-manager",
      "/projects/task-manager/app",
    ],
  },
};

export const Empty: Story = {
  args: {
    files: emptyFiles,
    selectedPath: null,
  },
};
