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
  options: BuilderContentOptions = {}
) {
  try {
    console.log(`[Builder.io] Fetching content for model: "${model}"`);
    console.log(
      `[Builder.io] API Key configured: ${builderConfig.apiKey ? "Yes" : "No"}`
    );
    console.log(`[Builder.io] Options:`, options);

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

    console.log(
      `[Builder.io] Content fetched for "${model}":`,
      content ? "Found" : "Not found"
    );
    if (content) {
      console.log(`[Builder.io] Content ID:`, content.id);
      console.log(`[Builder.io] Content name:`, content.name);
    }

    return content;
  } catch (error) {
    console.error(
      `[Builder.io] Error fetching content for model "${model}":`,
      error
    );
    return null;
  }
}

export async function getBuilderContentByUrl(
  model: string,
  url: string,
  options: BuilderContentOptions = {}
) {
  try {
    const content = await builder
      .get(model, {
        url,
        userAttributes: options.userAttributes,
        query: options.query,
      })
      .toPromise();

    return content;
  } catch (error) {
    console.error(`Error fetching Builder.io content for URL "${url}":`, error);
    return null;
  }
}

export async function getAllBuilderContent(
  model: string,
  options: BuilderContentOptions = {}
) {
  try {
    const content = await builder.getAll(model, {
      userAttributes: options.userAttributes,
      query: options.query,
      limit: options.limit || 50,
      offset: options.offset || 0,
      options: {
        includeRefs: true, // Ensure references are enriched
      },
    });

    return content;
  } catch (error) {
    console.error(
      `Error fetching all Builder.io content for model "${model}":`,
      error
    );
    return [];
  }
}
