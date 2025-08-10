import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import RTEComponent from './RTEComponent';

export default {
  title: 'RTEComponent',
  component: RTEComponent,
} as Meta;

const Template: StoryFn = (args) => <RTEComponent {...args} />;

export const Default = Template.bind({});
Default.args = {};
