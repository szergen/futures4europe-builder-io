import React from 'react';

type IconProps = {
  className?: string;
  size?: number | string;
  sizeW?: number | string;
  sizeH?: number | string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: string;
  strokeLinejoin?: string;
  ariaLabel?: string;
  role?: 'img' | 'presentation' | 'none';
  ariaHidden?: boolean;
  onClick?: (event: React.MouseEvent<SVGElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<SVGElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<SVGElement>) => void;
  animate?: boolean;
  transition?: string;
  viewBox?: string;
  preserveAspectRatio?: string;
  title?: string;
  opacity?: number;
  rotate?: number;
  style?: React.CSSProperties;
  inline?: boolean;
  children: React.ReactNode;
};

const Icon: React.FC<IconProps> = ({
  className,
  size = 28,
  sizeW = 28,
  sizeH = 28,
  fill = 'none',
  stroke = 'currentColor',
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
  strokeWidth = 2,
  ariaLabel,
  role = 'img',
  ariaHidden = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
  animate,
  transition,
  viewBox = '0 0 32 32',
  preserveAspectRatio = 'xMidYMid meet',
  title,
  opacity = 1,
  rotate = 0,
  style,
  inline = true,
  children,
  ...restProps
}) => {
  const displayClass = inline ? 'inline-block' : 'block';
  const combinedClassName = className
    ? `${displayClass} ${className}`
    : displayClass;

  const svgProps = {
    className: combinedClassName,
    fill,
    stroke,
    strokeWidth,
    strokeLinecap,
    strokeLinejoin,
    viewBox,
    preserveAspectRatio,
    xmlns: 'http://www.w3.org/2000/svg',
    width: sizeW !== undefined ? sizeW : size,
    height: sizeH !== undefined ? sizeH : size,
    style: {
      transition,
      opacity,
      transform: rotate ? `rotate(${rotate}deg)` : undefined,
      ...style,
    },
    onClick,
    onMouseEnter,
    onMouseLeave,
    'aria-label': ariaLabel,
    role,
    'aria-hidden': ariaHidden,
    ...restProps,
  };

  return (
    <svg {...svgProps}>
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
};

export default Icon;
