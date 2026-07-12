import { useState, createContext } from "react";

export const MyShop = createContext();

export const MyShopContextProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(true);
  const [cardItems, setCardItems] = useState([]);

  return (
    <MyShop.Provider value={{ isCartOpen, setIsCartOpen, cardItems, setCardItems }}>
      {children}
    </MyShop.Provider>
  );
};
