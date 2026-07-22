import React from "react";
import Hero from "../components/Hero";
import LoginForm from "../form/LoginForm";
const Login = () => {
  return (
    <section className="min-h-screen bg-[#0d0d0d] text-white">
      <div className="grid min-h-screen md:grid-cols-2">
        {/* Left Side */}
        <Hero/>

        {/* Right Side */}

        <div className="flex items-center justify-center px-6 py-10">
          <LoginForm />
        </div>
      </div>
    </section>
  );
};

export default Login;
