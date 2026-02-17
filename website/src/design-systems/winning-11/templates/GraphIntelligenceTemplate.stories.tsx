import type { Meta, StoryObj } from "@storybook/react";
import {
  GraphIntelligenceTemplate,
  type ClusterData,
  type NetworkStats,
} from "./GraphIntelligenceTemplate";

const mockClusters: ClusterData[] = [
  {
    id: "cluster-1",
    name: "Tech Leaders",
    memberCount: 24,
    averageTrustScore: 82,
    cohesionScore: 78,
    type: "professional",
    topConnectors: ["Alex Thompson", "Sarah Chen", "David Kim"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
  {
    id: "cluster-2",
    name: "Finance Network",
    memberCount: 18,
    averageTrustScore: 75,
    cohesionScore: 85,
    type: "professional",
    topConnectors: ["Robert Chang", "Emily Watson"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(),
  },
  {
    id: "cluster-3",
    name: "Design Community",
    memberCount: 32,
    averageTrustScore: 88,
    cohesionScore: 92,
    type: "community",
    topConnectors: ["Amanda Foster", "Lisa Park", "Mike Rodriguez"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
  },
  {
    id: "cluster-4",
    name: "Startup Founders",
    memberCount: 15,
    averageTrustScore: 79,
    cohesionScore: 71,
    type: "mixed",
    topConnectors: ["Jennifer Martinez", "Kevin Brooks"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
  },
  {
    id: "cluster-5",
    name: "Mentorship Circle",
    memberCount: 12,
    averageTrustScore: 91,
    cohesionScore: 88,
    type: "personal",
    topConnectors: ["Thomas Wright"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(),
  },
  {
    id: "cluster-6",
    name: "Project Alpha Team",
    memberCount: 8,
    averageTrustScore: 84,
    cohesionScore: 95,
    type: "professional",
    topConnectors: ["Michelle Lee", "John Doe"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
  },
];

const mockStats: NetworkStats = {
  totalNodes: 150,
  totalEdges: 892,
  averageDegree: 11.9,
  clusteringCoefficient: 0.42,
  networkDensity: 0.08,
  averagePathLength: 2.3,
};

const meta: Meta<typeof GraphIntelligenceTemplate> = {
  title: "Clients/Winning-11/Templates/GraphIntelligenceTemplate",
  component: GraphIntelligenceTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entity: {
      clusters: mockClusters,
      stats: mockStats,
    },
  },
};

export const HighDensityNetwork: Story = {
  args: {
    entity: {
      clusters: mockClusters,
      stats: {
        ...mockStats,
        networkDensity: 0.25,
        clusteringCoefficient: 0.68,
        averageDegree: 18.5,
      },
    },
  },
};

export const SparseNetwork: Story = {
  args: {
    entity: {
      clusters: mockClusters.slice(0, 2),
      stats: {
        ...mockStats,
        totalNodes: 50,
        totalEdges: 120,
        networkDensity: 0.04,
        clusteringCoefficient: 0.22,
        averageDegree: 4.8,
      },
    },
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const ErrorState: Story = {
  args: {
    error: new Error("Failed to analyze network graph"),
  },
};

export const NoClusters: Story = {
  args: {
    entity: {
      clusters: [],
      stats: mockStats,
    },
  },
};

export const NoStats: Story = {
  args: {
    entity: {
      clusters: mockClusters,
    },
  },
};

export const SingleCluster: Story = {
  args: {
    entity: {
      clusters: [mockClusters[0]],
      stats: {
        ...mockStats,
        totalNodes: 24,
        totalEdges: 156,
      },
    },
  },
};

export const CustomTitle: Story = {
  args: {
    entity: {
      clusters: mockClusters,
      stats: mockStats,
    },
    title: "Network Analysis",
  },
};
