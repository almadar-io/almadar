// Learning content
export * from './SegmentRenderer';

// Graph visualization
export * from './ForceDirectedGraph';

// Mindmap
export * from './MindMapCanvas';

// Notes

// Concept display

// Flashcards
export * from './FlashCard';
export * from './FlashCardStack';

// Extracted organisms for template flattener compliance
export { ConceptDetailBoard, type ConceptDetailBoardProps, type ConceptEntity } from './ConceptDetailBoard';
export { KnowledgeGraphBoard, type KnowledgeGraphBoardProps, type KnowledgeGraphEntity } from './KnowledgeGraphBoard';
export { LessonBoard, type LessonBoardProps, type LessonEntity, type SidebarItem } from './LessonBoard';

// Knowledge organisms
export { SubjectOverviewBoard, type SubjectOverviewBoardProps, type SubjectOverviewEntity } from './SubjectOverviewBoard';
export { DomainExplorerBoard, type DomainExplorerBoardProps, type DomainExplorerEntity } from './DomainExplorerBoard';
export { KnowledgeSearchBoard, type KnowledgeSearchBoardProps, type KnowledgeSearchEntity } from './KnowledgeSearchBoard';
export { CrossDomainGraphBoard, type CrossDomainGraphBoardProps, type CrossDomainGraphEntity } from './CrossDomainGraphBoard';
export { LearningPathBoard, type LearningPathBoardProps, type LearningPathEntity } from './LearningPathBoard';

// Session organisms
export { DailyMenuBoard, type DailyMenuBoardProps, type DailyMenuEntity } from './DailyMenuBoard';
export { SpacedReviewBoard, type SpacedReviewBoardProps, type SpacedReviewEntity } from './SpacedReviewBoard';

// Discovery organisms
export { CrossDomainDiscoveryBoard, type CrossDomainDiscoveryBoardProps, type CrossDomainDiscoveryEntity } from './CrossDomainDiscoveryBoard';

// Game organisms (Milestones 7-10)
export { KnowledgeChallengeBoard, type KnowledgeChallengeBoardProps, type KnowledgeChallengeEntity } from './KnowledgeChallengeBoard';
export { KnowledgeBattleBoard, type KnowledgeBattleBoardProps, type KnowledgeBattleEntity } from './KnowledgeBattleBoard';
export { KnowledgeWorldMapBoard, type KnowledgeWorldMapBoardProps, type KnowledgeWorldMapEntity } from './KnowledgeWorldMapBoard';
export { PhysicsLabBoard, type PhysicsLabBoardProps, type PhysicsLabEntity } from './PhysicsLabBoard';

// Story organisms
export { KnowledgeStoryBoard, type KnowledgeStoryBoardProps, type KnowledgeStoryEntity } from './KnowledgeStoryBoard';
export { StoryCatalogBoard, type StoryCatalogBoardProps, type StoryCatalogEntity } from './StoryCatalogBoard';
export { SeriesViewBoard, type SeriesViewBoardProps, type SeriesViewEntity } from './SeriesViewBoard';

// App shell organisms (Phase 2)
export { AppShellBoard, type AppShellBoardProps, type AppShellEntity, type AppShellNavItem, type AppShellUser } from './AppShellBoard';
export { DashboardBoard, type DashboardBoardProps, type DashboardEntity, type DashboardStat, type DashboardActivity, type DashboardLearningPath, type DashboardQuickAction } from './DashboardBoard';
export { LearnBoard, type LearnBoardProps, type LearnEntity, type LearnPathItem } from './LearnBoard';
