import { createContext, useState } from "react";

export const AuthShop = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || [],
  );
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null,
  );

  

  return (
    <AuthShop.Provider value={{ users, setUsers, currentUser, setCurrentUser }}>
      {children}
    </AuthShop.Provider>
  );
};
