import type { Meta, StoryObj } from "@storybook/react";
import { DiffBlock } from "./DiffBlock";

const meta: Meta<typeof DiffBlock> = {
  title: "Builder/Molecules/DiffBlock",
  component: DiffBlock,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DiffBlock>;

export const Default: Story = {
  args: {
    filePath: "schema.orb",
    hunks: [
      {
        oldStart: 1,
        oldLines: 4,
        newStart: 1,
        newLines: 4,
        lines: [
          { type: "context", content: "{" },
          { type: "remove", content: '  "name": "OldName",' },
          { type: "add", content: '  "name": "NewName",' },
          { type: "context", content: '  "version": "1.0.0"' },
          { type: "context", content: "}" },
        ],
      },
    ],
  },
};

export const AdditionsOnly: Story = {
  args: {
    filePath: "traits/TaskManagement.ts",
    hunks: [
      {
        oldStart: 1,
        oldLines: 2,
        newStart: 1,
        newLines: 8,
        lines: [
          { type: "context", content: "export const TaskManagement = {" },
          { type: "add", content: '  name: "TaskManagement",' },
          { type: "add", content: "  states: [" },
          { type: "add", content: '    { name: "idle" },' },
          { type: "add", content: '    { name: "creating" },' },
          { type: "add", content: '    { name: "editing" },' },
          { type: "add", content: "  ]," },
          { type: "context", content: "};" },
        ],
      },
    ],
  },
};

export const RemovalsOnly: Story = {
  args: {
    filePath: "deprecated/oldTrait.ts",
    hunks: [
      {
        oldStart: 1,
        oldLines: 4,
        newStart: 1,
        newLines: 0,
        lines: [
          { type: "remove", content: "// This trait is deprecated" },
          { type: "remove", content: "export const OldTrait = {" },
          { type: "remove", content: '  name: "OldTrait",' },
          { type: "remove", content: "};" },
        ],
      },
    ],
  },
};

export const WithLineNumbers: Story = {
  args: {
    filePath: "components/TaskCard.tsx",
    showLineNumbers: true,
    hunks: [
      {
        oldStart: 1,
        oldLines: 10,
        newStart: 1,
        newLines: 12,
        lines: [
          { type: "context", content: "import React from 'react';" },
          { type: "add", content: "import { Card } from '@/components';" },
          { type: "context", content: "" },
          { type: "remove", content: "export function TaskCard({ task }) {" },
          {
            type: "add",
            content: "export function TaskCard({ task, onEdit }) {",
          },
          { type: "context", content: "  return (" },
          { type: "remove", content: "    <div className='task-card'>" },
          { type: "add", content: "    <Card onClick={onEdit}>" },
          { type: "context", content: "      {task.title}" },
          { type: "remove", content: "    </div>" },
          { type: "add", content: "    </Card>" },
          { type: "context", content: "  );" },
          { type: "context", content: "}" },
        ],
      },
    ],
  },
};

export const LimitedHeight: Story = {
  args: {
    filePath: "large-file.ts",
    maxHeight: 150,
    hunks: [
      {
        oldStart: 1,
        oldLines: 10,
        newStart: 1,
        newLines: 12,
        lines: [
          { type: "context", content: "// Line 1" },
          { type: "context", content: "// Line 2" },
          { type: "add", content: "// New line 3" },
          { type: "context", content: "// Line 4" },
          { type: "context", content: "// Line 5" },
          { type: "remove", content: "// Old line 6" },
          { type: "add", content: "// New line 6" },
          { type: "context", content: "// Line 7" },
          { type: "context", content: "// Line 8" },
        ],
      },
    ],
  },
};

export const MultipleDiffs: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <DiffBlock
        filePath="schema.orb"
        hunks={[
          {
            oldStart: 1,
            oldLines: 3,
            newStart: 1,
            newLines: 3,
            lines: [
              { type: "context", content: '  "name": "TaskManager",' },
              { type: "remove", content: '  "version": "1.0.0",' },
              { type: "add", content: '  "version": "1.1.0",' },
            ],
          },
        ]}
      />
      <DiffBlock
        filePath="orbitals/TaskOrbital.ts"
        hunks={[
          {
            oldStart: 1,
            oldLines: 0,
            newStart: 1,
            newLines: 4,
            lines: [
              { type: "add", content: "// New orbital added" },
              { type: "add", content: "export const TaskOrbital = {" },
              { type: "add", content: '  name: "Task",' },
              { type: "add", content: "};" },
            ],
          },
        ]}
      />
      <DiffBlock
        filePath="pages/index.ts"
        hunks={[
          {
            oldStart: 1,
            oldLines: 1,
            newStart: 1,
            newLines: 2,
            lines: [
              { type: "context", content: "export * from './Dashboard';" },
              { type: "add", content: "export * from './TaskList';" },
            ],
          },
        ]}
      />
    </div>
  ),
};

export const EmptyDiff: Story = {
  args: {
    filePath: "empty.ts",
    hunks: [],
  },
};
