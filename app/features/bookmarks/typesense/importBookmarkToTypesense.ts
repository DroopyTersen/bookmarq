import dayjs from "dayjs";
import {
  GetBookmarkByIdWithEmbeddingQuery,
  GetBookmarksByCollectionForSearchImportQuery,
} from "~/.gql/graphql.types";
import { createSearchService } from "./createSearchService";
import {
  BookmarkSearchDocument,
  EmbeddingSearchDocument,
} from "./search.schema";

type BookmarkWithEmbedding = GetBookmarkByIdWithEmbeddingQuery["bookmark"];

export const importBookmarkToTypesense = async (
  bookmark: BookmarkWithEmbedding
) => {
  if (!bookmark) {
    return;
  }
  let searchService = await createSearchService(bookmark.collectionId);
  let searchDoc = toBookmarkSearchDocument(bookmark);
  let embeddingDocs: EmbeddingSearchDocument[] = bookmark.embeddings?.map(
    (chunk) => ({
      id: chunk.id,
      bookmark_id: bookmark.id,
      chunk_index: chunk.chunkIndex,
      chunk: chunk.chunk,
      embedding: chunk.embedding,
      bookark: searchDoc || {},
    })
  );
  await Promise.all([
    searchDoc
      ? searchService.bookmarks.importDocuments([searchDoc])
      : Promise.resolve(),
    embeddingDocs?.length
      ? searchService.embeddings.importDocuments(embeddingDocs)
      : Promise.resolve(),
  ]);
};
type BookmarkFromDb =
  GetBookmarksByCollectionForSearchImportQuery["bookmarks"][number];

// export const toEmbeddingSearchDocument = (chunkEmbedding, bookmark) => {

// }
export const toBookmarkSearchDocument = (
  dbItem: BookmarkFromDb | BookmarkWithEmbedding
): BookmarkSearchDocument | null => {
  try {
    if (!dbItem) {
      return null;
    }

    let url = new URL(dbItem.url);

    let document: BookmarkSearchDocument = {
      id: dbItem.id,
      title: dbItem.title || "",
      description: dbItem.description || "",
      text: dbItem.text || "",
      host: url.host,
      createdBy: dbItem.createdBy?.name || dbItem.createdBy?.email || "",
      createdAt: dayjs(dbItem.createdAt).unix(),
      url: dbItem.url,
      image: dbItem.image || "",
    };

    return document;
  } catch (err: any) {
    console.log("🚀 | toTypesenseDocument | err", err.message);
    console.log(JSON.stringify(dbItem, null, 2));
    return null;
  }
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
