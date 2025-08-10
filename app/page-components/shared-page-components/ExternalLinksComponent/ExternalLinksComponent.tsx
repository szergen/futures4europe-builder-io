import style from './ExternalLinksComponent.module.css';
import classNames from 'classnames';
import Typography from '@app/shared-components/Typography/Typography';
import LinkComponent from '@app/shared-components/LinkComponent/LinkComponent';

export type ExternalLinksComponentProps = {
  links: {
    href: string;
    description: string;
  }[];
};

const ExternalLinksComponent: React.FC<ExternalLinksComponentProps> = ({
  links,
}) => {
  return (
    <section className={classNames(style.externalLinks)}>
      <Typography
        tag="h2"
        className={classNames(
          'text-gray-800 w-full my-4',
          style.externalLinksTitle
        )}
      >
        External Links
      </Typography>
      {/* Links */}
      {links.map((link, index) => (
        <LinkComponent key={link.href + '-' + index} {...link} />
      ))}
      {/* Example Links */}
    </section>
  );
};

export default ExternalLinksComponent;
