import {
  GetBookmarksByCollectionDocument,
  GetBookmarksByUserDocument,
  InsertBookmarkDocument,
} from "~/.gql/graphql.types";
import { GqlClient } from "~/toolkit/http/createGqlClient";
import { BookmarkInput } from "./bookmarks.schema";

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
  input: BookmarkInput
) => {
  let data = await gqlClient.request(InsertBookmarkDocument, { input });
  return data?.bookmark;
};
