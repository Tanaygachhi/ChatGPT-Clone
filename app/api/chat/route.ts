import { streamText, convertToModelMessages } from "ai";
import { groq } from "@ai-sdk/groq";

export async function POST(req: Request) {
  const body = await req.json();

  const result = streamText({
    model: groq("llama-3.1-8b-instant"),
    messages: await convertToModelMessages(body.messages),
  });

  return result.toUIMessageStreamResponse();
}