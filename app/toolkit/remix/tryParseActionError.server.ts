import { json } from "@remix-run/node";
import { ZodError } from "zod";
import { formDataToObject } from "../utils/formDataToObj";

type HasuraGqlError = {
  response: {
    errors: {
      extensions: {
        code: string;
        path: string;
      };
      message: string;
    }[];
  };
};

export const tryParseActionError = (err: any, formData: any) => {
  // check if formData is type FormData and convert to object if so
  let submittedValues = formDataToObject(formData);
  console.log("🚀 | tryParseActionError | message", err?.message);
  // loop through th error properties and log them
  if ("issues" in err) {
    let zodError = err as ZodError;
    let errors = zodError?.issues?.map((issue) => ({
      path: issue.path.join("."),
      message: `${issue.message}`,
    }));
    console.log("Error parsing note form values", err);
    return json({ errors, submittedValues }, { status: 400 });
  } else if ("response" in err) {
    // It's a graphql error
    let gqlError = err as HasuraGqlError;
    let errors = gqlError?.response?.errors;
    let codes = errors?.map((e) => e?.extensions?.code).filter(Boolean);
    let status = 500;
    if (codes.includes("permission-error")) status = 403;
    return json({ errors, submittedValues }, { status });
  }
  return json({ errors: [err], submittedValues }, { status: 500 });
};
