import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { Album, ArrowLeft, Disc3, Play, User } from "lucide-react";
import SongHero from "../components/SongHero";
import SongInfo from "../components/SongInfo";
import { MainShop } from "../context/MainContext";

const SongDetail = () => {
  const [singleSongData, setSingleSongData] = useState({});

  let { allSongs } = useContext(MainShop);

  let navigate = useNavigate();

  let { id } = useParams();

  let getSingleSongData = async () => {
    try {
      const song = allSongs.find((song) => song.trackId == id);

      setSingleSongData(song);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (allSongs.length > 0) {
      getSingleSongData();
    }
    window.scrollTo(0, 0);
  }, [id, allSongs]);

  if (!singleSongData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f10] text-white p-6 lg:p-10">
      {/* Back */}
      <div className="flex justify-end mb-8">
        <button
          onClick={() => navigate("/main/library")}
          className="flex items-center gap-2 text-violet-300 hover:text-violet-200 transition"
        >
          <ArrowLeft size={20} />
          Back to Library
        </button>
      </div>

      {/* Main Card */}
      <SongHero song={singleSongData} />
      <SongInfo song={singleSongData} />
    </div>
  );
};

export default SongDetail;
