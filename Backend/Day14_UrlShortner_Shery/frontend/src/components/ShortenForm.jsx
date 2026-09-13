import React, { useState } from "react";

const ShortenForm = ({ onShorten }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!url.trim()) return;

    onShorten(url);
    setUrl("");
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste your long URL here..."
          className="flex-1 h-14 px-5 rounded-xl bg-[#18171c] border border-[#302d36] text-white placeholder:text-gray-500 outline-none focus:border-purple-500 transition"
        />

        <button
          type="submit"
          className="h-14 px-7 rounded-xl bg-purple-600 hover:bg-purple-500 font-semibold transition"
        >
          Shorten URL
        </button>
      </form>
    </div>
  );
};

export default ShortenForm;
