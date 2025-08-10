import React from 'react';

type IconProps = {
  className?: string;
  children: React.ReactNode;
};

const Icons: React.FC<IconProps> = ({ className, children }) => {
  return <span className={className}>{children}</span>;
};

export default Icons;
