import { AuthRedirectParams, OAuthConfig } from "~/toolkit/oauth/oauth.types";
import { fetchToken } from "~/toolkit/oauth/oauth.utils";
import { getEnvVar } from "~/toolkit/remix/envVars.server";

const githubOAuthConfig: OAuthConfig = {
  auth_uri: "https://github.com/login/oauth/authorize",
  token_uri: "https://github.com/login/oauth/access_token",
  scope: "gist user:email",
  client_id: getEnvVar("OAUTH_CLIENT_ID"),
  client_secret: getEnvVar("OAUTH_CLIENT_SECRET"),
};

export const fetchProfile = async function (
  token: string
): Promise<GitHubUser> {
  let data = await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((resp) => resp.json());
  return data as GitHubUser;
};

const STATE = "IshouldbeusingthisbutI'mnot";

export function getLoginUrl(
  redirect_uri: string,
  scope = githubOAuthConfig.scope
) {
  let oauthParams: AuthRedirectParams = {
    client_id: githubOAuthConfig.client_id,
    scope: scope + "",
    redirect_uri,
    response_type: "code",
    state: STATE,
  };
  // console.log("🚀 | oauthParams", oauthParams);
  return {
    url: `${githubOAuthConfig.auth_uri}?${new URLSearchParams(
      oauthParams as any
    )}`,
    params: oauthParams,
  };
}

export interface OAuthAccessTokenParams {
  redirect_uri: string;
  code: string;
  client_id: string;
  client_secret: string;
  state: string;
}

const TOKEN_ENDPOINT = "https://github.com/login/oauth/access_token";

export async function fetchAccessToken(code: string, redirect_uri: string) {
  let params = {
    code,
    state: STATE,
    client_id: githubOAuthConfig.client_id,
    client_secret: githubOAuthConfig.client_secret,
    redirect_uri,
    scope: githubOAuthConfig.scope,
  };
  let tokenData = await fetchToken(TOKEN_ENDPOINT, params);

  return tokenData;
}

export interface GitHubUser {
  login?: string;
  id?: number;
  node_id?: string;
  avatar_url?: string;
  gravatar_id?: string;
  url?: string;
  html_url?: string;
  followers_url?: string;
  following_url?: string;
  gists_url?: string;
  starred_url?: string;
  subscriptions_url?: string;
  organizations_url?: string;
  repos_url?: string;
  events_url?: string;
  received_events_url?: string;
  type?: string;
  site_admin?: boolean;
  name?: string;
  company?: any;
  blog?: string;
  location?: any;
  email?: any;
  hireable?: any;
  bio?: any;
  public_repos?: number;
  public_gists?: number;
  followers?: number;
  following?: number;
  created_at?: string;
  updated_at?: string;
}
