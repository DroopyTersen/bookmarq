import { useState } from "react";
import { MainContentCentered } from "~/features/layout/AppLayout";
import { LoadingOverlay } from "~/toolkit/components/loaders/LoadingOverlay";

async function connectToEventSource(
  message: string,
  onData: (data: string) => void
) {
  const response = await fetch("/demo/api/stream", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: new URLSearchParams({ message }).toString(),
  });

  if (!response.ok || !response.body) {
    throw new Error("Network response was not ok");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  reader.read().then(function processResult(result) {
    if (result.done) {
      return;
    }

    const chunk = decoder.decode(result.value, { stream: true });
    console.log("🚀 | processResult | chunk:", chunk);
    const events = chunk.split("\n\n");
    console.log("🚀 | processResult | events:", events);

    for (const event of events) {
      if (event.startsWith("data:")) {
        const eventData = event.slice(5).trim();
        try {
          let data = JSON.parse(eventData);
          console.log(
            "🚀 | processResult | eventData:",
            JSON.stringify(data, null, 2)
          );
          let content = data?.choices?.[0]?.delta?.content;
          if (content) {
            onData(content);
          }
        } catch (err) {
          console.log("🚀 | unable to parse data", eventData);
        }
      }
    }

    reader.read().then(processResult);
  });
}

export default function Demo1() {
  const [streamingData, setStreamingData] = useState("");
  const isLoading = false;
  return (
    <MainContentCentered>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setStreamingData("");
          const formData = new FormData(event.target as HTMLFormElement);
          connectToEventSource(
            (formData.get("message") as any) || "",
            (data) => {
              setStreamingData((prev) => prev + data);
            }
          );
        }}
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
              defaultValue="What are the advantages of using Remix as a web framework?"
              placeholder="Enter your message..."
            ></textarea>
          </div>
          <div className="mt-4 ">
            <button className="w-full btn btn-secondary">
              Send w/ Streaming
            </button>
          </div>
        </fieldset>
        {streamingData && <pre className="text-sm">{streamingData}</pre>}
      </form>
    </MainContentCentered>
  );
}
