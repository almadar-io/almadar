import type { Meta, StoryObj } from "@storybook/react";
import { SpecialExerciseCard, SpecialExerciseData } from "./SpecialExerciseCard";

const meta: Meta<typeof SpecialExerciseCard> = {
  title: "Blaz-Klemenc/Molecules/SpecialExerciseCard",
  component: SpecialExerciseCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SpecialExerciseCard>;

const baseExercise: SpecialExerciseData = {
  id: "se-1",
  entryType: "special_exercise",
  title: "Shoulder Rehabilitation",
  description: "Rotator cuff strengthening exercises for injury recovery",
  date: new Date(),
  status: "planned",
  sets: 3,
  reps: 15,
};

export const Default: Story = {
  args: {
    data: baseExercise,
  },
};

export const InProgress: Story = {
  args: {
    data: {
      ...baseExercise,
      title: "Core Stability Work",
      description: "Focus on deep core activation and anti-rotation exercises",
      status: "in_progress",
    },
  },
};

export const Completed: Story = {
  args: {
    data: {
      ...baseExercise,
      title: "Hip Mobility Routine",
      status: "completed",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
  },
};

export const WithInstructions: Story = {
  args: {
    data: {
      ...baseExercise,
      title: "Ankle Strengthening",
      instructions: "Perform slowly with control. Stop if any pain occurs. Focus on full range of motion.",
      sets: 2,
      reps: 20,
    },
  },
};

export const WithVideoUrl: Story = {
  args: {
    data: {
      ...baseExercise,
      title: "Foam Rolling Routine",
      videoUrl: "https://youtube.com/watch?v=example",
      instructions: "Follow the video for proper technique",
    },
  },
};

export const HighVolume: Story = {
  args: {
    data: {
      ...baseExercise,
      title: "Band Pull-Aparts",
      sets: 5,
      reps: 25,
      description: "Warm-up and postural correction exercise",
    },
  },
};

export const NoSetsReps: Story = {
  args: {
    data: {
      id: "se-2",
      entryType: "special_exercise",
      title: "Stretching Protocol",
      description: "Hold each stretch for 30 seconds, repeat 3 times",
      date: new Date(),
      status: "planned",
    },
  },
};

export const Compact: Story = {
  args: {
    data: baseExercise,
    compact: true,
  },
};

export const HideActions: Story = {
  args: {
    data: baseExercise,
    showActions: false,
  },
};
