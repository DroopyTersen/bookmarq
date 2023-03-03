import { AuthRedirectParams, OAuthConfig } from "~/toolkit/oauth/oauth.types";
import { fetchToken } from "~/toolkit/oauth/oauth.utils";
import { getEnvVar } from "~/toolkit/remix/envVars.server";

// https://auth0.com/docs/get-started/authentication-and-authorization-flow/add-login-auth-code-flow
const AUTH0_TENANT = getEnvVar("AUTH0_TENANT");

const oauthConfig: OAuthConfig = {
  auth_uri: `https://${AUTH0_TENANT}.us.auth0.com/authorize`,
  token_uri: `https://${AUTH0_TENANT}.us.auth0.com/oauth/token`,
  logout_uri: `https://${AUTH0_TENANT}.us.auth0.com/v2/logout`,
  scope: "openid profile email",
  client_id: getEnvVar("OAUTH_CLIENT_ID"),
  client_secret: getEnvVar("OAUTH_CLIENT_SECRET"),
};

export const fetchProfile = async function (
  token: string
): Promise<UserProfile> {
  let data = await fetch("https://droopytersen.us.auth0.com/userinfo", {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((resp) => resp.json());
  return data as UserProfile;
};

const STATE = "IshouldbeusingthisbutI'mnot";

export async function getLoginUrl(redirect_uri: string) {
  // console.log("🚀 | getAuthRedirectUrl | config", config);
  let params: AuthRedirectParams = {
    response_type: "code",
    client_id: oauthConfig.client_id,
    state: STATE,
    scope: oauthConfig.scope + "",
    redirect_uri,
  };
  return {
    url: oauthConfig.auth_uri + "?" + new URLSearchParams(params as any),
    params,
  };
}

export const getLogoutUrl = (redirect_uri: string) => {
  let params = {
    client_id: oauthConfig.client_id,
    returnTo: redirect_uri,
  };
  return oauthConfig.logout_uri + "?" + new URLSearchParams(params as any);
};

export interface OAuthAccessTokenParams {
  redirect_uri: string;
  code: string;
  client_id: string;
  client_secret: string;
  state: string;
}

export async function fetchAccessToken(code: string, redirect_uri: string) {
  let params = {
    code,
    grant_type: "authorization_code",
    client_id: oauthConfig.client_id,
    client_secret: oauthConfig.client_secret,
    redirect_uri,
    scope: oauthConfig.scope,
  };
  let tokenData = await fetchToken(oauthConfig.token_uri, params);

  return tokenData;
}

export interface UserProfile {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  middle_name: string;
  nickname: string;
  preferred_username: string;
  profile: string;
  picture: string;
  website: string;
  email: string;
  email_verified: boolean;
  gender: string;
  birthdate: string;
  zoneinfo: string;
  locale: string;
  phone_number: string;
  phone_number_verified: boolean;
  address?: {
    country: string;
  };
  updated_at: string;
}
