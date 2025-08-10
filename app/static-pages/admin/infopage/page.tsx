'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
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

interface InfoPage {
  _id: string;
  title: string;
  data: {
    person?: { name: string }[];
    pageTypes?: { _id: string; name: string }[];
  };
}

interface PageType {
  _id: string;
  name: string;
}

type MessageType = 'success' | 'error' | 'info' | '';
type SortOption = 'all' | 'members' | 'contacts';

const PersonInfoLabeler = () => {
  const router = useRouter();
  const { isLoggedIn, userDetails, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('infopage');

  // Core state
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: MessageType;
  }>({ message: '', type: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState({ completed: 0, total: 0 });
  const [results, setResults] = useState<{
    successful: string[];
    failed: string[];
    skipped: string[];
    retried?: string[];
  }>({ successful: [], failed: [], skipped: [] });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [filterOnlyMembers, setFilterOnlyMembers] = useState(false);
  const [showResumeDialog, setShowResumeDialog] = useState(false);

  // New states for added features
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('all');
  const [stats, setStats] = useState({
    totalContacts: 0,
    totalMembers: 0,
    contactsWithInfoPages: 0,
    contactsWithoutInfoPages: 0,
    membersWithoutInfoPages: 0,
  });
  const [refreshing, setRefreshing] = useState(false);

  // Info pages and page types
  const [infoPages, setInfoPages] = useState<InfoPage[]>([]);
  const [pageTypes, setPageTypes] = useState<Map<string, PageType>>(new Map());

  // Pagination state
  const [page, setPage] = useState(1);
  const contactsPerPage = 100;

  //  {#f9e, 83}
  useEffect(() => {
    if (contacts.length > 0) {
      const sourceTypes = new Set();
      contacts.forEach((contact) => {
        if (contact.source?.sourceType) {
          sourceTypes.add(contact.source.sourceType);
        }
      });
      console.log('All source types:', Array.from(sourceTypes));

      // Count contacts by source type
      const countBySourceType = {};
      contacts.forEach((contact) => {
        const sourceType = contact.source?.sourceType || 'undefined';
        countBySourceType[sourceType] =
          (countBySourceType[sourceType] || 0) + 1;
      });
      console.log('Counts by source type:', countBySourceType);
    }
  }, [contacts]);

  // Add this function to your component
  const debugMemberDetails = () => {
    if (contacts.length === 0) return;

    // Filter to only WIX_SITE_MEMBERS
    const siteMembers = contacts.filter(
      (contact) => contact.source?.sourceType === 'WIX_SITE_MEMBERS'
    );

    console.log(`Total WIX_SITE_MEMBERS: ${siteMembers.length}`);

    // Look for any status fields
    const statusTypes = new Set();
    const roleTypes = new Set();
    const privacyStatusTypes = new Set();

    siteMembers.forEach((member) => {
      // Check for status fields
      if (member.info?.extendedFields?.items) {
        Object.entries(member.info.extendedFields.items).forEach(
          ([key, value]) => {
            if (key.toLowerCase().includes('status')) {
              statusTypes.add(`${key}: ${value}`);
            }
            if (key.toLowerCase().includes('role')) {
              roleTypes.add(`${key}: ${value}`);
            }
            if (key.toLowerCase().includes('privacy')) {
              privacyStatusTypes.add(`${key}: ${value}`);
            }
          }
        );
      }
    });

    console.log('Unique status fields:', Array.from(statusTypes));
    console.log('Unique role fields:', Array.from(roleTypes));
    console.log('Unique privacy fields:', Array.from(privacyStatusTypes));

    // Check first 5 members to see their structure
    console.log('Sample member objects (first 5):');
    siteMembers.slice(0, 5).forEach((member, index) => {
      console.log(`Member ${index + 1}:`, JSON.stringify(member, null, 2));
    });

    // Check if there are any extra properties on the source object
    const sourceProps = new Set();
    siteMembers.forEach((member) => {
      if (member.source) {
        Object.keys(member.source).forEach((key) => {
          sourceProps.add(key);
        });
      }
    });
    console.log('Properties on source object:', Array.from(sourceProps));
  };

  // Call this in a useEffect or add a debug button
  useEffect(() => {
    if (contacts.length > 0) {
      debugMemberDetails();
    }
  }, [contacts]);

  // Load saved process state
  useEffect(() => {
    if (authLoading) return;

    if (!isLoggedIn) {
      router.push('/login');
    } else if (!userDetails?.isAdmin) {
      router.push('/dashboard');
    } else {
      const savedState = localStorage.getItem('personInfoLabelerState');
      if (savedState) {
        const parsed = JSON.parse(savedState);
        if (parsed.isProcessing && parsed.progress.total > 0) {
          setProgress(parsed.progress);
          setResults(parsed.results);
          setShowResumeDialog(true);
        }
      }

      const controller = new AbortController();
      Promise.all([
        fetchContacts(controller.signal, false),
        fetchInfoPagesAndTypes(controller.signal),
      ]).catch((error) => {
        if (error.name !== 'AbortError') {
          notify('Error loading initial data', 'error');
        }
      });
      return () => controller.abort();
    }
  }, [isLoggedIn, userDetails?.isAdmin, authLoading, router]);

  // Save process state
  useEffect(() => {
    if (isProcessing || progress.total > 0) {
      localStorage.setItem(
        'personInfoLabelerState',
        JSON.stringify({
          isProcessing,
          progress,
          results,
          timestamp: Date.now(),
        })
      );
    }
  }, [isProcessing, progress, results]);

  // Update stats when contacts or info pages change
  useEffect(() => {
    if (contacts.length > 0 && infoPages.length > 0) {
      updateStats();
    }
  }, [contacts, infoPages]);

  // Helper functions
  const notify = (message: string, type: MessageType, timeout = 5000) => {
    setNotification({ message, type });
    if (timeout > 0)
      setTimeout(() => setNotification({ message: '', type: '' }), timeout);
  };

  // Data fetching
  const fetchContacts = async (signal: AbortSignal, shouldAppend = false) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/members?page=${page}&limit=${contactsPerPage}`,
        { signal }
      );
      const data = await response.json();
      if (data.success) {
        if (shouldAppend) {
          setContacts((prev) => [...prev, ...data.contacts]);
        } else {
          setContacts(data.contacts);
        }
      } else {
        throw new Error('Failed to fetch contacts');
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        notify('Error loading contacts', 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInfoPagesAndTypes = async (signal: AbortSignal) => {
    try {
      const infoPageResponse = await fetch('/api/infoPages', { signal });
      const infoPageData = await infoPageResponse.json();
      setInfoPages(infoPageData);

      const pageTypesItems = await getCollectionItems('Tags');
      const typesMap = new Map<string, PageType>();
      if (pageTypesItems && Array.isArray(pageTypesItems)) {
        pageTypesItems.forEach((item) => typesMap.set(item._id, item));
      }
      setPageTypes(typesMap);
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Error fetching info pages or page types:', error);
        notify('Error loading info pages or page types', 'error');
      }
    }
  };

  // New refresh function
  const refreshData = async () => {
    setRefreshing(true);
    setContacts([]);
    setInfoPages([]);
    setPage(1);

    try {
      const controller = new AbortController();
      await Promise.all([
        fetchContacts(controller.signal, false),
        fetchInfoPagesAndTypes(controller.signal),
      ]);
      notify('Data refreshed successfully', 'success');
    } catch (error: any) {
      notify('Error refreshing data', 'error');
    } finally {
      setRefreshing(false);
    }
  };

  // New function to update stats
  const updateStats = () => {
    const totalContacts = contacts.length;
    const totalMembers = contacts.filter(
      (contact) => contact.source?.sourceType === 'WIX_SITE_MEMBERS'
    ).length;

    const contactsWithInfoPage = contacts.filter((contact) => {
      const contactFirstName = (contact.info.name?.first || '')
        .toLowerCase()
        .trim();
      const contactLastName = (contact.info.name?.last || '')
        .toLowerCase()
        .trim();
      const contactFullName = `${contactFirstName} ${contactLastName}`.trim();
      if (!contactFullName) return false;

      return infoPages.some((page) => {
        const pageTitle = (page.title || '').toLowerCase().trim();
        const titleMatches = pageTitle === contactFullName;

        const hasPersonInfoType = page.data?.pageTypes?.some(
          (pageType) =>
            pageType.name?.toLowerCase() === 'person info' ||
            pageType._id === 'ff988067-2fee-41f2-9b33-7eb14d282b17'
        );

        if (!hasPersonInfoType) return false;

        if (titleMatches) {
          return (
            page.data?.person &&
            Array.isArray(page.data.person) &&
            page.data.person.length > 0
          );
        }

        if (page.data?.person && Array.isArray(page.data.person)) {
          return page.data.person.some(
            (personTag) => personTag.name?.toLowerCase() === contactFullName
          );
        }

        return false;
      });
    }).length;

    const contactsWithoutInfoPage = totalContacts - contactsWithInfoPage;
    const membersWithoutInfoPages = contacts.filter((contact) => {
      if (contact.source?.sourceType !== 'WIX_SITE_MEMBERS') return false;

      const hasLabel = contact.info.labelKeys?.items?.includes(
        'custom.hasnoinfopage'
      );
      if (hasLabel) return false;

      const contactFirstName = (contact.info.name?.first || '')
        .toLowerCase()
        .trim();
      const contactLastName = (contact.info.name?.last || '')
        .toLowerCase()
        .trim();
      const contactFullName = `${contactFirstName} ${contactLastName}`.trim();
      if (!contactFullName) return false;

      const hasPersonInfoPage = infoPages.some((page) => {
        const pageTitle = (page.title || '').toLowerCase().trim();
        const titleMatches = pageTitle === contactFullName;

        const hasPersonInfoType = page.data?.pageTypes?.some(
          (pageType) =>
            pageType.name?.toLowerCase() === 'person info' ||
            pageType._id === 'ff988067-2fee-41f2-9b33-7eb14d282b17'
        );

        if (!hasPersonInfoType) return false;

        if (titleMatches) {
          return (
            page.data?.person &&
            Array.isArray(page.data.person) &&
            page.data.person.length > 0
          );
        }

        if (page.data?.person && Array.isArray(page.data.person)) {
          return page.data.person.some(
            (personTag) => personTag.name?.toLowerCase() === contactFullName
          );
        }

        return false;
      });

      return !hasPersonInfoPage;
    }).length;

    setStats({
      totalContacts,
      totalMembers,
      contactsWithInfoPages: contactsWithInfoPage,
      contactsWithoutInfoPages: contactsWithoutInfoPage,
      membersWithoutInfoPages,
    });
  };

  // Calculate contacts to be labeled
  const contactsToLabel = useMemo(() => {
    if (infoPages.length === 0) return [];

    return contacts
      .filter((contact) => {
        if (
          filterOnlyMembers &&
          contact.source?.sourceType !== 'WIX_SITE_MEMBERS'
        )
          return false;

        const hasLabel = contact.info.labelKeys?.items?.includes(
          'custom.hasnoinfopage'
        );
        if (hasLabel) return false;

        const contactFirstName = (contact.info.name?.first || '')
          .toLowerCase()
          .trim();
        const contactLastName = (contact.info.name?.last || '')
          .toLowerCase()
          .trim();
        const contactFullName = `${contactFirstName} ${contactLastName}`.trim();
        if (!contactFullName) return false;

        // Apply search filter
        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase().trim();
          if (
            !contactFullName.includes(searchLower) &&
            !contact.primaryEmail?.email?.toLowerCase().includes(searchLower)
          ) {
            return false;
          }
        }

        // Apply sort filter
        if (
          sortOption === 'members' &&
          contact.source?.sourceType !== 'WIX_SITE_MEMBERS'
        ) {
          return false;
        } else if (
          sortOption === 'contacts' &&
          contact.source?.sourceType === 'WIX_SITE_MEMBERS'
        ) {
          return false;
        }

        const hasPersonInfoPage = infoPages.some((page) => {
          const pageTitle = (page.title || '').toLowerCase().trim();
          const titleMatches = pageTitle === contactFullName;

          const hasPersonInfoType = page.data?.pageTypes?.some(
            (pageType) =>
              pageType.name?.toLowerCase() === 'person info' ||
              pageType._id === 'ff988067-2fee-41f2-9b33-7eb14d282b17'
          );

          if (!hasPersonInfoType) return false;

          if (titleMatches) {
            return (
              page.data?.person &&
              Array.isArray(page.data.person) &&
              page.data.person.length > 0
            );
          }

          if (page.data?.person && Array.isArray(page.data.person)) {
            return page.data.person.some(
              (personTag) => personTag.name?.toLowerCase() === contactFullName
            );
          }

          return false;
        });

        return !hasPersonInfoPage;
      })
      .map((contact) => ({
        _id: contact._id,
        name: `${contact.info.name?.first || ''} ${
          contact.info.name?.last || ''
        }`.trim(),
      }));
  }, [contacts, infoPages, filterOnlyMembers, searchTerm, sortOption]);

  // Process contacts to add labels
  const initiateLabelingProcess = (resume = false) => {
    if (contactsToLabel.length === 0) {
      notify('No contacts eligible for labeling', 'error');
      return;
    }
    if (!resume) {
      setShowConfirmDialog(true);
    } else {
      startLabelingProcess(true);
    }
  };

  const startLabelingProcess = async (resume = false) => {
    setShowConfirmDialog(false);
    setShowResumeDialog(false);
    setIsProcessing(true);

    let initialResults = results;
    let initialProgress = progress;
    if (!resume) {
      initialResults = { successful: [], failed: [], skipped: [], retried: [] };
      initialProgress = { completed: 0, total: contactsToLabel.length };
      setResults(initialResults);
      setProgress(initialProgress);
    }

    const batchSize = 10; // Increased from 3 to 10; adjust as needed (e.g., 20 for faster processing)
    const delayBetweenBatches = 2000;

    const queue: Contact[] = contacts.filter((c) =>
      contactsToLabel.some(
        (ct) =>
          ct._id === c._id &&
          !results.successful.includes(c._id) &&
          !results.failed.includes(c._id)
      )
    );

    while (queue.length > 0) {
      const batch = queue.splice(0, batchSize);
      await Promise.all(
        batch.map((contact) =>
          processContact(contact).catch((error) => {
            console.error(`Error processing contact ${contact._id}:`, error);
            initialResults.failed.push(contact._id);
            return {
              success: false,
              contactId: contact._id,
              error: error.message,
            };
          })
        )
      );

      setProgress((prev) => ({
        completed: prev.completed + batch.length,
        total: contactsToLabel.length,
      }));

      if (queue.length > 0) {
        await new Promise((resolve) =>
          setTimeout(resolve, delayBetweenBatches)
        );
      }
    }

    // Update results
    setResults((prev) => ({ ...prev }));

    // Update local contacts state
    setContacts((prevContacts) =>
      prevContacts.map((contact) => {
        if (initialResults.successful.includes(contact._id)) {
          const currentLabels = contact.info.labelKeys?.items || [];
          return {
            ...contact,
            info: {
              ...contact.info,
              labelKeys: { items: [...currentLabels, 'custom.hasnoinfopage'] },
            },
          };
        }
        return contact;
      })
    );

    // Build status message
    let statusMessage = `Label added to ${initialResults.successful.length} contacts.`;
    if (initialResults.failed.length > 0)
      statusMessage += ` Failed for ${initialResults.failed.length} contacts.`;
    if (initialResults.skipped.length > 0)
      statusMessage += ` Skipped ${initialResults.skipped.length} contacts (already labeled or have Person Info page).`;
    if (initialResults?.retried?.length > 0)
      statusMessage += ` ${initialResults?.retried?.length} operations required retries.`;

    notify(
      statusMessage.trim(),
      initialResults.failed.length > 0 ? 'error' : 'success',
      15000
    );
    setIsProcessing(false);
    localStorage.removeItem('personInfoLabelerState');
  };

  const processContact = async (
    contact: Contact,
    retryCount = 0
  ): Promise<{
    success: boolean;
    skipped?: boolean;
    contactId: string;
    error?: string;
    retried?: boolean;
  }> => {
    const contactId = contact._id;
    try {
      // Check if contact already has the label
      const hasLabel = contact.info.labelKeys?.items?.includes(
        'custom.hasnoinfopage'
      );
      if (hasLabel) {
        results.skipped.push(contactId);
        return { success: false, skipped: true, contactId };
      }

      // Fetch contact to get revision
      const contactResponse = await fetch(
        `/api/members/contact?id=${contactId}`
      );
      if (!contactResponse.ok) {
        throw new Error('Failed to fetch contact details');
      }
      const contactData = await contactResponse.json();
      const revision = contactData.contact.revision;

      // Add label
      const response = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contactId, action: 'addLabel', revision }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        results.successful.push(contactId);
        return { success: true, contactId };
      } else if (retryCount < 3) {
        // Enhanced error recovery - increase max retries to 3
        // Exponential backoff for retries
        const backoffDelay = 1000 * Math.pow(2, retryCount);
        await new Promise((resolve) => setTimeout(resolve, backoffDelay));
        results.retried = results.retried || [];
        results.retried.push(contactId);
        notify(
          `Retrying contact ${contactId} (attempt ${retryCount + 1})`,
          'info',
          2000
        );
        return processContact(contact, retryCount + 1);
      } else {
        results.failed.push(contactId);
        return {
          success: false,
          contactId,
          error: data.message,
          retried: retryCount > 0,
        };
      }
    } catch (error: any) {
      if (retryCount < 3) {
        // Enhanced error recovery
        // Exponential backoff for retries
        const backoffDelay = 1000 * Math.pow(2, retryCount);
        await new Promise((resolve) => setTimeout(resolve, backoffDelay));
        results.retried = results.retried || [];
        results.retried.push(contactId);
        notify(
          `Retrying contact ${contactId} (attempt ${retryCount + 1})`,
          'info',
          2000
        );
        return processContact(contact, retryCount + 1);
      }
      results.failed.push(contactId);
      return {
        success: false,
        contactId,
        error: error.message,
        retried: retryCount > 0,
      };
    }
  };

  const getInfoPageUrl = useCallback(
    (contact) => {
      if (!contact?.info?.name || !infoPages?.length) return null;

      const firstName = (contact.info.name?.first || '').toLowerCase().trim();
      const lastName = (contact.info.name?.last || '').toLowerCase().trim();
      const fullName = `${firstName} ${lastName}`.trim();

      if (!fullName) return null;

      // Find by matching person field
      const match = infoPages.find((page) => {
        // Skip if no person data
        if (!page.data?.person || !Array.isArray(page.data.person))
          return false;

        // Look for a match in the person array
        return page.data.person.some((person) => {
          if (!person?.name) return false;

          const personName = person.name.toLowerCase().trim();
          return personName === fullName;
        });
      });

      // Check if we found a matching page and it has a slug
      if (match) {
        // Check for slug in different possible locations
        const slug = match.slug || match.data?.slug;

        if (slug) {
          return `/person/${slug}`;
        }

        // Fallback to ID-based URL if no slug is available
        return `/person-info/${match._id}`;
      }

      return null;
    },
    [infoPages]
  );

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isLoggedIn || !userDetails?.isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header - Atlassian-inspired */}
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
                        ? 'border-blue-500 text-blue-600'
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

          {/* Dashboard Stats - Feature #8 */}
          <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Dashboard Statistics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-md p-3">
                <p className="text-sm text-blue-800 font-medium">
                  Total Contacts
                </p>
                <p className="text-2xl text-blue-900 font-bold">
                  {stats.totalContacts}
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  Members: {stats.totalMembers}
                </p>
              </div>
              <div className="bg-green-50 rounded-md p-3">
                <p className="text-sm text-green-800 font-medium">
                  Contacts with Info Pages
                </p>
                <p className="text-2xl text-green-900 font-bold">
                  {stats.contactsWithInfoPages}
                </p>
                <p className="text-xs text-green-700 mt-1">
                  {(
                    (stats.contactsWithInfoPages / stats.totalContacts) * 100 ||
                    0
                  ).toFixed(1)}
                  % of all contacts
                </p>
              </div>
              <div className="bg-orange-50 rounded-md p-3">
                <p className="text-sm text-orange-800 font-medium">
                  Contacts without Info Pages
                </p>
                <p className="text-2xl text-orange-900 font-bold">
                  {stats.contactsWithoutInfoPages}
                </p>
                <p className="text-xs text-orange-700 mt-1">
                  Members: {stats.membersWithoutInfoPages} (
                  {(
                    (stats.membersWithoutInfoPages / stats.totalMembers) *
                      100 || 0
                  ).toFixed(1)}
                  % of members)
                </p>
              </div>
            </div>
          </div>

          {/* Controls Section with Filter, Search and Refresh */}
          <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Feature #1: Refresh Button */}
              <button
                onClick={refreshData}
                disabled={isProcessing || refreshing}
                className={`${
                  isProcessing || refreshing
                    ? 'bg-blue-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } px-3 py-2 rounded-md text-sm font-medium text-white flex items-center`}
              >
                {refreshing ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Refreshing...
                  </>
                ) : (
                  <>
                    <svg
                      className="-ml-1 mr-2 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Refresh Data
                  </>
                )}
              </button>

              {/* Feature #3: Simple Search */}
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name or email"
                  className="relative w-full mb-0 md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                  disabled={isProcessing}
                />
                <div className="absolute max-h-[33px] -top-0 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Feature #6: Sort Dropdown (Member/Contact) */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">
                  Show:
                </label>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                  disabled={isProcessing}
                >
                  <option value="all">
                    All Contacts ({contactsToLabel.length})
                  </option>
                  <option value="members">
                    Members Only (
                    {
                      contactsToLabel.filter(
                        (ct) =>
                          contacts.find((c) => c._id === ct._id)?.source
                            ?.sourceType === 'WIX_SITE_MEMBERS'
                      ).length
                    }
                    )
                  </option>
                  <option value="contacts">
                    Non-Members Only (
                    {
                      contactsToLabel.filter(
                        (ct) =>
                          contacts.find((c) => c._id === ct._id)?.source
                            ?.sourceType !== 'WIX_SITE_MEMBERS'
                      ).length
                    }
                    )
                  </option>
                </select>
              </div>

              {/* Filter Toggle */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filterOnlyMembers}
                  onChange={() => setFilterOnlyMembers((prev) => !prev)}
                  className="mb-0 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  disabled={isProcessing}
                />
                <span className="text-sm font-medium text-gray-700">
                  Process only members
                </span>
              </div>
            </div>
          </div>

          {/* Preview of Contacts to Label */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6 p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Contacts to be Labeled ({contactsToLabel.length})
            </h3>
            {/* Replace the current contact list rendering with this enhanced version */}
            {contactsToLabel.length > 0 ? (
              <ul className="divide-y divide-gray-200 max-h-64 overflow-y-auto">
                {contactsToLabel.slice(0, 50).map((contact) => {
                  // Get the full contact data
                  const fullContact = contacts.find(
                    (c) => c._id === contact._id
                  );
                  const isMember =
                    fullContact?.source?.sourceType === 'WIX_SITE_MEMBERS';
                  const sourceType =
                    fullContact?.source?.sourceType || 'Unknown';

                  // Get subscription and membership status
                  const subscriptionStatus =
                    fullContact?.primaryEmail?.subscriptionStatus ||
                    fullContact?.info?.extendedFields?.items?.[
                      'emailSubscriptions.subscriptionStatus'
                    ] ||
                    'NOT_SET';
                  const deliverabilityStatus =
                    fullContact?.primaryEmail?.deliverabilityStatus ||
                    fullContact?.info?.extendedFields?.items?.[
                      'emailSubscriptions.deliverabilityStatus'
                    ] ||
                    'NOT_SET';
                  const membershipStatus =
                    fullContact?.info?.extendedFields?.items?.[
                      'members.membershipStatus'
                    ] || 'N/A';

                  // Get profile picture
                  const profilePicture =
                    fullContact?.picture ||
                    fullContact?.info?.picture?.image ||
                    null;

                  // Check for matching info page by name
                  const contactName = contact.name.toLowerCase().trim();
                  const hasInfoPage = !!getInfoPageUrl(fullContact);
                  const matchingInfoPage = infoPages.find((page) => {
                    const pageTitle = (page.title || '').toLowerCase().trim();
                    return (
                      pageTitle === contactName ||
                      (page.data?.person &&
                        Array.isArray(page.data.person) &&
                        page.data.person.some(
                          (p) =>
                            (p.name || '').toLowerCase().trim() === contactName
                        ))
                    );
                  });

                  return (
                    <li
                      key={contact._id}
                      className="py-3 flex items-start justify-between hover:bg-gray-50"
                    >
                      <div className="flex items-start space-x-3">
                        {/* Profile Picture */}
                        {profilePicture ? (
                          <img
                            src={profilePicture}
                            alt={contact.name || 'Profile'}
                            className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center">
                            <svg
                              className="h-6 w-6 text-gray-500"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          </div>
                        )}

                        <div>
                          {/* Contact Name and Type */}
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-gray-800">
                              {contact.name || 'Unnamed Contact'}
                            </p>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs ${
                                sourceType === 'WIX_SITE_MEMBERS'
                                  ? 'bg-blue-100 text-blue-800'
                                  : sourceType === 'WIX_FORMS'
                                  ? 'bg-green-100 text-green-800'
                                  : sourceType === 'WIX_EVENTS'
                                  ? 'bg-purple-100 text-purple-800'
                                  : sourceType === 'WIX_CHAT'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : sourceType === 'WIX_EMAIL_MARKETING'
                                  ? 'bg-pink-100 text-pink-800'
                                  : sourceType === 'IMPORT'
                                  ? 'bg-indigo-100 text-indigo-800'
                                  : sourceType === 'THIRD_PARTY'
                                  ? 'bg-orange-100 text-orange-800'
                                  : sourceType === 'ADMIN'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {sourceType}
                            </span>
                          </div>

                          {/* Email address if available */}
                          {fullContact?.primaryEmail?.email && (
                            <p className="text-xs text-gray-500 mt-1">
                              {fullContact.primaryEmail.email}
                            </p>
                          )}

                          {/* Status Information */}
                          <div className="flex flex-wrap gap-1 mt-1">
                            {isMember && (
                              <span
                                className={`px-2 py-0.5 rounded-full text-xs ${
                                  membershipStatus === 'APPROVED'
                                    ? 'bg-green-50 text-green-700 border border-green-200'
                                    : membershipStatus === 'OFFLINE_ONLY'
                                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                    : 'bg-gray-50 text-gray-700 border border-gray-200'
                                }`}
                              >
                                {membershipStatus}
                              </span>
                            )}

                            <span
                              className={`px-2 py-0.5 rounded-full text-xs ${
                                subscriptionStatus === 'SUBSCRIBED'
                                  ? 'bg-green-50 text-green-700 border border-green-200'
                                  : subscriptionStatus === 'UNSUBSCRIBED'
                                  ? 'bg-red-50 text-red-700 border border-red-200'
                                  : subscriptionStatus === 'PENDING'
                                  ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                                  : 'bg-gray-50 text-gray-700 border border-gray-200'
                              }`}
                            >
                              {subscriptionStatus}
                            </span>

                            {deliverabilityStatus !== 'NOT_SET' && (
                              <span
                                className={`px-2 py-0.5 rounded-full text-xs ${
                                  deliverabilityStatus === 'VALID'
                                    ? 'bg-green-50 text-green-700 border border-green-200'
                                    : deliverabilityStatus === 'BOUNCED'
                                    ? 'bg-red-50 text-red-700 border border-red-200'
                                    : deliverabilityStatus === 'INACTIVE'
                                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                    : 'bg-gray-50 text-gray-700 border border-gray-200'
                                }`}
                              >
                                {deliverabilityStatus}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {hasInfoPage ? (
                          <a
                            href={getInfoPageUrl(fullContact)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
                            title="View person info page"
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
                                strokeWidth="2"
                                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101"
                              />
                            </svg>
                            Info Page
                          </a>
                        ) : (
                          <span
                            className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md text-gray-700 bg-gray-100"
                            title="No info page available"
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
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                            No Info Page
                          </span>
                        )}

                        <a
                          href={`/dashboard/contacts/${contact._id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                          title="View contact details"
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
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          Contact
                        </a>
                      </div>
                    </li>
                  );
                })}
                {contactsToLabel.length > 50 && (
                  <li className="py-2 text-sm text-gray-500 text-center">
                    ...and {contactsToLabel.length - 50} more
                  </li>
                )}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">
                No contacts eligible for labeling based on current filters.
              </p>
            )}
          </div>

          {/* Action Button */}
          <div className="mb-6">
            <button
              onClick={() => initiateLabelingProcess()}
              disabled={
                isProcessing || isLoading || contactsToLabel.length === 0
              }
              className={`px-6 py-3 rounded-md text-sm font-medium text-white ${
                isProcessing || isLoading || contactsToLabel.length === 0
                  ? 'bg-green-300 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isProcessing ? 'Processing...' : 'Start Labeling Process'}
            </button>
          </div>

          {/* Progress Indicator */}
          {isProcessing && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
              <h3 className="text-sm font-medium text-blue-800 mb-2">
                Processing contacts...
              </h3>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{
                    width: `${(progress.completed / progress.total) * 100}%`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-blue-800">
                {progress.completed} of {progress.total} contacts processed
              </p>
            </div>
          )}

          {/* Results Summary */}
          {(results.successful.length > 0 ||
            results.failed.length > 0 ||
            results.skipped.length > 0) && (
            <div className="bg-white shadow-sm rounded-lg overflow-hidden p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Processing Results
              </h3>
              <ul className="text-sm text-gray-600">
                <li>
                  Successful: {results.successful.length} contacts labeled
                </li>
                <li>Failed: {results.failed.length} contacts</li>
                <li>
                  Skipped: {results.skipped.length} contacts (already labeled or
                  have Person Info page)
                </li>
                {results.retried && results.retried.length > 0 && (
                  <li>
                    Retried: {results.retried.length} contacts (successfully
                    recovered)
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </main>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full overflow-hidden shadow-xl">
            <div className="px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900">
                Confirm Labeling Process
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Add &apos;custom.hasnoinfopage&apos; label to{' '}
                {contactsToLabel.length} contacts?
              </p>
              <div className="mt-3 bg-gray-50 p-3 rounded-md">
                <p className="text-xs text-gray-700 font-medium">
                  Operation details:
                </p>
                <ul className="mt-1 text-xs">
                  <li className="text-green-600">
                    {contactsToLabel.length} contacts will be updated
                  </li>
                </ul>
              </div>
            </div>
            <div className="px-6 py-3 bg-gray-50 flex justify-end space-x-2">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => startLabelingProcess()}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-sm font-medium text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resume Dialog */}
      {showResumeDialog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full overflow-hidden shadow-xl">
            <div className="px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900">
                Resume Previous Process?
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                A previous labeling process was interrupted (
                {progress.completed} of {progress.total} contacts processed).
                Would you like to resume or start a new process?
              </p>
            </div>
            <div className="px-6 py-3 bg-gray-50 flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowResumeDialog(false);
                  localStorage.removeItem('personInfoLabelerState');
                  setProgress({ completed: 0, total: 0 });
                  setResults({ successful: [], failed: [], skipped: [] });
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Start New
              </button>
              <button
                onClick={() => initiateLabelingProcess(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium text-white"
              >
                Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonInfoLabeler;
