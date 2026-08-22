import { Cloud,  KeyRound, LogIn, Network } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {

  let  {register,handleSubmit,errors,onLoginSubmit, navigate} = useAuth()

  return (
    <div className="min-h-screen bg-[#121015] text-white flex items-center justify-center px-4">
  {/* Login Card */}
  <div className="w-full max-w-[500px] bg-[#1c1a1f] border border-[#29272e] rounded-[12px] px-10 py-10">

    {/* Logo */}
    <div className="flex justify-center mb-4">
      <div className="w-11 h-11 rounded-[7px] bg-[#7051b6] flex items-center justify-center">
        <Network
          size={24}
          strokeWidth={2}
          className="text-white"
        />
      </div>
    </div>

    {/* Heading */}
    <div className="text-center">
      <h1 className="text-[24px] font-bold">
        Synthetix AI
      </h1>

      <p className="text-[13px] text-gray-300 mt-1">
        Sign in to your workspace
      </p>
    </div>

    {/* Divider */}
    <div className="flex items-center gap-4 my-8">
      <div className="h-px flex-1 bg-[#29272e]" />

      <span className="text-[10px] text-gray-300 whitespace-nowrap">
        or continue with email
      </span>

      <div className="h-px flex-1 bg-[#29272e]" />
    </div>

    {/* Form */}
    <form
      onSubmit={handleSubmit(onLoginSubmit)}
      className="space-y-6"
    >

      {/* Email */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-[11px] font-semibold text-purple-200">
            EMAIL ADDRESS
          </label>
        </div>

        <input
          type="email"
          placeholder="name@company.com"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value:
                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Enter a valid email",
            },
          })}
          className={`w-full h-[46px] rounded-[6px] bg-[#0f0d12] border ${
            errors.email
              ? "border-red-500"
              : "border-[#36333b]"
          } px-4 text-[14px] text-white placeholder:text-[#5b5761] outline-none focus:border-[#7856c1] transition`}
        />

        {errors.email && (
          <p className="text-[10px] text-red-400 mt-1.5">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-[11px] font-semibold text-purple-200">
            PASSWORD
          </label>

          <button
            type="button"
            className="text-[11px] text-purple-300 hover:text-purple-200"
          >
            Forgot password?
          </button>
        </div>

        <div className="relative">
          <input
            type="password"
            placeholder="••••••••"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message:
                  "Password must be at least 6 characters",
              },
            })}
            className={`w-full h-[46px] rounded-[6px] bg-[#0f0d12] border ${
              errors.password
                ? "border-red-500"
                : "border-[#36333b]"
            } px-4 pr-12 text-[14px] text-white placeholder:text-[#5b5761] outline-none focus:border-[#7856c1] transition`}
          />

          <KeyRound
            size={17}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#625d68]"
          />
        </div>

        {errors.password && (
          <p className="text-[10px] text-red-400 mt-1.5">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Remember Me */}
      <label className="flex items-center gap-2.5 cursor-pointer">
        <input
          type="checkbox"
          {...register("rememberMe")}
          className="appearance-none w-[15px] h-[15px] rounded-[3px] border border-[#39353f] bg-[#0f0d12] checked:bg-[#7051b6] checked:border-[#7051b6] cursor-pointer"
        />

        <span className="text-[11px] text-gray-300">
          Stay signed in
        </span>
      </label>

      {/* Sign In */}
      <button
        type="submit"
        className="w-full h-[48px] rounded-[6px] bg-[#7051b6] hover:bg-[#7b5bc2] text-white text-[13px] font-medium flex items-center justify-center gap-2 transition active:scale-[0.99]"
      >
        Sign In
        <LogIn size={16} />
      </button>
    </form>

    {/* Bottom Divider */}
    <div className="h-px bg-[#29272e] mt-8 mb-6" />

    {/* Sign Up */}
    <p className="text-center text-[11px] text-gray-300">
      Don't have an account?{" "}
      <button
        onClick={()=>  navigate("/register")}
        type="button"
        className="text-purple-300 font-semibold hover:text-purple-200"
      >
        Sign Up
      </button>
    </p>

  </div>
</div>
  );
};

export default Login;
