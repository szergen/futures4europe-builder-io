'use client';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, Variants, useInView } from 'framer-motion';
import { Modal } from 'flowbite-react';
import TagsList from '../../page-components/shared-page-components/TagList/TagsList';
import './tagsCarousel.css'; // Add this import for custom CSS

interface LoadingStates {
  projects?: boolean;
  organisations?: boolean;
  persons?: boolean;
  domains?: boolean;
  methods?: boolean;
}

// Single theme color for all UI elements
const THEME_COLOR = '#2563EB'; // Projects blue color

// Simplified slide variants without 3D effects
const slideVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    filter: 'blur(8px)',
    y: 10,
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.07,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    filter: 'blur(8px)',
    y: -10,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Improved row entrance animations without 3D effect
const rowVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.08,
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1], // Improved cubic bezier
    },
  }),
};

// Advanced button hover animations
const buttonVariants: Variants = {
  rest: { scale: 1, boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)' },
  hover: {
    scale: 1.08,
    boxShadow: '0px 5px 12px rgba(0, 0, 0, 0.15)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
  tap: {
    scale: 0.95,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
};

// Enhanced dot indicator variants
const dotVariants: Variants = {
  inactive: {
    scale: 1,
    backgroundColor: '#D1D5DB',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  },
  active: {
    scale: 1.4,
    backgroundColor: THEME_COLOR,
    boxShadow: `0px 2px 4px rgba(37, 99, 235, 0.3)`,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 12,
    },
  },
};

// Simple animation for the title button
const titleButtonVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.05,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
  tap: {
    scale: 0.95,
  },
};

// Modal animation variants - optimized for performance
const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.98,
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.25, // Faster animation
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.2, // Faster exit animation
      ease: 'easeOut', // Simpler easing function for better performance
    },
  },
};

