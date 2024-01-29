import { HfInference } from "@huggingface/inference";

import { HuggingFaceStream, StreamingTextResponse } from "ai";

const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY!);

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();

  // Request the OpenAI API for the response based on the prompt
  const response = await Hf.textGenerationStream({
    model: "EleutherAI/gpt-neox-20b",
    inputs: `Given the following anime list, recommend five similar to them. 
    Respond with a JSON object of anime {name: "example", episodes: 12, seasons: 1} or an empty {} if there's none. Only respond with an JSON object. Anime list:
    ${prompt}
            
    Output:\n`,
    parameters: {
      max_new_tokens: 200,
      temperature: 0.5,
      top_p: 0.95,
      top_k: 4,
      repetition_penalty: 1.03,
      truncate: 1000,
    },
  });

  const stream = HuggingFaceStream(response);

  return new StreamingTextResponse(stream);
}
