import { Check } from "lucide-react";

const OrderSuccess = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-[90%] max-w-sm rounded-3xl border border-zinc-800 bg-[#151515] p-8 text-center shadow-2xl animate-in zoom-in-95 duration-300">

        <div className="mx-auto flex h-20 w-20 animate-bounce items-center justify-center rounded-full bg-lime-400">
          <Check size={40} className="text-black" strokeWidth={3} />
        </div>

        <h2 className="mt-6 text-3xl font-bold text-white">
          Order Placed!
        </h2>

        <p className="mt-3 text-zinc-400">
          Your order has been placed successfully.
        </p>

        <p className="mt-1 text-sm text-zinc-500">
          Thank you for shopping with SkyMart.
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess;