import { GetBookmarkByIdWithEmbeddingDocument } from "~/.gql/graphql.types";
import {
  getBookmarkEmbeddings,
  getQueryEmbedding,
} from "~/features/openai/getEmbeddings";
import { GqlClient } from "~/toolkit/http/createGqlClient";
import { BookmarkSearchCriteria } from "./bookmarks.schema";
import { BookmarkFullInput, createBookmarksDBService } from "./db/bookmarks.db";
import { createSearchService } from "./typesense/createSearchService";
import { importBookmarkToTypesense } from "./typesense/importBookmarkToTypesense";

export const createBookmarksApi = (
  gqlClient: GqlClient,
  collectionId: string
) => {
  let searchService = createSearchService(collectionId);
  let dbService = createBookmarksDBService(gqlClient);

  return {
    getBookmarksByCollection: async (limit = 1000) => {
      return await dbService.getBookmarksByCollection(collectionId, limit);
    },
    getBookmarkById: async (bookmarkId: string) => {
      return await dbService.getBookmarkById(bookmarkId);
    },
    checkCounts: async () => {
      let [hasuraCount, bookmarkSearch, embeddingSearch] =
        await Promise.allSettled([
          dbService.getBookmarksByCollectionCount(collectionId),
          searchService.bookmarks.search({ per_page: 1 }),
          searchService.embeddings.search({ per_page: 1 }),
        ]);

      return {
        hasuraBookmarks: {
          status: hasuraCount.status,
          count: hasuraCount.status === "fulfilled" ? hasuraCount.value : null,
        },
        typesenseBookmarks: {
          status: bookmarkSearch.status,
          count:
            bookmarkSearch.status === "fulfilled"
              ? bookmarkSearch.value.found
              : null,
        },
        typesenseEmbeddings: {
          status: embeddingSearch.status,
          count:
            embeddingSearch.status === "fulfilled"
              ? embeddingSearch.value.found
              : null,
        },
      };
    },
    saveBookmark: async (input: BookmarkFullInput) => {
      console.log("🚀 | Saving bookmark and getting embeddings...");
      let [savedBookmark, embeddedChunks] = await Promise.all([
        // save bookmark to DB
        dbService.saveBookmark(input),
        // Get embeddings
        getBookmarkEmbeddings(input.text || ""),
      ]);
      if (!savedBookmark) {
        throw new Error("Failed to save bookmark");
      }
      console.log("🚀 | Fetching bookmark w/ embeddings from DB...");

      let bookmarkWithEmbeddings = await gqlClient.request(
        GetBookmarkByIdWithEmbeddingDocument,
        {
          id: savedBookmark?.id,
        }
      );
      if (bookmarkWithEmbeddings?.bookmark) {
        console.log("🚀 | Saving to typesense...");
        await importBookmarkToTypesense(bookmarkWithEmbeddings.bookmark);
      }
      return savedBookmark;
    },
    deleteBookmark: async (bookmarkId: string) => {
      await Promise.allSettled([
        // DB: Delete bookmark & embeddings
        dbService.deleteBookmark(bookmarkId),
        // Typesense: delete bookmark
        searchService.bookmarks.deleteDocument(bookmarkId),
        // Typesense: delete embedding
        searchService.embeddings._collection.documents().delete({
          filter_by: `bookmark_id:${bookmarkId}`,
        }),
      ]);
    },
    keywordSearch: async (criteria: BookmarkSearchCriteria) => {
      let searchResults = await searchService.bookmarks.search({
        q: criteria.q,
        page: criteria.page || 1,
        per_page: 20,
      });

      return searchResults;
    },
    semanticSearch: async (query: string, numResults = 10) => {
      let embeddedQuery = await getQueryEmbedding(query);
      let response = await searchService.embeddings.vectorSearch({
        field: "embedding",
        vector: embeddedQuery,
        numResults,
        include: ["bookmark_id", "chunk_index", "chunk"],
      });

      // let bookmarks = response?.results?.[0]?.hits
      //   ?.map((hit) => hit?.document?.bookark)
      //   .filter(Boolean) as BookmarkSearchDocument[];

      return response;
    },
    answerQuestion: ({
      question,
      context,
    }: {
      question: string;
      context: string;
    }) => {},
  };
};
