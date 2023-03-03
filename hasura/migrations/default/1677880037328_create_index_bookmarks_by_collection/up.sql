CREATE  INDEX "bookmarks_by_collection" on
  "public"."bookmarks" using brin ("collection_id");
