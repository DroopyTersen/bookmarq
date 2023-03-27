// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export const createChunks = async (text: string) => {
  const RecursiveCharacterTextSplitter = await import(
    "langchain/text_splitter"
  ).then((m) => m.RecursiveCharacterTextSplitter);
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1400,
    chunkOverlap: 300,
  });
  const chunks = await splitter.createDocuments([text]);
  return chunks;
};
