'use client';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { WixMediaImage } from '@app/shared-components/WixMediaImage/WixMediaImage';
import Typography from '@app/shared-components/Typography/Typography';
import Label from '@app/shared-components/Label/Label';
import style from './Testpage.module.css';
import Button from '@app/shared-components/Button/Button';
import Tooltip from '@app/shared-components/Tooltip/Tooltip';
import Tooltip2 from '@app/shared-components/Tooltip2/Tooltip2';
import Icons from '@app/shared-components/Icons/Icons';
import Tag from '@app/shared-components/Tag/Tag';
import { TagCategories } from '@app/shared-components/Tag/Tag.utils';
import PopoverComponent from '@app/shared-components/PopoverComponent/PopoverComponent';
import TagPicker from '@app/shared-components/TagPicker/TagPicker';
import { RelationTagPicker } from '@app/shared-components/RelationTagPicker/RelationTagPicker';
import DatePicker from '@app/shared-components/DatePickerComponent/DatePickerComponent';
import Tooltip3 from '@app/shared-components/Tooltip3/Tooltip3';
import RTEComponent from '@app/shared-components/RTEComponent/RTEComponent';
import ModalComponent from '@app/shared-components/ModalComponent/ModalComponent';
// import DatePicker from 'react-datepicker';

export default function TestPage() {
  console.log('TestPage');
  const onClickHandler = () => {
    console.log('Button clicked');
  };
  return (
    <div className={classNames('relative', style.testPageContainer)}>
      {/* Typography examples */}
      <Typography tag="h1" className="text-center font-site">
        This is an H1 element
      </Typography>
      <Typography tag="h2" className="text-center font-site">
        This is an H2 element
      </Typography>
      <Typography tag="h3" className="text-center  text-blue-site font-site">
        This is an H3 element
      </Typography>
      <Typography tag="h4" className="text-center  text-blue-site font-site">
        This is an H4 element
      </Typography>
      <Typography
        tag="p"
        className="text-center  text-blue-site font-site mb-8"
      >
        This is a paragraph element
      </Typography>
      {/* Label examples */}
      <Label text="This is a default styled label" htmlFor="test" />
      <Label
        text="This is a label with overridden styles from tailwindcss"
        htmlFor="test"
        className="!text-blue-site mb-8"
      />
      <Label
        text="This is another label with overridden styles from the page"
        htmlFor="test"
        className={style.labelStyle}
      />
      {/* Button examples */}
      <Button onClick={onClickHandler}>This is a default styled button</Button>
      <Button onClick={onClickHandler} className="!bg-blue-site">
        This is a button with overridden styles from tailwindcss
      </Button>
      <Button onClick={onClickHandler} className={style.buttonStyle}>
        This is another button with overridden styles from the page
      </Button>
      <br />
      <br />
      {/* Tooltip examples */}
      <Tooltip tooltipText="Velit eu nostrud elit elit cupidatat sit magna ad nostrud officia." />
      <Tooltip text="info" tooltipText="Velit eu nostrud elit " />
      {/* Tooltip2 examples */}
      <br />
      <br />
      <Tooltip2
        tooltipText="Velit eu nostrud elit elit cupidatat sit magna ad nostrud officia."
        placement="bottom"
        classNameFoContainer="mx-4"
      />
      <Tooltip2
        text="info"
        tooltipText="Velit eu nostrud elit elit cupidatat sit magna ad nostrud officia."
        classNameFoContainer="!bg-blue-site"
        placement="top"
      />
      <Tooltip2
        text="info"
        tooltipText="Velit eu nostrud elit elit cupidatat sit magna ad nostrud officia."
        placement="right"
        classNameFoContainer="mx-4"
      />
      <Tooltip2
        text="info"
        tooltipText="Velit eu nostrud"
        placement="left"
        classNameFoContainer="mx-4"
      />
      <Tooltip3 trigger="hover" popoverContent="This is a hover text">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 inline-block"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
          />
        </svg>
      </Tooltip3>
      <br />
      <br />
      <Icons className="w-6 h-6 text-red-500">
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
            d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </Icons>
      <br />
      {/* Tag examples */}
      <Tag name="This is a default styled tag" />
      <Tag
        name="This is a tag with overridden styles from tailwindcss"
        className="!bg-pink-100"
      />
      <Tag
        name="This is another tag with overridden styles from the page"
        className={style.buttonStyle}
      />
      <br />
      <br />
      <Tag
        name="This is a tag with forced picture"
        tagCategory={TagCategories.person}
      />
      <Tag
        name="This is a tag with picture"
        picture="https://picsum.photos/id/1011/40/40"
        className="!bg-pink-100"
      />
      <Tag
        name="This is a tag with picture"
        picture="https://picsum.photos/id/550/40/40"
        popularity={5}
        tagTrend={2}
      />
      <br />
      <br />
      <Tag
        name="This is a tag with picture"
        popularity={15}
        tagTrend={5}
        tagCategory={TagCategories.person}
      />
      <Tag
        name="This is a tag with picture"
        picture="https://picsum.photos/id/550/40/40"
        popularity={15}
        tagTrend={2}
        tagCategory={TagCategories.person}
        enableLabel
      />
      <Tag
        name="This is a tag with picture"
        picture="https://picsum.photos/id/550/40/40"
        popularity={15}
        tagTrend={2}
        tagCategory={TagCategories.person}
        editable
      />
      <br />
      <br />
      <Tag
        name="This is a default tag with link"
        href="https://google.com"
        popularity={15}
        tagTrend={2}
      />
      <Tag
        name="This is a tag with link and picture"
        href="https://google.com"
        picture="https://picsum.photos/id/650/40/40"
      />
      <br />
      <br />
      {/* Date Picker */}
      <DatePicker date={new Date('2023-2-1')} className="w-max" />
      <br />
      <br />
      {/* TagPicker Examples */}
      <span>Single Select</span>
      <TagPicker className="w-1/2" />
      <br />
      <br />
      <span>Multi Select</span>
      <TagPicker className="w-1/2" isMulti />
      <br />
      <br />
      <span>Relation Tag Picker</span>
      <RelationTagPicker />
      <br />
      <br />
      <RTEComponent />
      <br />
      <br />
      <ModalComponent buttonText="Open Modal" headerTitle="Modal Header">
        <p>Modal Content</p>
      </ModalComponent>
    </div>
  );
}
