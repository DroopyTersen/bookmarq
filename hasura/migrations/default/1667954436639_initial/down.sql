
alter table "public"."workspace_roles" drop constraint "workspace_roles_author_id_fkey";
alter table "public"."workspace_roles" alter column "updated_at" drop not null;
alter table "public"."workspace_roles" alter column "created_at" drop not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."workspace_roles" add column "author_id" uuid
--  not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."workspace_roles" add column "updated_at" timestamptz
--  null default now();
--
-- CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
-- RETURNS TRIGGER AS $$
-- DECLARE
--   _new record;
-- BEGIN
--   _new := NEW;
--   _new."updated_at" = NOW();
--   RETURN _new;
-- END;
-- $$ LANGUAGE plpgsql;
-- CREATE TRIGGER "set_public_workspace_roles_updated_at"
-- BEFORE UPDATE ON "public"."workspace_roles"
-- FOR EACH ROW
-- EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
-- COMMENT ON TRIGGER "set_public_workspace_roles_updated_at" ON "public"."workspace_roles"
-- IS 'trigger to set value of column "updated_at" to current timestamp on row update';

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."workspace_roles" add column "created_at" timestamptz
--  null default now();

DROP TABLE "public"."workspace_roles";

DROP TABLE "public"."workspaces";

DROP TABLE "public"."users";
