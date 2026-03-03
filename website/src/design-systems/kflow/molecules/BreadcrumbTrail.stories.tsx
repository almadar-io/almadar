import type { Meta, StoryObj } from "@storybook/react";
import { BreadcrumbTrail } from "./BreadcrumbTrail";

const meta: Meta<typeof BreadcrumbTrail> = {
  title: "KFlow/Molecules/BreadcrumbTrail",
  component: BreadcrumbTrail,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BreadcrumbTrail>;

export const FullPath: Story = {
  args: {
    domain: "formal",
    segments: [
      { label: "Formal", type: "domain", id: "formal" },
      { label: "Computer Science", type: "discipline", id: "cs" },
      { label: "JavaScript", type: "subject", id: "js" },
      { label: "Closures", type: "concept", id: "js-closures" },
    ],
    navigateEvent: "NAVIGATE_BREADCRUMB",
  },
};

export const SubjectLevel: Story = {
  args: {
    domain: "natural",
    segments: [
      { label: "Natural", type: "domain", id: "natural" },
      { label: "Physics", type: "discipline", id: "physics" },
      { label: "Mechanics", type: "subject", id: "mechanics" },
    ],
    navigateEvent: "NAVIGATE_BREADCRUMB",
  },
};

export const DomainOnly: Story = {
  args: {
    domain: "social",
    segments: [
      { label: "Social", type: "domain", id: "social" },
    ],
  },
};
