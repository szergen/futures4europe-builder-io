import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import DatePickerRangeComponentSingle, {
  DatePickerRangeComponentSingleProps,
} from './DatePickerRangeComponentSingle';

export default {
  title: 'DatePickerRangeComponentSingle',
  component: DatePickerRangeComponentSingle,
} as Meta;

const Template: StoryFn<DatePickerRangeComponentSingleProps> = (args) => (
  <DatePickerRangeComponentSingle {...args} />
);

export const Default = Template.bind({});
Default.args = {
  dateStart: new Date(),
  dateEnd: new Date(),
  onChange: (date: string) => console.log(date),
  className: 'bg-blue-500',
};
