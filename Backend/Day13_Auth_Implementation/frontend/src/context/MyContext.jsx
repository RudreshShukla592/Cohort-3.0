import { createContext, useState } from "react";

export const MyStore = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);

  return (
    <MyStore.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        accessToken,
        setAccessToken,
      }}
    >
      {children}
    </MyStore.Provider>
  );
};
