import type { Meta, StoryObj } from "@storybook/react";
import { ResourceLink } from "./ResourceLink";

const meta: Meta<typeof ResourceLink> = {
  title: "KFlow/Molecules/ResourceLink",
  component: ResourceLink,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ResourceLink>;

export const WithTitle: Story = {
  args: {
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures",
    title: "MDN: Closures",
    domain: "formal",
  },
};

export const AutoTitle: Story = {
  args: {
    url: "https://stackoverflow.com/questions/111102/how-do-javascript-closures-work",
  },
};

export const WithDomain: Story = {
  args: {
    url: "https://en.wikipedia.org/wiki/Newtonian_mechanics",
    title: "Wikipedia: Newtonian Mechanics",
    domain: "natural",
  },
};

export const NoDomain: Story = {
  args: {
    url: "https://github.com/thejameskyle/itsy-bitsy-data-structures",
    title: "Itsy Bitsy Data Structures",
  },
};
