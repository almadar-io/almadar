/**
 * GraphIntelligenceTemplate
 *
 * Template for the Graph Intelligence page (/graph-intelligence).
 * Displays network analysis, clusters, and relationship insights.
 *
 * Page: GraphIntelligencePage
 * Entity: Cluster
 * ViewType: dashboard
 */

import React from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { VStack, HStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Button } from "../../../components/atoms/Button";
import { Card } from "../../../components/atoms/Card";
import { Badge } from "../../../components/atoms/Badge";
import { Spinner } from "../../../components/atoms/Spinner";
import { useEventBus } from "../../../hooks/useEventBus";
import {
  Network,
  Users,
  TrendingUp,
  Zap,
  Target,
  Share2,
  BarChart3,
  RefreshCw,
  Eye,
  ChevronRight,
} from "lucide-react";

export interface ClusterData {
  id: string;
  name: string;
  memberCount: number;
  averageTrustScore: number;
  cohesionScore: number;
  type: "professional" | "personal" | "community" | "mixed";
  topConnectors?: string[];
  createdAt: string;
}

export interface NetworkStats {
  totalNodes: number;
  totalEdges: number;
  averageDegree: number;
  clusteringCoefficient: number;
  networkDensity: number;
  averagePathLength: number;
}

export interface GraphIntelligenceTemplateProps {
  /** Cluster items to display */
  clusters?: readonly ClusterData[];
  /** Network statistics */
  stats?: NetworkStats;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Page title */
  title?: string;
  /** Additional CSS classes */
  className?: string;
}

const getTypeColor = (type: ClusterData["type"]) => {
  switch (type) {
    case "professional":
      return "info";
    case "personal":
      return "success";
    case "community":
      return "warning";
    default:
      return "neutral";
  }
};

const ClusterCard: React.FC<{
  cluster: ClusterData;
  onAction: (action: string, cluster: ClusterData) => void;
}> = ({ cluster, onAction }) => {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <VStack gap="md">
        <HStack justify="between" align="start">
          <HStack gap="sm" align="center">
            <Box rounded="lg" padding="sm" className="bg-indigo-100">
              <Network className="h-5 w-5 text-indigo-600" />
            </Box>
            <VStack gap="none">
              <Typography variant="body" className="font-medium">
                {cluster.name}
              </Typography>
              <HStack gap="xs" align="center" className="text-neutral-500">
                <Users className="h-3 w-3" />
                <Typography variant="small">
                  {cluster.memberCount} members
                </Typography>
              </HStack>
            </VStack>
          </HStack>
          <Badge variant={getTypeColor(cluster.type)}>{cluster.type}</Badge>
        </HStack>

        {/* Metrics */}
        <Box className="grid grid-cols-2 gap-3">
          <VStack gap="xs" className="bg-neutral-50 rounded-lg p-2">
            <Typography variant="small" className="text-neutral-500">
              Trust Score
            </Typography>
            <HStack gap="xs" align="center">
              <Target className="h-3 w-3 text-emerald-500" />
              <Typography variant="body" className="font-medium text-emerald-600">
                {cluster.averageTrustScore}
              </Typography>
            </HStack>
          </VStack>
          <VStack gap="xs" className="bg-neutral-50 rounded-lg p-2">
            <Typography variant="small" className="text-neutral-500">
              Cohesion
            </Typography>
            <HStack gap="xs" align="center">
              <Zap className="h-3 w-3 text-blue-500" />
              <Typography variant="body" className="font-medium text-blue-600">
                {cluster.cohesionScore}%
              </Typography>
            </HStack>
          </VStack>
        </Box>

        {/* Top Connectors */}
        {cluster.topConnectors && cluster.topConnectors.length > 0 && (
          <VStack gap="xs">
            <Typography variant="small" className="text-neutral-500">
              Top Connectors
            </Typography>
            <HStack gap="xs" wrap>
              {cluster.topConnectors.slice(0, 3).map((connector) => (
                <Badge key={connector} variant="neutral" size="sm">
                  {connector}
                </Badge>
              ))}
            </HStack>
          </VStack>
        )}

        <HStack gap="sm" className="pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction("VIEW", cluster)}
            className="gap-1"
          >
            <Eye className="h-3 w-3" />
            Details
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction("EXPLORE", cluster)}
            className="gap-1"
          >
            <Share2 className="h-3 w-3" />
            Explore
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
};

const StatCard: React.FC<{
  icon: React.ElementType;
  label: string;
  value: number | string;
  subtitle?: string;
  iconColor?: string;
}> = ({ icon: Icon, label, value, subtitle, iconColor = "text-indigo-600" }) => {
  return (
    <Card className="p-4">
      <VStack gap="sm">
        <HStack gap="sm" align="center">
          <Box rounded="lg" padding="sm" className="bg-neutral-100">
            <Icon className={cn("h-4 w-4", iconColor)} />
          </Box>
          <Typography variant="label" className="text-neutral-500">
            {label}
          </Typography>
        </HStack>
        <Typography variant="h2">{value}</Typography>
        {subtitle && (
          <Typography variant="small" className="text-neutral-400">
            {subtitle}
          </Typography>
        )}
      </VStack>
    </Card>
  );
};

