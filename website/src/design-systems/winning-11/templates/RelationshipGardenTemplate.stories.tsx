import type { Meta, StoryObj } from "@storybook/react";
import { RelationshipGardenTemplate } from "./RelationshipGardenTemplate";
import type { GardenItem } from "../organisms/GardenView";

// Mock data matching RelationshipHealth entity structure
const mockItems: GardenItem[] = [
  {
    id: "rh-1",
    connectionId: "conn-1",
    name: "Alex Thompson",
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
    name: "Sarah Chen",
    category: "mentor",
    healthStatus: "healthy",
    visualMetaphor: "tree",
    leafColor: "green",
    growthPoints: 78,
    lastWateredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    wateringCount: 18,
    outreachCycleDays: 14,
  },
  {
    id: "rh-3",
    connectionId: "conn-3",
    name: "Mike Rodriguez",
    category: "professional",
    healthStatus: "declining",
    visualMetaphor: "sapling",
    leafColor: "yellow",
    growthPoints: 45,
    lastWateredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
    missedOutreachCount: 2,
    wateringCount: 8,
    outreachCycleDays: 7,
  },
  {
    id: "rh-4",
    connectionId: "conn-4",
    name: "Emily Watson",
    category: "community",
    healthStatus: "withering",
    visualMetaphor: "seedling",
    leafColor: "brown",
    growthPoints: 15,
    lastWateredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    missedOutreachCount: 4,
    wateringCount: 2,
    outreachCycleDays: 7,
  },
  {
    id: "rh-5",
    connectionId: "conn-5",
    name: "David Kim",
    category: "mentee",
    healthStatus: "thriving",
    visualMetaphor: "tree",
    leafColor: "vibrant-green",
    growthPoints: 88,
    lastWateredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    wateringCount: 22,
    outreachCycleDays: 14,
  },
  {
    id: "rh-6",
    connectionId: "conn-6",
    name: "Lisa Park",
    category: "personal",
    healthStatus: "healthy",
    visualMetaphor: "sprout",
    leafColor: "green",
    growthPoints: 55,
    lastWateredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    wateringCount: 10,
    outreachCycleDays: 7,
  },
];

const meta: Meta<typeof RelationshipGardenTemplate> = {
  title: "Clients/Winning-11/Templates/RelationshipGardenTemplate",
  component: RelationshipGardenTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    season: {
      control: "select",
      options: ["planting", "growing", "harvest", "rest"],
    },
    weatherCondition: {
      control: "select",
      options: ["sunny", "cloudy", "rainy", "stormy"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entity: mockItems,
  },
};

export const WithWeatherAndSeason: Story = {
  args: {
    entity: mockItems,
    season: "growing",
    seasonProgress: 65,
    weatherCondition: "sunny",
    weatherForecast: "Great conditions for building new partnerships",
  },
};

export const HarvestSeason: Story = {
  args: {
    entity: mockItems,
    season: "harvest",
    seasonProgress: 80,
    weatherCondition: "cloudy",
    weatherForecast: "Time to reap the benefits of your connections",
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
    isLoading: false,
  },
};

export const ErrorState: Story = {
  args: {
    entity: [],
    error: new Error("Failed to load your garden"),
  },
};

export const NoHeader: Story = {
  args: {
    entity: mockItems,
    showHeader: false,
  },
};

export const NoSearchOrFilters: Story = {
  args: {
    entity: mockItems,
    showSearch: false,
    showFilters: false,
  },
};

export const CustomTitle: Story = {
  args: {
    entity: mockItems,
    title: "Trust Garden",
    subtitle: "Cultivate meaningful relationships",
  },
};
