import { Readability } from "@mozilla/readability";
import { DOMParser } from "linkedom";
import { HTMLDocument } from "linkedom/types/html/document";

import prettier from "prettier";
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
    const doc = new DOMParser().parseFromString(html, "text/html");
    const base = doc.createElement("base");
    base.setAttribute("href", url);
    doc.head.appendChild(base as any);
    html = cleanUpCodeBlocks(doc);
    const reader = new Readability(doc as any, {
      keepClasses: true,
      debug: true,
    });
    const readerResult = reader.parse();
    // console.log("🚀 | full Html:", html);

    const extractedArticle = await extractFromHtml(html, url);
    // console.log("🚀 | extractedArticle:", extractedArticle);
    if (!extractedArticle) return null;
    let { content, ...metadata } = extractedArticle;
    if (metadata?.author === "@") {
      metadata.author = "";
    }
    // if (provideText) {
    //   text = await convertHtmlToText(content || "");
    // }
    let result: ExtractedArticleData = {
      ...metadata,
      text: readerResult?.textContent,
      html: readerResult?.content || "",
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

const cleanUpCodeBlocks = (doc: HTMLDocument) => {
  // get all the code elements
  const codeElements = Array.from(doc.querySelectorAll("pre")).map((elm: HTMLElement) => {
    if (elm?.children?.[0]?.tagName === "CODE") {
      return elm?.children?.[0];
    }
    return elm;
  });

  // loop through all the code elements
  for (const codeElement of codeElements) {
    let language = tryGetLanguage(codeElement as HTMLElement);
    console.log("🚀 | cleanUpCodeBlocks | language:", language);
    // get the text content of the code element
    let codeStr = codeElement?.innerHTML || "";

    // replace all <br> tags with newline characters
    codeStr = codeStr.replace(/<br>/g, "\n");

    // remove all <span> tags
    codeStr = codeStr.replace(/<span[^>]*>/g, "");
    codeStr = codeStr.replace(/<\/span>/g, "");

    // set the new text content of the code element
    codeElement.textContent = codeStr;
    if (language) {
      try {
        codeElement.classList.add("language-" + language);
        codeElement.parentElement?.classList.add("language-" + language);
        console.log("🚀 | cleanUpCodeBlocks | class:", codeElement.className);
        const formattedCode = prettier.format(codeStr, {
          filepath: "codefile." + language,
        });
        codeElement.textContent = formattedCode;
      } catch (err) {
        console.error("Unable to format code", err);
      }
    }
    if (codeElement.tagName === "PRE") {
      // move the PRE content into a CODE element
      const code = doc.createElement("code");
      code.textContent = codeElement.textContent;
      codeElement.innerHTML = "";
      codeElement.appendChild(code as any);
    }
  }

  // get the modified HTML string
  return doc.children.item(0)?.innerHTML || "";
};

const LANGUAGE_CLASSES = ["language-", "lang-", "highlight-source-"];
const tryGetLanguage = (codeElem: HTMLElement) => {
  let classList = [...codeElem.classList, ...(codeElem.parentElement?.classList || [])];
  console.log("🚀 | tryGetLanguage | classList:", classList);
  let language = "";
  // Loop through all the classes and see if any of them start with language-* or lang-*
  for (let i = 0; i < classList.length; i++) {
    let className = classList[i];

    for (const languageClass of LANGUAGE_CLASSES) {
      if (className?.startsWith(languageClass)) {
        language = className.replace(languageClass, "");
        break;
      }
    }
  }

  return language;
};

type KeysOfType<TItem, TProp> = {
  [Key in keyof TItem]: TItem[Key] extends TProp ? Key : never;
}[keyof TItem];

interface ColumnMapping<TItem> {
  key: KeysOfType<TItem, string | number>;
  label: string;
}

function createCsv<
  TColumns extends {
    key: keyof TItem;
    label: string;
  }[],
  TItem extends Record<string, string | number>
>(columns: TColumns, items: TItem[]) {
  return items
    .map((item) => {
      return columns.map((column) => (item as any)[column.key]).join(",");
    })
    .join("\n");
}

interface BlogPost {
  title: string;
  author: string;
}

const columns: ColumnMapping<BlogPost>[] = [
  {
    key: "title",
    label: "Title",
  },
];

let csv = createCsv(columns, [{ author: "John", title: "Hello" }]);
