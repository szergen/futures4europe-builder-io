'use client';
import classNames from 'classnames';
import { WixMediaImage } from '@app/shared-components/WixMediaImage/WixMediaImage';
import Typography from '@app/shared-components/Typography/Typography';
import Label from '@app/shared-components/Label/Label';
import style from './about.module.css';
import Image from 'next/image';
import AnimatedText from '@app/shared-components/Utils/AnimatedText';
import { gsap } from 'gsap';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { Draggable } from 'gsap/Draggable';
import { useEffect } from 'react';

export default function aboutPage() {
  // useEffect(() => {
  //     gsap.registerPlugin(InertiaPlugin, Draggable);
  //     const track = document.querySelector('.track');
  //     const list = document.querySelector('.list');
  //     const carousel = document.querySelector('.carousel');

  //     Draggable.create(track, {
  //         type: 'x',
  //         // edgeResistance: 0.8,
  //         // throwProps: true,
  //         zIndexBoost: false,
  //         bounds: {
  //             minX: -(list?.scrollWidth - carousel?.offsetWidth + (list?.offsetLeft * 2)),
  //             maxX: 0,
  //         },
  //     })

  // }, []);

  // GSDevTools.create();

  return (
    <div className="max-w-[1336px] m-auto">
      <div
        className={classNames(
          'flex flex-col flex-wrap xs:p-8 md:p-20 md:mx-14 xs:mx-6 mt-24 mb-14 bg-[linear-gradient(#c1a9fe,_#f7cbfe)] rounded-[44px]',
          style.staticLayout
        )}
      >
        <Typography
          tag="h2"
          className="flex flex-wrap xs:text-3xl lg:text-6xl sm:text-[44px] font-bold pb-12 font-bold text-[#333]"
        >
          <AnimatedText />
        </Typography>
      </div>

      <section
        className={classNames(
          'flex flex-col text-2xl mb-4',
          style.staticLayout
        )}
      >
        <div
          className={classNames(
            'sm:w-4/5 xs:w-full m-auto px-20 pt-20 px-14 xs:px-10',
            style.staticLayoutPadding
          )}
        >
          Futures4Europe is a <strong>user-generated content platform</strong>{' '}
          where registered members share about foresight{' '}
          <strong>projects</strong>, showcase <strong>project results</strong>,
          promote <strong>events</strong>, and express opinions and insights in{' '}
          <strong>posts</strong>. Join the futures-oriented collective
          intelligence by creating a personal and organizational account.
        </div>

        <div
          className={classNames(
            'sm:w-4/5 xs:w-full m-auto px-20 pt-20 px-14',
            style.staticLayoutPadding
          )}
        >
          The Futures4Europe platform community welcomes:
        </div>
      </section>

      <div
        className={classNames(
          'grid grid-cols-[1fr_min(84rem,_100%_-_7rem)_1fr] xs:grid-cols-[1fr_min(84rem,_100%_-_0rem)_1fr] border-t-[1px] border-t-[solid] border-gray-300 border-b-[none]',
          style.staticLayout
        )}
      >
        <div
          className={classNames(
            'col-start-2 w-4/5 m-auto border-x border-solid border-gray-300'
          )}
        >
          <div
            className={classNames(
              'grid md:grid-cols-2 xs:grid-cols items-center justify-items-center'
            )}
          >
            <Typography tag="p" className="w-full text-4xl font-medium p-8">
              Futures practitioners
            </Typography>
            <Typography
              tag="p"
              className="text-xl p-8 border-[1px] border-[solid] border-gray-300 rounded-[80px] max-w-[396px] min-h-[12rem] mx-0 -my-[1px] flex items-center"
            >
              From seasoned foresighters experienced in designing ample
              foresight processes to emerging professionals in the field.
            </Typography>
          </div>
        </div>
      </div>

      <div
        className={classNames(
          'grid grid-cols-[1fr_min(84rem,_100%_-_7rem)_1fr] xs:grid-cols-[1fr_min(84rem,_100%_-_0rem)_1fr] border-t-[1px] border-t-[solid] border-gray-300 border-b-[none]',
          style.staticLayout
        )}
      >
        <div
          className={classNames(
            'col-start-2 w-4/5 m-auto border-x border-solid border-gray-300'
          )}
        >
          <div
            className={classNames(
              'grid md:grid-cols-2 xs:grid-cols items-center justify-items-center'
            )}
          >
            <Typography tag="p" className="w-full text-4xl font-medium p-8">
              Futures related professionals
            </Typography>
            <Typography
              tag="p"
              className="text-xl p-8 border-[1px] border-[solid] border-gray-300 rounded-[80px] max-w-[396px] min-h-[12rem] mx-0 -my-[1px] flex items-center"
            >
              From futurists, speculative design experts and science-fiction
              writers to future sensitive artists or journalists.
            </Typography>
          </div>
        </div>
      </div>

      <div
        className={classNames(
          'grid grid-cols-[1fr_min(84rem,_100%_-_7rem)_1fr] xs:grid-cols-[1fr_min(84rem,_100%_-_0rem)_1fr] border-t-[1px] border-t-[solid] border-gray-300 border-b-[none]',
          style.staticLayout
        )}
      >
        <div
          className={classNames(
            'col-start-2 w-4/5 m-auto border-x border-solid border-gray-300'
          )}
        >
          <div
            className={classNames(
              'grid md:grid-cols-2 xs:grid-cols items-center justify-items-center'
            )}
          >
            <Typography tag="p" className="w-full text-4xl font-medium p-8">
              Foresight clients
            </Typography>
            <Typography
              tag="p"
              className="text-xl p-8 border-[1px] border-[solid] border-gray-300 rounded-[80px] max-w-[396px] min-h-[12rem] mx-0 -my-[1px] flex items-center"
            >
              Such as representatives of the European, national or regional R&I
              funding agencies.
            </Typography>
          </div>
        </div>
      </div>

      <div
        className={classNames(
          'grid grid-cols-[1fr_min(84rem,_100%_-_7rem)_1fr] xs:grid-cols-[1fr_min(84rem,_100%_-_0rem)_1fr] border-t-[1px] border-t-[solid] border-gray-300 border-b-[none]',
          style.staticLayout
        )}
      >
        <div
          className={classNames(
            'col-start-2 w-4/5 m-auto border-x border-solid border-gray-300'
          )}
        >
          <div
            className={classNames(
              'grid md:grid-cols-2 xs:grid-cols items-center justify-items-center'
            )}
          >
            <Typography tag="p" className="w-full text-4xl font-medium p-8">
              Science & technology experts
            </Typography>
            <Typography
              tag="p"
              className="text-xl p-8 border-[1px] border-[solid] border-gray-300 rounded-[80px] max-w-[396px] min-h-[12rem] mx-0 -my-[1px] flex items-center"
            >
              Along with other domain specialists who have been part of
              foresight explorations and/or are interested in contributing to
              such endeavors.
            </Typography>
          </div>
        </div>
      </div>

      <div
        className={classNames(
          'grid grid-cols-[1fr_min(84rem,_100%_-_7rem)_1fr] xs:grid-cols-[1fr_min(84rem,_100%_-_0rem)_1fr] border-[1px] border-[solid] border-gray-300',
          style.staticLayout
        )}
      >
        <div
          className={classNames(
            'col-start-2 w-4/5 m-auto border-x border-solid border-gray-300'
          )}
        >
          <div
            className={classNames(
              'grid md:grid-cols-2 xs:grid-cols items-center justify-items-center'
            )}
          >
            <Typography tag="p" className="w-full text-4xl font-medium p-8">
              Futures enthusiasts
            </Typography>
            <Typography
              tag="p"
              className="text-xl p-8 border-[1px] border-[solid] border-gray-300 rounded-[80px] max-w-[396px] min-h-[12rem] mx-0 -my-[1px] flex items-center"
            >
              i.e. citizens interested in the prospects Research & Innovation
              can offer to society or in futures explorations in general.
            </Typography>
          </div>
        </div>
      </div>

      <section
        className={classNames(
          'flex flex-col md:text-2xl sm:text-xl mb-44',
          style.staticLayout
        )}
      >
        <div
          className={classNames(
            'sm:w-4/5 xs:w-full m-auto px-20 pt-20 px-14',
            style.staticLayoutPadding
          )}
        >
          <Typography tag="p" className="">
            Starting November 2023, futures4europe.eu is nurtured through the
            EU-funded project{' '}
            <a
              className="underline"
              href="https://www.futures4europe.eu/project/Eye_of_Europe_6ft5d"
            >
              Eye of Europe
            </a>
            , continuing the work done under the project ‘European R&I Foresight
            and public engagement for Horizon Europe’.
          </Typography>
          <br />

          <Typography tag="p" className="">
            Joining as a member is easy.{' '}
            <a className="underline" href="/register">
              Click on Register
            </a>{' '}
            on the top right corner and set up your account. Then login and
            share with the world - your own profile or your organization’s,
            foresight projects, results, events - Do your thing!
          </Typography>
        </div>
      </section>
    </div>
  );
}
