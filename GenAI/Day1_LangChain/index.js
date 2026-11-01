import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";
import rl from "readline/promises";
import { tool, createAgent } from "langchain";
import * as z from "zod";
import { StateGraph, START, END } from "@langchain/langgraph";

dotenv.config();

const events = [];
const createEventTool = tool(
  // this func. always want arguement as an object & this func. is used by AI
  async ({ date, title, description }) => {
    console.log("Creating event!", { date, title, description });

    events.push({ date, title, description });

    return "Event Created!";
  },

  // zod is used to define format of the data
  {
    name: "createEvent",
    description: "Create a new event with date, title, description",
    schema: z.object({
      date: z.string(),
      title: z.string(),
      description: z.string(),
    }),
  },
);

const getEventTool = tool(
  async ({}) => {
    return events;
  },
  {
    name: "getEvents",
    description: "Retrieve all events",
    schema: z.object({}),
  },
);

const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const model = new ChatGroq({
  model: "openai/gpt-oss-120b",
  apiKey: process.env.GROQ_API_KEY,
});

const agent = createAgent({
  model,
  tools: [createEventTool, getEventTool],
});

//  ---------- LLM_Node ---------
async function LLMNode(state) {
  console.log("LLMNode state: ", state);

  return {
    messages: [
      ...state.messages,
      {
        role: "assistant",
        content: "Hello, user!",
      },
    ],
  };
}

const graph = new StateGraph(
  z.object({
    messages: z.array(
      z.object({
        role: z.string(),
        content: z.string(),
      }),
    ),
  }),
)
  .addNode("LLMNode",LLMNode)
  .addEdge(START, "LLMNode")
  .addEdge("LLMNode", END)
  .compile()

const graphResult = await graph.invoke({
  messages: [
    {
      role: "user",
      content: "Hello, world",
    },
  ],
});

console.log("The graph result:- ", graphResult);

// while (true) {
//   const userInput = await readline.question("Enter your Input: ");

//   if (userInput.toLowerCase() === "exit") {
//     break;
//   }

//   //   messages.push({
//   //     role: "user",
//   //     content: userInput,
//   //   });

//   const stream = await agent.stream(
//     {
//       messages: [
//         {
//           role: "user",
//           content: userInput,
//         },
//       ],
//     },
//     { streamMode: "messages" },
//   );

//   let aiMessage = "";
//   for await (const [chunck] of stream) {
//     process.stdout.write(chunck.content);
//   }

//   //   messages.push({
//   //     role: "assistant",
//   //     content: aiMessage,
//   //   });

//   process.stdout.write("\n");
// }
