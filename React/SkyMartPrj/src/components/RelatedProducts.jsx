import { useContext } from "react";
import ProductCard from "./ProductCard";
import { MyShop } from "../context/MyContext";

const RelatedProducts = ({products}) => {
  let {cartItems} = useContext(MyShop)
  return (
    <section>

      <h2 className="mb-8 text-4xl font-bold">
        Related Products
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">

        {products.map((product) => {
          const isInCart = cartItems.find((item) => item.id === product.id);
          return  <ProductCard key={product.id} isInCart={isInCart} product={product} />
        })}

      </div>

    </section>
  );
};

export default RelatedProducts;