import { z } from "zod";
import { BookmarksInsertInput } from "~/.gql/graphql.types";
import { JobDefinition, JobRunner } from "~/common/Job";
import { GqlClient } from "~/toolkit/http/createGqlClient";
import { ICache } from "../cache/ICache";
import {
  extractArticleMetadata,
  parseMainArticle,
} from "../extract-link/extractArticle.server";
import { extractEmbed } from "../extract-link/extractEmbed.server";
import { extractHtml } from "../extract-link/extractHtml";
import { extractMimeType } from "../extract-link/extractMimeType";
import { createBookmarksApi } from "./bookmarks.api.server";
const NewBookmarkInputSchema = z.object({
  id: z.string().min(1),
  url: z.string({ description: "URL is required" }).url("Invalid URL"),
  collectionId: z.string().min(1),
});

export type NewBookmarkJobInput = z.infer<typeof NewBookmarkInputSchema> & {
  cache?: ICache;
  gqlClient: GqlClient;
};

export interface NewBookmarkJobData {
  input: NewBookmarkJobInput;
  mimeType?: string;
  bookmark?: BookmarksInsertInput;
  fullHtml?: string;
}

let newBookmarkJob = new JobDefinition<NewBookmarkJobData>("url-ingestion");

newBookmarkJob.registerStep("Fetching mimeType", async ({ data }, emit) => {
  let input = NewBookmarkInputSchema.parse(data.input);
  data.bookmark = {
    id: data?.input?.id,
    ...data?.bookmark,
    collectionId: input.collectionId,
    url: input.url,
  };
  data.mimeType = await extractMimeType(input.url);
});

newBookmarkJob.registerStep("Extracting Metadata", async ({ data }, emit) => {
  if (!data?.mimeType?.startsWith("text/html")) {
    console.log("Skipping metadata extraction because it's not an HTML page");
    return;
  }
  let input = NewBookmarkInputSchema.parse(data.input);
  let article = await extractArticleMetadata(input.url);
  let embed = null;
  if (!article) {
    embed = await extractEmbed(input.url);
  }
  data.bookmark = {
    title: article?.title || embed?.title || "",
    image: article?.image || embed?.thumbnail_url,
    html: article?.html || embed?.html || "",
    text: article?.text || embed?.text || "",
    description: article?.description || embed?.text,
  };
  if (article) {
    data.bookmark.articleData = {
      ...article,
      html: "",
      text: "",
    };
  } else if (embed) {
    data.bookmark.embedData = embed;
  }
});

newBookmarkJob.registerStep("Fetching Full HTML", async ({ data }, emit) => {
  // If it's not an article, we probably don't need the full HTML
  if (!data?.mimeType?.startsWith("text/html") && !data?.bookmark?.embedData) {
    console.log("Skipping HTML extraction because it's not an article");
    return;
  }
  let input = NewBookmarkInputSchema.parse(data.input);
  data.fullHtml = await extractHtml(input.url);
});

newBookmarkJob.registerStep(
  "Extracting Main Content",
  async ({ data }, emit) => {
    // If it's not an article, we probably don't need the full HTML
    if (!data.fullHtml) {
      return;
    }
    let input = NewBookmarkInputSchema.parse(data.input);
    let mainArticle = await parseMainArticle(data.fullHtml, input.url);
    if (mainArticle?.content && data?.bookmark) {
      data.bookmark.html = mainArticle?.content || data?.bookmark?.html;
      data.bookmark.text = mainArticle?.textContent || data?.bookmark?.text;
      if (data?.bookmark?.articleData?.html) {
        data.bookmark.articleData.html = "";
      }
    }
  }
);

newBookmarkJob.registerStep(
  "Save Bookmark (with Embeddings)",
  async ({ data }, emit) => {
    let gqlClient = data?.input?.gqlClient;
    if (!gqlClient) {
      throw new Error("GqlClient is required");
    }

    if (!data.bookmark) {
      throw new Error("Bookmark is required to save");
    }

    let bookmarkApi = createBookmarksApi(
      gqlClient,
      data?.input?.collectionId + ""
    );
    let bookmarkInput: BookmarksInsertInput = {
      id: data?.bookmark?.id,
      collectionId: data.input?.collectionId,
      url: data.bookmark?.url || data?.input?.url,
      title: data?.bookmark?.title,
      text: data?.bookmark?.text,
      html: data?.bookmark?.html,
      image: data?.bookmark?.image,
      description: data?.bookmark?.description,
      articleData: data?.bookmark?.articleData,
      embedData: data?.bookmark?.embedData,
    };
    let newBookmark = await bookmarkApi.saveBookmark(bookmarkInput);
    data.bookmark.id = newBookmark.id;
    console.log("DONE SAVING BOOKMARK", newBookmark.id);
  }
);

console.log("Creating _newBookmarkJobRunner");
export let newBookmarkJobRunner = new JobRunner(newBookmarkJob);

export const getNewBookmarkJobRunner = () => {
  if (!newBookmarkJobRunner) {
    console.log("Newing up newBookmarkJobRunner");
    newBookmarkJobRunner = new JobRunner(newBookmarkJob);
  }
  return newBookmarkJobRunner;
};
