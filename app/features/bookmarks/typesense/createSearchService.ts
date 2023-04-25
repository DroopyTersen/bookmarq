import type { TypesenseCollectionSchema } from "droopy-typesense";
import { createTypesenseClient, createTypesenseRepo } from "droopy-typesense";
import { getEnvVar } from "~/toolkit/remix/envVars.server";
import { BookmarkWithEmbeddings } from "../db/bookmarks.db";
import { bookmarkSearchFields, embeddingSearchFields } from "./search.schema";
import {
  toBookmarkSearchDocument,
  toEmbeddingSearchDocs,
} from "./search.transforms";

export const createSearchService = (collectionId: string) => {
  // Typesense client
  let client = createTypesenseClient({
    apiKey: getEnvVar("TYPESENSE_API_KEY"),
    url: getEnvVar("TYPESENSE_URL"),
  });

  // Bookmarks collection
  const bookmarksSchema = {
    name: `bookmarks_${collectionId}`,
    fields: bookmarkSearchFields,
    default_sorting_field: "createdAt",
  } satisfies TypesenseCollectionSchema;
  let bookmarks = createTypesenseRepo(client, bookmarksSchema);

  // Embeddings collection
  const embeddingsSchema = {
    name: `embeddings_${collectionId}`,
    fields: embeddingSearchFields,
  };
  let embeddings = createTypesenseRepo(client, embeddingsSchema);

  // Importers
  const importBookmarkWithEmbeddings = async (
    bookmark: BookmarkWithEmbeddings
  ) => {
    if (!bookmark) {
      return;
    }
    let searchDoc = toBookmarkSearchDocument(bookmark);
    let embeddingDocs = toEmbeddingSearchDocs(bookmark, searchDoc);
    await Promise.all([
      searchDoc ? bookmarks.importDocuments([searchDoc]) : Promise.resolve(),
      embeddingDocs?.length
        ? embeddings.importDocuments(embeddingDocs)
        : Promise.resolve(),
    ]);
  };

  // Public API
  return {
    _client: client,
    bookmarks,
    embeddings,
    importBookmarkWithEmbeddings,
  };
};

// export const fullCrawlForCollection = async (collectionId: string) => {
//   let adminClient = createAdminGqlClient();
//   let data = await adminClient.request(
//     GetBookmarksByCollectionForSearchImportDocument,
//     {
//       collectionId,
//     }
//   );
//   let searchService = await createSearchService(collectionId);
//   await searchService.bookmarks.deleteCollection();
//   await importSearchDocuments(collectionId, data.bookmarks);
//   let results = await searchService.bookmarks.search({
//     per_page: 1,
//   });

//   return {
//     found: results.found,
//     out_of: results.out_of,
//   };
// };
