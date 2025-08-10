import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import SpriteSvg from '@app/shared-components/SpriteSvg/SpriteSvg';
import style from './NavDashboard.module.css';

interface SubNavProps {
  items: Array<{
    href: string;
    text: string;
    isActive?: boolean;
  }>;
  overrideStyle: {
    subnavDashboard: string;
    UserDashboardWrapper: string;
    subnavLink: string;
    active: string;
  };
}

const SubNav: React.FC<SubNavProps> = ({ items, overrideStyle }) => (
  <div className={style.subnavDashboard}>
    <ul
      className={classNames(
        style.UserDashboardWrapper,
        'flex flex-row m-auto align-center place-content-evenly'
      )}
    >
      {items.map((item, index) => (
        <li key={index}>
          <Link
            href={item.href}
            className={classNames(
              item.isActive ? style.active : style.subnavLink,
              ''
            )}
          >
            {item.text}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default SubNav;
