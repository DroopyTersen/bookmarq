// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export const createChunks = async (text: string) => {
  const TokenTextSplitter = await import("langchain/text_splitter").then(
    (m) => m.TokenTextSplitter
  );
  const splitter = new TokenTextSplitter({
    chunkSize: 1200,
    chunkOverlap: 200,
  });
  const chunks = await splitter.createDocuments([text]);
  return chunks;
};
