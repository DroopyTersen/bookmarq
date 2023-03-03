import dayjs from "dayjs";
import decode from "jwt-decode";
import { OAuthTokenData } from "./oauth.types";

export const tryParseIdToken = (data: OAuthTokenData) => {
  if (!data?.id_token) return "";

  try {
    let payload: any = decode(data.id_token);
    return payload?.email;
  } catch (err) {
    return "";
  }
};

export const calcTokenExpiration = (data: OAuthTokenData) => {
  if (!data.expires_in) return null;
  return dayjs().add(data.expires_in, "seconds").format();
};

export const fetchToken = (
  token_uri: string,
  params: any
): Promise<OAuthTokenData> => {
  return fetch(token_uri, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(params).toString(),
  }).then(async (resp) => {
    if (!resp.ok) {
      let errorText = await resp.text();
      let error = new Error("Unable to get token: " + errorText);
      // See if the error came back as JSON
      try {
        let errorData = JSON.parse(errorText);
        error = {
          message: "Invalid credential (unable to get access token)",
          status: resp.status,
          ...errorData,
        };
      } catch (err) {}
      throw error;
    }
    return resp.json();
  });
};
