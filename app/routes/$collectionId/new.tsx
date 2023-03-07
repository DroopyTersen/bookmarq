import { ActionArgs, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import { BsArrowLeftShort } from "react-icons/bs";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { requireAuthenticatedAction } from "~/features/auth/auth.remix.server";
import { createBookmark } from "~/features/bookmarks/bookmarks.data.server";
import { processUrl } from "~/features/bookmarks/processUrl";
import { getCache } from "~/features/cache/getCache.server";
import { MainContentCentered } from "~/features/layout/AppLayout";
import { InputField } from "~/toolkit/components/forms";
import { LoadingLogo } from "~/toolkit/components/loaders/LoadingLogo";
import { Overlay } from "~/toolkit/components/overlay/Overlay";
import { tryParseActionError } from "~/toolkit/remix/tryParseActionError.server";
import { useSearchParam } from "~/toolkit/remix/useSearchParam";

function Logo({ className = "" }) {
  return <img src="/images/icons/icon-128x128.png" className={className} />;
}
export default function Index() {
  let actionData = useActionData();
  let errors: any[] = actionData?.errors;
  let formErrors = errors?.filter((e) => !e.path || e?.path === "form");
  let [defaultUrl] = useSearchParam("url");
  let navigation = useNavigation();
  let isSaving = navigation?.state !== "idle";
  let [returnTo] = useSearchParam("returnTo");
  let backUrl = returnTo || "..";

  return (
    <MainContentCentered>
      <Form method="post">
        <fieldset className="relative p-2">
          <Overlay className="rounded-lg" opacity={isSaving ? 0.7 : 0}>
            <div className="flex flex-col items-center">
              <LoadingLogo Logo={Logo} />
              <div className="mt-2 font-bold">Extracting content...</div>
            </div>
          </Overlay>
          <Link
            to={backUrl}
            className="hidden btn btn-ghost btn-circle absolute md:flex md:left-[-50px]"
            title="back"
          >
            <BsArrowLeftShort size={34} />
          </Link>
          <InputField
            label=""
            name="url"
            autoFocus
            required
            aria-label="Bookmark URL"
            hint="BookmarQ will retrieve all the information it can from your URL."
            placeholder="https://example.com/my-cool-article"
            inputClassName="text-sm font-light tracking-wide rounded-full bg-base-200 border-base-200 focus:input-secondary focus:border-transparent"
            error={errors?.find((e) => e?.path === "url")?.message}
            defaultValue={actionData?.formValues?.url || defaultUrl || ""}
          />
          <div className="mt-4 ">
            <button className="w-full btn btn-secondary">Add Bookmark</button>
            <Link to={backUrl} className="w-full mt-4 md:hidden btn btn-ghost">
              Cancel
            </Link>
          </div>
        </fieldset>
      </Form>
    </MainContentCentered>
  );
}

const NewBookmarkInputSchema = zfd.formData({
  url: z.string().url("Please enter a valid URL"),
});

export const action = async ({ request, params }: ActionArgs) => {
  let { formData, gqlClient } = await requireAuthenticatedAction(request);
  try {
    let cache = getCache(request);
    let collectionId = params.collectionId || "";
    let formInput = NewBookmarkInputSchema.parse(formData);
    let bookmarkInput = await processUrl(
      formInput.url,
      { ...formInput, collectionId },
      undefined
    );
    let bookmark = await createBookmark(gqlClient, bookmarkInput);
    if (!bookmark) {
      throw new Error("Bookmark not created");
    }
    return redirect(`/${collectionId}/${bookmark.id}`);
  } catch (err: unknown) {
    return tryParseActionError(err, formData);
  }
};
