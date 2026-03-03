import type { Meta, StoryObj } from '@storybook/react';
import { KnowledgeStoryTemplate } from '../../../../KnowledgeStoryTemplate';
import type { KnowledgeStoryEntity } from '../../../../KnowledgeStoryTemplate';
import type { EventHandlerPuzzleEntity } from '@almadar/ui';

const storyEntity: KnowledgeStoryEntity = {
  id: 'smart-thermostat',
  title: 'The Smart Thermostat',
  teaser: 'How does a thermostat keep your room at exactly 21°C?',
  domain: 'formal',
  difficulty: 'beginner',
  duration: 8,
  hookQuestion: 'How does a thermostat keep your room at exactly 21°C?',
  hookNarrative: "Your room is 21°C. You open a window. Cold air rushes in. Within minutes, the heater kicks on automatically. You close the window. The room warms. The heater turns off. Nobody pressed a button. The thermostat made decisions on its own, using a pattern as old as steam engines.",
  scenes: [
    { title: 'The Feedback Loop', narrative: "James Watt's steam engine had a problem: it sped up until it shook apart, or slowed until it stalled. His solution: the **centrifugal governor** — spinning balls that opened a valve when the engine ran too fast. The first automatic feedback control." },
    { title: 'Events and Handlers', narrative: 'A thermostat is an **event-driven system**. Events: temperature rises, temperature falls, timer fires. Handlers: turn heater on, turn heater off, turn fan on. Each event triggers a specific action — no human needed.' },
    { title: 'The Hysteresis Band', narrative: "Why not just set the threshold at exactly 21°C? Because the heater would flicker on and off every second. Instead, thermostats use a **dead band**: turn on at 19°C, turn off at 23°C. This prevents oscillation." },
    { title: 'Composition of Rules', narrative: 'Real systems have multiple rules: if temp < 19 AND time is nighttime, turn on heater AND send notification. Rules compose. Event-driven programming is how we build systems that respond to a changing world.' },
    { title: 'From Thermostats to Software', narrative: 'Every modern app is event-driven: click events, network events, timer events. The thermostat pattern — sense, decide, act — is the foundation of reactive programming, IoT, and robotics.' },
  ],
  principle: 'Event-Driven Programming and Feedback Control',
  explanation: 'An **event** is a signal that something happened. A **handler** is the response. Event-driven systems are reactive: they wait for events and respond, rather than running in a loop.\n\nFeedback control adds a loop: measure → compare → act → measure again.',
  pattern: '1. Define events (what can happen)\n2. Define handlers (what to do when it happens)\n3. Wire events to handlers\n4. Add hysteresis to prevent oscillation',
  tryItQuestion: 'A thermostat turns the heater on at 19°C and off at 23°C. The room is at 20°C and cooling. What does the thermostat do?',
  tryItOptions: [
    'Nothing — 20°C is within the dead band, the heater stays in its current state',
    "Turn the heater on — it's below 21°C",
    "Turn the heater off — it's above 19°C",
    'Turn both heater and fan on',
  ],
  tryItCorrectIndex: 0,
  gameType: 'event-handler',
  gameConfig: {
    id: 'thermostat-puzzle',
    title: 'Wire the Smart Thermostat',
    description: 'Define event→action rules so the thermostat keeps the room at 21°C. When temperature drops below 19°C, turn on the heater. When it rises above 23°C, turn on the fan.',
    objects: [
      { id: 'thermometer', name: 'Thermometer', icon: '🌡️', states: ['COLD', 'WARM', 'HOT'], initialState: 'COLD', currentState: 'COLD', availableEvents: [{ value: 'TEMP_CHANGED', label: 'Temp Changed' }], availableActions: [], rules: [] },
      { id: 'heater', name: 'Heater', icon: '🔥', states: ['OFF', 'ON'], initialState: 'OFF', currentState: 'OFF', availableEvents: [{ value: 'TURN_ON', label: 'Turn On' }, { value: 'TURN_OFF', label: 'Turn Off' }], availableActions: [{ value: 'TURN_ON', label: 'Turn On' }, { value: 'TURN_OFF', label: 'Turn Off' }], rules: [] },
      { id: 'fan', name: 'Fan', icon: '💨', states: ['OFF', 'ON'], initialState: 'OFF', currentState: 'OFF', availableEvents: [{ value: 'TURN_ON', label: 'Turn On' }, { value: 'TURN_OFF', label: 'Turn Off' }], availableActions: [{ value: 'TURN_ON', label: 'Turn On' }, { value: 'TURN_OFF', label: 'Turn Off' }], rules: [] },
    ],
    goalCondition: 'temperature === 21',
    goalEvent: 'TEMP_STABLE',
    triggerEvents: ['TEMP_CHANGED'],
    successMessage: 'The thermostat keeps the room at a comfortable 21°C!',
    failMessage: 'The temperature is not stabilizing. Check your event→action rules.',
    hint: 'Heater ON when temp < 19. Fan ON when temp > 23. Both OFF when 19–23.',
  } satisfies EventHandlerPuzzleEntity,
  resolution: "Your thermostat works perfectly. The event→handler pattern you just built is the same one used in every modern app: React components respond to user events, servers respond to HTTP requests, and IoT devices respond to sensor readings.",
  learningPoints: [
    'Events are signals that something happened; handlers are the response',
    'Event-driven systems are reactive — they wait and respond rather than polling',
    'Hysteresis (dead band) prevents oscillation in feedback systems',
    'Complex behavior emerges from simple event→handler rules composed together',
    'This pattern is the foundation of GUIs, IoT, and reactive programming',
  ],
  currentStep: 0,
};

const meta: Meta<typeof KnowledgeStoryTemplate> = {
  title: 'KFlow/KnowledgeStory/S0 Origins/S4/E1/The Smart Thermostat',
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
      gameResult: { score: 100, time: 40, attempts: 1 },
      isComplete: true,
    },
  },
};
