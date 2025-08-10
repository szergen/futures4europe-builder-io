import React from 'react';
import classNames from 'classnames';
import style from './Label.module.css';

export type LabelProps = {
  text: string;
  htmlFor: string;
  className?: string;
};

const Label: React.FC<LabelProps> = ({ text, htmlFor, className }) => {
  return (
    <label htmlFor={htmlFor} className={classNames(style.label, className)}>
      {text}
    </label>
  );
};

export default Label;
