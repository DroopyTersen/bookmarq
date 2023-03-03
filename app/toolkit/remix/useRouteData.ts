import { useMatches } from "@remix-run/react";

type RouteSelector = <T>(route: ReturnType<typeof useMatches>[0]) => T;

export const useRouteData = (selector: RouteSelector) => {
  return selectRouteData(useMatches(), selector);
};

export const selectRouteData = (
  matches: ReturnType<typeof useMatches>,
  selector: RouteSelector
) => {
  let match = matches.reverse()?.find(selector);
  return selector(match);
};
