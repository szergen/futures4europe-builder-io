// Typography.stories.tsx
import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Typography, { TypographyProps } from './Typography'; // adjust this import to your file structure

export default {
  title: 'Typography',
  component: Typography,
} as Meta;

const Template: StoryFn<TypographyProps> = (args) => <Typography {...args} />;

export const Default = Template.bind({});
Default.args = {
  tag: 'p',
  className: 'custom-class',
  style: { color: 'blue' },
  children: 'Typography Text',
};
