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
    const content = await builder
      .get(model, {
        userAttributes: options.userAttributes,
        query: options.query,
        limit: options.limit,
        offset: options.offset,
      })
      .toPromise();

    return content;
  } catch (error) {
    console.error(
      `Error fetching Builder.io content for model "${model}":`,
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
