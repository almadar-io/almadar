import type { Meta, StoryObj } from "@storybook/react";
import { InspectionFormDemoTemplate } from "./InspectionFormDemoTemplate";

// =============================================================================
// Import actual configs from projects/inspection-system/config/tabs/
// These configs are copied to ../configs/tabs/ for use in Storybook
// =============================================================================

import allConfigs from "../configs";
import type { MockEntityData } from "./InspectionFormDemoTemplate";

// =============================================================================
// Mock Entity Data - matches .orb schema entities for production compatibility
// =============================================================================

/**
 * Mock data for InspectionField entity from inspection-system.orb
 * Structure matches the entity schema for production compatibility:
 * - id: string (required)
 * - name: string (required)
 * - description: string
 * - fieldType: enum ["merchant", "product", "location", "compliance", "safety"] (required)
 * - isActive: boolean (required)
 * - ruleCount: number (required)
 * - createdAt: timestamp
 * - updatedAt: timestamp
 */
const mockEntityData: MockEntityData = {
  InspectionField: [
    {
      id: "trgovina",
      name: "Trgovina",
      description: "Nadzor trgovinske dejavnosti - prodaja blaga in storitev, označevanje cen, varstvo potrošnikov",
      fieldType: "merchant",
      isActive: true,
      ruleCount: 45,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-15T00:00:00Z",
    },
    {
      id: "gostinstvo",
      name: "Gostinstvo",
      description: "Nadzor gostinske dejavnosti - restavracije, bari, hoteli, turistične nastanitve",
      fieldType: "merchant",
      isActive: true,
      ruleCount: 38,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-15T00:00:00Z",
    },
    {
      id: "storitve",
      name: "Storitve",
      description: "Nadzor storitvene dejavnosti - frizerji, kozmetika, avtomehaniki, popravila",
      fieldType: "merchant",
      isActive: true,
      ruleCount: 32,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-15T00:00:00Z",
    },
    {
      id: "e-trgovina",
      name: "E-trgovina",
      description: "Nadzor spletne prodaje - spletne trgovine, oglasi, digitalne storitve",
      fieldType: "product",
      isActive: true,
      ruleCount: 28,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-15T00:00:00Z",
    },
    {
      id: "varnost-izdelkov",
      name: "Varnost izdelkov",
      description: "Nadzor varnosti izdelkov - označevanje, CE oznake, nevarne snovi, embalaža",
      fieldType: "safety",
      isActive: true,
      ruleCount: 52,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-15T00:00:00Z",
    },
    {
      id: "okolje",
      name: "Okolje",
      description: "Okoljski nadzor - embalaža, recikliranje, okolju prijazni izdelki",
      fieldType: "compliance",
      isActive: true,
      ruleCount: 24,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-15T00:00:00Z",
    },
  ],
};

// =============================================================================
// Story Configuration
// =============================================================================

const meta: Meta<typeof InspectionFormDemoTemplate> = {
  title: "Clients/Inspection-System/Templates/InspectionFormDemoTemplate",
  component: InspectionFormDemoTemplate,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# Inspection Form Demo Template

A comprehensive demo template that showcases all 5 inspection phases with config-driven dynamic forms.
This template is designed for presenting to the client to demonstrate the complete inspection workflow.

**This demo loads actual form configs from \`projects/inspection-system/config/tabs/*.json\`**

## Features

- **Config-driven forms**: Loads form definitions from JSON configs
- **5 inspection phases**: Introduction, Content, Preparation, Record, Closing
- **Dynamic conditional fields**: Fields show/hide based on other field values
- **Global variables**: Variables propagate between tabs (HG-*)
- **Violation tracking**: Detects and accumulates violations
- **Debug panel**: Shows internal state for development

## Phase Structure

| Phase | Tabs | Description |
|-------|------|-------------|
| Introduction | T-001, T-002, T-003, T-004 | Case info, company, participants, field selection |
| Content | T-005, T2-1 | Trade data, price marking rules |
| Preparation | T-006, T-007 | Findings, decisions |
| Record | T-008 | Objections |
| Closing | T-009 | End time, signatures |

## Loaded Configs

${Object.entries(allConfigs).map(([id, config]) => `- **${id}**: ${config.name}`).join('\n')}
        `,
      },
    },
  },
  argTypes: {
    showDebugPanel: {
      control: "boolean",
      description: "Show the debug panel for viewing internal state",
    },
    currentPhase: {
      control: "select",
      options: ["introduction", "content", "preparation", "record", "closing"],
      description: "Override the current phase",
    },
    currentTab: {
      control: "select",
      options: Object.keys(allConfigs),
      description: "Override the current tab",
    },
  },
};

