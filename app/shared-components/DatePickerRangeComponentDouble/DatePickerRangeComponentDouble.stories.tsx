import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import DatePickerRangeComponentDouble, {
  DatePickerRangeComponentDoubleProps,
} from './DatePickerRangeComponentDouble';

export default {
  title: 'DatePickerRangeComponentDouble',
  component: DatePickerRangeComponentDouble,
} as Meta;

const Template: StoryFn<DatePickerRangeComponentDoubleProps> = (args) => (
  <DatePickerRangeComponentDouble {...args} />
);

export const Default = Template.bind({});
Default.args = {
  date: new Date(),
};
