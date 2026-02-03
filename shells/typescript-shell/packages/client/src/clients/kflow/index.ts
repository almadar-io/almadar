/**
 * KFlow Design System Components
 *
 * Educational/learning platform components built on the core design system.
 * All components follow the Almadar Entity Binding pattern:
 * - Data flows through entity/props from Almadar state
 * - User interactions emit events via useEventBus()
 */

// Atoms - Basic building blocks
export * from "./atoms";

// Molecules - Composite components (excluding NODE_TYPE_COLORS to avoid conflict with organisms)
export {
  // Markdown components
  CodeBlock,
  type CodeBlockProps,
  MarkdownContent,
  type MarkdownContentProps,
  // Learning components
  ActivationBlock,
  type ActivationBlockProps,
  ReflectionBlock,
  type ReflectionBlockProps,
  // Mindmap components
  MindMapNode,
  type MindMapNodeProps,
  // Notes components
  NoteContent,
  type NoteContentProps,
  NoteListItem,
  type NoteListItemProps,
  // Graph components
  GraphLegend,
  type GraphLegendProps,
  type LegendItem,
  EDGE_TYPE_COLORS,
  // Streaming components
  StreamingDisplay,
  type StreamingDisplayProps,
  // Concept components
  ConceptMetaTags,
  type ConceptMetaTagsProps,
  // Learning goal components
  LearningGoalDisplay,
  type LearningGoalDisplayProps,
  // Layer navigation
  LayerNavigator,
  type LayerNavigatorProps,
} from "./molecules";

// Re-export NODE_TYPE_COLORS from molecules (canonical source)
export { NODE_TYPE_COLORS } from "./molecules/GraphLegend";

// Organisms - Complex feature components (excluding ConceptEntity to avoid conflict with templates)
export {
  // Learning content
  SegmentRenderer,
  type SegmentRendererProps,
  // Graph visualization
  ForceDirectedGraph,
  type ForceDirectedGraphProps,
  type GraphNode,
  type GraphRelationship,
  // Mindmap
  MindMapCanvas,
  type MindMapCanvasProps,
  // Notes
  NoteList,
  type NoteListProps,
  // Concept display
  ConceptCard,
  type ConceptCardProps,
  // Flashcards
  FlashCard,
  type FlashCardProps,
  type FlashCardEntity,
  FlashCardStack,
  type FlashCardStackProps,
} from "./organisms";

// Re-export ConceptEntity from organisms (canonical source)
export { type ConceptEntity } from "./organisms/ConceptCard";

// Utilities - Helper functions and types
export * from "./utils";

// Templates - Page-level layouts (excluding ConceptEntity to avoid conflict)
export {
  ConceptDetailTemplate,
  type ConceptDetailTemplateProps,
  KnowledgeGraphTemplate,
  type KnowledgeGraphTemplateProps,
  LessonTemplate,
  type LessonTemplateProps,
} from "./templates";
