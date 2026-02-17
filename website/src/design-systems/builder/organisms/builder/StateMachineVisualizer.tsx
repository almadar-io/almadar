/**
 * State Machine Visualizer
 *
 * Visual representation of state machine with states, transitions, and events.
 * Supports viewing and editing the state machine graph.
 */

import React, { useState, useMemo, useCallback } from 'react';
import type { BuilderGraph, GraphNode } from './types';
import { Typography, Button, Badge } from '@almadar/ui';
import { Card, CardBody, CardHeader, Modal } from '@almadar/ui';
import {
  Circle,
  ArrowRight,
  Plus,
  Edit2,
  Trash2,
  Play,
  Square,
  Zap,
} from 'lucide-react';

// ============ Types ============

export interface StateMachineVisualizerProps {
  graph: BuilderGraph;
  onCreateState?: () => void;
  onCreateEvent?: () => void;
  onCreateTransition?: (fromStateId: string) => void;
  onEditState?: (stateId: string) => void;
  onEditEvent?: (eventId: string) => void;
  onDeleteState?: (stateId: string) => void;
  onDeleteEvent?: (eventId: string) => void;
  onDeleteTransition?: (transitionId: string) => void;
  className?: string;
  readOnly?: boolean;
}

interface StateNode extends GraphNode {
  properties: {
    name: string;
    isInitial?: boolean;
    isFinal?: boolean;
    description?: string;
  };
}

interface EventNode extends GraphNode {
  properties: {
    key: string;
    name: string;
    description?: string;
  };
}

interface TransitionNode extends GraphNode {
  properties: {
    name?: string;
  };
}

interface TransitionDetails {
  transition: TransitionNode;
  fromState: StateNode | null;
  toState: StateNode | null;
  event: EventNode | null;
}

// ============ Component ============

