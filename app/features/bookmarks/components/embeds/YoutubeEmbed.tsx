export function YouTubeEmbed({ videoId = "", url = "" }) {
  if (!videoId && url) {
    videoId = getYouTubeVideoID(url);
  }
  if (!videoId) return null;
  return (
    <iframe
      className="w-full max-w-full aspect-video"
      src={`https://www.youtube.com/embed/${videoId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen={true}
      title="YouTube video"
    />
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
