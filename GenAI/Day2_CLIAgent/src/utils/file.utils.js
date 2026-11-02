import fs from "fs/promises";
import { CONFIG_DIR, HOME_DIR } from "./constants.js";
import path from "path";

// checks setting.json:- if there is one then it returns it's content and if not then then it creates "setting.json"
export async function getSettingsFile() {
  try {

    // returns err if there is no CONFIG_DIR, then we creat one using the catch
    await fs.access(CONFIG_DIR);
  } catch (error) {
    await fs.mkdir(CONFIG_DIR, { recursive: true });
  }

  const settingsFilePath = path.join(CONFIG_DIR,"settings.json")

  try {
    await fs.access(settingsFilePath);
    const content = await fs.readFile(settingsFilePath,"utf-8")
    return JSON.parse(content)
  } catch (error) {
    await fs.writeFile(settingsFilePath, JSON.stringify({}));
    return {}
  }
}

// saves API key to settings File
export async function saveApiKey(apiKey) {
    const settingsFilePath = path.join(CONFIG_DIR,"settings.json")

    const settingsContent = await getSettingsFile()

    await fs.writeFile(settingsFilePath,JSON.stringify({
        ...settingsContent,
        apiKey
    }))
}

export async function getApiKey() {
    const settings = await getSettingsFile()
    return settings.apiKey || null 
}