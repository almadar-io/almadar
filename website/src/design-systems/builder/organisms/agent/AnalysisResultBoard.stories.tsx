import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import {
  AnalysisResultBoard,
  type AnalysisResult,
  type WorkItemAnswers,
} from "./AnalysisResultBoard";
import type { AnalyzedWorkItem } from "./WorkItemCard";

const meta: Meta<typeof AnalysisResultBoard> = {
  title: "Builder/Organisms/Agent/AnalysisResultBoard",
  component: AnalysisResultBoard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AnalysisResultBoard>;

const baseWorkItems: AnalyzedWorkItem[] = [
  {
    id: "wi-1",
    name: "User Entity & CRUD",
    description: "Create the User entity with authentication fields and standard CRUD trait.",
    scope: {
      entities: ["User"],
      features: ["authentication", "profile"],
      states: ["Browsing", "Creating", "Editing", "Viewing", "Deleting"],
      pages: ["UsersPage"],
    },
    dependencies: [],
    estimatedComplexity: 35,
    questions: [
      {
        id: "q-1",
        category: "entity_lifecycle",
        question: "Should users be able to self-register, or only admins can create accounts?",
        reason: "Determines whether a public registration page is needed.",
        inputType: "yesno",
        suggestedAnswers: ["Self-register", "Admin only"],
        impactsSchemaElement: "guards",
      },
      {
        id: "q-2",
        category: "authorization",
        question: "What user roles should be available?",
        reason: "Roles determine access control guards on transitions.",
        inputType: "multiselect",
        suggestedAnswers: ["admin", "editor", "viewer", "guest"],
        impactsSchemaElement: "fields",
      },
    ],
  },
  {
    id: "wi-2",
    name: "Project Entity & Management",
    description: "Create Project entity with team assignment and status tracking workflow.",
    scope: {
      entities: ["Project"],
      features: ["status tracking", "team assignment"],
      states: ["Browsing", "Creating", "Viewing", "Editing"],
      pages: ["ProjectsPage"],
    },
    dependencies: ["wi-1"],
    estimatedComplexity: 50,
    questions: [
      {
        id: "q-3",
        category: "workflow",
        question: "What project statuses should be supported?",
        reason: "Determines the state machine transitions for the project lifecycle.",
        inputType: "multiselect",
        suggestedAnswers: ["draft", "active", "on_hold", "completed", "archived"],
        impactsSchemaElement: "states",
      },
    ],
  },
  {
    id: "wi-3",
    name: "Task Entity & Board View",
    description: "Create Task entity with kanban-style board view and drag-drop support.",
    scope: {
      entities: ["Task"],
      features: ["kanban board", "drag-drop"],
      states: ["Browsing", "Creating", "Viewing", "Editing", "Deleting"],
      pages: ["TaskBoardPage"],
    },
    dependencies: ["wi-1", "wi-2"],
    estimatedComplexity: 65,
    questions: [],
  },
];

const moderateAnalysis: AnalysisResult = {
  userRequest: "Build a project management tool with users, projects, and tasks",
  complexity: {
    score: 55,
    category: "moderate",
    reasoning:
      "Three entities with inter-dependencies, role-based access, and a kanban board pattern require moderate orchestration.",
    detectedEntities: ["User", "Project", "Task"],
    detectedFeatures: ["CRUD", "authentication", "kanban board", "role-based access"],
    potentialChallenges: ["Cross-entity relations", "Drag-drop state sync"],
  },
  route: "direct_with_questions",
  workItems: baseWorkItems,
  globalRequirements: {
    entities: ["User", "Project", "Task"],
    states: ["Browsing", "Creating", "Viewing", "Editing", "Deleting"],
    events: ["INIT", "CREATE", "VIEW", "EDIT", "DELETE", "SAVE", "CANCEL"],
    guards: ["isAdmin", "isOwner"],
    pages: ["UsersPage", "ProjectsPage", "TaskBoardPage"],
    effects: ["persist", "render-ui", "emit"],
    rawRequirements: [
      "Users can self-register",
      "Projects have status tracking",
      "Tasks displayed in kanban board",
    ],
  },
  estimatedMinutes: 12,
};

const emptyAnswers: WorkItemAnswers = {};

const partialAnswers: WorkItemAnswers = {
  "wi-1": {
    "q-1": "Self-register",
  },
};

const allAnswers: WorkItemAnswers = {
  "wi-1": {
    "q-1": "Self-register",
    "q-2": "admin,editor,viewer",
  },
  "wi-2": {
    "q-3": "draft,active,completed,archived",
  },
};

export const Default: Story = {
  args: {
    analysis: moderateAnalysis,
    answers: partialAnswers,
    onAnswerChange: fn(),
    canSubmit: false,
    onSubmit: fn(),
    onCancel: fn(),
  },
};

export const HighComplexity: Story = {
  args: {
    analysis: {
      ...moderateAnalysis,
      complexity: {
        score: 82,
        category: "complex",
        reasoning:
          "Multiple entities with complex state machines, cross-orbital events, and custom patterns increase implementation difficulty.",
        detectedEntities: ["User", "Project", "Task", "Comment", "Notification"],
        detectedFeatures: ["CRUD", "real-time", "notifications", "file uploads"],
        potentialChallenges: [
          "Real-time sync",
          "File upload effects",
          "Notification cross-orbital events",
        ],
      },
      route: "decompose",
      estimatedMinutes: 25,
    },
    answers: emptyAnswers,
    onAnswerChange: fn(),
    canSubmit: false,
    onSubmit: fn(),
    onCancel: fn(),
  },
};

export const AllAnswered: Story = {
  args: {
    analysis: moderateAnalysis,
    answers: allAnswers,
    onAnswerChange: fn(),
    canSubmit: true,
    onSubmit: fn(),
    onCancel: fn(),
  },
};

export const NoQuestions: Story = {
  args: {
    analysis: {
      ...moderateAnalysis,
      complexity: {
        score: 20,
        category: "simple",
        reasoning: "Single entity with standard CRUD, no special requirements.",
        detectedEntities: ["Task"],
        detectedFeatures: ["CRUD"],
      },
      route: "direct",
      workItems: [baseWorkItems[2]],
      globalRequirements: {
        ...moderateAnalysis.globalRequirements,
        entities: ["Task"],
        pages: ["TaskBoardPage"],
      },
      estimatedMinutes: 3,
    },
    answers: {},
    onAnswerChange: fn(),
    canSubmit: true,
    onSubmit: fn(),
    onCancel: fn(),
  },
};

export const Submitting: Story = {
  args: {
    analysis: moderateAnalysis,
    answers: allAnswers,
    onAnswerChange: fn(),
    canSubmit: true,
    onSubmit: fn(),
    isSubmitting: true,
    onCancel: fn(),
  },
};
