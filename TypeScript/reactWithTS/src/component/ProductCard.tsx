
import type { Product } from "../type";

const ProductCard = ({product}: {product: Product}) => {
  return (
      <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-indigo-500 hover:-translate-y-1 transition-all duration-300 shadow-lg">
      <div className="h-52 sm:h-56 lg:h-60 bg-gray-600 flex items-center justify-center p-4">
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

        {/* <div className="flex justify-between items-center">
          <span className="text-yellow-400">⭐ {product.rating.rate}</span>

          <span className="text-sm text-gray-400">
            ({product.rating.count})
          </span>
        </div> */}

        <div className="flex flex-col gap-4 mt-2">
          <p className="text-2xl md:text-3xl font-bold text-green-400">${product.price}</p>

         <button
             
              className="w-full bg-indigo-600 hover:bg-indigo-500 active:scale-95 cursor-pointer text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-indigo-500/30"
            >
              🛒 Add to Cart
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
