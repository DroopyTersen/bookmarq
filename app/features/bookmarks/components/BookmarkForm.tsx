import { Form, Link, useActionData } from "@remix-run/react";
import { ErrorContainer } from "~/toolkit/components/errors/ErrorContainer";
import { InputField } from "~/toolkit/components/forms";
import { BookmarkInput } from "../bookmarks.schema";

interface BookmarkFormProps {
  initial?: BookmarkInput;
  returnTo?: string;
}

export function BookmarkForm({ initial, returnTo = ".." }: BookmarkFormProps) {
  let actionData = useActionData();
  let errors: any[] = actionData?.errors;
  let formErrors = errors?.filter((e) => !e.path || e?.path === "form");

  return (
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
          label="Url"
          name="url"
          autoFocus
          required
          error={errors?.find((e) => e?.path === "url")?.message}
          defaultValue={actionData?.formValues?.url || ""}
        />
      </fieldset>
      <div className="flex justify-end gap-2 my-3">
        <Link className="btn btn-ghost" to={returnTo || "/"}>
          Cancel
        </Link>
        <button className="btn btn-primary">Save</button>
      </div>
    </Form>
  );
}
