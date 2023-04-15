import { LoaderArgs } from "@remix-run/node";
import { requireAuthenticatedLoader } from "~/features/auth/auth.remix.server";
import { createBookmarksApi } from "~/features/bookmarks/bookmarks.api.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  let { gqlClient } = await requireAuthenticatedLoader(request);
  let bookmarksApi = createBookmarksApi(gqlClient, params.collectionId + "");
  let counts = await bookmarksApi.checkCounts();

  return {
    status: "success",
    ...counts,
  };
};
