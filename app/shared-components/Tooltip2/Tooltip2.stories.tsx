import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Tooltip2, { Tooltip2Props } from './Tooltip2';

export default {
  title: 'Tooltip2',
  component: Tooltip2,
} as Meta;

const Template: StoryFn<Tooltip2Props> = (args) => <Tooltip2 {...args} />;

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
