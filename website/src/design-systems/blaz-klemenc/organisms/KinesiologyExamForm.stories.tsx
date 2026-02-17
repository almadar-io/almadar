import type { Meta, StoryObj } from "@storybook/react";
import { KinesiologyExamForm, KinesiologyExamData } from "./KinesiologyExamForm";

const meta: Meta<typeof KinesiologyExamForm> = {
  title: "Blaz-Klemenc/Organisms/KinesiologyExamForm",
  component: KinesiologyExamForm,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    traineeId: {
      control: "text",
      description: "Trainee ID for the examination",
    },
    trainerId: {
      control: "text",
      description: "Trainer ID conducting the examination",
    },
  },
};

export default meta;
type Story = StoryObj<typeof KinesiologyExamForm>;

// Sample existing exam data for editing
const existingExam: KinesiologyExamData = {
  id: "exam-1",
  traineeId: "trainee-1",
  trainerId: "trainer-1",
  date: new Date().toISOString().split("T")[0],
  posturalAssessment:
    "Slight anterior pelvic tilt observed. Right shoulder slightly elevated compared to left. Forward head posture present.",
  movementPatterns:
    "Good hip hinge pattern. Knee valgus present during squatting movements, more pronounced on left side. Adequate ankle dorsiflexion.",
  muscleAssessments: [
    {
      muscle: "Quadriceps",
      side: "both",
      strength: 4,
      flexibility: 3,
      notes: "Good strength, slightly tight",
    },
    {
      muscle: "Hamstrings",
      side: "both",
      strength: 3,
      flexibility: 2,
      notes: "Needs flexibility work",
    },
    {
      muscle: "Glutes",
      side: "left",
      strength: 3,
      flexibility: 3,
      notes: "Weaker than right side",
    },
    {
      muscle: "Glutes",
      side: "right",
      strength: 4,
      flexibility: 3,
      notes: "Good activation",
    },
    {
      muscle: "Core",
      side: "both",
      strength: 3,
      flexibility: 4,
      notes: "Focus on anti-rotation exercises",
    },
    {
      muscle: "Hip Flexors",
      side: "both",
      strength: 3,
      flexibility: 2,
      notes: "Very tight, contributing to pelvic tilt",
    },
  ],
  recommendations:
    "Focus on hip flexor stretching and glute activation exercises. Include single-leg work to address left-right imbalances. Prioritize core stability before progressing to heavier compound lifts.",
  notes:
    "Client reports occasional lower back discomfort after prolonged sitting. No acute pain during assessment.",
};

const minimalExam: KinesiologyExamData = {
  id: "exam-2",
  traineeId: "trainee-2",
  trainerId: "trainer-1",
  date: new Date().toISOString().split("T")[0],
  posturalAssessment: "Generally good posture with minor deviations.",
  movementPatterns: "",
  muscleAssessments: [
    {
      muscle: "Quadriceps",
      side: "both",
      strength: 4,
      flexibility: 4,
    },
    {
      muscle: "Hamstrings",
      side: "both",
      strength: 4,
      flexibility: 4,
    },
  ],
  recommendations: "Continue current training program.",
  notes: "",
};

export const Default: Story = {
  args: {
    traineeId: "trainee-1",
    trainerId: "trainer-1",
  },
};

export const WithExistingData: Story = {
  args: {
    traineeId: "trainee-1",
    trainerId: "trainer-1",
    existingExam: existingExam,
  },
};

export const MinimalExistingData: Story = {
  args: {
    traineeId: "trainee-2",
    trainerId: "trainer-1",
    existingExam: minimalExam,
  },
};

export const WithCancelButton: Story = {
  args: {
    traineeId: "trainee-1",
    trainerId: "trainer-1",
    onCancel: () => console.log("Cancel clicked"),
  },
};

export const EditMode: Story = {
  args: {
    traineeId: "trainee-1",
    trainerId: "trainer-1",
    existingExam: existingExam,
    onCancel: () => console.log("Cancel clicked"),
  },
};

export const NewAssessment: Story = {
  args: {
    traineeId: "trainee-3",
    trainerId: "trainer-1",
    onCancel: () => console.log("Cancel clicked"),
  },
};
