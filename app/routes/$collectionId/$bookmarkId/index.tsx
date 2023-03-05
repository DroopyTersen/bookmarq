import { ActionArgs, json, LoaderArgs, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { BsArrowLeftShort, BsTrash } from "react-icons/bs";
import {
  requireAuthenticatedAction,
  requireAuthenticatedLoader,
} from "~/features/auth/auth.remix.server";
import {
  deleteBookmark,
  getBookmarkById,
} from "~/features/bookmarks/bookmarks.data.server";
import { BookmarkDetails } from "~/features/bookmarks/bookmarks.schema";
import { YouTubeEmbed } from "~/features/bookmarks/components/embeds/YoutubeEmbed";
import { MainContentCentered } from "~/features/layout/AppLayout";
import { FormButton } from "~/toolkit/components/buttons/FormButton";
import { useSearchParam } from "~/toolkit/remix/useSearchParam";

export const loader = async ({ request, params }: LoaderArgs) => {
  let { gqlClient } = await requireAuthenticatedLoader(request);
  let bookmark = await getBookmarkById(gqlClient, params.bookmarkId + "");

  return json({ bookmark });
};
export default function () {
  let { bookmark } = useLoaderData<typeof loader>();
  let [returnTo] = useSearchParam("returnTo");
  let backUrl = returnTo || "..";
  return (
    <MainContentCentered className="relative">
      <div className="flex justify-between">
        <div className="relative flex items-center gap-1">
          <Link
            to={backUrl}
            className="btn btn-ghost btn-circle md:absolute sm:left-[-50px]"
            title="back"
          >
            <BsArrowLeftShort size={34} />
          </Link>
          <h1 className="text-xl md:text-3xl">
            {bookmark?.title || "Missing Title"}
          </h1>
        </div>
      </div>
      <div className="my-2 text-right sm:my-0 sm:absolute sm:-top-4 sm:right-0">
        <FormButton
          className="text-white transition-opacity btn btn-error btn-circle opacity-80 hover:opacity-100"
          name="intent"
          value={BookmarkIntents.DELETE}
        >
          <BsTrash size={24} />
        </FormButton>
      </div>
      {bookmark?.url && (
        <div className="my-4">
          <a
            href={bookmark.url}
            target="_blank"
            className="text-secondary link link-hover"
          >
            {bookmark?.url}
          </a>
        </div>
      )}

      <EmbedDisplay bookmark={bookmark as BookmarkDetails} />
      <ArticleDisplay bookmark={bookmark as BookmarkDetails} />
    </MainContentCentered>
  );
}

function EmbedDisplay({ bookmark }: { bookmark: BookmarkDetails }) {
  if (!bookmark?.embedData) return null;

  if (bookmark?.embedData?.provider_name === "YouTube") {
    return <YouTubeEmbed url={bookmark?.url} />;
  }
  return null;
}

function ArticleDisplay({ bookmark }: { bookmark: BookmarkDetails }) {
  if (!bookmark?.articleData) return null;

  return (
    <pre className="p-4 text-sm whitespace-pre-wrap rounded-lg bg-base-200 ">
      {bookmark?.text}
    </pre>
  );
}

const BookmarkIntents = {
  DELETE: "delete-bookmark",
};
export const action = async ({ request, params }: ActionArgs) => {
  let { gqlClient, intent, returnTo } = await requireAuthenticatedAction(
    request
  );

  if (intent === BookmarkIntents.DELETE && params.bookmarkId) {
    await deleteBookmark(gqlClient, params.bookmarkId);
    return redirect(returnTo || `/${params.collectionId}`);
  }
};
