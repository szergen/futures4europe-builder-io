import classNames from 'classnames';
import React from 'react';
import style from './HelpDropdown.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import Tag from '@app/shared-components/Tag/Tag';
import { textAlign, width } from '@mui/system';

const FieldSuggestionTypes = [
  {
    type: (
      <Tag
        name="Agriculture"
        disableLink
        disablePopularityHover
        disableTooltip
      />
    ),
    description: 'pages containing the tag Agriculture',
  },
  {
    type: (
      <div className="flex">
        <Tag name="Energy" disableLink disablePopularityHover disableTooltip />
        <Tag name="Poland" disableLink disablePopularityHover disableTooltip />
      </div>
    ),
    description: 'pages containing both tags Energy and Poland',
  },
  {
    type: (
      <div className="flex">
        <Tag
          name="Project Result"
          disableLink
          disablePopularityHover
          disableTooltip
        />
        <Tag
          name="Scenarios"
          disableLink
          disablePopularityHover
          disableTooltip
        />
      </div>
    ),
    description: 'Project Result pages containing the tag Scenarios',
  },
  {
    type: (
      <Tag
        name="Austrian Institute of Technology"
        picture="https://static.wixstatic.com/media/471908_2b136e1495dd4326843fd89d2227ac75~mv2.jpg"
        tagPageLink="/organisation/austrian-institute-of-technology-gdfy0"
        tagType="organisation"
        tagLine="AIT Center for Innovation Systems & Policy"
        disablePopularityHover
        disableTooltip
      />
    ),
    description: 'pages containing the tag Austrian Institute of Technology',
  },
  {
    type: <div className="text-black">future </div>,
    description: 'search by free text in pages containing the text "future"',
  },
  // {
  //   type: <div>activity: [tag name]</div>,
  //   description: 'to filter by activity',
  // },
  // {
  //   type: 'coordinator',
  //   description: '[name] - to filter by coordinator',
  // },
];

export type HelpDropdownProps = {
  handleTagSuggestion: (e: any) => void;
};

const HelpDropdown: React.FC<HelpDropdownProps> = ({ handleTagSuggestion }) => {
  // Container animation variants
  const containerVariants = {
    hidden: {
      opacity: 0,
      scaleY: 0,
    },
    visible: {
      opacity: 1,
      scaleY: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  // Item animation variants
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  // Description text animation variants
  const descriptionVariants = {
    hidden: {
      opacity: 0,
      x: -10,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
        delay: 0.2, // Delay to start after the main item appears
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        className={classNames('relative z-10 display-block')}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          transformOrigin: 'top',
          backgroundColor: 'white',
          borderRadius: '4px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          width: '45vw',
          maxWidth: '100%',
        }}
      >
        <div className={style.helpDropdownContainer}>
          <motion.div
            className={classNames(style.iconSearchTips, 'flex items-center')}
            variants={itemVariants}
          >
            <span className="ml-2 text-[14px]"></span>
            {/* <HiDocumentSearch /> */}
            <span className="ml-2 text-[14px]"></span>{' '}
            {/* The text with margin for spacing */}
          </motion.div>

          <br />
          {FieldSuggestionTypes.map((field, index) => (
            <motion.div
              key={field.description + index}
              className={classNames(style.textSearchTips, 'flex items-center')}
              variants={itemVariants}
            >
              <span
                key={`${field.description}`}
                onMouseDown={(e) => {
                  if (index < FieldSuggestionTypes.length - 1) {
                    handleTagSuggestion(e);
                  }
                }}
                className={style.fieldType}
              >
                {field.type}
              </span>{' '}
              <motion.span
                className={style.fieldDescription}
                variants={descriptionVariants}
                style={{
                  color: '#8f8f8f',
                  // width: '100%',
                  // overflow: 'hidden',
                  // textAlign: 'right',
                  fontSize: '14px',
                  marginLeft: '4px',
                }}
              >
                {field.description}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HelpDropdown;
