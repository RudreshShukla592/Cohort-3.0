import React from "react";
import { useForm } from "react-hook-form";

const RHF = () => {
  let {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <div className="bg-white w-80 rounded-2xl p-5">
      <form onSubmit={ handleSubmit((data)=> console.log(data))} className="flex flex-col gap-4">
        <input
          className="p-2 border border-gray-400 rounded"
          type="text"
          placeholder="product name..."
          {...register("productName")}
        />

        <input
          className="p-2 border border-gray-400 rounded"
          type="text"
          placeholder="price..."
          {...register("productPrice")}
        />

        <span>Select Category</span>
        <select {...register("productCat")} className="p-2 border border-gray-400 rounded" name="" id="">
          <option value="MENS">Mens</option>
          <option value="WOMEN">Women</option>
          <option value="KIDS">Kids</option>
        </select>

        <input
          className="p-2 border border-gray-400 rounded"
          type="text"
          name=""
          placeholder="img-url"
          id=""
          {...register("productUrl")}
        />

        <button className="p-2 text-white bg-blue-500 cursor-pointer rounded-2xl">
          Create
        </button>
      </form>
    </div>
  );
};

export default RHF;
