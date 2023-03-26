import { LoaderArgs } from "@remix-run/node";
import { requireAuthenticatedLoader } from "~/features/auth/auth.remix.server";
import { getBookmarksCountByCollection } from "~/features/bookmarks/bookmarks.data.server";
import { createSearchService } from "~/features/bookmarks/searchService.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  let { gqlClient } = await requireAuthenticatedLoader(request);
  // TODO: make sure they have access to the colleciton
  let searchService = createSearchService(params.collectionId + "");

  let { found } = await searchService.bookmarks.search({ per_page: 1 });
  let hasuraBookmarksCount = await getBookmarksCountByCollection(
    gqlClient,
    params.collectionId + ""
  );
  return {
    status: "success",
    typesense: {
      bookmarks: found,
    },
    hasura: {
      bookmarks: hasuraBookmarksCount,
    },
  };
};
