import React, { useContext } from "react";
import { Heart } from "lucide-react";
import { MainShop } from "../context/MainContext";
import SongCard from "../components/SongCard";

const Favourites = () => {
  const { favouriteSongs } = useContext(MainShop);

  return (
    <div className="min-h-screen bg-[#0f0f10] text-white p-6 lg:p-10">
      <div className="flex items-center gap-3 mb-10">
        <Heart className="text-violet-400 fill-violet-400" size={32} />
        <h1 className="text-4xl font-bold">Favourite Songs</h1>
      </div>

      {favouriteSongs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <Heart size={70} className="text-gray-600 mb-6" />

          <h2 className="text-3xl font-semibold">
            No favourites yet
          </h2>

          <p className="text-gray-400 mt-3 max-w-md">
            Songs you mark as favourites will appear here. Start exploring and
            save the tracks you love.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {favouriteSongs.map((song) => (
            <SongCard key={song.trackId} song={song} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;