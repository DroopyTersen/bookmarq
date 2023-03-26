import { LoaderArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { zx } from "zodix";
import { requireAuthenticatedLoader } from "~/features/auth/auth.remix.server";
import {
  getBookmarksByCollection,
  searchBookmarks,
} from "~/features/bookmarks/bookmarks.data.server";
import { BookmarkSearchCriteriaSchema } from "~/features/bookmarks/bookmarks.schema";
import { BookmarkCard } from "~/features/bookmarks/components/BookmarkCard";
import { MainContentCentered } from "~/features/layout/AppLayout";
import { Input } from "~/toolkit/components/forms";
import { useSearchParam } from "~/toolkit/remix/useSearchParam";

type BookmarkSearchResults = Awaited<ReturnType<typeof searchBookmarks>>;
type LoaderData = {
  recentBookmarks?: Awaited<ReturnType<typeof getBookmarksByCollection>>;
  searchResults?: BookmarkSearchResults;
};

export const loader = async ({ request, params }: LoaderArgs) => {
  let { gqlClient } = await requireAuthenticatedLoader(request);
  let searchCriteria = zx.parseQuery(request, BookmarkSearchCriteriaSchema);
  if (searchCriteria?.q) {
    let searchResults = await searchBookmarks(
      gqlClient,
      params.collectionId + "",
      searchCriteria
    );

    return {
      searchResults,
    };
  } else {
    let recentBookmarks = await getBookmarksByCollection(
      gqlClient,
      params.collectionId + ""
    );
    return { recentBookmarks };
  }
};

export default () => {
  let data = useLoaderData<LoaderData>();
  let [searchText, setSearchText] = useSearchParam("q");
  let pageTitle = data?.searchResults ? "Search Results" : "Recent Bookmarks";
  console.log("🚀 | searchResults:", data.searchResults);
  return (
    <MainContentCentered>
      <section>
        <Form method="get">
          <Input
            name="q"
            type="search"
            className="text-lg font-light tracking-wide rounded-full bg-base-200 border-base-200 focus:input-secondary focus:border-transparent"
            aria-label="Search"
            autoFocus
            defaultValue={searchText}
            placeholder="Search or ask a question..."
            onChange={(event) => {
              if (event.currentTarget.value === "") {
                setSearchText("");
              }
            }}
          />
        </Form>
      </section>
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="mb-4 text-2xl font-bold text-gray-200">{pageTitle}</h2>
          {data?.searchResults && (
            <div className="stats">
              Found {data?.searchResults?.found} out of{" "}
              {data.searchResults?.out_of}
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4">
          {data?.searchResults
            ? data?.searchResults?.hits?.map((hit) => (
                <BookmarkCard {...hit.document} key={hit.document.id} />
              ))
            : data?.recentBookmarks?.map((bookmark) => (
                <BookmarkCard {...bookmark} key={bookmark.id} />
              ))}
        </div>
      </section>
    </MainContentCentered>
  );
};

function BookmarkSearchResult({
  hit,
}: {
  hit: BookmarkSearchResults["hits"][number];
}) {
  return (
    <div>
      <h3>{hit.document.title}</h3>
    </div>
  );
}
