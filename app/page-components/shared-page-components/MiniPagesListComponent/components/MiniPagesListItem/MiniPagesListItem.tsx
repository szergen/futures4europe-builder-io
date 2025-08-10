import style from './MiniPagesListItem.module.css';
import classNames from 'classnames';
import Typography from '@app/shared-components/Typography/Typography';
import { JSXElementConstructor, useState } from 'react';
import MiniPagePost from '@app/shared-components/MiniPagePost/MiniPagePost';
import MiniPageProjectResults from '@app/shared-components/MiniPageProjectResults/MiniPageProjectResults';
import MiniPageEvents from '@app/shared-components/MiniPageEvents/MiniPageEvents';

export type MiniPagesListItemProps = {
  items: any[];
  itemType: string;
  itemTypeTitle: string;
};

const MiniPagesListItem: React.FC<MiniPagesListItemProps> = ({
  items,
  itemType,
  itemTypeTitle,
}) => {
  const [displayCountPosts, setDisplayCountPosts] = useState(3);

  const showMorePosts = () => {
    setDisplayCountPosts(items?.length);
  };
  const showFewerPosts = () => {
    setDisplayCountPosts(3);
  };

  const getComponent = (itemType: string) => {
    switch (itemType) {
      case 'post':
        return MiniPagePost;
      case 'projectResults':
        return MiniPageProjectResults;
      case 'events':
        return MiniPageEvents;
      default:
        return null;
    }
  };

  return (
    <section className={classNames(style.posts)}>
      <Typography
        tag="h2"
        className={classNames('text-gray-800 w-full my-4', style.title)}
      >
        {itemTypeTitle}
      </Typography>
      {items?.slice(0, displayCountPosts).map((item, index) => {
        const Component = getComponent(itemType);
        return Component ? <Component key={index} {...item} /> : null;
      })}
      {displayCountPosts < items.length && (
        <button onClick={showMorePosts} className="w-full my-4">
          Show All {itemTypeTitle}({items.length})
        </button>
      )}
      {displayCountPosts >= items.length && (
        <button onClick={showFewerPosts} className="w-full my-4">
          Show fewer {itemTypeTitle}
        </button>
      )}
    </section>
  );
};

export default MiniPagesListItem;