export default meta;
type Story = StoryObj<typeof InspectionFormDemoTemplate>;

// =============================================================================
// Stories
// =============================================================================

/**
 * Empty start - fresh inspection with no data filled in.
 * This is the initial state when starting a new inspection.
 *
 * **Configs loaded from:** `projects/inspection-system/config/tabs/`
 */
export const EmptyStart: Story = {
  args: {
    configs: allConfigs,
    showDebugPanel: true,
    mockData: mockEntityData,
  },
};

/**
 * Partial progress - inspection in the Content phase with some data.
 * Demonstrates how global variables affect field visibility.
 */
export const PartialProgress: Story = {
  args: {
    configs: allConfigs,
    showDebugPanel: true,
    currentPhase: "content",
    currentTab: "T-005",
    initialState: {
      formValues: {
        // T-001 Introduction
        A2: "2024-01-15",
        A3: "09:00",
        A7: "NE",
        A9: "PROSTORIH ZAVEZANCA",
        // T-002 Company
        name: "Trgovina Novak d.o.o.",
        registrationNumber: "1234567890",
        taxNumber: "SI12345678",
        address: "Glavna ulica 1",
        city: "Ljubljana",
        postalCode: "1000",
        // T-003 Participants
        participant_name: "Janez",
        participant_surname: "Novak",
        positionInCompany: "Direktor",
        // T-004 Field Selection
        fieldSelection: "TRGOVINA",
      },
      globalVariables: {
        "HG-PROSTOR_NADZORA": "PROSTORIH ZAVEZANCA",
        "HG-INSPECTION_FIELD_TYPE": "TRGOVINA",
        "HG-PARTICIPANT_COUNT": 1,
      },
      completedTabs: ["T-001", "T-002", "T-003", "T-004"],
    },
  },
};

/**
 * Trade inspection phase - showing the T-005 trade form with its complex subsections.
 * This demonstrates the nested conditional logic for different trade types.
 */
export const TradeInspection: Story = {
  args: {
    configs: allConfigs,
    showDebugPanel: true,
    currentPhase: "content",
    currentTab: "T-005",
    initialState: {
      formValues: {
        D1: "V PRODAJALNI",
        D2: "NE",
        D3: "DA",
        D4: "Trgovina Center",
        D5: "Slovenska cesta 55, 1000 Ljubljana",
      },
      globalVariables: {
        "HG-PROSTOR_NADZORA": "PROSTORIH ZAVEZANCA",
        "HG-PRODAJNI_PROSTOR": "V PRODAJALNI",
        "HG-POTROSNIKI": "DA",
      },
      localVariables: {
        "H-NADALJUJ": true,
        "H-PRPSPPTRSKVT": true,
      },
      completedTabs: ["T-001", "T-002", "T-003", "T-004"],
    },
  },
};

/**
 * Price marking inspection (T2-1) - the most complex form with many conditional fields.
 * Demonstrates violation detection when price is not marked correctly.
 */
export const PriceMarkingInspection: Story = {
  args: {
    configs: allConfigs,
    showDebugPanel: true,
    currentPhase: "content",
    currentTab: "T2-1",
    initialState: {
      formValues: {
        // Previous forms
        D1: "V PRODAJALNI",
        D2: "DA",
        // T2-1 fields
        "21": "DA",
        "22": "DA",
        "23": "DA",
        "24": "Mleko 1L, Kruh 500g, Sok 1L",
        "25": "V PRODAJI",
        "28": "NA POLICI, KJER JE BLAGO NAMEŠČENO",
        "210": "DA",
        "211": "DA",
        "212": "DA, Z ENO CENO",
        "214": 2.49,
      },
      globalVariables: {
        "HG-PROSTOR_NADZORA": "PROSTORIH ZAVEZANCA",
        "HG-PRODAJNI_PROSTOR": "V PRODAJALNI",
        "HG-POTROSNIKI": "DA",
        "HG-POTORSNIKI": "DA",
      },
      localVariables: {
        "H-OZNACENO": true,
      },
      completedTabs: ["T-001", "T-002", "T-003", "T-004", "T-005"],
    },
  },
};

/**
 * With violations - inspection that has detected violations.
 * Shows how violations are tracked and displayed from T2-1 price marking.
 */
