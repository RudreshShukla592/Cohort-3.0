import { createContext } from "react";

export const MyShop = createContext();

export const CreateContext = ({ children }) => {


  return <MyShop.Provider value={}>{children}</MyShop.Provider>;
};
