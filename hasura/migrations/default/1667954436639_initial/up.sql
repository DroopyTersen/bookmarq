CREATE EXTENSION IF NOT EXISTS pgcrypto;
SET check_function_bodies = false;

-- GLOBAL FUNCTIONS
CREATE OR REPLACE FUNCTION public.generate_short_id() RETURNS text
    LANGUAGE plpgsql
    AS $$
BEGIN
  RETURN upper(substring(md5(gen_random_uuid()::text)::text from 1 for 8));
END;
$$;

CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;


-- USERS TABLE
CREATE TABLE
  "public"."users" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "email" text NOT NULL,
    "name" text,
    "photo" text,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    UNIQUE ("email")
  );

CREATE TRIGGER "set_public_users_updated_at" BEFORE UPDATE
  ON "public"."users" FOR EACH ROW EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();


-- WORKSPACES TABLE
CREATE TABLE
  "public"."workspaces" (
    "id" text NOT NULL DEFAULT generate_short_id(),
    "name" text NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id")
  );

-- CREATE TRIGGER workspaces_insert_id BEFORE INSERT ON public.workspaces FOR EACH ROW EXECUTE FUNCTION public.generate_short_id();
CREATE TRIGGER "set_public_workspaces_updated_at" BEFORE UPDATE
  ON "public"."workspaces" FOR EACH ROW EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();


-- WORKSPACE ROLES TABLE
CREATE TABLE
  "public"."workspace_roles" (
    "workspace_id" text NOT NULL,
    "user_id" uuid NOT NULL,
    "role" text NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("workspace_id", "user_id"),
    FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") 
      ON UPDATE cascade 
      ON DELETE cascade,
    FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") 
      ON UPDATE cascade 
      ON DELETE cascade
  );

CREATE TRIGGER "set_public_workspace_roles_updated_at" BEFORE UPDATE
  ON "public"."workspace_roles" FOR EACH ROW EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();