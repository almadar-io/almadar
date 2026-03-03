import type { Meta, StoryObj } from '@storybook/react';
import { KnowledgeStoryTemplate } from '../../../../KnowledgeStoryTemplate';
import type { KnowledgeStoryEntity } from '../../../../KnowledgeStoryTemplate';

const storyEntity: KnowledgeStoryEntity = {
  id: 'invisible-hand',
  title: 'The Invisible Hand',
  teaser: 'A village has one baker. A second opens across the street. What happens to the price of bread?',
  domain: 'social',
  difficulty: 'intermediate',
  duration: 12,
  hookQuestion: 'How does competition set the "right" price without anyone deciding what it should be?',
  hookNarrative: "Old Henrik has been the village's only baker for twenty years. He charges 4 coins per loaf. Then one morning, a sign appears: \"Sofia's Bakery — Grand Opening.\" Within a week, bread prices drop. Within a month, both bakers make better bread. Nobody planned this.",
  scenes: [
    { title: 'The Village Baker', narrative: 'Henrik serves 200 villagers as a monopoly. 80 loaves/day at 4 coins each. Cost: 1.5 coins/loaf, profit: 200 coins/day. No incentive to lower prices or improve quality.' },
    { title: 'A Competitor Arrives', narrative: "Sofia prices at 3.5 coins. Henrik matches. Sofia drops to 3.0. Henrik follows. This price war can't go forever — below a certain price, they lose money. Where does it settle?" },
    { title: 'Price War', narrative: 'As price drops: **demand increases** (more people buy daily). **Supply adjusts** (more loaves, but marginal costs rise). The curves are searching for their intersection.' },
    { title: 'Finding Equilibrium', narrative: 'Price settles at **2.50 coins**. Total demand (130 loaves) = total supply (65 each). Charge more? Customers switch. Charge less? Lose money. This is the **equilibrium price**.' },
    { title: 'The Invisible Hand', narrative: "Adam Smith, 1776: each person acts in self-interest, yet the outcome benefits everyone — lower prices, higher quality, efficient allocation. Market prices carry information without any central planner." },
  ],
  principle: 'Supply, Demand, and Price Equilibrium',
  explanation: 'The **demand curve** slopes down: lower prices = more buyers. The **supply curve** slopes up: higher prices = more production.\n\nEquilibrium is where they cross. Above it: surplus pushes prices down. Below: shortage pushes up.',
  pattern: '1. Map demand curve (price vs quantity demanded)\n2. Map supply curve (price vs quantity supplied)\n3. Find intersection = equilibrium price\n4. Verify: deviations self-correct',
  tryItQuestion: "A frost destroys half the wheat crop. What happens to bread prices short-term?",
  tryItOptions: [
    'Prices rise — supply drops while demand stays the same',
    'Prices stay the same — bakers absorb the cost',
    'Prices drop — people buy less when they hear about the frost',
    'Nothing — the government sets bread prices',
  ],
  tryItCorrectIndex: 0,
  gameType: 'simulator',
  gameConfig: {
    id: 'bread-market-simulator',
    title: 'The Bread Market',
    description: 'Adjust supply, demand, and competition to find the equilibrium price of 2.50 coins/loaf (±0.25).',
    parameters: [
      { id: 'supply', label: 'Daily Supply', unit: 'loaves', min: 10, max: 100, step: 5, initial: 50, correct: 65, tolerance: 10 },
      { id: 'demand-multiplier', label: 'Demand Multiplier', unit: 'x', min: 0.5, max: 2.0, step: 0.1, initial: 1.0, correct: 1.3, tolerance: 0.2 },
      { id: 'competition', label: 'Number of Bakers', unit: 'bakers', min: 1, max: 5, step: 1, initial: 1, correct: 2, tolerance: 0 },
    ],
    outputLabel: 'Equilibrium Price',
    outputUnit: 'coins/loaf',
    computeExpression: '4.0 / (competition * 0.4 + demand_multiplier * 0.3) * (100 / supply) * 0.8',
    targetValue: 2.5,
    targetTolerance: 0.25,
    successMessage: 'Equilibrium found! 2 bakers, ~65 loaves each, 1.3x demand = ~2.50 coins/loaf.',
    failMessage: 'More competition lowers prices. Higher demand raises prices. More supply lowers prices. Find the balance.',
    hint: 'Start with 2 bakers, then adjust supply and demand until price hits ~2.50.',
  },
  resolution: "The village thrived. Henrik improved his recipes. Sofia introduced rye bread. A third baker opened. Prices stabilized, quality soared. Adam Smith's insight remains one of economics' most powerful ideas.",
  learningPoints: [
    'Demand curve slopes down — lower prices increase quantity demanded',
    'Supply curve slopes up — higher prices increase quantity supplied',
    'Equilibrium price: supply = demand, deviations self-correct',
    'Competition drives prices toward equilibrium; monopolies sustain prices above it',
    'Market prices coordinate millions of decisions without central planning',
  ],
  currentStep: 0,
};

const meta: Meta<typeof KnowledgeStoryTemplate> = {
  title: 'KFlow/KnowledgeStory/S0 Origins/S3/E3/The Invisible Hand',
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
      gameResult: { score: 100, time: 80, attempts: 2 },
      isComplete: true,
    },
  },
};
