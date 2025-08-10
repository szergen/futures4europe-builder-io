import React from 'react';
import classNames from 'classnames';
import style from './MiniPageProjectResults.module.css';
import Image from 'next/image';
import Typography from '../Typography/Typography';
import Tag, { TagProps } from '../Tag/Tag';

export type MiniPageProjectResultsProps = {
  title: string;
  date: string;
  image?: string;
  project: TagProps;
  text?: string;
  tags?: Array<TagProps>;
  recommendations?: {
    number: number;
    images: string[];
  };
};

export const MiniPageProjectResults: React.FC<MiniPageProjectResultsProps> = ({
  title,
  date,
  image,
  project,
  text,
  tags,
  recommendations,
}) => {
  console.log('MiniPageProject ResultTitle', title);

  return (
    <div className={classNames(style.projectResultItem)}>
      <Image
        src={image || 'https://placehold.co/600x400?text=placeholder'}
        width={180}
        height={180}
        alt="Project Result Image"
        className={classNames('rounded-md', style.projectResultImage)}
      />
      <div className={classNames(style.projectResultContent)}>
        {/* Project Result Title */}
        <Typography tag="h3" className="text-gray-800 font-bold">
          {title}
        </Typography>
        {/* Project Result Date */}
        <Typography tag="p" className="text-gray-500 text-xs">
          {date}
        </Typography>
        {/* Project */}
        <div className={classNames(style.project)}>
          <Tag {...project} />
        </div>

        {/* Project Result Text */}
        <Typography
          tag="p"
          className="text-gray-500 py-2 text-sm max-h-12 overflow-hidden"
        >
          {text}
        </Typography>
        {/* Project Result Tags */}
        <div className={classNames(style.projectResultTags)}>
          {tags?.map((tag) => (
            <Tag key={tag.name} {...tag} />
          ))}
        </div>
        {/* Project Result recommendations */}
        <div className={classNames(style.projectResultRecommandations)}>
          {recommendations?.images.map((image, index) => (
            <Image
              src={image}
              key={`${index} - ${image}`}
              width={17}
              height={17}
              className={classNames('rounded-full')}
              alt={`Recommended by Person Image ${image}`}
            />
          ))}
          <Typography tag="p" className="text-xs text-gray-400 px-4">
            Recommended by {recommendations?.number ?? 0}{' '}
            {recommendations?.number && recommendations.number < 1
              ? 'person'
              : 'persons'}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default MiniPageProjectResults;
