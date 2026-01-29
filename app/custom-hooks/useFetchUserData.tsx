// useFetchUserData.ts
import { useEffect, useState } from "react";

const useFetchUserData = (
  isLoggedIn: boolean,
  userDetails: any,
  refresh: boolean,
  setIsLoadingInProgress: (value: boolean) => void,
) => {
  const [ownedPostPages, setOwnedPostPages] = useState<any[]>([]);
  const [ownedInfoPages, setOwnedInfoPages] = useState<any[]>([]);
  const [ownedPostPagesFetched, setOwnedPostPagesFetched] = useState(false);
  const [ownedInfoPagesFetched, setOwnedInfoPagesFetched] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchPages = async (
      apiEndpoint: string,
      ids: string[],
    ): Promise<any[]> => {
      try {
        // Fetch all pages from the cache
        const response = await fetch(apiEndpoint);

        if (!response.ok) {
          throw new Error(`Failed to fetch from ${apiEndpoint}`);
        }

        const allPages = await response.json();

        // Filter pages where _owner matches any of the user IDs
        const ownedPages = allPages.filter((page: any) => {
          const owner = page.data?._owner || page._owner;
          return owner && ids.includes(owner);
        });

        console.log(
          `Filtered owned pages from ${apiEndpoint}:`,
          ownedPages.length,
        );
        return ownedPages;
      } catch (error) {
        console.error(`Error fetching data from ${apiEndpoint}:`, error);
        return [];
      }
    };

    const fetchAllUserData = async () => {
      setIsLoadingInProgress(true);

      const idsToFetch = userDetails.accountId
        ? [userDetails.contactId, userDetails.accountId]
        : [userDetails.contactId];

      // console.log("debug1->idsToFetch", idsToFetch);

      try {
        // Fetch both post pages and info pages in parallel
        const [postPages, infoPages] = await Promise.all([
          fetchPages("/api/postPages", idsToFetch),
          fetchPages("/api/infoPages", idsToFetch),
        ]);

        setOwnedPostPages(postPages);
        setOwnedPostPagesFetched(true);

        setOwnedInfoPages(infoPages);
        setOwnedInfoPagesFetched(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Mark as fetched even on error to prevent infinite loading
        setOwnedPostPagesFetched(true);
        setOwnedInfoPagesFetched(true);
      } finally {
        setIsLoadingInProgress(false);
      }
    };

    fetchAllUserData();
  }, [isLoggedIn, userDetails, refresh, setIsLoadingInProgress]);

  return {
    ownedPostPages,
    ownedInfoPages,
    ownedPostPagesFetched,
    ownedInfoPagesFetched,
  };
};

export default useFetchUserData;