const TagsCarousel = ({ loadingStates }: { loadingStates: LoadingStates }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const totalSlides = 5;
  const containerRef = useRef<HTMLDivElement>(null);

  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<string>('');

  // A stable ref to store the previous loading states for comparison
  const prevLoadingStatesRef = useRef(loadingStates);

  // Track if we've already animated initially
  const initialAnimationCompletedRef = useRef({
    projects: false,
    organisations: false,
    persons: false,
    domains: false,
    methods: false,
  });

  // Refs to preserve tag marquee states
  const tagRowsRef = useRef<{ [key: string]: boolean }>({});

  // Effect to set initial load complete after all loading states are false
  // and to detect any loading state changes
  useEffect(() => {
    const allLoaded =
      !loadingStates.projects &&
      !loadingStates.organisations &&
      !loadingStates.persons &&
      !loadingStates.domains &&
      !loadingStates.methods;

    if (allLoaded && !initialLoadComplete) {
      setInitialLoadComplete(true);
    }

    // Update the previous loading states ref
    prevLoadingStatesRef.current = loadingStates;
  }, [loadingStates, initialLoadComplete]);

  // Auto-advance slides with improved interval handling
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoPlaying && initialLoadComplete) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
      }, 8000); // Change slide every 8 seconds
    }

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides, initialLoadComplete]);

  // Touch handling for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragStartX === null) return;

    const dragEndX = e.changedTouches[0].clientX;
    const diff = dragEndX - dragStartX;

    // Threshold for swipe detection
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }

    setDragStartX(null);
  };

  // Pause auto-play when user interacts
  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
    // Resume after 30 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 30000);
  };

  const nextSlide = () => {
    pauseAutoPlay();
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    pauseAutoPlay();
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    pauseAutoPlay();
    setCurrentSlide(index);
  };

  // Handle navigation to respective pages or open modal with improved animation
  const handleNavigateToPage = (page: string) => {
    // Check if it's any of the pages that should open modal
    if (
      ['domains', 'methods', 'organisations', 'projects', 'people'].includes(
        page
      )
    ) {
      // Use Framer Motion's optimized animation
      let typeToShow = page;
      if (page === 'organisations') typeToShow = 'organisation';
      if (page === 'people') typeToShow = 'person';
      if (page === 'projects') typeToShow = 'project';
      if (page === 'domains') typeToShow = 'domain';
      if (page === 'methods') typeToShow = 'foresight method';

      // Set the modal type first to ensure content is ready
      setModalType(typeToShow);

      // Use requestAnimationFrame to ensure smooth animation
      requestAnimationFrame(() => {
        setOpenModal(true);
      });
    } else {
      console.log(`Navigate to ${page} page`);
      // Add your navigation logic here for other pages
    }
  };

  // Memoized function to check if we need to animate TagRows inside a slide
  const shouldAnimateTagRows = useCallback(
    (slideType: keyof typeof initialAnimationCompletedRef.current) => {
      // If we've already animated this slide once, don't animate the internal rows
      if (initialAnimationCompletedRef.current[slideType]) {
        return false;
      }

      // If the slide is not loading, mark it as animated and allow animation this time
      if (!loadingStates[slideType]) {
        initialAnimationCompletedRef.current[slideType] = true;
        return true;
      }

      // Otherwise, don't animate
      return false;
    },
    [loadingStates]
  );

  // Create a single tag row with proper height settings and animation
  const TagRow = ({
    direction,
    pageType,
    tagType,
    offset,
    shouldLinkToMentions = false,
    index = 0,
    slideType,
  }: {
    direction: 'forward' | 'reverse';
    pageType?: string;
    tagType?: string;
    offset: number;
    shouldLinkToMentions?: boolean;
    index?: number;
    slideType: keyof typeof initialAnimationCompletedRef.current;
  }) => {
    // Determine if this row should have its entrance animation
    const shouldAnimate = shouldAnimateTagRows(slideType);

    // Create a unique key for this specific row
    const rowKey = `${slideType}-${direction}-${offset}`;

    // Check if this row has already been rendered
    // If not in ref yet, add it and set to true (should animate entrance)
    if (tagRowsRef.current[rowKey] === undefined) {
      tagRowsRef.current[rowKey] = true;
    }

    // Keep the TagsList stable by using a key
    const tagsKey = `tags-${rowKey}`;

    return (
      <motion.div
        className="index_customerGroups"
        style={{
          minHeight: '45px',
          position: 'relative',
        }}
        variants={rowVariants}
        initial={shouldAnimate ? 'hidden' : 'visible'}
        animate="visible"
        custom={index}
        whileHover={{
          scale: 1.01,
          transition: { duration: 0.2 },
        }}
        // Use a stable key so it doesn't remount
        key={rowKey}
      >
        <div
          className={`index_customerGroupWrapper ${
            direction === 'reverse' ? 'index_reverse' : ''
          }`}
          style={{ position: 'relative', height: '100%' }}
        >
          <div className="index_customerGroup">
            <div className="index_customerItem__rvamt Tag_tagContainer__to97L">
              <TagsList
                key={tagsKey}
                infoPageType={pageType}
                tagType={tagType}
                limit={15}
                offset={offset}
                disableTooltip={true}
                disablePopularityHover={true}
                shouldLinkToMentions={shouldLinkToMentions}
              />
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // Optimized component for inline tags display with minimal animations
  const ModalTagsDisplay = ({ tagType }) => {
    const [tags, setTags] = useState([]);
    const containerRef = useRef(null);

    // Load all tags at once
    useEffect(() => {
      // Simulate loading all tags inline
      const loadAllTags = async () => {
        try {
          // For now, we'll just use the TagsList component with a very high limit
          setTags([tagType]); // Just a placeholder to trigger rendering
        } catch (error) {
          console.error('Error loading tags:', error);
        }
      };

      if (openModal) {
        loadAllTags();
      }
    }, [tagType, openModal]);

    return (
      <motion.div
        ref={containerRef}
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Display all tags inline with a very high limit */}
        <TagsList
          tagType={tagType}
          infoPageType={
            tagType === 'domain' || tagType === 'foresight method'
              ? undefined
              : tagType
          }
          limit={500} // Very high limit to get all tags
          offset={0}
          disableTooltip={true} // Better performance
          disablePopularityHover={true} // Better performance
          shouldLinkToMentions={true}
        />
      </motion.div>
    );
  };

  // Memoize slides to prevent rebuilding them on every render
  // But allow for proper slide animations during slide changes
  const slides = useMemo(
    () => [
      // Slide 1: Projects
      <motion.div
        key="slide-1"
        className="flex flex-col h-full w-full p-2 space-y-2 sliderWrap"
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <TagRow
          direction="forward"
          pageType="project"
          offset={0}
          index={0}
          slideType="projects"
        />
        <TagRow
          direction="reverse"
          pageType="project"
          offset={15}
          index={1}
          slideType="projects"
        />
        <TagRow
          direction="forward"
          pageType="project"
          offset={30}
          index={2}
          slideType="projects"
        />
        <TagRow
          direction="reverse"
          pageType="project"
          offset={45}
          index={3}
          slideType="projects"
        />
        <TagRow
          direction="forward"
          pageType="project"
          offset={60}
          index={4}
          slideType="projects"
        />
      </motion.div>,

      // Slide 2: Organizations
      <motion.div
        key="slide-2"
        className="flex flex-col h-full w-full p-2 space-y-2 sliderWrap"
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <TagRow
          direction="forward"
          pageType="organisation"
          offset={0}
          index={0}
          slideType="organisations"
        />
        <TagRow
          direction="reverse"
          pageType="organisation"
          offset={15}
          index={1}
          slideType="organisations"
        />
        <TagRow
          direction="forward"
          pageType="organisation"
          offset={30}
          index={2}
          slideType="organisations"
        />
        <TagRow
          direction="reverse"
          pageType="organisation"
          offset={45}
          index={3}
          slideType="organisations"
        />
        <TagRow
          direction="forward"
          pageType="organisation"
          offset={60}
          index={4}
          slideType="organisations"
        />
      </motion.div>,

      // Slide 3: Persons
      <motion.div
        key="slide-3"
        className="flex flex-col h-full w-full p-2 space-y-2 sliderWrap"
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <TagRow
          direction="forward"
          pageType="person"
          offset={0}
          index={0}
          slideType="persons"
        />
        <TagRow
          direction="reverse"
          pageType="person"
          offset={15}
          index={1}
          slideType="persons"
        />
        <TagRow
          direction="forward"
          pageType="person"
          offset={30}
          index={2}
          slideType="persons"
        />
        <TagRow
          direction="reverse"
          pageType="person"
          offset={45}
          index={3}
          slideType="persons"
        />
        <TagRow
          direction="forward"
          pageType="person"
          offset={60}
          index={4}
          slideType="persons"
        />
      </motion.div>,

      // Slide 4: Domains
      <motion.div
        key="slide-4"
        className="flex flex-col h-full w-full p-2 space-y-2 sliderWrap"
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <TagRow
          direction="forward"
          tagType="domain"
          offset={0}
          shouldLinkToMentions={true}
          index={0}
          slideType="domains"
        />
        <TagRow
          direction="reverse"
          tagType="domain"
          offset={15}
          shouldLinkToMentions={true}
          index={1}
          slideType="domains"
        />
        <TagRow
          direction="forward"
          tagType="domain"
          offset={30}
          shouldLinkToMentions={true}
          index={2}
          slideType="domains"
        />
        <TagRow
          direction="reverse"
          tagType="domain"
          offset={45}
          shouldLinkToMentions={true}
          index={3}
          slideType="domains"
        />
        <TagRow
          direction="forward"
          tagType="domain"
          offset={60}
          shouldLinkToMentions={true}
          index={4}
          slideType="domains"
        />
      </motion.div>,

      // Slide 5: Foresight Methods
      <motion.div
        key="slide-5"
        className="flex flex-col h-full w-full p-2 space-y-2 sliderWrap"
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <TagRow
          direction="forward"
          tagType="foresight method"
          offset={0}
          shouldLinkToMentions={true}
          index={0}
          slideType="methods"
        />
        <TagRow
          direction="reverse"
          tagType="foresight method"
          offset={15}
          shouldLinkToMentions={true}
          index={1}
          slideType="methods"
        />
        <TagRow
          direction="forward"
          tagType="foresight method"
          offset={30}
          shouldLinkToMentions={true}
          index={2}
          slideType="methods"
        />
        <TagRow
          direction="reverse"
          tagType="foresight method"
          offset={45}
          shouldLinkToMentions={true}
          index={3}
          slideType="methods"
        />
        <TagRow
          direction="forward"
          tagType="foresight method"
          offset={60}
          shouldLinkToMentions={true}
          index={4}
          slideType="methods"
        />
      </motion.div>,
    ],
    [shouldAnimateTagRows]
  );

  // Slide titles and their corresponding page links
  const slideInfo = [
    { title: 'Project', pageLink: 'projects' },
    { title: 'Organization', pageLink: 'organisations' },
    { title: 'People', pageLink: 'people' },
    { title: 'Domain', pageLink: 'domains' },
    { title: 'Foresight Method', pageLink: 'methods' },
  ];

  // Get the appropriate title for the modal based on modalType
  const getModalTitle = () => {
    switch (modalType) {
      case 'domain':
        return 'All Domains';
      case 'foresight method':
        return 'All Foresight Methods';
      case 'project':
        return 'All Projects';
      case 'organisation':
        return 'All Organizations';
      case 'person':
        return 'All People';
      default:
        return 'All Items';
    }
  };

  return (
    <div
      className="w-full Container_wrapper index_customers z-0"
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative h-96 rounded-xl ">
        {/* Slide background gradient that changes with each slide */}
        <motion.div
          className="absolute inset-0 z-0 opacity-0 blur-3"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${THEME_COLOR} 0%, transparent 0%)`,
          }}
          animate={{
            opacity: [0.05, 0.15, 0.05],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />

        {/* Slide Content - Give it a bit more space at the bottom */}
        <div className="h-full pb-16" key="slides-container">
          <AnimatePresence mode="wait">{slides[currentSlide]}</AnimatePresence>
        </div>

        {/* Navigation Buttons with enhanced animations */}
        <motion.button
          onClick={prevSlide}
          className="absolute left-4 top-1/3 -translate-y-1/2 z-10 border-white/100 backdrop-blur-sm p-3 rounded-full shadow-md flex items-center justify-center border border-white/100"
          aria-label="Previous slide"
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 16L6 10L12 4"
              stroke={THEME_COLOR}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>

        <motion.button
          onClick={nextSlide}
          className="absolute right-4 top-1/3 -translate-y-1/2 z-10 border-white/100 backdrop-blur-sm p-3 rounded-full shadow-md flex items-center justify-center border border-white/100"
          aria-label="Next slide"
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 16L14 10L8 4"
              stroke={THEME_COLOR}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>

        {/* Bottom container for dots and title button */}
        <div className="absolute bottom-[-20px] left-0 right-0 flex flex-col items-center space-y-3 py-3">
          {/* Enhanced Indicators */}
          <div className="flex space-x-4">
            {slideInfo.map((info, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className="w-3 h-3 rounded-full border border-white/100"
                style={{
                  backgroundColor:
                    currentSlide === index ? THEME_COLOR : '#D1D5DB',
                }}
                variants={dotVariants}
                initial="inactive"
                animate={currentSlide === index ? 'active' : 'inactive'}
                whileHover={{ scale: 1.2 }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Title Button below dots */}
          <AnimatePresence mode="wait">
            <motion.button
              className="py-2 px-6 rounded-full bg-white/100 shadow-sm text-center border border-white/20 flex items-center"
              variants={titleButtonVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover="hover"
              whileTap="tap"
              key={`title-${currentSlide}`}
              onClick={() =>
                handleNavigateToPage(slideInfo[currentSlide].pageLink)
              }
            >
              <span
                className="text-sm font-medium"
                style={{ color: THEME_COLOR }}
              >
                See all {slideInfo[currentSlide].title} tags
              </span>
              <svg
                className="ml-1 w-4 h-4"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: THEME_COLOR }}
              >
                <path
                  d="M4.5 10H15.5M15.5 10L10.5 5M15.5 10L10.5 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          </AnimatePresence>
        </div>
      </div>

      {/* Flowbite Modal with custom styling */}
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        size="4xl"
        position="center"
        className="backdrop-blur-md"
      >
        <Modal.Header className="!p-6 border-b border-gray-200/50 rounded-t-lg bg-white/70 backdrop-blur-md">
          <h3 className="text-xl font-semibold" style={{ color: THEME_COLOR }}>
            {getModalTitle()}
          </h3>
        </Modal.Header>

        <Modal.Body className="relative !p-0 bg-white/70 backdrop-blur-md">
          {/* Top fade gradient */}
          <div
            className="absolute top-0 left-0 right-0 h-16 z-10 pointer-events-none modal-top-fade"
            aria-hidden="true"
          />

          {/* Bottom fade gradient */}
          <div
            className="absolute bottom-0 left-0 right-0 h-16 z-10 pointer-events-none modal-bottom-fade"
            aria-hidden="true"
          />

          {/* Content area with custom scrollbar */}
          <div
            className="overflow-y-auto overscroll-contain max-h-[calc(80vh-140px)] p-6 custom-scrollbar"
            style={{
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* Display all tags inline */}
            <ModalTagsDisplay tagType={modalType} />
          </div>
        </Modal.Body>

        <Modal.Footer className="!p-6 border-t border-gray-200/50 rounded-b-lg bg-white/70 backdrop-blur-md">
          <button
            className="text-white rounded-lg text-sm px-5 py-2.5 text-center transition-transform duration-200 hover:scale-105 active:scale-95"
            style={{ backgroundColor: THEME_COLOR }}
            onClick={() => setOpenModal(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TagsCarousel;
