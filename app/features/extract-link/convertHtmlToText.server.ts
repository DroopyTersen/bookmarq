import { htmlToText } from "html-to-text";

export const convertHtmlToText = (html: string): string => {
  if (!html) return "";

  let text = htmlToText(html, {
    wordwrap: false, // defaults to 80 chars

    selectors: [
      {
        selector: "a",
        format: "anchor",
        options: { ignoreHref: true, hideLinkHrefIfSameAsText: true },
      },
      { selector: "img", format: "skip" },
      { selector: "td", format: "inline" },
      {
        selector: "pre",
        options: {
          trailingLineBreaks: 0,
          trimEmptyLines: true,
          leadingLineBreaks: 0,
        },
      },
      {
        selector: "pre>code",
        options: {
          trailingLineBreaks: 0,
          trimEmptyLines: true,
          leadingLineBreaks: 0,
        },
      },
      {
        selector: "pre>code",
        format: "pre",
        options: {
          trailingLineBreaks: 0,
          trimEmptyLines: true,
          leadingLineBreaks: 0,
        },
      },
      { selector: `[style*="display:none"]`, format: "skip" },
      { selector: `[style*="visiblity:hidden"]`, format: "skip" },
    ],
  })
    .replace(/\n[\n|\s]+/g, "\n\n")
    .replace(/<>|�/g, "");

  return (text || "").trim();
};
