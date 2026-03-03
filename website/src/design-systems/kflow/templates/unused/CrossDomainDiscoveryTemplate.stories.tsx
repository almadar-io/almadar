import type { Meta, StoryObj } from "@storybook/react";
import { CrossDomainDiscoveryTemplate } from "./CrossDomainDiscoveryTemplate";
import type { KnowledgeNode } from "../../types/knowledge";

const meta: Meta<typeof CrossDomainDiscoveryTemplate> = {
  title: "KFlow/Templates/CrossDomainDiscoveryTemplate",
  component: CrossDomainDiscoveryTemplate,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CrossDomainDiscoveryTemplate>;

const makeNode = (id: string, title: string, domain: "formal" | "natural" | "social", subject: string): KnowledgeNode => ({
  id, title, description: `Concept: ${title}`, domain,
  discipline: subject, subject, depth: 2, parentId: "", childIds: [],
  resourceUrls: [], notes: "", nodeType: "concept",
});

export const Default: Story = {
  args: {
    entity: {
      discoveries: [
        {
          sharedTerm: "Entropy",
          nodes: [
            makeNode("phys-entropy", "Thermodynamic Entropy", "natural", "Physics"),
            makeNode("cs-entropy", "Information Entropy", "formal", "Computer Science"),
          ],
          isNew: true,
        },
      ],
      bonusesUnlocked: 25,
    },
  },
};
