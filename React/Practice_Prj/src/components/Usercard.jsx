import React from "react";

const Usercard = ({user,delBtn,idx,setToggle,setUpdata}) => {
  return (
    <div className="p-4 rounded-2xl flex flex-col gap-4 bg-black">
      <div className="h-50 w-50">
        <img
          className="object-cover h-full w-full rounded-2xl"
          src={user.image}
          alt=""
        />
      </div>
      <div className="flex flex-col gap-1">
        <h1>{user.name}</h1>
        <p className="text-sm">{user.email}</p>

        <p className="text-sm">{user.number}</p>
      </div>
      <div className="flex w-full justify-between gap-4">
        <button
          onClick={() => {
             setUpdata(user)
             setToggle((prev) => !prev);
          }}
          className="px-3 py-2 bg-amber-400 text-black cursor-pointer rounded-3xl"
        >
          Update
        </button>
        <button
          onClick={() => {
            delBtn(idx)
          }}
          className="px-3 py-2 bg-red-600 text-white cursor-pointer rounded-3xl"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Usercard;
