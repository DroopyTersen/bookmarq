import { z } from "zod";

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
