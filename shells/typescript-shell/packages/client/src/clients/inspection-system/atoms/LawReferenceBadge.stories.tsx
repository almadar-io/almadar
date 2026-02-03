import type { Meta, StoryObj } from "@storybook/react";
import { LawReferenceBadge } from "./LawReferenceBadge";

const meta: Meta<typeof LawReferenceBadge> = {
  title: "Clients/Inspection-System/Atoms/LawReferenceBadge",
  component: LawReferenceBadge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof LawReferenceBadge>;

export const Default: Story = {
  args: {
    gazette: "2023/45",
    article: "12",
  },
};

export const GazetteOnly: Story = {
  args: {
    gazette: "2023/45",
  },
};

export const ArticleOnly: Story = {
  args: {
    article: "Article 15, Section 3",
  },
};

export const FullReference: Story = {
  args: {
    reference: "Law 45/2023, Art. 12, Para. 3",
  },
};

export const Small: Story = {
  args: {
    gazette: "2023/45",
    article: "12",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    gazette: "2023/45",
    article: "12",
    size: "lg",
  },
};

export const NoIcon: Story = {
  args: {
    gazette: "2023/45",
    article: "12",
    showIcon: false,
  },
};

export const Clickable: Story = {
  args: {
    gazette: "2023/45",
    article: "12",
    clickable: true,
    onClick: () => alert("Badge clicked!"),
  },
};
