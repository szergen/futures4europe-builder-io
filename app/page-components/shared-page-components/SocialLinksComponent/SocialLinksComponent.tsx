import classNames from 'classnames';
import { use, useEffect, useState } from 'react';
import style from './SocialLinksComponent.module.css';
import SpriteSvg from '@app/shared-components/SpriteSvg/SpriteSvg';
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { validateUrl } from '@app/utils/validation-utils';

type SocialLinksComponentProps = {
  isEditModeOn?: boolean;
  linkedinLink?: string;
  websiteLink?: string;
  researchGateLink?: string;
  orcidLink?: string;
  handleUpdate?: (key: string, value: any) => void;
  extended?: boolean;
};

const SocialLinksComponent: React.FC<SocialLinksComponentProps> = ({
  isEditModeOn,
  linkedinLink,
  websiteLink,
  researchGateLink,
  orcidLink,
  handleUpdate,
  extended,
}) => {
  const router = useRouter();
  const [modalKeyToUpdate, setModalKeyToUpdate] = useState('');
  const [currentLinkedinLink, setCurrentLinkedinLink] = useState(linkedinLink);
  const [currentWebsiteLink, setCurrentWebsiteLink] = useState(websiteLink);
  const [currentResearchGateLink, setCurrentResearchGateLink] =
    useState(researchGateLink);
  const [currentOrcidLink, setCurrentOrcidLink] = useState(orcidLink);
  const [labelText, setLabelText] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [urlErrors, setUrlErrors] = useState({
    linkedinLink: '',
    websiteLink: '',
    researchGateLink: '',
    orcidLink: '',
  });

  const handleIconClick = (url: string, modalKey: string) => {
    const label = {
      linkedinLink: 'Linkedin link',
      websiteLink: 'Website link',
      researchGateLink: 'ResearchGate link',
      orcidLink: 'ORCID link',
    }[modalKey];
    setLabelText(label);
    isEditModeOn && setModalKeyToUpdate(modalKey);
    isEditModeOn ? setShowCreateForm(true) : window.open(url, '_blank');
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get current URL and fieldName based on which modal is open
    const currentUrl =
      modalKeyToUpdate === 'linkedinLink'
        ? currentLinkedinLink
        : modalKeyToUpdate === 'websiteLink'
        ? currentWebsiteLink
        : modalKeyToUpdate === 'researchGateLink'
        ? currentResearchGateLink
        : currentOrcidLink;

    const fieldName = {
      linkedinLink: 'LinkedIn URL',
      websiteLink: 'Website URL',
      researchGateLink: 'ResearchGate URL',
      orcidLink: 'ORCID URL',
    }[modalKeyToUpdate];

    // Validate URL - this uses the imported function which returns a string
    const errorMessage = validateUrl(currentUrl || '', fieldName);

    if (errorMessage) {
      // If there's an error message
      setUrlErrors((prev) => ({
        ...prev,
        [modalKeyToUpdate]: errorMessage,
      }));
      return;
    }

    handleUpdate && handleUpdate(modalKeyToUpdate, currentUrl);

    setUrlErrors((prev) => ({
      ...prev,
      [modalKeyToUpdate]: '',
    }));

    setShowCreateForm(false);
  };

  useEffect(() => {
    setCurrentLinkedinLink(linkedinLink);
    setCurrentWebsiteLink(websiteLink);
    setCurrentResearchGateLink(researchGateLink);
    setCurrentOrcidLink(orcidLink);
  }, [isEditModeOn, linkedinLink, websiteLink, researchGateLink, orcidLink]);

  return (
    <div className={style.socialIcons}>
      {/* Linkedin */}
      {(currentLinkedinLink || isEditModeOn) && (
        <i
          className={classNames(
            style.socialIcon,
            isEditModeOn && style.editIcon,
            extended && style.extended,
            isEditModeOn && !currentLinkedinLink && 'opacity-50'
          )}
          onClick={() =>
            handleIconClick(currentLinkedinLink || '', 'linkedinLink')
          }
        >
          <SpriteSvg.AccountLinkLinkedin
            viewBox="-4 -4 32 32"
            className={classNames(style.website)}
            sizeW={24}
            sizeH={24}
            fill={'var(--primary-white)'}
            strokeWidth={0}
            style={{
              padding: 'var(--w-space-xs)',
              backgroundColor: !currentLinkedinLink
                ? 'var(--color-text-icon-offline)'
                : 'var(--color-background-primary)',
            }}
            inline={false}
          />
        </i>
      )}
      {/* ORCID */}
      {(currentOrcidLink || isEditModeOn) && extended && (
        <i
          className={classNames(
            style.socialIcon,
            isEditModeOn && style.editIcon,
            extended && style.extended,
            isEditModeOn && !currentOrcidLink && 'opacity-50'
          )}
          onClick={() => handleIconClick(currentOrcidLink || '', 'orcidLink')}
        >
          <SpriteSvg.AccountLinkOrcid
            viewBox="-5 -2 32 32"
            className={classNames(style.website)}
            sizeW={24}
            sizeH={24}
            fill={'var(--primary-white)'}
            style={{
              padding: 'var(--w-space-xs)',
              backgroundColor: !currentOrcidLink
                ? 'var(--color-text-icon-offline)'
                : 'var(--color-background-orcid)',
            }}
            strokeWidth={0}
            inline={false}
          />
        </i>
      )}
      {/* Website */}
      {(currentWebsiteLink || isEditModeOn) && (
        <i
          className={classNames(
            style.socialIcon,
            isEditModeOn && style.editIcon,
            extended && style.extended,
            isEditModeOn && !currentWebsiteLink && 'opacity-50'
          )}
          onClick={() =>
            handleIconClick(currentWebsiteLink || '', 'websiteLink')
          }
        >
          <SpriteSvg.AccountLinkGeneral
            className={classNames(style.website)}
            sizeW={24}
            sizeH={24}
            fill={'var(--primary-white)'}
            style={{
              padding: 'var(--w-space-xs)',
              backgroundColor: !currentWebsiteLink
                ? 'var(--color-text-icon-offline)'
                : 'var(--color-background-website)',
            }}
            viewBox={'-4 -4 32 32'}
            strokeWidth={0}
            inline={false}
          />
        </i>
      )}
      {/* ResearchGate */}
      {(currentResearchGateLink || isEditModeOn) && extended && (
        <i
          className={classNames(
            style.socialIcon,
            isEditModeOn && style.editIcon,
            extended && style.extended,
            isEditModeOn && !currentResearchGateLink && 'opacity-50'
          )}
          onClick={() =>
            handleIconClick(currentResearchGateLink || '', 'researchGateLink')
          }
        >
          <SpriteSvg.AccountLinkResearchGate
            viewBox="-4 -4 32 32"
            className={classNames(style.website)}
            sizeW={24}
            sizeH={24}
            fill={'var(--primary-white)'}
            style={{
              padding: 'var(--w-space-xs)',
              backgroundColor: !currentResearchGateLink
                ? 'var(--color-text-icon-offline)'
                : 'var(--color-background-researchgate)',
            }}
            strokeWidth={0}
            inline={false}
          />
        </i>
      )}

      <Modal show={showCreateForm} onClose={() => setShowCreateForm(false)}>
        <Modal.Header>Paste the url</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <Label htmlFor="tagName" className="relative">
                {labelText}
              </Label>
              <TextInput
                placeholder="Paste the url"
                value={
                  modalKeyToUpdate === 'linkedinLink'
                    ? currentLinkedinLink
                    : modalKeyToUpdate === 'websiteLink'
                    ? currentWebsiteLink
                    : modalKeyToUpdate === 'researchGateLink'
                    ? currentResearchGateLink
                    : currentOrcidLink
                }
                id="tagName"
                onChange={(e) => {
                  const value = e.target.value;
                  // Update appropriate state based on which modal is open
                  if (modalKeyToUpdate === 'linkedinLink') {
                    setCurrentLinkedinLink(value);
                  } else if (modalKeyToUpdate === 'websiteLink') {
                    setCurrentWebsiteLink(value);
                  } else if (modalKeyToUpdate === 'researchGateLink') {
                    setCurrentResearchGateLink(value);
                  } else if (modalKeyToUpdate === 'orcidLink') {
                    setCurrentOrcidLink(value);
                  }

                  // Clear error for this field when user types
                  if (urlErrors[modalKeyToUpdate]) {
                    setUrlErrors((prev) => ({
                      ...prev,
                      [modalKeyToUpdate]: '',
                    }));
                  }
                }}
                required
                color={urlErrors[modalKeyToUpdate] ? 'failure' : undefined}
                helperText={
                  urlErrors[modalKeyToUpdate] && (
                    <span className="text-red-600">
                      {urlErrors[modalKeyToUpdate]}
                    </span>
                  )
                }
              />
            </div>

            <Button
              pill
              color="purple"
              className="bg-action-site hover:bg-action-hover"
              disabled={
                (modalKeyToUpdate === 'linkedinLink' && !currentLinkedinLink) ||
                (modalKeyToUpdate === 'websiteLink' && !currentWebsiteLink) ||
                (modalKeyToUpdate === 'researchGateLink' &&
                  !currentResearchGateLink) ||
                (modalKeyToUpdate === 'orcidLink' && !currentOrcidLink)
              }
              type="submit"
            >
              Update
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SocialLinksComponent;
