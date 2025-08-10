import React, { useState, useRef, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import classNames from 'classnames';
import DatePickerComponent from '../DatePickerComponent/DatePickerComponent';

export type DatePickerRangeComponentDoubleProps = {
  dateStart?: Date | null;
  dateEnd?: Date | null;
  // onChange?: (date: string) => void;
  className?: string;
  handleUpdateStartDate?: (date: Date) => void;
  handleUpdateEndDate?: (date: Date) => void;
  dateFormate?:
    | 'YYYY-MM-dd'
    | 'YYYY'
    | 'YYYY-MM'
    | 'YYYY-MMMM'
    | 'YYYY MMMM'
    | 'YYYY-MM-DD HH:mm';
  placeholderStartDate?: string;
  placeholderEndDate?: string;
  helperText?: string;
  calendarHelperText?: string;
};

export const DatePickerRangeComponentDouble: React.FC<
  DatePickerRangeComponentDoubleProps
> = ({
  dateStart,
  dateEnd,
  className,
  handleUpdateStartDate,
  handleUpdateEndDate,
  dateFormate,
  placeholderEndDate,
  placeholderStartDate,
  helperText,
  calendarHelperText,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(dateStart || null);
  const [endDate, setEndDate] = useState<Date | null>(dateEnd || null);

  useEffect(() => {
    if (startDate && endDate && startDate >= endDate) {
      setEndDate(startDate);
      console.log('startDate >= endDate', startDate, endDate);
    }
  }, [startDate, endDate]);
  // const ref = useRef();

  return (
    <div className={classNames('flex items-center', className)}>
      <div>
        {calendarHelperText && (
          <div className="mb-2 text-sm text-gray-500">{calendarHelperText}</div>
        )}
        <DatePickerComponent
          date={startDate}
          onChange={(value) => {
            setStartDate(value);
            handleUpdateStartDate?.(value);
          }}
          dateFormate={dateFormate}
          placeholder={placeholderStartDate}
          helperText={helperText}
          calendarHelperText={calendarHelperText}
        />
      </div>
      <span className="mx-4">-</span>
      <div>
        {calendarHelperText && (
          <div className="mb-2 text-sm text-gray-500">{calendarHelperText}</div>
        )}
        <DatePickerComponent
          date={endDate}
          onChange={(value) => {
            setEndDate(value);
            handleUpdateEndDate?.(value);
          }}
          dateFormate={dateFormate}
          placeholder={placeholderEndDate}
          helperText={helperText}
          calendarHelperText={calendarHelperText}
        />
      </div>
    </div>
  );
};

export default DatePickerRangeComponentDouble;
