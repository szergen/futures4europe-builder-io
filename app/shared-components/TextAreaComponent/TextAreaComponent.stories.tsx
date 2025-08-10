import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import TextAreaComponent, { TextAreaComponentProps } from './TextAreaComponent';

export default {
  title: 'TextAreaComponent',
  component: TextAreaComponent,
} as Meta;

const Template: StoryFn<TextAreaComponentProps> = (args) => (
  <TextAreaComponent {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: 'Label',
  helperText: 'Helper text',
  placeholder: 'Placeholder',
};
