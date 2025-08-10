import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { RelationTagPickerProps, RelationTagPicker } from './RelationTagPicker';

export default {
  title: 'RelationTagPicker',
  component: RelationTagPicker,
} as Meta;

const Template: StoryFn<RelationTagPickerProps> = (args) => (
  <RelationTagPicker {...args} />
);

export const Default = Template.bind({});
Default.args = {};
