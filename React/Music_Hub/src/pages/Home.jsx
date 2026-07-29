import React from "react";
import { TrendingUp, Play, Heart } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0f0f10] text-white p-8">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#2a2a2f] to-[#3a3644] rounded-2xl p-10">
        <h1 className="text-5xl font-bold">
          Welcome Back, <span className="text-violet-300">Rudresh</span>
        </h1>

        <p className="text-gray-300 mt-3 max-w-xl">
          Ready to discover your next favorite song? Dive into playlists,
          trending tracks and artists curated just for you.
        </p>

        <div className="flex gap-4 mt-8">
          <button className="bg-violet-500 hover:bg-violet-600 transition px-7 py-3 rounded-xl font-semibold flex items-center gap-2">
            <Play size={18} />
            Start Listening
          </button>

          <button className="border border-white/10 hover:border-violet-400 transition px-7 py-3 rounded-xl font-semibold">
            Explore
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-[#1b1b1d] rounded-xl p-6 flex items-center gap-5 border border-white/5">
          <div className="bg-violet-500/15 p-4 rounded-xl">
            <Play className="text-violet-300" />
          </div>

          <div>
            <p className="text-gray-400 text-sm">Songs Played</p>
            <h2 className="text-3xl font-bold">248</h2>
          </div>
        </div>

        <div className="bg-[#1b1b1d] rounded-xl p-6 flex items-center gap-5 border border-white/5">
          <div className="bg-violet-500/15 p-4 rounded-xl">
            <Heart className="text-violet-300" />
          </div>

          <div>
            <p className="text-gray-400 text-sm">Liked Songs</p>
            <h2 className="text-3xl font-bold">87</h2>
          </div>
        </div>

        <div className="bg-[#1b1b1d] rounded-xl p-6 flex items-center gap-5 border border-white/5">
          <div className="bg-violet-500/15 p-4 rounded-xl">
            <TrendingUp className="text-violet-300" />
          </div>

          <div>
            <p className="text-gray-400 text-sm">Hours Listened</p>
            <h2 className="text-3xl font-bold">126</h2>
          </div>
        </div>
      </div>

      {/* Recently Played */}
      <div className="mt-10">
        <div className="flex justify-between items-end mb-5">
          <div>
            <h2 className="text-3xl font-bold">Recently Played</h2>
            <p className="text-gray-400">Continue where you left off.</p>
          </div>

          <button className="text-violet-300 hover:text-violet-200">
            View All
          </button>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-[#1b1b1d] rounded-xl overflow-hidden border border-white/5 hover:border-violet-500 transition"
            >
              <div className="h-56 bg-gradient-to-br from-violet-500 via-purple-700 to-black"></div>

              <div className="p-5">
                <h3 className="font-semibold text-lg">Midnight Dreams</h3>

                <p className="text-gray-400 text-sm mt-1">
                  Synthwave • Alex River
                </p>

                <button className="mt-5 w-full bg-violet-500 hover:bg-violet-600 transition py-2 rounded-lg font-medium">
                  Play Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
