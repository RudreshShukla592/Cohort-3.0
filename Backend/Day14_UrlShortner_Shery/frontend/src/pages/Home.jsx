import React, { useState } from "react";
import ShortenForm from "../components/ShortenForm";
import ResultCard from "../components/ResultCard";
import UrlList from "../components/UrlList";
import axios from "axios";
import { useEffect } from "react";

const Home = () => {
  const [shortUrl, setShortUrl] = useState("");
  const [urls, setUrls] = useState([]);

  const getAllUrls = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/url/getAll");

      setUrls(response.data.data.urls);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUrls();
  }, []);

  const handleShorten = async (url) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/url/create",
        { url },
      );

      const shortCode = response.data.data.shortCode;
      const finalUrl = `http://localhost:3000/${shortCode}`;

      setShortUrl(finalUrl);
      getAllUrls();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (code) => {
    try {
      await axios.delete(`http://localhost:3000/${code}`);
      getAllUrls();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#121015] text-white px-5 py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-purple-400 text-sm font-medium mb-3">
          URL SHORTENER
        </p>

        <h1 className="text-4xl sm:text-5xl font-bold">Shorten your links.</h1>

        <p className="text-gray-400 mt-3">
          Make your long URLs short, simple and shareable.
        </p>
      </div>

      <ShortenForm onShorten={handleShorten} />

      <ResultCard shortUrl={shortUrl} />

      <UrlList
        urls={urls}
        onDelete={handleDelete}
        onRedirect={getAllUrls}
      />
    </div>
  );
};

export default Home;
