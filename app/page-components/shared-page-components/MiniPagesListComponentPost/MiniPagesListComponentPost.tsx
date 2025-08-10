import MiniPagesListItemPost from './components/MiniPagesListItemPost/MiniPagesListItemPost';
import InternalLinksEditor from '@app/shared-components/InternalLinksEditor/InternalLinksEditor';

export type MiniPagesListComponentPostProps = {
  isEditModeOn?: boolean;
  internalLinks?: any[];
  handleUpdatePostData?: (data: any) => void;
  title?: string;
};

const MiniPagesListComponentPost: React.FC<MiniPagesListComponentPostProps> = ({
  isEditModeOn,
  internalLinks,
  handleUpdatePostData,
  title,
}) => {
  return (
    <>
      {/* Posts */}
      {internalLinks && internalLinks.length > 0 && !isEditModeOn && (
        <MiniPagesListItemPost items={internalLinks} title={title} />
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
