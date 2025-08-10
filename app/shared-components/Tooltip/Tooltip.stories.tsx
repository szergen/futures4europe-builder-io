import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Tooltip, { TooltipProps } from './Tooltip';

export default {
  title: 'Tooltip',
  component: Tooltip,
} as Meta;

const Template: StoryFn<TooltipProps> = (args) => (
  <Tooltip classNameForButton="mt-10" {...args} />
);

export const Default = Template.bind({});
Default.args = {
  text: 'Info',
  tooltipText: 'Tooltip Text',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  text: '',
  tooltipText: 'Tooltip Text',
};
