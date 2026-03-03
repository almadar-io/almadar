import type { Meta, StoryObj } from '@storybook/react';
import { KnowledgeChallengeBoard } from './KnowledgeChallengeBoard';
import type { KnowledgeChallengeEntity } from './KnowledgeChallengeBoard';

const meta: Meta<typeof KnowledgeChallengeBoard> = {
    title: 'KFlow/Organisms/KnowledgeChallengeBoard',
    component: KnowledgeChallengeBoard,
    parameters: { layout: 'padded' },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KnowledgeChallengeBoard>;

const entity: KnowledgeChallengeEntity = {
    challenge: {
        id: 'math-seq-1',
        domain: 'formal',
        subject: 'Mathematics',
        topic: 'Sequences',
        tier: 'sequencer',
        prompt: 'Arrange the steps to prove that the sum of the first n integers is n(n+1)/2.',
        correctAnswer: 'base-case,hypothesis,substitute,simplify,conclude',
        hints: ['Start with n=1', 'Assume it holds for k', 'Show it holds for k+1'],
        xpReward: 50,
        timeLimit: 120,
    },
    player: {
        id: 'p1', name: 'Scholar', level: 3, totalXP: 1500,
        domainXP: { formal: 800, natural: 400, social: 300 },
        unlockedTopics: ['Mathematics'], currentRegion: 'region-algebra',
        archetype: 'scholar', resources: {},
    },
    progress: 0,
    hints: ['Start with n=1', 'Assume it holds for k', 'Show it holds for k+1'],
    hintsUsed: 0,
    timeRemaining: 120,
};

export const Default: Story = { args: { entity } };

export const WithHints: Story = {
    args: { entity: { ...entity, hintsUsed: 2, timeRemaining: 45 } },
};

export const EventHandler: Story = {
    args: {
        entity: {
            ...entity,
            challenge: { ...entity.challenge, tier: 'event-handler', topic: 'Functions', prompt: 'Wire event chain.' },
        },
    },
};
