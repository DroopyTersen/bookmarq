export const isBrowser = typeof window !== "undefined";

export const mergeUrl = (
  { path = "", query = {} }: { path?: string; query?: Record<string, string> },
  location?: { pathname: string; search: string }
) => {
  location = location || isBrowser ? window.location : undefined;
  if (!location) {
    throw new Error("mergeUrl error - you must provide a current location/URL");
  }
  // Incase the path comes in with query params, strip it off to avoid duplicates
  let pathname = (path || location?.pathname)?.split("?")?.[0];
  let searchParams = new URLSearchParams(location?.search);
  Object.keys(query).forEach((key) => {
    let value = query[key];
    if (value) {
      searchParams.set(key, value);
    } else if (!value) {
      searchParams.delete(key);
    }
  });

  return `${pathname}?${searchParams.toString()}`;
};

export const ensureHttps = (requestUrl: string | URL): URL => {
  let url = new URL(requestUrl);
  if (!url.origin.includes("localhost")) {
    url.protocol = "https";
  }

  return url;
};

/** Looks for an returnTo or returnTo query param. Also ensuresHttps */
export const getReturnToUrl = (
  requestUrl: string | URL,
  fallback = ""
): string => {
  if (!requestUrl) return "";

  let url = new URL(requestUrl);
  let returnTo = new URL(
    url.searchParams.get("returnTo") ||
      url.searchParams.get("returnTo") ||
      fallback,
    url.origin
  );

  return ensureHttps(returnTo).href;
};

export const getAuthRedirectUri = (
  returnTo: string,
  callbackPath: string,
  appendReturnTo = true
) => {
  if (!returnTo) return "";

  let urlParts = new URL(returnTo);
  let redirectUri = urlParts.origin + callbackPath;
  if (appendReturnTo) {
    redirectUri += `?returnTo=${encodeURIComponent(returnTo)}`;
  }
  return redirectUri;
};

export const getParentPath = (urlStr: string) => {
  if (!urlStr) return "";
  let url = new URL(urlStr);

  let [, ...reversedParentParts] = url.pathname
    .split("/")
    .filter(Boolean)
    .reverse();

  url.pathname = reversedParentParts.reverse().join("/");

  return url.toString();
};
