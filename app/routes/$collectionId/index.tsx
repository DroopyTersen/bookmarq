import { LoaderArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { zx } from "zodix";
import { requireAuthenticatedLoader } from "~/features/auth/auth.remix.server";
import { createBookmarksApi } from "~/features/bookmarks/bookmarks.api.server";
import { BookmarkSearchCriteriaSchema } from "~/features/bookmarks/bookmarks.schema";
import { BookmarkCard } from "~/features/bookmarks/components/BookmarkCard";
import { MainContentCentered } from "~/features/layout/AppLayout";
import { Input } from "~/toolkit/components/forms";
import { useSearchParam } from "~/toolkit/remix/useSearchParam";

// type LoaderData = {
//   recentBookmarks?: Awaited<ReturnType<typeof getBookmarksByCollection>>;
//   searchResults?: BookmarkSearchResults;
//   semanticResults?: any;
// };

export const loader = async ({ request, params }: LoaderArgs) => {
  let { gqlClient } = await requireAuthenticatedLoader(request);
  let bookmarksApi = createBookmarksApi(gqlClient, params.collectionId + "");
  let searchCriteria = zx.parseQuery(request, BookmarkSearchCriteriaSchema);
  if (searchCriteria?.q) {
    let searchResults = await bookmarksApi.keywordSearch(searchCriteria);
    // let semanticResults = await semanticSearch(
    //   searchCriteria.q,
    //   params.collectionId + ""
    // );

    return {
      searchResults,
      semanticResults: null,
      recentBookmarks: null,
    };
  } else {
    let recentBookmarks = await bookmarksApi.getBookmarksByCollection(10);
    return { recentBookmarks, searchResults: null, semanticResults: null };
  }
};

export default () => {
  let data = useLoaderData<typeof loader>();
  let [searchText, setSearchText] = useSearchParam("q");
  let pageTitle = data?.searchResults ? "Search Results" : "Recent Bookmarks";
  console.log("🚀 | searchResults:", data.searchResults);
  console.log("🚀 | semanticResults:", data.semanticResults);
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
      {/* {data?.semanticResults?.llmAnswer && (
        <div className="my-8">
          <p className="text-lg">{data?.semanticResults.llmAnswer}</p>
        </div>
      )} */}
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
