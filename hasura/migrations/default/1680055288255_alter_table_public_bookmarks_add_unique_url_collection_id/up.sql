alter table "public"."bookmarks" add constraint "bookmarks_url_collection_id_key" unique ("url", "collection_id");
