import type { Meta, StoryObj } from "@storybook/react";
import { StatsBoard } from "./StatsBoard";
import type { AppStats } from "./StatsBoard";

const meta: Meta<typeof StatsBoard> = {
  title: "Builder/Organisms/StatsBoard",
  component: StatsBoard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ padding: "2rem", backgroundColor: "var(--color-background)", minHeight: "100vh" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StatsBoard>;

// =============================================================================
// Mock Data
// =============================================================================

const now = Date.now();
const hourAgo = now - 3_600_000;
const dayAgo = now - 86_400_000;
const weekAgo = now - 7 * 86_400_000;
const monthAgo = now - 30 * 86_400_000;

const typicalApps: AppStats[] = [
  {
    id: "app-1",
    name: "TaskManager",
    updatedAt: hourAgo,
    hasValidationErrors: false,
    stats: { states: 5, events: 8, pages: 3, entities: 2, transitions: 12 },
    domain: { category: "productivity" },
  },
  {
    id: "app-2",
    name: "E-Commerce",
    updatedAt: dayAgo,
    hasValidationErrors: true,
    stats: { states: 12, events: 20, pages: 6, entities: 5, transitions: 30 },
    domain: { category: "commerce" },
  },
  {
    id: "app-3",
    name: "CRM Dashboard",
    updatedAt: hourAgo,
    hasValidationErrors: false,
    stats: { states: 8, events: 15, pages: 4, entities: 3, transitions: 18 },
    domain: { category: "business" },
  },
  {
    id: "app-4",
    name: "Blog Engine",
    updatedAt: weekAgo,
    hasValidationErrors: false,
    stats: { states: 4, events: 6, pages: 2, entities: 2, transitions: 8 },
    domain: { category: "content" },
  },
  {
    id: "app-5",
    name: "Chat App",
    updatedAt: dayAgo,
    hasValidationErrors: true,
    stats: { states: 6, events: 10, pages: 3, entities: 3, transitions: 14 },
    domain: { category: "productivity" },
  },
];

const highNumberApps: AppStats[] = Array.from({ length: 50 }, (_, i) => ({
  id: `app-${i}`,
  name: `Application ${i + 1}`,
  updatedAt: now - i * 3_600_000,
  hasValidationErrors: i % 7 === 0,
  stats: {
    states: 10 + i * 2,
    events: 15 + i * 3,
    pages: 3 + Math.floor(i / 5),
    entities: 2 + Math.floor(i / 3),
    transitions: 20 + i * 4,
  },
  domain: { category: ["productivity", "commerce", "business", "content", "social"][i % 5] },
}));

// =============================================================================
// Stories
// =============================================================================

/** Default dashboard with typical app stats */
export const Default: Story = {
  args: {
    apps: typicalApps,
  },
};

/** Zero state - no apps created yet */
export const ZeroStats: Story = {
  args: {
    apps: [],
  },
};

/** High numbers with many apps */
export const HighNumbers: Story = {
  args: {
    apps: highNumberApps,
  },
};

/** Loading state */
export const Loading: Story = {
  args: {
    apps: [],
    isLoading: true,
  },
};

/** Single app with validation errors */
export const SingleApp: Story = {
  args: {
    apps: [
      {
        id: "app-solo",
        name: "Solo Project",
        updatedAt: now,
        hasValidationErrors: true,
        stats: { states: 3, events: 5, pages: 1, entities: 1, transitions: 6 },
        domain: { category: "prototype" },
      },
    ],
  },
};
