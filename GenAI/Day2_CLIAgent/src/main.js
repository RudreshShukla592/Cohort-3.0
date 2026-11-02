import { getApiKey, getSettingsFile, saveApiKey } from "./utils/file.utils.js";
import dotenv from "dotenv"
import rl from "./utils/readline.js";

async function main(){
    const settings = await getSettingsFile()
    
    if(!settings.apiKey){
       const apiKey = await rl.question("Please enter your API Key: ")

       await saveApiKey(apiKey)
    }

    const apiKey = await getApiKey()
    console.log(apiKey);
    
    rl.close()
}

export default main