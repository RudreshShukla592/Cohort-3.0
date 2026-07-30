import React, { useContext, useEffect } from "react";
import { MainShop } from "../context/MainContext";
import SongCard from "../components/SongCard";

const Library = () => {
  const { allSongs, getMusicData } = useContext(MainShop);

  useEffect(() => {
    getMusicData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f10] p-6 lg:p-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white">Music Library</h1>

        <p className="text-gray-400 mt-2">
          Discover and enjoy your favourite songs.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allSongs.map((song) => (
          <SongCard key={song.trackId} song={song} />
        ))}
      </div>
    </div>
  );
};

export default Library;