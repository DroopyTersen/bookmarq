import { GetUserByIdQuery, UserFieldsFragment } from "~/.gql/graphql.types";

export type AppUser = UserFieldsFragment;
export type CurrentUser = GetUserByIdQuery["user"];
