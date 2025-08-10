import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import SearchComponentV1 from './SearchComponentV1';
import { SearchProvider } from '../../custom-hooks/SearchContext/SearchContext';

export default {
  title: 'SearchComponentV1',
  component: SearchComponentV1,
} as Meta;

const Template: StoryFn = (args) => (
  <SearchProvider>
    <SearchComponentV1 {...args} />
  </SearchProvider>
);

export const Default = Template.bind({});
