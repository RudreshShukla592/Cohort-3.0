import { Code2 } from "lucide-react";

const AboutStory = () => {
  return (
    <section>

      <div className="rounded-3xl border border-zinc-800 bg-[#151515] p-8 md:p-12">

        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-lime-400/10">

          <Code2
            size={30}
            className="text-lime-400"
          />

        </div>

        <h2 className="text-3xl font-bold text-white">
          Our Story
        </h2>

        <p className="mt-6 leading-8 text-zinc-400">
          SkyMart is a frontend e-commerce project built to practice modern
          React development. The goal was to create a clean, responsive and
          user-friendly shopping experience while implementing concepts like
          authentication, protected routes, Context API, Local Storage and
          reusable components.
        </p>

        <p className="mt-5 leading-8 text-zinc-400">
          Rather than focusing on a huge feature set, the project emphasizes
          writing maintainable code, building reusable UI components and
          following real-world React development practices.
        </p>

      </div>

    </section>
  );
};

export default AboutStory;