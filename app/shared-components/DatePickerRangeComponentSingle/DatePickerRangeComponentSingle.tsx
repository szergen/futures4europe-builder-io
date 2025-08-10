import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import classNames from 'classnames';

export type DatePickerRangeComponentSingleProps = {
  dateStart?: Date;
  dateEnd?: Date;
  onChange?: (date: string) => void;
  className?: string;
};

export const DatePickerRangeComponentSingle: React.FC<
  DatePickerRangeComponentSingleProps
> = ({ dateStart, dateEnd, onChange, className }) => {
  const [dateRange, setDateRange] = useState([dateStart, dateEnd]);
  const [startDate, endDate] = dateRange;
  return (
    <DatePicker
      showIcon={true}
      selectsRange={true}
      toggleCalendarOnIconClick={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
      }}
      isClearable={true}
      dateFormat="yyyy-MM-dd"
      className={classNames(className)}
    />
  );
};

export default DatePickerRangeComponentSingle;
