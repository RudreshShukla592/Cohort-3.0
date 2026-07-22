import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductInfo from "../components/ProductInfo";
import RelatedProducts from "../components/RelatedProducts";
import { useParams } from "react-router";
import axios from "axios";
import { MyShop } from "../context/MyContext";

const Cart = () => {
  const [singleProductData, setSingleProductData] = useState({});

  let { allProducts } = useContext(MyShop);

  let { id } = useParams();

  const relatedProducts =
    allProducts
      ?.filter(
        (product) =>
          product.category === singleProductData.category &&
          product.id !== singleProductData.id,
      )
      .slice(0, 5) || [];

  let getSingleProductData = async () => {
    try {
      let res = await axios(`https://dummyjson.com/products/${id}`);
      setSingleProductData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProductData();
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <Navbar />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-14 px-4 py-8 sm:px-6 lg:px-8">
        <ProductInfo id={id} singleProductData={singleProductData} />

        <RelatedProducts products={relatedProducts} />
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
