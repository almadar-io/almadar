import type { Meta, StoryObj } from "@storybook/react";
import { ExerciseVideoLink } from "./ExerciseVideoLink";

const meta: Meta<typeof ExerciseVideoLink> = {
  title: "Blaz-Klemenc/Atoms/ExerciseVideoLink",
  component: ExerciseVideoLink,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ExerciseVideoLink>;

export const Default: Story = {
  args: {
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    exerciseName: "Squat Form Tutorial",
  },
};

export const DeadliftTechnique: Story = {
  args: {
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    exerciseName: "Deadlift Technique",
  },
};

export const LongExerciseName: Story = {
  args: {
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    exerciseName: "Complete Guide to Perfect Bench Press Form and Technique",
  },
};

export const Compact: Story = {
  args: {
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    exerciseName: "Quick Tips",
    compact: true,
  },
};

export const YoutubeShortUrl: Story = {
  args: {
    videoUrl: "https://youtu.be/dQw4w9WgXcQ",
    exerciseName: "Training Session Recording",
  },
};
