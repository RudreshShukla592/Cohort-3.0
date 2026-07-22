import { ArrowRight } from "lucide-react";
import { useContext } from "react";
import { MyShop } from "../context/MyContext";
import { useNavigate } from "react-router";

const HeroSection = () => {
  let { currentUser } = useContext(MyShop);

  let navigate = useNavigate();

  const hour = new Date().getHours();

  let greeting = "";

  if (hour < 12) {
    greeting = "Good Morning ☀️";
  } else if (hour < 17) {
    greeting = "Good Afternoon 🌤️";
  } else if (hour < 21) {
    greeting = "Good Evening 🌇";
  } else {
    greeting = "Good Night 🌙";
  }

  return (
    <section className="mx-auto mt-10 max-w-7xl">
      <div className="relative overflow-hidden rounded-[32px] border border-zinc-700 bg-[#121212] px-10 py-14">
        {/* Grid Background */}

        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative flex flex-col justify-between gap-10 lg:flex-row">
          {/* Left */}

          <div className="max-w-2xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[3px] text-lime-400">
              {greeting}
            </p>

            <h1 className="text-6xl font-bold leading-tight text-white">
              Welcome back,
            </h1>

            <h1 className="mb-8 text-6xl font-bold text-lime-400">
              {currentUser.fullName.split(" ")[0]}!
            </h1>

            <p className="max-w-xl text-lg leading-8 text-zinc-500">
              Discover today's picks — hand-curated products across electronics,
              fashion and more.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">
              <button
                onClick={() => navigate("/shop")}
                className="flex items-center gap-3 rounded-2xl bg-lime-400 px-8 py-4 font-semibold text-black transition hover:scale-105"
              >
                Shop Now
                <ArrowRight size={20} />
              </button>

              <button
                onClick={() => navigate("/shop")}
                className="rounded-2xl border border-zinc-700 px-8 py-4 font-semibold text-white transition hover:border-lime-400"
              >
                View All Products
              </button>
            </div>
          </div>

          {/* Right */}

          <div className="flex flex-col justify-center gap-5">
            <div className="rounded-3xl border border-lime-500/40 bg-lime-400/10 px-12 py-8 text-center">
              <h2 className="text-5xl font-bold text-lime-400">20+</h2>

              <p className="mt-2 text-zinc-400">Products Available</p>
            </div>

            <div className="rounded-3xl border border-zinc-700 px-12 py-8 text-center">
              <h2 className="text-5xl font-bold text-white">Free</h2>

              <p className="mt-2 text-zinc-500">Delivery on ₹999+</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
