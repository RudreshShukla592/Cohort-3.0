import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductInfo from "../components/ProductInfo";
import RelatedProducts from "../components/RelatedProducts";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { MyShop } from "../context/MyContext";
import { ArrowLeft } from "lucide-react";

const Cart = () => {
  let navigate = useNavigate();

  const [singleProductData, setSingleProductData] = useState({});

  let { allProducts, cartItems } = useContext(MyShop);

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

  let isInCart = cartItems.find((items) => items.id === singleProductData.id);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate("/shop")}
          className="mb-4 flex w-fit items-center gap-2  rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-300 transition-all duration-200 hover:border-lime-700 hover:bg-zinc-900 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to Shop
        </button>

        <ProductInfo
          id={id}
          isInCart={isInCart}
          singleProductData={singleProductData}
        />

        <div className="mt-16">
          <RelatedProducts products={relatedProducts} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
