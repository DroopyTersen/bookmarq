import { useState } from "react";
import { BookmarkDetails } from "../../bookmarks.schema";

export function ArticleDisplay({ bookmark }: { bookmark: BookmarkDetails }) {
  if (!bookmark?.articleData) return null;
  let [tab, setTab] = useState<"text" | "html">("html");
  console.log({ article: bookmark?.articleData });
  return (
    <>
      {bookmark?.image && (
        <div className="flex justify-center mb-4">
          <a href={bookmark?.url} target="_blank" className="link link-hover">
            <img
              src={bookmark?.image}
              width={bookmark?.articleData?.imageDimensions?.width}
              height={bookmark?.articleData?.imageDimensions?.height}
              className={`rounded-lg max-w-full`}
            />
          </a>
        </div>
      )}
      <div className="flex gap-2">
        {bookmark?.articleData?.author && (
          <span className="font-semibold">{bookmark?.articleData?.author}</span>
        )}
        {bookmark?.articleData?.published && (
          <div className="text-gray-300">
            {new Date(bookmark?.articleData?.published)?.toLocaleString()}
          </div>
        )}
      </div>
      {tab === "html" && (
        <div
          className="max-w-full prose-sm prose"
          dangerouslySetInnerHTML={{ __html: bookmark?.articleData?.html + "" }}
        ></div>
      )}
      {tab === "text" && (
        <pre className="mt-4 font-sans text-sm whitespace-pre-wrap rounded-lg bg-base-200">
          {bookmark?.text}
        </pre>
      )}
    </>
  );
}
