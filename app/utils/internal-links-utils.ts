/**
 * Helpers for "Content related to this page" links.
 *
 * Links are stored in Builder.io as `{ internalLinksItem: Reference }` to a
 * post-page. In page state they are kept as post data objects with `_id`,
 * which is what the save path turns back into references.
 */

const SITE_HOSTS = ["futures4europe.eu"];

export const INTERNAL_LINK_ERRORS = {
  empty: "The link cannot be empty.",
  invalid: "This doesn't look like a valid link.",
  external:
    "Only pages on futures4europe.eu can be linked here. Add links to other websites in the text of the page or under Files.",
  notAPost:
    "Only posts, events, project results and other /post/ pages can be linked here.",
  notFound: "We couldn't find a post at this address.",
  duplicate: "This post is already linked.",
};

const normaliseHost = (host: string) => host.toLowerCase().replace(/^www\./, "");

export const normalisePostPath = (path?: string): string => {
  if (!path) return "";
  let value = path.split(/[?#]/)[0].trim();
  try {
    value = decodeURIComponent(value);
  } catch {
    // Keep the raw value when it isn't valid percent-encoding.
  }
  if (!value.startsWith("/")) value = `/${value}`;
  return value.replace(/\/+$/, "").toLowerCase();
};

/**
 * Accepts a full URL (https://www.futures4europe.eu/post/...), a URL without
 * protocol (futures4europe.eu/post/...) or a relative path (/post/... or
 * post/...), and returns the normalised /post/ path or an error message.
 */
export function parseInternalLinkInput(
  input: string,
  currentHost?: string,
): { path: string; error?: undefined } | { path?: undefined; error: string } {
  const value = input.trim();
  if (!value) return { error: INTERNAL_LINK_ERRORS.empty };

  let path = value;
  const looksLikeUrl =
    /^[a-z][a-z0-9+.-]*:\/\//i.test(value) ||
    value.startsWith("//") ||
    /^(www\.)?[a-z0-9-]+(\.[a-z0-9-]+)+(:\d+)?(\/|$)/i.test(value);

  if (looksLikeUrl) {
    let url: URL;
    try {
      url = new URL(
        /^[a-z][a-z0-9+.-]*:\/\//i.test(value)
          ? value
          : `https://${value.replace(/^\/\//, "")}`,
      );
    } catch {
      return { error: INTERNAL_LINK_ERRORS.invalid };
    }

    const allowedHosts = [...SITE_HOSTS];
    if (currentHost) allowedHosts.push(normaliseHost(currentHost));
    if (!allowedHosts.includes(normaliseHost(url.hostname))) {
      return { error: INTERNAL_LINK_ERRORS.external };
    }
    path = url.pathname;
  }

  const normalised = normalisePostPath(path);
  if (!normalised.startsWith("/post/") || normalised === "/post") {
    return { error: INTERNAL_LINK_ERRORS.notAPost };
  }
  return { path: normalised };
}

const getPostId = (page: any): string | undefined => page?.id || page?._id;

/** Finds the post at `path` in the cached post pages (raw or transformed). */
export function findPostByPath(postPages: any[] | undefined, path: string) {
  const page = postPages?.find(
    (postPage) => normalisePostPath(postPage?.data?.slug) === path,
  );
  return page ? { ...page.data, _id: getPostId(page) } : undefined;
}

/**
 * Converts stored links (Builder references, legacy Wix id strings or post
 * data objects) to post data objects with `_id`. References without data keep
 * only their `_id`, so saving the page doesn't drop them.
 */
export function normaliseInternalLinks(links?: any[]): any[] {
  if (!Array.isArray(links)) return [];
  return links
    .map((link) => {
      if (!link || typeof link !== "object") return null;
      const reference = link.internalLinksItem ?? link;
      if (reference?.["@type"] === "@builder.io/core:Reference") {
        return reference.id ? { _id: reference.id } : null;
      }
      return link._id ? link : null;
    })
    .filter(Boolean);
}

/** Fills in post data for links that only have an `_id`, using `postPages`. */
export function resolveInternalLinks(
  links: any[] | undefined,
  postPages: any[] | undefined,
): any[] {
  return normaliseInternalLinks(links)
    .map((link) => {
      if (link.slug && link.title) return link;
      const page = postPages?.find((postPage) => getPostId(postPage) === link._id);
      return page ? { ...page.data, _id: link._id } : null;
    })
    .filter(Boolean);
}

/** Concatenates link lists, keeping the first occurrence of each post. */
export function mergeRelatedContent(...lists: Array<any[] | undefined>): any[] {
  const seen = new Set<string>();
  const merged: any[] = [];
  for (const link of lists.flatMap((list) => list || [])) {
    const key = normalisePostPath(link?.slug) || link?._id;
    if (!key || seen.has(key)) continue;
    seen.add(key);
    merged.push(link);
  }
  return merged;
}
