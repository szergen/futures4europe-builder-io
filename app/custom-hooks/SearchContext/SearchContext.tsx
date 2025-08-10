import React, { createContext, useState, useContext, useEffect } from 'react';

import { sortTags } from './SearchContext.utils';
import { useAuth } from '../AuthContext/AuthContext';

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
    searchItemType: 'text' | 'tag' | 'field-tag' | 'sortby' | '';
  }[];
  selectedSuggestionIndex: number;
  selectedSuggestionTag: string;
  selectedSearchedItemIndex: number;
  activeSelection: 'field' | 'tag' | 'field-tag' | '' | 'sortby';
  sortBy: 'relevance' | 'byBeginDate' | 'byEstablishedDate';
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
  clickedSuggestion: '',
  clickedField: '',
  clickedTag: '',
  searchedItems: [],
  selectedSuggestionIndex: 0,
  selectedSuggestionTag: '',
  selectedSearchedItemIndex: -1,
  activeSelection: '',
  sortBy: 'relevance',
  inputText: '',
  sortTags: sortTags,
  selectedSortTag: '',
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

  // Fetch all data from cached APIs
  useEffect(() => {
    setLoading(true);
    // const fetchAllData = async () => {
    //   try {
    //     setLoading(true);
    //     console.log('SearchContext: Fetching data...');

    //     // Fetch tags with popularity
    //     const tagsResponse = await fetch('/api/tags-with-popularity');
    //     if (!tagsResponse.ok) {
    //       throw new Error(`Failed to fetch tags: ${tagsResponse.status}`);
    //     }
    //     const tagsData = await tagsResponse.json();
    //     console.log(
    //       `SearchContext: Fetched ${tagsData.length} tags with popularity`
    //     );
    //     setTags(tagsData.filter((tag: any) => !tag?.masterTag));

    //     // Fetch info pages
    //     const infoPagesResponse = await fetch('/api/infoPages');
    //     if (!infoPagesResponse.ok) {
    //       throw new Error(
    //         `Failed to fetch info pages: ${infoPagesResponse.status}`
    //       );
    //     }
    //     const infoPagesData = await infoPagesResponse.json();
    //     console.log(
    //       `SearchContext: Fetched ${infoPagesData.length} info pages`
    //     );
    //     setInfoPages(infoPagesData.map((page: any) => page.data));

    //     // Fetch post pages
    //     const postPagesResponse = await fetch('/api/postPages');
    //     if (!postPagesResponse.ok) {
    //       throw new Error(
    //         `Failed to fetch post pages: ${postPagesResponse.status}`
    //       );
    //     }
    //     const postPagesData = await postPagesResponse.json();
    //     console.log(
    //       `SearchContext: Fetched ${postPagesData.length} post pages`
    //     );
    //     setPostPages(postPagesData.map((page: any) => page.data));

    //     // Fetch affiliations
    //     const affiliationsResponse = await fetch('/api/affiliations');
    //     if (!affiliationsResponse.ok) {
    //       throw new Error(
    //         `Failed to fetch affiliations: ${affiliationsResponse.status}`
    //       );
    //     }
    //     const affiliationsData = await affiliationsResponse.json();
    //     console.log(
    //       `SearchContext: Fetched ${affiliationsData.length} affiliations`
    //     );
    //     setAffiliations(
    //       affiliationsData.map((affiliation: any) => affiliation.data)
    //     );

    //     console.log('SearchContext: All data fetched successfully');
    //   } catch (error) {
    //     console.error('Error fetching data for search context:', error);
    //     setError(error instanceof Error ? error : new Error(String(error)));
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchAllData();
    if (
      tagsFetched &&
      infoPagesFetched &&
      postPagesFetched &&
      affiliationsFetched
    ) {
      console.log('Data fetched, example of tags:', authTags[0]);
      setTags(authTags.filter((tag: any) => !tag?.masterTag));
      setInfoPages(authInfoPages.map((page: any) => page.data));
      setPostPages(authPostPages.map((page: any) => page.data));
      setAffiliations(
        authAffiliations.map((affiliation: any) => affiliation.data)
      );
      setLoading(false);
    }
  }, [tagsFetched, infoPagesFetched, postPagesFetched, affiliationsFetched]);

  // Update search state when data is loaded or tags change
  useEffect(() => {
    if (!loading) {
      console.log('SearchContext: Updating search state with fetched data');
      console.log(
        `SearchContext: Using ${tags.length} tags, ${infoPages.length} info pages, ${postPages.length} post pages, and ${affiliations.length} affiliations`
      );

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

      console.log('SearchContext: Search state updated');
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
