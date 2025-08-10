import React from 'react';

interface DividerProps {
  color?: string;
  thickness?: string;
  style?: string;
  className?: string;
}

const Divider: React.FC<DividerProps> = ({
  color = '#d9d9d9',
  thickness = '1px',
  style = 'solid',
  className,
}) => {
  return (
    <div
      style={{
        borderTop: `${thickness} ${style} ${color}`,
      }}
      className={className}
    />
  );
};

export default Divider;
