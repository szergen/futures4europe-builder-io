import Image from 'next/image';
import style from './HeaderComponent.module.css';
import classNames from 'classnames';
import Typography from '@app/shared-components/Typography/Typography';
import Tag from '@app/shared-components/Tag/Tag';
import { formatDate } from '../../PostPageComponent.utils';
import Divider from '@app/shared-components/Divider/Divider';
import Link from 'next/link';

export type AuthorComponentProps = {
  authors: Array<{
    name: string;
    picture: string;
    tagPageLink: string;
  }>;
};

const AuthorComponent: React.FC<AuthorComponentProps> = ({ authors }) => {
  return (
    <div className="mb-4">
      <span className="me-2.5 text-gray-400">
        Author{authors?.length > 1 ? 's' : ''}:
      </span>
      {authors?.map((author, index) => (
        <Tag
          key={`${author.name} - ${index}`}
          name={author.name}
          tagPageLink={author.tagPageLink}
          picture={author.picture}
        />
      ))}
    </div>
  );
};

export default AuthorComponent;