export const WithViolations: Story = {
  args: {
    configs: allConfigs,
    showDebugPanel: true,
    currentPhase: "content",
    currentTab: "T2-1",
    initialState: {
      formValues: {
        D1: "V PRODAJALNI",
        D2: "DA",
        "21": "DA",
        "22": "DA",
        "24": "Mleko 1L",
        "25": "V PRODAJI",
        "28": "NI OZNAČENO", // Violation trigger!
      },
      globalVariables: {
        "HG-PROSTOR_NADZORA": "PROSTORIH ZAVEZANCA",
        "HG-PRODAJNI_PROSTOR": "V PRODAJALNI",
        "HG-POTROSNIKI": "DA",
        "HG-POTORSNIKI": "DA",
      },
      violations: [
        {
          id: "UPG-2_CENOZN",
          tabId: "T2-1",
          fieldId: "28",
          lawReference: "ZVPOT-1 14/1",
          adminAction: "ZVPOT-1 234/1-4",
          penaltyAction: "ZVPOT-1 240/1-9",
          description: "Blago ni označeno s ceno",
          timestamp: new Date().toISOString(),
        },
      ],
      completedTabs: ["T-001", "T-002", "T-003", "T-004", "T-005"],
    },
  },
};

/**
 * Findings phase (T-006) - documenting inspection findings.
 */
export const FindingsPhase: Story = {
  args: {
    configs: allConfigs,
    showDebugPanel: true,
    currentPhase: "preparation",
    currentTab: "T-006",
    initialState: {
      formValues: {
        description: "Blago na polici ni bilo označeno s ceno v skladu z ZVPOT-1 14/1.",
        severity: "medium",
        recommendation: "Zavezanec mora označiti vse blago s ceno pred nadaljnjo prodajo.",
        lawReference: "ZVPOT-1 14/1",
      },
      globalVariables: {
        "HG-INSPECTION_FIELD_ID": "trgovina-1",
        "HG-FINDING_COUNT": 1,
        "HG-CRITICAL_FINDINGS": 0,
      },
      violations: [
        {
          id: "UPG-2_CENOZN",
          tabId: "T2-1",
          fieldId: "28",
          lawReference: "ZVPOT-1 14/1",
          timestamp: new Date().toISOString(),
        },
      ],
      completedTabs: ["T-001", "T-002", "T-003", "T-004", "T-005", "T2-1"],
    },
  },
};

/**
 * Decisions phase (T-007) - orders and actions based on findings.
 */
export const DecisionsPhase: Story = {
  args: {
    configs: allConfigs,
    showDebugPanel: true,
    currentPhase: "preparation",
    currentTab: "T-007",
    initialState: {
      formValues: {
        actionOrdered: "Zavezanec mora v roku 7 dni označiti vse blago v prodajalni s ceno.",
        deadline: "2024-01-22",
        legalBasis: "ZIN 15. člen, ZVPOT-1 14/1",
        status: "pending",
      },
      globalVariables: {
        "HG-FINDING_COUNT": 1,
        "HG-DECISION_COUNT": 1,
      },
      completedTabs: ["T-001", "T-002", "T-003", "T-004", "T-005", "T2-1", "T-006"],
    },
  },
};

/**
 * Objections phase (T-008) - merchant review and objections.
 */
export const ObjectionsPhase: Story = {
  args: {
    configs: allConfigs,
    showDebugPanel: true,
    currentPhase: "record",
    currentTab: "T-008",
    initialState: {
      formValues: {
        merchantAcknowledged: true,
        sectionReference: "S-5",
        merchantObjection: "Blago je bilo označeno, vendar je nalepka padla na tla pred prihodom inšpektorja.",
        inspectorResponse: "Ugotovitev ostaja, ker je bila v času pregleda cena dejansko neoznačena.",
        status: "resolved",
      },
      globalVariables: {
        "HG-OBJECTION_COUNT": 1,
        "HG-UNRESOLVED_OBJECTIONS": 0,
      },
      completedTabs: ["T-001", "T-002", "T-003", "T-004", "T-005", "T2-1", "T-006", "T-007"],
    },
  },
};

/**
 * Complete inspection - all phases completed, ready for signatures.
 * Shows the final state before archiving with T-009 closing form.
 */
