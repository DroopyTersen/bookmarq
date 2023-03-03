import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { GetAllUsersDocument } from "~/.gql/graphql.types";
import { requireAuthenticatedLoader } from "~/features/auth/auth.remix.server";
import { MainContentPadded } from "~/features/layout/AppLayout";
import { AppErrorBoundary } from "~/toolkit/components/errors/AppErrorBoundary";

export const loader = async ({ request }: LoaderArgs) => {
  let { gqlClient } = await requireAuthenticatedLoader(request);
  let data = await gqlClient.request(GetAllUsersDocument);
  return json(data);
};

export default function UsersRoute() {
  let data = useLoaderData<typeof loader>();
  return (
    <MainContentPadded>
      <ul>
        {data?.users?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </MainContentPadded>
  );
}

export const ErrorBoundary = AppErrorBoundary;
export const CatchBoundary = AppErrorBoundary;
