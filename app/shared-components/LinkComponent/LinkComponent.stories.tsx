import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import LinkComponent, { LinkComponentProps } from './LinkComponent';

export default {
  title: 'LinkComponent',
  component: LinkComponent,
} as Meta;

const Template: StoryFn<LinkComponentProps> = (args) => (
  <LinkComponent {...args} />
);

export const Default = Template.bind({});
Default.args = {
  href: 'https://www.google.com',
  children: 'This is a link',
};
