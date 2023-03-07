import { convertHtmlToText } from "./convertHtmlToText.server";
import { ExtractedArticleData } from "./extract-link.types";
import { extractImageDimensions } from "./extractImageDimensions.server";

export const extractArticle = async (
  html: string,
  url: string,
  { provideText = true }: { provideText: boolean }
): Promise<ExtractedArticleData | null> => {
  console.log("🚀 | url1:", url);
  const { extractFromHtml } = await import("@extractus/article-extractor");
  try {
    // console.log("🚀 | full Html:", html);
    const extractedArticle = await extractFromHtml(html, url);
    // console.log("🚀 | extractedArticle:", extractedArticle);
    if (!extractedArticle) return null;
    let { content, ...metadata } = extractedArticle;
    if (metadata?.author === "@") {
      metadata.author = "";
    }
    let text = "";
    if (provideText) {
      text = await convertHtmlToText(content || "");
    }
    let result: ExtractedArticleData = {
      ...metadata,
      text: text || "",
      html: content,
      url,
    };

    if (result.image) {
      try {
        result = {
          ...result,
          imageDimensions: await extractImageDimensions(result.image),
        };
      } catch (err) {
        console.error("Unable to fetch image dimensions", err);
      }
    }
    return result;
  } catch (e: any) {
    console.error("Something went wrong with this", e?.message);
    return null;
  }
};
