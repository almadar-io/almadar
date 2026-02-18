import type { OrbitalSchema } from '../components/HeroSchemaAnimation/types';

// ============================================================================
// Shared Schema Definitions
// ============================================================================

const winning11Schema: OrbitalSchema = {
    name: "Winning 11",
    description: "Trust-based Relationship Intelligence",
    orbitals: [
        {
            name: "TrustEngine",
            entity: { name: "User", fields: [] }, // Primary Entity
            traits: [
                {
                    name: "TrustScore", // Secondary "Trait/Orbital" context
                    stateMachine: {
                        states: [
                            { name: "Pending" },    // User Registered
                            { name: "Verified" },   // Email Verified
                            { name: "Analyzing" },  // AI Vibe Check
                            { name: "Trusted", isTerminal: true } // Trust Score Calculated
                        ],
                        events: [
                            { key: "verify_email", name: "Verify Email" },
                            { key: "calculate_trust", name: "Calculate Trust" },
                            { key: "form_cluster", name: "Form Cluster" }
                        ],
                        transitions: [
                            { from: "Pending", to: "Verified", event: "verify_email" },
                            { from: "Verified", to: "Analyzing", event: "calculate_trust" },
                            { from: "Analyzing", to: "Trusted", event: "form_cluster" }
                        ]
                    }
                }
            ],
            pages: [{ name: "Profile", path: "/profile" }]
        }
    ]
};

const inspectionSchema: OrbitalSchema = {
    name: "Inspection System",
    description: "Government Oversight Platform",
    orbitals: [
        {
            name: "Oversight",
            entity: { name: "Company", fields: [] },
            traits: [
                {
                    name: "Inspection",
                    stateMachine: {
                        states: [
                            { name: "Scheduled" },
                            { name: "In_Field" },   // Inspector on site
                            { name: "Review" },     // Supervisors reviewing
                            { name: "Closed", isTerminal: true }     // Permit Issued / Violation
                        ],
                        events: [
                            { key: "start_visit", name: "Start Visit" },
                            { key: "submit_findings", name: "Submit Findings" },
                            { key: "issue_verdict", name: "Issue Verdict" }
                        ],
                        transitions: [
                            { from: "Scheduled", to: "In_Field", event: "start_visit" },
                            { from: "In_Field", to: "Review", event: "submit_findings" },
                            { from: "Review", to: "Closed", event: "issue_verdict" }
                        ]
                    }
                }
            ],
            pages: [{ name: "Dashboard", path: "/dashboard" }]
        }
    ]
};

const fitnessSchema: OrbitalSchema = {
    name: "Fitness Tracker",
    description: "Personal Performance Analytics",
    orbitals: [
        {
            name: "Training",
            entity: { name: "Trainee", fields: [] },
            traits: [
                {
                    name: "Workout",
                    stateMachine: {
                        states: [
                            { name: "Planned" },
                            { name: "Active" },     // In Gym
                            { name: "Resting" },    // Between sets/Post-workout
                            { name: "Logged", isTerminal: true }      // Data synchronized
                        ],
                        events: [
                            { key: "check_in", name: "Check In" },
                            { key: "complete_set", name: "Complete Set" },
                            { key: "sync_cloud", name: "Sync Cloud" }
                        ],
                        transitions: [
                            { from: "Planned", to: "Active", event: "check_in" },
                            { from: "Active", to: "Resting", event: "complete_set" },
                            { from: "Resting", to: "Logged", event: "sync_cloud" }
                        ]
                    }
                }
            ],
            pages: [{ name: "Session", path: "/session" }]
        }
    ]
};

const traitWarsSchema: OrbitalSchema = {
    name: "Trait Wars",
    description: "Hex-based Tactical Strategy",
    orbitals: [
        {
            name: "BattleEngine",
            entity: { name: "Unit", fields: [] },
            traits: [
                {
                    name: "Combat",
                    stateMachine: {
                        states: [
                            { name: "Idle", isInitial: true },
                            { name: "Moving" },
                            { name: "Attacking" },
                            { name: "Defeated", isTerminal: true } // or Victorious
                        ],
                        events: [
                            { key: "command_move", name: "Command Move" },
                            { key: "engage_enemy", name: "Engage Enemy" },
                            { key: "take_damage", name: "Take Damage" }
                        ],
                        transitions: [
                            { from: "Idle", to: "Moving", event: "command_move" },
                            { from: "Moving", to: "Attacking", event: "engage_enemy" },
                            { from: "Attacking", to: "Defeated", event: "take_damage" }
                        ]
                    }
                }
            ],
            pages: [{ name: "BattleMap", path: "/battle" }]
        }
    ]
};

const studioSchema: OrbitalSchema = {
    name: "Almadar Studio",
    description: "AI-Powered App Builder",
    orbitals: [
        {
            name: "BuilderCore",
            entity: { name: "Project", fields: [] },
            traits: [
                {
                    name: "Agent",
                    stateMachine: {
                        states: [
                            { name: "Prompted" },   // User input
                            { name: "Planning" },   // Agent thinking
                            { name: "Coding" },     // Writing files
                            { name: "Live", isTerminal: true }       // App Deployed
                        ],
                        events: [
                            { key: "analyze_req", name: "Analyze Req" },
                            { key: "generate_code", name: "Generate Code" },
                            { key: "preview_app", name: "Preview App" }
                        ],
                        transitions: [
                            { from: "Prompted", to: "Planning", event: "analyze_req" },
                            { from: "Planning", to: "Coding", event: "generate_code" },
                            { from: "Coding", to: "Live", event: "preview_app" }
                        ]
                    }
                }
            ],
            pages: [{ name: "IDE", path: "/ide" }]
        }
    ]
};

// ============================================================================
// Export Mapped Schemas
// ============================================================================

export const demoSchemas: Record<string, OrbitalSchema> = {
    // Winning 11 Demos
    executiveDashboard: winning11Schema,
    trustIntelligence: winning11Schema,
    graphIntelligence: winning11Schema,
    userProfile360: winning11Schema,

    // Inspection Demos
    inspectionManagement: inspectionSchema,
    inspectionForm: inspectionSchema,

    // Fitness Demos
    fitnessTracker: fitnessSchema,
    mealPlanDetail: fitnessSchema,
    trainingSchedule: fitnessSchema,

    // Studio Demos
    almadarStudio: studioSchema,
    studioFullView: studioSchema,
    aiAgentPanel: studioSchema,

    // Game Demos
    gameMapEditor: traitWarsSchema,

    // Generic / Other
    interactiveGraph: winning11Schema // Maps well to graph/clustering logic
};
