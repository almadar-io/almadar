/**
 * Builder Graph Types
 *
 * Inlined from the builder client types for DS independence.
 */

export interface GraphNode {
  id: string;
  type: string;
  properties: Record<string, unknown>;
  createdAt?: number;
  updatedAt?: number;
}

export interface Relationship {
  id: string;
  source: string;
  target: string;
  type: string;
  direction: 'forward' | 'backward' | 'bidirectional';
  strength?: number;
  metadata?: Record<string, unknown>;
  createdAt?: number;
}

export interface BuilderGraph {
  id: string;
  name: string;
  description?: string;
  createdAt: number;
  updatedAt: number;
  version: number;
  nodes: Record<string, GraphNode>;
  nodeTypes: Record<string, string[]>;
  relationships: Relationship[];
  appConfig?: {
    initialPageId?: string;
    initialStateId?: string;
    theme?: Record<string, unknown>;
  };
}
