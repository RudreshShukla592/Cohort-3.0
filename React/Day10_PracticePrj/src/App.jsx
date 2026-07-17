import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Nav from "./components/Nav";
import ProductCard from "./components/ProductCard";
import Cart from "./pages/Cart";
import { MyStore } from "./context/MyContext";

const App = () => {
  const [productsData, setproductsData] = useState([]);

  let {isCartOpen, cartItems} = useContext(MyStore)

  const getproductsData = async () => {
    try {
      let res = await axios.get("https://fakestoreapi.com/products");
      setproductsData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getproductsData();
  }, []);

  return (
    <div className="p-3 min-h-screen bg-gray-800 text-white flex flex-col gap-5">
      <Nav  />

      {isCartOpen ? (
        <div>
          <Cart />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {productsData.map((elem) => {

            let isInCart = cartItems.find((val)=> val.id === elem.id)

            return <ProductCard key={elem.id} product={elem}  isInCart={isInCart}/>;
          })}
        </div>
      )}
    </div>
  );
};

export default App;
