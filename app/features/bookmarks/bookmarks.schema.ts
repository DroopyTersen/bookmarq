import { z } from "zod";
import {
  BookmarkDetailsFragment,
  BookmarkFragment,
} from "~/.gql/graphql.types";
import {
  ExtractedArticleData,
  ExtractedEmbedData,
} from "../extract-link/extract-link.types";

export const BookmarkInputSchema = z.object({
  url: z.string().url(),
  collectionId: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  image: z.string().url().optional(),
});

export type BookmarkInput = z.infer<typeof BookmarkInputSchema> & {
  id?: string;
};
export type Bookmark = BookmarkFragment;

export interface BookmarkDetails extends BookmarkDetailsFragment {
  embedData: ExtractedEmbedData;
  articleData: ExtractedArticleData;
}

export const BookmarkSearchCriteriaSchema = z.object({
  q: z.string().optional(),
  host: z.string().optional(),
  sort: z.string().optional(),
  page: z.coerce.number().optional(),
});

export type BookmarkSearchCriteria = z.infer<
  typeof BookmarkSearchCriteriaSchema
>;
