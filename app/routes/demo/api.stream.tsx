import { ActionArgs } from "@remix-run/node";

export const loader = async ({ request }: ActionArgs) => {
  let urlSearchParams = new URL(request?.url).searchParams;
  let message = urlSearchParams.get("message");
  if (!message) {
    return new Response("Message is required", { status: 400 });
  }
  return fetchChatCompletion(message + "");
};

export const action = async ({ request, params }: ActionArgs) => {
  let formData = await request.formData();
  let message = formData.get("message");
  if (!message) {
    return new Response("Message is required", { status: 400 });
  }
  return fetchChatCompletion(message + "");
};

const fetchChatCompletion = async (prompt: string) => {
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
          content: prompt,
        },
      ],
    }),
  });
};
