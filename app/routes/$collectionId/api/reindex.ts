import { LoaderArgs } from "@remix-run/node";
import { requireAuthenticatedLoader } from "~/features/auth/auth.remix.server";
import { fullCrawlForCollection } from "~/features/bookmarks/searchService.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  let { gqlClient } = await requireAuthenticatedLoader(request);
  // TODO: make sure they have access to the colleciton
  let result = await fullCrawlForCollection(params.collectionId + "");

  return {
    status: "success",
    result,
  };
};
