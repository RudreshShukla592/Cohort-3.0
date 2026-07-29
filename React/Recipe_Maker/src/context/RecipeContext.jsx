import { useState } from "react";
import { createContext } from "react";

export let MyShop = createContext();

export const CreateProvider = ({ children }) => {
  const [recipesArr, setRecipesArr] = useState([]);
  const [cartItems, setcartItems] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);

  const addItem = (id) => {
    setcartItems((prev) => {
      return prev.map((val) => {
        return val.id === id ? { ...val, quantity: val.quantity + 1 } : val;
      });
    });
  };
  const minusItem = (id) => {
    setcartItems((prev) => {
      return prev.map((val) => {
        return val.id === id ? { ...val, quantity: val.quantity - 1 } : val;
      });
    });
  };
  const removeFromCart = (id) => {
    let filterProduct = cartItems.filter((val) => val.id !== id);
    setcartItems(filterProduct);
  };

  const clearCart = () => {
    setcartItems([]);
  };

  return (
    <MyShop.Provider
      value={{
        recipesArr,
        setRecipesArr,
        cartItems,
        setcartItems,
        addItem,
        minusItem,
        removeFromCart,
        clearCart,
        allRecipes,
        setAllRecipes,
      }}
    >
      {children}
    </MyShop.Provider>
  );
};
