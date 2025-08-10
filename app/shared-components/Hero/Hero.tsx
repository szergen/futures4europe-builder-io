import React from 'react';
import classNames from 'classnames';
import style from './Hero.module.css';

export type HeroProps = {
  title: string;
  subtitle?: string;
  pageType?: string;
  children?: React.ReactNode;
};

const Hero = ({ title, subtitle, pageType, children }: HeroProps) => {
  const getSubtitle = () => {
    if (subtitle) return subtitle;

    switch (pageType?.toLowerCase()) {
      case 'event':
        return 'sorted by event start date';
      case 'project':
        return 'sorted by project start date';
      case 'project-result':
        return 'sorted by result publication date';
      case 'organisation':
        return 'sorted by published date';
      case 'person':
        return 'sorted by creation date';
      case 'post':
        return 'sorted by published date';
      default:
        return 'sorted by published date';
    }
  };

  return (
    <div
      className={classNames(
        style.heroContainer,
        'bg-gray-100',
        'p-8',
        'mb-8',
        'text-center'
      )}
    >
      <h1
        className={classNames('text-4xl', 'font-bold', 'mb-4', style.heroTitle)}
      >
        {title}
      </h1>
      {children}
      <p className={classNames('text-lg', 'text-white')}>{getSubtitle()}</p>
    </div>
  );
};

export default Hero;
