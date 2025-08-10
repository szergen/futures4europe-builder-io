import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import WixMediaImage, { WixMediaImageProps } from './WixMediaImage';

export default {
  title: 'WixMediaImage',
  component: WixMediaImage,
} as Meta;

const Template: StoryFn<WixMediaImageProps> = (args) => (
  <WixMediaImage {...args} />
);

export const Default = Template.bind({});
Default.args = {
  media: 'https://picsum.photos/id/1026/600/400',
  width: 600,
  height: 400,
};
