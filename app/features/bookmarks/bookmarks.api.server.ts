import {
  GetBookmarkByIdWithEmbeddingDocument,
  SaveBookmarkEmbeddingsDocument,
} from "~/.gql/graphql.types";
import {
  getBookmarkEmbeddings,
  getQueryEmbedding,
} from "~/features/openai/getEmbeddings";
import { GqlClient } from "~/toolkit/http/createGqlClient";
import { BookmarkSearchCriteria } from "./bookmarks.schema";
import { BookmarkFullInput, createBookmarksDBService } from "./db/bookmarks.db";
import { createSearchService } from "./typesense/createSearchService";

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
    insertBookmarkPlaceholder: async (url: string) => {
      let insertedBookmark = await dbService.saveBookmark({
        url,
        collectionId,
      });
      return insertedBookmark;
    },
    saveBookmarkSummary: async (bookmarkId: string, summary: string) => {
      let updatedBookmark = await dbService.updateBookmark(bookmarkId, {
        summary,
      });
      return updatedBookmark;
    },
    /**
     * 1) saves bookmark to DB, 2) gets embeddings from OpenAI, 3) saves embeddings to DB 4) Saves bookmark and embeddings to Typesense
     */
    saveBookmark: async (input: BookmarkFullInput) => {
      console.log("🚀 | Saving bookmark and getting embeddings...");
      // if (input?.id) {
      //   console.log("Deleting", input?.id, "from DB...");
      //   await createBookmarksDBService(gqlClient).deleteBookmark(input?.id);
      // }
      let savedBookmark = await createBookmarksDBService(
        gqlClient
      ).saveBookmark(input);
      console.log("Savedq bookmark to DB.");
      let embeddedChunks = await getBookmarkEmbeddings(input.text || "");
      // let [savedBookmark, embeddedChunks] = await Promise.all([
      //   // save bookmark to DB
      //   // Get embeddings
      //   Promise.resolve([] as EmbeddedChunk[]),
      //   // getBookmarkEmbeddings(input.text || ""),
      // ]);

      if (!savedBookmark?.id) {
        throw new Error("Failed to save bookmark");
      }

      // console.log("🚀 | Saving embeddings to DB...");
      // embeddedChunks.forEach((embeddedChunk) => {
      //   console.log("🚀 | embeddedChunks.forEach | embeddedChunk:", {
      //     chunkIndex: embeddedChunk.index,
      //     chunk: embeddedChunk.chunk?.slice(0, 100),
      //     embeddingLenght: embeddedChunk.embedding?.length,
      //   });
      // });
      let embeddingToInsert = embeddedChunks
        .filter((ec) => {
          return ec.embedding?.length && ec.chunk;
        })
        .map((embeddedChunk) => ({
          bookmarkId: savedBookmark!.id,
          chunkIndex: embeddedChunk.index,
          chunk: embeddedChunk.chunk,
          embedding: embeddedChunk.embedding,
        }));

      await gqlClient.request(SaveBookmarkEmbeddingsDocument, {
        bookmarkId: savedBookmark!.id,
        inputs: embeddingToInsert,
      });

      console.log("🚀 | Fetching bookmark w/ embeddings from DB...");
      let bookmarkWithEmbeddings = await gqlClient.request(
        GetBookmarkByIdWithEmbeddingDocument,
        {
          id: savedBookmark?.id,
        }
      );
      if (bookmarkWithEmbeddings?.bookmark) {
        console.log("🚀 | Saving to typesense...");
        await searchService.importBookmarkWithEmbeddings(
          bookmarkWithEmbeddings.bookmark
        );
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
