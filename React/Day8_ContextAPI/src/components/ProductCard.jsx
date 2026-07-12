import React, { useContext } from "react";
import { MyShop } from "../context/MyWebsite";

const ProductCard = ({ product }) => {
  let {setCardItems} =useContext(MyShop)
  
  return (
    <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-indigo-500 hover:-translate-y-1 transition-all duration-300 shadow-lg">
      <div className="h-60 bg-gray-600 flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.title}
          className="h-full object-contain   transition duration-300 hover:scale-105"
        />
      </div>

      <div className="p-4 flex flex-col gap-3">
        <span className="text-xs uppercase text-indigo-400 tracking-wider">
          {product.category}
        </span>

        <h2 className="font-semibold text-gray-100 line-clamp-2 h-12">
          {product.title}
        </h2>

        <div className="flex justify-between items-center">
          <span className="text-yellow-400">⭐ {product.rating.rate}</span>

          <span className="text-sm text-gray-400">
            ({product.rating.count})
          </span>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold text-green-400">${product.price}</p>

          <button onClick={()=> setCardItems(prev=> [...prev,product])} className="bg-indigo-600 cursor-pointer hover:bg-indigo-500 px-4 py-2 rounded-lg font-medium transition">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
