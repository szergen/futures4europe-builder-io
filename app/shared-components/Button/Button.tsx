import classNames from 'classnames';
import React from 'react';
import style from './Button.module.css';

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={classNames(style.buttonComponent, className)}
    >
      {children}
    </button>
  );
};

export default Button;
