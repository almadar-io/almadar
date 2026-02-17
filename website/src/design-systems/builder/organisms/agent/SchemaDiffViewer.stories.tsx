import type { Meta, StoryObj } from "@storybook/react";
import { SchemaDiffViewer, type SchemaDiff } from "./SchemaDiffViewer";

const meta: Meta<typeof SchemaDiffViewer> = {
  title: "Builder/Organisms/SchemaDiffViewer",
  component: SchemaDiffViewer,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SchemaDiffViewer>;

export const SingleFile: Story = {
  args: {
    diffs: [
      {
        id: "diff-1",
        filePath: "schema.orb",
        hunks: [
          {
            oldStart: 1,
            oldLines: 4,
            newStart: 1,
            newLines: 5,
            lines: [
              { type: "context", content: "{" },
              { type: "remove", content: '  "name": "OldProject",' },
              { type: "add", content: '  "name": "NewProject",' },
              { type: "context", content: '  "version": "1.0.0",' },
              { type: "add", content: '  "description": "A new description",' },
              { type: "context", content: "}" },
            ],
          },
        ],
        timestamp: Date.now(),
        addedLines: 2,
        removedLines: 1,
      },
    ],
    title: "Schema Changes",
  },
};

export const MultipleFiles: Story = {
  args: {
    diffs: [
      {
        id: "diff-1",
        filePath: "schema.orb",
        hunks: [
          {
            oldStart: 1,
            oldLines: 2,
            newStart: 1,
            newLines: 3,
            lines: [
              { type: "context", content: '  "orbitals": [' },
              { type: "add", content: '    { "name": "TaskManagement" },' },
              { type: "context", content: "  ]" },
            ],
          },
        ],
        timestamp: Date.now() - 60000,
        addedLines: 1,
        removedLines: 0,
      },
      {
        id: "diff-2",
        filePath: "traits/TaskManagement.ts",
        hunks: [
          {
            oldStart: 1,
            oldLines: 0,
            newStart: 1,
            newLines: 7,
            lines: [
              { type: "add", content: "export const TaskManagement = {" },
              { type: "add", content: '  name: "TaskManagement",' },
              { type: "add", content: "  states: [" },
              { type: "add", content: '    { name: "idle" },' },
              { type: "add", content: '    { name: "creating" },' },
              { type: "add", content: "  ]," },
              { type: "add", content: "};" },
            ],
          },
        ],
        timestamp: Date.now() - 30000,
        addedLines: 7,
        removedLines: 0,
      },
      {
        id: "diff-3",
        filePath: "pages/TaskList.tsx",
        hunks: [
          {
            oldStart: 1,
            oldLines: 0,
            newStart: 1,
            newLines: 5,
            lines: [
              {
                type: "add",
                content: "import { TaskManagement } from '../traits';",
              },
              { type: "add", content: "" },
              { type: "add", content: "export function TaskListPage() {" },
              { type: "add", content: "  return <TaskList />;" },
              { type: "add", content: "}" },
            ],
          },
        ],
        timestamp: Date.now(),
        addedLines: 5,
        removedLines: 0,
      },
    ],
    title: "Project Changes",
  },
};

export const LargeDiff: Story = {
  args: {
    diffs: [
      {
        id: "diff-1",
        filePath: "src/components/TaskCard.tsx",
        hunks: [
          {
            oldStart: 1,
            oldLines: 15,
            newStart: 1,
            newLines: 28,
            lines: [
              { type: "context", content: "import React from 'react';" },
              {
                type: "add",
                content: "import { Card, Badge, Button } from '@orbital/ui';",
              },
              { type: "remove", content: "import { Card } from './Card';" },
              { type: "context", content: "" },
              { type: "context", content: "interface TaskCardProps {" },
              { type: "remove", content: "  title: string;" },
              { type: "add", content: "  task: Task;" },
              { type: "add", content: "  onEdit?: () => void;" },
              { type: "add", content: "  onDelete?: () => void;" },
              { type: "context", content: "}" },
              { type: "context", content: "" },
              {
                type: "remove",
                content: "export function TaskCard({ title }) {",
              },
              {
                type: "add",
                content:
                  "export function TaskCard({ task, onEdit, onDelete }) {",
              },
              { type: "context", content: "  return (" },
              { type: "remove", content: "    <Card>" },
              { type: "add", content: "    <Card variant='interactive'>" },
              { type: "remove", content: "      <h3>{title}</h3>" },
              {
                type: "add",
                content: "      <div className='flex justify-between'>",
              },
              { type: "add", content: "        <h3>{task.title}</h3>" },
              { type: "add", content: "        <Badge>{task.status}</Badge>" },
              { type: "add", content: "      </div>" },
              { type: "add", content: "      <p>{task.description}</p>" },
              {
                type: "add",
                content: "      <div className='flex gap-2 mt-4'>",
              },
              {
                type: "add",
                content: "        <Button onClick={onEdit}>Edit</Button>",
              },
              {
                type: "add",
                content:
                  "        <Button variant='danger' onClick={onDelete}>Delete</Button>",
              },
              { type: "add", content: "      </div>" },
              { type: "context", content: "    </Card>" },
              { type: "context", content: "  );" },
              { type: "context", content: "}" },
            ],
          },
        ],
        timestamp: Date.now(),
        addedLines: 15,
        removedLines: 5,
      },
    ],
    title: "Component Refactoring",
  },
};

export const Empty: Story = {
  args: {
    diffs: [],
    title: "No Changes",
  },
};

export const AdditionsOnly: Story = {
  args: {
    diffs: [
      {
        id: "diff-1",
        filePath: "new-feature.ts",
        hunks: [
          {
            oldStart: 1,
            oldLines: 0,
            newStart: 1,
            newLines: 4,
            lines: [
              { type: "add", content: "// New feature implementation" },
              { type: "add", content: "export function newFeature() {" },
              { type: "add", content: "  console.log('New feature!');" },
              { type: "add", content: "}" },
            ],
          },
        ],
        timestamp: Date.now(),
        addedLines: 4,
        removedLines: 0,
      },
    ],
    title: "New Files",
  },
};

export const RemovalsOnly: Story = {
  args: {
    diffs: [
      {
        id: "diff-1",
        filePath: "deprecated.ts",
        hunks: [
          {
            oldStart: 1,
            oldLines: 4,
            newStart: 1,
            newLines: 0,
            lines: [
              { type: "remove", content: "// Deprecated code" },
              { type: "remove", content: "export function oldFunction() {" },
              { type: "remove", content: "  // This is no longer needed" },
              { type: "remove", content: "}" },
            ],
          },
        ],
        timestamp: Date.now(),
        addedLines: 0,
        removedLines: 4,
      },
    ],
    title: "Removed Files",
  },
};

export const CollapsedByDefault: Story = {
  args: {
    diffs: [
      {
        id: "diff-1",
        filePath: "schema.orb",
        hunks: [
          {
            oldStart: 1,
            oldLines: 1,
            newStart: 1,
            newLines: 2,
            lines: [
              { type: "context", content: "{" },
              { type: "add", content: '  "newField": true' },
            ],
          },
        ],
        timestamp: Date.now(),
        addedLines: 1,
        removedLines: 0,
      },
    ],
    title: "Schema Changes",
    defaultCollapsed: true,
  },
};
