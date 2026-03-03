import type { Meta, StoryObj } from "@storybook/react";
import { CrossDomainDiscoveryBoard } from "./CrossDomainDiscoveryBoard";
import type { KnowledgeNode } from "../types/knowledge";

const meta: Meta<typeof CrossDomainDiscoveryBoard> = {
  title: "KFlow/Organisms/CrossDomainDiscoveryBoard",
  component: CrossDomainDiscoveryBoard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CrossDomainDiscoveryBoard>;

const makeNode = (id: string, title: string, domain: "formal" | "natural" | "social", subject: string): KnowledgeNode => ({
  id, title, description: `A concept about ${title.toLowerCase()}.`, domain,
  discipline: subject, subject, depth: 2, parentId: "", childIds: [],
  resourceUrls: [], notes: "", nodeType: "concept",
});

export const Default: Story = {
  args: {
    entity: {
      discoveries: [
        {
          sharedTerm: "Symmetry",
          nodes: [
            makeNode("math-symmetry", "Symmetry Groups", "formal", "Mathematics"),
            makeNode("phys-symmetry", "Physical Symmetry", "natural", "Physics"),
          ],
          isNew: true,
        },
        {
          sharedTerm: "Optimization",
          nodes: [
            makeNode("cs-optimization", "Algorithm Optimization", "formal", "Computer Science"),
            makeNode("econ-optimization", "Economic Optimization", "social", "Economics"),
            makeNode("bio-evolution", "Natural Selection", "natural", "Biology"),
          ],
          isNew: false,
        },
      ],
      bonusesUnlocked: 50,
    },
  },
};

export const Empty: Story = {
  args: {
    entity: { discoveries: [], bonusesUnlocked: 0 },
  },
};
