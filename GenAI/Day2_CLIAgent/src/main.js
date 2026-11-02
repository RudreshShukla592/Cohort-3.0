import { getApiKey, getSettingsFile, saveApiKey } from "./utils/file.utils.js";
import dotenv from "dotenv"
import rl from "./utils/readline.js";

async function main(){
    const settings = await getSettingsFile()
    
    if(!settings.apiKey){
       const apiKey = await rl.question("Please enter your API Key: ")

       await saveApiKey(apiKey)
    }

    const response = await getApiKey()

    if(response.error){
        console.error("Invalid OR Expired API key")

        const apiKey = await rl.question("Please enter your API key: ")
        await saveApiKey(apiKey)
        return main()
    }

    const apiKey = response.apiKey
    console.log(apiKey);
    
    rl.close()
}

export default main