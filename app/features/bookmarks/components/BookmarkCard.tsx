import { Link } from "@remix-run/react";
import { Bookmark } from "../bookmarks.schema";

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export function BookmarkCard({ bookmark }: BookmarkCardProps) {
  let bookmarkUrl = new URL(bookmark.url);

  return (
    <div className="grid grid-cols-1 overflow-hidden shadow-xl sm:grid-cols-2 card bg-base-200 card-compact">
      <Link
        to={bookmark.id}
        className="brightness-95 hover:brightness-105 transition-[filter]"
        title="Navigate to bookmark"
      >
        <figure className="h-full bg-base-300">
          <img src={bookmark?.image || "/images/fallback.png"} alt="Album" />
        </figure>
      </Link>
      <div className="grid card-body grid-rows-[1fr_auto]">
        <div>
          <Link
            to={bookmark.id}
            className="link link-hover focus:underline"
            title="Navigate to bookmark"
          >
            <h3 className="card-title">{bookmark?.title || "Missing Title"}</h3>
          </Link>
          <div>
            <a
              href={bookmarkUrl.origin}
              target="_blank"
              className="text-sm font-bold link link-hover link-primary"
            >
              {bookmarkUrl.hostname}
            </a>
          </div>

          {bookmark?.description && (
            <Link to={bookmark.id} className="link-hover">
              <p className="my-2">{bookmark.description}</p>
            </Link>
          )}
        </div>
        <div className="justify-end card-actions">
          <a
            className="btn btn-primary btn-sm"
            target="_blank"
            href={bookmark?.url}
          >
            Open Url
          </a>
        </div>
      </div>
    </div>
  );
}
