import React, { useContext, useMemo } from "react";
import { Music2, Upload } from "lucide-react";
import { AuthShop } from "../context/AuthContext";
import { MainShop } from "../context/MainContext";
import SongCard from "../components/SongCard";

const ArtistDashboard = () => {
  const { currentUser } = useContext(AuthShop);
  const { uploadedSongs } = useContext(MainShop);

  const mySongs = useMemo(() => {
    return uploadedSongs.filter((song) => song.artistId === currentUser.id);
  }, [uploadedSongs, currentUser]);

  return (
    <div className="min-h-screen bg-[#0f0f10] text-white p-6 md:p-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-700 to-purple-900 rounded-3xl p-8 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p className="uppercase tracking-[4px] text-sm text-violet-200">
            Artist Dashboard
          </p>

          <h1 className="text-4xl font-bold mt-2">
            Welcome, {currentUser.displayName}
          </h1>

          <p className="text-violet-100 mt-3 max-w-xl">
            Manage your uploaded songs and grow your music collection.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 text-center border border-white/10">
          <h2 className="text-5xl font-bold">{mySongs.length}</h2>
          <p className="text-violet-100 mt-1">Uploaded Songs</p>
        </div>
      </div>

      {/* My Songs */}
      <div className="mb-6 flex items-center gap-3">
        <Music2 className="text-violet-400" />
        <h2 className="text-3xl font-bold">My Songs</h2>
      </div>

      {mySongs.length === 0 ? (
        <div className="border-2 border-dashed border-zinc-700 rounded-3xl py-24 flex flex-col items-center justify-center text-center">
          <div className="bg-violet-600/20 p-5 rounded-full mb-5">
            <Upload className="text-violet-400" size={40} />
          </div>

          <h2 className="text-2xl font-semibold">No Songs Uploaded Yet</h2>

          <p className="text-zinc-400 mt-3 max-w-md">
            Your uploaded songs will appear here. Start sharing your music with
            listeners around the world.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mySongs.map((song) => (
            <SongCard key={song.trackId} song={song} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ArtistDashboard;
