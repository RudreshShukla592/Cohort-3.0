import ProductCard from "./ProductCard";

const RelatedProducts = ({products}) => {
  return (
    <section>

      <h2 className="mb-8 text-4xl font-bold">
        Related Products
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">

        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

      </div>

    </section>
  );
};

export default RelatedProducts;