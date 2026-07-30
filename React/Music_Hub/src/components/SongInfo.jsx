import React from "react";
import { Album, Disc3, Calendar, User } from "lucide-react";

const SongInfo = ({ song }) => {
  return (
    <section className="grid lg:grid-cols-2 gap-10 mt-14">

      <div>
        <h2 className="text-3xl font-bold mb-6">
          About this Song
        </h2>

        <p className="text-gray-400 leading-8">
          <span className="text-white font-semibold">
            {song.trackName}
          </span>{" "}
          is a {song.primaryGenreName} track performed by{" "}
          <span className="text-white">
            {song.artistName}
          </span>
          . It is part of the album{" "}
          <span className="text-white">
            {song.collectionName}
          </span>{" "}
          released in{" "}
          {new Date(song.releaseDate).getFullYear()}.
        </p>
      </div>

      <div className="bg-[#1b1b1d] rounded-3xl border border-white/5 p-8 space-y-8">

        <div className="flex gap-4">
          <User className="text-violet-400"/>
          <div>
            <p className="text-gray-400 text-sm">Artist</p>
            <h3>{song.artistName}</h3>
          </div>
        </div>

        <div className="flex gap-4">
          <Album className="text-violet-400"/>
          <div>
            <p className="text-gray-400 text-sm">Album</p>
            <h3>{song.collectionName}</h3>
          </div>
        </div>

        <div className="flex gap-4">
          <Disc3 className="text-violet-400"/>
          <div>
            <p className="text-gray-400 text-sm">Genre</p>
            <h3>{song.primaryGenreName}</h3>
          </div>
        </div>

        <div className="flex gap-4">
          <Calendar className="text-violet-400"/>
          <div>
            <p className="text-gray-400 text-sm">Release Date</p>
            <h3>{new Date(song.releaseDate).toDateString()}</h3>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SongInfo;