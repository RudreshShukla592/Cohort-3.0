import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

const AboutCTA = () => {
  const navigate = useNavigate();

  return (
    <section>

      <div className="rounded-3xl border border-lime-400/20 bg-gradient-to-r from-lime-400/10 to-[#151515] px-8 py-14 text-center">

        <h2 className="text-4xl font-bold text-white">
          Ready to Start Shopping?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-zinc-400">
          Explore hundreds of products across multiple categories and
          experience a modern shopping interface built with React.
        </p>

        <button
          onClick={() => navigate("/shop")}
          className="mx-auto mt-10 flex items-center gap-3 rounded-2xl bg-lime-400 px-8 py-4 text-lg font-semibold text-black transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Shop Now
          <ArrowRight size={20} />
        </button>

      </div>

    </section>
  );
};

export default AboutCTA;