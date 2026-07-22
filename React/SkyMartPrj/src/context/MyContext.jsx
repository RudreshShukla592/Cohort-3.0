import { createContext, useState } from "react";

export const MyShop = createContext();

export const CreateContext = ({ children }) => {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || [],
  );
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null,
  );
  const [productsData, setproductsData] = useState([]);

  const [allProducts, setAllProducts] = useState([]);
   const [search, setSearch] = useState("");
  
 const [selectedCategory, setSelectedCategory] = useState("");
  return (
    <MyShop.Provider
      value={{
        users,
        setUsers,
        currentUser,
        setCurrentUser,
        productsData,
        setproductsData,
        allProducts,
        setAllProducts,
        search, setSearch,
        selectedCategory, setSelectedCategory
      }}
    >
      {children}
    </MyShop.Provider>
  );
};
