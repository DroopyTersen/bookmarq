// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export const createChunks = async (text: string) => {
  const TokenTextSplitter = await import("langchain/text_splitter").then(
    (m) => m.TokenTextSplitter
  );
  const splitter = new TokenTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 160,
  });
  const chunks = await splitter.createDocuments([text]);
  return chunks;
};
