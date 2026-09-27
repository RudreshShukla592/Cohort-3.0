import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 0,
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        setAccessToken,
        loading,
        setLoading,
        setUser,
        products,
        setProducts,
        pagination,
        setPagination,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
