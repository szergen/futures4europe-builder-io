import React from 'react';
import style from '../../Tag.module.css';

export type TagCloseButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const TagCloseButton: React.FC<TagCloseButtonProps> = ({ onClick }) => (
  <button className={style.tagCloseButton} onClick={onClick}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
);

export default TagCloseButton;
