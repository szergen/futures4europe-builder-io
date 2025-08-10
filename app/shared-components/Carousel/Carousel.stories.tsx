// CarouselClient.stories.tsx
import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { CarouselClient } from './Carousel'; // adjust this import to your file structure

export default {
  title: 'CarouselClient',
  component: CarouselClient,
} as Meta;

const Template: StoryFn = (args) => <CarouselClient {...args} />;

export const Default = Template.bind({});

Default.args = {
  texts: [
    '“I have been volunteering with ChoosEquality for over a year now and I can say that it has been a rewarding and meaningful experience.”',
    '“ChoosEquality is a movement that is transforming education for the better. I am proud to be part of it and I encourage anyone who cares about education to join us.”',
    '“I have also seen the positive impact that ChoosEquality has on the kids and the schools they work with.”',
  ], // add props here
};
