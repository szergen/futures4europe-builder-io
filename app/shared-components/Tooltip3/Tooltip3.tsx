import React from 'react';
import style from './PopoverComponent.module.css';
import classNames from 'classnames';
import { Popover } from 'flowbite-react';
import Image from 'next/image';

export type Tooltip3Props = {
  children?: React.ReactNode;
  popoverContent?: string;
  className?: string;
  trigger: 'click' | 'hover';
  placement?: 'top' | 'right' | 'bottom' | 'left';
};

const Tooltip3: React.FC<Tooltip3Props> = ({
  children,
  className,
  trigger,
  popoverContent,
  placement,
}) => {
  const content = (
    <div className="text-sm text-gray-500 dark:text-gray-400">
      <div className="px-3 py-2 flex">
        <div className="flex flex-wrap">{popoverContent}</div>
      </div>
    </div>
  );

  return (
    <Popover content={content} trigger={trigger} placement={placement || 'top'}>
      {children}
    </Popover>
  );
};
export default Tooltip3;
