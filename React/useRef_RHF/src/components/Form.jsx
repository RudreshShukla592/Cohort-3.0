import React, { useRef } from "react";

const Form = () => {
    console.log("form rendering");
    
  const formRef = useRef({})
  console.log(formRef);
  
  let handleSubmit = (e) => {
    e.preventDefault();
    console.log(formRef.current.productName.value);
    console.log(formRef.current.productPrice.value);
    console.log(formRef.current.productCat.value);
    console.log(formRef.current.productUrl.value);
    
  };

  return (
    <div className="bg-white w-80 rounded-2xl p-5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          ref={(e)=> formRef.current.productName = e}
          className="p-2 border border-gray-400 rounded"
          type="text"
          placeholder="product name..."
          
        />

        <input
          className="p-2 border border-gray-400 rounded"
          type="text"
          placeholder="price..."
           ref={(e)=> formRef.current.productPrice = e}
        />

        <span>Select Category</span>
        <select  ref={(e)=> formRef.current.productCat = e} className="p-2 border border-gray-400 rounded" name="" id="">
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
           ref={(e)=> formRef.current.productUrl = e}
        />

        <button className="p-2 text-white bg-blue-500 cursor-pointer rounded-2xl">
          Create
        </button>
      </form>
    </div>
  );
};

export default Form;
