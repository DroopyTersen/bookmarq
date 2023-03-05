import { Form } from "@remix-run/react";
import { MainContentPadded } from "~/features/layout/AppLayout";
import { InputField, TextAreaField } from "~/toolkit/components/forms";

export default function Index() {
  return (
    <MainContentPadded>
      <Form method="post" className="max-w-sm p-4 mt-4 rounded-lg bg-base-200">
        <fieldset className="space-y-4">
          <InputField
            label="Url"
            name="url"
            // defaultValue={data?.user?.name || ""}
            required
          />
          <InputField
            label="Email"
            name="email"
            disabled
            // defaultValue={data?.user?.email || ""}
          />
          <div className="flex gap-2">
            <TextAreaField
              label="Photo"
              name="photo"
              rows={3}
              // defaultValue={data?.user?.photo || ""}
              // error={findZodFieldError(error, "photo")?.message}
              // onBlur={(e) => setPhoto(e.currentTarget.value)}
            />
            <img
              alt="Profile photo"
              className="m-0 mt-10 rounded-full w-14 h-14"
              src={"https://via.placeholder.com/160?text=No Photo"}
            />
          </div>
          <div>
            <button className="btn btn-secondary btn-block">Save</button>
          </div>
        </fieldset>
      </Form>
    </MainContentPadded>
  );
}
