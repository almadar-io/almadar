import type { Meta, StoryObj } from "@storybook/react";
import { FloatingActionMenu } from "./FloatingActionMenu";
import { Camera, FileText, UserPlus, AlertCircle } from "lucide-react";
import { Box } from "../../../components/atoms/Box";

const meta: Meta<typeof FloatingActionMenu> = {
  title: "Clients/Inspection-System/Organisms/FloatingActionMenu",
  component: FloatingActionMenu,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box className="relative h-[500px] bg-neutral-100 p-4">
        <Box className="p-4 bg-white rounded-lg shadow">
          <p className="text-neutral-600">
            Click the floating action button in the corner to see the menu expand.
          </p>
        </Box>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FloatingActionMenu>;

export const Default: Story = {
  args: {},
};

export const BottomLeft: Story = {
  args: {
    position: "bottom-left",
  },
};

export const BottomCenter: Story = {
  args: {
    position: "bottom-center",
  },
};

export const CustomActions: Story = {
  args: {
    actions: [
      {
        id: "photo",
        label: "Take Photo",
        icon: Camera,
        color: "text-blue-600",
        bgColor: "bg-blue-100",
      },
      {
        id: "note",
        label: "Add Note",
        icon: FileText,
        color: "text-green-600",
        bgColor: "bg-green-100",
      },
    ],
  },
};

export const WithContext: Story = {
  args: {
    context: {
      inspectionId: "insp-123",
      currentStep: "rule-check",
    },
    onAction: (actionId) => alert(`Action: ${actionId}`),
  },
};
