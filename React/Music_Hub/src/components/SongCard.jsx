import React from "react";
import { Play } from "lucide-react";
import { useNavigate } from "react-router";

const SongCard = ({ song }) => {
  let navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/main/detail/${song.trackId}`)}
      className="group bg-[#1b1b1d] rounded-2xl overflow-hidden border border-white/5 hover:border-violet-500 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative overflow-hidden">
        <img
          src={song.artworkUrl100.replace("100x100", "600x600")}
          alt={song.trackName}
          className="w-full h-60 object-cover group-hover:scale-105 transition duration-300"
        />

        <button className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-violet-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <Play size={20} fill="white" />
        </button>
      </div>

      <div className="p-5">
        <h2 className="text-white font-semibold text-lg truncate">
          {song.trackName}
        </h2>

        <p className="text-gray-400 text-sm mt-1 truncate">{song.artistName}</p>

        <p className="text-xs text-gray-500 mt-3 truncate">
          {song.collectionName}
        </p>
      </div>
    </div>
  );
};

export default SongCard;
