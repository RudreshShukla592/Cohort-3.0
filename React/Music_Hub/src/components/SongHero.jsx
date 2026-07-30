import React, { useRef, useState } from "react";
import { Heart, Play, Pause, ArrowUpRight } from "lucide-react";

const SongHero = ({ song }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="grid lg:grid-cols-2 gap-12 items-center mt-8">
      <div className="bg-[#1b1b1d] rounded-3xl p-6 border border-white/5">
        <img
          src={song.artworkUrl100?.replace("100x100", "600x600")}
          className="rounded-2xl w-full"
          alt={song.trackName}
        />
      </div>

      <div>
        <span className="bg-violet-500/15 text-violet-300 px-4 py-2 rounded-full text-sm">
          {song.primaryGenreName}
        </span>

        <h1 className="text-6xl font-bold mt-6">{song.trackName}</h1>

        <div className="flex gap-4 text-gray-400 mt-4">
          <span>{song.artistName}</span>
          <span>•</span>
          <span>{new Date(song.releaseDate).getFullYear()}</span>
          <span>•</span>
          <span>
            {Math.floor(song.trackTimeMillis / 60000)}:
            {String(
              Math.floor((song.trackTimeMillis % 60000) / 1000)
            ).padStart(2, "0")}
          </span>
        </div>

        <div className="flex gap-4 mt-10">
          <button
            onClick={handlePlayPause}
            className="px-10 py-4 rounded-full bg-violet-400 text-black font-semibold flex items-center gap-3 hover:bg-violet-300 transition"
          >
            {isPlaying ? (
              <Pause fill="black" size={20} />
            ) : (
              <Play fill="black" size={20} />
            )}

            {isPlaying ? "Pause Preview" : "Play Preview"}
          </button>

          <button className="w-16 h-16 rounded-full border border-white/10 flex justify-center items-center hover:bg-violet-500 hover:border-violet-500 transition">
            <Heart size={22} />
          </button>
        </div>

        {/* Hidden Audio */}
        <audio
          ref={audioRef}
          src={song.previewUrl}
          onEnded={() => setIsPlaying(false)}
          hidden
        />
      </div>
    </section>
  );
};

export default SongHero;