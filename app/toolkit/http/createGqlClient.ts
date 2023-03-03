import { GraphQLClient } from "graphql-request";

export type GqlClient = GraphQLClient;

export function createGraphQLClient(
  endpoint: string,
  { access_token = "", staticHeaders = {} } = {}
): GqlClient {
  if (!endpoint)
    throw new Error(
      "Missing GQL Endpoint - createGqlClient() called without an endpoint"
    );

  let client = new GraphQLClient(endpoint, {
    headers: staticHeaders,
    fetch,
  });
  if (access_token) {
    client.setHeader("Authorization", `Bearer ${access_token}`);
  }

  return client;
}
