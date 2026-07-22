import { Mail, Lock, ArrowRight, Eye } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { MyShop } from "../context/MyContext";
import { useForm } from "react-hook-form";


const LoginForm = () => {

  let navigate = useNavigate();

  let { users, setCurrentUser } = useContext(MyShop);

  const [showPassword, setShowPassword] = useState(false);
  const [emailToggle, setEmailToggle] = useState(false);

  let {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  let formData = (data) => {
    let userLogged;

    let currentCustomer = users.find((user) => user.email === data.email);
    if (currentCustomer) {
      if (currentCustomer.password === data.password) {
        userLogged = currentCustomer;
      }else{
        setEmailToggle(true);
        return;
      }
    } else {
      setEmailToggle(true);
      return;
    }
    setCurrentUser(userLogged)
    localStorage.setItem("currentUser", JSON.stringify(userLogged));
    reset();
    navigate("/home");
  };


  return (
    <div className="w-full max-w-[480px] rounded-[30px] border border-zinc-800 bg-[#131313] p-10 shadow-[0_0_40px_rgba(0,0,0,0.35)]">
      <h2 className="text-4xl font-bold text-white">Sign in</h2>

      <p className="mt-2 text-zinc-500">Enter your credentials to continue</p>

      {emailToggle && (
        <div className="mb-6 mt-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
          <p className="text-sm font-medium text-red-400">
            Invalid email or password
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(formData)} className="mt-8 space-y-5">
        <div className="relative">
          <Mail
            className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
            size={18}
          />

          <input
            type="email"
            placeholder="Email address"
            className="h-14 w-full rounded-2xl border border-zinc-700 bg-[#1C1C1C] pl-14 pr-5 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Enter Valid Email",
              },
              onChange: () => setEmailToggle(false),
            })}
          />
        </div>
         {errors.email && (
            <p className="text-red-700 mt-2">{errors.email.message}</p>
          )}

        <div className="relative">
          <Lock
            className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
            size={18}
          />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="h-14 w-full rounded-2xl border border-zinc-700 bg-[#1C1C1C] pl-14 pr-14 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
            {...register("password", {
              required: "Password is required",
              validate: (value) => {
                if (value.trim() === "")
                  return "Password cannot contain only spaces";
                if (value.length < 6) return "Minimum 6 characters required";
                return true;
              },
              onChange: () => setEmailToggle(false)
            })}
          />

          <Eye
            className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-500 hover:text-white transition"
            size={18}
            onClick={() => setShowPassword((prev) => !prev)}
          />
        </div>
        {errors.password && (
            <p className="text-red-700 mt-2">{errors.password.message}</p>
          )}

        <button className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-lime-400 text-lg font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-lime-300 active:scale-[0.98]">
          Sign in
          <ArrowRight
            size={20}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </form>

      <p className="mt-8 text-center text-zinc-500">
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/register")}
          className="cursor-pointer font-semibold text-lime-400 hover:underline"
        >
          Create one
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
