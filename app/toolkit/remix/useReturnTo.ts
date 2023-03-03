import { useResolvedPath, useSearchParams } from "@remix-run/react";

export const useReturnTo = (to: string) => {
  let [searchParams] = useSearchParams();
  let resolvedPath = useResolvedPath(searchParams.get("returnTo") || to);

  let path = resolvedPath.pathname;
  if (resolvedPath.hash) {
    path += "#" + resolvedPath.hash;
  }
  if (resolvedPath.search) {
    path += resolvedPath.search;
  }
  return path;
};
