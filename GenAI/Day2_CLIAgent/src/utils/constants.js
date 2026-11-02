import os from "os"
import path from "path"

// means:- \Users\Rudresh Shukla
export const HOME_DIR = os.homedir()    

// means:- \Users\Rudresh Shukla\.beta
export const CONFIG_DIR = path.join(HOME_DIR, ".beta")