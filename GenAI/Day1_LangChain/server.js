import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";
import rl from "readline/promises";

dotenv.config();

const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const model = new ChatGroq({
  model: "openai/gpt-oss-120b",
  apiKey: process.env.GROQ_API_KEY,
});

const messages = [];

while (true) {
  const userInput = await readline.question("Enter your Input: ");

  messages.push({
    role: "user",
    content: userInput,
  });

  //   invoke :- llm send whole res when it has been generated token-by-token
  //   stream:- llm send one token at a time when it has been generated(to increase the UX)
  const stream = await model.stream(messages);

  let aiMessage = "";
  for await (const chunck of stream) {
    aiMessage += chunck.content;
    process.stdout.write(chunck.content);
  }

  messages.push({
    role: "assistant",
    content: aiMessage,
  });
  
  process.stdout.write("\n");

  if (userInput.toLowerCase() === "exit") {
    break;
  }
}
