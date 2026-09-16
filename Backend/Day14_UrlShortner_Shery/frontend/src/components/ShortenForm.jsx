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
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-0">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 w-full"
      >
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste your long URL here..."
          className="w-full sm:flex-1 h-12 sm:h-14 px-4 sm:px-5 rounded-xl bg-[#18171c] border border-[#302d36] text-sm sm:text-base text-white placeholder:text-gray-500 outline-none focus:border-purple-500 transition min-w-0"
        />

        <button
          type="submit"
          className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-7 rounded-xl bg-purple-600 hover:bg-purple-500 font-semibold text-sm sm:text-base transition whitespace-nowrap"
        >
          Shorten URL
        </button>
      </form>
    </div>
  );
};

export default ShortenForm;
