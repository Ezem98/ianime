import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
// but configure it to point to fireworks.ai
const fireworks = new OpenAI({
  apiKey: process.env.FIREWORKS_API_KEY || "",
  baseURL: "https://api.fireworks.ai/inference/v1",
});
// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();

  // Ask Fireworks for a streaming chat completion using Llama 2 70b model
  // @see https://app.fireworks.ai/models/fireworks/llama-v2-70b-chat
  const response = await fireworks.completions.create({
    model: "accounts/fireworks/models/llama-v2-70b-chat",
    stream: true,
    max_tokens: 1000,
    prompt: `Given the following anime list, recommend five similar to them. 
    Respond with a JSON object of anime {name: "example", episodes: 12, seasons: 1} or an empty {} if there's none. Only respond with an JSON object. Anime list:
    ${prompt}
            
    Output:\n`,
  });
  // Convert the response into a friendly text-stream.
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
