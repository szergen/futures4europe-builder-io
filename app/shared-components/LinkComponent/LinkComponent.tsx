import Link from 'next/link';
import { useState } from 'react';
import style from './LinkComponent.module.css';
import classNames from 'classnames';
import InputText from '@app/shared-components/InputText/InputText';
import { FloatingLabel } from 'flowbite-react';

export type LinkComponentProps = {
  href: string;
  children?: React.ReactNode;
  className?: string;
  description?: string;
};

const LinkComponent: React.FC<LinkComponentProps> = ({
  href,
  children,
  className,
  description,
}) => {
  const [linkState, setLinkState] = useState({
    description: description,
    link: 'https://google.com',
  });
  const [isDescriptionEdit, setIsDescriptionEdit] = useState(true);
  const [isEditState, setIsEditState] = useState(false);

  return (
    <div className="flex">
      {isEditState ? (
        <>
          <FloatingLabel
            value={!isDescriptionEdit ? linkState.link : linkState.description}
            variant="outlined"
            onChange={(e) =>
              !isDescriptionEdit
                ? setLinkState({ ...linkState, link: e.target.value })
                : setLinkState({ ...linkState, description: e.target.value })
            }
            label={
              !isDescriptionEdit
                ? "Write the link's URL"
                : 'Write the link description'
            }
            className="w-64"
          />
          <button
            onClick={() => setIsDescriptionEdit(!isDescriptionEdit)}
            className="mx-3"
          >
            {isEditState && isDescriptionEdit ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                />
              </svg>
            )}
          </button>
        </>
      ) : (
        <Link
          href={linkState.link}
          className={classNames(style.link, className)}
        >
          {linkState.description}
        </Link>
      )}
      <button onClick={() => setIsEditState(!isEditState)} className="mx-3">
        {isEditState ? 'Save' : 'Edit'}
      </button>
    </div>
  );
};

export default LinkComponent;
