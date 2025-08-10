import React, { useEffect } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import SpriteSvg from '@app/shared-components/SpriteSvg/SpriteSvg';
import style from './NavDashboard.module.css';
import { useState } from 'react';
import { useAuth } from '@app/custom-hooks/AuthContext/AuthContext';
interface IconProps {
  className?: string;
  size?: number;
  sizeW?: number;
  sizeH?: number;
  fill?: string;
  strokeWidth?: number;
  inline?: boolean;
  viewBox?: string;
}
// Navigation item configuration type
interface NavConfig {
  href: string;
  icon: React.ComponentType<IconProps>;
  text: string;
  iconProps?: Partial<IconProps>;
}
// Main component props simplified
interface UserDashboardProps {
  customStyles?: {
    wrapper?: string;
    navItem?: string;
  };
  SubNav?: React.ReactNode;
  activeItem?: string;
}

// Navigation configuration - moved outside component to prevent recreation
const NAV_ITEMS: NavConfig[] = [
  {
    href: '/dashboard/posts',
    icon: SpriteSvg.AccountPostIcon,
    text: 'Posts',
  },
  {
    href: '/dashboard/projects',
    icon: SpriteSvg.AccountProjectIcon,
    text: 'Projects',
    iconProps: { strokeWidth: 2.2, fill: 'none' },
  },
  {
    href: '/dashboard/project-results',
    icon: SpriteSvg.AccountProjectResultsIcon,
    text: 'Project Results',
    iconProps: {
      strokeWidth: 0.2,
      sizeW: 24,
      sizeH: 24,
      viewBox: '0 0 20 20',
    },
  },
  {
    href: '/dashboard/events',
    icon: SpriteSvg.AccountEventsIcon,
    text: 'Events',
    iconProps: { strokeWidth: 0, fill: 'currentColor' },
  },
  {
    href: '/dashboard/organisations',
    icon: SpriteSvg.AccountOrgIcon,
    text: 'Organisations',
    iconProps: { sizeW: 34, sizeH: 32 },
  },
  {
    href: '/dashboard',
    icon: SpriteSvg.AccountPersonIcon,
    text: 'My Info Page',
  },
];

// Simplified NavItem component
const NavItem: React.FC<{
  item: NavConfig;
  active: boolean;
  onClick: () => void;
  className?: string;
}> = ({ item, active, onClick, className }) => (
  <Link
    href={item.href}
    className={classNames(
      className,
      style.navItem,
      'text-white flex justify-center items-center',
      active && style.active
    )}
  >
    <button
      className={classNames(
        style.navButton,
        'font-semibold flex flex-col justify-center items-center'
      )}
      onClick={onClick}
    >
      <item.icon
        className="mb-2"
        fill="currentColor"
        strokeWidth={0}
        {...item.iconProps}
      />
      <span>{item.text}</span>
    </button>
  </Link>
);
const UserDashboard: React.FC<UserDashboardProps> = ({
  customStyles,
  SubNav,
  activeItem = '',
}) => (
  <>
    <div
      className={classNames(
        style.UserDashboardWrapper,
        style.UserDashboardNavItem,
        customStyles?.wrapper,
        'flex m-auto justify-center relative mb-4'
      )}
    >
      {NAV_ITEMS.map((item) => (
        <NavItem
          key={item.href}
          item={item}
          active={activeItem === item.href}
          onClick={() => {}} // Add onClick handler if needed
          className={customStyles?.navItem}
        />
      ))}
    </div>
    {/* {SubNav} */}
  </>
);

export default UserDashboard;
