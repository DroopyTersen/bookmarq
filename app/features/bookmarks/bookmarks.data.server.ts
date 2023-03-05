import {
  BookmarksInsertInput,
  DeleteBookmarkDocument,
  GetBookmarkByIdDocument,
  GetBookmarksByCollectionDocument,
  GetBookmarksByUserDocument,
  InsertBookmarkDocument,
  InsertBookmarkMutationVariables,
} from "~/.gql/graphql.types";
import { GqlClient } from "~/toolkit/http/createGqlClient";

export const getBookmarksByCollection = async (
  gqlClient: GqlClient,
  collectionId: string
) => {
  let data = await gqlClient.request(GetBookmarksByCollectionDocument, {
    collectionId,
  });
  return data?.bookmarks;
};

export const getBookmarksByUser = async (
  gqlClient: GqlClient,
  userId: string
) => {
  let data = await gqlClient.request(GetBookmarksByUserDocument, {
    userId,
  });
  return data?.bookmarks;
};

export const createBookmark = async (
  gqlClient: GqlClient,
  input: BookmarksInsertInput
) => {
  let data = await gqlClient.request(InsertBookmarkDocument, { input });
  return data?.bookmark;
};

export type BookmarkFullInput = InsertBookmarkMutationVariables["input"];

export const getBookmarkById = async (
  gqlClient: GqlClient,
  bookmarkId: string
) => {
  let data = await gqlClient.request(GetBookmarkByIdDocument, {
    id: bookmarkId,
  });
  return data?.bookmark;
};

export const deleteBookmark = async (
  gqlClient: GqlClient,
  bookmarkId: string
) => {
  let data = await gqlClient.request(DeleteBookmarkDocument, {
    id: bookmarkId,
  });
  return data?.bookmark;
};
