/**
 * Builder Organisms
 *
 * Graph editing components for the Builder IDE.
 */

// Types
export type { BuilderGraph, GraphNode, Relationship } from "./types";

// Node editor modals
export {
  StateModal, EventModal, PageModal, ComponentModal, TransitionModal,
} from "./NodeEditorModals";
export type {
  StateFormData, StateModalProps,
  EventFormData, EventModalProps,
  PageFormData, PageModalProps,
  ComponentFormData, ComponentModalProps,
  TransitionFormData, TransitionModalProps,
} from "./NodeEditorModals";

// State machine visualizer
export { StateMachineVisualizer } from "./StateMachineVisualizer";
export type { StateMachineVisualizerProps } from "./StateMachineVisualizer";

// State machine diagram (SVG)
export { StateMachineDiagram } from "./StateMachineDiagram";
export type { StateMachineDiagramProps } from "./StateMachineDiagram";

// UI component tree
export { UIComponentTree } from "./UIComponentTree";
export type { UIComponentTreeProps } from "./UIComponentTree";
