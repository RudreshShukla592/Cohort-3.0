import { ChatGroq } from "@langchain/groq";
import { getApiKey } from "../utils/file.utils.js";
import {AIMessage} from "langchain"
import { upsertFileTool } from "../ai/tools/file.tool.js";

export async function LLMNode(state,config) {
  const model = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey: (await getApiKey()).apiKey
  });

  const modelWithTools = model.bindTools([upsertFileTool])

  const stream = await modelWithTools.stream(state.messages)

  process.stdout.write("[AI]: ")

  let aiMessage=""
  for await(let chunck of stream){
    aiMessage+=chunck.text
    console.log(chunck);
    process.stdout.write(chunck.text)
  }

  process.stdout.write("\n")
  return {
    messages:[...state.messages,new AIMessage(aiMessage)]
  };
}
