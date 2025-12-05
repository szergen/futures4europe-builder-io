import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getContactsItem } from "@app/wixUtils/client-side";
import { IOAuthStrategy, useWixAuth, useWixModules } from "@wix/sdk-react";
import { members } from "@wix/members";
import useFetchUserData from "@app/custom-hooks/useFetchUserData";
import fetchTagsWithPopularity from "../useFetchTags";
import { TagProps } from "@app/shared-components/Tag/Tag";
import useFetchPostPages from "../useFetchPostPages";
import useFetchInfoPages from "../useFetchInfoPages";
import { refetchTags } from "@app/utils/refetch-utils";
import { invalidateAllCache } from "@app/utils/cache-utils";
import useFetchAffiliations from "../useFetchAffiliations";

interface AuthContextType {
  isLoggedIn: boolean;
  loading: boolean;
  login: () => void;
  logout: () => void;
  userDetails: {
    contactId: string;
    accountId: string;
    isAdmin: boolean;
    userName: string;
    slug: string;
    email: string;
    createdDate: string;
    updatedDate: string;
    privacyStatus: string;
    accountStatus: string;
    activityStatus: string;
    lastLoginDate: string;
    avatarUrl: string; // TODO need to pass src avatar
    userTag: TagProps;
  };
  updateUserDetails: (details: any) => void;
  ownedPostPagesFetched: boolean;
  ownedInfoPagesFetched: boolean;
  ownedPostPages: any[];
  ownedInfoPages: any[];
  handleUserDataRefresh: () => void;
  tags: Array<TagProps>;
  tagsFetched: boolean;
  handleTagCreated: () => void;
  appendTag: (tag: TagProps) => void;
  updateTag: (tag: TagProps) => void;
  postPages: any[];
  postPagesFetched: boolean;
  handlePostPageCreated: () => void;
  infoPages: any[];
  infoPagesFetched: boolean;
  affiliations: any[];
  affiliationsFetched: boolean;
  handleAffiliationCreated: () => void;
  appendAffiliations: (newAffiliations: any[]) => void;
  removeAffiliations: (affiliationIds: string[]) => void;
  handleInfoPageCreated: () => void;
  isLoadingInProgress: boolean;
  setIsLoadingInProgress: (value: boolean) => void;
  userTagFetched: boolean;
  allOwnedPages: any[];
  setIsUserTagAssociated: (value: boolean) => void;
  handleUserTagRefresh: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState = {
  contactId: "",
  accountId: "",
  isAdmin: false,
  userName: "",
  slug: "",
  email: "",
  createdDate: "",
  updatedDate: "",
  privacyStatus: "",
  accountStatus: "",
  activityStatus: "",
  lastLoginDate: "",
  avatarUrl: "",
  userTag: {} as TagProps,
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(initialState);
  const [isLoadingInProgress, setIsLoadingInProgress] = useState(false);
  const [isUserTagAssociated, setIsUserTagAssociated] = useState(false);

  const { setTokens: wixSetTokens, loggedIn: wixLoggedIn } =
    useWixAuth() as unknown as IOAuthStrategy;
  const { getCurrentMember: wixGetCurrentMember } = useWixModules(members);

  const updateUserDetails = (details: any) => {
    setUserDetails(details);
  };

  // #region Fetch post pages
  const [refreshPostPages, setRefreshPostPages] = useState(false);
  const { postPages, postPagesFetched } = useFetchPostPages(
    refreshPostPages
    // setIsLoadingInProgress
  );

  const handlePostPageCreated = () => {
    setRefreshPostPages((prev) => !prev); // Toggle the refresh state to trigger re-fetch
  };

  // #endregion

  // #region Fetch info pages
  const [refreshInfoPages, setRefreshInfoPages] = useState(false);
  const { infoPages, infoPagesFetched } = useFetchInfoPages(
    refreshInfoPages
    // setIsLoadingInProgress
  );
  // console.log('debug1->infoPages', infoPages);

  const handleInfoPageCreated = () => {
    setRefreshInfoPages((prev) => !prev); // Toggle the refresh state to trigger re-fetch
  };
  // #endregion

  // #region Fetch affiliations
  const [refreshAffiliations, setRefreshAffiliations] = useState(false);
  const {
    affiliations: fetchedAffiliations,
    affiliationsFetched: fetchedAffiliationsFetched,
  } = useFetchAffiliations(
    refreshAffiliations
    // setIsLoadingInProgress
  );

  // Store affiliations in local state so we can update it without full refetch
  const [affiliations, setAffiliations] = useState<any[]>([]);
  const [affiliationsFetched, setAffiliationsFetched] = useState(false);

  // Sync fetched affiliations to local state when fetch completes
  useEffect(() => {
    if (fetchedAffiliationsFetched && fetchedAffiliations) {
      console.log(
        `[AuthContext] Syncing ${fetchedAffiliations.length} affiliations to state`
      );
      setAffiliations(fetchedAffiliations);
      setAffiliationsFetched(true);
    }
  }, [fetchedAffiliations, fetchedAffiliationsFetched]);

  const handleAffiliationCreated = () => {
    setRefreshAffiliations((prev) => !prev); // Toggle the refresh state to trigger re-fetch
  };

  // OPTIMIZATION: Append new affiliations to state without full refresh
  const appendAffiliations = (newAffiliations: any[]) => {
    if (!newAffiliations || newAffiliations.length === 0) return;
    setAffiliations((prev) => {
      // Filter out duplicates based on _id
      const existingIds = new Set(prev.map((a) => a._id));
      const uniqueNew = newAffiliations.filter((a) => !existingIds.has(a._id));
      if (uniqueNew.length === 0) {
        console.log("All affiliations already exist in state, skipping append");
        return prev;
      }
      console.log(
        `✓ ${uniqueNew.length} affiliations appended to AuthContext state`
      );
      return [...prev, ...uniqueNew];
    });
  };

  // OPTIMIZATION: Remove affiliations from state without full refresh
  const removeAffiliations = (affiliationIds: string[]) => {
    if (!affiliationIds || affiliationIds.length === 0) return;
    setAffiliations((prev) => {
      const idsToRemove = new Set(affiliationIds);
      const filtered = prev.filter((a) => !idsToRemove.has(a._id));
      const removedCount = prev.length - filtered.length;
      if (removedCount > 0) {
        console.log(
          `✓ ${removedCount} affiliations removed from AuthContext state`
        );
      }
      return filtered;
    });
  };
  // #endregion

  // #region Fetch tags and refresh based on tag creation
  const [tags, setTags] = useState([] as any[]);

  const [refreshTags, setRefreshTags] = useState(false);
  const [tagsFetched, setTagsFetched] = useState(false);
  const [userTagFetched, setUserTagFetched] = useState(false);

  // Debugging tags
  // useEffect(() => {
  //   // When tags are fetched
  //   console.log('Tags fetched:', tags);
  //   console.log('Total tags count:', tags?.length);

  //   // Log unique tag types
  //   const uniqueTagTypes = [...new Set(tags?.map(tag => tag.tagType))];
  //   console.log('Unique tag types:', uniqueTagTypes);

  //   // Log project tags specifically
  //   const projectTags = tags?.filter(tag => tag.tagType === 'project');
  //   console.log('Project tags:', projectTags);
  //   console.log('Project tags count:', projectTags?.length);
  // }, [tags]);

  useEffect(() => {
    setIsLoadingInProgress(true);
    const fetchTags = async () => {
      if (refreshTags) {
        setTagsFetched(false);
        // OPTIMIZATION: Don't invalidate all cache - createBuilderTag already appends to Redis cache
        // and appendTag already appends to React state. The refetch here will just read from
        // the already-updated Redis cache, not wipe everything.
        // await invalidateAllCache(); // REMOVED - caused full cache wipe on new tag creation
      }
      fetchTagsWithPopularity().then((allTags) => {
        setTags(allTags);
        setTagsFetched(true);
        setIsLoadingInProgress(false);
        if (refreshTags) {
          setRefreshTags(false); // Reset the refresh flag after successful fetch
        }
      });
    };
    fetchTags();
  }, [refreshTags]);

  const handleTagCreated = () => {
    setRefreshTags(true); // Simply set to true instead of toggling
  };

  // OPTIMIZATION: Append a single tag to state without full refresh
  const appendTag = (tag: TagProps) => {
    if (!tag) return;
    setTags((prevTags) => {
      // Check if tag already exists to avoid duplicates
      const exists = prevTags.some(
        (t) => t._id === tag._id || t.name === tag.name
      );
      if (exists) {
        console.log(
          `Tag "${tag.name}" already exists in state, skipping append`
        );
        return prevTags;
      }
      console.log(`✓ Tag "${tag.name}" appended to AuthContext state`);
      return [...prevTags, { ...tag, mentions: 0 }];
    });
  };

  // OPTIMIZATION: Update a single tag in state without full refresh
  const updateTag = (tag: TagProps) => {
    if (!tag || !tag._id) return;
    setTags((prevTags) => {
      const index = prevTags.findIndex((t) => t._id === tag._id);
      if (index === -1) {
        console.log(`Tag "${tag.name}" not found in state, skipping update`);
        return prevTags;
      }
      const updatedTags = [...prevTags];
      // Preserve mentions count when updating
      updatedTags[index] = { ...tag, mentions: prevTags[index].mentions };
      console.log(`✓ Tag "${tag.name}" updated in AuthContext state`);
      return updatedTags;
    });
  };

  const uploadTag = async (tagName: string) => {
    try {
      const response = await fetch("/api/builder/tag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: tagName,
          tagType: "person",
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create person tag");
      }

      const result = await response.json();
      console.log("✓ Person tag created in Builder.io:", result.tag.id);
      return { dataItem: { data: result.tag } }; // Match Wix return format
    } catch (error) {
      console.error("Error uploading person tag to Builder.io:", error);
      throw error;
    }
  };

  const getUserTag = async (userName: string) => {
    const userTag = tags?.find((tag) => tag.name === userName);
    if (!userTag) {
      // console.log('User tag not found for', userName);
      const tagResult = await uploadTag(userName);
      const newTag = await tagResult?.dataItem?.data;
      // console.log('deb123->newTag', newTag);
      // await refetchTags();
      handleTagCreated();
      return newTag;
    }
    return userTag;
  };

  const [refreshUserTag, setRefreshUserTag] = useState(false);

  const handleUserTagRefresh = () => {
    setRefreshUserTag((prev) => !prev); // Toggle the refresh state to trigger re-fetch
  };

  useEffect(() => {
    // If the user is not associated with a tag, fetch the user tag
    if (
      tagsFetched &&
      tags.length > 0 &&
      userDetails.userName &&
      isUserTagAssociated === false
    ) {
      const fetchUserTag = async () => {
        const userTag = await getUserTag(userDetails.userName);
        updateUserDetails((prev: any) => ({
          ...prev,
          userTag,
        }));
      };

      fetchUserTag();
      setIsUserTagAssociated(true);
      setUserTagFetched(true);
    } else if (
      // If the user is associated with a tag, fetch the user tag to capture the link
      tagsFetched &&
      userDetails.userTag &&
      userDetails.userName &&
      !userDetails.userTag?.tagPageLink
    ) {
      const userTag = tags?.find((tag) => tag.name === userDetails.userName);
      updateUserDetails((prev: any) => ({
        ...prev,
        userTag,
      }));
      setIsUserTagAssociated(true);
      setUserTagFetched(true);
    }
  }, [
    tagsFetched,
    userDetails.userName,
    userDetails.userTag?.name,
    userDetails.userTag?.tagPageLink,
    refreshUserTag,
    refreshTags,
  ]);
  // #endregion

  useEffect(() => {
    const checkAuth = async () => {
      const sessionToken = localStorage.getItem("f4e_wix_sessionToken");
      const accessTokenAndRefreshToken = localStorage.getItem(
        "f4e_wix_accessTokenAndRefreshToken"
      );
      if (sessionToken && accessTokenAndRefreshToken) {
        // console.log('Auth token found. Logging in...');
        await wixSetTokens(JSON.parse(accessTokenAndRefreshToken));
        const isUserLoggedIn = await wixLoggedIn();

        // console.log(
        //   'isUserLoggedIn from WixProvider AUTH CONTEXT',
        //   isUserLoggedIn
        // );
        const currentMember = await wixGetCurrentMember({
          fieldsets: ["FULL" as any],
        });
        const contactData = await getContactsItem(
          currentMember?.member?.contactId || ""
        );
        // if (contactData) {
        //   console.log('contactData', contactData);
        // }
        // console.log("Logged in as:", currentMember?.member?.profile?.nickname);
        // console.log("currentMember", currentMember);

        updateUserDetails({
          contactId: currentMember?.member?.contactId,
          accountId:
            contactData?.info?.extendedFields?.items?.["custom.accountid"],
          isAdmin: contactData?.info?.extendedFields?.items?.[
            "custom.accountid"
          ]
            ? true
            : false,
          userName: currentMember?.member?.profile?.nickname,
          // userName: 'Eva Pericolini',
          slug: currentMember?.member?.profile?.slug,
          email: currentMember?.member?.loginEmail,
          createdDate: currentMember?.member?._createdDate,
          updatedDate: currentMember?.member?._updatedDate,
          privacyStatus: currentMember?.member?.privacyStatus,
          accountStatus: currentMember?.member?.status,
          activityStatus: currentMember?.member?.activityStatus,
          lastLoginDate: currentMember?.member?.lastLoginDate,
        });
        setIsLoggedIn(true);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // #region Fetch user data
  const [refreshUserData, setRefreshUserData] = useState(false);
  const {
    ownedPostPages,
    ownedInfoPages,
    ownedPostPagesFetched,
    ownedInfoPagesFetched,
  } = useFetchUserData(
    isLoggedIn,
    userDetails,
    refreshUserData,
    setIsLoadingInProgress
  );
  const handleUserDataRefresh = () => {
    setRefreshUserData((prev) => !prev); // Toggle the refresh state to trigger re-fetch
  };

  const login = () => setIsLoggedIn(true);
  const logout = () => {
    localStorage.removeItem("f4e_wix_sessionToken");
    localStorage.removeItem("f4e_wix_accessTokenAndRefreshToken");
    setUserDetails(initialState);
    setIsLoggedIn(false);
    setIsUserTagAssociated(false);
  };
  // #endregion

  // useEffect(() => {
  //   // console.log('debug1->userDetails', userDetails);
  // }, [userDetails]);

  // #region extraOwnedPages
  const [allOwnedPages, setAllOwnedPages] = useState<any[]>([]);

  useEffect(() => {
    let tempExtraOwnedPages = [] as any[];
    const tempExtraInfoPages = infoPages?.filter((infoPage) => {
      // console.log('infoPages', infoPage);
      if (
        !!infoPage?.data?.pageOwner?.find(
          (owner: any) => owner._id === userDetails.userTag?._id
        )
      ) {
        tempExtraOwnedPages.push(infoPage);
        return false;
      }
    });
    const tempExtraPostPages = postPages?.filter((postPage) => {
      if (
        !!postPage?.data?.pageOwner?.find(
          (owner: any) => owner._id === userDetails.userTag?._id
        )
      ) {
        tempExtraOwnedPages.push(postPage);
        return false;
      }
    });

    // console.log('debug1->tempExtraOwnedPages', tempExtraOwnedPages);

    const removeDuplicatePosts = (posts: any[]) => {
      const uniquePosts = posts.filter(
        (post, index, self) =>
          index === self.findIndex((p) => p._id === post._id)
      );
      return uniquePosts;
    };

    const allOwnedPages = [
      ...tempExtraOwnedPages,
      ...ownedInfoPages,
      ...ownedPostPages,
    ];

    const uniquePages = removeDuplicatePosts(allOwnedPages);
    // console.log("uniquePages", uniquePages);
    setAllOwnedPages(uniquePages);
  }, [infoPages, postPages, userDetails.userTag]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loading,
        login,
        logout,
        userDetails,
        updateUserDetails,
        ownedPostPages,
        ownedInfoPages,
        ownedPostPagesFetched,
        ownedInfoPagesFetched,
        handleUserDataRefresh,
        setIsUserTagAssociated,
        tags,
        tagsFetched,
        handleTagCreated,
        appendTag,
        updateTag,
        postPages,
        postPagesFetched,
        handlePostPageCreated,
        infoPages,
        infoPagesFetched,
        handleInfoPageCreated,
        isLoadingInProgress,
        setIsLoadingInProgress,
        userTagFetched,
        allOwnedPages,
        handleUserTagRefresh,
        affiliations,
        affiliationsFetched,
        handleAffiliationCreated,
        appendAffiliations,
        removeAffiliations,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
