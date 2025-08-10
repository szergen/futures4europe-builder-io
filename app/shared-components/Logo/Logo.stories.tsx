// Logo.stories.tsx

import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Logo } from './Logo';

export default {
  title: 'Logo',
  component: Logo,
} as Meta;

const Template: StoryFn = (args) => <Logo {...args} />;

export const Default = Template.bind({});
