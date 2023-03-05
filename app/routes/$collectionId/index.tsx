import { json, LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { requireAuthenticatedLoader } from "~/features/auth/auth.remix.server";
import { getBookmarksByCollection } from "~/features/bookmarks/bookmarks.data.server";
import { Bookmark } from "~/features/bookmarks/bookmarks.schema";
import { MainContentCentered } from "~/features/layout/AppLayout";
import { Input } from "~/toolkit/components/forms";

export const loader = async ({ request, params }: LoaderArgs) => {
  let { gqlClient } = await requireAuthenticatedLoader(request);
  let bookmarks = await getBookmarksByCollection(
    gqlClient,
    params.collectionId + ""
  );

  return json({ bookmarks });
};

export default () => {
  let { bookmarks } = useLoaderData<typeof loader>();
  return (
    <MainContentCentered>
      <section>
        <Input
          type="search"
          className="text-lg font-light tracking-wide rounded-full bg-base-200 border-base-200 focus:input-secondary focus:border-transparent"
          aria-label="Search"
          autoFocus
          placeholder="Search or ask a question..."
        />
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-200">
          Recent Bookmarks
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {bookmarks?.map((bookmark) => (
            <BookmarkCard bookmark={bookmark as Bookmark} key={bookmark.id} />
          ))}
        </div>
      </section>
    </MainContentCentered>
  );
};

function BookmarkCard({ bookmark }: { bookmark: Bookmark }) {
  let bookmarkUrl = new URL(bookmark.url);

  return (
    <div className="grid grid-cols-1 shadow-xl sm:grid-cols-2 card bg-base-200 card-compact">
      <Link
        to={bookmark.id}
        className="brightness-95 hover:brightness-105 transition-[filter] rounded-l-lg"
        title="Navigate to bookmark"
      >
        <figure className="h-full rounded-l-lg bg-base-300">
          <img src={bookmark?.image || "/images/fallback.png"} alt="Album" />
        </figure>
      </Link>
      <div className="grid card-body grid-rows-[1fr_auto]">
        <div>
          <Link
            to={bookmark.id}
            className="link link-hover focus:underline"
            title="Navigate to bookmark"
          >
            <h3 className="card-title">{bookmark?.title || "Missing Title"}</h3>
          </Link>
          <div>
            <a
              href={bookmarkUrl.origin}
              target="_blank"
              className="text-sm font-bold link link-hover link-primary"
            >
              {bookmarkUrl.hostname}
            </a>
          </div>

          {bookmark?.description && <p>{bookmark.description}</p>}
        </div>
        <div className="justify-end card-actions">
          <a
            className="btn btn-primary btn-sm"
            target="_blank"
            href={bookmark?.url}
          >
            Open Url
          </a>
        </div>
      </div>
    </div>
  );
}
