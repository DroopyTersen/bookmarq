import { LoaderArgs } from "@remix-run/node";
import { requireAuthenticatedLoader } from "~/features/auth/auth.remix.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  let { gqlClient } = await requireAuthenticatedLoader(request);
  // TODO: make sure they have access to the colleciton
  let result = null; //await fullCrawlForCollection(params.collectionId + "");

  return {
    status: "success",
    result,
  };
};
