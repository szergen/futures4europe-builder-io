import { builder } from "@builder.io/sdk";
import { builderConfig } from "../../../builder.config";

// Initialize the SDK for server-side usage
if (builderConfig.apiKey) {
  builder.init(builderConfig.apiKey);
}

export interface BuilderContentOptions {
  userAttributes?: Record<string, any>;
  query?: Record<string, any>;
  limit?: number;
  offset?: number;
}

export async function getBuilderContent(
  model: string,
  options: BuilderContentOptions = {},
) {
  try {
    // console.log(`[Builder.io] Fetching content for model: "${model}"`);
    // console.log(
    //   `[Builder.io] API Key configured: ${builderConfig.apiKey ? "Yes" : "No"}`
    // );
    // console.log(`[Builder.io] Options:`, options);

    const content = await builder
      .get(model, {
        userAttributes: options.userAttributes,
        query: options.query,
        limit: options.limit,
        offset: options.offset,
        enrich: true,
        cachebust: true, // Disable SDK caching for fresh data
        options: {
          includeRefs: true, // Ensure references are enriched
        },
      })
      .toPromise();

    // console.log(
    //   `[Builder.io] Content fetched for "${model}":`,
    //   content ? "Found" : "Not found"
    // );
    // if (content) {
    //   console.log(`[Builder.io] Content ID:`, content.id);
    //   console.log(`[Builder.io] Content name:`, content.name);
    // }

    return content;
  } catch (error) {
    console.error(
      `[Builder.io] Error fetching content for model "${model}":`,
      error,
    );
    return null;
  }
}

export async function getBuilderContentByUrl(
  model: string,
  url: string,
  options: BuilderContentOptions = {},
) {
  try {
    const content = await builder
      .get(model, {
        url,
        userAttributes: options.userAttributes,
        query: options.query,
        cachebust: true,
      })
      .toPromise();

    return content;
  } catch (error) {
    console.error(`Error fetching Builder.io content for URL "${url}":`, error);
    return null;
  }
}

const CONTENT_API_URL = "https://cdn.builder.io/api/v3/content";
const RETRY_STATUSES = [429, 500, 502, 503, 504];
const MAX_ATTEMPTS = 3;

// Same flattening as the SDK: nested keys become dot paths, objects holding
// Mongo operators ($regex, $in, ...) are kept whole.
function flattenQuery(
  value: Record<string, any>,
  prefix = "query",
  result: Record<string, string> = {},
) {
  for (const [key, child] of Object.entries(value)) {
    const path = `${prefix}.${key}`;
    if (
      child &&
      typeof child === "object" &&
      !Array.isArray(child) &&
      !Object.keys(child).some((childKey) => childKey.startsWith("$"))
    ) {
      flattenQuery(child, path, result);
    } else {
      result[path] = JSON.stringify(child);
    }
  }
  return result;
}

/**
 * Lists content straight from the Content API instead of `builder.getAll`.
 * The SDK resolves to an empty list when Builder.io answers with an error
 * (rate limits included), and its requests go through Next.js' fetch cache.
 * Either way callers saw "no content" and cached that.
 */
async function fetchBuilderContentList(
  model: string,
  options: BuilderContentOptions,
): Promise<any[]> {
  const params = new URLSearchParams({
    apiKey: builderConfig.apiKey || "",
    limit: String(options.limit || 50),
    offset: String(options.offset || 0),
    cachebust: "true",
    enrich: "true",
    includeRefs: "true",
    noTargeting: "true",
    noTraverse: "true",
    omit: "meta.componentsUsed",
  });
  if (options.userAttributes) {
    params.set("userAttributes", JSON.stringify(options.userAttributes));
  }
  for (const [key, value] of Object.entries(flattenQuery(options.query || {}))) {
    params.set(key, value);
  }

  const url = `${CONTENT_API_URL}/${model}?${params.toString()}`;
  for (let attempt = 1; ; attempt++) {
    const response = await fetch(url, { cache: "no-store" });
    if (response.ok) {
      const body = await response.json();
      return Array.isArray(body?.results) ? body.results : [];
    }
    if (!RETRY_STATUSES.includes(response.status) || attempt >= MAX_ATTEMPTS) {
      throw new Error(
        `Builder.io content API ${response.status} for "${model}": ${(
          await response.text()
        ).slice(0, 200)}`,
      );
    }
    console.warn(
      `[Builder.io] ${response.status} listing "${model}", retry ${attempt}/${MAX_ATTEMPTS - 1}`,
    );
    await new Promise((resolve) => setTimeout(resolve, 500 * 2 ** (attempt - 1)));
  }
}

/**
 * Fetches every entry of a model, page by page. Throws if any page fails, so a
 * partial or empty list is never mistaken for the full content and cached.
 */
export async function getEveryBuilderEntry(
  model: string,
  pageSize = 100,
): Promise<any[]> {
  const entries: any[] = [];
  for (let offset = 0; ; offset += pageSize) {
    const page = await fetchBuilderContentList(model, { limit: pageSize, offset });
    entries.push(...page);
    if (page.length < pageSize) return entries;
  }
}

export async function getAllBuilderContent(
  model: string,
  options: BuilderContentOptions = {},
) {
  try {
    return await fetchBuilderContentList(model, options);
  } catch (error) {
    console.error(
      `Error fetching all Builder.io content for model "${model}":`,
      error,
    );
    return [];
  }
}
