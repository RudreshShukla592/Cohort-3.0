import React, { useContext } from "react";
import { Music2, Heart, Disc3 } from "lucide-react";
import { MainShop } from "../context/MainContext";

const ProfileStats = ({ currentUser }) => {
  let { favouriteSongs } = useContext(MainShop);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Songs / Favourites */}
      <div className="group bg-[#1b1b1d] rounded-3xl p-8 border border-white/5 hover:border-violet-500/40 hover:-translate-y-1 transition-all duration-300">
        <div className="w-14 h-14 rounded-2xl bg-violet-500/20 flex items-center justify-center">
          {currentUser.role === "artist" ? (
            <Music2 className="text-violet-400" size={28} />
          ) : (
            <Heart className="text-violet-400" size={28} />
          )}
        </div>

        <h2 className="text-5xl font-bold mt-8">
          {currentUser.role === "artist" ? 0 : favouriteSongs.length}
        </h2>

        <p className="text-gray-400 mt-2 text-lg">
          {currentUser.role === "artist" ? "Songs Uploaded" : "Favourite Songs"}
        </p>
      </div>

      {/* Account */}
      <div className="group bg-[#1b1b1d] rounded-3xl p-8 border border-white/5 hover:border-violet-500/40 hover:-translate-y-1 transition-all duration-300">
        <div className="w-14 h-14 rounded-2xl bg-violet-500/20 flex items-center justify-center">
          <Disc3 className="text-violet-400" size={28} />
        </div>

        <h2 className="text-4xl font-bold mt-8 capitalize">
          {currentUser.role}
        </h2>

        <p className="text-gray-400 mt-2 text-lg">Account Type</p>
      </div>
    </div>
  );
};

export default ProfileStats;
