import type { Meta, StoryObj } from "@storybook/react";
import { OrbitalHistoryBoard } from "./OrbitalHistoryBoard";
import type { HistoryTimelineItem } from "./OrbitalHistoryBoard";

const meta: Meta<typeof OrbitalHistoryBoard> = {
  title: "Builder/Organisms/OrbitalHistoryBoard",
  component: OrbitalHistoryBoard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ height: "700px", width: "420px" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    onRevertToSnapshot: fn(async () => ({ success: true })),
    onRefresh: fn(async () => {}),
  },
};

export default meta;
type Story = StoryObj<typeof OrbitalHistoryBoard>;

// =============================================================================
// Mock Data
// =============================================================================

const now = Date.now();

const defaultTimeline: HistoryTimelineItem[] = [
  {
    id: "cs-3",
    type: "changeset",
    version: 5,
    timestamp: now - 300_000, // 5 minutes ago
    description: "Added TaskInteraction trait with CRUD state machine",
    source: "claude-agent",
    summary: { added: 3, modified: 1, removed: 0 },
  },
  {
    id: "snap-2",
    type: "snapshot",
    version: 4,
    timestamp: now - 900_000, // 15 minutes ago
    description: "Pre-refactor snapshot",
    reason: "Before major trait restructuring",
  },
  {
    id: "cs-2",
    type: "changeset",
    version: 3,
    timestamp: now - 1_800_000, // 30 minutes ago
    description: "Updated entity fields for Task: added priority and dueDate",
    source: "user-edit",
    summary: { added: 2, modified: 0, removed: 0 },
  },
  {
    id: "cs-1",
    type: "changeset",
    version: 2,
    timestamp: now - 3_600_000, // 1 hour ago
    description: "Initial schema structure with Task entity",
    source: "claude-agent",
    summary: { added: 5, modified: 0, removed: 0 },
  },
  {
    id: "snap-1",
    type: "snapshot",
    version: 1,
    timestamp: now - 7_200_000, // 2 hours ago
    description: "Initial project creation",
    reason: "Project scaffold",
  },
];

const singleChangeTimeline: HistoryTimelineItem[] = [
  {
    id: "cs-1",
    type: "changeset",
    version: 1,
    timestamp: now - 60_000,
    description: "Initial schema with NoteManagement orbital",
    source: "user-edit",
    summary: { added: 1, modified: 0, removed: 0 },
  },
];

const mixedAuthorsTimeline: HistoryTimelineItem[] = [
  {
    id: "cs-5",
    type: "changeset",
    version: 7,
    timestamp: now - 120_000,
    description: "Fixed form-section submitEvent binding",
    source: "claude-agent",
    summary: { added: 0, modified: 2, removed: 0 },
  },
  {
    id: "cs-4",
    type: "changeset",
    version: 6,
    timestamp: now - 600_000,
    description: "Added UserManagement orbital with auth states",
    source: "user-edit",
    summary: { added: 4, modified: 0, removed: 0 },
  },
  {
    id: "snap-3",
    type: "snapshot",
    version: 5,
    timestamp: now - 1_200_000,
    description: "Stable CRUD baseline",
    reason: "All smoke tests passing",
  },
  {
    id: "cs-3",
    type: "changeset",
    version: 4,
    timestamp: now - 2_400_000,
    description: "Removed deprecated FilterInteraction trait",
    source: "claude-agent",
    summary: { added: 0, modified: 1, removed: 2 },
  },
  {
    id: "cs-2",
    type: "changeset",
    version: 3,
    timestamp: now - 3_600_000,
    description: "Added entity-table columns and itemActions",
    source: "user-edit",
    summary: { added: 2, modified: 1, removed: 0 },
  },
  {
    id: "cs-1",
    type: "changeset",
    version: 2,
    timestamp: now - 86_400_000,
    description: "Initial project scaffold",
    source: "claude-agent",
    summary: { added: 8, modified: 0, removed: 0 },
  },
  {
    id: "snap-1",
    type: "snapshot",
    version: 1,
    timestamp: now - 86_400_000,
    description: "Project creation snapshot",
    reason: "Auto-snapshot on project create",
  },
];

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    timeline: defaultTimeline,
    currentVersion: 5,
    isLoading: false,
    error: null,
  },
};

export const SingleChange: Story = {
  args: {
    timeline: singleChangeTimeline,
    currentVersion: 1,
    isLoading: false,
    error: null,
  },
};

export const MixedAuthors: Story = {
  args: {
    timeline: mixedAuthorsTimeline,
    currentVersion: 7,
    isLoading: false,
    error: null,
  },
};

export const Empty: Story = {
  args: {
    timeline: [],
    currentVersion: 0,
    isLoading: false,
    error: null,
  },
};

export const Loading: Story = {
  args: {
    timeline: [],
    currentVersion: 0,
    isLoading: true,
    error: null,
  },
};

export const WithError: Story = {
  args: {
    timeline: defaultTimeline,
    currentVersion: 5,
    isLoading: false,
    error: "Failed to load history: network timeout",
  },
};
