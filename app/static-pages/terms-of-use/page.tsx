import classNames from 'classnames';
import Typography from '@app/shared-components/Typography/Typography';
import style from './terms.module.css';

export default function termsOfUsePage() {
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
          Terms of Use
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
            Welcome to the Futures4europe foresight platform (hereafter the
            “Platform” or the “Futures4Europe”), homebase for the R&I foresight
            community and a one-stop shop for foresight activities in Europe and
            beyond, powered by UEFISCDI (hereafter &quot;We,&quot;
            &quot;Us,&quot; or &quot;Our&quot;). These Terms of Use (hereafter
            the “Terms”, the “Terms of Use” or the “Agreement”) govern your
            access to and use of the Platform, including all associated content
            and features.
            <br />
            <br />
            By using the Futures4Europe Platform you agree to the present Terms
            of Use. These Terms form an integral whole with our {''}{' '}
            <a
              className="underline"
              target="_blank"
              href="/static-pages/privacy-policy"
            >
              Privacy Policy
            </a>{' '}
            and {''}{' '}
            <a
              href="/static-pages/cookie-policy"
              target="_blank"
              className="underline"
            >
              Cookies Policy{' '}
            </a>
            . If you do not agree to all of these, do not use the Platform.
            <br />
            <br />
            We request that the users read these Terms of Use prior to any use
            of the Platform since they may be adapted and/or amended by UEFISCDI
            at any time. <br />
            If you need any help or any additional information, you can contact
            our Content Management Specialist at: info@futures4europe.eu.
            <br />
            <br />
            This Privacy Policy explains the terminology employed hereunder, the
            reason for the processing of your personal data, the way we collect,
            handle and ensure protection of all personal data provided, how that
            information is used and what rights you have in relation to your
            personal data. Additionally, it provides the contact information of
            the responsible Data Controller, whom you can reach out to in order
            to exercise your rights.
            <br />
            <br />
            Users of Futures4Europe are strongly encouraged to read this Policy
            carefully.
          </Typography>

          <Typography tag="p" className="w-full text-4xl font-medium py-10">
            I. Definitions
          </Typography>

          <Typography tag="p" className="">
            1. “Agreement” refers, collectively, to all the terms, conditions,
            notices contained or referenced in this document and procedures that
            we may publish from time to time on the Platform. The Agreement
            includes our {''}{' '}
            <a
              className="underline"
              target="_blank"
              href="/static-pages/privacy-policy"
            >
              Privacy Policy
            </a>{' '}
            and {''}{' '}
            <a
              href="/static-pages/cookie-policy"
              target="_blank"
              className="underline"
            >
              Cookies Policy{' '}
            </a>
            .
            <br />
            <br />
            2. “Platform” refers to Future4europe’s website located at
            https://www.futures4europe.eu/ and all the content provided through
            it.
            <br />
            <br />
            3. &quot;Member&quot; (also referred to as &quot;you&quot; and
            &quot;your&quot;) - a User who successfully opens an account on the
            Platform. An account serves as User’s identity on Futures4europe
            platform.
            <br />
            <br />
            4. &quot;User&quot; (also referred to as &quot;you&quot; and
            &quot;your&quot;) - anyone who accesses or uses the Platform for any
            purpose.zoo
            <br />
            <br />
            5. &quot;Visitor&quot; (also referred to as &quot;you&quot; and
            &quot;your&quot;) - an unregistered User of the Platform.
            <br />
            <br />
            6. “Content” refers to content optionally featured or displayed
            through the Platform Info Pages by a Member, including, but not
            limited to.: (i) Projects: foresight-related projects which provide
            evidence to policymakers for designing future-resilient policies;
            (ii) Project results: Books, articles, , training materials, images,
            graphics, software, applications, and other relevant materials which
            highlights the joint foresight work between key actors and
            stakeholders; (iii) Posts (Articles): Editorials that promote
            personal views and opinions on foresight topics of common interest;
            (iv) Organizations: Institutional profiles of municipalities,
            research agencies, stakeholders; (v) Persons: Personal profiles of
            foresight experts and domain expert and (vi) Events:
            Foresight-related events such as webinars, workshops, seminars and
            training modules.
            <br />
            <br />
          </Typography>

          <Typography tag="p" className="w-full text-4xl font-medium py-10">
            II. User Agreement and registration
          </Typography>

          <Typography tag="p" className="">
            2.1. You may use our Platform only if you agree to these Terms of
            Use and to our Privacy Policy and Cookies Policy. In order to access
            certain features of our Platform, you have to be registered.
            <br />
            <br />
            2.2. You can only create an account if you meet our eligibility
            criteria. A user must provide their real name and a valid email
            address in order to complete the registration process. Subject to
            these Terms of Use, you retain ultimate administrative control over
            your account and the Content associated with it.
            <br />
            <br />
            2.3. The following eligibility criteria have to be met in order to
            become a Member:
            <br />
            <br />
          </Typography>

          <section className={classNames('py-10 pl-14')}>
            <Typography tag="li" className="ml-4">
              (i) You must be a human to create an Account. Accounts opened by
              &quot;bots&quot; or other automated methods are not permitted;
            </Typography>
            <Typography tag="li" className="ml-4">
              (ii) One person may open no more than one Account;
            </Typography>
            <Typography tag="li" className="ml-4">
              (iii) You must be age 18 or older.
            </Typography>
          </section>

          <Typography tag="p" className="">
            2.4. Upon becoming a Member, you commit to:
            <br />
            <br />
          </Typography>

          <section className={classNames('py-10 pl-14')}>
            <Typography tag="li" className="ml-4">
              (i) Only declare your affiliation to organisations that you
              have/had an affiliation with, and keep your current affiliation on
              info page up-to-date;
            </Typography>
            <Typography tag="li" className="ml-4">
              (ii) Keep your info accurate and up-to-date. Do not accept, adopt,
              or post any content that falsely or misleadingly implies incorrect
              or inaccurate information about you, including your roles,
              authorship, biographical facts, research, qualifications,
              credentials, work experience, achievements, or similar;
            </Typography>
            <Typography tag="li" className="ml-4">
              (iii) Identify yourself using only your real name and, if you
              choose to use a profile photo, only use a real photo of you and
              you alone. Only connect your account with email addresses that
              belong to you as an individual. Do not use a non-personal email
              address, such as a generic company email address.
            </Typography>
          </section>

          <Typography tag="p" className="">
            2.5. You are prohibited from using the Platform if you appear on any
            sanction lists maintained by the United Nations Security Council,
            the European Union, or if you are otherwise restricted from
            accessing the Platform under applicable law.
            <br />
            <br />
            2.6. All Members who opened heir accounts before the implementation
            of this Agreement must accept them to continue using our Platform.
            <br />
            <br />
          </Typography>

          <Typography tag="p" className="w-full text-4xl font-medium py-10">
            III. Our Platform
          </Typography>

          <Typography tag="p" className="">
            3.1. Futures4Europe mission is to establish: (i) A common repository
            of foresight projects and results, foresight methods and training
            materials; (ii) A social network of organizations and experts
            engaged in R&I foresight, which constitutes a continually updating
            database of actors who could be involved in shaping the future of
            their domains; (iii) A gate of communication regarding current
            foresight activities and events and (iv) prospects for building a
            better future.
            <br />
            <br />
            3.2. The Platform enables you to explore a wide range of foresight
            projects, research, discussions, journals, events, as well as
            opportunities for collaboration, learning, professional development,
            and career advancement.
            <br />
            <br />
            3.3. The Platform allows Members to share their work, knowledge,
            professional insights, and ideas through their Content.
            Additionally, Members can use the platform to highlight their
            professional identity, including details such as education, work
            experience, credentials, skills, expertise, participation in events,
            and involvement in foresight projects or other relevant activities.
            <br />
            <br />
            3.4. While we strive to ensure continuous availability of the
            Platform, disruptions or temporary suspensions may occur due to
            maintenance, security needs, capacity constraints, or unforeseen
            events beyond our control.
            <br />
            <br />
          </Typography>

          <Typography tag="p" className="w-full text-4xl font-medium py-10">
            IV. Content
          </Typography>

          <Typography tag="p" className="">
            4.1. As a Member of the Platform, you may view Content shared by
            other Members and share your own content. Both of these are subject
            to a few conditions.
            <br />
            <br />
            4.2. As a User of the Platform, you may access the Content of the
            Platform made available by other Members.
            <br />
            <br />
            4.3. You may use the Content shared by Members on the Platform in
            accordance with applicable laws, including copyright laws (and any
            relevant exceptions or limitations), or in compliance with any
            applicable licensing terms. Trademarks and logos displayed on the
            Platform are the property of their respective owners.
            <br />
            <br />
            4.4. You are responsible for compliance with all applicable local
            laws, and you are solely responsible for any damage or loss to any
            party resulting from your access to or use of the Content.
            <br />
            <br />
            4.5. All Content is the sole responsibility of the individual who
            published it. We do not endorse Member content made available on the
            Platform, nor do we routinely monitor it for legal violations or
            breaches of Platform Code of Conduct. We do not manually or
            automatically review Content or use algorithmic decision-making for
            Content moderation. Consequently, unless we are notified, we are not
            aware of any possible infringements, inappropriate or inaccurate
            Content, or legal violations arising from Members.
            <br />
            <br />
            4.6. Once we become aware of illegal Content, we will take action to
            remove or disable access to it. For Content published by Members,
            including personal data, and made available on the Platform, we
            cannot ensure its accuracy or validity. However, we will review and
            address any issues that are reported to us.
            <br />
            <br />
            4.7. You may report inappropriate, inaccurate, or illegal Content,
            including alleged intellectual property infringements
            info@futures4europe.eu.
            <br />
            <br />
            4.8. If we receive a complaint from someone about something that you
            have posted or uploaded, we will investigate the complaint
            carefully.
            <br />
            <br />
            4.9. Without prejudice to the above provision, Futures4Europe
            reserves the right to delete any Content that infringes the European
            or national legal provision, any content that is inappropriate or
            inaccurate, or any content that violates Futures4Europe Code of
            Conduct.
            <br />
            <br />
            4.10. The Platform reserves the right to review and modify the tags
            used in a piece of content if they are deemed unsuitable or
            inappropriate for that content.
            <br />
            <br />
            4.11. As a Member, you retain full ownership rights over your
            Content. However, by publishing Content, you grant us a worldwide,
            non-exclusive, royalty-free license, with the right to sublicense,
            to use your content for purposes such as hosting, reproducing,
            distributing, modifying, copying, publicly performing or displaying,
            translating, and creating derivative works, all for the sole purpose
            of making our Platform available and improving it. Additionally, you
            grant Users a worldwide, non-exclusive, royalty-free,
            non-transferable, and non-sublicensable license to access and use
            your Content solely in connection with their use of the Platform.
            <br />
            <br />
            4.12. If you do not have the legal rights to grant the licenses
            related to any of your Content, you agree not to upload or publish
            that Content. You are responsible for ensuring that the use of your
            Content, as outlined in these Terms of Use, does not infringe or
            violate the rights of any third party, including privacy rights,
            publicity rights, patents, copyrights, contract rights, or any other
            intellectual property or proprietary rights. If your Content
            contains personal data, you must have a legal basis to share that
            data. Unless legal exceptions or limitations apply, you represent
            and warrant that you own or control all necessary rights or licenses
            required to publish the Content on the Platform. For instance, while
            many journal publishers allow certain versions of research papers to
            be posted, most impose restrictions on sharing the final published
            versions. To ensure you have the right to upload such content, you
            should review your publishing agreement and the publisher’s
            copyright policies before uploading any version of an research
            paper.
            <br />
            <br />
            4.13. You can terminate the licenses for specific Content by
            deleting it from the Platform where possible, or by closing your
            account. You may delete the Content published by you at any time,
            with a few exceptions. For instance, you may not be able to delete
            your Content if its removal could affect the Content submitted by
            others. Please note that some of your Content may still be visible
            after you close your account, specifically the pages you created.
            Additionally, any messages you sent will still be accessible to
            their recipients.
            <br />
            <br />
            4.14. When you delete your Content, our right to use it will end,
            except that we may retain a backup copy for a reasonable period of
            time, as required to fulfill our legal obligations. However, the
            deleted Content will not be generally available to other users or
            members.
            <br />
            <br />
            4.15. You acknowledge that, your profile information and content may
            be visible to and shared with third parties, including other
            Members. Additionally, you understand that we cannot and do not
            control the actions of these third parties.
            <br />
            <br />
          </Typography>

          <Typography tag="p" className="w-full text-4xl font-medium py-10">
            V. Code of Conduct
          </Typography>

          <Typography tag="p" className="">
            5.1. Our Code of Conduct establish the standards for acceptable
            behavior and Content on the Platform, and outline what is considered
            inappropriate. If you violate this Code of Conduct or Terms of Use,
            we may take action against your Content or account, which could
            include issuing a strike.
            <br />
            <br />
            5.2. In general, when we receive a report indicating that Content or
            behavior on the Platform violates these Terms of Use, our Code of
            Conduct, or applicable law, the reported Content or behavior will be
            reviewed by a human.
            <br />
            <br />
            5.3. Similarly, if we determine that you may have violated these
            Terms of Use, our Code of Conduct, or applicable law, we will
            conduct an investigation.
            <br />
            <br />
            5.4. If, after reviewing the Content or conduct, we find objective
            reasons to believe it violates these Terms of Use, our Code of
            Conduct, or the law, or poses a risk of harm or potential legal
            liability for us or a User we may take appropriate action. Such
            actions may include:
          </Typography>

          <section className={classNames('py-10 pl-14')}>
            <Typography tag="li" className="ml-4">
              (i) Restricting public access to, removing, blocking, modifying,
              or reformatting the Content and
            </Typography>
            <Typography tag="li" className="ml-4">
              (ii) Issuing a warning to any parties involved.
            </Typography>
          </section>

          <Typography tag="p" className="">
            5.5. When deciding whether to take action, we carefully evaluate a
            range of factors. These include the specific context and
            circumstances of the situation, the nature and gravity of the issue,
            and the potential impact on all parties involved. We also assess the
            rights and legitimate interests of those affected, the intent behind
            the actions in question, and whether there have been any prior
            related incidents. This comprehensive approach ensures that any
            decisions made are fair, balanced, and proportionate to the
            circumstances.
            <br />
            <br />
            5.6. If we choose to take action regarding your Content or account,
            we may inform you of the specific measures taken and the reasons
            behind them. However, there may be situations where we are unable to
            provide such notification, such as when legal constraints apply, or
            when it would be unreasonable to do so given the circumstances.
            <br />
            <br />
            5.7. You have the right to appeal our decision internally by sending
            an email at info@futures4europe.eu. We will re-evaluate our initial
            decision and inform you of the outcome.
            <br />
            <br />
            5.8. If you repeatedly submit reports or appeals that are evidently
            unfounded, we reserve the right to temporarily suspend further
            processing of those requests.
          </Typography>

          <Typography tag="p" className="w-full text-4xl font-medium py-10">
            VI. Termination of this Agreement
          </Typography>

          <Typography tag="p" className="">
            6.1. You are free to end this Agreement at any time. We also reserve
            the right to terminate this Agreement, either with or without
            notice, if there is just cause.
            <br />
            <br />
            6.2. As a Member, you may terminate this agreement at any time and
            for any reason by deleting your account.
            <br />
            <br />
            6.3. We may terminate this agreement without cause with a notice
            period of 10 days. In addition, we reserve the right to immediately
            terminate the agreement for just cause at any time. &quot;Just
            cause&quot; refers to any circumstance that makes it unreasonable
            for us to continue the Agreement through the full notice period,
            taking into account the specific situation and the interests of both
            parties. Just cause includes, but is not limited to, the following
            situations:
            <br />
            <br />
          </Typography>

          <section className={classNames('py-10 pl-14')}>
            <Typography tag="li" className="ml-4">
              (i) You repeatedly or significantly fail to comply with applicable
              legal provisions, any contractual obligation under these Terms of
              Use, or our Code of Conduct;
            </Typography>
            <Typography tag="li" className="ml-4">
              (ii) Your online presence substantially harms our reputation;
            </Typography>
            <Typography tag="li" className="ml-4">
              (iii) You revoke consent given under data protection laws or
              object to the further processing of your personal data;
            </Typography>
            <Typography tag="li" className="ml-4">
              (iv) Your actions expose Futures4Europe, yourself, or any third
              party to potential harm, risk or legal liability, or regulatory
              consequences;
            </Typography>
            <Typography tag="li" className="ml-4">
              (v) A legal requirement or court order compels us to terminate or
            </Typography>
            <Typography tag="li" className="ml-4">
              (vi) We have reasonable grounds to believe that your account is
              not controlled by the person identified in your account, or that
              it is being managed by a person or group controlling multiple
              accounts.
            </Typography>
            <br />
            <br />
          </section>

          <Typography tag="p" className="">
            6.4. If we terminate this Agreement, we may close your account or
            disable your access. Upon termination, the following provisions will
            remain in effect:
            <br />
            <br />
          </Typography>

          <section className={classNames('py-10 pl-14')}>
            <Typography tag="li" className="ml-4">
              (i) Futures4Europe and Users will retain the right to access, use,
              and share your Content in accordance with these Terms and
              applicable laws, when appropriate;
            </Typography>
            <Typography tag="li" className="ml-4">
              (ii) Our right to retain your account data in compliance with our
              Privacy Policy, such as for defending against legal claims.
            </Typography>
          </section>

          <Typography tag="p" className="w-full text-4xl font-medium py-10">
            VII. Amendments to this agreement
          </Typography>

          <Typography tag="p" className="">
            We may periodically update these Terms of Use to clarify provisions,
            reflect changes in our Platform, or comply with legal requirements.
            You will be bound by the new terms either by explicitly agreeing to
            them or by being notified of the changes. We will inform you of any
            updates by sending an email and/or through a notification on the
            Platform. It is your responsibility to regularly check your email
            and account for such notifications.
            <br />
            <br />
          </Typography>

          <Typography tag="p" className="w-full text-4xl font-medium py-10">
            VIII. Contractual and legal liability
          </Typography>

          <Typography tag="p" className="">
            8.1. You agree to indemnify and protect Futures4Europe from any
            claims or demands, including reasonable legal fees, made by third
            parties as a result of your Content, violation of these Terms of
            Use, misuse of the Platform, breach of any law, or infringement of a
            third party&apos;s rights.
            <br />
            <br />
            8.2. The software that powers the Platform, along with the site
            design, Content, logos, graphics, and the database, are protected by
            copyright, trademark, and other intellectual property laws across
            various jurisdictions. We retain all intellectual property rights in
            the Platform. <br />
            <br />
            8.3. To the maximum extent allowed by law, the Futures4Europe shall
            not be liable for any losses, damages, liabilities, costs, or claims
            that may arise directly or indirectly from your use of the Platform,
            including any use of your member account or data by a third party.
            You irrevocably release and hold the Futures4Europe harmless from
            any such costs.
            <br />
            <br />
            8.4. Our contractual liability is limited to the typical foreseeable
            damages that arise from a breach of essential contractual
            obligations caused by slight negligence. Essential contractual
            obligations refer to those duties that are fundamental to the proper
            execution of this Agreement, and which the parties can reasonably
            expect to be fulfilled. Any other liability on the part of
            Futures4Europe is expressly excluded.
            <br />
            <br />
            8.5. Futures4Europe is not involved in, nor does it become a party
            to, any agreements that Users enter into with one another through
            the Platform. Users assume full responsibility for the performance,
            fulfillment, and enforcement of any agreements they choose to make.
            Futures4Europe disclaims all liability for any breaches, disputes,
            or failures arising from such agreements, including any obligations
            or commitments resulting from them. In the event of a disagreement,
            dispute, or conflict between you and a third party, you acknowledge
            that Futures4Europe has no responsibility, nor any duty, to
            intervene, mediate, or resolve such matters. It is your
            responsibility to manage and resolve these issues independently.
            <br />
            <br />
            8.6. Our Platform may include links to third-party websites or
            services that are not owned or controlled by Futures4Europe. We have
            no control over these external sites and accept no responsibility
            for their content or policies. We advise you to exercise caution
            when navigating away from the Platform and to review the terms and
            privacy policies of any external sites you visit.
            <br />
            <br />
            8.7. These Terms of Use shall be governed by the laws of Romania.
            <br />
            <br />
            8.7. The courts of Bucharest, Romania, shall have exclusive
            jurisdiction over any disputes arising from or related to these
            Terms of Use.
            <br />
            <br />
            8.9. We do not use alternative dispute resolution procedures to
            resolve disputes with Users.
            <br />
            <br />
            8.10. If any provision or part of these Terms of Use is found to be
            invalid, illegal, or unenforceable, the validity, legality, and
            enforceability of the other provisions will remain unaffected and
            fully intact.
            <br />
            <br />
            8.11. All administrative emails from Futures4Europe will be sent to
            the email address associated with your account. It is your
            responsibility to ensure that this email address remains current and
            valid. If the email address becomes invalid or is unable to receive
            emails for any reason, the delivery of an email containing a notice
            will still be considered effective and binding. It is essential that
            you keep your contact information updated to ensure you receive all
            important communications from Futures4Europe.
          </Typography>

          <Typography tag="p" className="w-full text-4xl font-medium py-10">
            IX. Account Security
          </Typography>

          <Typography tag="p" className="">
            9.1. You are responsible for all the Content published by you.
            <br />
            <br />
            9.2. You are responsible for maintaining the security of your
            account and password.
            <br />
            <br />
            9.3. Do not share private communications, personal data of minors,
            or personal or sensitive data of any other person without a legal
            basis to do so. This includes sharing someone’s private information
            online without their permission.
            <br />
            <br />
            9.4. Do not share confidential information, trade secrets, or any
            information you do not have a right to share.
          </Typography>

          <Typography tag="p" className="w-full text-4xl font-medium py-10">
            X. Additional Terms
          </Typography>

          <Typography tag="p" className="">
            The Website is hosted by WIX, whose head office is located at:
            Wix.com Inc. 100 Gansevoort Street, New York, NY 10014 USA Attn:
            Copyright Agent
            <br />
            <br />
            Telephone Number: 1-415-358-0857 | Fax: 1-415-358-0884
            <br />
            <br />
            E-mail: abuse@wix.com
            <br />
            <br />
          </Typography>

          <Typography tag="p" className="w-full text-4xl font-medium py-10">
            XI. AI Services
          </Typography>

          <Typography tag="p" className="">
            As part of the Wix Services, Wix may provide you with access to
            artificial intelligence and machine learning tools and products,
            which will help you build your User Platform by generating Content.
            This section applies only to the extent AI Services are used by you
            as part of the Wix Services.
            <br />
            <br />
          </Typography>

          <Typography tag="p" className="w-full text-4xl font-medium py-10">
            XII. Platform Use
          </Typography>

          <Typography tag="p" className="">
            12. 1. You agree to use the Platform in a lawful, ethical, and
            responsible manner.
            <br />
            <br />
            12.2. We take all reasonable precautions and apply the necessary
            expertise to ensure that our site is secure and free from viruses or
            other malware.
            <br />
            <br />
            12.3. You are responsible for protecting your hardware, software,
            data and other material from viruses, malware, and other internet
            security risks.
            <br />
            <br />
            12.4. You must not intentionally introduce viruses, malware, or any
            other malicious or harmful technology to or through our Platform.
            Additionally, you are prohibited from attempting to gain
            unauthorized access to any part of our site, the server where it is
            hosted, or any related server, computer, or database. Furthermore,
            you must not engage in any attacks on our site.
            <br />
            <br />
            12.5. By violating the provisions outlined above, you may be
            committing a serious offense. Any such breaches will be reported to
            the appropriate law enforcement authorities, and we will fully
            cooperate by providing them your identification data. In the event
            of such a breach, your right to use our Platform will be immediately
            revoked.
            <br />
            <br />
          </Typography>

          <Typography tag="p" className="w-full text-4xl font-medium py-10">
            XIII. Disclaimer
          </Typography>

          <Typography tag="p" className="">
            13.1. The Platform and foresight Content are provided &quot;AS
            IS&quot; and without warranty of any kind, express or implied,
            including but not limited to the warranties of fitness for a
            particular purpose. We do not warrant that the Platform will be
            uninterrupted, error-free, or free of viruses or other harmful
            components. You assume all risk of using the Platform.
            <br />
            <br />
            13.2. We strive to ensure the accuracy of all information provided
            on the website. If you come across any inaccuracies, please notify
            us, and where we agree, we will correct them as soon as reasonably
            possible.
            <br />
            <br />
            13.3. While we hope Futures4Europe will be of value to users, we do
            not guarantee that the information is accurate, up-to-date, or
            complete. We make no warranties regarding the Content of the website
            and disclaim all liability to the fullest extent permitted by law.
            Any information on the site should be independently verified before
            being relied upon.
            <br />
            <br />
            13.4. The Content on the Platform is provided by Members. Opinions,
            advice, statements, offers, or other information presented by
            Members reflect the views of their respective authors or
            distributors, not Futures4Europe. We do not necessarily endorse or
            accept responsibility for the accuracy or reliability of any such
            opinions or statements.
            <br />
            <br />
          </Typography>

          <Typography tag="p" className="w-full text-4xl font-medium py-10">
            XIV. Contact Us
          </Typography>

          <Typography tag="p" className="">
            If You have any questions about these Terms, please contact us at
            info@futures4europe.eu.
            <br />
            <br />
          </Typography>
        </div>
      </section>
    </div>
  );
}
