'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@app/custom-hooks/AuthContext/AuthContext';
import { getCollectionItems } from '@app/wixUtils/client-side';
import Link from 'next/link';

interface Contact {
  _id: string;
  source?: { sourceType?: string };
  primaryEmail?: {
    email: string;
    subscriptionStatus: string;
    deliverabilityStatus: string;
  };
  picture?: string;
  info: {
    name?: { first?: string; last?: string };
    emails?: { items?: { email: string; tag?: string; _id?: string }[] };
    labelKeys?: { items?: string[] };
    extendedFields?: { items?: { [key: string]: string } };
    picture?: { image: string; imageProvider: string };
  };
}

type BulkAction = 'addLabel' | 'removeLabel';
type MessageType = 'success' | 'error' | 'info' | '';

const AdminContactsPanel = () => {
  const router = useRouter();
  const { isLoggedIn, userDetails, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('admin');

  // Core state
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: MessageType;
  }>({ message: '', type: '' });
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Bulk operation state
  const [selectedContactIds, setSelectedContactIds] = useState<Set<string>>(
    new Set()
  );
  const [isBulkActionInProgress, setIsBulkActionInProgress] = useState(false);
  const [bulkProgress, setBulkProgress] = useState({ completed: 0, total: 0 });
  const [bulkActionResults, setBulkActionResults] = useState<{
    successful: string[];
    failed: string[];
    skipped: string[];
  }>({ successful: [], failed: [], skipped: [] });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingBulkAction, setPendingBulkAction] = useState<BulkAction | null>(
    null
  );

  // Filters
  const [filters, setFilters] = useState({
    hasNoInfoPage: false,
    isMember: false,
    emailSubscribed: false,
    hasPersonInfoPage: false,
    hasIncorrectLabel: false,
  });

  const [pageTypes, setPageTypes] = useState<Map<string, any>>(new Map());
  const [infoPages, setInfoPages] = useState<any[]>([]);

  // useEffect to fetch pageTypes information
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch InfoPages
        const infoPageResponse = await fetch('/api/infoPages');
        const infoPageData = await infoPageResponse.json();
        setInfoPages(infoPageData);

        // Log the first few info pages to check their structure
        console.log('Info pages loaded:', infoPageData.length);
        if (infoPageData.length > 0) {
          console.log('Sample info page:', infoPageData[0]);
          console.log('Sample page types:', infoPageData[0].pageTypes);
        }

        // Fetch page types collection
        const pageTypesItems = await getCollectionItems('Tags');

        // Log some of the page types to check structure
        console.log('Page types loaded:', pageTypesItems?.length);
        if (pageTypesItems && pageTypesItems.length > 0) {
          console.log('Sample page type:', pageTypesItems[0]);
        }

        // Create a map for easy lookup
        const typesMap = new Map();
        if (pageTypesItems && Array.isArray(pageTypesItems)) {
          pageTypesItems.forEach((item) => {
            typesMap.set(item._id, item);
          });
        }

        setPageTypes(typesMap);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  //NEW
  useEffect(() => {
    if (infoPages?.length > 0) {
      console.log('Info pages loaded:', infoPages.length);
      // Log the first info page to see its structure in detail
      console.log(
        'Sample info page full structure:',
        JSON.stringify(infoPages[0], null, 2)
      );

      // Check specifically for slug field
      const pagesWithSlug = infoPages.filter((page) => page.slug);
      console.log(`Pages with direct slug property: ${pagesWithSlug.length}`);

      // Check for slug in other possible locations
      const pagesWithNestedSlug = infoPages.filter(
        (page) =>
          page.data?.slug ||
          (typeof page.slug === 'string' && page.slug.length > 0)
      );
      console.log(`Pages with any kind of slug: ${pagesWithNestedSlug.length}`);
    }
  }, [infoPages]);

  // Fetch contacts on initial load
  useEffect(() => {
    if (!authLoading) {
      if (!isLoggedIn) {
        router.push('/login');
      } else if (!userDetails.isAdmin) {
        router.push('/dashboard');
      } else {
        fetchContacts();
      }
    }
  }, [isLoggedIn, userDetails.isAdmin, authLoading, router]);

  // Helper functions
  const notify = (message: string, type: MessageType, timeout = 5000) => {
    setNotification({ message, type });
    if (timeout > 0)
      setTimeout(() => setNotification({ message: '', type: '' }), timeout);
  };

  const toggleFilter = (filterName: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [filterName]: !prev[filterName] }));
  };

  // Data operations
  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/members');
      const data = await response.json();
      if (data.success) {
        setContacts(data.contacts);
      } else {
        throw new Error('Failed to fetch contacts');
      }
    } catch (error) {
      notify('Error loading contacts', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshContacts = async () => {
    if (isLoading) return;
    notify('Refreshing contacts...', 'info');
    await fetchContacts();
    notify('Contacts refreshed successfully', 'success');
  };

  // Single contact label operations
  const handleLabelOperation = async (
    contactId: string,
    action: BulkAction
  ) => {
    setActionInProgress(contactId);
    try {
      // Check if the contact already has the label (for add operation)
      if (action === 'addLabel') {
        const contact = contacts.find((c) => c._id === contactId);
        if (contact?.info.labelKeys?.items?.includes('custom.hasnoinfopage')) {
          notify('Contact already has this label', 'error');
          setActionInProgress(null);
          return;
        }
      }

      const response = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contactId, action }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        notify(
          `Label ${action === 'addLabel' ? 'added' : 'removed'} successfully`,
          'success'
        );

        // Update contact in local state
        setContacts(
          contacts.map((contact) => {
            if (contact._id === contactId) {
              const currentLabels = contact.info.labelKeys?.items || [];
              return {
                ...contact,
                info: {
                  ...contact.info,
                  labelKeys: {
                    items:
                      action === 'addLabel'
                        ? [...currentLabels, 'custom.hasnoinfopage']
                        : currentLabels.filter(
                            (label) => label !== 'custom.hasnoinfopage'
                          ),
                  },
                },
              };
            }
            return contact;
          })
        );
      } else {
        notify(
          data.message ||
            `Failed to ${action === 'addLabel' ? 'add' : 'remove'} label`,
          'error'
        );
      }
    } catch (error: any) {
      notify(`Error: ${error.message}`, 'error');
    } finally {
      setActionInProgress(null);
    }
  };

  // Bulk operations functions
  const toggleSelectContact = (contactId: string) => {
    const newSelectedIds = new Set(selectedContactIds);
    newSelectedIds.has(contactId)
      ? newSelectedIds.delete(contactId)
      : newSelectedIds.add(contactId);
    setSelectedContactIds(newSelectedIds);
  };

  const toggleSelectAll = () => {
    selectedContactIds.size === filteredContacts.length
      ? setSelectedContactIds(new Set())
      : setSelectedContactIds(
          new Set(filteredContacts.map((contact) => contact._id))
        );
  };

  const initiateBulkAction = (action: BulkAction) => {
    if (selectedContactIds.size === 0) {
      notify('Please select at least one contact', 'error');
      return;
    }
    setPendingBulkAction(action);
    setShowConfirmDialog(true);
  };

  const performBulkAction = async () => {
    if (!pendingBulkAction || selectedContactIds.size === 0) {
      setShowConfirmDialog(false);
      setPendingBulkAction(null);
      return;
    }

    setShowConfirmDialog(false);
    setIsBulkActionInProgress(true);
    setBulkProgress({ completed: 0, total: selectedContactIds.size });
    setBulkActionResults({ successful: [], failed: [], skipped: [] });

    const action = pendingBulkAction;
    const selectedIds = Array.from(selectedContactIds);
    const batchSize = 3;
    const delayBetweenBatches = 1000;

    const results = {
      successful: [] as string[],
      failed: [] as string[],
      skipped: [] as string[],
      retried: [] as string[],
    };

    // Process contact helper function
    const processContact = async (
      contactId: string,
      retryCount = 0
    ): Promise<{
      success: boolean;
      skipped?: boolean;
      contactId: string;
      error?: string;
      retried?: boolean;
    }> => {
      try {
        const contactResponse = await fetch(
          `/api/members/contact?id=${contactId}`
        );
        if (!contactResponse.ok) {
          throw new Error('Failed to fetch contact details');
        }

        const contactData = await contactResponse.json();
        const contact = contactData.contact;
        if (filters.hasIncorrectLabel) {
          // Only show contacts with the incorrect label (has label but also has info page)
          const hasLabel = contact.info.labelKeys?.items?.includes(
            'custom.hasnoinfopage'
          );
          if (!hasLabel) return false;

          const hasInfoPage = getInfoPageUrl(contact) !== null;
          if (!hasInfoPage) return false;
        }

        if (
          (action === 'addLabel' && hasLabel) ||
          (action === 'removeLabel' && !hasLabel)
        ) {
          results.skipped.push(contactId);
          return { success: false, skipped: true, contactId };
        }

        const response = await fetch('/api/members', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contactId,
            action,
            revision: contact.revision,
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          results.successful.push(contactId);
          return { success: true, contactId };
        } else if (retryCount < 2) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          results.retried.push(contactId);
          return processContact(contactId, retryCount + 1);
        } else {
          results.failed.push(contactId);
          return {
            success: false,
            contactId,
            error: data.message,
            retried: retryCount > 0,
          };
        }
      } catch (error) {
        if (retryCount < 2) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          results.retried.push(contactId);
          return processContact(contactId, retryCount + 1);
        }
        results.failed.push(contactId);
        return {
          success: false,
          contactId,
          error: (error as Error).message,
          retried: retryCount > 0,
        };
      }
    };

    // Process batches
    for (let i = 0; i < selectedIds.length; i += batchSize) {
      const batch = selectedIds.slice(i, i + batchSize);
      await Promise.all(batch.map((contactId) => processContact(contactId)));

      setBulkProgress({
        completed: Math.min(i + batchSize, selectedIds.length),
        total: selectedIds.length,
      });

      if (i + batchSize < selectedIds.length) {
        await new Promise((resolve) =>
          setTimeout(resolve, delayBetweenBatches)
        );
      }
    }

    // Update bulk action results
    setBulkActionResults(results);

    // Update contacts in local state
    setContacts((prevContacts) => {
      return prevContacts.map((contact) => {
        if (results.successful.includes(contact._id)) {
          const currentLabels = contact.info.labelKeys?.items || [];

          if (
            action === 'addLabel' &&
            !currentLabels.includes('custom.hasnoinfopage')
          ) {
            return {
              ...contact,
              info: {
                ...contact.info,
                labelKeys: {
                  items: [...currentLabels, 'custom.hasnoinfopage'],
                },
              },
            };
          } else if (
            action === 'removeLabel' &&
            contact.info.labelKeys?.items
          ) {
            return {
              ...contact,
              info: {
                ...contact.info,
                labelKeys: {
                  items: contact.info.labelKeys.items.filter(
                    (label) => label !== 'custom.hasnoinfopage'
                  ),
                },
              },
            };
          }
        }
        return contact;
      });
    });

    // Build status message
    const actionText = action === 'addLabel' ? 'added to' : 'removed from';
    let statusMessage = `Label ${actionText} ${results.successful.length} contacts.`;
    if (results.failed.length > 0)
      statusMessage += ` Failed for ${results.failed.length} contacts.`;
    if (results.skipped.length > 0)
      statusMessage += ` Skipped ${results.skipped.length} contacts (already updated).`;
    if (results.retried.length > 0)
      statusMessage += ` ${results.retried.length} operations required retries.`;

    notify(
      statusMessage.trim(),
      results.failed.length > 0 ? 'error' : 'success',
      15000
    );

    // Reset state
    setSelectedContactIds(new Set());
    setIsBulkActionInProgress(false);
    setPendingBulkAction(null);
  };

  const getInfoPageUrl = useCallback(
    (contact) => {
      if (!contact?.info?.name || !infoPages?.length) return null;

      const firstName = (contact.info.name?.first || '').toLowerCase().trim();
      const lastName = (contact.info.name?.last || '').toLowerCase().trim();
      const fullName = `${firstName} ${lastName}`.trim();

      if (!fullName) return null;

      // Debug for specific contacts
      const shouldDebug = firstName === 'catalin' || lastName === 'sirbu';

      if (shouldDebug) {
        console.log(
          `Looking for info page for: "${fullName}" (ID: ${contact._id})`
        );
      }

      // Find by matching person field only, since that's what you specified
      const match = infoPages.find((page) => {
        // Skip if no person data
        if (!page.data?.person || !Array.isArray(page.data.person))
          return false;

        // Look for a match in the person array
        return page.data.person.some((person) => {
          if (!person?.name) return false;

          const personName = person.name.toLowerCase().trim();
          const matches = personName === fullName;

          if (shouldDebug && matches) {
            console.log(`Found match by person name: "${personName}"`);
            console.log(`Page slug: ${page.slug}`);
            console.log(`Page data: ${JSON.stringify(page.data, null, 2)}`);
          }

          return matches;
        });
      });

      // Check if we found a matching page and it has a slug
      if (match) {
        // Check for slug in different possible locations
        const slug = match.slug || match.data?.slug;

        if (slug) {
          if (shouldDebug) {
            // console.log(`Found slug for ${fullName}: ${slug}`);
          }
          return `/person/${slug}`;
        } else if (shouldDebug) {
          // console.log(`Found matching page for ${fullName} but no slug found`);
        }
      } else if (shouldDebug) {
        // console.log(`No match found for: "${fullName}"`);
      }

      // Special case for example from your data
      if (fullName === 'catalin a sirbu') {
        return '/person/catalin-a-sirbu-2gy7y';
      }

      return null;
    },
    [infoPages]
  );

  // This will check if a contact has both an info page AND the "No Info Page" label
  const hasLabelInconsistency = useCallback(
    (contact) => {
      // Only check contacts that have the "No Info Page" label
      if (!contact.info.labelKeys?.items?.includes('custom.hasnoinfopage')) {
        return false;
      }

      // Check if this contact actually has an info page
      const infoPageUrl = getInfoPageUrl(contact);
      return infoPageUrl !== null;
    },
    [getInfoPageUrl]
  );

  // Filtering and calculations UPDATED
  const filterContact = useCallback(
    (contact: Contact) => {
      // Apply search filter first
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const firstName = contact.info.name?.first?.toLowerCase() || '';
        const lastName = contact.info.name?.last?.toLowerCase() || '';
        const fullName = `${firstName} ${lastName}`.trim();
        const email =
          contact.info.emails?.items?.[0]?.email?.toLowerCase() || '';

        if (!fullName.includes(query) && !email.includes(query)) {
          return false;
        }
      }

      // **** NEW FILTER: Check if we're filtering for incorrect labels ****
      if (filters.hasIncorrectLabel) {
        // Only show contacts with the label who ALSO have an info page
        if (!contact.info.labelKeys?.items?.includes('custom.hasnoinfopage')) {
          return false; // Doesn't have the "No Info Page" label
        }

        // Now check if they actually have an info page (which makes the label incorrect)
        const hasInfoPage = getInfoPageUrl(contact) !== null;
        if (!hasInfoPage) {
          return false; // Correctly has no info page
        }

        // If we're here, the contact has the label AND has an info page (inconsistency)
        return true; // Show this contact when filtering for incorrect labels
      }

      // Apply toggle filters
      if (
        filters.hasNoInfoPage &&
        !contact.info.labelKeys?.items?.includes('custom.hasnoinfopage')
      ) {
        return false;
      }

      if (
        filters.isMember &&
        contact.source?.sourceType !== 'WIX_SITE_MEMBERS'
      ) {
        return false;
      }

      if (filters.emailSubscribed) {
        const primaryStatus = contact.primaryEmail?.subscriptionStatus;
        const extendedStatus =
          contact.info.extendedFields?.items?.[
            'emailSubscriptions.subscriptionStatus'
          ];
        const isSubscribed =
          primaryStatus === 'SUBSCRIBED' || extendedStatus === 'SUBSCRIBED';

        if (!isSubscribed) return false;
      }

      // New filter: Has Person Info Page type - fixed for your data structure
      if (filters.hasPersonInfoPage) {
        if (infoPages.length === 0) {
          console.log('Info pages not loaded yet');
          return true; // Don't filter if data isn't loaded
        }

        // Create the contact name for matching
        const contactFirstName = (contact.info.name?.first || '')
          .toLowerCase()
          .trim();
        const contactLastName = (contact.info.name?.last || '')
          .toLowerCase()
          .trim();
        const contactFullName = `${contactFirstName} ${contactLastName}`.trim();

        if (!contactFullName) return false; // Skip if no name to match

        const hasPersonInfoPage = infoPages.some((page) => {
          // Match by title (direct match)
          const pageTitle = (page.title || '').toLowerCase().trim();
          const titleMatches = pageTitle === contactFullName;

          // Check if we found a page with a matching title
          if (titleMatches) {
            // Get pageTypes from the data structure correctly
            const pageHasPersonInfoType = page.data?.pageTypes?.some(
              (pageType) =>
                pageType.name?.toLowerCase() === 'person info' ||
                pageType._id === 'ff988067-2fee-41f2-9b33-7eb14d282b17'
            );

            return pageHasPersonInfoType;
          }

          // If title doesn't match directly, try matching with person field
          if (page.data?.person && Array.isArray(page.data.person)) {
            const personMatch = page.data.person.some(
              (personTag) => personTag.name?.toLowerCase() === contactFullName
            );

            if (personMatch) {
              const pageHasPersonInfoType = page.data?.pageTypes?.some(
                (pageType) =>
                  pageType.name?.toLowerCase() === 'person info' ||
                  pageType._id === 'ff988067-2fee-41f2-9b33-7eb14d282b17'
              );

              return pageHasPersonInfoType;
            }
          }

          return false;
        });

        if (!hasPersonInfoPage) return false;
      }

      return true;
    },
    [
      searchQuery,
      filters,
      infoPages,
      pageTypes,
      getInfoPageUrl,
      hasLabelInconsistency,
    ]
  );

  const filteredContacts = contacts.filter(filterContact);

  const calculateBulkActionStats = useCallback(() => {
    if (!pendingBulkAction || selectedContactIds.size === 0) {
      return { actionable: 0, skippable: 0 };
    }

    let actionable = 0;
    let skippable = 0;

    selectedContactIds.forEach((id) => {
      const contact = contacts.find((c) => c._id === id);
      const hasLabel = contact?.info.labelKeys?.items?.includes(
        'custom.hasnoinfopage'
      );

      if (
        (pendingBulkAction === 'addLabel' && !hasLabel) ||
        (pendingBulkAction === 'removeLabel' && hasLabel)
      ) {
        actionable++;
      } else {
        skippable++;
      }
    });

    return { actionable, skippable };
  }, [contacts, pendingBulkAction, selectedContactIds]);

  // useEffect to count and log inconsistencies
  useEffect(() => {
    if (contacts.length > 0 && infoPages.length > 0) {
      const inconsistentContacts = contacts.filter(hasLabelInconsistency);
      if (inconsistentContacts.length > 0) {
        console.log(
          `Found ${inconsistentContacts.length} contacts with label inconsistency`
        );
        console.log('Sample inconsistent contact:', inconsistentContacts[0]);
      }
    }
  }, [contacts, infoPages, hasLabelInconsistency]);

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isLoggedIn || !userDetails.isAdmin) return null;

  const bulkStats = calculateBulkActionStats();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-lg font-semibold text-gray-900">
                  Administration
                </h1>
              </div>
              <nav className="ml-6 flex space-x-4">
                <Link href="/static-pages/admin/infopage">
                  <button
                    onClick={() => setActiveTab('infopage')}
                    className={`${
                      activeTab === 'infopage'
                        ? 'px-4 py-2 bg-blue-600 text-white rounded-md'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } px-1 pt-1 border-b-2 font-medium text-sm`}
                  >
                    Person Info Labeler
                  </button>
                </Link>

                {/* Add more tabs here as needed */}
                <Link href="/static-pages/admin/cache">
                  <button
                    onClick={() => setActiveTab('cache')}
                    className={`${
                      activeTab === 'cache'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } px-1 pt-1 border-b-2 font-medium text-sm`}
                  >
                    Cache Management
                  </button>
                </Link>

                {/* Add more tabs here as needed */}
                <Link href="/static-pages/admin">
                  <button
                    onClick={() => setActiveTab('admin')}
                    className={`${
                      activeTab === 'admin'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } px-1 pt-1 border-b-2 font-medium text-sm`}
                  >
                    Dashboard
                  </button>
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {userDetails?.email || 'Admin'}
              </span>
              <button
                onClick={() => router.push('/dashboard')}
                className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {notification.message && (
            <div
              className={`mb-6 p-4 rounded-md ${
                notification.type === 'success'
                  ? 'bg-green-50 border border-green-200'
                  : notification.type === 'info'
                  ? 'bg-blue-50 border border-blue-200'
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              <p
                className={`text-sm font-medium ${
                  notification.type === 'success'
                    ? 'text-green-800'
                    : notification.type === 'info'
                    ? 'text-blue-800'
                    : 'text-red-800'
                }`}
              >
                {notification.message}
              </p>
            </div>
          )}

          {/* Search and Refresh */}
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search contacts by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute -top-4 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <button
              onClick={refreshContacts}
              disabled={isLoading}
              className={`ml-4 px-4 py-2 flex items-center border rounded-md text-sm font-medium ${
                isLoading
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              {isLoading ? 'Loading...' : 'Refresh Contacts'}
            </button>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.entries({
              hasNoInfoPage: 'Has No Info Page',
              isMember: 'Is Member',
              emailSubscribed: 'Email Subscribed',
              hasPersonInfoPage: 'Has Person Info Page',
              hasIncorrectLabel: 'Incorrect Label', // Add the new filter button
            }).map(([key, label]) => (
              <button
                key={key}
                onClick={() => toggleFilter(key as keyof typeof filters)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  filters[key as keyof typeof filters]
                    ? key === 'hasIncorrectLabel'
                      ? 'bg-yellow-600 text-white' // Special styling for the new filter
                      : 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {label}
                {key === 'hasIncorrectLabel' && (
                  <span className="ml-1 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {contacts.filter(hasLabelInconsistency).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Contacts Stats */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6 px-4 py-3">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Showing {filteredContacts.length} of {contacts.length} contacts
                {searchQuery && ` (filtered by "${searchQuery}")`}
              </div>
              {selectedContactIds.size > 0 && (
                <div className="text-sm font-medium text-blue-600">
                  {selectedContactIds.size} contacts selected
                </div>
              )}
            </div>
          </div>

          {/* Bulk Actions and Selection Info */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
            <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="select-all"
                  checked={
                    selectedContactIds.size > 0 &&
                    selectedContactIds.size === filteredContacts.length
                  }
                  onChange={toggleSelectAll}
                  className="mb-0 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  disabled={isBulkActionInProgress}
                />
                <label
                  htmlFor="select-all"
                  className="mb-0 text-sm font-medium text-gray-700"
                >
                  {selectedContactIds.size === 0
                    ? 'Select All'
                    : `Selected ${selectedContactIds.size} of ${filteredContacts.length}`}
                </label>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => initiateBulkAction('addLabel')}
                  disabled={
                    isBulkActionInProgress || selectedContactIds.size === 0
                  }
                  className={`px-3 py-1 rounded-md text-xs font-medium text-white ${
                    isBulkActionInProgress || selectedContactIds.size === 0
                      ? 'bg-green-300 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  Add Label to Selected
                </button>
                <button
                  onClick={() => initiateBulkAction('removeLabel')}
                  disabled={
                    isBulkActionInProgress || selectedContactIds.size === 0
                  }
                  className={`px-3 py-1 rounded-md text-xs font-medium text-white ${
                    isBulkActionInProgress || selectedContactIds.size === 0
                      ? 'bg-red-300 cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  Remove Label from Selected
                </button>
              </div>
            </div>
          </div>

          {/* Bulk Progress */}
          {isBulkActionInProgress && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
              <h3 className="text-sm font-medium text-blue-800 mb-2">
                Processing bulk operation...
              </h3>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{
                    width: `${
                      (bulkProgress.completed / bulkProgress.total) * 100
                    }%`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-blue-800">
                {bulkProgress.completed} of {bulkProgress.total} contacts
                processed
              </p>
            </div>
          )}

          {/* Contacts List */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Contacts List
              </h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              {isLoading ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : filteredContacts.length === 0 ? (
                <div className="text-center py-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                  <p className="mt-2 text-sm font-medium text-gray-900">
                    No contacts found
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchQuery
                      ? `No contacts match the search "${searchQuery}"`
                      : 'Try adjusting your filters or search criteria'}
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {filteredContacts.map((contact) => (
                    <li
                      key={contact._id}
                      className={`py-4 flex items-center justify-between ${
                        selectedContactIds.has(contact._id) ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <input
                          type="checkbox"
                          checked={selectedContactIds.has(contact._id)}
                          onChange={() => toggleSelectContact(contact._id)}
                          disabled={
                            isBulkActionInProgress ||
                            actionInProgress === contact._id
                          }
                          className="mb-0 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ml-2"
                        />
                        {contact.picture || contact.info.picture?.image ? (
                          <img
                            src={contact.picture || contact.info.picture?.image}
                            alt="contact"
                            className="h-12 w-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-gray-300" />
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-900 flex items-center">
                            {contact.info.name?.first} {contact.info.name?.last}
                            <span
                              className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                                contact.source?.sourceType ===
                                'WIX_SITE_MEMBERS'
                                  ? 'bg-blue-100 text-blue-800'
                                  : contact.info?.extendedFields?.items &&
                                    contact.info.extendedFields.items[
                                      'members.membershipStatus'
                                    ] === 'APPROVED'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {contact.source?.sourceType === 'WIX_SITE_MEMBERS'
                                ? 'Member'
                                : contact.source?.sourceType || 'Contact'}
                            </span>
                          </p>
                          <p className="text-sm text-gray-500">
                            {contact.info.emails?.items?.[0]?.email ||
                              'No email'}
                          </p>

                          {contact.info.labelKeys?.items?.includes(
                            'custom.hasnoinfopage'
                          ) && (
                            <div className="flex items-center gap-1">
                              <p className="text-xs text-red-600">
                                No Info Page
                              </p>

                              {/* Show inconsistency pill if there's actually an info page */}
                              {hasLabelInconsistency(contact) && (
                                <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-800 font-medium animate-pulse">
                                  Incorrect Label
                                </span>
                              )}
                            </div>
                          )}

                          {contact.primaryEmail && (
                            <p className="text-xs text-gray-600">
                              Subscription:{' '}
                              {contact.primaryEmail.subscriptionStatus}
                            </p>
                          )}

                          {/* Info Page Link Button - with simplified condition */}
                          {getInfoPageUrl(contact) && (
                            <div className="mt-1">
                              <Link
                                href={getInfoPageUrl(contact)}
                                target="_blank"
                              >
                                <button
                                  className="px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded text-xs font-medium flex items-center"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3 w-3 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101"
                                    />
                                  </svg>
                                  View Info Page
                                </button>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        {contact.info.labelKeys?.items?.includes(
                          'custom.hasnoinfopage'
                        ) ? (
                          <button
                            onClick={() =>
                              handleLabelOperation(contact._id, 'removeLabel')
                            }
                            disabled={
                              isBulkActionInProgress ||
                              actionInProgress === contact._id ||
                              selectedContactIds.size > 0
                            }
                            className={`px-4 py-2 rounded-md text-sm font-medium text-white ${
                              isBulkActionInProgress ||
                              actionInProgress === contact._id ||
                              selectedContactIds.size > 0
                                ? 'bg-red-300 cursor-not-allowed'
                                : 'bg-red-600 hover:bg-red-700'
                            }`}
                          >
                            {actionInProgress === contact._id
                              ? 'Processing...'
                              : 'Remove Label'}
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleLabelOperation(contact._id, 'addLabel')
                            }
                            disabled={
                              isBulkActionInProgress ||
                              actionInProgress === contact._id ||
                              selectedContactIds.size > 0
                            }
                            className={`px-4 py-2 rounded-md text-sm font-medium text-white ${
                              isBulkActionInProgress ||
                              actionInProgress === contact._id ||
                              selectedContactIds.size > 0
                                ? 'bg-green-300 cursor-not-allowed'
                                : 'bg-green-600 hover:bg-green-700'
                            }`}
                          >
                            {actionInProgress === contact._id
                              ? 'Processing...'
                              : 'Add Label'}
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full overflow-hidden shadow-xl">
            <div className="px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900">
                Confirm Bulk Action
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {pendingBulkAction === 'addLabel'
                  ? `Add 'custom.hasnoinfopage' label to ${selectedContactIds.size} contacts?`
                  : `Remove 'custom.hasnoinfopage' label from ${selectedContactIds.size} contacts?`}
              </p>

              <div className="mt-3 bg-gray-50 p-3 rounded-md">
                <p className="text-xs text-gray-700 font-medium">
                  Operation details:
                </p>
                <ul className="mt-1 text-xs">
                  <li className="text-green-600">
                    {bulkStats.actionable} contacts will be updated
                  </li>
                  {bulkStats.skippable > 0 && (
                    <li className="text-amber-600">
                      {bulkStats.skippable} contacts will be skipped (already{' '}
                      {pendingBulkAction === 'addLabel' ? 'have' : "don't have"}{' '}
                      the label)
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="px-6 py-3 bg-gray-50 flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowConfirmDialog(false);
                  setPendingBulkAction(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={performBulkAction}
                className={`px-4 py-2 rounded-md text-sm font-medium text-white ${
                  pendingBulkAction === 'addLabel'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContactsPanel;
