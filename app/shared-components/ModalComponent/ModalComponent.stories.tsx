import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import ModalComponent, { ModalComponentProps } from './ModalComponent';

export default {
  title: 'ModalComponent',
  component: ModalComponent,
} as Meta;

const Template: StoryFn<ModalComponentProps> = (args) => (
  <ModalComponent {...args}>
    <p>Modal Content</p>
  </ModalComponent>
);

export const Default = Template.bind({});
Default.args = {
  buttonText: 'Open Modal',
  headerTitle: 'Modal Header',
};
