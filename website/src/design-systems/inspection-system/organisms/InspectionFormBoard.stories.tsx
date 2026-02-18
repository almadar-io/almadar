import type { Meta, StoryObj } from "@storybook/react";
import { InspectionFormBoard } from "./InspectionFormBoard";
import type { InspectionFormEntity } from "./InspectionFormBoard";

const meta: Meta<typeof InspectionFormBoard> = {
  title: "Clients/Inspection-System/Organisms/InspectionFormBoard",
  component: InspectionFormBoard,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InspectionFormBoard>;

const sampleEntity: InspectionFormEntity = {
  configs: {
    "T-001": {
      tabId: "T-001",
      name: "General Information",
      globalVariablesSet: ["HG-COMPANY"],
      sections: [
        {
          id: "S-001",
          title: "Company Details",
          fields: [
            {
              id: "companyName",
              label: "Company Name",
              type: "text",
              required: true,
            },
            {
              id: "inspectionDate",
              label: "Inspection Date",
              type: "date",
              required: true,
            },
            {
              id: "inspectorNotes",
              label: "Inspector Notes",
              type: "textarea",
            },
          ],
        },
      ],
    },
    "T-002": {
      tabId: "T-002",
      name: "Compliance Check",
      sections: [
        {
          id: "S-002",
          title: "Safety Compliance",
          fields: [
            {
              id: "safetyCompliant",
              label: "Safety standards met",
              type: "checkbox",
            },
            {
              id: "complianceLevel",
              label: "Compliance Level",
              type: "dropdown",
              options: [
                { value: "full", label: "Full Compliance" },
                { value: "partial", label: "Partial Compliance" },
                { value: "none", label: "Non-Compliant" },
              ],
              defaultValue: "full",
            },
          ],
        },
      ],
    },
    "T-003": {
      tabId: "T-003",
      name: "Findings",
      sections: [
        {
          id: "S-003",
          title: "Inspection Findings",
          fields: [
            {
              id: "severity",
              label: "Violation Severity",
              type: "radio",
              options: [
                { value: "low", label: "Low" },
                { value: "medium", label: "Medium" },
                { value: "high", label: "High", isDefault: true },
              ],
            },
            {
              id: "categories",
              label: "Violation Categories",
              type: "multi-select",
              options: [
                { value: "safety", label: "Safety" },
                { value: "environmental", label: "Environmental" },
                { value: "labor", label: "Labor" },
              ],
            },
          ],
        },
      ],
    },
    "T-004": {
      tabId: "T-004",
      name: "Summary",
      sections: [
        {
          id: "S-004",
          title: "Inspection Summary",
          fields: [
            {
              id: "summary",
              label: "Summary",
              type: "info-display",
              displayContent: "Review all findings and prepare the final report.",
              displayVariant: "info",
            },
            {
              id: "fineAmount",
              label: "Proposed Fine (EUR)",
              type: "currency",
            },
          ],
        },
      ],
    },
    "T-005": {
      tabId: "T-005",
      name: "Detailed Review",
      sections: [
        {
          id: "S-005",
          title: "Document Review",
          fields: [
            {
              id: "checklist",
              label: "Document Checklist",
              type: "checklist",
              checklistItems: [
                { id: "business-license", label: "Business License", required: true },
                { id: "fire-cert", label: "Fire Safety Certificate" },
                { id: "insurance", label: "Insurance Documentation", required: true },
              ],
            },
          ],
        },
      ],
    },
    "T2-1": {
      tabId: "T2-1",
      name: "Supplemental",
      sections: [
        {
          id: "S-006",
          title: "Additional Notes",
          fields: [
            { id: "additionalNotes", label: "Additional Notes", type: "textarea" },
          ],
        },
      ],
    },
    "T-006": {
      tabId: "T-006",
      name: "Preparation Step 1",
      sections: [
        {
          id: "S-007",
          title: "Preparation",
          fields: [
            { id: "prepNotes", label: "Preparation Notes", type: "text" },
          ],
        },
      ],
    },
    "T-007": {
      tabId: "T-007",
      name: "Preparation Step 2",
      sections: [
        {
          id: "S-008",
          title: "Final Preparation",
          fields: [
            { id: "finalPrep", label: "Final Preparation Notes", type: "textarea" },
          ],
        },
      ],
    },
    "T-008": {
      tabId: "T-008",
      name: "Official Record",
      sections: [
        {
          id: "S-009",
          title: "Record Details",
          fields: [
            { id: "recordDate", label: "Record Date", type: "datetime" },
            { id: "recordNotes", label: "Record Notes", type: "textarea" },
          ],
        },
      ],
    },
    "T-009": {
      tabId: "T-009",
      name: "Closing Signature",
      sections: [
        {
          id: "S-010",
          title: "Signatures",
          fields: [
            {
              id: "inspectorSignature",
              label: "Inspector Signature",
              type: "signature",
              required: true,
            },
          ],
        },
      ],
    },
  },
};

export const Default: Story = {
  args: {
    entity: sampleEntity,
    showDebugPanel: false,
    fieldChangedEvent: "FIELD_CHANGED",
    tabChangedEvent: "TAB_CHANGED",
    phaseChangedEvent: "PHASE_CHANGED",
    previousEvent: "PREVIOUS",
    nextEvent: "NEXT",
    completeEvent: "COMPLETE",
  },
};

export const WithDebugPanel: Story = {
  args: {
    entity: sampleEntity,
    showDebugPanel: true,
    fieldChangedEvent: "FIELD_CHANGED",
  },
};

export const WithInitialState: Story = {
  args: {
    entity: {
      ...sampleEntity,
      initialState: {
        formValues: {
          companyName: "Acme Corporation",
          inspectionDate: "2026-02-18",
          safetyCompliant: true,
          complianceLevel: "partial",
        },
        completedTabs: ["T-001"],
        globalVariables: {
          "HG-COMPANY": "Acme Corporation",
        },
      },
    },
    showDebugPanel: true,
    currentTab: "T-002",
  },
};

export const StartingAtContentPhase: Story = {
  args: {
    entity: sampleEntity,
    showDebugPanel: false,
    currentPhase: "content",
    currentTab: "T-005",
  },
};
