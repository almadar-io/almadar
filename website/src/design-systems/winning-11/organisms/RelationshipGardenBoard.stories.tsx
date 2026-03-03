import type { Meta, StoryObj } from "@storybook/react";
import { RelationshipGardenBoard } from "./RelationshipGardenBoard";
import type { GardenItem } from "./GardenView";

const mockGardenItems: GardenItem[] = [
  {
    id: "rh-1",
    connectionId: "conn-1",
    name: "Green Valley Farm",
    category: "professional",
    healthStatus: "thriving",
    visualMetaphor: "flowering",
    leafColor: "vibrant-green",
    growthPoints: 95,
    lastWateredAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    wateringCount: 25,
    outreachCycleDays: 7,
  },
  {
    id: "rh-2",
    connectionId: "conn-2",
    name: "Sunrise Orchards",
    category: "professional",
    healthStatus: "declining",
    visualMetaphor: "sapling",
    leafColor: "yellow",
    growthPoints: 45,
    lastWateredAt: new Date(
      Date.now() - 1000 * 60 * 60 * 24 * 14,
    ).toISOString(),
    missedOutreachCount: 2,
    wateringCount: 8,
    outreachCycleDays: 7,
  },
  {
    id: "rh-3",
    connectionId: "conn-3",
    name: "Heritage Grains Co.",
    category: "mentor",
    healthStatus: "healthy",
    visualMetaphor: "sprout",
    leafColor: "green",
    growthPoints: 30,
    lastWateredAt: new Date().toISOString(),
    wateringCount: 5,
    outreachCycleDays: 14,
  },
  {
    id: "rh-4",
    connectionId: "conn-4",
    name: "Mountain Dairy",
    category: "professional",
    healthStatus: "healthy",
    visualMetaphor: "tree",
    leafColor: "green",
    growthPoints: 70,
    lastWateredAt: new Date(
      Date.now() - 1000 * 60 * 60 * 24 * 3,
    ).toISOString(),
    wateringCount: 18,
    outreachCycleDays: 7,
  },
  {
    id: "rh-5",
    connectionId: "conn-5",
    name: "Coastal Fisheries",
    category: "community",
    healthStatus: "withering",
    visualMetaphor: "seedling",
    leafColor: "brown",
    growthPoints: 15,
    lastWateredAt: new Date(
      Date.now() - 1000 * 60 * 60 * 24 * 30,
    ).toISOString(),
    missedOutreachCount: 4,
    wateringCount: 2,
    outreachCycleDays: 7,
  },
];

const meta: Meta<typeof RelationshipGardenBoard> = {
  title: "Clients/Winning-11/Organisms/RelationshipGardenBoard",
  component: RelationshipGardenBoard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {},
  argTypes: {
    season: {
      control: "select",
      options: ["planting", "growing", "harvest", "dormant"],
    },
    weatherCondition: {
      control: "select",
      options: ["sunny", "cloudy", "rainy", "stormy"],
    },
  },
};
export default meta;
type Story = StoryObj<typeof RelationshipGardenBoard>;

export const Default: Story = {
  args: {
    entity: mockGardenItems,
    season: "growing",
    seasonProgress: 65,
    weatherCondition: "sunny",
    weatherForecast: "Clear skies ahead - great time to nurture relationships",
  },
};

export const Loading: Story = {
  args: {
    entity: [],
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    entity: [],
  },
};

export const ErrorState: Story = {
  args: {
    entity: [],
    error: new Error("Failed to load garden data"),
  },
};

export const RainySeason: Story = {
  args: {
    entity: mockGardenItems,
    season: "harvest",
    seasonProgress: 80,
    weatherCondition: "rainy",
    weatherForecast: "Rain expected - some relationships may need extra attention",
  },
};

export const DormantWithCustomTitle: Story = {
  args: {
    entity: mockGardenItems.slice(0, 2),
    season: "rest",
    seasonProgress: 20,
    weatherCondition: "cloudy",
    title: "My Relationship Garden",
    subtitle: "Winter season - time for reflection and planning",
  },
};