export const GraphIntelligenceTemplate: React.FC<GraphIntelligenceTemplateProps> = ({
  clusters = [],
  stats,
  isLoading = false,
  error = null,
  title = "Graph Intelligence",
  className,
}) => {
  const eventBus = useEventBus();

  // Handle refresh
  const handleRefresh = () => {
    eventBus.emit("UI:REFRESH", { entity: "Cluster" });
  };

  // Handle analyze
  const handleAnalyze = () => {
    eventBus.emit("UI:ANALYZE", {});
  };

  // Handle cluster actions
  const handleAction = (action: string, cluster: ClusterData) => {
    eventBus.emit(`UI:${action}`, { row: cluster, entity: "Cluster" });
  };

  if (isLoading) {
    return (
      <VStack align="center" justify="center" className={cn("py-12", className)}>
        <Spinner size="lg" />
        <Typography variant="body" className="text-neutral-500">
          Analyzing network graph...
        </Typography>
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack align="center" justify="center" className={cn("py-12", className)}>
        <Typography variant="body" className="text-red-500">
          Error: {error.message}
        </Typography>
      </VStack>
    );
  }

  return (
    <VStack gap="lg" className={cn("p-6", className)}>
      {/* Header */}
      <HStack justify="between" align="center" wrap>
        <VStack gap="xs">
          <HStack gap="sm" align="center">
            <Box rounded="lg" padding="sm" className="bg-indigo-100">
              <Network className="h-6 w-6 text-indigo-600" />
            </Box>
            <Typography variant="h1">{title}</Typography>
          </HStack>
          <Typography variant="body" className="text-neutral-500">
            Network analysis and cluster insights
          </Typography>
        </VStack>

        <HStack gap="sm">
          <Button variant="secondary" onClick={handleRefresh} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button variant="primary" onClick={handleAnalyze} className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Run Analysis
          </Button>
        </HStack>
      </HStack>

      {/* Network Stats */}
      {stats && (
        <Box className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard
            icon={Users}
            label="Nodes"
            value={stats.totalNodes}
            iconColor="text-blue-600"
          />
          <StatCard
            icon={Share2}
            label="Edges"
            value={stats.totalEdges}
            iconColor="text-emerald-600"
          />
          <StatCard
            icon={TrendingUp}
            label="Avg Degree"
            value={stats.averageDegree.toFixed(1)}
            iconColor="text-amber-600"
          />
          <StatCard
            icon={Network}
            label="Clustering"
            value={`${(stats.clusteringCoefficient * 100).toFixed(0)}%`}
            iconColor="text-purple-600"
          />
          <StatCard
            icon={Target}
            label="Density"
            value={`${(stats.networkDensity * 100).toFixed(1)}%`}
            iconColor="text-pink-600"
          />
          <StatCard
            icon={Zap}
            label="Avg Path"
            value={stats.averagePathLength.toFixed(2)}
            iconColor="text-indigo-600"
          />
        </Box>
      )}

      {/* Clusters Section */}
      <VStack gap="md">
        <HStack justify="between" align="center">
          <Typography variant="h2">Discovered Clusters</Typography>
          <Badge variant="info">{clusters.length} clusters</Badge>
        </HStack>

        {clusters.length === 0 ? (
          <Card className="p-8">
            <VStack align="center" justify="center">
              <Network className="h-12 w-12 text-neutral-300" />
              <Typography variant="h3" className="text-neutral-500">
                No clusters discovered
              </Typography>
              <Typography variant="body" className="text-neutral-400">
                Run an analysis to discover network clusters
              </Typography>
              <Button
                variant="primary"
                onClick={handleAnalyze}
                className="gap-2 mt-4"
              >
                <BarChart3 className="h-4 w-4" />
                Run Analysis
              </Button>
            </VStack>
          </Card>
        ) : (
          <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clusters.map((cluster) => (
              <ClusterCard
                key={cluster.id}
                cluster={cluster}
                onAction={handleAction}
              />
            ))}
          </Box>
        )}
      </VStack>

      {/* Network Visualization Placeholder */}
      <Card className="p-6">
        <VStack gap="md" align="center">
          <Network className="h-16 w-16 text-neutral-300" />
          <Typography variant="h3" className="text-neutral-500">
            Network Visualization
          </Typography>
          <Typography variant="body" className="text-neutral-400 text-center">
            Interactive graph visualization will be displayed here.
            <br />
            Nodes represent users, edges represent connections.
          </Typography>
          <Button
            variant="secondary"
            onClick={() => eventBus.emit("UI:OPEN_VISUALIZATION", {})}
            className="gap-2"
          >
            <ChevronRight className="h-4 w-4" />
            Open Full Visualization
          </Button>
        </VStack>
      </Card>
    </VStack>
  );
};

GraphIntelligenceTemplate.displayName = "GraphIntelligenceTemplate";
