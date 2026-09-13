import React from "react";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

const ResultCard = ({ shortUrl }) => {
  const [copied, setCopied] = useState(false);

  if (!shortUrl) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 p-5 rounded-xl bg-[#18171c] border border-purple-500/30">
      <p className="text-sm text-gray-400 mb-2">Your shortened URL</p>

      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-purple-300 font-medium truncate">{shortUrl}</p>
        </div>

        <button
          onClick={handleCopy}
          className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25232a] hover:bg-[#302d36] transition text-sm"
        >
          {copied ? (
            <>
              <Check size={16} />
              Copied
            </>
          ) : (
            <>
              <Copy size={16} />
              Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ResultCard;
