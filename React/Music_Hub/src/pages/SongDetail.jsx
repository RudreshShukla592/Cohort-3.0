import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { Album, ArrowLeft, Disc3, Play, User } from "lucide-react";
import SongHero from "../components/SongHero";
import SongInfo from "../components/SongInfo";

const SongDetail = () => {
  const [singleSongData, setSingleSongData] = useState({});
  console.log(singleSongData);

  let navigate = useNavigate();

  let { id } = useParams();

  let getSingleSongData = async () => {
    try {
      let res = await axiosInstance.get(`/lookup?id=${id}`);
      setSingleSongData(res.data.results[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleSongData();
    window.scrollTo(0, 0);
  }, [id]);

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
