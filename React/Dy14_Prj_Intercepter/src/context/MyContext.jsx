import { createContext, useState } from "react";


export let MyShop = createContext()

export let CreateProvider = ({children})=>{

   const [registerUser, setRegisterUser] = useState(JSON.parse(localStorage.getItem("registerUser")) || [])
   const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem("loggedUser")) || null)
   

    return <MyShop.Provider value={{registerUser, setRegisterUser,  loggedUser, setLoggedUser}}>{children}</MyShop.Provider>
}