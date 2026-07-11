import React from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
const Form = ({ setToggle, setUsers, users, updata, setUpdata }) => {
  let {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: updata,
  });
  console.log("before update", users);

  let formData = (data) => {
    if (updata) {
      let updateArr = users.map((val) => {
        return val.id === updata.id ? { ...data, id: val.id } : val;
      });
      setUsers(updateArr);
      setUpdata(null);
      localStorage.setItem("users", JSON.stringify(updateArr));
    } else {
      let arr = [...users, { ...data, id: nanoid() }];
      setUsers(arr);
      localStorage.setItem("users", JSON.stringify(arr));
    }
    reset();
    setToggle((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen items-center justify-center  from-slate-900 via-slate-800 to-slate-900 px-4">
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
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && <p className="text-red-700">{errors.name.message}</p>}
          <input
            className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40"
            type="email"
            placeholder="Email..."
            name=""
            id=""
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Enter Valid Email",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-700">{errors.email.message}</p>
          )}
          <input
            className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40"
            type="number"
            placeholder="Contact..."
            name=""
            id=""
            {...register("number", {
              required: "Number is required",
              minLength: {
                value: 10,
                message: "Minimum 10 digits required",
              },
              maxLength: {
                value: 10,
                message: "Maximum 10 digits required",
              },
            })}
          />
          {errors.number && (
            <p className="text-red-700">{errors.number.message}</p>
          )}
          <input
            className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40"
            type="url"
            placeholder="Image URL..."
            {...register("image", {
              required: "URL is required",
            })}
          />
          {errors.image && (
            <p className="text-red-700">{errors.image.message}</p>
          )}
          <button className="mt-2 rounded-lg bg-amber-400 px-4 py-3 font-semibold text-black transition-all duration-300 hover:scale-[1.03] hover:bg-amber-300 active:scale-95">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
