import React, { use, useEffect, useState } from 'react';
import { useSearch } from '../../../../custom-hooks/SearchContext/SearchContext';
import {
  InitialData,
  updateFilteredDataBasedOnClickedSuggestion,
  updateFilteredDataBasedOnClickedTag,
  uniqueResults,
  extractFilterBy,
  removeSearchedItem,
  wordByWordSearch,
  sortResultBySortTags,
} from '../../SearchComponentV1.utils';
import style from './TagInput.module.css';
import classNames from 'classnames';
import { useAuth } from '@app/custom-hooks/AuthContext/AuthContext';
import LoadingSpinner from '@app/shared-components/LoadingSpinner/LoadingSpinner';
import SpriteSvg from '@app/shared-components/SpriteSvg/SpriteSvg';
// import SearchedItems from '../SearchedItems/SearchedItems';

export type TagInputProps = {
  initialData: InitialData;
  filteredData: InitialData;
  isHomePage: boolean;
};

const TagInput: React.FC<TagInputProps> = ({
  initialData,
  filteredData,
  isHomePage = false,
}) => {
  const { tagsFetched } = useAuth();

  const [input, setInput] = useState('');
  // Needed for showing help dropdown
  const [tagWasFocused, setTagWasFocused] = useState(false);
  const [filterByField, setFilterByField] = useState('');
  const [resultsToShow, setResultsToShow] = useState([] as any[]);
  // Subscribe to the SearchContext
  const { searchState, setSearchState } = useSearch();
  const { clickedField, clickedTag } = searchState;

  const handleArrouwUp = (event: any) => {
    event.preventDefault();
    setSearchState((prevState) => ({
      ...prevState,
      selectedSuggestionIndex: Math.max(
        prevState.selectedSuggestionIndex - 1,
        0
      ),
    }));
  };

  // Apply different styles based on isHomePage
  const searchInputContainerClasses = classNames(style.SearchInputContainer, {
    [style.homePageSearchInput]: isHomePage,
    [style.innerPageSearchInput]: !isHomePage,
  });

  const searchButtonClasses = classNames(style.SearchInputButton, {
    [style.homePageSearchButton]: isHomePage, // Add home page specific styling for button
    [style.innerPageSearchButton]: !isHomePage, // Add inner page specific styling for button
  });

  // const handleArrowDown = () => {
  //   setSearchState((prevState) => ({
  //     ...prevState,
  //     selectedSuggestionIndex: Math.min(
  //       prevState.selectedSuggestionIndex + 1,
  //       filteredData.tags.length - 1
  //     ),
  //   }));
  // };

  const handleArrowDown = () => {
    setSearchState((prevState) => {
      const maxIndex = Math.max(
        // (filteredData?.tags?.length || 0) - 1
        (prevState.tagSuggestions?.length || 0) - 1
        // (prevState.fieldSuggestions?.length || 0) - 1,
        // (prevState.pageSuggestions?.length || 0) - 1,
        // (prevState.sortTagsSuggestions?.length || 0) - 1
      );

      return {
        ...prevState,
        selectedSuggestionIndex: Math.min(
          prevState.selectedSuggestionIndex + 1,
          maxIndex
        ),
      };
    });
  };

  const handleOnBlur = () => {
    setSearchState((prevState) => ({
      ...prevState,
      showSuggestions: false,
      showHelp: false,
    }));
  };

  const handleOnFocus = () => {
    setSearchState((prevState) => ({
      ...prevState,
      showSuggestions: !!input || !!clickedField || !!clickedTag,
      showHelp:
        !input &&
        !clickedField &&
        !clickedTag &&
        searchState.searchedItems.length === 0,
    }));
    setTagWasFocused(true);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'ArrowDown') {
      handleArrowDown();
    } else if (event.key === 'ArrowUp') {
      handleArrouwUp(event);
    } else if (event.key === 'Enter' && tagWasFocused) {
      if (searchState.selectedSuggestionIndex < 0) {
        const resultsBasedOnSortTag = searchState.selectedSortTag
          ? sortResultBySortTags(resultsToShow, searchState.selectedSortTag)
          : resultsToShow;
        console.log(
          'resultsBasedOnSortTag -> resultsBasedOnSortTag',
          resultsBasedOnSortTag
        );
        console.log(
          'resultsBasedOnSortTag -> searchState.selectedSortTag',
          searchState.selectedSortTag
        );

        setSearchState((prevState) => ({
          ...prevState,
          showSuggestions: false,
          showHelp: false,
          showResults: true,
          results: searchState.searchedItems.length
            ? resultsBasedOnSortTag
            : [],
          searchedItems: input
            ? [
                ...searchState.searchedItems,
                { searchItem: input, searchItemType: 'text' },
              ]
            : [...searchState.searchedItems],
          filteredData: {
            pages: resultsToShow,
            tags: initialData.tags,
            assignments: initialData.assignments,
            sortTags: initialData.sortTags,
          },
          selectedSuggestionIndex: -1,
          // selectedSuggestionTag: '',
        }));
        // console.log('deb1>resultsBasedOnSortTag', resultsBasedOnSortTag);
        // console.log('deb1>resultsToShow', resultsToShow);
        // input[input.length - 1] !== '"' && setInput(input + '"');
        setInput('');
      } else {
        console.log('debug aaa->', searchState.selectedSuggestionIndex);
        setSearchState((prevState) => ({
          ...prevState,
          showSuggestions: false,
          showHelp: false,
          showResults: true,
          clickedTag:
            searchState.activeSelection === 'tag'
              ? searchState.selectedSuggestionTag
              : '',
          selectedSuggestionIndex: -1,
          selectedSuggestionTag: '',
          clickedField:
            searchState.activeSelection === 'field'
              ? searchState.selectedSuggestionTag
              : prevState.clickedField,
          searchedItems:
            searchState.activeSelection === 'sortby'
              ? [
                  ...searchState.searchedItems,
                  {
                    searchItem: searchState.selectedSuggestionTag,
                    searchItemType: 'sortby',
                  },
                ]
              : prevState.searchedItems,
          selectedSortTag:
            searchState.activeSelection === 'sortby'
              ? searchState.selectedSuggestionTag
              : '',
          // activeSelection: 'tag',
        }));
        setInput('');
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setSearchState((prevState) => ({
        ...prevState,
        selectedSuggestionIndex: -1,
        selectedSuggestionTag: '',
        selectedSearchedItemIndex: -1,
      }));
    } else if (
      (event.key === 'Delete' || event.key === 'Backspace') &&
      searchState?.searchedItems?.length > 0 &&
      !input
    ) {
      if (searchState.selectedSearchedItemIndex === -1) {
        setSearchState((prevState) => ({
          ...prevState,
          selectedSearchedItemIndex: 0,
        }));
      } else {
        const { searchedItems, selectedSortTag: initialSelectedSortTag } =
          searchState;
        const isLastItemSortBy =
          searchedItems[searchedItems.length - 1]?.searchItemType === 'sortby';
        const updatedSearchedItems = searchedItems.slice(0, -1);

        setSearchState((prevState) => ({
          ...prevState,
          selectedSearchedItemIndex: -1,
          searchedItems: updatedSearchedItems,
          filteredData: removeSearchedItem(
            initialData,
            updatedSearchedItems,
            input
          ),
          selectedSortTag: isLastItemSortBy ? '' : initialSelectedSortTag,
        }));
      }
    }
  };

  // SearchButton handler function the same as Enter key
  const handleSearchButton = () => {
    if (searchState.selectedSuggestionIndex < 0) {
      setSearchState((prevState) => ({
        ...prevState,
        showSuggestions: false,
        showHelp: false,
        showResults: true,
        results: searchState.searchedItems.length ? resultsToShow : [],
        searchedItems: input
          ? [
              ...searchState.searchedItems,
              { searchItem: input, searchItemType: 'text' },
            ]
          : [...searchState.searchedItems],
        filteredData: {
          pages: resultsToShow,
          tags: initialData.tags,
          assignments: initialData.assignments,
          sortTags: initialData.sortTags,
        },
        selectedSuggestionIndex: -1,
        // selectedSuggestionTag: '',
      }));
      // input[input.length - 1] !== '"' && setInput(input + '"');
      setInput('');
    } else {
      setSearchState((prevState) => ({
        ...prevState,
        showSuggestions: false,
        showHelp: true,
        // showResults: true,
        clickedTag:
          searchState.activeSelection === 'tag'
            ? searchState.selectedSuggestionTag
            : '',
        selectedSuggestionIndex: 0,
        selectedSuggestionTag: '',
        clickedField:
          searchState.activeSelection === 'field'
            ? searchState.selectedSuggestionTag
            : prevState.clickedField,

        activeSelection: 'tag',
      }));
      setInput('');
    }
  };

  // Input effect
  useEffect(() => {
    console.log('Input:', input);
    if (input) {
      // Hide help dropdown and show suggestions
      const searchInput = input;
      let sortTagsSuggestionsSearch: any[] = [];
      setTagWasFocused(true);

      // Word by word search
      const pageSuggestionsSearch = wordByWordSearch(
        input,
        filteredData?.pages,
        [
          'title',
          'postContentRIch1',
          'postContentRIch2',
          'postContentRIch3',
          'subtitle',
        ]
      );

      const fieldSuggestionsSearch = wordByWordSearch(
        input,
        filteredData?.tags?.filter((tag) => tag.tagType === 'field'),
        ['name', 'tagLine']
      );

      const tagSuggestionsSearch = wordByWordSearch(
        input,
        filteredData?.tags?.filter(
          (tag) =>
            tag.tagType !== 'field' &&
            tag.tagType !== 'sort' &&
            !searchState.searchedItems.find(
              (item) =>
                item?.searchItem?.toLowerCase() === tag?.name?.toLowerCase()
            )
        ),
        ['name', 'tagLine']
      );

      // if (searchState.searchedItems.length) {
      sortTagsSuggestionsSearch = wordByWordSearch(
        input,
        filteredData?.sortTags,
        ['name']
      );
      console.log(
        'debug1->sortTagsSuggestionsSearch',
        sortTagsSuggestionsSearch
      );
      // }

      if (clickedField) {
        setFilterByField(extractFilterBy(initialData.tags, clickedField) || '');
      }
      // Update results local state with unique results
      setResultsToShow(
        uniqueResults(pageSuggestionsSearch)?.map((result) => result?.item)
      );

      // console.log('debug2->tagSuggestions', tagSuggestionsSearch);
      // console.log('debug2->pageSuggestions', pageSuggestionsSearch);

      setSearchState((prevState) => ({
        ...prevState,
        fieldSuggestions: fieldSuggestionsSearch,
        tagSuggestions: filterByField
          ? tagSuggestionsSearch?.filter(
              (tag) =>
                tag?.item.tagType !== 'field' &&
                tag?.item.tagType !== 'sort' &&
                tag?.item.tagType === filterByField
            )
          : tagSuggestionsSearch?.sort(
              (a, b) => b?.item?.popularity - a?.item?.popularity
            ),
        pageSuggestions: pageSuggestionsSearch,
        sortTagsSuggestions: sortTagsSuggestionsSearch,
        showSuggestions: true,
        selectedSuggestionIndex: -1,
        showHelp: false,
        inputText: input,
      }));
    } else {
      tagWasFocused &&
        setSearchState((prevState) => ({
          ...prevState,
          showSuggestions:
            !!input ||
            // !!clickedField ||
            !!clickedTag,
          selectedSuggestionIndex: -1,
          showHelp:
            !input &&
            // !clickedField &&
            !clickedTag &&
            searchState.searchedItems.length === 0,
        }));
    }
  }, [input, filterByField]);

  // Clicked Field effect
  useEffect(() => {
    if (clickedField) {
      // const filteredAssignments = filteredData.assignments.filter(
      //   (item) => item.field === clickedField
      // );
      // console.log('deb1->filteredAssignments', filteredAssignments);
      const fieldToKeysMapping: Record<string, string[]> = {
        author: ['author'],
        people: ['people'],
        activity: ['activity'],
        participant: ['projectParticipantTeam'],
        coordinator: ['projectCoordinator'],
        speaker: ['speaker'],
      };
      const keysToCheck = fieldToKeysMapping[clickedField] || [];

      const matchedPages =
        keysToCheck.length > 0
          ? filteredData.pages.filter((page: { [key: string]: any }) =>
              keysToCheck.some(
                (key) => Array.isArray(page?.[key]) && page?.[key].length > 0
              )
            )
          : [];

      // console.log('deb1->clickedField', clickedField);
      // console.log('deb1->filteredAssignments', filteredAssignments);

      // const filteredPages = filteredData.pages.filter((page) =>
      //   filteredAssignments.some(
      //     (assignment) => assignment.pageId === page.pageId
      //   )
      // );
      // console.log('deb1->filteredPages', filteredPages);

      const tagSuggestionsSearch = wordByWordSearch(
        ' ',
        filteredData.tags.filter(
          (tag) =>
            tag.tagType !== 'field' &&
            tag.tagType !== 'sort' &&
            tag.tagType === extractFilterBy(initialData.tags, clickedField)
        ),
        ['name', 'tagLine']
      ).sort((a, b) => b?.item?.popularity - a?.item?.popularity);
      console.log(
        'debug100->tagSuggestionsSearch',
        tagSuggestionsSearch,
        extractFilterBy(initialData.tags, clickedField)
      );

      setSearchState((prevState) => ({
        ...prevState,
        showSuggestions: true,
        showHelp: false,
        searchedItems: [
          ...searchState.searchedItems,
          {
            searchItem: `${clickedField}:`,
            searchItemType: 'field-tag',
          },
        ],
        filteredData: {
          pages: matchedPages,
          tags: initialData.tags,
          assignments: initialData.assignments,
          sortTags: initialData.sortTags,
        },
        fieldSuggestions: [],
        // fieldSuggestions: initialData.tags.filter(
        //   (tag) => tag.tagType === 'field'
        // ),
        tagSuggestions: tagSuggestionsSearch,
        pageSuggestions: matchedPages,
        // sortTagsSuggestions: initialData.sortTags,
        sortTagsSuggestions: [],
        inputText: '',
        selectedSuggestionIndex: 0,
        activeSelection: 'tag',
      }));
      setInput('');
    } else {
      setSearchState((prevState) => ({
        ...prevState,
      }));
      setFilterByField('');
    }
  }, [clickedField]);

  // Clicked Tag effect
  useEffect(() => {
    if (clickedTag && clickedField) {
      const composedTag = `${clickedField}:${clickedTag}`;
      const {
        matchedPages,
        // matchedTagsBasedOnPages,
        // matchedAssignmentsBasedOnPages,
      } = updateFilteredDataBasedOnClickedSuggestion(composedTag, filteredData);

      setSearchState((prevState) => ({
        ...prevState,
        clickedField: '',
        clickedTag: '',
        searchedItems: [
          ...searchState.searchedItems.slice(0, -1),
          {
            searchItem: composedTag,
            searchItemType: 'field-tag',
          },
        ],
        // results: matchedPages,
        filteredData: {
          pages: matchedPages,
          tags: initialData.tags,
          assignments: initialData.assignments,
          sortTags: initialData.sortTags,
        },
        fieldSuggestions: initialData.tags.filter(
          (tag) => tag.tagType === 'field'
        ),
        tagSuggestions: initialData.tags.filter(
          (tag) => tag.tagType !== 'field' && tag.tagType !== 'sort'
        ),
        pageSuggestions: matchedPages,
        sortTagsSuggestions: initialData.sortTags,
        inputText: '',
      }));
      setInput('');
      setResultsToShow(
        uniqueResults(matchedPages.map((page) => ({ item: page }))).map(
          (result) => result.item
        )
      );
    } else if (clickedTag && !clickedField) {
      // console.log('deb1->clickedTag', clickedTag);
      const { matchedPages, matchedAffiliations } =
        updateFilteredDataBasedOnClickedTag(clickedTag, filteredData);

      setSearchState((prevState) => ({
        ...prevState,
        showHelp: false,
        showSuggestions: false,
        clickedTag: '',
        searchedItems: [
          ...searchState.searchedItems,
          {
            searchItem: clickedTag,
            searchItemType: 'tag',
          },
        ],
        // results: matchedPages,
        filteredData: {
          pages: matchedPages.map((page) => page.item),
          tags: initialData.tags,
          assignments: initialData.assignments,
          sortTags: initialData.sortTags,
        },
        fieldSuggestions: initialData.tags.filter(
          (tag) => tag.tagType === 'field'
        ),
        tagSuggestions: initialData.tags.filter(
          (tag) => tag.tagType !== 'field' && tag.tagType !== 'sort'
        ),
        pageSuggestions: matchedPages,
        sortTagsSuggestions: initialData.sortTags,
        inputText: '',
      }));
      setInput('');
      setFilterByField('');
      setResultsToShow(
        uniqueResults(matchedPages).map((result) => result.item)
      );
    }
  }, [clickedTag]);

  // searchState.searchedItems effect
  useEffect(() => {
    // setResultsToShow(
    //   uniqueResults(filteredData.pages.map((page) => ({ item: page }))).map(
    //     (result) => result.item
    //   )
    // );
    // console.log('debug9->filteredData', filteredData.pages);
    // console.log(
    //   'debug9->unique',
    //   uniqueResults(filteredData.pages.map((page) => ({ item: page }))).map(
    //     (result) => result.item
    //   )
    // );
    setResultsToShow(
      uniqueResults(filteredData?.pages?.map((page) => ({ item: page })))?.map(
        (result) => result.item
      )
    );
    if (searchState.selectedSortTag) {
      setInput('');
    }
    // if (searchState.searchedItems.length === 0) {
    //   setSearchState((prevState) => ({
    //     ...prevState,
    //     showResults: false,
    //   }));
    // }
  }, [searchState.searchedItems]);

  // results to be triggered each time resultsToShow changes
  // useEffect(() => {
  //   setSearchState((prevState) => ({
  //     ...prevState,
  //     results: resultsToShow,
  //   }));
  // }, [resultsToShow]);

  // useEffect(() => {
  //   console.log(
  //     'TAG INPUT -> debug4->selectedSuggestionIndex->',
  //     searchState.selectedSuggestionIndex
  //   );
  //   console.log(
  //     'TAG INPUT -> debug4->selectedSuggestionTag->',
  //     searchState.selectedSuggestionTag
  //   );
  // }, [searchState.selectedSuggestionIndex]);

  return (
    <div className={searchInputContainerClasses}>
      {tagsFetched ? (
        <input
          className={classNames('w-full', {
            'text-lg py-3 px-4': isHomePage,
            'py-2 px-3': !isHomePage, // for other pages
          })}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            isHomePage
              ? 'Search pages, tags, or topics...'
              : 'Search pages by tags or text'
          }
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          disabled={!tagsFetched}
          autoFocus={searchState.showResults}
        />
      ) : (
        <div
          className={classNames(
            'h-full ml-2 flex items-center justify-center',
            style.loadingSpinner
          )}
        >
          <LoadingSpinner className="w-6 h-6" size="sm" />
        </div>
      )}

      <button
        className={classNames(style.SearchInputButton, '')}
        onMouseDown={handleSearchButton}
      >
        <SpriteSvg.SearchIcon
          sizeH={isHomePage ? 28 : 24}
          sizeW={isHomePage ? 28 : 24}
          viewBox={'0 -1 14 14'}
          fill={'#fff'}
          stroke={'0'}
          inline={false}
        />
      </button>
    </div>
  );
};

export default TagInput;
