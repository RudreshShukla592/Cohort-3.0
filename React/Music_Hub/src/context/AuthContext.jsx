import { createContext } from "react";

export const AuthShop = createContext();

export const AuthProvider = ({ children }) => {


  return <AuthShop.Provider value={{}}>{children}</AuthShop.Provider>;
};
