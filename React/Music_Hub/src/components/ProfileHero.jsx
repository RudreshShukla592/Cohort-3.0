import React from "react";

const ProfileHero = ({ currentUser }) => {
  return (
    <div className="relative rounded-3xl overflow-hidden">

      <div className="h-52 bg-gradient-to-r from-violet-700 via-purple-700 to-fuchsia-700" />

      <div className="bg-[#1b1b1d] pb-10">

        <div className="flex flex-col items-center -mt-16">

          <div className="w-32 h-32 rounded-full bg-[#0f0f10] border-4 border-violet-500 flex items-center justify-center text-5xl font-bold">
            {currentUser.name?.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-3xl font-bold mt-5">
            {currentUser.name}
          </h1>

          <p className="text-gray-400 mt-2">
            @{currentUser.displayName}
          </p>

          <span className="mt-5 px-5 py-2 rounded-full bg-violet-500/20 text-violet-300 capitalize">
            {currentUser.role}
          </span>

        </div>

      </div>

    </div>
  );
};

export default ProfileHero;