import React from 'react';

export type TypographyProps = {
  tag: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  htmlText?: string;
};

const Typography: React.FC<TypographyProps> = ({
  tag,
  className,
  style,
  children,
  htmlText,
}) => {
  const Tag = tag;

  return !htmlText ? (
    <Tag className={className} style={style}>
      {children}
    </Tag>
  ) : (
    <Tag
      className={className}
      style={style}
      dangerouslySetInnerHTML={{
        __html: htmlText.replace('undefined', '') || '',
      }}
    ></Tag>
  );
};

export default Typography;
