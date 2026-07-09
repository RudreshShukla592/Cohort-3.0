import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Form = ({setUsers,setToggle}) => {

    

  let {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode:"onChange"
  });

  let formData = (data) => {
    console.log(data);
    setUsers(prev=>[...prev,data])
    reset();
    setToggle(prev => !prev)
  };
  console.log(errors);
  
  return (
    <div className="flex min-h-screen items-center justify-center from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-sm">
        <h1 className="mb-6 text-center text-3xl font-bold text-white">
          Create User
        </h1>

        <form
          onSubmit={handleSubmit(formData)}
          className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-lg"
        >
          <input
            className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40"
            type="text"
            placeholder="Name..."
            {...register("Name",{
                required:"Name is required"
            })}
          />
          {errors.Name && <p className="text-red-700">{errors.Name.message}</p>}
          <input
            className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40"
            type="email"
            placeholder="Email..."
            name=""
            id=""
            {...register("Email",{
                required:"Email is required",
                pattern:{
                    value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message:"Enter Valid Email"
                }
            })}
          />
            {errors.Email && <p className="text-red-700">{errors.Email.message}</p>}
          <input
            className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40"
            type="number"
            placeholder="Contact..."
            name=""
            id=""
            {...register("Number",{
                required:"Number is required",
                minLength:{
                    value:10,
                    message:"Minimum 10 digits required"
                },
                maxLength:{
                    value:10,
                    message:"Maximum 10 digits required"
                }
            })}
          />
            {errors.Number && <p className="text-red-700">{errors.Number.message}</p>}
          <input
            className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40"
            type="url"
            name=""
            id=""
            placeholder="Image URL..."
            {...register("Url",{
                required:"URL is required"
            })}
          />
            {errors.Url && <p className="text-red-700">{errors.Url.message}</p>}
          <button className="mt-2 rounded-lg bg-amber-400 px-4 py-3 font-semibold text-black transition-all duration-300 hover:scale-[1.03] hover:bg-amber-300 active:scale-95">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
