"use client";
import React from "react";
import style from "./MiniPagesListItemPost.module.css";
import classNames from "classnames";
import Typography from "@app/shared-components/Typography/Typography";
import MiniPagePost from "@app/shared-components/MiniPagePost/MiniPagePost";
import Link from "next/link";
import { getPropsForMiniPagesListItemPost } from "./MiniPagesListItemPost.utils";

enum PageType {
  ProjectInfo = "project info",
  Event = "event",
  ProjectResult = "project result",
  OrganisationInfo = "organisation info",
  PersonInfo = "person info",
  Post = "post",
}

type SortConfigKey = PageType | "default";

interface PageTypeTag {
  name: string;
  _id?: string;
  tagId?: number;
  tagType?: string;
}

interface Item {
  pageTypes?: PageTypeTag[];
  _createdDate?: { $date?: string } | string;
  title?: string;
  slug?: string;
  [key: string]: any;
}

interface PageTypeSortConfig {
  sortField: string;
  fallbackField: string;
  priority: number;
}

const isValidDate = (date: Date): boolean => {
  return date instanceof Date && !isNaN(date.getTime());
};

const parseDate = (value: unknown): Date | null => {
  if (!value) return null;

  try {
    if (typeof value === "object" && value !== null && "$date" in value) {
      const dateStr = (value as { $date?: string }).$date;
      if (!dateStr) return null;
      const date = new Date(dateStr);
      return isValidDate(date) ? date : null;
    }

    if (typeof value === "string") {
      const date = new Date(value);
      return isValidDate(date) ? date : null;
    }

    return null;
  } catch {
    return null;
  }
};

const PAGE_TYPE_SORT_CONFIG: Record<SortConfigKey, PageTypeSortConfig> = {
  [PageType.ProjectInfo]: {
    sortField: "projectStartDate",
    fallbackField: "_createdDate",
    priority: 3,
  },
  [PageType.Event]: {
    sortField: "eventStartDate",
    fallbackField: "_createdDate",
    priority: 3,
  },
  [PageType.ProjectResult]: {
    sortField: "projectResultPublicationDate",
    fallbackField: "_createdDate",
    priority: 3,
  },
  [PageType.OrganisationInfo]: {
    sortField: "createdDate",
    fallbackField: "createdDate",
    priority: 1,
  },
  [PageType.PersonInfo]: {
    sortField: "createdDate",
    fallbackField: "createdDate",
    priority: 1,
  },
  [PageType.Post]: {
    sortField: "lastUpdated",
    fallbackField: "createdDate",
    priority: 1,
  },
  default: {
    sortField: "lastUpdated",
    fallbackField: "createdDate",
    priority: 1,
  },
};

const memoizedGetSortConfig = (() => {
  const cache = new Map<string, PageTypeSortConfig>();

  return (pageTypeTag: PageTypeTag | undefined): PageTypeSortConfig => {
    const key = pageTypeTag?.name?.toLowerCase() ?? "default";
    if (!cache.has(key)) {
      cache.set(
        key,
        PAGE_TYPE_SORT_CONFIG[key as PageType] ||
          PAGE_TYPE_SORT_CONFIG["default"]
      );
    }
    return cache.get(key)!;
  };
})();

const getHighestPriorityConfig = (
  pageTypes: PageTypeTag[] | undefined
): PageTypeSortConfig => {
  if (!pageTypes?.length) return PAGE_TYPE_SORT_CONFIG["default"];

  return pageTypes
    .map((pt) => memoizedGetSortConfig(pt))
    .reduce(
      (prev, current) => (current.priority > prev.priority ? current : prev),
      PAGE_TYPE_SORT_CONFIG["default"]
    );
};

interface SortableItem extends Item {
  sortDate: number;
  sortPriority: number;
  pageType: string;
  hasPrimaryDate: boolean;
  hasFallbackDate: boolean;
}

const prepareSortableItems = (items: Item[]): SortableItem[] => {
  return items.map((item) => {
    const pageType = item.pageTypes?.[0]?.name?.toLowerCase() ?? "default";
    const config = getHighestPriorityConfig(item.pageTypes);

    // Helper to get nested value from dot notation string
    const getNestedValue = (obj: any, path: string) => {
      // Direct access first (fast path)
      if (path in obj) return obj[path];
      
      // Fallback for nested access if needed
      return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };

    // Check for primary date - look in item or item.data
    let primaryDate = parseDate(getNestedValue(item, config.sortField));
    if (!primaryDate && item.data) {
      primaryDate = parseDate(getNestedValue(item.data, config.sortField));
    }
    // Also check for direct number timestamp (Builder.io format)
    if (!primaryDate) {
      const val = getNestedValue(item, config.sortField);
      if (typeof val === 'number') primaryDate = new Date(val);
    }
    if (!primaryDate && item.data) {
      const val = getNestedValue(item.data, config.sortField);
      if (typeof val === 'number') primaryDate = new Date(val);
    }

    const hasPrimaryDate = primaryDate !== null && primaryDate !== undefined;

    // Check for fallback date - look in item or item.data
    let fallbackDate = parseDate(getNestedValue(item, config.fallbackField));
    if (!fallbackDate && item.data) {
      fallbackDate = parseDate(getNestedValue(item.data, config.fallbackField));
    }
    // Also check for direct number timestamp (Builder.io format)
    if (!fallbackDate) {
      const val = getNestedValue(item, config.fallbackField);
      if (typeof val === 'number') fallbackDate = new Date(val);
    }
    if (!fallbackDate && item.data) {
      const val = getNestedValue(item.data, config.fallbackField);
      if (typeof val === 'number') fallbackDate = new Date(val);
    }

    const hasFallbackDate = fallbackDate !== null && fallbackDate !== undefined;
    // Determine final sort date
    const sortDate = (primaryDate || fallbackDate || new Date(0)).getTime();

    // Debug logging for troubleshooting sort issues
    // if (item.title === "test post 222" || item.title === "Meet the NGFP 2026 Fellows") {
    //   console.log("Sort Debug:", {
    //     title: item.title,
    //     pageType,
    //     sortField: config.sortField,
    //     primaryDate,
    //     fallbackDate,
    //     sortDate,
    //     hasPrimaryDate,
    //     hasFallbackDate
    //   });
    // }

    return {
      ...item,
      sortDate,
      sortPriority: config.priority,
      pageType,
      hasPrimaryDate,
      hasFallbackDate,
    };
  });
};

