import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import TagPicker, { TagPickerProps } from './TagPicker';
export default {
  title: 'TagPicker',
  component: TagPicker,
} as Meta;

const Template: StoryFn<TagPickerProps> = (args) => <TagPicker {...args} />;

export const Default = Template.bind({});
Default.args = {};
