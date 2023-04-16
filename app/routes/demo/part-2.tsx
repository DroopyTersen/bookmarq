import { useState } from "react";
import { MainContentCentered } from "~/features/layout/AppLayout";
import { LoadingOverlay } from "~/toolkit/components/loaders/LoadingOverlay";

async function connectToEventSource(
  message: string,
  onData: (data: string) => void
) {
  let searchParams = new URLSearchParams({ message });
  const eventSource = new EventSource("/demo/api/stream?" + searchParams);

  eventSource.onmessage = (event) => {
    if (event?.data === "[DONE]") {
      console.log("🚀 | Event stream DONE. Closing event source");
      eventSource.close();
    } else {
      try {
        let data = JSON.parse(event.data);
        let content = data?.choices?.[0]?.delta?.content;
        if (content) {
          onData(content);
        }
      } catch (err) {
        console.log("🚀 | unable to parse data", event?.data);
        eventSource.close();
      }
      console.log("🚀 | eventSource.onmessage | event:", event);
    }
  };

  eventSource.onerror = (event) => {
    console.log("🚀 | eventSource.onerror | event:", event);
    eventSource.close();
  };
}

export default function Demo2() {
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
