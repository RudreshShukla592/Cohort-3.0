import { Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    desc: "Enjoy free shipping on orders over $50.",
    color: "text-lime-400",
    bg: "bg-lime-400/10",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    desc: "100% secure payment with trusted gateways.",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    desc: "7-day hassle-free returns on every product.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "We're always here whenever you need help.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
];

const FeatureSection = () => {
  return (
    <section className="mx-auto mt-20 max-w-7xl px-6">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-white">Why Shop With Us?</h2>

        <p className="mt-4 text-zinc-500">
          Everything you need for a smooth shopping experience.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <div
              key={index}
              className="group rounded-3xl border border-zinc-800 bg-[#151515] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-lime-400"
            >
              <div
                className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${feature.bg}`}
              >
                <Icon size={30} className={feature.color} />
              </div>

              <h3 className="text-2xl font-semibold text-white">
                {feature.title}
              </h3>

              <p className="mt-3 leading-7 text-zinc-500">{feature.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeatureSection;
