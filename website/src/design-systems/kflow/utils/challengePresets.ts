/**
 * Challenge Presets — Story fixtures for knowledge challenges.
 *
 * Arrays of KnowledgeChallenge objects for math, physics, economics.
 */

import type { KnowledgeChallenge } from '../types/knowledge';

export const mathChallenges: KnowledgeChallenge[] = [
    {
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
    {
        id: 'math-eh-1',
        domain: 'formal',
        subject: 'Mathematics',
        topic: 'Functions',
        tier: 'event-handler',
        prompt: 'Set up the event chain: when x changes, f(x) updates, then g(f(x)) updates.',
        correctAnswer: 'x-change->f-update,f-update->g-update',
        hints: ['Composition is right-to-left', 'Each function depends on the previous'],
        xpReward: 75,
        timeLimit: 180,
    },
    {
        id: 'math-sa-1',
        domain: 'formal',
        subject: 'Mathematics',
        topic: 'State Machines',
        tier: 'state-architect',
        prompt: 'Design a state machine for a vending machine: accepts coins, selects product, dispenses.',
        correctAnswer: 'idle->accepting->selecting->dispensing->idle',
        hints: ['Start from idle', 'Coins trigger accepting', 'Selection confirms'],
        xpReward: 100,
        timeLimit: 300,
    },
];

export const physicsChallenges: KnowledgeChallenge[] = [
    {
        id: 'phys-seq-1',
        domain: 'natural',
        subject: 'Physics',
        topic: 'Mechanics',
        tier: 'sequencer',
        prompt: 'Order the steps of projectile motion analysis.',
        correctAnswer: 'decompose,horizontal,vertical,combine,solve',
        hints: ['Separate into x and y components', 'Horizontal velocity is constant'],
        xpReward: 50,
        timeLimit: 120,
    },
    {
        id: 'phys-battle-1',
        domain: 'natural',
        subject: 'Physics',
        topic: 'Thermodynamics',
        tier: 'battle',
        prompt: 'Answer thermodynamics questions to defeat the entropy monster!',
        correctAnswer: 'entropy-increases',
        hints: ['Second law of thermodynamics'],
        xpReward: 150,
        timeLimit: 60,
    },
];

export const economicsChallenges: KnowledgeChallenge[] = [
    {
        id: 'econ-seq-1',
        domain: 'social',
        subject: 'Economics',
        topic: 'Supply & Demand',
        tier: 'sequencer',
        prompt: 'Arrange the market equilibrium steps: demand shifts → price adjusts → new equilibrium.',
        correctAnswer: 'demand-shift,excess,price-adjust,new-equilibrium',
        hints: ['Start with the demand curve shift'],
        xpReward: 50,
        timeLimit: 120,
    },
    {
        id: 'econ-eh-1',
        domain: 'social',
        subject: 'Economics',
        topic: 'Market Dynamics',
        tier: 'event-handler',
        prompt: 'Wire up market events: when supply drops, price rises, then demand adjusts.',
        correctAnswer: 'supply-drop->price-rise,price-rise->demand-adjust',
        hints: ['Supply and demand are inversely related'],
        xpReward: 75,
        timeLimit: 180,
    },
];

export const ALL_CHALLENGES: KnowledgeChallenge[] = [
    ...mathChallenges,
    ...physicsChallenges,
    ...economicsChallenges,
];
