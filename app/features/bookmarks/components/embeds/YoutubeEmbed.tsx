import { FaYoutube } from "react-icons/fa";
import { BookmarkDetails } from "../../bookmarks.schema";

export function YouTubeEmbed({ bookmark }: { bookmark: BookmarkDetails }) {
  let videoId = getYouTubeVideoID(bookmark?.embedData?.url || "");

  if (!videoId) return null;
  return (
    <>
      <iframe
        className="w-full max-w-full aspect-video"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={true}
        title="YouTube video"
      />
      <div className="mt-4 text-center">
        <a
          href={bookmark?.embedData?.author_url}
          className="gap-1 capitalize btn btn-ghost btn-lg"
        >
          <FaYoutube size={32} />
          {bookmark?.embedData?.author_name}
        </a>
      </div>
    </>
  );
}

export function getYouTubeVideoID(youtubeUrl: string): string {
  if (!youtubeUrl) return "";
  try {
    let url = new URL(youtubeUrl);
    let videoID = url.searchParams.get("v");
    if (videoID) {
      return videoID;
    }
    const path = url.pathname;
    const pathParts = path.split("/");
    if (pathParts?.length === 2) {
      return pathParts[1];
    }
    return "";
  } catch (error) {
    return "";
  }
}
