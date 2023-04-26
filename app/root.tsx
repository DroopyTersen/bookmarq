import { json, LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  ShouldRevalidateFunction,
} from "@remix-run/react";
import hightlightJSStyles from "highlight.js/styles/stackoverflow-dark.css";
import globalStyles from "../public/css/global.css";
import { createUserGqlClient } from "./common/hasura.server";
import { authSession } from "./features/auth/authSession.server";
import { newBookmarkJobRunner } from "./features/bookmarks/newBookmarkJob.server";
import { AppLayout } from "./features/layout/AppLayout";
import { getUserById } from "./features/users/users.data.server";
import tailwindStyles from "./styles/tailwind.css";
import { getPublicEnvVars } from "./toolkit/remix/envVars.server";
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStyles },
  { rel: "stylesheet", href: globalStyles },
  { rel: "stylesheet", href: hightlightJSStyles },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "BookmarQ",
  viewport: "width=device-width,initial-scale=1",
});

export const loader = async ({ request }: LoaderArgs) => {
  console.log(newBookmarkJobRunner);
  let userSession = await authSession.get(request);
  let user;
  if (userSession?.userId && userSession?.hasuraToken) {
    user = await getUserById(
      createUserGqlClient(userSession.hasuraToken),
      userSession.userId
    );
  }
  return json({
    user,
    ENV: getPublicEnvVars(),
  });
};

export default function App() {
  return (
    <html
      lang="en"
      data-theme="droopy-theme"
      className="flex flex-col min-h-full"
    >
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex-grow grid grid-rows-[auto_1fr]">
        <AppLayout>
          <Outlet />
        </AppLayout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
export const shouldRevalidate: ShouldRevalidateFunction = ({
  formData,
  formMethod,
}) => {
  let hasSubmission = !!formData && formMethod !== "get";
  return hasSubmission;
};