export const CompleteInspection: Story = {
  args: {
    configs: allConfigs,
    showDebugPanel: true,
    currentPhase: "closing",
    currentTab: "T-009",
    initialState: {
      formValues: {
        // Previous data
        A1: "ZAP-2024-001",
        A2: "2024-01-15",
        A3: "09:00",
        name: "Trgovina Novak d.o.o.",
        D1: "V PRODAJALNI",
        // T-009 Closing
        endDateTime: "2024-01-15T14:30",
        inspectorNotes: "Pregled zaključen brez posebnosti. Zavezanec je sodeloval.",
        finalStatus: "completed_with_findings",
      },
      globalVariables: {
        "HG-PROSTOR_NADZORA": "PROSTORIH ZAVEZANCA",
        "HG-PRODAJNI_PROSTOR": "V PRODAJALNI",
        "HG-POTROSNIKI": "DA",
        "HG-INSPECTION_FIELD_TYPE": "TRGOVINA",
        "HG-PARTICIPANT_COUNT": 1,
        "HG-FINDING_COUNT": 1,
        "HG-DECISION_COUNT": 1,
        "HG-OBJECTION_COUNT": 1,
        "HG-UNRESOLVED_OBJECTIONS": 0,
      },
      violations: [],
      completedTabs: [
        "T-001", "T-002", "T-003", "T-004",
        "T-005", "T2-1",
        "T-006", "T-007",
        "T-008",
      ],
    },
  },
};

/**
 * Conditional fields demo - shows how fields appear/disappear based on other values.
 * Focus on the Introduction tab (T-001) with conditional field logic.
 */
export const ConditionalFieldsDemo: Story = {
  args: {
    configs: allConfigs,
    showDebugPanel: true,
    currentPhase: "introduction",
    currentTab: "T-001",
    initialState: {
      formValues: {
        A7: "DA", // This enables A8 (other inspectors)
        A9: "PRIVATNIH PROSTORIH", // This enables A10-A14
        A10: "DA", // Person invited inspector
        A15: "DA", // Other persons cooperating
      },
      globalVariables: {},
    },
  },
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates conditional field visibility from actual T-001 config:
- Set A7 to "DA" to show A8 (additional inspectors - repeatable)
- Set A9 to "PRIVATNIH PROSTORIH" to show A10-A14 (private premises fields)
- Set A10 to "DA" to show A11-A13 (invitation details)
- Set A15 to "DA" to show A16-A18 (cooperating persons)
        `,
      },
    },
  },
};

/**
 * Company search form (T-002) - demonstrates entity search and mapping.
 */
export const CompanySearch: Story = {
  args: {
    configs: allConfigs,
    showDebugPanel: true,
    currentPhase: "introduction",
    currentTab: "T-002",
    initialState: {
      formValues: {},
      globalVariables: {},
      completedTabs: ["T-001"],
    },
  },
};

/**
 * Participants form (T-003) - repeatable section for multiple participants.
 */
export const ParticipantsForm: Story = {
  args: {
    configs: allConfigs,
    showDebugPanel: true,
    currentPhase: "introduction",
    currentTab: "T-003",
    initialState: {
      formValues: {
        name: "Janez",
        surname: "Novak",
        positionInCompany: "Direktor trgovine",
        contactInfo: "041 123 456",
      },
      globalVariables: {
        "HG-PARTICIPANT_COUNT": 1,
      },
      completedTabs: ["T-001", "T-002"],
    },
  },
};

/**
 * Field selection form (T-004) - card selector for inspection type.
 * Uses mockData to populate the card-selector with InspectionField entities.
 */
export const FieldSelection: Story = {
  args: {
    configs: allConfigs,
    showDebugPanel: true,
    currentPhase: "introduction",
    currentTab: "T-004",
    mockData: mockEntityData,
    initialState: {
      formValues: {},
      globalVariables: {},
      completedTabs: ["T-001", "T-002", "T-003"],
    },
  },
};

/**
 * Debug panel showcase - all features of the debug panel visible.
 * Shows global variables, local variables, violations, and completed tabs.
 */
export const DebugPanelShowcase: Story = {
  args: {
    configs: allConfigs,
    showDebugPanel: true,
    currentPhase: "content",
    currentTab: "T-005",
    initialState: {
      formValues: {
        A2: "2024-01-15",
        D1: "V PRODAJALNI",
        D2: "DA",
      },
      globalVariables: {
        "HG-PROSTOR_NADZORA": "PROSTORIH ZAVEZANCA",
        "HG-PRODAJNI_PROSTOR": "V PRODAJALNI",
        "HG-POTROSNIKI": "DA",
        "HG-INSPECTION_FIELD_TYPE": "TRGOVINA",
        "HG-PARTICIPANT_COUNT": 2,
      },
      localVariables: {
        "H-NADZOR": true,
        "H-NADALJUJ": true,
        "H-PRPSPPTRSKVT": true,
      },
      violations: [
        {
          id: "UPG-TEST",
          tabId: "T-005",
          fieldId: "D1",
          lawReference: "TEST 1/1",
          timestamp: new Date().toISOString(),
        },
      ],
      completedTabs: ["T-001", "T-002", "T-003", "T-004"],
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Shows the debug panel with all types of data: global variables (HG-*), local variables (H-*), violations, and completed tabs.",
      },
    },
  },
};
