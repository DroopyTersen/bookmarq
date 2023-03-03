import z from "zod";
import {
  CreateWorkspaceDocument,
  GetUserByIdDocument,
  GetUserRolesDocument,
  GetUsersByEmailDocument,
  InsertUserDocument,
  UpdateUserDocument,
  UsersInsertInput,
} from "~/.gql/graphql.types";

import { GqlClient } from "~/toolkit/http/createGqlClient";

export const getUserByEmail = async (gqlClient: GqlClient, email: string) => {
  let data = await gqlClient.request(GetUsersByEmailDocument, { email });
  return data?.users?.[0];
};

export const getUserById = async (gqlClient: GqlClient, id: string) => {
  let data = await gqlClient.request(GetUserByIdDocument, { id });
  return data?.user;
};

export const createNewWorkspace = async (
  gqlClient: GqlClient,
  userId: string,
  workspaceName: string
) => {
  let data = await gqlClient.request(CreateWorkspaceDocument, {
    name: workspaceName,
    userId,
  });
  return data?.workspace;
};

/** Creates a User,Team, and Org if necessary */
export const insertUserAndEnsureWorkspace = async (
  gqlClient: GqlClient,
  { name, email, photo }: UsersInsertInput
) => {
  let data = await gqlClient.request(InsertUserDocument, {
    name,
    email,
    photo,
  });
  let user = data?.user;

  if (!user?.id) throw new Error("Unable to create new user");

  let roleData = await gqlClient.request(GetUserRolesDocument, {
    userId: user.id,
  });

  let hasWorkspace = roleData?.user?.roles
    ? roleData?.user?.roles?.length > 0
    : false;

  if (!hasWorkspace) {
    await gqlClient.request(CreateWorkspaceDocument, {
      name: `Personal`,
      userId: user.id,
    });
  }

  return data?.user;
};

const UpdateUserSchema = z.object({
  name: z.string().optional(),
  photo: z.string().url().or(z.literal("")),
});

export const updateUserProfile = async (
  gqlClient: GqlClient,
  userId: string,
  formData: FormData
) => {
  let updates = UpdateUserSchema.parse(Object.fromEntries(formData));
  let data = await gqlClient.request(UpdateUserDocument, {
    id: userId,
    updates,
  });

  return data?.user;
};
