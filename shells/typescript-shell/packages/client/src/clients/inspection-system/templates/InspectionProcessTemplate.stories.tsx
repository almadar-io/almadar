import type { Meta, StoryObj } from "@storybook/react";
import {
  InspectionProcessTemplate,
  InspectionData,
  ProcessPhase,
  ProcessStep,
} from "./InspectionProcessTemplate";

const meta: Meta<typeof InspectionProcessTemplate> = {
  title: "Clients/Inspection-System/Templates/InspectionProcessTemplate",
  component: InspectionProcessTemplate,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# Inspection Process Template

A comprehensive template representing the **entire inspection workflow** with all 5 phases:

## Phases

1. **Introduction Phase**
   - Case Info: Inspector, start time, accompanying persons
   - Company Data: Search and select company
   - Participants: Add company representatives (min 1 required)
   - Field Selection: Choose inspection type

2. **Content Phase**
   - Rule Checking: Work through all rules for selected field
   - Floating Action Menu for ad-hoc actions (add participant, collect document, pause, SOS)

3. **Preparation Phase**
   - Findings: Document formal findings from non-compliant rules
   - Decisions: Create orders/actions with deadlines

4. **Record Phase**
   - Document Generation: Compile and preview inspection record
   - Merchant Review: Present to merchant
   - Objections: Record and resolve objections

5. **Closing Phase**
   - End Time: Record inspection end
   - Signatures: Capture inspector and merchant signatures
   - Complete: Final summary and archive

## Features

- Uses all inspection-system atoms, molecules, and organisms
- Implements closed circuit pattern with useEventBus
- Guard validation for proceeding (e.g., min participants, all rules checked)
- Floating action menu during content phase
- Document preview and signature capture
- Progress tracking across all steps
        `,
      },
    },
  },
  argTypes: {
    onPhaseChange: { action: "phaseChanged" },
    onStepChange: { action: "stepChanged" },
    onDataUpdate: { action: "dataUpdated" },
    onCompanySearch: { action: "companySearched" },
    onSaveDraft: { action: "draftSaved" },
    onComplete: { action: "completed" },
  },
};

export default meta;
type Story = StoryObj<typeof InspectionProcessTemplate>;

// Sample data
const sampleInspector = {
  id: "insp-1",
  name: "Janez",
  surname: "Novak",
  department: "Market Inspection",
  badgeNumber: "SI-1234",
};

const sampleCompany = {
  id: "comp-1",
  name: "ABC Trading d.o.o.",
  legalName: "ABC Trading družba z omejeno odgovornostjo",
  registrationNumber: "1234567890",
  taxNumber: "SI12345678",
  address: {
    street: "Slovenska cesta 50",
    city: "Ljubljana",
    postalCode: "1000",
  },
};

const sampleParticipants = [
  {
    id: "part-1",
    name: "Marija",
    surname: "Horvat",
    positionInCompany: "Director",
    contactInfo: "marija@abc-trading.si",
  },
  {
    id: "part-2",
    name: "Peter",
    surname: "Kranjc",
    positionInCompany: "Quality Manager",
    contactInfo: "peter@abc-trading.si",
  },
];

const sampleRules = [
  {
    id: "rule-1",
    ruleText: "Business premises must display valid operating license",
    lawReference: { gazetteNumber: "43/07", article: "Art. 12" },
    severity: "critical" as const,
    canBeSkipped: false,
  },
  {
    id: "rule-2",
    ruleText: "Price list must be visible to customers",
    lawReference: { gazetteNumber: "43/07", article: "Art. 15" },
    severity: "major" as const,
    canBeSkipped: false,
  },
  {
    id: "rule-3",
    ruleText: "All products must have valid expiration dates displayed",
    lawReference: { gazetteNumber: "21/14", article: "Art. 8" },
    severity: "critical" as const,
    canBeSkipped: false,
  },
  {
    id: "rule-4",
    ruleText: "Staff must have valid health certificates",
    lawReference: { gazetteNumber: "33/09", article: "Art. 22" },
    severity: "major" as const,
    canBeSkipped: false,
  },
  {
    id: "rule-5",
    ruleText: "Fire extinguisher must be accessible and within inspection date",
    lawReference: { gazetteNumber: "52/07", article: "Art. 45" },
    severity: "minor" as const,
    canBeSkipped: true,
  },
];

const sampleFields = [
  {
    id: "field-1",
    name: "Merchants",
    description: "General merchant compliance inspection",
    ruleCount: 58,
  },
  {
    id: "field-2",
    name: "Food Safety",
    description: "Food handling and safety compliance",
    ruleCount: 72,
  },
  {
    id: "field-3",
    name: "Labor Law",
    description: "Employment and worker safety compliance",
    ruleCount: 45,
  },
];

const createBaseData = (
  overrides: Partial<InspectionData> = {},
): InspectionData => ({
  id: "insp-2024-001",
  caseNumber: "INS-2024-001234",
  inspector: undefined,
  company: undefined,
  participants: [],
  accompanyingPersons: [],
  selectedField: undefined,
  rules: [],
  ruleChecks: {},
  findings: [],
  decisions: [],
  objections: [],
  collectedDocuments: [],
  startDateTime: undefined,
  endDateTime: undefined,
  inspectorSignature: undefined,
  merchantSignature: undefined,
  currentPhase: "introduction",
  currentStep: "case-info",
  timeline: [],
  ...overrides,
});

// =============================================================================
// Stories for each phase/step
// =============================================================================

export const Introduction_CaseInfo: Story = {
  name: "1.1 Introduction - Case Info",
  args: {
    data: createBaseData(),
    availableInspectors: [sampleInspector],
    availableFields: sampleFields,
  },
};

export const Introduction_CompanyData: Story = {
  name: "1.2 Introduction - Company Data",
  args: {
    data: createBaseData({
      inspector: sampleInspector,
      startDateTime: "2024-01-15T09:00",
      currentStep: "company-data",
    }),
    availableInspectors: [sampleInspector],
    availableFields: sampleFields,
    companySearchResults: [
      { id: "comp-1", label: "ABC Trading d.o.o.", sublabel: "1234567890" },
      { id: "comp-2", label: "XYZ Import d.o.o.", sublabel: "0987654321" },
    ],
  },
};

export const Introduction_Participants: Story = {
  name: "1.3 Introduction - Participants",
  args: {
    data: createBaseData({
      inspector: sampleInspector,
      company: sampleCompany,
      startDateTime: "2024-01-15T09:00",
      currentStep: "participants",
    }),
    availableInspectors: [sampleInspector],
    availableFields: sampleFields,
  },
};

export const Introduction_FieldSelection: Story = {
  name: "1.4 Introduction - Field Selection",
  args: {
    data: createBaseData({
      inspector: sampleInspector,
      company: sampleCompany,
      participants: sampleParticipants,
      startDateTime: "2024-01-15T09:00",
      currentStep: "field-selection",
    }),
    availableInspectors: [sampleInspector],
    availableFields: sampleFields,
  },
};

export const Content_RuleChecking: Story = {
  name: "2.1 Content - Rule Checking",
  args: {
    data: createBaseData({
      inspector: sampleInspector,
      company: sampleCompany,
      participants: sampleParticipants,
      selectedField: sampleFields[0],
      rules: sampleRules,
      startDateTime: "2024-01-15T09:00",
      currentPhase: "content",
      currentStep: "rule-checking",
      ruleChecks: {
        "rule-1": { ruleId: "rule-1", answer: "compliant", photos: [] },
        "rule-2": {
          ruleId: "rule-2",
          answer: "non-compliant",
          notes: "Price list not visible from entrance",
          photos: [],
        },
      },
    }),
    availableInspectors: [sampleInspector],
    availableFields: sampleFields,
  },
};

export const Content_RuleCheckingComplete: Story = {
  name: "2.2 Content - All Rules Checked",
  args: {
    data: createBaseData({
      inspector: sampleInspector,
      company: sampleCompany,
      participants: sampleParticipants,
      selectedField: sampleFields[0],
      rules: sampleRules,
      startDateTime: "2024-01-15T09:00",
      currentPhase: "content",
      currentStep: "rule-checking",
      ruleChecks: {
        "rule-1": { ruleId: "rule-1", answer: "compliant", photos: [] },
        "rule-2": {
          ruleId: "rule-2",
          answer: "non-compliant",
          notes: "Price list not visible",
          photos: [],
        },
        "rule-3": { ruleId: "rule-3", answer: "compliant", photos: [] },
        "rule-4": {
          ruleId: "rule-4",
          answer: "non-compliant",
          notes: "2 staff members missing certificates",
          photos: [],
        },
        "rule-5": { ruleId: "rule-5", answer: "compliant", photos: [] },
      },
    }),
    availableInspectors: [sampleInspector],
    availableFields: sampleFields,
  },
};

export const Preparation_Findings: Story = {
  name: "3.1 Preparation - Findings",
  args: {
    data: createBaseData({
      inspector: sampleInspector,
      company: sampleCompany,
      participants: sampleParticipants,
      selectedField: sampleFields[0],
      rules: sampleRules,
      startDateTime: "2024-01-15T09:00",
      currentPhase: "preparation",
      currentStep: "findings",
      ruleChecks: {
        "rule-1": { ruleId: "rule-1", answer: "compliant", photos: [] },
        "rule-2": {
          ruleId: "rule-2",
          answer: "non-compliant",
          notes: "Price list not visible",
          photos: [],
        },
        "rule-3": { ruleId: "rule-3", answer: "compliant", photos: [] },
        "rule-4": {
          ruleId: "rule-4",
          answer: "non-compliant",
          notes: "2 staff members missing certificates",
          photos: [],
        },
        "rule-5": { ruleId: "rule-5", answer: "compliant", photos: [] },
      },
    }),
    availableInspectors: [sampleInspector],
    availableFields: sampleFields,
  },
};

export const Preparation_Decisions: Story = {
  name: "3.2 Preparation - Decisions",
  args: {
    data: createBaseData({
      inspector: sampleInspector,
      company: sampleCompany,
      participants: sampleParticipants,
      selectedField: sampleFields[0],
      rules: sampleRules,
      startDateTime: "2024-01-15T09:00",
      currentPhase: "preparation",
      currentStep: "decisions",
      ruleChecks: {
        "rule-1": { ruleId: "rule-1", answer: "compliant", photos: [] },
        "rule-2": {
          ruleId: "rule-2",
          answer: "non-compliant",
          notes: "Price list not visible",
          photos: [],
        },
        "rule-3": { ruleId: "rule-3", answer: "compliant", photos: [] },
        "rule-4": {
          ruleId: "rule-4",
          answer: "non-compliant",
          notes: "2 staff members missing certificates",
          photos: [],
        },
        "rule-5": { ruleId: "rule-5", answer: "compliant", photos: [] },
      },
      findings: [
        {
          id: "find-1",
          description:
            "Price list not displayed in a visible location for customers",
          severity: "major",
          relatedRuleIds: ["rule-2"],
          recommendation: "Install price list display at entrance",
        },
        {
          id: "find-2",
          description:
            "Two staff members working without valid health certificates",
          severity: "major",
          relatedRuleIds: ["rule-4"],
          recommendation: "Obtain health certificates within 15 days",
        },
      ],
    }),
    availableInspectors: [sampleInspector],
    availableFields: sampleFields,
  },
};

export const Record_DocumentGeneration: Story = {
  name: "4.1 Record - Document Generation",
  args: {
    data: createBaseData({
      inspector: sampleInspector,
      company: sampleCompany,
      participants: sampleParticipants,
      selectedField: sampleFields[0],
      rules: sampleRules,
      startDateTime: "2024-01-15T09:00",
      currentPhase: "record",
      currentStep: "document-generation",
      ruleChecks: {
        "rule-1": { ruleId: "rule-1", answer: "compliant", photos: [] },
        "rule-2": {
          ruleId: "rule-2",
          answer: "non-compliant",
          notes: "Price list not visible",
          photos: [],
        },
        "rule-3": { ruleId: "rule-3", answer: "compliant", photos: [] },
        "rule-4": {
          ruleId: "rule-4",
          answer: "non-compliant",
          notes: "Missing certificates",
          photos: [],
        },
        "rule-5": { ruleId: "rule-5", answer: "compliant", photos: [] },
      },
      findings: [
        {
          id: "find-1",
          description: "Price list violation",
          severity: "major",
          relatedRuleIds: ["rule-2"],
          recommendation: "Fix display",
        },
      ],
      decisions: [
        {
          id: "dec-1",
          orderText: "Display price list at entrance",
          deadline: "2024-02-01",
          relatedFindingIds: ["find-1"],
          status: "pending",
        },
      ],
    }),
    availableInspectors: [sampleInspector],
    availableFields: sampleFields,
  },
};

export const Record_MerchantReview: Story = {
  name: "4.2 Record - Merchant Review",
  args: {
    data: createBaseData({
      inspector: sampleInspector,
      company: sampleCompany,
      participants: sampleParticipants,
      selectedField: sampleFields[0],
      startDateTime: "2024-01-15T09:00",
      currentPhase: "record",
      currentStep: "merchant-review",
      rules: sampleRules,
      ruleChecks: {
        "rule-1": { ruleId: "rule-1", answer: "compliant", photos: [] },
        "rule-2": {
          ruleId: "rule-2",
          answer: "non-compliant",
          notes: "Price list not visible",
          photos: [],
        },
        "rule-3": { ruleId: "rule-3", answer: "compliant", photos: [] },
        "rule-4": {
          ruleId: "rule-4",
          answer: "non-compliant",
          notes: "Missing certificates",
          photos: [],
        },
        "rule-5": { ruleId: "rule-5", answer: "compliant", photos: [] },
      },
    }),
    availableInspectors: [sampleInspector],
    availableFields: sampleFields,
  },
};

export const Record_Objections: Story = {
  name: "4.3 Record - Objections",
  args: {
    data: createBaseData({
      inspector: sampleInspector,
      company: sampleCompany,
      participants: sampleParticipants,
      selectedField: sampleFields[0],
      startDateTime: "2024-01-15T09:00",
      currentPhase: "record",
      currentStep: "objections",
      rules: sampleRules,
      ruleChecks: {
        "rule-1": { ruleId: "rule-1", answer: "compliant", photos: [] },
        "rule-2": {
          ruleId: "rule-2",
          answer: "non-compliant",
          notes: "Price list not visible",
          photos: [],
        },
        "rule-3": { ruleId: "rule-3", answer: "compliant", photos: [] },
        "rule-4": {
          ruleId: "rule-4",
          answer: "non-compliant",
          notes: "Missing certificates",
          photos: [],
        },
        "rule-5": { ruleId: "rule-5", answer: "compliant", photos: [] },
      },
      objections: [
        {
          id: "obj-1",
          sectionRef: "5.2",
          objectionText:
            "The price list was displayed but inspector did not check the back room",
          status: "pending",
        },
      ],
    }),
    availableInspectors: [sampleInspector],
    availableFields: sampleFields,
  },
};

export const Closing_EndTime: Story = {
  name: "5.1 Closing - End Time",
  args: {
    data: createBaseData({
      inspector: sampleInspector,
      company: sampleCompany,
      participants: sampleParticipants,
      selectedField: sampleFields[0],
      startDateTime: "2024-01-15T09:00",
      currentPhase: "closing",
      currentStep: "end-time",
      rules: sampleRules,
      ruleChecks: {
        "rule-1": { ruleId: "rule-1", answer: "compliant", photos: [] },
        "rule-2": {
          ruleId: "rule-2",
          answer: "non-compliant",
          notes: "Price list not visible",
          photos: [],
        },
        "rule-3": { ruleId: "rule-3", answer: "compliant", photos: [] },
        "rule-4": {
          ruleId: "rule-4",
          answer: "non-compliant",
          notes: "Missing certificates",
          photos: [],
        },
        "rule-5": { ruleId: "rule-5", answer: "compliant", photos: [] },
      },
      timeline: [
        {
          id: "t1",
          timestamp: "2024-01-15T09:00",
          type: "start",
          title: "Inspection Started",
          description: "Inspection began",
        },
        {
          id: "t2",
          timestamp: "2024-01-15T09:15",
          type: "note",
          title: "Introduction Complete",
          description: "Completed case info",
        },
        {
          id: "t3",
          timestamp: "2024-01-15T09:30",
          type: "rule_checked",
          title: "Rule Checking Started",
          description: "Rule checking started",
        },
        {
          id: "t4",
          timestamp: "2024-01-15T11:00",
          type: "finding",
          title: "Findings Recorded",
          description: "Findings recorded",
        },
        {
          id: "t5",
          timestamp: "2024-01-15T11:30",
          type: "document",
          title: "Document Generated",
          description: "Document generated",
        },
      ],
    }),
    availableInspectors: [sampleInspector],
    availableFields: sampleFields,
  },
};

export const Closing_Signatures: Story = {
  name: "5.2 Closing - Signatures",
  args: {
    data: createBaseData({
      inspector: sampleInspector,
      company: sampleCompany,
      participants: sampleParticipants,
      selectedField: sampleFields[0],
      startDateTime: "2024-01-15T09:00",
      endDateTime: "2024-01-15T12:00",
      currentPhase: "closing",
      currentStep: "signatures",
      rules: sampleRules,
      ruleChecks: {
        "rule-1": { ruleId: "rule-1", answer: "compliant", photos: [] },
        "rule-2": {
          ruleId: "rule-2",
          answer: "non-compliant",
          notes: "Price list not visible",
          photos: [],
        },
        "rule-3": { ruleId: "rule-3", answer: "compliant", photos: [] },
        "rule-4": {
          ruleId: "rule-4",
          answer: "non-compliant",
          notes: "Missing certificates",
          photos: [],
        },
        "rule-5": { ruleId: "rule-5", answer: "compliant", photos: [] },
      },
    }),
    availableInspectors: [sampleInspector],
    availableFields: sampleFields,
  },
};

export const Closing_Complete: Story = {
  name: "5.3 Closing - Complete",
  args: {
    data: createBaseData({
      inspector: sampleInspector,
      company: sampleCompany,
      participants: sampleParticipants,
      selectedField: sampleFields[0],
      startDateTime: "2024-01-15T09:00",
      endDateTime: "2024-01-15T12:00",
      currentPhase: "closing",
      currentStep: "complete",
      rules: sampleRules,
      ruleChecks: {
        "rule-1": { ruleId: "rule-1", answer: "compliant", photos: [] },
        "rule-2": {
          ruleId: "rule-2",
          answer: "non-compliant",
          notes: "Price list not visible",
          photos: [],
        },
        "rule-3": { ruleId: "rule-3", answer: "compliant", photos: [] },
        "rule-4": {
          ruleId: "rule-4",
          answer: "non-compliant",
          notes: "Missing certificates",
          photos: [],
        },
        "rule-5": { ruleId: "rule-5", answer: "compliant", photos: [] },
      },
      findings: [
        {
          id: "find-1",
          description: "Price list violation",
          severity: "major",
          relatedRuleIds: ["rule-2"],
          recommendation: "Fix display",
        },
        {
          id: "find-2",
          description: "Missing health certificates",
          severity: "major",
          relatedRuleIds: ["rule-4"],
          recommendation: "Obtain certificates",
        },
      ],
      decisions: [
        {
          id: "dec-1",
          orderText: "Display price list",
          deadline: "2024-02-01",
          relatedFindingIds: ["find-1"],
          status: "pending",
        },
        {
          id: "dec-2",
          orderText: "Obtain health certificates",
          deadline: "2024-02-01",
          relatedFindingIds: ["find-2"],
          status: "pending",
        },
      ],
      inspectorSignature: "data:image/png;base64,signature1...",
      merchantSignature: "data:image/png;base64,signature2...",
    }),
    availableInspectors: [sampleInspector],
    availableFields: sampleFields,
  },
};
