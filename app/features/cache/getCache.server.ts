import { HasuraCache } from "~/features/cache/HasuraCache";
import { ICache } from "~/features/cache/ICache";

export const getCache = (request: Request): ICache | undefined => {
  // look for a bustCache query param otherwise create an instance of HasuraCache
  let url = new URL(request.url);
  let bustCache = url.searchParams.get("bustCache");
  let cache = !bustCache ? new HasuraCache() : undefined;
  return cache;
};
