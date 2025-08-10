import classNames from 'classnames';
import { Label, TextInput, Textarea, Toast } from 'flowbite-react';
import { title } from 'process';
import { use, useEffect, useState } from 'react';

export type InputTextProps = {
  label?: string;
  placeholder?: string;
  helperText?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validate?: (value: string) => string;
  setValidationState?: (value: any) => void;
  shouldUpdateValueState?: boolean;
  isHorizontal?: boolean;
  type?: string;
  ref?: any;
  inputId?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
};

export const InputText: React.FC<InputTextProps> = ({
  label,
  helperText,
  placeholder,
  className,
  value,
  onChange,
  validate,
  setValidationState,
  shouldUpdateValueState,
  isHorizontal,
  type,
  ref,
  inputId,
  onKeyDown,
}) => {
  // Handle on change
  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState(''); // State for error message

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    console.log(newValue);
    setInputValue(newValue);

    if (validate) {
      const errorMessage = validate(newValue);
      setError(errorMessage);
    }
    onChange && onChange(e);
    setError('');
  };

  useEffect(() => {
    if (inputValue === '' && validate) {
      // console.log('This field is required');
      setError('This field is required');
    }
    if (validate) {
      // console.log('Validating');
      const errorMessage = validate(value);
      setValidationState && setValidationState(errorMessage);
      setError(errorMessage);
    }
  }, [inputValue]);

  const autoResize = (e) => {
    // e.target.style.height = 'auto'; // Reset height
    e.target.style.height = e.target.scrollHeight + 'px'; // Adjust height based on content
  };

  const autoResizeInput = (input: HTMLInputElement) => {
    // input.style.width = 'auto';
    input.style.width = input.scrollWidth + 'px';
  };

  // Avoid navigation on backspace
  useEffect(() => {
    // setInputValue(value);
    const handleKeyDown = (e) => {
      if (
        e.key === 'Backspace' &&
        e.target.tagName !== 'INPUT' &&
        e.target.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (shouldUpdateValueState) {
      setInputValue(value);
    }
  }, [value]);

  return (
    <>
      {label && (
        <div className="mb-2 block">
          <Label htmlFor="email3" value={label} />
        </div>
      )}
      {isHorizontal ? (
        <input
          ref={ref}
          id={inputId || label?.toLowerCase()}
          type={type || 'text'}
          placeholder={placeholder ? placeholder : undefined}
          required
          helperText={helperText ? <>{helperText}</> : undefined}
          className={className}
          value={inputValue}
          onChange={handleChange}
          onInput={(e) => autoResizeInput(e.target as HTMLInputElement)}
        />
      ) : (
        <Textarea
          id={inputId || label?.toLowerCase()}
          type="text"
          placeholder={placeholder ? placeholder : undefined}
          // required
          helperText={helperText ? <>{helperText}</> : undefined}
          className={classNames('relative', className)}
          value={inputValue}
          onChange={handleChange}
          onInput={autoResize}
          onKeyDown={onKeyDown}
        />
      )}
      {/* <TextInput
        id={label?.toLowerCase()}
        type="text"
        placeholder={placeholder ? placeholder : undefined}
        required
        helperText={helperText ? <>{helperText}</> : undefined}
        className={className}
        value={inputValue}
        onChange={handleChange}
      /> */}
      {/* <Textarea
        id={label?.toLowerCase()}
        type="text"
        placeholder={placeholder ? placeholder : undefined}
        required
        helperText={helperText ? <>{helperText}</> : undefined}
        className={className}
        value={inputValue}
        onChange={handleChange}
        onInput={autoResize}
      /> */}
      {/* {error && <p className="errorInputText text-red-500 text-xs">{error}</p>}{' '} */}
      {error && (
        <Toast className="absolute left-3/4 z-10">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500">
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-8 4a1 1 0 100-2 1 1 0 000 2zm-1-7a1 1 0 012 0v4a1 1 0 01-2 0V7z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3 text-sm font-normal">{error}</div>
        </Toast>
      )}
    </>
  );
};

export default InputText;
