import type { Meta, StoryObj } from "@storybook/react";
import { SignatureCapture } from "./SignatureCapture";
import { VStack } from "../../../components/atoms/Stack";

const meta: Meta<typeof SignatureCapture> = {
  title: "Clients/Inspection-System/Organisms/SignatureCapture",
  component: SignatureCapture,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SignatureCapture>;

export const Default: Story = {
  args: {
    participantName: "John Smith",
    participantId: "p-123",
  },
};

export const Required: Story = {
  args: {
    participantName: "John Smith",
    participantId: "p-123",
    required: true,
  },
};

export const CustomSize: Story = {
  args: {
    participantName: "Sarah Johnson",
    width: 500,
    height: 150,
  },
};

export const CustomStyle: Story = {
  args: {
    participantName: "Mike Williams",
    strokeColor: "#2563eb",
    strokeWidth: 3,
  },
};

export const Disabled: Story = {
  args: {
    participantName: "Completed Signature",
    disabled: true,
  },
};

export const WithHandlers: Story = {
  args: {
    participantName: "John Smith",
    participantId: "p-123",
    onCapture: (data) => console.log("Signature captured:", data.substring(0, 50) + "..."),
    onClear: () => console.log("Signature cleared"),
  },
};

export const InspectorSignature: Story = {
  args: {
    title: "Inspector Signature",
    participantName: "Inspector Ahmad Hassan",
    participantId: "inspector-1",
    instructions: "I confirm that this inspection was conducted according to regulations",
    required: true,
  },
};

export const MultipleSignatures: Story = {
  render: () => (
    <VStack gap="lg">
      <SignatureCapture
        title="Inspector Signature"
        participantName="Inspector Ahmad"
        participantId="inspector-1"
        required
      />
      <SignatureCapture
        title="Company Representative"
        participantName="John Smith (Manager)"
        participantId="participant-1"
        required
      />
      <SignatureCapture
        title="Witness (Optional)"
        participantName="Sarah Johnson"
        participantId="participant-2"
      />
    </VStack>
  ),
};
