import { convertHtmlToText } from "./convertHtmlToText.server";
import { ExtractedArticleData } from "./extract-link.types";
import { extractImageDimensions } from "./extractImageDimensions.server";

export const extractArticle = async (
  url: string,
  { provideText = true }: { provideText: boolean }
): Promise<ExtractedArticleData | null> => {
  const { extract } = await import("@extractus/article-extractor");
  try {
    const extractedArticle = await extract(url);
    if (!extractedArticle) return null;
    let { content, ...metadata } = extractedArticle;
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
  } catch (e) {
    console.error(e);
    return null;
  }
};
