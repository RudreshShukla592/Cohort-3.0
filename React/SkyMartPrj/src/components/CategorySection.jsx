import {
  Sparkles,
  Flower2,
  Armchair,
  ShoppingBasket,
  Home,
  UtensilsCrossed,
  ArrowRight,
} from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { MyShop } from "../context/MyContext";

const categories = [
  {
    title: "Beauty",
    value: "beauty",
    items: 5,
    icon: Sparkles,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "group-hover:border-pink-500",
  },
  {
    title: "Fragrances",
    value: "fragrances",
    items: 5,
    icon: Flower2,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "group-hover:border-violet-500",
  },
  {
    title: "Furniture",
    value: "furniture",
    items: 5,
    icon: Armchair,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "group-hover:border-orange-500",
  },
  {
    title: "Groceries",
    value: "groceries",
    items: 27,
    icon: ShoppingBasket,
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "group-hover:border-green-500",
  },
  {
    title: "Home Decoration",
    value: "home-decoration",
    items: 5,
    icon: Home,
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "group-hover:border-sky-500",
  },
  {
    title: "Kitchen Accessories",
    value: "kitchen-accessories",
    items: 3,
    icon: UtensilsCrossed,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "group-hover:border-yellow-500",
  },
];

const CategorySection = () => {
  let { allProducts, setproductsData, setSelectedCategory } = useContext(MyShop);

  let navigate = useNavigate();

  let categorySelectionToggle = (title) => {
    let filtered = allProducts;
    filtered = filtered.filter((product) => product.category === title);

    setproductsData(filtered);
    setSelectedCategory(title);
    navigate("/shop");
  };

  return (
    <section className="mx-auto mt-14 max-w-7xl px-6">
      {/* Heading */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Shop by Category</h2>

          <p className="mt-2 text-zinc-500">
            Browse products by your favourite category.
          </p>
        </div>

        <button
          onClick={() => navigate("/shop")}
          className="hidden items-center gap-2 font-medium text-lime-400 transition hover:gap-3 md:flex"
        >
          View All
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Cards */}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => {
          const Icon = category.icon;

          return (
            <div
              onClick={() => categorySelectionToggle(category.value)}
              key={index}
              className={`group cursor-pointer rounded-3xl border border-zinc-800 bg-[#151515] p-8 transition-all duration-300 hover:-translate-y-2 ${category.border}`}
            >
              <div
                className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${category.bg}`}
              >
                <Icon size={30} className={category.color} strokeWidth={2.2} />
              </div>

              <h3 className="text-2xl font-semibold text-white">
                {category.title}
              </h3>

              <p className="mt-2 text-zinc-500">{category.items} Products</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategorySection;
