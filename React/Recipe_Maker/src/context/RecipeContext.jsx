import { useState } from "react";
import { createContext } from "react";

export let MyShop = createContext();

export const CreateProvider = ({ children }) => {
  const [recipesArr, setRecipesArr] = useState([]);
  const [cartItems, setcartItems] = useState([])

  return (
    <MyShop.Provider value={{ recipesArr, setRecipesArr , cartItems, setcartItems}}>
      {children}
    </MyShop.Provider>
  );
};
