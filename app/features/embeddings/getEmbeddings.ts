import { jsonRequest } from "~/toolkit/http/fetch.utils";
import { getEnvVar } from "~/toolkit/remix/envVars.server";
import { createChunks } from "./createChunks";

export const getBookmarkEmbeddings = async (
  text: string,
  bookmarkId: string
): Promise<EmbeddedChunk[]> => {
  let chunks = (await createChunks(text)).map((d) => {
    console.log("Chunk metadata", d.metadata);
    return d.pageContent;
  });
  let result = await fetchOpenAIEmbeddings(chunks);
  let embeddings = result.data.map((embeddedChunk) => {
    return {
      index: embeddedChunk.index,
      embedding: embeddedChunk.embedding,
      chunk: chunks[embeddedChunk.index],
      bookmark_id: bookmarkId,
    };
  });
  return embeddings;
};

export interface EmbeddedChunk {
  index: number;
  embedding: number[];
  chunk: string;
  bookmark_id: string;
}

interface OpenAIEmbeddingResponse {
  object: "list";
  data: {
    object: "embedding";
    embedding: number[];
    index: number;
  }[];
  model: string;
  usage: {
    prompt_tokens: number;
    total_tokens: number;
  };
}

async function fetchOpenAIEmbeddings(chunks: string[]) {
  // TOOD: make sure chunks don't exceed 8000 tokens
  const url = "https://api.openai.com/v1/embeddings";
  const model = "text-embedding-ada-002";
  let result = await jsonRequest<OpenAIEmbeddingResponse>(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getEnvVar("OPENAI_API_KEY")}`,
    },
    body: JSON.stringify({
      model,
      input: chunks,
    }),
  });

  return result;
}
