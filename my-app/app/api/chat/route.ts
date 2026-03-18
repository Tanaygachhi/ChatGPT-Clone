import { groq } from "@ai-sdk/groq";
import { streamText, convertToModelMessages } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const body = await req.json();

  const messages = await convertToModelMessages(body.messages);

  const result = streamText({
    model: groq("llama3-8b-8192"),
    messages: messages,
  });

  return result.toUIMessageStreamResponse();
}