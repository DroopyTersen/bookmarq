import { BookmarkDetails } from "../../bookmarks.schema";
import { YouTubeEmbed } from "./YoutubeEmbed";

interface EmbedDisplayProps {
  bookmark: BookmarkDetails;
}
const embeds = {
  YouTube: YouTubeEmbed,
};

export function EmbedDisplay({ bookmark }: EmbedDisplayProps) {
  if (!bookmark?.embedData) return null;
  let Embed = embeds[bookmark?.embedData?.provider_name as keyof typeof embeds];

  if (Embed) {
    return <Embed bookmark={bookmark} />;
  }

  return null;
}
