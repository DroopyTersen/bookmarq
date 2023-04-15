import type { TypesenseCollectionSchema } from "droopy-typesense";
import { createTypesenseClient, createTypesenseRepo } from "droopy-typesense";
import { getEnvVar } from "~/toolkit/remix/envVars.server";
import { bookmarkSearchFields, embeddingSearchFields } from "./search.schema";

export const createSearchService = (collectionId: string) => {
  const bookmarksSchema = {
    name: `bookmarks_${collectionId}`,
    fields: bookmarkSearchFields,
    default_sorting_field: "createdAt",
  } satisfies TypesenseCollectionSchema;

  const embeddingsSchema = {
    name: `embeddings_${collectionId}`,
    fields: embeddingSearchFields,
  };
  let client = createTypesenseClient({
    apiKey: getEnvVar("TYPESENSE_API_KEY"),
    url: getEnvVar("TYPESENSE_URL"),
  });
  let bookmarks = createTypesenseRepo(client, bookmarksSchema);
  let embeddings = createTypesenseRepo(client, embeddingsSchema);

  return {
    _client: client,
    bookmarks,
    embeddings,
  };
};
