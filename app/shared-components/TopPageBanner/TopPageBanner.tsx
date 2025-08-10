import { Badge } from 'flowbite-react';
import classNames from 'classnames';

interface TopPageBannerProps {
  style?: {
    topbarlink: string;
  };
}

export const TopPageBanner: React.FC<TopPageBannerProps> = ({
  style = { topbarlink: '' },
}) => {
  return (
    <div
      className={classNames(
        style.topbarlink,
        'top-info-bar bg-[#75c] text-[#2674af] text-xs py-2 px-5'
      )}
    >
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-between">
          <div className="flex flex-row font-medium text-lg lg:flex hidden lg:text-base text-white">
            <Badge className="rounded-lg mr-4" color="purple" size="sm">
              BETA
            </Badge>
            Welcome to the new version of futures4europe
          </div>
          <div className="font-medium text-lg lg:text-base lg:block text-white">
            If you see any problems please report them to us at{' '}
            <a
              className={classNames(style.topbarlink)}
              target="_blank"
              href="mailto:info@futures4europe.eu"
              rel="noopener noreferrer"
            >
              info@futures4europe.eu
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPageBanner;
