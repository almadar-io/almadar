import type { Meta, StoryObj } from "@storybook/react";
import { InspectionWizardTemplate } from "./InspectionWizardTemplate";
import { VStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { RuleCheckItem } from "../molecules/RuleCheckItem";
import { ParticipantList } from "../molecules/ParticipantList";
import { SignatureCapture } from "../organisms/SignatureCapture";

const meta: Meta<typeof InspectionWizardTemplate> = {
  title: "Clients/Inspection-System/Templates/InspectionWizardTemplate",
  component: InspectionWizardTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InspectionWizardTemplate>;

const sampleComplianceStats = {
  total: 25,
  compliant: 15,
  nonCompliant: 5,
  notChecked: 5,
  critical: 1,
  major: 3,
  minor: 1,
};

export const CompanyStep: Story = {
  args: {
    inspectionId: "insp-123",
    companyName: "Golden Dragon Restaurant",
    currentStep: "company",
    children: (
      <VStack gap="md">
        <Typography variant="h3">Company Information</Typography>
        <Typography variant="body" className="text-neutral-500">
          Verify the company details before proceeding with the inspection.
        </Typography>
        {/* Company form would go here */}
      </VStack>
    ),
  },
};

export const ParticipantsStep: Story = {
  args: {
    inspectionId: "insp-123",
    companyName: "Golden Dragon Restaurant",
    currentStep: "participants",
    children: (
      <ParticipantList
        inspectionId="insp-123"
        participants={[
          {
            id: "p1",
            name: "John",
            surname: "Smith",
            positionInCompany: "General Manager",
            contactInfo: "+1 555-0123",
          },
        ]}
      />
    ),
  },
};

export const RulesStep: Story = {
  args: {
    inspectionId: "insp-123",
    companyName: "Golden Dragon Restaurant",
    currentStep: "rules",
    complianceStats: sampleComplianceStats,
    children: (
      <VStack gap="md">
        <RuleCheckItem
          id="rule-1"
          description="Business premises must display valid operating license"
          gazetteNumber="2023/45"
          article="12"
          severity="major"
        />
        <RuleCheckItem
          id="rule-2"
          description="Fire extinguishers must be inspected within the last 12 months"
          gazetteNumber="2022/18"
          article="8"
          severity="critical"
          isCompliant={true}
        />
        <RuleCheckItem
          id="rule-3"
          description="Emergency exits must be clearly marked"
          gazetteNumber="2021/32"
          article="15"
          severity="critical"
          isCompliant={false}
          notes="Exit sign not illuminated"
        />
      </VStack>
    ),
  },
};

export const DocumentationStep: Story = {
  args: {
    inspectionId: "insp-123",
    companyName: "Golden Dragon Restaurant",
    currentStep: "documentation",
    children: (
      <VStack gap="md">
        <Typography variant="h3">Documentation</Typography>
        <Typography variant="body" className="text-neutral-500">
          Review and add any additional notes or evidence.
        </Typography>
      </VStack>
    ),
  },
};

export const SignaturesStep: Story = {
  args: {
    inspectionId: "insp-123",
    companyName: "Golden Dragon Restaurant",
    currentStep: "signatures",
    children: (
      <VStack gap="lg">
        <SignatureCapture
          title="Inspector Signature"
          participantName="Ahmad Hassan"
          participantId="inspector-1"
          required
        />
        <SignatureCapture
          title="Company Representative"
          participantName="John Smith"
          participantId="participant-1"
          required
        />
      </VStack>
    ),
  },
};

export const CannotProceed: Story = {
  args: {
    inspectionId: "insp-123",
    companyName: "Golden Dragon Restaurant",
    currentStep: "participants",
    canProceed: false,
    children: (
      <VStack gap="md">
        <Typography variant="h3">Participants Required</Typography>
        <Typography variant="body" className="text-red-500">
          At least one participant must be added before proceeding.
        </Typography>
      </VStack>
    ),
  },
};

export const NoFloatingMenu: Story = {
  args: {
    inspectionId: "insp-123",
    companyName: "Golden Dragon Restaurant",
    currentStep: "rules",
    showFloatingMenu: false,
    children: (
      <Typography variant="body">Floating menu is hidden</Typography>
    ),
  },
};
