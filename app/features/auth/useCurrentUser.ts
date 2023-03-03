import { useRouteData } from "~/toolkit/remix/useRouteData";
import { CurrentUser } from "../users/users.types";

export const useCurrentUser = () => {
  return useRouteData((r) => r?.id === "root" && r?.data?.user) as CurrentUser;
};
