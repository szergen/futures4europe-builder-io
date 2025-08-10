import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import CheckboxComponent, { CheckboxComponentProps } from './CheckboxComponent';

export default {
  title: 'CheckboxComponent',
  component: CheckboxComponent,
} as Meta;

const Template: StoryFn<CheckboxComponentProps> = (args) => (
  <CheckboxComponent {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: 'checkbox',
  label: 'Checkbox',
  defaultChecked: false,
};
