import decode from "jwt-decode";
import { OAuthTokenData } from "../oauth";
import { clearCookie, readCookie } from "./cookie.utils";

export const AUTH_COOKIE_KEY = "droopy-auth";

export interface CurrentUser {
  name: string;
  email: string;
  picture: string;
  appRole?: string;
  id: string;
}

export interface IdTokenPayload {
  name?: string;
  email?: string;
  picture?: string;
}
/**
 *
 * Tries to parse an id token to pull out user info.
 * Doesn't make an attempt to verify the token
 */
export const parseIdToken = (idToken: string): IdTokenPayload => {
  try {
    let payload = decode(idToken);
    return payload;
  } catch (err) {
    return null;
  }
};

/**
 * Checks for valid auth cookie and returns
 * the raw JWT string, the decoded payload, the the expiration Date
 */
export const parseCookie = (cookie: string): OAuthTokenData => {
  // Check for the cookie
  try {
    const cookeeValue = readCookie(cookie, AUTH_COOKIE_KEY);
    if (!cookeeValue) return null;
    let tokenData: OAuthTokenData = JSON.parse(decodeURIComponent(cookeeValue));
    let expiration = getJwtExpiration(tokenData.access_token);
    // if exipiration is less than now, it is expired
    if (expiration <= new Date()) {
      console.log("EXPIRED auth cookie");
      return null;
    }
    return tokenData;
  } catch (err) {
    return null;
  }
};

export const getUserFromAuthTokens = ({
  access_token,
  id_token,
}): CurrentUser => {
  let user = decode<IdTokenPayload>(id_token);
  let payload = decode(access_token);
  let userId = payload?.["https://hasura.io/jwt/claims"]?.["x-hasura-user-id"];
  let appRole = payload?.["https://hasura.io/jwt/claims"]?.[
    "x-hasura-allowed-roles"
  ]?.includes("admin")
    ? "admin"
    : "user";

  return {
    name: user.name,
    email: user.email,
    picture: user.picture,
    id: userId,
    appRole,
  };
};

export const getUserFromCookie = (cookie: string): CurrentUser => {
  let tokenData = parseCookie(cookie);
  if (!tokenData) return null;
  return getUserFromAuthTokens(tokenData as Required<OAuthTokenData>);
};

/**
 * Returns the JWT payload, but only if it hasn't expired yet.
 * Returns null if it has expired or something is wrong with it
 */
export const parseJWT = <Payload = any>(token): Payload => {
  if (!token) return null;
  try {
    const payload = decode<any>(token);
    const expires = getJwtExpiration(payload);
    if (expires <= new Date()) {
      return null;
    }
    return payload as Payload;
  } catch (err) {
    console.error("uanble to decode jwt", err);
    return null;
  }
};

/** Convert the JWT 'exp' from UTC Seconds to a JS Date */
export const getJwtExpiration = (jwt: { exp: number } | string): Date => {
  let payload = typeof jwt === "string" ? decode<{ exp: number }>(jwt) : jwt;
  const expires = new Date(0);
  expires.setUTCSeconds(payload.exp);
  return expires;
};

export const clearAuthCookie = () => clearCookie(AUTH_COOKIE_KEY);
