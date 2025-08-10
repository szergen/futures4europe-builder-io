import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import SelectComponent, { SelectComponentProps } from './SelectComponent';

export default {
  title: 'SelectComponent',
  component: SelectComponent,
} as Meta;

const Template: StoryFn<SelectComponentProps> = (args) => (
  <SelectComponent {...args} />
);

export const Default = Template.bind({});
Default.args = {};
