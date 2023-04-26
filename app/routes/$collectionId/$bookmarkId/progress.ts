import { LoaderArgs } from "@remix-run/node";
import { JOB_EVENTS } from "~/common/Job";
import { newBookmarkJobRunner } from "~/features/bookmarks/newBookmarkJob.server";

export const loader = ({ request, params }: LoaderArgs) => {
  return eventStream(request.signal, (send) => {
    let unsubscribe = newBookmarkJobRunner.subscribe(
      params.bookmarkId!,
      (event) => {
        let clientData = {
          bookmark: {
            title:
              event?.data?.bookmark?.title ||
              event?.data.article?.title ||
              event?.data.embed?.title ||
              "",
            image: event?.data?.bookmark?.image,
          },
          type: event.type,
          step: event?.step,
        };
        send({
          data: JSON.stringify(clientData),
        });
        if (event.type === JOB_EVENTS.JOB_COMPLETE) {
          console.log("JOB IS DONE. TODO: Close the EventStream?");
        }
      }
    );

    return () => {
      unsubscribe();
    };
  });
};

interface SendFunctionArgs {
  /**
   * @default "message"
   */
  event?: string;
  data: string;
}

interface SendFunction {
  (args: SendFunctionArgs): void;
}

interface CleanupFunction {
  (): void;
}

interface InitFunction {
  (send: SendFunction): CleanupFunction;
}

/**
 * A response holper to use Server Sent Events server-side
 * @param signal The AbortSignal used to close the stream
 * @param init The function that will be called to initialize the stream, here you can subscribe to your events
 * @returns A Response object that can be returned from a loader
 */
function eventStream(signal: AbortSignal, init: InitFunction) {
  let stream = new ReadableStream({
    start(controller) {
      let encoder = new TextEncoder();

      function send({ event = "message", data }: SendFunctionArgs) {
        controller.enqueue(encoder.encode(`event: ${event}\n`));
        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
      }

      let cleanup = init(send);

      let closed = false;

      function close() {
        if (closed) return;
        cleanup();
        closed = true;
        signal.removeEventListener("abort", close);
        controller.close();
      }

      signal.addEventListener("abort", close);

      if (signal.aborted) return close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
