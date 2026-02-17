import type { Meta, StoryObj } from "@storybook/react";
import { LoginTemplate } from "./LoginTemplate";

const meta: Meta<typeof LoginTemplate> = {
  title: "Builder/Templates/LoginTemplate",
  component: LoginTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LoginTemplate>;

export const Default: Story = {
  args: {
    entity: {
      mode: "signIn",
      loading: false,
      error: null,
      email: "",
      password: "",
      displayName: "",
      emailForLinkCompletion: "",
    },
  },
};

export const SignUp: Story = {
  args: {
    entity: {
      mode: "signUp",
      loading: false,
      error: null,
      email: "",
      password: "",
      displayName: "",
      emailForLinkCompletion: "",
    },
  },
};

export const Loading: Story = {
  args: {
    entity: {
      mode: "signIn",
      loading: true,
      error: null,
      email: "user@example.com",
      password: "password123",
      displayName: "",
      emailForLinkCompletion: "",
    },
  },
};

export const WithError: Story = {
  args: {
    entity: {
      mode: "signIn",
      loading: false,
      error: "Invalid email or password. Please try again.",
      email: "user@example.com",
      password: "wrong",
      displayName: "",
      emailForLinkCompletion: "",
    },
  },
};

export const CompletingEmailLink: Story = {
  args: {
    entity: {
      mode: "completingEmailLink",
      loading: false,
      error: null,
      email: "",
      password: "",
      displayName: "",
      emailForLinkCompletion: "",
    },
  },
};
