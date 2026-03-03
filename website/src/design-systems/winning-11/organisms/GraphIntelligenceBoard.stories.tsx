import type { Meta, StoryObj } from "@storybook/react";
import {
  GraphIntelligenceBoard,
  type GraphIntelligenceEntity,
  type ClusterData,
  type NetworkStats,
} from "./GraphIntelligenceBoard";

// Mock data matching the GraphIntelligenceEntity interface
const mockClusters: ClusterData[] = [
  {
    id: "cluster-1",
    name: "Tech Innovators",
    memberCount: 45,
    averageTrustScore: 82,
    cohesionScore: 76,
    type: "professional",
    topConnectors: ["Sarah Chen", "James Rivera", "Tom Nakamura"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
  },
  {
    id: "cluster-2",
    name: "Community Builders",
    memberCount: 32,
    averageTrustScore: 91,
    cohesionScore: 88,
    type: "community",
    topConnectors: ["Aisha Patel", "Maria Gonzalez"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(),
  },
  {
    id: "cluster-3",
    name: "Creative Circle",
    memberCount: 18,
    averageTrustScore: 74,
    cohesionScore: 65,
    type: "personal",
    topConnectors: ["Lena Ostrowski", "David Kim", "Priya Singh"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
  {
    id: "cluster-4",
    name: "Cross-functional Hub",
    memberCount: 67,
    averageTrustScore: 68,
    cohesionScore: 52,
    type: "mixed",
    topConnectors: ["James Rivera"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(),
  },
];

const mockStats: NetworkStats = {
  totalNodes: 1248,
  totalEdges: 3567,
  averageDegree: 5.7,
  clusteringCoefficient: 0.42,
  networkDensity: 0.0046,
  averagePathLength: 3.21,
};

const mockEntity: GraphIntelligenceEntity = {
  clusters: mockClusters,
  stats: mockStats,
};

const meta: Meta<typeof GraphIntelligenceBoard> = {
  title: "Clients/Winning-11/Organisms/GraphIntelligenceBoard",
  component: GraphIntelligenceBoard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    refreshEvent: "REFRESH_GRAPH",
    viewClusterEvent: "VIEW_CLUSTER",
    viewNodeEvent: "VIEW_NODE",
    analyzeEvent: "RUN_ANALYSIS",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entity: mockEntity,
  },
};

export const Loading: Story = {
  args: {
    entity: undefined,
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    entity: {
      clusters: [],
      stats: mockStats,
    },
  },
};

export const ErrorState: Story = {
  args: {
    entity: undefined,
    error: new Error("Failed to analyze network graph"),
  },
};

export const NoClusters: Story = {
  args: {
    entity: {
      clusters: [],
      stats: undefined,
    },
  },
};

export const CustomTitle: Story = {
  args: {
    entity: mockEntity,
    title: "Network Analysis Dashboard",
  },
};
