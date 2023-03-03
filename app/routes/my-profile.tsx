import { ActionArgs, json, LoaderArgs, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { ZodError } from "zod";
import {
  requireAuthenticatedAction,
  requireAuthenticatedLoader,
} from "~/features/auth/auth.remix.server";
import { MainContentPadded } from "~/features/layout/AppLayout";
import {
  getUserById,
  updateUserProfile,
} from "~/features/users/users.data.server";
import { AppErrorBoundary } from "~/toolkit/components/errors/AppErrorBoundary";
import { InputField, TextAreaField } from "~/toolkit/components/forms";
import { findZodFieldError } from "~/toolkit/utils/zod.utils";

export const loader = async ({ request, params }: LoaderArgs) => {
  let { userId, gqlClient } = await requireAuthenticatedLoader(request);
  let user = await getUserById(gqlClient, userId);
  return json({ user });
};

export default function MyProfileRoute() {
  let data = useLoaderData<typeof loader>();
  let actionData = useActionData();
  let error: ZodError = actionData?.error;
  let [photo, setPhoto] = useState(
    data?.user?.photo || "https://via.placeholder.com/300"
  );

  return (
    <MainContentPadded>
      <div className="flex items-center gap-4">
        <img
          alt="Profile photo"
          className="w-24 m-0 rounded-full"
          src={
            data?.user?.photo || "https://via.placeholder.com/160?text=No Photo"
          }
        />
        <div>
          <div className="text-lg">My Profile</div>
          <h1 className="m-0 text-secondary">{data?.user?.name}</h1>
        </div>
      </div>
      <Form method="post" className="max-w-sm p-4 mt-4 rounded-lg bg-base-200">
        <fieldset className="space-y-4">
          <InputField
            label="Name"
            name="name"
            defaultValue={data?.user?.name || ""}
            required
          />
          <InputField
            label="Email"
            name="email"
            disabled
            defaultValue={data?.user?.email || ""}
          />
          <div className="flex gap-2">
            <TextAreaField
              label="Photo"
              name="photo"
              rows={3}
              defaultValue={data?.user?.photo || ""}
              error={findZodFieldError(error, "photo")?.message}
              onBlur={(e) => setPhoto(e.currentTarget.value)}
            />
            <img
              alt="Profile photo"
              className="m-0 mt-10 rounded-full w-14 h-14"
              src={photo || "https://via.placeholder.com/160?text=No Photo"}
            />
          </div>
          <div>
            <button className="btn btn-primary btn-block">Save</button>
          </div>
        </fieldset>
      </Form>
    </MainContentPadded>
  );
}

export const action = async ({ request, params }: ActionArgs) => {
  let { formData, gqlClient, userId } = await requireAuthenticatedAction(
    request
  );
  try {
    await updateUserProfile(gqlClient, userId, formData);

    return redirect("/my-profile");
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      console.log("ZOD ERROR", err);
      return json({ error: err }, { status: 400 });
    }
    return json(
      { error: err, formValues: Object.fromEntries(formData) },
      { status: 500 }
    );
  }
};

export const ErrorBoundary = AppErrorBoundary;
export const CatchBoundary = AppErrorBoundary;
