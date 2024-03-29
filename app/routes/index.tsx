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
  // For now default to the first collection
  if (collections?.length > 0) {
    return redirect(`/${collections?.[0]?.id}`);
  }
  return json({ bookmarks: [] });
};

export default function Index() {
  return null;
}
