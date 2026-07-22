import { ArrowRight, Heart, ShoppingCart, Star } from "lucide-react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { MyShop } from "../context/MyContext";
import ProductCard from "./ProductCard";

const ProductSection = () => {
  let { allProducts, getproductsData, cartItems } = useContext(MyShop);
  let navigate = useNavigate();

  const topRatedProducts = [...allProducts]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  useEffect(() => {
    getproductsData();
  }, []);

  return (
    <section className="mx-auto mt-16 max-w-7xl px-6">
      {/* Heading */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Top Rated Products</h2>

          <p className="mt-2 text-zinc-500">
            Our most loved products this week.
          </p>
        </div>

        <button
          onClick={() => navigate("/shop")}
          className="hidden items-center gap-2 text-lime-400 transition hover:gap-3 md:flex"
        >
          View All
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Cards */}

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        {topRatedProducts.map((product) => {
          const isInCart = cartItems.find((item) => item.id === product.id);
 
         return <ProductCard
            key={product.id}
            isInCart={isInCart  }
            product={product}
          />;
        })}
      </div>
    </section>
  );
};

export default ProductSection;
