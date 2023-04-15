import type {
  TypeSenseCollectionDocument,
  TypesenseFieldsSchema,
} from "droopy-typesense";

export type BookmarkSearchDocument = TypeSenseCollectionDocument<
  typeof bookmarkSearchFields
>;

export type EmbeddingSearchDocument = TypeSenseCollectionDocument<
  typeof embeddingSearchFields
>;

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

export const embeddingSearchFields = {
  id: {
    type: "string",
  },
  bookmark_id: {
    type: "string",
  },
  chunk_index: {
    type: "int32",
  },
  chunk: {
    type: "string",
  },
  embedding: {
    type: "float[]",
    num_dim: 1536,
  },
  bookark: {
    type: "object",
    index: false,
    optional: true,
  },
} satisfies TypesenseFieldsSchema;
