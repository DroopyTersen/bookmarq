import { json, LoaderArgs } from "@remix-run/node";
import { requireAuthenticatedLoader } from "~/features/auth/auth.remix.server";
import { MainContentPadded } from "~/features/layout/AppLayout";
import { useCurrentCollection } from "~/features/layout/CollectionPicker";
import { AppErrorBoundary } from "~/toolkit/components/errors/AppErrorBoundary";

export const loader = async ({ request, params }: LoaderArgs) => {
  let { userId } = await requireAuthenticatedLoader(request);
  return json({ message: "Collection Details" });
};

export default function CollectionDetailsRoute() {
  let collection = useCurrentCollection();
  return (
    <MainContentPadded>
      <h1 className="text-secondary">{collection?.name}</h1>
      <div>
        <pre>{JSON.stringify(collection, null, 2)}</pre>
      </div>
    </MainContentPadded>
  );
}

export const ErrorBoundary = AppErrorBoundary;
export const CatchBoundary = AppErrorBoundary;
