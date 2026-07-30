import React, { useContext } from "react";
import {
  TrendingUp,
  Play,
  Heart,
  Music2,
  Disc3,
  Library,
  User,
} from "lucide-react";
import { useNavigate } from "react-router";
import { AuthShop } from "../context/AuthContext";
import { MainShop } from "../context/MainContext";
import SongCard from "../components/SongCard";

const Home = () => {
  const { currentUser } = useContext(AuthShop);
  const { allSongs, favouriteSongs } = useContext(MainShop);

  const featuredSongs = [...allSongs]
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f0f10] text-white p-6 lg:p-10">
      {/* Hero */}
      <div className="rounded-3xl bg-gradient-to-r from-violet-700 via-purple-700 to-fuchsia-700 p-10">
        <p className="text-violet-200 font-medium">Welcome Back 👋</p>

        <h1 className="text-5xl lg:text-6xl font-bold mt-2">
          {currentUser.displayName}
        </h1>

        <p className="text-violet-100 mt-5 max-w-2xl leading-7">
          Discover new music, explore trending artists and enjoy your favourite
          tracks all in one place.
        </p>

        <div className="flex gap-4 mt-8">
          <button
            onClick={() => navigate("/main/library")}
            className="bg-white text-black px-7 py-3 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition"
          >
            <Play size={18} fill="black" />
            Start Listening
          </button>

          <button
            onClick={() => navigate("/main/profile")}
            className="border border-white/30 px-7 py-3 rounded-xl hover:bg-white/10 transition"
          >
            View Profile
          </button>
        </div>
      </div>

      {/* Stats */}

      <div className="grid lg:grid-cols-2 gap-6 mt-10">
        

        <div className="bg-[#1b1b1d] rounded-3xl border border-white/5 p-8 hover:border-violet-500/40 hover:-translate-y-1 transition-all">
          <div className="w-14 h-14 rounded-2xl bg-violet-500/20 flex items-center justify-center">
            {currentUser.role === "artist" ? (
              <Music2 className="text-violet-400" />
            ) : (
              <Heart className="text-violet-400" />
            )}
          </div>

          <h2 className="text-5xl font-bold mt-8">
            {currentUser.role === "artist" ? 0 : favouriteSongs.length}
          </h2>

          <p className="text-gray-400 mt-2">
            {currentUser.role === "artist"
              ? "Published Songs"
              : "Favourite Songs"}
          </p>
        </div>

        <div className="bg-[#1b1b1d] rounded-3xl border border-white/5 p-8 hover:border-violet-500/40 hover:-translate-y-1 transition-all">
          <div className="w-14 h-14 rounded-2xl bg-violet-500/20 flex items-center justify-center">
            <TrendingUp className="text-violet-400" />
          </div>

          <h2 className="text-4xl font-bold mt-8 capitalize">
            {currentUser.role}
          </h2>

          <p className="text-gray-400 mt-2">Account Type</p>
        </div>
      </div>

      {/* Featured */}

      <div className="mt-12 bg-[#1b1b1d] rounded-3xl border border-white/5 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Featured Songs</h2>

            <p className="text-gray-400 mt-2">
              Handpicked tracks just for you.
            </p>
          </div>

          <button
            onClick={() => navigate("/main/library")}
            className="text-violet-400 hover:text-violet-300"
          >
            View All
          </button>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
          {featuredSongs.map((song) => (
            <SongCard key={song.trackId} song={song} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Quick Actions</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <button
            onClick={() => navigate("/main/library")}
            className="bg-[#1b1b1d] rounded-3xl border border-white/5 p-8 flex items-center gap-5 hover:border-violet-500 hover:-translate-y-1 transition-all"
          >
            <Library className="text-violet-400" size={34} />
            <div className="text-left">
              <h3 className="text-xl font-semibold">Library</h3>
              <p className="text-gray-400 text-sm">Explore all songs</p>
            </div>
          </button>

          {currentUser.role === "artist" ? (
            <button
              onClick={() => navigate("/main/upload")}
              className="bg-[#1b1b1d] rounded-3xl border border-white/5 p-8 flex items-center gap-5 hover:border-violet-500 hover:-translate-y-1 transition-all"
            >
              <Music2 className="text-violet-400" size={34} />
              <div className="text-left">
                <h3 className="text-xl font-semibold">Upload</h3>
                <p className="text-gray-400 text-sm">Publish a new song</p>
              </div>
            </button>
          ) : (
            <button
              onClick={() => navigate("/main/favourites")}
              className="bg-[#1b1b1d] rounded-3xl border border-white/5 p-8 flex items-center gap-5 hover:border-violet-500 hover:-translate-y-1 transition-all"
            >
              <Heart className="text-violet-400" size={34} />
              <div className="text-left">
                <h3 className="text-xl font-semibold">Favourites</h3>
                <p className="text-gray-400 text-sm">Your liked songs</p>
              </div>
            </button>
          )}

          <button
            onClick={() => navigate("/main/profile")}
            className="bg-[#1b1b1d] rounded-3xl border border-white/5 p-8 flex items-center gap-5 hover:border-violet-500 hover:-translate-y-1 transition-all"
          >
            <User className="text-violet-400" size={34} />
            <div className="text-left">
              <h3 className="text-xl font-semibold">Profile</h3>
              <p className="text-gray-400 text-sm">Manage your account</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
