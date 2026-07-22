import { Package, TrendingUp, Star, Tags } from "lucide-react";
import { useContext } from "react";
import { MyShop } from "../context/MyContext";

const StatsSection = () => {
  let {cartItems} = useContext(MyShop)

  const totalCartValue = cartItems
  .reduce((acc, item) => acc + item.price * item.quantity, 0)
  .toFixed(2);

   const totalCartItem = cartItems
    .reduce((acc, item) => acc +  item.quantity, 0)

  return (
    <section className="mx-auto mt-8 max-w-7xl">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {/* Card 1 */}

        <div className="flex items-center gap-5 rounded-3xl border border-zinc-700 bg-[#121212] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-lime-400">
          <div className="rounded-2xl bg-lime-400/10 p-4">
            <Package className="text-lime-400" size={24} />
          </div>

          <div>
            <h2 className="text-4xl font-bold text-white">{totalCartItem}</h2>
            <p className="text-zinc-400">Cart Items</p>
            <span className="text-sm text-zinc-600">In your bag</span>
          </div>
        </div>

        {/* Card 2 */}

        <div className="flex items-center gap-5 rounded-3xl border border-zinc-700 bg-[#121212] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500">
          <div className="rounded-2xl bg-blue-500/10 p-4">
            <TrendingUp className="text-blue-400" size={24} />
          </div>

          <div>
            <h2 className="text-4xl font-bold text-white">${totalCartValue}</h2>
            <p className="text-zinc-400">Cart Value</p>
            <span className="text-sm text-zinc-600">Ready to checkout</span>
          </div>
        </div>

        {/* Card 3 */}

        <div className="flex items-center gap-5 rounded-3xl border border-zinc-700 bg-[#121212] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500">
          <div className="rounded-2xl bg-yellow-500/10 p-4">
            <Star className="text-yellow-400" size={24} />
          </div>

          <div>
            <h2 className="text-4xl font-bold text-white">4</h2>
            <p className="text-zinc-400">Top Products</p>
            <span className="text-sm text-zinc-600">Highly rated</span>
          </div>
        </div>

        {/* Card 4 */}

        <div className="flex items-center gap-5 rounded-3xl border border-zinc-700 bg-[#121212] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500">
          <div className="rounded-2xl bg-violet-500/10 p-4">
            <Tags className="text-violet-400" size={24} />
          </div>

          <div>
            <h2 className="text-4xl font-bold text-white">6</h2>
            <p className="text-zinc-400">Categories</p>
            <span className="text-sm text-zinc-600">To explore</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
