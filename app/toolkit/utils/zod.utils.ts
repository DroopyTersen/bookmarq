import { ZodError } from "zod";

export const findZodFieldError = (error: ZodError, fieldname: string) => {
  return error?.issues?.find((issue) => issue?.path?.[0] === fieldname);
};
