import React, { useContext, useEffect } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { MyShop } from "../context/MyContext";


import ShopFilter from "../components/ShopFilter";

const Shop = () => {
  const { productsData, setproductsData,  setAllProducts, } = useContext(MyShop);

  const getproductsData = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products?limit=50");
      setAllProducts(res.data.products);
      setproductsData(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getproductsData();
  }, []);

  console.log(productsData[0]);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Heading */}

        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            All <span className="text-lime-400">Products</span>
          </h1>

          <p className="mt-2 text-zinc-500">
            {productsData.length} Products Available
          </p>
        </div>

        {/* Search & Filter */}

         <ShopFilter />

        {/* Products */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {productsData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
