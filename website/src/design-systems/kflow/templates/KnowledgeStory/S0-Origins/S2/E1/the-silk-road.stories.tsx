import type { Meta, StoryObj } from '@storybook/react';
import { KnowledgeStoryTemplate } from '../../../../KnowledgeStoryTemplate';
import type { KnowledgeStoryEntity } from '../../../../KnowledgeStoryTemplate';
import type { WorldMapEntity } from '@almadar/ui';

const storyEntity: KnowledgeStoryEntity = {
  id: 'silk-road',
  title: 'The Silk Road',
  teaser: 'How did merchants navigate 7,000 km of desert without GPS?',
  domain: 'social',
  difficulty: 'intermediate',
  duration: 12,
  hookQuestion: 'How did merchants navigate 7,000 km of desert without GPS?',
  hookNarrative: "The Silk Road stretched from Chang'an to Constantinople. Merchants carried silk, spices, and ideas across deserts and mountain passes, guided only by stars, oases, and the knowledge of those who came before. One wrong turn meant death.",
  scenes: [
    { title: "The Merchant's Departure", narrative: "Marco loads his camels in Chang'an. Silk, porcelain, and tea — treasures in the West, common goods here. The journey to Constantinople will take two years. He'll cross the Taklamakan Desert, the Pamir Mountains, and the steppes of Central Asia." },
    { title: 'Oasis Navigation', narrative: "The Taklamakan means \"go in and you won't come out.\" Merchants didn't cross it — they skirted its edges, hopping between oases. Each oasis was a node in a network. Miss one, and you die of thirst." },
    { title: 'The Network Effect', narrative: "The Silk Road wasn't one road — it was a **graph** of routes connecting cities, oases, and mountain passes. Merchants chose paths based on season, politics, and bandit activity. The network was resilient: if one node fell, others rerouted." },
    { title: 'Knowledge Transfer', narrative: 'Silk traveled west. Paper, gunpowder, and the compass traveled with it. From the West came glass, wool, and gold. But the most valuable cargo was **ideas**: mathematics, astronomy, medicine, and religion flowed in both directions.' },
    { title: 'The Graph Lesson', narrative: "The Silk Road is a real-world graph. Cities are nodes. Routes are edges. Oases are waypoints. The shortest path isn't always the safest. The merchant who understands the graph survives." },
  ],
  principle: 'Graph Theory and Network Navigation',
  explanation: 'A **graph** is a set of nodes connected by edges. **Shortest path** algorithms (Dijkstra, A*) find optimal routes. But real networks have weighted edges — distance, danger, cost — and the "best" path depends on what you optimize.\n\nThe Silk Road teaches: redundancy in networks prevents single points of failure.',
  pattern: '1. Map the network as a graph (nodes + edges)\n2. Assign weights to edges (distance, cost, risk)\n3. Find optimal path for your objective\n4. Plan fallback routes for resilience',
  tryItQuestion: "A merchant can take Route A (short but through bandit territory) or Route B (longer but safe). Route A: 500 km, 40% robbery risk. Route B: 800 km, 5% risk. Which is \"shorter\" in expected cost?",
  tryItOptions: [
    'Route A — always take the shortest distance',
    'Route B — the expected cost of robbery makes A more expensive',
    "Either — risk doesn't affect distance",
    'Neither — wait for the bandits to leave',
  ],
  tryItCorrectIndex: 1,
  gameType: 'adventure',
  gameConfig: {
    id: 'silk-road-map',
    hexes: [
      { x: 0, y: 0, terrain: 'city', passable: true, feature: 'start' },
      { x: 1, y: 0, terrain: 'plains', passable: true },
      { x: 2, y: 0, terrain: 'desert', passable: true },
      { x: 3, y: 0, terrain: 'mountains', passable: false },
      { x: 4, y: 0, terrain: 'mountains', passable: false },
      { x: 0, y: 1, terrain: 'plains', passable: true },
      { x: 1, y: 1, terrain: 'forest', passable: true },
      { x: 2, y: 1, terrain: 'desert', passable: true },
      { x: 3, y: 1, terrain: 'desert', passable: true },
      { x: 4, y: 1, terrain: 'mountains', passable: false },
      { x: 0, y: 2, terrain: 'forest', passable: true },
      { x: 1, y: 2, terrain: 'forest', passable: false, feature: 'bandit-camp' },
      { x: 2, y: 2, terrain: 'oasis', passable: true, feature: 'oasis' },
      { x: 3, y: 2, terrain: 'desert', passable: true },
      { x: 4, y: 2, terrain: 'plains', passable: true },
      { x: 0, y: 3, terrain: 'plains', passable: true },
      { x: 1, y: 3, terrain: 'plains', passable: true },
      { x: 2, y: 3, terrain: 'desert', passable: true },
      { x: 3, y: 3, terrain: 'plains', passable: true },
      { x: 4, y: 3, terrain: 'forest', passable: true },
      { x: 0, y: 4, terrain: 'mountains', passable: false },
      { x: 1, y: 4, terrain: 'plains', passable: true },
      { x: 2, y: 4, terrain: 'plains', passable: true },
      { x: 3, y: 4, terrain: 'plains', passable: true },
      { x: 4, y: 4, terrain: 'city', passable: true, feature: 'goal' },
    ],
    heroes: [
      { id: 'marco', name: 'Marco', owner: 'player' as const, position: { x: 0, y: 0 }, movement: 2, level: 1 },
    ],
    selectedHeroId: 'marco',
  } satisfies WorldMapEntity,
  resolution: "Marco arrives in Constantinople after navigating around mountains, through oases, and past bandit territory. The optimal path required understanding the terrain — not just the distance. The Silk Road created the first truly global economy, connected by the logic of graphs.",
  learningPoints: [
    "A graph is nodes connected by edges — the Silk Road is a real-world graph",
    'Edge weights encode cost, distance, or risk — the "shortest" path depends on what you optimize',
    'Network redundancy prevents single points of failure',
    "Dijkstra's algorithm finds the shortest weighted path",
    "The Silk Road transferred not just goods but ideas — information travels graphs too",
  ],
  currentStep: 0,
};

const meta: Meta<typeof KnowledgeStoryTemplate> = {
  title: 'KFlow/KnowledgeStory/S0 Origins/S2/E1/The Silk Road',
  component: KnowledgeStoryTemplate,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof KnowledgeStoryTemplate>;

export const Hook: Story = { args: { entity: { ...storyEntity, currentStep: 0 } } };
export const Narrative: Story = { args: { entity: { ...storyEntity, currentStep: 1 } } };
export const Lesson: Story = { args: { entity: { ...storyEntity, currentStep: 2 } } };
export const Game: Story = { args: { entity: { ...storyEntity, currentStep: 3 } } };
export const Reward: Story = {
  args: {
    entity: {
      ...storyEntity,
      currentStep: 4,
      gameResult: { score: 100, time: 120, attempts: 1 },
      isComplete: true,
    },
  },
};
