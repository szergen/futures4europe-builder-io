import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import RadioButtonComponent, {
  RadioButtonComponentProps,
} from './RadioButtonComponent';

export default {
  title: 'RadioButtonComponent',
  component: RadioButtonComponent,
} as Meta;

const Template: StoryFn<RadioButtonComponentProps> = (args) => (
  <RadioButtonComponent {...args} />
);

export const Default = Template.bind({});

Default.args = {
  groupLabel: 'Group of Radio Buttons',
  name: 'radioButtonsHTML',
  labels: ['Option 1', 'Option 2', 'Option 3'],
};
