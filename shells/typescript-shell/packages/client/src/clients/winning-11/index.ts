/**
 * Winning-11 Client Components
 *
 * Client-specific components for the Winning-11 relationship intelligence platform.
 * These components implement the garden metaphor for visualizing trust relationships.
 *
 * Entity Mappings:
 * - RelationshipHealth: Core entity for relationship garden
 * - Connection: Underlying connection entity
 * - User: User/profile entity
 */

// Atoms
export {
  TrustMeter,
  type TrustMeterProps,
  type HealthStatus,
  type TrustLevel,
} from "./atoms/TrustMeter";

export {
  GrowthMeter,
  type GrowthMeterProps,
  type VisualMetaphor,
} from "./atoms/GrowthMeter";

export { CareIndicator, type CareIndicatorProps } from "./atoms/CareIndicator";

export {
  SeasonIndicator,
  type SeasonIndicatorProps,
} from "./atoms/SeasonIndicator";

// Molecules
export {
  PlantCard,
  type PlantCardProps,
  type PlantCardData,
  type PlantCardAction,
  type LeafColor,
} from "./molecules/PlantCard";

export {
  HarvestCard,
  type HarvestCardProps,
  type HarvestCardData,
  type HarvestCardAction,
} from "./molecules/HarvestCard";

export {
  WeatherWidget,
  type WeatherWidgetProps,
} from "./molecules/WeatherWidget";

// Organisms
export {
  GardenView,
  type GardenViewProps,
  type GardenItem,
} from "./organisms/GardenView";

// Templates
export {
  RelationshipGardenTemplate,
  type RelationshipGardenTemplateProps,
} from "./templates/RelationshipGardenTemplate";

export {
  TrustIntelligenceTemplate,
  type TrustIntelligenceTemplateProps,
  type TrustScoreData,
} from "./templates/TrustIntelligenceTemplate";

export {
  UsersTemplate,
  type UsersTemplateProps,
  type UserData,
} from "./templates/UsersTemplate";

export {
  UserProfileTemplate,
  type UserProfileTemplateProps,
  type UserProfileData,
} from "./templates/UserProfileTemplate";

export {
  ConnectionsTemplate,
  type ConnectionsTemplateProps,
  type ConnectionData,
} from "./templates/ConnectionsTemplate";

export {
  InvitesTemplate,
  type InvitesTemplateProps,
  type InviteData,
} from "./templates/InvitesTemplate";

export {
  AdminDashboardTemplate,
  type AdminDashboardTemplateProps,
  type DashboardStats,
  type RecentActivity,
  type SystemAlert,
} from "./templates/AdminDashboardTemplate";

export {
  AssessmentTemplate,
  type AssessmentTemplateProps,
  type AssessmentData,
} from "./templates/AssessmentTemplate";

export {
  SuggestionsTemplate,
  type SuggestionsTemplateProps,
  type SuggestionData,
} from "./templates/SuggestionsTemplate";

export {
  GraphIntelligenceTemplate,
  type GraphIntelligenceTemplateProps,
  type ClusterData,
  type NetworkStats,
} from "./templates/GraphIntelligenceTemplate";

export {
  SeedNetworkTemplate,
  type SeedNetworkTemplateProps,
  type SeedNominationData,
} from "./templates/SeedNetworkTemplate";

export {
  ProjectsTemplate,
  type ProjectsTemplateProps,
  type ProjectData,
} from "./templates/ProjectsTemplate";

export {
  ProjectDetailTemplate,
  type ProjectDetailTemplateProps,
  type ProjectDetailData,
} from "./templates/ProjectDetailTemplate";

export {
  TeamsTemplate,
  type TeamsTemplateProps,
  type TeamData,
} from "./templates/TeamsTemplate";

export {
  TeamDetailTemplate,
  type TeamDetailTemplateProps,
  type TeamDetailData,
} from "./templates/TeamDetailTemplate";

export {
  TeamMembersTemplate,
  type TeamMembersTemplateProps,
  type TeamMemberData,
} from "./templates/TeamMembersTemplate";
