import { Zap } from "lucide-react";

const AboutHero = () => {
  return (
    <section className="flex flex-col items-center py-10 text-center">

      <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-lime-400 text-black shadow-lg shadow-lime-400/20">

        <Zap size={38} strokeWidth={2.8} />

      </div>

      <h1 className="text-4xl font-bold text-white md:text-6xl">
        About <span className="text-lime-400">SkyMart</span>
      </h1>

      <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
        SkyMart is a modern e-commerce application built with React to
        practice real-world frontend development. It focuses on clean UI,
        responsive design and smooth user experience.
      </p>

    </section>
  );
};

export default AboutHero;