import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Button from './Button';

export default {
  title: 'Button',
  component: Button,
} as Meta;

const Template: StoryFn = (args) => <Button {...args}>{args.children}</Button>;

export const Default = Template.bind({});
Default.args = {
  text: 'Info',
  tooltipText: 'Tooltip Text',
  classNameForButton: 'mt-10',
  children: 'Button',
};
