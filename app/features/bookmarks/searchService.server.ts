import dayjs from "dayjs";
import type {
  TypeSenseCollectionDocument,
  TypesenseCollectionSchema,
  TypesenseFieldsSchema,
} from "droopy-typesense";
import { createTypesenseClient, createTypesenseRepo } from "droopy-typesense";
import {
  GetBookmarksByCollectionForSearchImportDocument,
  GetBookmarksByCollectionForSearchImportQuery,
} from "~/.gql/graphql.types";
import { createAdminGqlClient } from "~/common/hasura.server";
import { getEnvVar } from "~/toolkit/remix/envVars.server";

export const bookmarkSearchFields = {
  id: {
    type: "string",
    facet: false,
    sort: false,
  },
  title: {
    type: "string",
    facet: false,
    sort: false,
  },
  description: {
    type: "string",
    facet: false,
    sort: false,
  },
  text: {
    type: "string",
    facet: false,
    sort: false,
  },
  host: {
    type: "string",
    facet: true,
    sort: false,
  },
  createdBy: {
    type: "string",
    facet: true,
    sort: true,
  },
  createdAt: {
    type: "int64",
    facet: false,
    sort: true,
  },
  image: {
    type: "string",
    facet: false,
    sort: false,
    index: false,
  },
  url: {
    type: "string",
    facet: false,
    sort: false,
    index: false,
  },
} satisfies TypesenseFieldsSchema;

const getCollectionName = (collectionId: string) => `bookmarks_${collectionId}`;

export const createSearchService = (collectionId: string) => {
  const schema = {
    name: getCollectionName(collectionId),
    fields: bookmarkSearchFields,
    default_sorting_field: "createdAt",
  } satisfies TypesenseCollectionSchema;
  let client = createTypesenseClient({
    apiKey: getEnvVar("TYPESENSE_API_KEY"),
    url: getEnvVar("TYPESENSE_URL"),
  });
  let bookmarks = createTypesenseRepo(client, schema);
  return {
    bookmarks,
  };
};

type BookmarkFromDb =
  GetBookmarksByCollectionForSearchImportQuery["bookmarks"][number];
export type BookmarkSearchDocument = TypeSenseCollectionDocument<
  typeof bookmarkSearchFields
>;

export const fullCrawlForCollection = async (collectionId: string) => {
  let adminClient = createAdminGqlClient();
  let data = await adminClient.request(
    GetBookmarksByCollectionForSearchImportDocument,
    {
      collectionId,
    }
  );
  let searchService = await createSearchService(collectionId);
  await searchService.bookmarks.deleteCollection();
  await importSearchDocuments(collectionId, data.bookmarks);
  let results = await searchService.bookmarks.search({
    per_page: 1,
  });

  return {
    found: results.found,
    out_of: results.out_of,
  };
};

export const importSearchDocuments = async (
  collectionId: string,
  bookmarks: BookmarkFromDb[]
) => {
  let searchDocs = bookmarks
    ?.map(toTypesenseDocument)
    .filter(Boolean) as BookmarkSearchDocument[];
  let searchService = await createSearchService(collectionId);
  if (searchDocs?.length) {
    await searchService.bookmarks.importDocuments(searchDocs);
  }
};

const toTypesenseDocument = (
  dbItem: BookmarkFromDb
): BookmarkSearchDocument | null => {
  try {
    let url = new URL(dbItem.url);

    let document: BookmarkSearchDocument = {
      id: dbItem.id,
      title: dbItem.title || "",
      description: dbItem.description || "",
      text: dbItem.text || "",
      host: url.host,
      createdBy: dbItem.createdBy?.name || dbItem.createdBy?.email || "",
      createdAt: dayjs(dbItem.createdAt).unix(),
      url: dbItem.url,
      image: dbItem.image || "",
    };

    return document;
  } catch (err: any) {
    console.log("🚀 | toTypesenseDocument | err", err.message);
    console.log(JSON.stringify(dbItem, null, 2));
    return null;
  }
};
