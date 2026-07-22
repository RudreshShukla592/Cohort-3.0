import { ArrowRight, Heart, ShoppingCart, Star } from "lucide-react";
import { useNavigate } from "react-router";

const products = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: "$129",
    rating: 4.8,
    image: "https://picsum.photos/300?1",
  },
  {
    id: 2,
    title: "Premium Sneakers",
    price: "$89",
    rating: 4.7,
    image: "https://picsum.photos/300?2",
  },
  {
    id: 3,
    title: "Smart Watch",
    price: "$199",
    rating: 4.9,
    image: "https://picsum.photos/300?3",
  },
  {
    id: 4,
    title: "Gaming Keyboard",
    price: "$99",
    rating: 4.6,
    image: "https://picsum.photos/300?4",
  },
];

const ProductSection = () => {

  let navigate = useNavigate()

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

        <button onClick={() => navigate("/shop")} className="hidden items-center gap-2 text-lime-400 transition hover:gap-3 md:flex">
          View All
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Cards */}

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((item) => (
          <div
            key={item.id}
            className="group overflow-hidden rounded-3xl border border-zinc-800 bg-[#151515] transition duration-300 hover:-translate-y-2 hover:border-lime-400"
          >
            {/* Image */}

            <div className="relative overflow-hidden">
              <img
                src={item.image}
                alt=""
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
              />

              <button className="absolute right-4 top-4 rounded-xl bg-black/60 p-2 backdrop-blur">
                <Heart
                  size={18}
                  className="text-white transition hover:text-red-500"
                />
              </button>
            </div>

            {/* Content */}

            <div className="p-6">
              <div className="mb-3 flex items-center gap-1">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />

                <span className="text-sm text-zinc-300">{item.rating}</span>
              </div>

              <h3 className="text-xl font-semibold text-white">{item.title}</h3>

              <div className="mt-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-lime-400">
                  {item.price}
                </h2>

                <button className="rounded-xl bg-lime-400 p-3 text-black transition hover:scale-110">
                  <ShoppingCart size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
