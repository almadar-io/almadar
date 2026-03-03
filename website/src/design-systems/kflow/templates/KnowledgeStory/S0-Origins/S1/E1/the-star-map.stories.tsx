import type { Meta, StoryObj } from '@storybook/react';
import { KnowledgeStoryTemplate } from '../../../../KnowledgeStoryTemplate';
import { extractStoryEntity } from '../../../../../utils/orbEntityLoader';
import type { LocaleOrbMap } from '../../../../../utils/orbEntityLoader';
import orbEn from '../../../../../../stories/series-0-origins/S1-origins/E1-the-first-reckonings/the-star-map.orb';
import orbAr from '../../../../../../stories/series-0-origins/S1-origins/E1-the-first-reckonings/the-star-map.ar.orb';
import orbSl from '../../../../../../stories/series-0-origins/S1-origins/E1-the-first-reckonings/the-star-map.sl.orb';

const orbs: LocaleOrbMap = { en: orbEn, ar: orbAr, sl: orbSl };

const meta: Meta<typeof KnowledgeStoryTemplate> = {
  title: 'KFlow/KnowledgeStory/S0 Origins/S1/E1/The Star Map',
  component: KnowledgeStoryTemplate,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof KnowledgeStoryTemplate>;

export const Default: Story = {
  render: (_args, ctx) => {
    const entity = extractStoryEntity(orbs, ctx.globals.locale);
    return <KnowledgeStoryTemplate entity={{ ...entity, currentStep: 0 }} />;
  },
};
