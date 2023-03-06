import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireAuthenticatedLoader } from "~/features/auth/auth.remix.server";
import { getBookmarksByCollection } from "~/features/bookmarks/bookmarks.data.server";
import { Bookmark } from "~/features/bookmarks/bookmarks.schema";
import { BookmarkCard } from "~/features/bookmarks/components/BookmarkCard";
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
