import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import InputText, { InputTextProps } from './InputText';

export default {
  title: 'InputText',
  component: InputText,
} as Meta;

const Template: StoryFn<InputTextProps> = (args) => <InputText {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Label',
  helperText: 'Helper text',
  placeholder: 'Placeholder',
};
