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

async function fetchOpenAICompletion(prompt: string) {
  // TOOD: make sure chunks don't exceed 8000 tokens
  const url = "https://api.openai.com/v1/chat/completions";
  const model = "gpt-3.5-turbo";
  const messages = [
    {
      role: "user",
      content: prompt,
    },
  ];
  let result = await jsonRequest<OpenAICompletionResponse>(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getEnvVar("OPENAI_API_KEY")}`,
    },
    body: JSON.stringify({
      model,
      messages,
    }),
  });

  return result?.choices?.[0]?.message?.content;
}
