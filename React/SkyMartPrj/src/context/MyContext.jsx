import { createContext, useState } from "react";

export const MyShop = createContext();

export const CreateContext = ({ children }) => {

  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users")) || [])
  const [currentUser, setCurrentUser] = useState( JSON.parse(localStorage.getItem("currentUser")) || null)
 
  return <MyShop.Provider value={{users, setUsers, currentUser, setCurrentUser}}>{children}</MyShop.Provider>;
};
