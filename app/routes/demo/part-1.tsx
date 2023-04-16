import { ActionArgs } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { MainContentCentered } from "~/features/layout/AppLayout";
import { AppErrorBoundary } from "~/toolkit/components/errors/AppErrorBoundary";
import { LoadingOverlay } from "~/toolkit/components/loaders/LoadingOverlay";

export const action = async ({ request, params }: ActionArgs) => {
  let formData = await request.formData();
  let message = formData.get("message");
  if (!message) {
    return new Response("Message is required", { status: 400 });
  }

  return fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    }),
  });
};

export default function Demo1() {
  let fetcher = useFetcher();
  let isLoading = fetcher?.state !== "idle";
  let data = fetcher.data;
  return (
    <MainContentCentered>
      <fetcher.Form
        method="post"
        className="max-w-md p-4 rounded-lg bg-base-200"
      >
        <fieldset className="relative p-2" disabled={isLoading}>
          <LoadingOverlay isLoading={isLoading}>
            Talking to ChatGPT...
          </LoadingOverlay>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Message</span>
            </label>
            <textarea
              name="message"
              className="h-24 textarea textarea-bordered"
              placeholder="Enter your message..."
              defaultValue="What is 1 + 2? "
            ></textarea>
          </div>
          <div className="mt-4 ">
            <button className="w-full btn btn-secondary">
              Send w/o Streaming
            </button>
          </div>
        </fieldset>
        {data && (
          <pre className="text-sm">{data?.choices?.[0]?.message?.content}</pre>
        )}
      </fetcher.Form>
    </MainContentCentered>
  );
}

export const ErrorBoundary = AppErrorBoundary;
export const CatchBoundary = AppErrorBoundary;
