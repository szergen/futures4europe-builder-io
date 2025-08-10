// TODO @ALEX verificat new prop

import React from 'react';
import style from './PopoverComponent.module.css';
import classNames from 'classnames';
import { Popover } from 'flowbite-react';
import Image from 'next/image';
import { getImageUrlForMedia } from '@app/page-components/PageComponents.utils';

export type PopoverProps = {
  children?: React.ReactNode;
  triggerID?: string;
  popoverTitle?: string;
  className?: string;
  trigger: 'click' | 'hover';
  popoverImage?: string;
  popoverImageAlt?: string;
  popoverSubtitle?: string;
  alwaysVisible?: boolean; // New prop to control visibility
};

const PopoverComponent: React.FC<PopoverProps> = ({
  children,
  className,
  trigger,
  popoverTitle,
  popoverImage,
  popoverImageAlt,
  popoverSubtitle,
  alwaysVisible, // Destructure the new prop // TODO @ALEX verificat new prop
}) => {
  const content = (
    <div
      className={classNames(
        style.popOverTooltip, // Corrected class name
        'w-auto bg-transparent overflow-visible'
      )}
    >
      <div className="flex">
        {popoverImage && (
          <Image
            src={
              getImageUrlForMedia(popoverImage)?.url ||
              getImageUrlForMedia(popoverImage) ||
              'https://placehold.co/147x147?text=Profile+Image'
            }
            alt={popoverImageAlt || 'Image picture'}
            width={200}
            height={200}
            className="object-cover rounded" // Optional: Enhance styling
          />
        )}
        <div className="flex flex-wrap">
          <span className={classNames(popoverImage && 'p-2')}>
            <p className={classNames(style.popOverTitle, 'font-bold')}>
              {popoverTitle}
            </p>
            <p className={classNames(style.popOverSubtitle, '')}>
              {popoverSubtitle}
            </p>
          </span>
        </div>
      </div>
    </div>
  );

  // TODO @ALEX verificat new prop
  if (alwaysVisible) {
    // Render the popover content directly without the Popover wrapper
    return (
      <div className={classNames('w-auto text-sm', className)}>{content}</div>
    );
  }

  // Render the Popover component as usual
  return (
    <Popover
      className={classNames(
        style.contentOverflowVisible,
        'absolute z-20 inline-block w-max max-w-[100vw] rounded-2xl overflow-visible bg-transparent outline-none border-0 shadow-non'
      )}
      content={content}
      trigger={trigger}
      placement="top"
      arrow={false}
    >
      {children}
    </Popover>
  );
};

export default PopoverComponent;
