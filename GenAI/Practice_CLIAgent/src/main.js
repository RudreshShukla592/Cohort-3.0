import { createModel } from "./ai/model/ai.model.js";
import { getApiKey, getSettingsFile, saveApiKey } from "./utils/file.utils.js";
import rl from "./utils/readline.js";

export async function main() {
  const settings = await getSettingsFile();

  if (!settings.apiKey) {
    const apiKey = await rl.question("Please enter the API Key: ");

    await saveApiKey(apiKey);
  }

  const response = await getApiKey();

  if (response.error) {
    console.error("Invalid OR Expired API key");

    const apiKey = await rl.question("Please enter your API key: ");
    await saveApiKey(apiKey);
    return main();
  }
  const apiKey = response.apiKey;

  const model = createModel(apiKey);

  rl.close();
}
