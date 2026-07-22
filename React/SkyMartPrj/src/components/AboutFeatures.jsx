import {
  Rocket,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Rocket,
    title: "Fast",
    desc: "Optimized for speed with a clean and responsive interface.",
    color: "text-lime-400",
    bg: "bg-lime-400/10",
  },
  {
    icon: ShieldCheck,
    title: "Secure",
    desc: "Protected routes and authentication using Context API.",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
  },
  {
    icon: Sparkles,
    title: "Modern",
    desc: "Built with React, Tailwind CSS and modern frontend practices.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
];

const AboutFeatures = () => {
  return (
    <section>

      <div className="mb-10 text-center">

        <h2 className="text-3xl font-bold text-white">
          Why SkyMart?
        </h2>

        <p className="mt-3 text-zinc-500">
          Built with modern tools and a focus on user experience.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-3">

        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <div
              key={index}
              className="rounded-3xl border border-zinc-800 bg-[#151515] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-lime-400"
            >
              <div
                className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${feature.bg}`}
              >
                <Icon
                  size={30}
                  className={feature.color}
                />
              </div>

              <h3 className="text-2xl font-semibold text-white">
                {feature.title}
              </h3>

              <p className="mt-3 leading-7 text-zinc-500">
                {feature.desc}
              </p>
            </div>
          );
        })}

      </div>

    </section>
  );
};

export default AboutFeatures;