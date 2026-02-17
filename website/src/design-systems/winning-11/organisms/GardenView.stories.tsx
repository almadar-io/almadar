import type { Meta, StoryObj } from "@storybook/react";
import { GardenView, type GardenItem } from "./GardenView";

// Mock data matching RelationshipHealth entity structure
const mockItems: GardenItem[] = [
  {
    id: "rh-1",
    connectionId: "conn-1",
    name: "Green Valley Farm",
    category: "professional",
    healthStatus: "thriving",
    visualMetaphor: "flowering",
    leafColor: "vibrant-green",
    growthPoints: 95,
    lastWateredAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // Yesterday
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
    ).toISOString(), // 2 weeks ago
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
    lastWateredAt: new Date().toISOString(), // Today
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
    lastWateredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
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
    ).toISOString(), // 30 days ago
    missedOutreachCount: 4,
    wateringCount: 2,
    outreachCycleDays: 7,
  },
  {
    id: "rh-6",
    connectionId: "conn-6",
    name: "Prairie Fields",
    category: "mentee",
    healthStatus: "thriving",
    visualMetaphor: "tree",
    leafColor: "vibrant-green",
    growthPoints: 88,
    lastWateredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    wateringCount: 22,
    outreachCycleDays: 14,
  },
];

const meta: Meta<typeof GardenView> = {
  title: "Clients/Winning-11/Organisms/GardenView",
  component: GardenView,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    layout: {
      control: "select",
      options: ["grid", "organic", "rows"],
    },
    weatherCondition: {
      control: "select",
      options: ["sunny", "cloudy", "rainy", "stormy"],
    },
    season: {
      control: "select",
      options: ["planting", "growing", "harvest", "rest"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: mockItems,
    entity: "RelationshipHealth",
  },
};

export const GridLayout: Story = {
  args: {
    items: mockItems,
    layout: "grid",
    entity: "RelationshipHealth",
  },
};

export const OrganicLayout: Story = {
  args: {
    items: mockItems,
    layout: "organic",
    entity: "RelationshipHealth",
  },
};

export const RowsLayout: Story = {
  args: {
    items: mockItems,
    layout: "rows",
    entity: "RelationshipHealth",
  },
};

export const WithWeatherAndSeason: Story = {
  args: {
    items: mockItems,
    showWeather: true,
    weatherCondition: "sunny",
    weatherForecast: "Great conditions for building new partnerships",
    weatherTrend: "up",
    showSeason: true,
    season: "growing",
    seasonProgress: 65,
  },
};

export const ChallengingConditions: Story = {
  args: {
    items: mockItems,
    weatherCondition: "rainy",
    weatherForecast: "Focus on nurturing existing relationships",
    weatherTrend: "down",
    season: "harvest",
    seasonProgress: 80,
  },
};

export const WithActions: Story = {
  args: {
    items: mockItems,
    itemActions: [
      { label: "View", event: "VIEW" },
      { label: "Tend", event: "EDIT", variant: "ghost" },
    ],
  },
};

export const Empty: Story = {
  args: {
    items: [],
    emptyTitle: "Your garden awaits",
    emptyDescription:
      "Start by adding your first connection to grow a relationship",
    showCreateAction: true,
  },
};

export const Loading: Story = {
  args: {
    items: [],
    isLoading: true,
  },
};

export const ErrorState: Story = {
  args: {
    items: [],
    error: new Error("Failed to load relationships"),
  },
};

export const FewItems: Story = {
  args: {
    items: mockItems.slice(0, 2),
    weatherCondition: "cloudy",
    season: "planting",
    seasonProgress: 25,
  },
};

export const NoHeaderWidgets: Story = {
  args: {
    items: mockItems,
    showWeather: false,
    showSeason: false,
  },
};

export const UsingDataProp: Story = {
  args: {
    data: mockItems,
    entity: "RelationshipHealth",
  },
};
