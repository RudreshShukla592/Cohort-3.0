import { createContext, useState } from "react";

export const MyShop = createContext()

export const ContextProvider = ({children})=>{

    const [toggle, setToggle] = useState(true)

    return <MyShop.Provider value={{toggle,setToggle}}>{children}</MyShop.Provider>
}