/**
 * Winning-11 Client Organisms
 */

// Garden
export { GardenView } from './GardenView';
export type { GardenViewProps, GardenItem } from './GardenView';

// Board organisms (extracted from templates — Phase 6 migration)
export { AdminDashboardBoard } from './AdminDashboardBoard';
export type { AdminDashboardBoardProps, DashboardStats, RecentActivity, SystemAlert, AdminDashboardEntity } from './AdminDashboardBoard';

export { AssessmentsBoard } from './AssessmentsBoard';
export type { AssessmentsBoardProps, AssessmentData } from './AssessmentsBoard';

export { ConnectionsBoard } from './ConnectionsBoard';
export type { ConnectionsBoardProps, ConnectionData } from './ConnectionsBoard';

export { GraphIntelligenceBoard } from './GraphIntelligenceBoard';
export type { GraphIntelligenceBoardProps, ClusterData, NetworkStats, GraphIntelligenceEntity } from './GraphIntelligenceBoard';

export { InvitesBoard } from './InvitesBoard';
export type { InvitesBoardProps, InviteData } from './InvitesBoard';

export { ProjectDetailBoard } from './ProjectDetailBoard';
export type { ProjectDetailBoardProps } from './ProjectDetailBoard';

export { ProjectsBoard } from './ProjectsBoard';
export type { ProjectsBoardProps, ProjectData } from './ProjectsBoard';

export { RelationshipGardenBoard } from './RelationshipGardenBoard';
export type { RelationshipGardenBoardProps } from './RelationshipGardenBoard';

export { SeedNetworkBoard } from './SeedNetworkBoard';
export type { SeedNetworkBoardProps, SeedNominationData } from './SeedNetworkBoard';

export { SuggestionsBoard } from './SuggestionsBoard';
export type { SuggestionsBoardProps, SuggestionData } from './SuggestionsBoard';

export { TeamDetailBoard } from './TeamDetailBoard';
export type { TeamDetailBoardProps } from './TeamDetailBoard';

export { TeamMembersBoard } from './TeamMembersBoard';
export type { TeamMembersBoardProps, TeamMemberData } from './TeamMembersBoard';

export { TeamsBoard } from './TeamsBoard';
export type { TeamsBoardProps, TeamData } from './TeamsBoard';

export { TrustIntelligenceBoard } from './TrustIntelligenceBoard';
export type { TrustIntelligenceBoardProps, TrustScoreData, TrustIntelligenceEntity } from './TrustIntelligenceBoard';

export { UserProfileBoard } from './UserProfileBoard';
export type { UserProfileBoardProps, UserProfileData } from './UserProfileBoard';

export { UsersBoard } from './UsersBoard';
export type { UsersBoardProps, UserData } from './UsersBoard';
