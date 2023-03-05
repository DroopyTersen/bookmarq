import { convertHtmlToText } from "./convertHtmlToText.server";
import { ExtractedEmbedData } from "./extract-link.types";

export const extractEmbed = async (
  url: string
): Promise<ExtractedEmbedData | null> => {
  const { extract } = await import("@extractus/oembed-extractor");
  try {
    const { html, ...result } = (await extract(url)) as ExtractedEmbedData & {
      html: string;
    };
    let text = html ? convertHtmlToText(html) : "";

    if (result?.provider_name === "Twitter") {
      // remove the "> " at the beginning of any line inside of text
      text = text.replace(/^> /gm, "");
    }
    return {
      ...result,
      html,
      url,
      text,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
};
