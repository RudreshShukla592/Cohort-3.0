import {
  Laptop,
  Shirt,
  Sofa,
  House,
  Dumbbell,
  Gem,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    title: "Electronics",
    items: 17,
    icon: Laptop,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "group-hover:border-blue-500",
  },
  {
    title: "Fashion",
    items: 12,
    icon: Shirt,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "group-hover:border-pink-500",
  },
  {
    title: "Furniture",
    items: 9,
    icon: Sofa,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "group-hover:border-orange-500",
  },
  {
    title: "Home",
    items: 14,
    icon: House,
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "group-hover:border-green-500",
  },
  {
    title: "Sports",
    items: 8,
    icon: Dumbbell,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "group-hover:border-red-500",
  },
  {
    title: "Accessories",
    items: 6,
    icon: Gem,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "group-hover:border-violet-500",
  },
];

const CategorySection = () => {
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

        <button className="hidden items-center gap-2 font-medium text-lime-400 transition hover:gap-3 md:flex">
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
