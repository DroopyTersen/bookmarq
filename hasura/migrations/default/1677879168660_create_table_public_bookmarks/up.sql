CREATE TABLE "public"."bookmarks" ("id" text NOT NULL DEFAULT generate_short_id(), "url" text NOT NULL, "title" text, "description" text, "text" text, "html" text, "image" text, "article_data" jsonb, "embed_data" jsonb, "collection_id" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "created_by_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON UPDATE cascade ON DELETE set null);
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_bookmarks_updated_at"
BEFORE UPDATE ON "public"."bookmarks"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_bookmarks_updated_at" ON "public"."bookmarks" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
