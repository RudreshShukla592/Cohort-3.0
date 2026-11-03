import { ChatGroq } from "@langchain/groq";

export function createModel(apiKey) {
  const model = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey:apiKey
  });

  return model
}
