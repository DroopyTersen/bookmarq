import { ICache } from "../cache/ICache";
import { ExtractedLinkData } from "./extract-link.types";
import { extractArticle } from "./extractArticle.server";
import { extractEmbed } from "./extractEmbed.server";
import { extractMimeType } from "./extractMimeType";

const getCacheKey = (url: string) => `extractLink: ${url}`;

export async function extractLink(url: string, cache?: ICache) {
  console.log("🚀 | extractLink | url", url);
  if (cache) {
    let cached = await cache.getItem<ExtractedLinkData>(getCacheKey(url));

    if (cached) {
      console.log("🚀 | extractLink cache hit");
      return cached;
    }
  }
  let mimeType = await extractMimeType(url);
  let extractedLinkData: ExtractedLinkData = {
    url,
    mimeType,
    article: null,
    embed: null,
  };
  // If we know it's not an HTML page (a video or a pdf or something),
  // then don't bother trying to extract more detail
  if (!mimeType || mimeType.startsWith("text/html")) {
    let [articleResult, embedResult] = await Promise.allSettled([
      extractArticle(url, { provideText: true }),
      extractEmbed(url),
    ]);

    if (articleResult.status === "fulfilled") {
      extractedLinkData.article = articleResult.value;
    }
    if (embedResult.status === "fulfilled") {
      extractedLinkData.embed = embedResult.value;
    }
  }
  if (cache) {
    await cache.setItem(getCacheKey(url), extractedLinkData);
  }

  return extractedLinkData;
}
