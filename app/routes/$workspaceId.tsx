import { json, LoaderArgs } from "@remix-run/node";
import { requireAuthenticatedLoader } from "~/features/auth/auth.remix.server";
import { MainContentPadded } from "~/features/layout/AppLayout";
import { useCurrentWorkspace } from "~/features/layout/WorkspacePicker";
import { AppErrorBoundary } from "~/toolkit/components/errors/AppErrorBoundary";

export const loader = async ({ request, params }: LoaderArgs) => {
  let { userId } = await requireAuthenticatedLoader(request);
  return json({ message: "WorkspaceDetails" });
};

export default function WorkspaceDetailsRoute() {
  let workspace = useCurrentWorkspace();
  return (
    <MainContentPadded>
      <h1 className="text-secondary">{workspace?.name}</h1>
      <div>
        <pre>{JSON.stringify(workspace, null, 2)}</pre>
      </div>
    </MainContentPadded>
  );
}

export const ErrorBoundary = AppErrorBoundary;
export const CatchBoundary = AppErrorBoundary;
