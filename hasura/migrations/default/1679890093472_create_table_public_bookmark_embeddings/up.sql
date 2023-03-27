CREATE TABLE "public"."bookmark_embeddings" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "chunk" text NOT NULL, "embedding" jsonb NOT NULL, "bookmark_id" text NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("bookmark_id") REFERENCES "public"."bookmarks"("id") ON UPDATE cascade ON DELETE cascade, UNIQUE ("chunk"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
