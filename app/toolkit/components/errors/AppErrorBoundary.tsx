import { useCatch } from "@remix-run/react";
import { ErrorContainer } from "./ErrorContainer";

// We can reuse this component for
// both unhandled exceptions (ErrorBoundary)
// and thrown Responses (CatchBoundary)
export const AppErrorBoundary = ({
  error: errorBoundaryError,
}: {
  error: any;
}) => {
  let caughtThing = useCatch();
  let error = caughtThing || errorBoundaryError;
  let message = tryParseMessage(error);

  return (
    <ErrorContainer title="Whoopsies" className="m-4 md:m-6">
      <pre className="whitespace-pre-wrap">{message}</pre>
    </ErrorContainer>
  );
};

type ThrownErrorType =
  | string
  | Error
  | { status: number; data: any }
  // DIY Error
  | { message: string }
  // Diy error array
  | { message: string }[];

let tryParseMessage = (thrown: ThrownErrorType) => {
  if (!thrown) return "Unknown error";
  if (typeof thrown === "string") return thrown;
  if ("message" in thrown) return thrown.message;
  if ("data" in thrown) {
    return thrown.data?.message || thrown.data;
  }
  if (Array.isArray(thrown))
    return thrown
      .map((e) => e?.message)
      .filter(Boolean)
      .join(", ");

  return "Unknown error";
};
