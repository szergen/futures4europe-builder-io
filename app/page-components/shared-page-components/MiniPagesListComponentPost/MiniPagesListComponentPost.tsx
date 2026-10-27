import MiniPagesListItemPost from './components/MiniPagesListItemPost/MiniPagesListItemPost';
import InternalLinksEditor from '@app/shared-components/InternalLinksEditor/InternalLinksEditor';
import { useAuth } from '@app/custom-hooks/AuthContext/AuthContext';
import {
  mergeRelatedContent,
  resolveInternalLinks,
} from '@app/utils/internal-links-utils';

export type MiniPagesListComponentPostProps = {
  isEditModeOn?: boolean;
  /** Links added by hand; these are what the editor changes and saves. */
  internalLinks?: any[];
  /** Posts that reference this page; shown after the manual links, not editable. */
  relatedLinks?: any[];
  handleUpdatePostData?: (data: any) => void;
  title?: string;
};

const MiniPagesListComponentPost: React.FC<MiniPagesListComponentPostProps> = ({
  isEditModeOn,
  internalLinks,
  relatedLinks,
  handleUpdatePostData,
  title,
}) => {
  const { postPages } = useAuth();
  const items = mergeRelatedContent(
    resolveInternalLinks(internalLinks, postPages),
    relatedLinks
  );

  return (
    <>
      {/* Posts */}
      {items.length > 0 && !isEditModeOn && (
        <MiniPagesListItemPost items={items} title={title} />
      )}
      {isEditModeOn && (
        <div className="w-full">
          <InternalLinksEditor
            internalLinks={internalLinks}
            handleUpdatePostData={handleUpdatePostData}
            title={title}
          />
        </div>
      )}
    </>
  );
};

export default MiniPagesListComponentPost;
