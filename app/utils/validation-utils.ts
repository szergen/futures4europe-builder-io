/**
 * Utility functions for validation operations
 */

/**
 * Validates a title field
 * @param title The title to validate
 * @returns Error message or empty string if valid
 */
export const validateTitle = (title: string): string => {
  if (!title || title.trim() === '') {
    return 'Title is required';
  }
  if (title.length < 3) {
    return 'Title must be at least 3 characters long';
  }
  if (title.length > 100) {
    return 'Title must be less than 100 characters long';
  }
  return '';
};

/**
 * Validates a subtitle field
 * @param subtitle The subtitle to validate
 * @returns Error message or empty string if valid
 */
export const validateSubtitle = (subtitle: string): string => {
  if (subtitle && subtitle.length > 200) {
    return 'Subtitle must be less than 200 characters long';
  }
  return '';
};

/**
 * Validates a URL field
 * @param url The URL to validate
 * @param fieldName The name of the field for the error message
 * @returns Error message or empty string if valid
 */
export const validateUrl = (url: string, fieldName: string): string => {
  if (!url) return '';

  try {
    new URL(url);
    return '';
  } catch (e) {
    return `${fieldName} must be a valid URL`;
  }
};

/**
 * Validates a person data object
 * @param personData The person data object to validate
 * @returns Validation state object with error messages
 */
export const validatePersonData = (personData: any): Record<string, string> => {
  const validationState: Record<string, string> = {};

  // Validate title (person name)
  if (personData.personTag?.name) {
    validationState.title = validateTitle(personData.personTag.name);
  } else {
    validationState.title = 'Name is required';
  }

  // Validate URLs
  if (personData.data?.linkedinLink) {
    validationState.linkedinLink = validateUrl(
      personData.data.linkedinLink,
      'LinkedIn URL'
    );
  }

  if (personData.data?.websiteLink) {
    validationState.websiteLink = validateUrl(
      personData.data.websiteLink,
      'Website URL'
    );
  }

  if (personData.data?.researchGateLink) {
    validationState.researchGateLink = validateUrl(
      personData.data.researchGateLink,
      'ResearchGate URL'
    );
  }

  if (personData.data?.orcidLink) {
    validationState.orcidLink = validateUrl(
      personData.data.orcidLink,
      'ORCID URL'
    );
  }

  return validationState;
};

/**
 * Checks if there are any validation errors
 * @param validationState The validation state object
 * @returns True if there are validation errors, false otherwise
 */
export const hasValidationErrors = (
  validationState: Record<string, string>
): boolean => {
  return Object.values(validationState).some((error) => error !== '');
};
