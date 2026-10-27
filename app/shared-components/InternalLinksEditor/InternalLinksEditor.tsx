import { Tooltip } from 'flowbite-react';
import { useState } from 'react';
import { useAuth } from '@app/custom-hooks/AuthContext/AuthContext';
import {
  INTERNAL_LINK_ERRORS,
  findPostByPath,
  normaliseInternalLinks,
  parseInternalLinkInput,
  resolveInternalLinks,
} from '@app/utils/internal-links-utils';
import Typography from '../Typography/Typography';
import classNames from 'classnames';
import style from './InternalLinksEditor.module.css';
import MiniPagePost from '../MiniPagePost/MiniPagePost';
import { getPropsForMiniPagesListItemPost } from '@app/page-components/shared-page-components/MiniPagesListComponentPost/components/MiniPagesListItemPost/MiniPagesListItemPost.utils';

export type InternalLinksEditorProps = {
  internalLinks?: any[];
  handleUpdatePostData?: (data: any) => void;
  title?: string;
};

export const InternalLinksEditor: React.FC<InternalLinksEditorProps> = ({
  internalLinks: initialInternalLinks,
  handleUpdatePostData,
  title,
}) => {
  const [internalLinks, setInternalLinks] = useState(() =>
    normaliseInternalLinks(initialInternalLinks)
  );

  const { postPages, postPagesFetched } = useAuth();
  const resolvedLinks = resolveInternalLinks(internalLinks, postPages);

  const updateLinks = (links: any[]) => {
    setInternalLinks(links);
    handleUpdatePostData && handleUpdatePostData(links);
  };

  //   #region add new link
  const [newLink, setNewLink] = useState('');
  const [error, setError] = useState('');

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = parseInternalLinkInput(
      newLink,
      typeof window !== 'undefined' ? window.location.hostname : undefined
    );
    if (parsed.error !== undefined) {
      setError(parsed.error);
      return;
    }

    const pageFound = findPostByPath(postPages, parsed.path);
    if (!pageFound) {
      setError(INTERNAL_LINK_ERRORS.notFound);
      return;
    }
    if (internalLinks.some((link) => link._id === pageFound._id)) {
      setError(INTERNAL_LINK_ERRORS.duplicate);
      return;
    }

    updateLinks([...internalLinks, pageFound]);
    setNewLink('');
    setError('');
  };
  //   #endregion

  if (!postPagesFetched) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      {title && (
        <Typography
          tag="h2"
          className={classNames(
            'text-gray-800 w-full my-4',
            style.tagListTitle
          )}
        >
          <span>{title}</span>
          <Tooltip content="Paste the link of a post on futures4europe.eu, e.g. https://www.futures4europe.eu/post/my-article or /post/my-article">
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
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
              />
            </svg>
          </Tooltip>
        </Typography>
      )}
      {/* Input field and submit button */}
      <form className="relative" onSubmit={handleAddLink}>
        <input
          type="text"
          value={newLink}
          onChange={(e) => setNewLink(e.target.value)}
          placeholder="Paste the link of a related post on futures4europe.eu"
          className={classNames(
            'text-gray-400 w-full',
            style.InternalLinksEditor_input
          )}
        />
        <button
          type="submit"
          className={classNames('', style.InternalLinksEditor_button)}
        >
          Add Link
        </button>
      </form>
      {/* Error message */}
      {error && <div className="text-red-500 mt-2">{error}</div>}

      {/* List of internal links */}
      <div>
        {resolvedLinks.map((link) => (
          <div className="relative" key={link._id}>
            <MiniPagePost {...getPropsForMiniPagesListItemPost(link)} />
            <button
              type="button"
              onClick={() =>
                updateLinks(
                  internalLinks.filter((item) => item._id !== link._id)
                )
              }
              className="bg-red-500 text-white p-2 absolute -right-32 top-0"
            >
              Remove Link
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InternalLinksEditor;
