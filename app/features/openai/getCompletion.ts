import { jsonRequest } from "~/toolkit/http/fetch.utils";
import { getEnvVar } from "~/toolkit/remix/envVars.server";

interface OpenAICompletionResponse {
  choices: [
    {
      index: number;
      message: {
        role: string;
        content: string;
      };
      finish_reason: string;
    }
  ];
}

export async function getAnswerQuestionPrompt(
  context: string,
  question: string
) {
  let prompt = `=== Start of context ===
${context}
=== End of context ===

Using the context above, answer the following question. If you don't know, that is fine, just say so. Don't make anything up.

Question: ${question}`;

  return fetchOpenAICompletion(prompt);
}

export async function summarizeText(
  articleText: string,
  onContent: (deltaContent: string) => void
) {
  if (articleText.length < 240) {
    console.log("Text is too short to summarize");
    return "";
  }
  const prompt = `Please provide a concise and engaging summary of the following article. Focusing on the main topic, then do some analysis to identify key insights, and important takeaways. Ensure that the summary is less than 300 characters. Please use line breaks and dashed bullet points to improve readability.
  === Start of Article text ===
  
  ${articleText}
  
  === End of Article text ===
  `;
  return streamChatCompletion(prompt, onContent);
}

async function fetchOpenAICompletion(prompt: string, stream = false) {
  // TOOD: make sure chunks don't exceed 8000 tokens
  const url = "https://api.openai.com/v1/chat/completions";

  let bodyData: any = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  };
  if (stream) {
    bodyData.stream = true;
  }
  let result = await jsonRequest<OpenAICompletionResponse>(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getEnvVar("OPENAI_API_KEY")}`,
    },
    body: JSON.stringify(bodyData),
  });

  return result?.choices?.[0]?.message?.content;
}

export const streamChatCompletion = async (
  prompt: string,
  onContent?: (deltaContent: string) => void
) => {
  let response = fetch("https://api.openai.com/v1/chat/completions", {
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

  if (onContent) {
    return handleChatCompletionStream(await response, onContent);
  }
  return response;
};

async function handleChatCompletionStream(
  response: Response,
  onData: (data: string) => void
) {
  if (!response.ok || !response.body) {
    throw new Error("Network response was not ok");
  }
  return new Promise((resolve, reject) => {
    let fullContent = "";
    const reader = response?.body?.getReader();
    if (!reader) {
      reject("No reader");
      return;
    }
    const decoder = new TextDecoder("utf-8");

    reader.read().then(function processResult(result) {
      if (result.done) {
        resolve(fullContent);
        return;
      }

      const chunk = decoder.decode(result.value, { stream: true });
      console.log("🚀 | processResult | chunk:", chunk);
      const events = chunk.split("\n\n");
      console.log("🚀 | processResult | events:", events);

      for (const event of events) {
        if (event.startsWith("data:")) {
          const eventData = event.slice(5).trim();
          if (eventData === "[DONE]") {
            resolve(fullContent);
            return;
          }
          try {
            let data = JSON.parse(eventData);
            console.log(
              "🚀 | processResult | eventData:",
              JSON.stringify(data, null, 2)
            );
            let content = data?.choices?.[0]?.delta?.content;
            if (content) {
              fullContent += content;
              onData(content);
            }
          } catch (err) {
            console.log("🚀 | unable to parse data", eventData);
          }
        }
      }

      reader.read().then(processResult);
    });
  });
}