export const StateMachineVisualizer: React.FC<StateMachineVisualizerProps> = ({
  graph,
  onCreateState,
  onCreateEvent,
  onCreateTransition,
  onEditState,
  onEditEvent,
  onDeleteState,
  onDeleteEvent,
  onDeleteTransition,
  className = '',
  readOnly = false,
}) => {
  const [selectedStateId, setSelectedStateId] = useState<string | null>(null);
  const [showTransitionDetails, setShowTransitionDetails] = useState<TransitionDetails | null>(null);

  // Extract states, events, and transitions
  const { states, events, transitions, transitionDetails } = useMemo(() => {
    const stateNodes: StateNode[] = [];
    const eventNodes: EventNode[] = [];
    const transitionNodes: TransitionNode[] = [];

    Object.values(graph.nodes).forEach((node) => {
      if (node.type === 'State') {
        stateNodes.push(node as StateNode);
      } else if (node.type === 'Event') {
        eventNodes.push(node as EventNode);
      } else if (node.type === 'Transition') {
        transitionNodes.push(node as TransitionNode);
      }
    });

    // Build transition details
    const details: TransitionDetails[] = transitionNodes.map((transition) => {
      // Find relationships for this transition
      const fromRel = graph.relationships.find(
        (r) => r.type === 'TRANSITIONS_FROM' && r.source === transition.id
      );
      const toRel = graph.relationships.find(
        (r) => r.type === 'TRANSITIONS_TO' && r.source === transition.id
      );
      const eventRel = graph.relationships.find(
        (r) => r.type === 'ON_EVENT' && r.source === transition.id
      );

      return {
        transition,
        fromState: fromRel ? (graph.nodes[fromRel.target] as StateNode) : null,
        toState: toRel ? (graph.nodes[toRel.target] as StateNode) : null,
        event: eventRel ? (graph.nodes[eventRel.target] as EventNode) : null,
      };
    });

    return {
      states: stateNodes,
      events: eventNodes,
      transitions: transitionNodes,
      transitionDetails: details,
    };
  }, [graph]);

  // Get transitions from a specific state
  const getTransitionsFrom = useCallback(
    (stateId: string) => {
      return transitionDetails.filter((t) => t.fromState?.id === stateId);
    },
    [transitionDetails]
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Typography variant="h4">
            State Machine
          </Typography>
          <Typography variant="caption" color="muted">
            {states.length} states, {events.length} events, {transitions.length} transitions
          </Typography>
        </div>
        {!readOnly && (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={onCreateState}
            >
              Add State
            </Button>
            <Button
              size="sm"
              variant="secondary"
              leftIcon={<Zap className="w-4 h-4" />}
              onClick={onCreateEvent}
            >
              Add Event
            </Button>
          </div>
        )}
      </div>

      {/* States Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* States List */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Circle className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
              <Typography variant="h5">
                States ({states.length})
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="space-y-2 max-h-96 overflow-auto">
            {states.length === 0 ? (
              <Typography variant="body2" color="muted" className="text-center py-4">
                No states defined
              </Typography>
            ) : (
              states.map((state) => (
                <div
                  key={state.id}
                  className={`p-3 rounded-lg border transition-colors cursor-pointer ${selectedStateId === state.id
                      ? ''
                      : 'hover:opacity-80'
                    }`}
                  style={selectedStateId === state.id
                    ? { backgroundColor: 'color-mix(in srgb, var(--color-primary) 15%, transparent)', borderColor: 'var(--color-primary)' }
                    : { backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }
                  }
                  onClick={() => setSelectedStateId(state.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {state.properties.isInitial ? (
                        <Play className="w-4 h-4" style={{ color: 'var(--color-success)' }} />
                      ) : state.properties.isFinal ? (
                        <Square className="w-4 h-4" style={{ color: 'var(--color-error)' }} />
                      ) : (
                        <Circle className="w-4 h-4" style={{ color: 'var(--color-muted-foreground)' }} />
                      )}
                      <div>
                        <Typography variant="body2" className="font-medium">
                          {state.properties.name}
                        </Typography>
                        {state.properties.description && (
                          <Typography variant="caption" color="muted">
                            {state.properties.description}
                          </Typography>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {state.properties.isInitial && (
                        <Badge size="sm" variant="success">Initial</Badge>
                      )}
                      {state.properties.isFinal && (
                        <Badge size="sm" variant="warning">Final</Badge>
                      )}
                    </div>
                  </div>

                  {/* Transitions from this state */}
                  {selectedStateId === state.id && (
                    <div className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
                      <Typography variant="caption" color="muted" className="block mb-2">
                        Outgoing transitions:
                      </Typography>
                      {getTransitionsFrom(state.id).length === 0 ? (
                        <Typography variant="caption" color="muted">
                          None
                        </Typography>
                      ) : (
                        <div className="space-y-1">
                          {getTransitionsFrom(state.id).map((t) => (
                            <div
                              key={t.transition.id}
                              className="flex items-center gap-2 text-sm cursor-pointer hover:opacity-80"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowTransitionDetails(t);
                              }}
                            >
                              <ArrowRight className="w-3 h-3" style={{ color: 'var(--color-muted-foreground)' }} />
                              <span style={{ color: 'var(--color-primary)' }}>
                                {t.event?.properties.key || 'Unknown'}
                              </span>
                              <span style={{ color: 'var(--color-muted-foreground)' }}>→</span>
                              <span style={{ color: 'var(--color-info)' }}>
                                {t.toState?.properties.name || 'Unknown'}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {!readOnly && (
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            variant="ghost"
                            leftIcon={<Plus className="w-3 h-3" />}
                            onClick={(e) => {
                              e.stopPropagation();
                              onCreateTransition?.(state.id);
                            }}
                          >
                            Add Transition
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            leftIcon={<Edit2 className="w-3 h-3" />}
                            onClick={(e) => {
                              e.stopPropagation();
                              onEditState?.(state.id);
                            }}
                          >
                            Edit
                          </Button>
                          {!state.properties.isInitial && (
                            <Button
                              size="sm"
                              variant="ghost"
                              style={{ color: 'var(--color-error)' }}
                              leftIcon={<Trash2 className="w-3 h-3" />}
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteState?.(state.id);
                              }}
                            >
                              Delete
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </CardBody>
        </Card>

        {/* Events List */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5" style={{ color: 'var(--color-warning)' }} />
              <Typography variant="h5">
                Events ({events.length})
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="space-y-2 max-h-96 overflow-auto">
            {events.length === 0 ? (
              <Typography variant="body2" color="muted" className="text-center py-4">
                No events defined
              </Typography>
            ) : (
              events.map((event) => (
                <div
                  key={event.id}
                  className="p-3 rounded-lg border transition-colors"
                  style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge size="sm" variant="info">
                          {event.properties.key}
                        </Badge>
                        <Typography variant="body2">
                          {event.properties.name}
                        </Typography>
                      </div>
                      {event.properties.description && (
                        <Typography variant="caption" color="muted" className="mt-1 block">
                          {event.properties.description}
                        </Typography>
                      )}
                    </div>
                    {!readOnly && (
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onEditEvent?.(event.id)}
                        >
                          <Edit2 className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          style={{ color: 'var(--color-error)' }}
                          onClick={() => onDeleteEvent?.(event.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </CardBody>
        </Card>
      </div>

      {/* Transition Flow Diagram */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ArrowRight className="w-5 h-5" style={{ color: 'var(--color-info)' }} />
            <Typography variant="h5">
              Transition Flow
            </Typography>
          </div>
        </CardHeader>
        <CardBody>
          {transitionDetails.length === 0 ? (
            <Typography variant="body2" color="muted" className="text-center py-8">
              No transitions defined. Create states and events first, then add transitions.
            </Typography>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <th className="pb-2 font-medium" style={{ color: 'var(--color-muted-foreground)' }}>From State</th>
                    <th className="pb-2 font-medium" style={{ color: 'var(--color-muted-foreground)' }}>Event</th>
                    <th className="pb-2 font-medium" style={{ color: 'var(--color-muted-foreground)' }}>To State</th>
                    {!readOnly && (
                      <th className="pb-2 font-medium w-20" style={{ color: 'var(--color-muted-foreground)' }}>Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {transitionDetails.map((t) => (
                    <tr
                      key={t.transition.id}
                      className="border-b"
                      style={{ borderColor: 'color-mix(in srgb, var(--color-border) 50%, transparent)' }}
                    >
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          {t.fromState?.properties.isInitial && (
                            <Play className="w-3 h-3" style={{ color: 'var(--color-success)' }} />
                          )}
                          <Typography variant="body2">
                            {t.fromState?.properties.name || 'Unknown'}
                          </Typography>
                        </div>
                      </td>
                      <td className="py-3">
                        <Badge variant="info" size="sm">
                          {t.event?.properties.key || 'Unknown'}
                        </Badge>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          {t.toState?.properties.isFinal && (
                            <Square className="w-3 h-3" style={{ color: 'var(--color-error)' }} />
                          )}
                          <Typography variant="body2">
                            {t.toState?.properties.name || 'Unknown'}
                          </Typography>
                        </div>
                      </td>
                      {!readOnly && (
                        <td className="py-3">
                          <Button
                            size="sm"
                            variant="ghost"
                            style={{ color: 'var(--color-error)' }}
                            onClick={() => onDeleteTransition?.(t.transition.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Transition Details Modal */}
      {showTransitionDetails && (
        <Modal
          isOpen={true}
          onClose={() => setShowTransitionDetails(null)}
          title="Transition Details"
          size="md"
        >
          <div className="space-y-4">
            <div>
              <Typography variant="caption" color="muted">From State</Typography>
              <Typography variant="body1">
                {showTransitionDetails.fromState?.properties.name || 'Unknown'}
              </Typography>
            </div>
            <div>
              <Typography variant="caption" color="muted">Event</Typography>
              <Typography variant="body1">
                {showTransitionDetails.event?.properties.name || 'Unknown'} (
                {showTransitionDetails.event?.properties.key})
              </Typography>
            </div>
            <div>
              <Typography variant="caption" color="muted">To State</Typography>
              <Typography variant="body1">
                {showTransitionDetails.toState?.properties.name || 'Unknown'}
              </Typography>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

StateMachineVisualizer.displayName = 'StateMachineVisualizer';

export default StateMachineVisualizer;
