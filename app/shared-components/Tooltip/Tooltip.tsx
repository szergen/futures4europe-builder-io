import classNames from 'classnames';
import React, { useState } from 'react';
import style from './Tooltip.module.css';

export type TooltipProps = {
  text?: string;
  tooltipText: string;
  classNameForButton?: string;
  classNameForTooltip?: string;
};

const Tooltip: React.FC<TooltipProps> = ({
  text,
  tooltipText,
  classNameForButton,
  classNameForTooltip,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <span className="relative">
      <button
        className={classNames(
          'focus:outline-none',
          style.buttonText,
          classNameForButton
        )}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {text ? (
          text
        ) : (
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
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
        )}
      </button>
      {showTooltip && (
        <div
          className={classNames(
            'absolute z-10 p-2 mt-2 text-xs font-semibold text-white bg-black rounded shadow-md bottom-7 -right-20 transform ',
            style.tooltip,
            classNameForTooltip
          )}
        >
          {tooltipText}
        </div>
      )}
    </span>
  );
};

export default Tooltip;
