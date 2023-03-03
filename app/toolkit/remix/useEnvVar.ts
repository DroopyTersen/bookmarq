import z from "zod";
import { useRouteData } from "./useRouteData";

export const useEnvVars = (): PublicEnvVars => {
  return useRouteData((r) => r.id === "root" && r?.data?.ENV) as PublicEnvVars;
};

export const useEnvVar = (key: keyof PublicEnvVars, fallback = ""): string => {
  let envVars = useEnvVars();
  return envVars?.[key] || fallback;
};

export const PublicEnvVarSchema = z.object({
  PUBLIC_ENV: z.string(),
});

export type PublicEnvVars = z.infer<typeof PublicEnvVarSchema>;