const stableSort = <T,>(array: T[], compare: (a: T, b: T) => number): T[] => {
  return array
    .map((item, index) => ({ item, index }))
    .sort((a, b) => compare(a.item, b.item) || a.index - b.index)
    .map(({ item }) => item);
};

const sortItemsByPageType = (items: Item[]): Item[] => {
  try {
    const sortableItems = prepareSortableItems(items);
    const today = new Date();

    return stableSort(sortableItems, (a, b) => {
      // First, compare page types if they're different
      if (a.pageType !== b.pageType) {
        // Only return if the priorities are actually different
        const priorityDiff = b.sortPriority - a.sortPriority;
        if (priorityDiff !== 0) {
          return priorityDiff;
        }
        // If priorities are the same (e.g. post vs default), continue to sort by date
      }

      // Prioritize event sorting
      if (
        a.pageType === PageType.Event.toLowerCase() &&
        b.pageType === PageType.Event.toLowerCase()
      ) {
        const aDate = new Date(a.sortDate);
        const bDate = new Date(b.sortDate);

        const aIsCurrentOrFuture = aDate >= today;
        const bIsCurrentOrFuture = bDate >= today;

        // Prioritize current and future events
        if (aIsCurrentOrFuture && !bIsCurrentOrFuture) return -1;
        if (!aIsCurrentOrFuture && bIsCurrentOrFuture) return 1;

        // For current/future events, sort from nearest to furthest
        if (aIsCurrentOrFuture && bIsCurrentOrFuture) {
          return aDate.getTime() - bDate.getTime();
        }

        // For past events, sort from most recent to oldest
        return bDate.getTime() - aDate.getTime();
      }

      // Special handling for project results
      if (a.pageType === PageType.ProjectResult.toLowerCase()) {
        // If one has a publication date and the other doesn't, prioritize the one with publication date
        if (a.hasPrimaryDate !== b.hasPrimaryDate) {
          return a.hasPrimaryDate ? -1 : 1;
        }

        // If both have publication dates or both don't, sort by the respective dates
        if (a.hasPrimaryDate && b.hasPrimaryDate) {
          // Both have publication dates - sort by publication date
          return b.sortDate - a.sortDate;
        } else {
          // Neither has publication date - sort by created date
          const aCreatedDate = parseDate(a._createdDate)?.getTime() || 0;
          const bCreatedDate = parseDate(b._createdDate)?.getTime() || 0;
          return bCreatedDate - aCreatedDate;
        }
      }

      // For other page types
      // 1. Items with primary dates come first
      if (
        a.hasPrimaryDate !== b.hasPrimaryDate &&
        (a.pageType !== "post" || b.pageType !== "post") &&
        (a.pageType !== "default" || b.pageType !== "default")
      ) {
        return a.hasPrimaryDate ? -1 : 1;
      }

      // 2. For items that both have or both don't have primary dates,
      // sort by the actual date (whether primary or fallback)
      if (a.hasPrimaryDate === b.hasPrimaryDate) {
        return new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime();
      }

      // 3. If neither has a primary date, fall back to created date
      if (!a.hasPrimaryDate && !b.hasPrimaryDate) {
        return new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime();
      }
      // For posts, we want to sort by the date (lastUpdated or createdDate) regardless of whether it's primary or fallback
      // This ensures that a recently updated post (primary date) is compared correctly against a newly created post (fallback date)
      if (
        a.pageType === "post" ||
        b.pageType === "post" ||
        a.pageType === "default" ||
        b.pageType === "default"
      ) {
        // Sort DESCENDING (newest first)
        return new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime();
      }
      return 0;
    });
  } catch (error) {
    console.error("Error sorting items:", error);
    return items;
  }
};

export interface MiniPagesListItemPostProps {
  items: Item[];
  title?: string;
  hideTitle?: boolean;
  pageTypePath?: "post" | "project" | "person" | "organisation";
  automaticallyCalculatePath?: boolean;
  manualSort?: boolean;
}

const MiniPagesListItemPost: React.FC<MiniPagesListItemPostProps> = ({
  items,
  title = "Internal Links",
  hideTitle,
  manualSort,
}) => {
  const sortedItems = manualSort ? items : sortItemsByPageType(items);

  return (
    <section className={classNames(style.posts)}>
      {!hideTitle && (
        <Typography
          tag="h2"
          className={classNames("text-gray-800 w-full my-4", style.title)}
        >
          {title}
        </Typography>
      )}
      {sortedItems.map((item, index) => (
        <Link
          key={`${item?.title}-${item?._id || index}`}
          href={item.slug || ""}
        >
          <MiniPagePost {...getPropsForMiniPagesListItemPost(item)} />
        </Link>
      ))}
    </section>
  );
};

export default MiniPagesListItemPost;
