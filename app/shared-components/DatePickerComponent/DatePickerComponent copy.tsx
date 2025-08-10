import React, { useState, useRef, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { FloatingLabel, Alert, TextInput } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';
import 'react-datepicker/dist/react-datepicker.css';
import classNames from 'classnames';
import { set } from 'lodash';
import { on } from 'events';
import InputText from '../InputText/InputText';

export type DatePickerComponentProps = {
  date: Date;
  onChange?: (date: Date) => void;
  className?: string;
  dateFormate?: 'yyyy-MM-dd' | 'yyyy' | 'yyyy-MM' | 'yyyy-MM-dd HH:mm';
};

export const dateHelper = (date: Date) =>
  new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    ?.slice(0, 10);

// eslint-disable-next-line react/display-name
const CustomInput = React.forwardRef(
  ({ date, onClick, className, onChange }: any, ref: any) => {
    const dateToString = dateHelper(date);
    const [inputState, setInputState] = useState(dateToString);
    const [isFormValid, setIsFormValid] = useState(true);

    const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      const input = event.target.value;
      const parsedDate = new Date(input);

      if (isNaN(parsedDate.getTime())) {
        setIsFormValid(false);
        return;
      }

      setIsFormValid(true);

      let transformDate = dateHelper(new Date(input));

      // Check if the input is a year only
      if (/^\d{4}$/.test(input)) {
        transformDate = input;
      }
      // Check if the input is a year and month
      else if (/^\d{4}-\d{2}$/.test(input)) {
        transformDate = input;
      }

      setInputState(transformDate);
      console.log('OnBlur date-->', transformDate);
    };

    useEffect(() => {
      setInputState(dateToString);
    }, [dateToString]);

    return (
      <div className={classNames('flex', className)}>
        <TextInput
          ref={ref}
          value={inputState}
          onBlur={onBlur}
          onChange={(event) => {
            setInputState(event?.target?.value);
            console.log('OnChange date-->', date);
          }}
          // variant="outlined"
          // label="Date"
          color={isFormValid ? undefined : 'error'}
        />

        <button onClick={onClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            />
          </svg>
        </button>
        {!isFormValid && (
          <Alert color="failure" icon={HiInformationCircle} className="mx-3">
            <span className="font-small">
              Date format is invalid. Please try again or choose the Date Picker
              button.
            </span>
          </Alert>
        )}
      </div>
    );
  }
);

export const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  date,
  onChange,
  className,
  dateFormate,
}) => {
  const [dateState, setDateState] = useState(date || Date.now());
  const ref = useRef();

  useEffect(() => {
    setDateState(date);
  }, [date]);

  return (
    <DatePicker
      customInput={
        <CustomInput
          ref={ref}
          date={dateState}
          className={classNames(className)}
        />
      }
      selected={dateState}
      onChange={(date) => {
        onChange && onChange(date as Date);
        return setDateState(date as Date);
      }}
      dateFormat="yyyy"
      preventOpenOnFocus
      placeholderText="Select a date"
      name="Start Date"
      // className="z-100"
      calendarClassName="z-100 opacity-100"
      popperClassName={'!z-10 opacity-100'}
    />
  );
};

export default DatePickerComponent;
