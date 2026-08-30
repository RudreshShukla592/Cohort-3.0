import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios"
const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("profilePic", data.profilePic[0]);

    await axios.post("http://localhost:3000/user/create", formData);

    console.log(data);

    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md border border-gray-200 space-y-5"
      >
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          Create Profile
        </h1>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-3 border rounded-lg outline-none focus:border-black"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-4 py-3 border rounded-lg outline-none focus:border-black"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Profile Picture */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("profilePic", {
              required: "Profile picture is required",
            })}
            className="w-full border rounded-lg p-2"
          />
          {errors.profilePic && (
            <p className="text-red-500 text-sm mt-1">
              {errors.profilePic.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default App;
