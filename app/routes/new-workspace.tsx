import { ActionArgs, json, LoaderArgs, redirect } from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { createAdminGqlClient } from "~/common/hasura.server";
import {
  requireAuthenticatedAction,
  requireAuthenticatedLoader,
} from "~/features/auth/auth.remix.server";
import { MainContentPadded } from "~/features/layout/AppLayout";
import { createNewWorkspace } from "~/features/users/users.data.server";
import { AppErrorBoundary } from "~/toolkit/components/errors/AppErrorBoundary";
import { ErrorContainer } from "~/toolkit/components/errors/ErrorContainer";
import { InputField } from "~/toolkit/components/forms";
import { tryParseActionError } from "~/toolkit/remix/tryParseActionError.server";
import { useSearchParam } from "~/toolkit/remix/useSearchParam";

export const loader = async ({ request, params }: LoaderArgs) => {
  await requireAuthenticatedLoader(request);
  return json({});
};

function handleButtonClick() {
  alert("Hey there natalie");
}

export default function NewWorkspace() {
  let data = useLoaderData<typeof loader>();
  let actionData = useActionData();
  let errors: any[] = actionData?.errors;
  let formErrors = errors?.filter((e) => !e.path || e?.path === "form");
  let [returnTo] = useSearchParam("returnTo");
  let navigate = useNavigate();
  return (
    <MainContentPadded>
      <h1 className="text-secondary">New Workspace</h1>
      <Form
        method="post"
        className="max-w-sm p-4 mt-4 rounded-lg shadow bg-base-200"
      >
        {formErrors?.length > 0 && (
          <ErrorContainer>
            <ul>
              {formErrors?.map((e) => (
                <li key={e.message}>{e.message}</li>
              ))}
            </ul>
          </ErrorContainer>
        )}
        <fieldset className="space-y-4">
          <InputField
            label="Workspace Name"
            name="name"
            autoFocus
            required
            error={errors?.find((e) => e?.path === "name")?.message}
            defaultValue={actionData?.formValues?.name || ""}
          />
        </fieldset>
        <div className="flex justify-end gap-2 my-3">
          <Link className="btn btn-ghost" to={returnTo || "/"}>
            Cancel
          </Link>
          <button className="btn btn-primary">Save</button>
        </div>
      </Form>
    </MainContentPadded>
  );
}
const NewWorkspaceSchema = zfd.formData({
  name: z.string().min(3).max(100),
});

export const action = async ({ request, params }: ActionArgs) => {
  let { formData, gqlClient, userId } = await requireAuthenticatedAction(
    request
  );
  try {
    let input = NewWorkspaceSchema.parse(formData);
    let workspace = await createNewWorkspace(
      createAdminGqlClient(),
      // gqlClient,
      userId,
      input.name
    );

    return redirect("/" + workspace?.id);
  } catch (err: unknown) {
    return tryParseActionError(err, formData);
  }
};

export const ErrorBoundary = AppErrorBoundary;
export const CatchBoundary = AppErrorBoundary;
