CREATE  INDEX "bookmark_embeddings_by_bookmark_id" on
  "public"."bookmark_embeddings" using brin ("bookmark_id", "chunk_index");
