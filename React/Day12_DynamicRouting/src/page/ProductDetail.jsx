import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const ProductDetail = () => {
  const [singleProductData, setSingleProductData] = useState({});
  
  let { id } = useParams();

  let getSingleProductData = async () => {
    try {
      let res = await axios(`https://fakestoreapi.com/products/${id}`);
      setSingleProductData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProductData();
  }, []);

  return (
    <div className="min-h-[90%] bg-gray-950 text-white p-6">
      <div className="max-w-7xl mx-auto bg-gray-900 rounded-3xl shadow-xl border border-gray-800 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left */}
          <div className="bg-gray-800 flex items-center justify-center p-10">
            <img
              src={singleProductData.image}
              alt={singleProductData.title}
              className="h-[450px] object-contain hover:scale-105 transition duration-300"
            />
          </div>

          {/* Right */}
          <div className="p-10 flex flex-col justify-between">
            <div className="space-y-6">
              <span className="inline-block bg-indigo-600 px-4 py-1 rounded-full text-sm uppercase tracking-wider">
                {singleProductData.category}
              </span>

              <h1 className="text-4xl font-bold leading-tight">
                {singleProductData.title}
              </h1>

              <div className="flex items-center gap-4">
                <span className="text-yellow-400 text-xl">
                  ⭐ {singleProductData.rating?.rate}
                </span>

                <span className="text-gray-400">
                  ({singleProductData.rating?.count} Reviews)
                </span>
              </div>

              <p className="text-gray-300 leading-8">{singleProductData.description}</p>

              <h2 className="text-5xl font-bold text-green-400">
                ${singleProductData.price}
              </h2>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-10">
              <button className="flex-1 bg-indigo-600 hover:bg-indigo-500 py-4 rounded-xl font-semibold text-lg transition">
                🛒 Add to Cart
              </button>

              <button className="flex-1 border border-indigo-500 text-indigo-400 hover:bg-indigo-600 hover:text-white py-4 rounded-xl font-semibold text-lg transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
