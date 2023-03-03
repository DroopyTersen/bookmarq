import z from "zod";
import { PublicEnvVars, PublicEnvVarSchema } from "./useEnvVar";

export const getEnvVar = (key: keyof EnvVars, fallback = "") => {
  if (!key) return "";
  let envVars = EnvVarSchema.parse(process.env);

  return envVars[key] || fallback;
};

export const PrivateEnvVarSchema = z.object({
  HASURA_GRAPHQL_ENDPOINT: z.string().startsWith("http"),
  HASURA_GRAPHQL_ADMIN_SECRET: z.string().min(1),
  HASURA_JWT_SECRET: z.string().min(32),
  SESSION_SECRET: z.string().optional(),
  OAUTH_CLIENT_ID: z.string().min(1),
  OAUTH_CLIENT_SECRET: z.string().min(1),
  AUTH0_TENANT: z.string().min(1),
});
export const EnvVarSchema = PrivateEnvVarSchema.extend(
  PublicEnvVarSchema.shape
);

export type EnvVars = z.infer<typeof EnvVarSchema>;

export const getPublicEnvVars = (): PublicEnvVars => {
  let envVars = EnvVarSchema.parse(process.env);

  const publicEnv = Object.entries(envVars).reduce(
    (acc: Record<string, string>, [key, value]) => {
      if (key.startsWith("PUBLIC_")) {
        acc[key] = value;
      }
      return acc;
    },
    {}
  );
  return PublicEnvVarSchema.parse(publicEnv);
};
