import type { Meta, StoryObj } from '@storybook/react';
import { KnowledgeStoryTemplate } from '../../../../KnowledgeStoryTemplate';
import type { KnowledgeStoryEntity } from '../../../../KnowledgeStoryTemplate';

const storyEntity: KnowledgeStoryEntity = {
  id: 'prisoners-choice',
  title: "The Prisoner's Choice",
  teaser: 'Two criminals are arrested. Each is offered a deal: betray or stay silent. The rational choice will surprise you.',
  domain: 'formal',
  difficulty: 'advanced',
  duration: 15,
  hookQuestion: 'Why do rational people choose outcomes that are worse for everyone?',
  hookNarrative: "Two suspects in separate rooms. Testify against your partner and go free — if they stay silent. Both testify? 5 years each. Both silent? 1 year each. One betrays, one silent? Betrayer walks, silent one gets 10 years. You can't communicate. What do you do?",
  scenes: [
    { title: 'The Arrest', narrative: "Alex and Blake are caught. Evidence is circumstantial — enough for a minor charge (1 year each). The prosecutor separates them and presents each the same deal. Neither can know what the other will choose." },
    { title: 'The Interrogation Room', narrative: "Alex thinks: if Blake stays silent, I should betray (0 vs 1 year). If Blake betrays, I should also betray (5 vs 10 years). **No matter what Blake does, betraying is better.** Blake reaches the same conclusion. Both betray. Both get 5 years." },
    { title: "Nash's Insight", narrative: "In 1950, John Nash formalized this. The mutual-betray point is a **Nash equilibrium** — neither can improve by changing alone. But it's worse for both than mutual cooperation. Individual rationality leads to collective irrationality." },
    { title: 'The Iterated Game', narrative: "What if you play 100 times? Now betrayal invites retaliation. The **shadow of future interaction** makes cooperation rational — cooperate now, get rewarded later." },
    { title: "Axelrod's Tournament", narrative: 'In 1980, game theorists submitted strategies. The winner was the simplest: **Tit-for-Tat**. Cooperate first, then copy the opponent\'s last move. Nice, retaliatory, forgiving, predictable.' },
  ],
  principle: "Game Theory and the Prisoner's Dilemma",
  explanation: 'A **payoff matrix** maps every choice combination to outcomes. A **Nash equilibrium** is where no player can improve unilaterally.\n\nIn one-shot games, defection dominates. In repeated games, cooperation emerges through reciprocity.',
  pattern: '1. Map the payoff matrix\n2. Find dominant strategies\n3. Identify Nash equilibria\n4. In repeated games, use reciprocal strategies (Tit-for-Tat)',
  tryItQuestion: "Your opponent defected last round. Using Tit-for-Tat, what do you do?",
  tryItOptions: [
    'Defect — mirror their last action',
    'Cooperate — always be nice',
    'Defect twice — punish extra hard',
    'Randomly choose — keep them guessing',
  ],
  tryItCorrectIndex: 0,
  gameType: 'negotiator',
  gameConfig: {
    id: 'prisoners-dilemma-game',
    title: "The Prisoner's Dilemma",
    description: 'Play 10 rounds against a Tit-for-Tat AI. Score 28+ points. The AI cooperates first, then copies your last move.',
    actions: [
      { id: 'cooperate', label: 'Cooperate', description: 'Both get 3 if mutual. You get 0 if they defect.' },
      { id: 'defect', label: 'Defect', description: 'You get 5 if they cooperate. Both get 1 if mutual defect.' },
    ],
    payoffMatrix: [
      { playerAction: 'cooperate', opponentAction: 'cooperate', playerPayoff: 3, opponentPayoff: 3 },
      { playerAction: 'cooperate', opponentAction: 'defect', playerPayoff: 0, opponentPayoff: 5 },
      { playerAction: 'defect', opponentAction: 'cooperate', playerPayoff: 5, opponentPayoff: 0 },
      { playerAction: 'defect', opponentAction: 'defect', playerPayoff: 1, opponentPayoff: 1 },
    ],
    totalRounds: 10,
    opponentStrategy: 'tit-for-tat',
    targetScore: 28,
    successMessage: 'Sustained cooperation yields 30 points — the maximum. Defecting once gives a spike but costs the next round.',
    failMessage: 'Against Tit-for-Tat, every defection is punished next round. Cooperate consistently for the highest total.',
    hint: 'Cooperate = 3+3 next round. Defect = 5 now, then 1+1 next round. Cooperation compounds.',
  },
  resolution: "The prisoner's dilemma appears everywhere: arms races, climate negotiations, open-source contribution. Axelrod showed that nice, retaliatory, forgiving strategies outperform exploitative ones long-term.",
  learningPoints: [
    'A payoff matrix maps every choice combination to outcomes',
    'Nash equilibrium: no player can improve by changing alone',
    'One-shot: defection dominates. Repeated: cooperation emerges',
    'Tit-for-Tat wins: nice, retaliatory, forgiving, predictable',
    'Incentive structure determines rational behavior',
  ],
  currentStep: 0,
};

const meta: Meta<typeof KnowledgeStoryTemplate> = {
  title: 'KFlow/KnowledgeStory/S0 Origins/S3/E3/The Prisoners Choice',
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
      gameResult: { score: 28, time: 120, attempts: 1 },
      isComplete: true,
    },
  },
};
