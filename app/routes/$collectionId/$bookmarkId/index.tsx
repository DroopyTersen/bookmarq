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
import { EmbedDisplay } from "~/features/bookmarks/components/embeds/EmbedDisplay";
import { ConfirmationButton } from "~/toolkit/components/modal/ConfirmationButton";
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
    <main className="relative w-full p-2 mx-auto mt-4 shadow bookmark-toolbar md:max-w-3xl bg-base-200 rounded-xl sm:p-4">
      <header className="sticky top-0 z-10 flex justify-between w-full bookmark-toolbar bg-base-200">
        <div className="toolbar-start">
          <Link to={backUrl} className="btn btn-ghost btn-circle" title="back">
            <BsArrowLeftShort size={34} />
          </Link>
        </div>
        <div className="flex items-center gap-2 toolbar-end">
          <Link to="edit" className="btn btn-ghost">
            Edit
          </Link>
          <ConfirmationButton
            className="text-white transition-opacity btn btn-error btn-circle opacity-80 hover:opacity-100"
            formData={{
              intent: BookmarkIntents.DELETE,
              bookmarkId: bookmark?.id,
            }}
            confirmation={{
              title: "Delete Bookmark?",
              body: "Once it's gone, it's gone.",
              confirm: "Delete it!",
            }}
          >
            <BsTrash size={22} />
          </ConfirmationButton>
        </div>
      </header>
      <div className="relative w-full p-2 pb-8 mx-auto md:max-w-3xl">
        <div className="flex justify-between">
          <div className="relative flex items-center gap-1 mb-2 sm:mb-4 md:mb-8">
            <a
              href={bookmark?.url}
              target="_blank"
              className="link link-hover"
              title="Open URL"
            >
              <h1 className="text-xl md:text-3xl">
                {bookmark?.title || "Missing Title"}
              </h1>
            </a>
          </div>
        </div>
        {/* <div className="my-2 text-right sm:my-0 sm:absolute sm:-top-4 sm:right-0">
          <FormButton
            className="text-white transition-opacity btn btn-error btn-circle opacity-80 hover:opacity-100"
            name="intent"
            value={BookmarkIntents.DELETE}
          >
            <BsTrash size={24} />
          </FormButton>
        </div> */}
        {/* {bookmark?.url && (
        <div className="my-4">
          <a
            href={bookmark.url}
            target="_blank"
            className="text-secondary link link-hover"
          >
            {bookmark?.url}
          </a>
        </div>
      )} */}

        <EmbedDisplay bookmark={bookmark as BookmarkDetails} />
        <ArticleDisplay bookmark={bookmark as BookmarkDetails} />
      </div>
    </main>
  );
}

function ArticleDisplay({ bookmark }: { bookmark: BookmarkDetails }) {
  if (!bookmark?.articleData) return null;

  return (
    <>
      {bookmark?.image && (
        <div className="flex justify-center mb-4">
          <a href={bookmark?.url} target="_blank" className="link link-hover">
            <img
              src={bookmark?.image}
              width={bookmark?.articleData?.imageDimensions?.width}
              height={bookmark?.articleData?.imageDimensions?.height}
              className={`rounded-lg max-w-full`}
            />
          </a>
        </div>
      )}
      <div className="flex gap-2">
        {bookmark?.articleData?.author && (
          <span className="font-semibold">{bookmark?.articleData?.author}</span>
        )}
        {bookmark?.articleData?.published && (
          <div className="text-gray-300">
            {new Date(bookmark?.articleData?.published)?.toLocaleString()}
          </div>
        )}
      </div>
      <pre className="mt-4 font-sans text-sm whitespace-pre-wrap rounded-lg bg-base-200">
        {bookmark?.text}
      </pre>
    </>
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