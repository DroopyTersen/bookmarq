export type ExtractedEmbedData = Partial<{
  url: string;
  version: string;
  type: string;
  provider_name: string;
  provider_url: string;
  width: number;
  height: number;
  title: string;
  author_name: string;
  author_url: string;
  html: string;
  thumbnail_url: string;
  thumbnail_width: number;
  thumbnail_height: number;
  text?: string;
}>;

export type ExtractedArticleData = Partial<{
  url: string;
  title: string;
  description: string;
  links: string[];
  image: string;
  imageDimensions?: {
    width: number;
    height: number;
  };
  author: string;
  source: string;
  published: string;
  ttr: number;
  text: string;
  html: string;
}>;

export type SummarizedData = {
  summary: string;
  // namedEntities: string[];
  people: string[];
  companies: string[];
  stocks: string[];
  places: string[];
  topics: string[];
};

export type ExtractedLinkData = {
  url: string;
  article: ExtractedArticleData | null;
  embed: ExtractedEmbedData | null;
  ai?: SummarizedData | null;
  mimeType?: string;
};
