import { ActionFunction, redirect } from "@remix-run/node";
import { Form, useSearchParams } from "@remix-run/react";
import React, { useEffect } from "react";
import { getLoginUrl } from "~/features/auth/auth0.server";
import { MainContentPadded } from "~/features/layout/AppLayout";
import { getAuthRedirectUri } from "~/toolkit/http/url.utils";

export const action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  let returnTo = (formData.get("returnTo") || new URL(request.url).origin) + "";
  if (returnTo.startsWith("/")) {
    returnTo = new URL(returnTo, new URL(request.url).origin).href;
  }
  const redirect_uri = getAuthRedirectUri(returnTo + "", "/api/auth-callback");

  let { url } = await getLoginUrl(redirect_uri);
  return redirect(url);
};

export default function () {
  return (
    <MainContentPadded>
      <div className="p-8 text-center rounded-lg">
        <div className="mb-6 text-xl font-bold tracking-wide">
          Click below to with a Github or Google
        </div>
        <LoginButton />
      </div>
    </MainContentPadded>
  );
}

export function LoginButton() {
  let [searchParams] = useSearchParams();
  let [returnTo, setreturnTo] = React.useState<string>(
    searchParams.get("returnTo") || ""
  );

  useEffect(() => {
    setreturnTo((prev) => {
      if (prev.startsWith("/")) {
        return new URL(prev, window.location.origin).href;
      } else return prev;
    });
  }, [searchParams]);

  return (
    <div>
      <Form method="post" action="/login">
        <input type="hidden" name="returnTo" value={returnTo}></input>
        <button className="btn btn-primary">Log in</button>
      </Form>
    </div>
  );
}
