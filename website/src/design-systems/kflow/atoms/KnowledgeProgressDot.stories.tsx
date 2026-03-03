import type { Meta, StoryObj } from "@storybook/react";
import { KnowledgeProgressDot } from "./KnowledgeProgressDot";
import type { LearningStatus } from "../types/knowledge";

const meta: Meta<typeof KnowledgeProgressDot> = {
  title: "KFlow/Atoms/KnowledgeProgressDot",
  component: KnowledgeProgressDot,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof KnowledgeProgressDot>;

export const Unexplored: Story = {
  args: { status: "unexplored" },
};

export const Curious: Story = {
  args: { status: "curious" },
};

export const Studying: Story = {
  args: { status: "studying" },
};

export const Understood: Story = {
  args: { status: "understood" },
};

export const Teaching: Story = {
  args: { status: "teaching" },
};

export const AllStatuses: Story = {
  render: () => {
    const statuses: LearningStatus[] = [
      "unexplored",
      "curious",
      "studying",
      "understood",
      "teaching",
    ];
    return (
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {statuses.map((s) => (
          <KnowledgeProgressDot key={s} status={s} size="lg" />
        ))}
      </div>
    );
  },
};
