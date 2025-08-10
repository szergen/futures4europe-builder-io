import React, { useState, useRef, useEffect, use } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import classNames from 'classnames';
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import {
  PickersCalendarHeader,
  ExportedPickersCalendarHeaderProps,
} from '@mui/x-date-pickers';

export type DatePickerComponentProps = {
  date?: Date | null;
  onChange?: (date: Date) => void;
  className?: string;
  title?: string;
  placeholder?: string;
  helperText?: string;
  calendarHelperText?: string;
  dateFormate?:
    | 'YYYY-MM-dd'
    | 'YYYY-MM-DD'
    | 'YYYY'
    | 'YYYY-MM'
    | 'YYYY-MMMM'
    | 'YYYY MMMM'
    | 'YYYY-MM-DD HH:mm';
};

export const dateHelper = (date: Date) =>
  new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    ?.toISOString()
    ?.slice(0, 10);

const decideViewValues = (dateFormateValue: string) => {
  switch (dateFormateValue) {
    case 'YYYY':
      return ['year'];
    case 'YYYY-MM':
    case 'YYYY-MMMM':
    case 'YYYY MMMM':
      return ['year', 'month'];
    case 'YYYY-MM-dd':
    case 'YYYY-MM-DD':
      return ['year', 'month', 'day'];
    case 'YYYY-MM-DD HH:mm':
      return ['year', 'month', 'day', 'hours', 'minutes'];
    default:
      return ['year', 'month', 'day'];
  }
};

interface CalendarFooterProps {
  calendarHelperText?: string;
}

const CalendarFooter: React.FC<CalendarFooterProps> = ({
  calendarHelperText,
}) => {
  return (
    <div
      style={{
        padding: '8px 16px',
        width: '100%',
        textAlign: 'center',
        borderTop: '1px solid rgba(0,0,0,0.1)',
        marginTop: 'auto',
      }}
    >
      <span
        style={{
          fontSize: '12px',
          color: 'rgba(0, 0, 0, 0.6)',
        }}
      >
        {calendarHelperText}
      </span>
    </div>
  );
};

interface CalendarHeaderProps {
  calendarHelperText?: string;
  props: ExportedPickersCalendarHeaderProps<Dayjs>;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  calendarHelperText,
  props,
}) => (
  <>
    {calendarHelperText && (
      <div
        style={{
          padding: '8px 16px',
          width: '100%',
          textAlign: 'center',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
        }}
      >
        <span
          style={{
            fontSize: '12px',
            color: 'rgba(0, 0, 0, 0.6)',
          }}
        >
          {calendarHelperText}
        </span>
      </div>
    )}
    <PickersCalendarHeader {...props} />
  </>
);

// eslint-disable-next-line react/display-name
// const CustomInput = React.forwardRef(
//   ({ date, onClick, className, onChange }: any, ref: any) => {
//     const dateToString = dateHelper(date);
//     const [inputState, setInputState] = useState(dateToString);
//     const [isFormValid, setIsFormValid] = useState(true);

//     const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
//       const input = event.target.value;
//       const parsedDate = new Date(input);

//       if (isNaN(parsedDate.getTime())) {
//         setIsFormValid(false);
//         return;
//       }

//       setIsFormValid(true);

//       let transformDate = dateHelper(new Date(input));

//       // Check if the input is a year only
//       if (/^\d{4}$/.test(input)) {
//         transformDate = input;
//       }
//       // Check if the input is a year and month
//       else if (/^\d{4}-\d{2}$/.test(input)) {
//         transformDate = input;
//       }

//       setInputState(transformDate);
//       console.log('OnBlur date-->', transformDate);
//     };

//     useEffect(() => {
//       setInputState(dateToString);
//     }, [dateToString]);

//     return (
//       <div className={classNames('flex', className)}>
//         <TextInput
//           ref={ref}
//           value={inputState}
//           onBlur={onBlur}
//           onChange={(event) => {
//             setInputState(event?.target?.value);
//             console.log('OnChange date-->', date);
//           }}
//           // variant="outlined"
//           // label="Date"
//           color={isFormValid ? undefined : 'error'}
//         />

//         <button onClick={onClick}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="w-6 h-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
//             />
//           </svg>
//         </button>
//         {!isFormValid && (
//           <Alert color="failure" icon={HiInformationCircle} className="mx-3">
//             <span className="font-small">
//               Date format is invalid. Please try again or choose the Date Picker
//               button.
//             </span>
//           </Alert>
//         )}
//       </div>
//     );
//   }
// );

export const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  date,
  onChange,
  className,
  dateFormate = 'YYYY-MM-dd',
  calendarHelperText,
  helperText,
  title,
  placeholder,
}) => {
  const [dateState, setDateState] = useState<Dayjs | null>(
    date ? dayjs(date) : null
  );
  const decidedViewValues = decideViewValues(dateFormate);
  //console.log('debug123', date);

  const handleDateChange = (date: any) => {
    const stringDate = dayjs(date).format(dateFormate);
    //console.log('stringDate-->', stringDate);
    onChange && onChange(new Date(stringDate));
    setDateState(dayjs(stringDate));
  };

  // generate slots calendarHelperText
  const pickerProps = {
    value: dateState,
    onChange: handleDateChange,
    label: placeholder,
    className:
      dateFormate === 'YYYY-MM-DD HH:mm'
        ? classNames('w-80', className)
        : className,
    slots: {
      actionBar: () => (
        <CalendarFooter calendarHelperText={calendarHelperText} />
      ),
      calendarHeader: (headerProps) => (
        <CalendarHeader
          calendarHelperText={calendarHelperText}
          props={headerProps}
        />
      ),
      // switchViewButton: ({ view, onViewChange }) => {
      //   if (view === 'hours') {
      //     return (
      //       <div style={{
      //         display: 'flex',
      //         justifyContent: 'space-between',
      //         width: '100%',
      //         padding: '0 16px',
      //         fontWeight: 'bold'
      //       }}>
      //         <span>Time</span>
      //         <span>AM/PM (CET)</span>
      //       </div>
      //     );
      //   }
      //   return null;
      // }
    },
    slotProps: {
      textField: {
        helperText,
        fullWidth: true,
        InputLabelProps: {
          shrink: true,
        },
      },
      popper: {
        sx: {
          '& .MuiPickersLayout-root': {
            display: 'flex',
            flexDirection: 'column',
          },
          '& .MuiDialogActions-root': {
            order: 2,
          },
          '& .MuiPickersCalendarHeader-root': {
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            paddingBottom: 1,
          },
        },
      },
      layout: {
        sx: {
          display: 'flex',
          flexDirection: 'column',
          '.MuiPickersLayout-actionBar': {
            order: 1,
          },
        },
      },
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {dateFormate !== 'YYYY-MM-DD HH:mm' ? (
        <DatePicker
          {...pickerProps}
          value={dateState}
          onChange={handleDateChange}
          views={decidedViewValues}
          label={placeholder}
          className={className}
          // disableOpenPicker
        />
      ) : (
        <DateTimePicker
          {...pickerProps}
          value={dateState}
          onChange={handleDateChange}
          views={['year', 'month', 'day', 'hours', 'minutes']}
          label={placeholder}
          className={classNames('w-80', className)}
          format="YYYY-MM-DD hh:mm A (CET)"
          // disableOpenPicker
        />
      )}
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
