import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Label, { LabelProps } from './Label'; // adjust this import to your file structure

export default {
  title: 'Label',
  component: Label,
} as Meta;

const Template: StoryFn<LabelProps> = (args) => <Label {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Label Text',
  htmlFor: 'inputId',
  className: 'custom-class',
};
