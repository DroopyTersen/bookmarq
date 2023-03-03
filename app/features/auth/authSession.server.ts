import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { getEnvVar } from "~/toolkit/remix/envVars.server";

const SESSION_SECRET =
  getEnvVar("SESSION_SECRET") || getEnvVar("HASURA_JWT_SECRET");
const SESSION_NAME = "__auth_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

interface SessionData {
  userId: string;
  hasuraToken: string;
}

const storage = createCookieSessionStorage({
  cookie: {
    name: SESSION_NAME,
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === "production",
    secrets: SESSION_SECRET ? [SESSION_SECRET] : undefined,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
    httpOnly: true,
  },
});

export const authSession = {
  /** Create a session cookie for the user who as just logged in */
  create: async (sessionData: SessionData, redirectTo = "/") => {
    const session = await storage.getSession();
    session.set("data", sessionData);
    return redirect(redirectTo, {
      headers: {
        "Set-Cookie": await storage.commitSession(session),
      },
    });
  },
  /** Deletes the session cookie and redirects the user. */
  logout: async (request: Request, redirectTo = "/") => {
    const session = await authSession._getSession(request);
    return redirect(redirectTo, {
      headers: {
        "Set-Cookie": await storage.destroySession(session),
      },
    });
  },
  /** Gets the raw Session from the request Cookie */
  _getSession: (request: Request) =>
    storage.getSession(request.headers.get("Cookie")),
  /** Gets the SessionData from the request Cookie. Returns null if no session. */
  get: async (request: Request) => {
    const session = await authSession._getSession(request);
    let data: SessionData = session?.get?.("data");

    return data || null;
  },
  /** Redirects to /login if no user session */
  require: async (request: Request, returnTo: string = "") => {
    let { pathname, search } = new URL(request.url);
    if (!returnTo) returnTo = `${pathname}${search}`;
    let sessionData = await authSession.get(request);
    if (!sessionData) {
      const searchParams = new URLSearchParams([["returnTo", returnTo]]);
      throw redirect(`/login?${searchParams}`);
    }
    return sessionData;
  },
};
