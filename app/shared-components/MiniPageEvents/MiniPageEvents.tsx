import React from 'react';
import classNames from 'classnames';
import style from './MiniPageEvents.module.css';
import Image from 'next/image';
import Typography from '../Typography/Typography';
import Tag, { TagProps } from '../Tag/Tag';

export type MiniPageEventsProps = {
  role: 'Participant' | 'Speaker' | string;
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

export const MiniPageEvents: React.FC<MiniPageEventsProps> = ({
  role,
  title,
  date,
  image,
  project,
  text,
  tags,
  recommendations,
}) => {
  console.log('MiniPageEvents Title', title);

  return (
    <div className={classNames(style.eventItem)}>
      <div className="flex flex-col flex-shrink-0">
        <Typography tag="p" className="text-gray-500 text-xs">
          {role} at
        </Typography>
        <Image
          src={image || 'https://placehold.co/600x400?text=placeholder'}
          width={180}
          height={180}
          alt="Event Image"
          className={classNames('rounded-md', style.eventImage)}
        />
      </div>

      <div className={classNames(style.eventContent)}>
        {/* Event Role */}
        {/* <Typography tag="p" className="text-gray-500 text-xs">
          {role} at
        </Typography> */}
        {/* Event Title */}
        <Typography tag="h3" className="text-gray-800 font-bold">
          {title}
        </Typography>
        {/* Event Date */}
        <Typography tag="p" className="text-gray-500 text-xs">
          {date}
        </Typography>
        {/* Project */}
        <div className="flex flex-wrap items-center">
          <Typography tag="p" className="text-gray-500 text-xs">
            An event of the project:
          </Typography>
          <div className={style.project}>
            <Tag {...project} />
          </div>
        </div>

        {/* Event Text */}
        <Typography
          tag="p"
          className="text-gray-500 py-2 text-sm max-h-12 overflow-hidden"
        >
          {text}
        </Typography>
        {/* Event Tags */}
        <div className={classNames(style.eventTags)}>
          {tags?.map((tag) => (
            <Tag key={tag.name} {...tag} />
          ))}
        </div>
        {/* Event recommendations */}
        <div className={classNames(style.eventRecommandations)}>
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

export default MiniPageEvents;
