import { BookmarksInsertInput } from "~/.gql/graphql.types";
import { ICache } from "../cache/ICache";
import { extractLink } from "../extract-link/extractLink.server";
import { BookmarkInput } from "./bookmarks.schema";

export const processUrl = async (
  url: string,
  input: BookmarkInput,
  cache?: ICache
) => {
  let extractedLink = await extractLink(url, cache);
  let bookmark: BookmarksInsertInput = {
    ...input,
    url: url,
    title: extractedLink?.article?.title || extractedLink?.embed?.title || "",
    text: extractedLink?.article?.text,
    html: extractedLink?.article?.html,
    image: extractedLink?.article?.image || extractedLink?.embed?.thumbnail_url,
    description:
      extractedLink?.article?.description || extractedLink?.embed?.text,
    articleData: extractedLink?.article,
    embedData: extractedLink?.embed,
  };

  return bookmark;
  // TODO:
};
