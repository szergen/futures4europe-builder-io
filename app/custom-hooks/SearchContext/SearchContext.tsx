import React, { createContext, useState, useContext, useEffect } from "react";

import { sortTags } from "./SearchContext.utils";
import { useAuth } from "../AuthContext/AuthContext";
import { transformBuilderInfoPageToWixFormat } from "@app/utils/builderInfoPageUtils";
import { transformBuilderPostToWixFormat } from "@app/utils/builderPostUtils";

export interface SearchState {
  initialData: any;
  filteredData: any;
  fieldSuggestions: any[];
  tagSuggestions: any[];
  pageSuggestions: any[];
  sortTagsSuggestions: any[];
  // highlightedData: any[];
  showHelp: boolean;
  showSuggestions: boolean;
  showResults: boolean;
  results: any[];
  clickedSuggestion: string;
  clickedField: string;
  clickedTag: string;
  searchedItems: {
    searchItem: string;
    searchItemType: "text" | "tag" | "field-tag" | "sortby" | "";
  }[];
  selectedSuggestionIndex: number;
  selectedSuggestionTag: string;
  selectedSearchedItemIndex: number;
  activeSelection: "field" | "tag" | "field-tag" | "" | "sortby";
  sortBy: "relevance" | "byBeginDate" | "byEstablishedDate";
  inputText: string;
  sortTags: typeof sortTags;
  selectedSortTag: string;
}

const initialState: SearchState = {
  initialData: {},
  fieldSuggestions: [],
  tagSuggestions: [],
  pageSuggestions: [],
  filteredData: {},
  // highlightedData: [],
  results: [],
  showHelp: false,
  showSuggestions: false,
  showResults: false,
  clickedSuggestion: "",
  clickedField: "",
  clickedTag: "",
  searchedItems: [],
  selectedSuggestionIndex: 0,
  selectedSuggestionTag: "",
  selectedSearchedItemIndex: -1,
  activeSelection: "",
  sortBy: "relevance",
  inputText: "",
  sortTags: sortTags,
  selectedSortTag: "",
  sortTagsSuggestions: [],
};

export type SearchProviderProps = {
  children: React.ReactNode;
};

const SearchContext = createContext<{
  searchState: SearchState;
  setSearchState: React.Dispatch<React.SetStateAction<SearchState>>;
  loading: boolean;
  error: Error | null;
}>({
  searchState: initialState,
  setSearchState: () => {},
  loading: true,
  error: null,
});

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const {
    tagsFetched,
    affiliationsFetched,
    infoPagesFetched,
    postPagesFetched,
    tags: authTags,
    infoPages: authInfoPages,
    postPages: authPostPages,
    affiliations: authAffiliations,
  } = useAuth();
  const [tags, setTags] = useState<any[]>([]);
  const [infoPages, setInfoPages] = useState<any[]>([]);
  const [postPages, setPostPages] = useState<any[]>([]);
  const [affiliations, setAffiliations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchState, setSearchState] = useState({
    ...initialState,
    initialData: {},
    tags: [],
    pages: [],
    assignments: [],
    sortTags: [],
    filteredData: {},
  } as any);

  // console.log("debug333->infoPages", infoPages);

  // Sync data from AuthContext into local state.
  // Watches both the fetched flags (for initial load) and the actual data
  // arrays (so that refreshes after page/tag creation are picked up).
  useEffect(() => {
    if (
      tagsFetched &&
      infoPagesFetched &&
      postPagesFetched &&
      affiliationsFetched
    ) {
      setTags(authTags.filter((tag: any) => !tag?.masterTag));
      setInfoPages(
        authInfoPages.map((page: any) => ({
          ...page.data,
          _id: page.id,
        })),
      );
      setPostPages(
        authPostPages.map((page: any) => ({
          ...page.data,
          _id: page.id,
        })),
      );
      setAffiliations(authAffiliations);
      setLoading(false);
    }
  }, [tagsFetched, infoPagesFetched, postPagesFetched, affiliationsFetched, authTags, authInfoPages, authPostPages, authAffiliations]);

  // Update search state when data is loaded or tags change
  useEffect(() => {
    if (!loading) {
      // console.log("SearchContext: Updating search state with fetched data");
      // console.log(
      //   `SearchContext: Using ${tags.length} tags, ${infoPages.length} info pages, ${postPages.length} post pages, and ${affiliations.length} affiliations`
      // );

      const initialData = {
        ...searchState,
        tags: tags,
        pages: [...infoPages, ...postPages],
        assignments: initialState.initialData.assignments,
        sortTags: sortTags,
        affiliations: affiliations,
        filteredData: {},
        initialData: {},
      };
      initialData.filteredData = { ...initialData };
      initialData.initialData = { ...initialData };
      setSearchState(initialData);

      // console.log("SearchContext: Search state updated");
    }
  }, [loading, tags, infoPages, postPages, affiliations]);

  // Provide loading and error state to consumers
  const contextValue = {
    searchState,
    setSearchState,
    loading,
    error,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
