/**
 * Discovery Engine — Pure functions for finding cross-domain connections
 * and generating next-step suggestions.
 */

import type {
  KnowledgeNode,
  NextSuggestion,
  DailyProgress,
  KnowledgeDomainType,
} from "../types/knowledge";

export interface CrossLink {
  term: string;
  nodeIds: string[];
}

export interface DiscoveryResult {
  sharedTerm: string;
  nodes: KnowledgeNode[];
  isNew: boolean;
}

/**
 * Find cross-domain connections the user hasn't explored yet.
 * Scans node titles/descriptions for shared terms across domains.
 */
export function findCrossDomainDiscoveries(
  visitedNodeIds: string[],
  allNodes: KnowledgeNode[],
  crossLinks: CrossLink[],
): DiscoveryResult[] {
  const visitedSet = new Set(visitedNodeIds);
  const nodeMap = new Map(allNodes.map((n) => [n.id, n]));
  const results: DiscoveryResult[] = [];

  for (const link of crossLinks) {
    const linkedNodes = link.nodeIds
      .map((id) => nodeMap.get(id))
      .filter((n): n is KnowledgeNode => n !== undefined);

    // Must span at least 2 different domains
    const domains = new Set(linkedNodes.map((n) => n.domain));
    if (domains.size < 2) continue;

    // At least one visited, at least one not visited → new discovery
    const hasVisited = linkedNodes.some((n) => visitedSet.has(n.id));
    const hasUnvisited = linkedNodes.some((n) => !visitedSet.has(n.id));

    if (hasVisited && hasUnvisited) {
      results.push({
        sharedTerm: link.term,
        nodes: linkedNodes,
        isNew: true,
      });
    }
  }

  // Sort by number of unvisited nodes (most new discoveries first)
  return results.sort((a, b) => {
    const aNew = a.nodes.filter((n) => !visitedSet.has(n.id)).length;
    const bNew = b.nodes.filter((n) => !visitedSet.has(n.id)).length;
    return bNew - aNew;
  });
}

/**
 * Generate next-step suggestions based on visited history, progress, and cross-links.
 */
export function suggestNextNodes(
  visited: string[],
  allNodes: KnowledgeNode[],
  crossLinks: CrossLink[],
  progress: DailyProgress,
): NextSuggestion[] {
  const visitedSet = new Set(visited);
  const suggestions: NextSuggestion[] = [];
  let priority = 0;

  // 1. Cross-domain discoveries
  const discoveries = findCrossDomainDiscoveries(visited, allNodes, crossLinks);
  for (const disc of discoveries.slice(0, 2)) {
    const unvisitedNode = disc.nodes.find((n) => !visitedSet.has(n.id));
    if (unvisitedNode) {
      suggestions.push({
        type: "discovery",
        title: `${disc.sharedTerm}: ${unvisitedNode.title}`,
        description: `Cross-domain connection via "${disc.sharedTerm}" — explore ${unvisitedNode.subject}`,
        nodeId: unvisitedNode.id,
        subjectId: unvisitedNode.subject,
        domain: unvisitedNode.domain,
        priority: priority++,
      });
    }
  }

  // 2. Continue children of visited nodes
  for (const nodeId of visited.slice(-5)) {
    const node = allNodes.find((n) => n.id === nodeId);
    if (!node) continue;
    for (const childId of node.childIds) {
      if (!visitedSet.has(childId)) {
        const child = allNodes.find((n) => n.id === childId);
        if (child) {
          suggestions.push({
            type: "continue",
            title: child.title,
            description: `Continue from ${node.title}`,
            nodeId: child.id,
            subjectId: child.subject,
            domain: child.domain,
            priority: priority++,
          });
          break;
        }
      }
    }
  }

  // 3. Explore underrepresented domains
  const domainVisits: Record<KnowledgeDomainType, number> = { formal: 0, natural: 0, social: 0 };
  for (const nodeId of visited) {
    const node = allNodes.find((n) => n.id === nodeId);
    if (node) domainVisits[node.domain]++;
  }

  const leastVisitedDomain = (Object.entries(domainVisits) as [KnowledgeDomainType, number][])
    .sort((a, b) => a[1] - b[1])[0]?.[0];

  if (leastVisitedDomain) {
    const exploreNode = allNodes.find(
      (n) => n.domain === leastVisitedDomain && !visitedSet.has(n.id) && n.depth <= 2,
    );
    if (exploreNode) {
      suggestions.push({
        type: "explore",
        title: exploreNode.title,
        description: `Explore ${leastVisitedDomain} sciences — your least visited domain`,
        nodeId: exploreNode.id,
        subjectId: exploreNode.subject,
        domain: exploreNode.domain,
        priority: priority++,
      });
    }
  }

  return suggestions;
}
