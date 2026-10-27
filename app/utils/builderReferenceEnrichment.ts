/**
 * Server-side reference enrichment for Redis cache writes.
 *
 * Builder.io Write API responses (and reads made straight after a write) only
 * contain `{ "@type": "@builder.io/core:Reference", id, model }` for tag
 * references. Info pages render tags by name and picture, so an entry cached in
 * that shape shows up as empty tags. This fills in `value` for tag references
 * from the cached tag list, which is the same data Builder would have returned
 * with `enrich: true`.
 */

import { RedisCacheService } from "@app/services/redisCache";
import { getAllBuilderContent } from "@app/shared-components/Builder/builderUtils";

const RAW_TAGS_CACHE_KEY = "builder-tags-raw_builder.json";
const WIX_TAGS_CACHE_KEY = "tags_builder.json";

type TagLookup = Map<string, any>;

async function loadTagLookup(): Promise<TagLookup> {
  const lookup: TagLookup = new Map();

  const rawTags = await RedisCacheService.getFromCache(RAW_TAGS_CACHE_KEY);
  if (Array.isArray(rawTags) && rawTags.length > 0) {
    for (const tag of rawTags) {
      if (tag?.id) lookup.set(tag.id, tag);
    }
    return lookup;
  }

  const wixTags = await RedisCacheService.getFromCache(WIX_TAGS_CACHE_KEY);
  if (Array.isArray(wixTags)) {
    for (const tag of wixTags) {
      if (!tag?._id) continue;
      const { _id, mentions, ...data } = tag;
      lookup.set(_id, { id: _id, name: tag.name, data });
    }
  }
  return lookup;
}

function enrichValue(value: any, tags: TagLookup): any {
  if (Array.isArray(value)) {
    return value.map((item) => enrichValue(item, tags));
  }
  if (!value || typeof value !== "object") {
    return value;
  }

  if (
    value["@type"] === "@builder.io/core:Reference" &&
    value.model === "tag" &&
    !value.value
  ) {
    const tag = tags.get(value.id);
    return tag ? { ...value, value: tag } : value;
  }

  const result: any = {};
  for (const [key, child] of Object.entries(value)) {
    result[key] = enrichValue(child, tags);
  }
  return result;
}

/**
 * Returns a copy of `entry` where every unresolved tag reference carries the
 * cached tag as its `value`. Unknown tags and non-tag references are left as-is.
 */
export async function enrichTagReferences<T>(entry: T): Promise<T> {
  if (!entry) return entry;
  try {
    const tags = await loadTagLookup();
    if (tags.size === 0) return entry;
    return enrichValue(entry, tags);
  } catch (error) {
    console.warn("[Builder.io] Could not enrich tag references:", error);
    return entry;
  }
}

/**
 * Returns the entry that was just written, with tag references resolved, so it
 * can be cached. Reads it back from Builder.io first; if Builder.io doesn't
 * serve it yet (this has been seen in production for several seconds after a
 * write), falls back to the Write API response enriched from the tag cache.
 * Never returns null for a successful write, so the cache is always updated.
 */
export async function getEntryForCacheAfterWrite(
  model: string,
  writeResult: any,
): Promise<any> {
  const MAX_ATTEMPTS = 3;
  const RETRY_DELAY_MS = 1000;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS && writeResult?.id; attempt++) {
    try {
      if (attempt > 1) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      }
      const entries = await getAllBuilderContent(model, {
        query: { id: writeResult.id },
        limit: 1,
      });
      if (entries?.[0]) {
        return enrichTagReferences(entries[0]);
      }
    } catch (error) {
      console.warn(
        `[Builder.io] Read-back attempt ${attempt} for ${model} ${writeResult.id} failed:`,
        error,
      );
    }
  }

  console.warn(
    `[Builder.io] ${model} ${writeResult?.id} not readable yet, caching the Write API response`,
  );
  return enrichTagReferences(writeResult);
}

/**
 * Inserts `entry` into the cached array under `cacheKey`, replacing any entry
 * with the same id. Does nothing when the cache is empty, so the next read
 * rebuilds it from Builder.io.
 */
export async function upsertCachedEntry(
  cacheKey: string,
  entry: any,
  ttl: number,
): Promise<void> {
  const entryId = entry?.id || entry?._id;
  if (!entryId) return;

  const cached = await RedisCacheService.getFromCache(cacheKey);
  if (!Array.isArray(cached) || cached.length === 0) return;

  const index = cached.findIndex((item: any) => (item?.id || item?._id) === entryId);
  if (index === -1) {
    cached.push(entry);
  } else {
    cached[index] = entry;
  }
  await RedisCacheService.saveToCache(cacheKey, cached, ttl);
}
