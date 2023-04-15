import {
  DeleteBookmarkDocument,
  GetBookmarkByIdDocument,
  GetBookmarkByIdWithEmbeddingDocument,
  GetBookmarkByIdWithEmbeddingQuery,
  GetBookmarksByCollectionDocument,
  GetBookmarksCountByCollectionDocument,
  SaveBookmarkDocument,
  SaveBookmarkMutationVariables,
} from "~/.gql/graphql.types";
import { GqlClient } from "~/toolkit/http/createGqlClient";

export type BookmarkFullInput = SaveBookmarkMutationVariables["input"];

export type BookmarkWithEmbeddings =
  GetBookmarkByIdWithEmbeddingQuery["bookmark"];

export const createBookmarksDBService = (gqlClient: GqlClient) => ({
  getBookmarksByCollection: async (collectionId: string, limit = 1000) => {
    let data = await gqlClient.request(GetBookmarksByCollectionDocument, {
      collectionId,
      limit,
    });
    return data?.bookmarks;
  },
  getBookmarksByCollectionCount: async (collectionId: string) => {
    let data = await gqlClient.request(GetBookmarksCountByCollectionDocument, {
      collectionId,
    });
    return data?.bookmarksAggregate?.aggregate?.count;
  },
  saveBookmark: async (input: BookmarkFullInput) => {
    let data = await gqlClient.request(SaveBookmarkDocument, { input });
    return data?.bookmark;
  },
  getBookmarkById: async (bookmarkId: string) => {
    let data = await gqlClient.request(GetBookmarkByIdDocument, {
      id: bookmarkId,
    });
    return data?.bookmark;
  },
  getBookmarkWithEmbeddings: async (bookmarkId: string) => {
    let data = await gqlClient.request(GetBookmarkByIdWithEmbeddingDocument, {
      id: bookmarkId,
    });
    return data?.bookmark || null;
  },
  deleteBookmark: async (bookmarkId: string) => {
    let data = await gqlClient.request(DeleteBookmarkDocument, {
      id: bookmarkId,
    });

    return data?.bookmark;
  },
});
