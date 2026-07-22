import { createContext, useState } from "react";
import axios from "axios";

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

  const getproductsData = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products?limit=50");
      setAllProducts(res.data.products);
      setproductsData(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const [cartItems, setCartItems] = useState([]);

  const incrementQuantity = (id) => {
    setCartItems((prev) => {
      return prev.map((val) => {
        return val.id === id ? { ...val, quantity: val.quantity + 1 } : val;
      });
    });
  };

  const decrementQuantity = (id) => {
    setCartItems((prev) => {
      return prev.map((val) => {
        return val.id === id ? { ...val, quantity: val.quantity - 1 } : val;
      });
    });
  };

  const removeFromCart = (id) => {
    let filterProduct = cartItems.filter((val) => val.id !== id);
    setCartItems(filterProduct);
  };

  const clearCart = ()=>{
    setCartItems([])
  }

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
        search,
        setSearch,
        selectedCategory,
        setSelectedCategory,
        getproductsData,
        cartItems,
        setCartItems,
        incrementQuantity,
        decrementQuantity,
        removeFromCart,
        clearCart 
      }}
    >
      {children}
    </MyShop.Provider>
  );
};
