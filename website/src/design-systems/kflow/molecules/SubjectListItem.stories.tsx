import type { Meta, StoryObj } from "@storybook/react";
import { SubjectListItem } from "./SubjectListItem";
import type { KnowledgeSubject } from "../types/knowledge";

const meta: Meta<typeof SubjectListItem> = {
  title: "KFlow/Molecules/SubjectListItem",
  component: SubjectListItem,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 700 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SubjectListItem>;

const jsSubject: KnowledgeSubject = {
  id: "formal-cs-javascript",
  name: "JavaScript",
  domain: "formal",
  discipline: "Computer Science",
  nodeCount: 371,
  maxDepth: 9,
  fileSize: 241022,
  rootNodeId: "javascript-javascript",
};

const physicsSubject: KnowledgeSubject = {
  id: "natural-physics",
  name: "Physics",
  domain: "natural",
  discipline: "Physics",
  nodeCount: 245,
  maxDepth: 7,
  fileSize: 190787,
  rootNodeId: "physics-physics",
};

const spanishSubject: KnowledgeSubject = {
  id: "social-lang-spanish",
  name: "Spanish",
  domain: "social",
  discipline: "Languages",
  nodeCount: 180,
  maxDepth: 6,
  fileSize: 186000,
  rootNodeId: "spanish-spanish",
};

export const Default: Story = {
  args: { subject: jsSubject, selectSubjectEvent: "SELECT_SUBJECT" },
};

export const Natural: Story = {
  args: { subject: physicsSubject },
};

export const Social: Story = {
  args: { subject: spanishSubject },
};

export const AllSubjects: Story = {
  render: () => (
    <div>
      <SubjectListItem subject={jsSubject} selectSubjectEvent="SELECT_SUBJECT" />
      <SubjectListItem subject={physicsSubject} selectSubjectEvent="SELECT_SUBJECT" />
      <SubjectListItem subject={spanishSubject} selectSubjectEvent="SELECT_SUBJECT" />
    </div>
  ),
};
