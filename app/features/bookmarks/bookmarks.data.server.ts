import {
  BookmarksInsertInput,
  DeleteBookmarkDocument,
  GetBookmarkByIdDocument,
  GetBookmarksByCollectionDocument,
  GetBookmarksByUserDocument,
  GetBookmarksCountByCollectionDocument,
  InsertBookmarkDocument,
  InsertBookmarkMutationVariables,
} from "~/.gql/graphql.types";
import { GqlClient } from "~/toolkit/http/createGqlClient";
import { BookmarkSearchCriteria } from "./bookmarks.schema";
import { createSearchService, importSearchDocuments } from "./searchService.server";

export const getBookmarksByCollection = async (gqlClient: GqlClient, collectionId: string) => {
  let data = await gqlClient.request(GetBookmarksByCollectionDocument, {
    collectionId,
  });
  return data?.bookmarks;
};

export const getBookmarksCountByCollection = async (gqlClient: GqlClient, collectionId: string) => {
  let data = await gqlClient.request(GetBookmarksCountByCollectionDocument, {
    collectionId,
  });
  return data?.bookmarksAggregate?.aggregate?.count;
};

export const getBookmarksByUser = async (gqlClient: GqlClient, userId: string) => {
  let data = await gqlClient.request(GetBookmarksByUserDocument, {
    userId,
  });
  return data?.bookmarks;
};

export const createBookmark = async (gqlClient: GqlClient, input: BookmarksInsertInput) => {
  let data = await gqlClient.request(InsertBookmarkDocument, { input });
  if (data?.bookmark?.id) {
    let insertedBookmark = await getBookmarkById(gqlClient, data?.bookmark?.id);
    if (insertedBookmark) {
      await importSearchDocuments(insertedBookmark.collectionId, [insertedBookmark]);
    }
  }
  return data?.bookmark;
};

export type BookmarkFullInput = InsertBookmarkMutationVariables["input"];

export const getBookmarkById = async (gqlClient: GqlClient, bookmarkId: string) => {
  let data = await gqlClient.request(GetBookmarkByIdDocument, {
    id: bookmarkId,
  });
  return data?.bookmark;
};

export const deleteBookmark = async (gqlClient: GqlClient, bookmarkId: string) => {
  let data = await gqlClient.request(DeleteBookmarkDocument, {
    id: bookmarkId,
  });
  if (data?.bookmark?.collectionId) {
    let searchService = createSearchService(data?.bookmark?.collectionId);
    await searchService.bookmarks.deleteDocument(bookmarkId);
  }
  return data?.bookmark;
};

export const searchBookmarks = async (
  gqlClient: GqlClient,
  collectionId: string,
  criteria: BookmarkSearchCriteria
) => {
  let searchService = await createSearchService(collectionId);
  let searchResults = await searchService.bookmarks.search({
    q: criteria.q,
    page: criteria.page || 1,
    per_page: 20,
  });

  return searchResults;
};
