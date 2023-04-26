import { ActionArgs, defer, LoaderArgs, redirect } from "@remix-run/node";
import { Await, Link, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { BsArrowLeftShort, BsTrash } from "react-icons/bs";
import { JOB_EVENTS } from "~/common/Job";
import {
  requireAuthenticatedAction,
  requireAuthenticatedLoader,
} from "~/features/auth/auth.remix.server";
import { createBookmarksApi } from "~/features/bookmarks/bookmarks.api.server";

import { ArticleDisplay } from "~/features/bookmarks/components/articles/ArticleDisplay";
import { EmbedDisplay } from "~/features/bookmarks/components/embeds/EmbedDisplay";
import { newBookmarkJobRunner } from "~/features/bookmarks/newBookmarkJob.server";
import { AppErrorBoundary } from "~/toolkit/components/errors/AppErrorBoundary";
import { ConfirmationButton } from "~/toolkit/components/modal/ConfirmationButton";
import { useSearchParam } from "~/toolkit/remix/useSearchParam";

type BookmarkDetails = Awaited<
  ReturnType<ReturnType<typeof createBookmarksApi>["getBookmarkById"]>
>;
export const loader = async ({ request, params }: LoaderArgs) => {
  let { gqlClient } = await requireAuthenticatedLoader(request);
  let bookmarksApi = createBookmarksApi(gqlClient, params.collectionId + "");
  let fastBookmark = await bookmarksApi.getBookmarkById(params.bookmarkId + "");
  let jobRunner = newBookmarkJobRunner;
  let isRunningJob = jobRunner.activeJobs.has(params.bookmarkId + "");
  console.log("JOB RUNNER KEYS", Array.from(jobRunner.activeJobs.keys()));
  console.log("🚀 | loader | isRunningJob:", isRunningJob);
  let deferredBookmark = !isRunningJob
    ? Promise.resolve(fastBookmark)
    : new Promise((resolve, reject) => {
        jobRunner.subscribe(params.bookmarkId + "", async (event) => {
          if (event.type === JOB_EVENTS.JOB_COMPLETE) {
            let latestBookmark = await bookmarksApi.getBookmarkById(
              params.bookmarkId + ""
            );
            resolve(latestBookmark);
          }
        });
      });

  return defer({ fastBookmark, isRunningJob, deferredBookmark });
};

export default function () {
  let { fastBookmark, deferredBookmark, isRunningJob } =
    useLoaderData<typeof loader>();

  console.log("🚀 | isRunningJob:", isRunningJob);
  return (
    <main className="relative w-full p-2 mx-auto mt-4 shadow-lg bookmark-toolbar md:max-w-3xl bg-base-200 rounded-xl sm:p-4">
      {!isRunningJob ? (
        <BookmarkDisplay bookmark={fastBookmark as any} />
      ) : (
        <Suspense fallback={<span>Waiting for job...</span>}>
          <Await
            resolve={deferredBookmark}
            errorElement={<p>Error loading img!</p>}
          >
            {(bookmark: BookmarkDetails) => (
              <BookmarkDisplay bookmark={bookmark} />
            )}
          </Await>
        </Suspense>
      )}
    </main>
  );
}

const BookmarkIntents = {
  DELETE: "delete-bookmark",
};

export const action = async ({ request, params }: ActionArgs) => {
  let { gqlClient, intent, returnTo } = await requireAuthenticatedAction(
    request
  );
  let bookmarksApi = createBookmarksApi(gqlClient, params.collectionId + "");

  if (intent === BookmarkIntents.DELETE && params.bookmarkId) {
    await bookmarksApi.deleteBookmark(params.bookmarkId);
    return redirect(returnTo || `/${params.collectionId}`);
  }
};

export const ErrorBoundary = AppErrorBoundary;
export const CatchBoundary = AppErrorBoundary;

function BookmarkDisplay({ bookmark }: { bookmark: BookmarkDetails }) {
  let [returnTo] = useSearchParam("returnTo");
  let backUrl = returnTo || "..";
  return (
    <>
      <header className="sticky top-0 z-10 flex justify-between w-full bookmark-toolbar bg-base-200 ">
        <div className="toolbar-start">
          <Link
            to={backUrl}
            className="btn btn-ghost btn-circle"
            title="back"
            prefetch="intent"
          >
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
              <h1 className="text-xl font-bold md:text-3xl">
                {bookmark?.title || "Missing Title"}
              </h1>
            </a>
          </div>
        </div>
        <ArticleDisplay bookmark={bookmark as any} />

        <EmbedDisplay bookmark={bookmark as any} />
        {bookmark?.embeddings?.length! > 0 && (
          <div>
            {bookmark?.embeddings?.map((embedding) => (
              <div className="mb-2">
                <pre>{embedding.chunk}</pre>
                <hr />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
