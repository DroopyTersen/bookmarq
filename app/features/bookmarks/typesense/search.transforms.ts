import dayjs from "dayjs";
import {
  GetBookmarkByIdWithEmbeddingQuery,
  GetBookmarksByCollectionForSearchImportQuery,
} from "~/.gql/graphql.types";
import {
  BookmarkSearchDocument,
  EmbeddingSearchDocument,
} from "./search.schema";

export type BookmarkForImport =
  GetBookmarksByCollectionForSearchImportQuery["bookmarks"][number];

export type BookmarkWithEmbedding =
  GetBookmarkByIdWithEmbeddingQuery["bookmark"];

export const toEmbeddingSearchDocs = (
  bookmark: BookmarkWithEmbedding,
  searchDoc: BookmarkSearchDocument | null
) => {
  if (!bookmark) {
    return [];
  }
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

  return embeddingDocs;
};

export const toBookmarkSearchDocument = (
  dbItem: BookmarkForImport | BookmarkWithEmbedding
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
