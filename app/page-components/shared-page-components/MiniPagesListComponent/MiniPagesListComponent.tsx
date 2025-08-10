import style from './MiniPagesListComponent.module.css';
import classNames from 'classnames';
import Typography from '@app/shared-components/Typography/Typography';
import { useState } from 'react';
import MiniPagePost from '@app/shared-components/MiniPagePost/MiniPagePost';
import MiniPageProjectResults from '@app/shared-components/MiniPageProjectResults/MiniPageProjectResults';
import MiniPageEvents from '@app/shared-components/MiniPageEvents/MiniPageEvents';
import MiniPagesListItem from './components/MiniPagesListItem/MiniPagesListItem';
import InternalLinksEditor from '@app/shared-components/InternalLinksEditor/InternalLinksEditor';

export type MiniPagesListComponentProps = {
  posts?: any[];
  projectResults?: any[];
  events?: any[];
  isEditModeOn?: boolean;
  internalLinks?: any[];
};

const MiniPagesListComponent: React.FC<MiniPagesListComponentProps> = ({
  posts,
  projectResults,
  events,
  isEditModeOn,
  internalLinks,
}) => {
  return (
    <>
      {/* Posts */}
      {posts && posts.length > 0 && !isEditModeOn && (
        <MiniPagesListItem
          items={posts}
          itemType="post"
          itemTypeTitle="Posts"
        />
      )}
      {isEditModeOn && (
        <div className="w-full">
          <InternalLinksEditor internalLinks={internalLinks} />
        </div>
      )}

      {/* //Project Results 
      {projectResults && projectResults.length > 0 && (
        <MiniPagesListItem
          items={projectResults}
          itemType="projectResults"
          itemTypeTitle="Project Results"
        />
      )}
      //Events 
      {events && events.length > 0 && (
        <MiniPagesListItem
          items={events}
          itemType="events"
          itemTypeTitle="Events"
        />
      )}
      */}
    </>
  );
};

export default MiniPagesListComponent;
