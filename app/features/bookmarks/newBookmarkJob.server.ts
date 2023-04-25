import { z } from "zod";
import { BookmarksInsertInput } from "~/.gql/graphql.types";
import { JobDefinition, JobRunner } from "~/common/Job";
import { GqlClient } from "~/toolkit/http/createGqlClient";
import { ICache } from "../cache/ICache";
import {
  ExtractedArticleData,
  ExtractedEmbedData,
} from "../extract-link/extract-link.types";
import {
  extractArticleMetadata,
  parseMainArticle,
} from "../extract-link/extractArticle.server";
import { extractEmbed } from "../extract-link/extractEmbed.server";
import { extractHtml } from "../extract-link/extractHtml";
import { extractMimeType } from "../extract-link/extractMimeType";
import { createBookmarksApi } from "./bookmarks.api.server";
const NewBookmarkInputSchema = z.object({
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
  html?: string;
  text?: string;
  article?: ExtractedArticleData | null;
  embed?: ExtractedEmbedData | null;
  bookmark?: BookmarksInsertInput;
}

let newBookmarkJob = new JobDefinition<NewBookmarkJobData>("url-ingestion");

newBookmarkJob.registerStep("Fetching mimeType", async ({ data }, emit) => {
  let input = NewBookmarkInputSchema.parse(data.input);
  data.mimeType = await extractMimeType(input.url);
  console.log("mimeType", data.mimeType);
});

newBookmarkJob.registerStep("Extracting Metadata", async ({ data }, emit) => {
  if (!data?.mimeType?.startsWith("text/html")) {
    console.log("Skipping metadata extraction because it's not an HTML page");
    return;
  }
  let input = NewBookmarkInputSchema.parse(data.input);
  data.article = await extractArticleMetadata(input.url);
  if (!data.article) {
    data.embed = await extractEmbed(input.url);
  }

  data.html = data.article?.html || data.embed?.html || "";
  data.text = data.article?.text || data.embed?.text || "";
});

newBookmarkJob.registerStep("Fetching Full HTML", async ({ data }, emit) => {
  // If it's not an article, we probably don't need the full HTML
  if (!data.article) {
    console.log("Skipping HTML extraction because it's not an article");
    return;
  }
  let input = NewBookmarkInputSchema.parse(data.input);
  data.html = await extractHtml(input.url);
});

newBookmarkJob.registerStep(
  "Extracting Main Content",
  async ({ data }, emit) => {
    // If it's not an article, we probably don't need the full HTML
    if (!data.article || !data?.html) {
      return;
    }
    let input = NewBookmarkInputSchema.parse(data.input);
    let mainArticle = await parseMainArticle(data.html, input.url);
    if (mainArticle?.content) {
      data.html = mainArticle.content;
      data.text = mainArticle.textContent;
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
    let bookmarkInput: BookmarksInsertInput = {
      collectionId: data.input?.collectionId,
      url: data.input?.url,
      title: data?.article?.title || data?.embed?.title || "",
      text: data?.text,
      html: data?.html,
      image: data?.article?.image || data?.embed?.thumbnail_url,
      description: data?.article?.description || data?.embed?.text,
      articleData: data?.article,
      embedData: data?.embed,
    };
    let bookmarkApi = createBookmarksApi(
      gqlClient,
      data?.input?.collectionId + ""
    );
    let newBookmark = await bookmarkApi.saveBookmark(bookmarkInput);
    data.bookmark = {
      id: newBookmark?.id,
      ...bookmarkInput,
    };
  }
);

let _newBookmarkJobRunner: JobRunner<NewBookmarkJobData> | null = null;
export const getNewBookmarkJobRunner = () => {
  if (!_newBookmarkJobRunner) {
    _newBookmarkJobRunner = new JobRunner(newBookmarkJob);
  }
  return _newBookmarkJobRunner;
};
