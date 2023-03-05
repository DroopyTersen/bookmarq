import { Form, Link, useActionData } from "@remix-run/react";
import { ErrorContainer } from "~/toolkit/components/errors/ErrorContainer";
import { InputField, TextAreaField } from "~/toolkit/components/forms";
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
    <Form method="post" className="max-w-xl">
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
        <TextAreaField
          label="Url"
          name="url"
          autoFocus
          required
          rows={2}
          error={errors?.find((e) => e?.path === "url")?.message}
          defaultValue={actionData?.formValues?.url || ""}
        />
        <InputField
          label="Title"
          name="title"
          required
          error={errors?.find((e) => e?.path === "title")?.message}
          defaultValue={actionData?.formValues?.title || ""}
        />
        <TextAreaField
          label="Description"
          name="description"
          rows={6}
          error={errors?.find((e) => e?.path === "description")?.message}
          defaultValue={actionData?.formValues?.description || ""}
        />
      </fieldset>
      <div className="flex justify-end gap-2 my-3">
        <Link className="btn btn-ghost" to={returnTo || "/"}>
          Cancel
        </Link>
        <button className="btn btn-secondary">Save</button>
      </div>
    </Form>
  );
}
