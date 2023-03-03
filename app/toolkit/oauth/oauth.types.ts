export interface OAuthConfig {
  client_id: string;
  client_secret: string;
  auth_uri: string;
  token_uri: string;
  logout_uri?: string;
  scope?: string;
  redirect_uri?: string;
}

export interface OAuthTokenData {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  id_token?: string;
  scope?: string;
  token_type?: string;
  /** An actual date string we tack on */
  expires?: string;
}

export interface RefreshTokenData {
  access_token: string;
  expires_in: number;
  scope?: string;
  token_type?: string;
}

export interface TokenParams {
  client_id?: string;
  client_secret?: string;
  redirect_uri?: string;
  code?: string;
  refresh_token?: string;
  grant_type?: string;
  state?: string;
}

export interface AuthRedirectParams {
  client_id: string;
  redirect_uri: string;
  scope: string;
  response_type?: string;
  access_type?: string;
  state?: string;
  include_granted_scopes?: string;
  prompt?: string;
}
