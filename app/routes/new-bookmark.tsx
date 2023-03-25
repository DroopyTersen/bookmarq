import { json, LoaderArgs, redirect } from "@remix-run/node";
import { createUserGqlClient } from "~/common/hasura.server";
import { authSession } from "~/features/auth/authSession.server";
import { getUserCollections } from "~/features/users/users.data.server";

export const loader = async ({ request }: LoaderArgs) => {
  let auth = await authSession.get(request);
  let url = new URL(request.url);
  let returnTo = url.pathname + url.search;
  if (!auth) {
    return redirect("/login?returnTo=" + returnTo);
  }
  let gqlClient = createUserGqlClient(auth.hasuraToken);
  let collections = (await getUserCollections(gqlClient, auth.userId)) || [];
  console.log("🚀 | loader | collections:", collections);
  // For now default to the first collection
  if (collections?.length > 0) {
    let url = new URL(request.url);
    return redirect(`/${collections?.[0]?.id}/new?${url.search}`);
  }
  return json({ bookmarks: [] });
};

export default function Index() {
  return null;
}
