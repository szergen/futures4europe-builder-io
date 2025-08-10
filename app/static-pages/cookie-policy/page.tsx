import classNames from 'classnames';
import Typography from '@app/shared-components/Typography/Typography';
import CookieTable from '@app/static-pages/cookie-policy/cookie-table/cookie-table';
import style from './cookie.module.css';

export default function cookiePolicyPage() {
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
          Cookie Policy
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
            'sm:w-4/5 xs:w-full m-auto px-20 pt-20 px-14',
            style.staticLayoutPadding
          )}
        ></div>
      </section>

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
            Last Updated: [20 January 2025]
            <br />
            <br />
          </Typography>

          <Typography tag="p" className="">
            The Executive Agency for Higher Education, Research, Development and
            Innovation Funding UEFISCDI (hereafter the “UEFISCDI”) understands
            that your privacy is important to you and is committed to being
            transparent about the technologies it uses.
            <br />
            <br />
            This Cookies Policy explains how and why UEFISCDI uses cookies. We
            recommend reading this policy in conjunction with our Privacy Policy
            and Terms and Conditions to gain a comprehensive understanding of
            our practices.
            <br />
            <br />
            This Cookies Policy has been adopted by UEFISCDI in accordance with
            the following laws and regulations:
            <br />
            <br />
          </Typography>

          <section className={classNames('py-10 pl-14')}>
            <Typography tag="li" className="ml-4">
              (i) EU Directive 2002/58/EC concerning the processing of personal
              data and the protection of privacy in the electronic
              communications sector (Directive on privacy and electronic
              communications);
            </Typography>
            <Typography tag="li" className="ml-4">
              (ii) Law no. 506/2004 on the processing of personal data and the
              protection of privacy in the electronic communications sector,
              (“Law no. 506/2004”);
            </Typography>
            <Typography tag="li" className="ml-4">
              (iii) Regulation (EU) 2016/679 of the European Parliament and of
              the Council of 27 April 2016 on the protection of natural persons
              with regard to the processing of personal data and on the free
              movement of such data, and repealing Directive 95/46/EC (“General
              Data Protection Regulation” or “GDPR”), as well as other
              applicable regulations at the European or local level, adopted in
              the context of GDPR.
            </Typography>
            <Typography tag="li" className="ml-4">
              (iv) The Data Protection Act 2018, which is the UK’s
              implementation of the General Data Protection Regulation (GDPR);
            </Typography>
            <Typography tag="li" className="ml-4">
              (v) Federal Act on Data Protection (Data Protection Act, FADP) of
              25 September 2020 (Status as of 1 September 2023) of the Swiss
              Confederation, which governs the processing of personal data.
              <br />
              <br />
            </Typography>
          </section>

          <Typography tag="p" className="w-full text-4xl font-medium py-10">
            1. What are cookies?
          </Typography>

          <Typography tag="p" className="">
            A cookie is a small text file that a website saves on your computer,
            tablet or mobile device (the “Device”) when you visit the
            „Futures4Europe” digital platform. It enables the website to
            remember your actions and preferences over a period of time, so you
            don’t have to keep re-entering them whenever you come back to our
            website or browse from one page to another, as well as to improve
            your experience on UEFISCDI’’s website, to the extent you agree.
            These allows our website to recognize your device from those of
            other users of the website.
            <br />
            <br />
          </Typography>

          <Typography tag="p" className="w-full text-4xl font-medium py-10">
            2. Different types of cookies
          </Typography>

          <Typography tag="p" className="">
            Session cookies are only stored for the duration of your visit to
            our website and are deleted from your Device as soon as you close
            your browser;
            <br />
            <br />
            Persistent cookies are saved on your device for a fix period of time
            after you close your browser and are used where we (or a third
            party) need to identify you for a later browsing session. We use
            persistent cookies to improve your experience of using our website.
            This includes recording your acceptance to our Cookies Policy to
            remove the cookie message which first appears when you use our
            website. Persistent cookies also include third party cookies that
            can be used anonymously to save the interests of users, in order to
            deliver personalized adverts to users;
            <br />
            <br />
            First party cookies are cookies that belong to UEFISCDI and that
            UEFISCDI places on your Device;
            <br />
            <br />
            Third party cookies are cookies that another party places on your
            Device through Futures4Europe’s website. These include cookies from
            external analytics services which help us to understand the use of
            our website, or are used for advertising or tracking purposes.
            <br />
            <br />
          </Typography>

          <Typography tag="p" className="w-full text-4xl font-medium py-10">
            3. How long will cookies be stored on your computer?
          </Typography>

          <Typography tag="p" className="">
            The length of time that a cookie remains on your Device may vary
            significantly and depends on whether it is a “persistent” or
            “session” cookie. Persistent cookies are stored for a fixed duration
            or until manually deleted and remain after you stop browsing, while
            session cookies are temporary and are deleted once you close your
            browser. Persistent cookies can last from a few days to several
            years. To manage cookies, including deleting them before they
            expire, you can follow the specific instructions detailed in Section
            8 of the cookie policy, which provides guidance on customizing
            cookie settings based on your preferences.
            <br />
            <br />
          </Typography>

          <Typography tag="p" className="w-full text-4xl font-medium py-10">
            4. What type of information are stored and accessed through cookies?
          </Typography>

          <Typography tag="p" className="">
            Cookies store information in small text file that allows the website
            to recognize the browser. The webserver will recognize the browser
            until the cookie expires or is erased.
            <br />
            <br />
            Cookies store important information that enhance the navigation
            experience on the Internet.
            <br />
            <br />
          </Typography>

          <Typography tag="p" className="w-full text-4xl font-medium py-10">
            5. Why do we use cookies?
          </Typography>

          <Typography tag="p" className="">
            UEFISCDI uses cookies to enhance the functionality and security of
            “Eye of Europe - The Research and Innovation foresight community”,
            directly linked with the “Futures4Europe” digital platform, where
            most of the content comes from.
            <br />
            <br />
            Futures4Europe digital platform uses both first party cookies and
            third party cookies. These cookies are used for security purposes,
            to improve the use and the functionality of our website, for
            authentication of users, to facilitate navigation, to display
            information more effectively, and to better serve you with more
            tailored information. We may also use cookies to gather statistical
            information about the usage of the website in order to continually
            improve the design and functionality, to understand how visitors use
            the website, and to assist us with resolving questions regarding the
            website.
            <br />
            <br />
            We will not use cookies for automated decision making processes or
            for creating profiles.
            <br />
            <br />
          </Typography>

          <Typography tag="p" className="w-full text-4xl font-medium py-10">
            6. What cookies do we use?
          </Typography>

          <Typography tag="p" className="">
            Essential or strictly necessary cookies are critical for the proper
            functioning of our website.. Without these cookies, parts of our
            website do not operate correctly. These cookies do not track where
            you have been on the internet and do not remember preferences beyond
            your current visit and do not gather information about you that
            could be used for marketing purposes. These cookies are usually
            session cookies which will expire when you close your browsing
            session. Accordingly, we are not asking you for your specific
            consent for those cookies.
            <br />
            <br />
            For all other types of cookies, such as those used for analytics or
            personalization, your informed consent is necessary.
            <br />
            <br />
            Functionality cookies, including geotargeting cookies are used to
            increase the usability of our website by remembering your choices
            (e.g. language, country, region, login, and so on).
            <br />
            <br />
            Performance cookies gather information about a website’s operation,
            such as visitor numbers, time spent on the site, and any error
            messages. These cookies help us analyze user behavior patterns and
            improve the website’s functionality, identifying areas needing
            maintenance. The data is often managed by third-party analytics
            services. Importantly, the information collected is anonymous,
            meaning it does not include personally identifiable details like
            names or email addresses, and is used purely for statistical
            purposes to enhance the user experience.
            <br />
            <br />
            Statistical cookies help us tailor the website to visitor
            preferences by tracking metrics such as visit frequency, pages
            viewed, and user activity. We use Google Analytics for this purpose,
            but your IP address is anonymized to ensure privacy. The data
            collected allows us to generate traffic reports, helping to identify
            which pages are most successful and areas for improvement,
            ultimately enhancing the site’s functionality based on user
            behavior.
            <br />
            <br />
            The table below contains a list of different type of cookies that
            may be used on our website, together with information regarding the
            storage period for each type of cookie used, their type, their
            source (if they are first or third party) and whether they are
            transferred or not outside the EU/EEA:
          </Typography>

          <CookieTable />

          <Typography tag="p" className="w-full text-4xl font-medium py-10">
            7. What makes cookies essential for the internet?
          </Typography>

          <Typography tag="p" className="">
            Cookies play a crucial role in ensuring the smooth operation of
            websites by enhancing the browsing experience and tailoring it to
            each user`&apos;s preferences and interests. If cookies are denied
            or disabled, many websites may lose essential functionalities,
            potentially becoming difficult or even impossible to use as
            intended. Cookies help maintain website responsiveness and create a
            seamless, user-friendly experience across different platforms.
            <br />
            <br />
            Denying or disabling cookies does not mean you will not receive
            online advertising - but only that it will no longer be able to keep
            track of your preferences and interests highlighted by your browsing
            behavior.
            <br />
            <br />
            Examples of important uses of cookies (which do not require
            authentication of a user through an account):
            <br />
            <br />
          </Typography>

          <section className={classNames('py-10 pl-14')}>
            <Typography tag="li" className="ml-4">
              (i) Personalized experiences: Cookies remember language
              preferences or customize search results based on user interests
              (e.g., showing Romanian content).
            </Typography>
            <Typography tag="li" className="ml-4">
              (ii) Relevant advertising: They help deliver ads that are more
              aligned with the user`&apos;s preferences and browsing habits.
            </Typography>
            <Typography tag="li" className="ml-4">
              (iii) Analytics and optimization: Cookies enable websites to track
              traffic levels, content engagement, and how users navigate to the
              site (via search engines, direct links, etc.). These insights help
              website owners optimize the user experience and improve site
              functionality.
            </Typography>
          </section>

          <p>
            Websites run these analyzes of their use to improve sites for the
            benefit of users.
          </p>

          <Typography tag="p" className="w-full text-4xl font-medium py-10">
            8. How can you manage or disable cookies?
          </Typography>

          <Typography tag="p" className="">
            You have several options to control and manage cookies. You can
            configure your browser to accept or reject all cookies, or only
            specific types. Accepting all cookies enables full access to all
            website features, while blocking or removing cookies may negatively
            affect your experience and limit website functionality. If you block
            all cookies, both first-party and third-party cookies will be
            deactivated. To manage or delete third-party cookies, refer to your
            browser settings.
            <br />
            <br />
            For details on what your browser offers and how to configure your
            browser according to your choices, please go to the “Help” menu or
            other dedicated section of your internet browser. By way of example:
            <br />
            <br />
          </Typography>

          <section className={classNames('py-10 pl-14')}>
            <Typography tag="li" className="ml-4">
              (i) Mozilla Firefox:
              https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer
            </Typography>
            <Typography tag="li" className="ml-4">
              (ii) Google Chrome:
              https://support.google.com/chrome/answer/95647?hl=en
            </Typography>
            <Typography tag="li" className="ml-4">
              (iii) Safari:
              http://safari.helpmax.net/en/saving-time/blocking-content/
            </Typography>
            <Typography tag="li" className="ml-4">
              (iv) Opera: http://help.opera.com/Linux/9.22/en/cookies.html
            </Typography>
          </section>

          <Typography tag="p" className="w-full text-4xl font-medium py-10">
            9. Security
          </Typography>

          <Typography tag="p" className="">
            For security purposes, data passed between the web server and the
            browser in SSL encrypted and therefore, UEFSCDI has implemented
            specific measures for protecting your personal data stored in
            cookies.
            <br />
            <br />
            Cookies are installed through the request issued by a webserver to a
            browser (e.g. Internet Explorer, Google Chrome, Opera, Mozilla
            Firefox, Safari etc.) and are completely passive – they do not
            contain software programs, viruses, spyware and cannot access the
            information stored on the user’s hard drive. Cookies do not consist
            of pieces of code, so they cannot be executed, nor can auto-execute.
            <br />
            <br />
            While cookies are primarily intended to enhance user experience,
            they can also be misused for harmful purposes. Because cookies store
            data about your preferences and browsing history, both on individual
            and multiple websites, they may be exploited as spyware by
            unauthorized parties. This risk arises when data is transmitted
            between your browser and a website, particularly on unsecured
            networks like public WiFi, where unauthorized individuals can
            intercept the information.
            <br />
            <br />
            In addition, cookies can be vulnerable if websites do not properly
            secure their settings. For instance, if a site doesn’t enforce
            encrypted communication (such as HTTPS), hackers can trick the
            browser into sending data through unsecured channels. These
            vulnerabilities may allow unauthorized persons to access sensitive
            information or exploit the data for illegal purposes.
            <br />
            <br />
            There are also risks from poorly configured servers, where incorrect
            cookie settings expose the user’s information. Ensuring secure
            communication between the browser and server is critical to avoid
            unauthorized access.
            <br />
            <br />
            To protect personal information, it’s important to carefully manage
            how cookies are handled. Modern browsers offer privacy settings that
            let users control cookie acceptance levels, decide how long cookies
            are valid, and even set them to be automatically deleted after
            visiting certain websites. Regularly reviewing and adjusting these
            settings helps minimize risks and maintain control over your
            personal data while browsing the internet.
            <br />
            <br />
            Here are some tips that can help you navigate effortlessly with
            cookies:
            <br />
            <br />
          </Typography>

          <section className={classNames('py-10 pl-14')}>
            <Typography tag="li" className="ml-4">
              (i) Customize Browser Settings: Adjust your cookie security
              settings to a level that meets your comfort and security needs.
            </Typography>
            <Typography tag="li" className="ml-4">
              (ii) Manage Shared Access: If you share your computer, configure
              your browser to delete browsing data after each session to protect
              personal information.
            </Typography>
            <Typography tag="li" className="ml-4">
              (iii) Update Anti-spyware: Regularly install and update
              anti-spyware programs to detect and prevent cookie-based attacks.
            </Typography>
            <Typography tag="li" className="ml-4">
              (iv) Site Protection: Use tools that detect and block malicious
              sites that exploit browser vulnerabilities.
            </Typography>
            <Typography tag="li" className="ml-4">
              (v) Keep Your Browser Updated: Make sure your browser is current,
              as outdated versions are more susceptible to attacks exploiting
              cookie vulnerabilities.
            </Typography>
            <br />
            <br />
          </section>

          <Typography tag="p" className="">
            This approach ensures that you’re balancing security with
            functionality while navigating the web.
            <br />
            <br />
          </Typography>

          <Typography tag="p" className="w-full text-4xl font-medium py-10">
            10. Contact details
          </Typography>

          <Typography tag="p" className="">
            This website is owned and operated by UEFISCDI. Please contact Data
            Protection Officer if you would like more information on the cookies
            that we use and their purposes:
            <br />
            <br />
            e-mail: info@futures4europe.eu
            <br />
            <br />
          </Typography>

          <Typography tag="p" className="w-full text-4xl font-medium py-10">
            XI. Amendments to this Cookies Policy
          </Typography>

          <Typography tag="p" className="">
            UEFISCDI reserves the right to revise its Cookies Policy whenever
            necessary, either due to legal obligations or changes implemented on
            the platform. Any amendments to the policy will be communicated to
            users in advance, particularly through a notice posted on the
            website. This ensures users are informed of both the amendments and
            the date when they take effect. The effective date of the latest
            version of the Cookies Policy will always be indicated at the bottom
            of the policy to provide clarity on its implementation timeline.
            <br />
            <br />
            Users are encouraged to regularly review the policy to stay informed
            of any updates.
          </Typography>
        </div>
      </section>
    </div>
  );
}
