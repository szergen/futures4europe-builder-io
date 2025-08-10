import React, {
  useRef,
  useEffect,
  useState,
  useLayoutEffect,
  useCallback,
} from 'react';
import TagInput from './components/TagInput/TagInput';
import HelpDropdown from './components/HelpDropdown/HelpDropdown';
import Suggestions from './components/Suggestions/Suggestions';
import { useRouter, usePathname } from 'next/navigation';
import { useSearch } from '../../custom-hooks/SearchContext/SearchContext';
import {
  removeSearchedItem,
  updateFilteredDataBasedOnClickedTag,
} from './SearchComponentV1.utils';
import SearchedItems from './components/SearchedItems/SearchedItems';
import style from './SearchComponentV1.module.css';
import classNames from 'classnames';

const SearchComponentV1 = () => {
  // SearchContext
  const { searchState, setSearchState } = useSearch();
  const {
    initialData,
    filteredData,
    fieldSuggestions,
    tagSuggestions,
    pageSuggestions,
    sortTagsSuggestions,
    results,
    showHelp,
    showSuggestions,
    showResults,
    searchedItems,
    clickedField,
    selectedSuggestionIndex,
    selectedSearchedItemIndex,
    activeSelection,
    inputText,
    sortTags,
    selectedSortTag,
  } = searchState;

  const handleSelectedSortTag = (e: any) => {
    e.preventDefault();
    console.log('Clicked on sortTag:', e.target.innerText);
    setSearchState((prevState) => ({
      ...prevState,
      selectedSortTag: e?.target?.innerText,
      showHelp: false,
      showSuggestions: false,
      searchedItems: [
        ...prevState.searchedItems,
        { searchItem: e.target.innerText, searchItemType: 'sortby' },
      ],
      // filteredData: {
      //   ...prevState.filteredData,
      //   pages: sortResultBySortTags(results, e.target.innerText),
      // },
      // pageSuggestions: sortResultBySortTags(results, e.target.innerText).map(
      //   (page) => ({ item: page })
      // ),
      // results: sortResultBySortTags(results, e.target.innerText),
    }));
  };

  const handleSelectedSuggestion = (
    selectedSuggestionTag: any,
    selectedSuggestionType: 'tag' | 'field' | 'field-tag' | 'sortby'
  ) => {
    if (selectedSuggestionType === 'tag') {
      const { matchedPages, matchedAffiliations } =
        updateFilteredDataBasedOnClickedTag(
          selectedSuggestionTag,
          filteredData
        );
      console.log('matchedPages', matchedPages);
      setSearchState((prevState) => ({
        ...prevState,
        selectedSuggestionTag: selectedSuggestionTag,
        pageSuggestions: matchedPages,
        activeSelection: 'tag',
      }));
    } else if (selectedSuggestionType === 'field') {
      setSearchState((prevState) => ({
        ...prevState,
        // clickedField: selectedSuggestionTag,
        selectedSuggestionTag: selectedSuggestionTag,
        activeSelection: 'field',
      }));
    } else if (selectedSuggestionType === 'sortby') {
      setSearchState((prevState) => ({
        ...prevState,
        selectedSuggestionTag: selectedSuggestionTag,
        activeSelection: 'sortby',
      }));
    }
  };

  const handleTagSuggestion = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setSearchState((prevState) => ({
      ...prevState,
      clickedTag: e?.target?.innerText,
      selectedSuggestionIndex: -1,
      showResults: true,
    }));
  };

  const handleFieldSelection = (e: any) => {
    e.preventDefault();
    console.log('Clicked on field:', e.target.innerText);
    setSearchState((prevState) => ({
      ...prevState,
      clickedField: e?.target?.innerText,
    }));
  };
  // Searched Items - Remove items

  const handleRemoveSearchedItem = (event: any) => {
    const target = event.currentTarget;
    const siblingSpan = target.previousSibling;

    if (
      siblingSpan &&
      siblingSpan.nodeType === Node.ELEMENT_NODE &&
      siblingSpan.tagName === 'SPAN'
    ) {
      const siblingSpanText = siblingSpan.textContent;
      // console.log('siblingSpanText', siblingSpanText);

      const filteredSearchItems = searchedItems.filter(
        (item) =>
          item?.searchItem?.toLowerCase() !== siblingSpanText?.toLowerCase()
      );

      const removedSearchItem = searchedItems.find(
        (item) => item.searchItem === siblingSpanText
      );
      // console.log('filteredSearchItems--', filteredSearchItems);
      // console.log('removedSearchItem--', removedSearchItem);

      setSearchState((prevState) => ({
        ...prevState,
        searchedItems: filteredSearchItems,
        filteredData: removeSearchedItem(
          initialData,
          filteredSearchItems,
          inputText
        ),
        selectedSortTag:
          removedSearchItem?.searchItemType === 'sortby' ? '' : selectedSortTag,
        // results: updatedFilteredData.pages,
      }));
    }
  };

  const handleArrouwUp = () => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedSuggestionIndex: Math.max(
        prevState.selectedSuggestionIndex - 1,
        0
      ),
    }));
  };

  const handleArrowDown = () => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedSuggestionIndex: Math.min(
        prevState.selectedSuggestionIndex + 1,
        filteredData.tags.length - 1
      ),
    }));
  };
  const handleScrollForSuggestions = (e: any) => {
    if (e.deltaY < 0) {
      handleArrouwUp();
    } else {
      handleArrowDown();
    }
  };

  // useEffect(() => {
  //   console.log('debug aaa ->searchedItems', searchedItems);
  // }, [searchedItems]);

  useEffect(() => {
    setSearchState((prevState) => ({
      ...prevState,
      pageSuggestions: results?.map((page) => ({ item: page })),
    }));
  }, [results]);

  // useEffect(() => {
  //   console.log('debugaaa showResults', showResults);
  // }, [showResults]);

  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const [isOnSearchPage, setIsOnSearchPage] = useState(false);

  /* TODO: @alex modificari is HomePage */

  useEffect(() => {
    // console.log('debug aaa -> vars', {
    //   pathname,
    //   showResults,
    //   searchedItems,
    //   isOnSearchPage,
    // });
    if (
      pathname !== 'search' &&
      showResults &&
      searchedItems.length > 0 &&
      !isOnSearchPage
    ) {
      // console.log('debug aaa IFFF');
      setIsOnSearchPage(true);
      return router.push('/search');
    }
    if (searchedItems.length === 0 && isOnSearchPage) {
      setSearchState((prevState) => ({
        ...prevState,
        showResults: false,
        selectedSuggestionIndex: -1,
        clickedField: '',
        clickedTag: '',
        selectedSuggestionTag: '',
        activeSelection: '',
        selectedSortTag: '',
        showSuggestions: false,
      }));
      return router.push('/');
    }
    if (searchedItems.length > 0 && isOnSearchPage) {
      setSearchState((prevState) => ({
        ...prevState,
        showHelp: false,
      }));
    }
  }, [
    showResults,
    pathname,
    searchedItems,
    isOnSearchPage,
    router,
    setSearchState,
  ]);

  // #region useEffect for different pages
  useEffect(() => {
    if (pathname === '/pages/post') {
      setSearchState((prevState) => ({
        ...prevState,
        searchedItems: [
          {
            searchItem: 'Post',
            searchItemType: 'tag',
          },
        ],
        filteredData: {
          ...initialData,
          pages: initialData?.pages?.filter(
            (page: any) => page.pageTypes?.[0]?.name === 'post'
          ),
        },
        showResults: false,
      }));
      setIsOnSearchPage(false);
    } else if (pathname === '/pages/project') {
      setSearchState((prevState) => ({
        ...prevState,
        searchedItems: [
          {
            searchItem: 'Project Info',
            searchItemType: 'tag',
          },
        ],
        filteredData: {
          ...initialData,
          pages: initialData?.pages?.filter(
            (page: any) => page.pageTypes?.[0]?.name === 'project info'
          ),
        },
        showResults: false,
      }));
      setIsOnSearchPage(false);
    } else if (pathname === '/pages/project-result') {
      setSearchState((prevState) => ({
        ...prevState,
        searchedItems: [
          {
            searchItem: 'Project Result',
            searchItemType: 'tag',
          },
        ],
        filteredData: {
          ...initialData,
          pages: initialData?.pages?.filter(
            (page: any) => page.pageTypes?.[0]?.name === 'project result'
          ),
        },
        showResults: false,
      }));
      setIsOnSearchPage(false);
    } else if (pathname === '/pages/event') {
      setSearchState((prevState) => ({
        ...prevState,
        searchedItems: [
          {
            searchItem: 'Event',
            searchItemType: 'tag',
          },
        ],
        filteredData: {
          ...initialData,
          pages: initialData?.pages?.filter(
            (page: any) => page.pageTypes?.[0]?.name === 'event'
          ),
        },
        showResults: false,
      }));
      setIsOnSearchPage(false);
    } else if (pathname === '/pages/organisation') {
      setSearchState((prevState) => ({
        ...prevState,
        searchedItems: [
          {
            searchItem: 'Organisation Info',
            searchItemType: 'tag',
          },
        ],
        filteredData: {
          ...initialData,
          pages: initialData?.pages?.filter(
            (page: any) => page.pageTypes?.[0]?.name === 'organisation info'
          ),
        },
        showResults: false,
      }));
      setIsOnSearchPage(false);
    } else if (pathname === '/pages/person') {
      setSearchState((prevState) => ({
        ...prevState,
        searchedItems: [
          {
            searchItem: 'Person Info',
            searchItemType: 'tag',
          },
        ],
        filteredData: {
          ...initialData,
          pages: initialData?.pages?.filter(
            (page: any) => page.pageTypes?.[0]?.name === 'person info'
          ),
        },
        showResults: false,
      }));
      setIsOnSearchPage(false);
    } else if (pathname !== '/search') {
      setIsOnSearchPage(false);
      setSearchState((prevState) => ({
        ...prevState,
        searchedItems: [],
        filteredData: initialData,
        showResults: false,
      }));
    }
  }, [pathname]);

  // Inside your component, add or replace with these state variables and refs
  const wrapperRef = useRef(null);
  const [hasMultipleRows, setHasMultipleRows] = useState(false);
  const [singleRowHeight, setSingleRowHeight] = useState(0);
  const [currentHeight, setCurrentHeight] = useState(0);

  // Add this useEffect to initialize the single row height with one tag present
  useEffect(() => {
    // This will run once after initial render
    if (searchState.searchedItems.length === 1 && wrapperRef.current) {
      // Store the height of a single row with one tag
      setSingleRowHeight(wrapperRef.current.offsetHeight);
      console.log(
        'Initialized single row height:',
        wrapperRef.current.offsetHeight
      );
    }
  }, []);

  // This function will be called to check the wrapper's height
  const checkWrapperHeight = () => {
    if (!wrapperRef.current) return;

    // Get current height and update state
    const height = wrapperRef.current.offsetHeight;
    setCurrentHeight(height);

    // On first item, set the baseline height
    if (singleRowHeight === 0 && searchState.searchedItems.length > 0) {
      setSingleRowHeight(height);
      console.log('Setting initial single row height:', height);
      return;
    }

    // Only proceed if we have a valid baseline
    if (singleRowHeight > 0) {
      // Determine if multiple rows (50% taller than single row)
      const isMultiRows = height > singleRowHeight * 1.5;

      // Only update state if changed
      if (hasMultipleRows !== isMultiRows) {
        console.log(
          'Multiple rows changed:',
          isMultiRows,
          'Height:',
          height,
          'Threshold:',
          singleRowHeight * 1.5
        );
        setHasMultipleRows(isMultiRows);
      }
    }
  };

  useEffect(() => {
    // Wait a small amount of time for the DOM to fully update
    const timer = setTimeout(() => {
      checkWrapperHeight();

      // Debug logging
      if (wrapperRef.current) {
        console.log(
          'Checked after delay - Current height:',
          wrapperRef.current.offsetHeight
        );
        console.log('Items count:', searchState.searchedItems.length);
      }
    }, 50); // Small delay to ensure DOM is updated

    return () => clearTimeout(timer);
  }, [searchState.searchedItems]); // Only depend on searchedItems changes

  console.log('DOM fully updated, checking height...');

  useEffect(() => {
    if (!wrapperRef.current) return;

    console.log('Setting up observers');

    // Create resize observer
    const resizeObserver = new ResizeObserver(() => {
      console.log('Resize detected');
      checkWrapperHeight();
    });

    // Create mutation observer
    const mutationObserver = new MutationObserver(() => {
      console.log('DOM mutation detected');
      checkWrapperHeight();
    });

    // Start observing
    resizeObserver.observe(wrapperRef.current);
    mutationObserver.observe(wrapperRef.current, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: false, // Reduce noise by not watching all attributes
    });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []); // Empty dependency array - only run once on mount

  // Add this for visual debugging if needed
  useEffect(() => {
    console.log('hasMultipleRows state changed to:', hasMultipleRows);
    console.log(
      'Current height:',
      currentHeight,
      'Single row height:',
      singleRowHeight
    );
  }, [hasMultipleRows]);

  // Add this component to your file
  const HeightDebugger = ({
    enabled,
    currentHeight,
    singleRowHeight,
    hasMultipleRows,
  }) => {
    if (!enabled) return null;

    return (
      <div
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          fontSize: '12px',
          zIndex: 9999,
        }}
      >
        <div>Current Height: {currentHeight}px</div>
        <div>Single Row Height: {singleRowHeight}px</div>
        <div>Multiple Rows: {hasMultipleRows ? 'Yes' : 'No'}</div>
        <div>Threshold: {singleRowHeight * 1.5}px</div>
      </div>
    );
  };

  // Apply classes based on current page and multi-row state
  const searchBoxWrapperClasses = classNames(
    'relative bg-white m-auto',
    style.searchBoxWrapper,
    {
      'max-w-[650px] min-w-[650px]': !isHomePage,
      'max-w-[450px] min-w-[450px] mx-auto shadow-lg': isHomePage,
      [style.multiRowWrapper]: hasMultipleRows, // Add multi-row class
    }
  );

  const searchBoxClasses = classNames(style.searchBox, {
    [style.homePageSearchBox]: isHomePage,
    [style.innerPageSearchBox]: !isHomePage,
    [style.multiRowSearchBox]: hasMultipleRows, // Add multi-row class
  });

  const searchInputButtonClasses = classNames(style.searchInputButton, {
    [style.multiRowSearchButton]: hasMultipleRows,
  });

  return (
    // <div className={classNames('relative bg-white max-w-[450px] realtive', style.searchBoxWrapper)}>
    //   <div tabIndex={0} className={classNames(style.searchBox)}>
    <div className={searchBoxWrapperClasses} ref={wrapperRef}>
      <div tabIndex={0} className={searchBoxClasses}>
        <SearchedItems
          searchedItems={searchedItems}
          handleRemoveSearchedItem={handleRemoveSearchedItem}
          tags={filteredData?.tags}
          selectedSearchedItemIndex={selectedSearchedItemIndex}
          selectedSortTag={selectedSortTag}
        />
        <TagInput
          initialData={initialData}
          filteredData={filteredData}
          isHomePage={isHomePage}
        />
        {/* {selectedSortTag && <div>Sorted By: {selectedSortTag}</div>} */}
      </div>

      {/* <HeightDebugger 
      enabled={true} 
      currentHeight={currentHeight} 
      singleRowHeight={singleRowHeight} 
      hasMultipleRows={hasMultipleRows} 
    /> */}

      {/* #region Key suggestions */}
      {/* {showSuggestions && ( */}
      {/* <div className={style.keySuggestionsContainer}>
          <div className={style.keySuggestionsLeft}>
            <span className={style.arrowKeys}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                />
              </svg>
            </span>
            <span className={style.arrowKeys}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
                />
              </svg>
            </span>
            <span className={style.leftText}>To navigate</span>
          </div>
          <div className={style.keySuggestionsRight}>
            {/* <span className={style.enterIcon}>enter</span>
            <span className={style.rightText}>To select</span> */}
      {/* {selectedSuggestionIndex > -1 ? (
              <>
                <span className={style.escIcon}>esc</span>
                <span className={style.rightText}>To dismiss selection</span>
              </>
            ) : (
              <>
                <span className={style.escIcon}>enter</span>
                <span className={style.rightText}>
                  To search by current text
                </span>
              </>
            )} */}
      {/* </div> */}
      {/* </div> */}
      {/* )} */}
      {/* #endregion Key suggestions */}
      {/* Help and Suggestions*/}
      {showHelp && <HelpDropdown handleTagSuggestion={handleTagSuggestion} />}
      {showSuggestions &&
        (tagSuggestions?.length > 0 || pageSuggestions?.length > 0) && (
          <Suggestions
            fieldSuggestions={fieldSuggestions}
            tagSuggestions={tagSuggestions}
            pageSuggestions={pageSuggestions}
            sortTagsSuggestions={sortTagsSuggestions}
            // handleClickedSuggestion={handleClickedSuggestion}
            handleTagSuggestion={handleTagSuggestion}
            handleFieldSelection={handleFieldSelection}
            clickedField={clickedField}
            handleSelectedSuggestion={handleSelectedSuggestion}
            selectedSuggestionIndex={selectedSuggestionIndex}
            activeSelection={activeSelection}
            searchedItems={searchedItems}
            // sortTags={sortTags}
            handleSelectedSortTag={handleSelectedSortTag}
            // inputText={inputText}
            handleScrollForSuggestions={handleScrollForSuggestions}
            isHomePage={isHomePage}
          />
        )}
      {/* Results */}
      {/* {showResults && (
        <Modal
          show={showResults}
          onClose={() =>
            setSearchState((prevState) => ({
              ...prevState,
              showResults: false,
            }))
          }
          // size="xlg"
          size="6xl"
          dismissible={true}
        >
          <Modal.Header>
            <h2>Results for pages having:</h2>
            <div className={classNames('flex items-center')}>
              {searchedItems?.map((searchedItem: any, index: number) => {
                switch (searchedItem.searchItemType) {
                  case 'tag':
                    return (
                      <>
                        <div className="mr-2">
                          <Tag
                            {...initialData.tags?.find(
                              (item: any) =>
                                item?.name?.toLowerCase() ===
                                searchedItem?.searchItem?.toLowerCase()
                            )}
                          />
                        </div>
                        {index < searchedItems.length - 1 && (
                          <div className="mr-2">,</div>
                        )}
                      </>
                    );
                  case 'field-tag':
                    const fieldTag = searchedItem.searchItem.split(':');
                    return (
                      <>
                        <div>{fieldTag[0]}:</div>
                        <div className="mr-2">
                          <Tag
                            {...initialData.tags?.find(
                              (item: any) =>
                                item.name.toLowerCase() ===
                                fieldTag[1].toLowerCase()
                            )}
                          />
                        </div>
                        {index < searchedItems.length - 1 && (
                          <div className="mr-2">,</div>
                        )}
                      </>
                    );
                  case 'text':
                    return (
                      <>
                        <div className="mr-2 text-2xl text-black">
                          `&quot;`{searchedItem.searchItem}`&quot;`
                        </div>
                        {index < searchedItems.length - 1 && (
                          <div className="mr-2">,</div>
                        )}
                      </>
                    );
                }
              })}
            </div>
          </Modal.Header>
          <Modal.Body>
            <Results
              results={searchState.filteredData.pages}
              searchedItems={searchedItems}
            />
          </Modal.Body>
        </Modal>
      )} */}
    </div>
  );
};

export default SearchComponentV1;
