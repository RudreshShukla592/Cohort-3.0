import React from "react";
import { Copy, ExternalLink, Trash2, MousePointerClick } from "lucide-react";

const UrlList = ({ urls = [], onDelete, onRedirect }) => {
  return (
    <div className="w-full max-w-3xl mx-auto mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Your URLs</h2>

        <span className="text-sm text-gray-500">{urls.length} URLs</span>
      </div>

      {urls.length === 0 ? (
        <div className="py-12 text-center rounded-xl bg-[#18171c] border border-[#29272e]">
          <p className="text-gray-500">No shortened URLs yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {urls.map((item) => {
            const shortUrl = `http://localhost:3000/${item.shortCode}`;

            return (
              <div
                key={item._id}
                className="p-4 rounded-xl bg-[#18171c] border border-[#29272e] hover:border-[#403b48] transition"
              >
                {/* Top section */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-purple-300 font-medium truncate">
                      {shortUrl}
                    </p>

                    <p className="text-xs text-gray-500 truncate mt-1">
                      {item.originalUrl}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => navigator.clipboard.writeText(shortUrl)}
                      className="p-2 rounded-lg hover:bg-[#29272e] text-gray-400 hover:text-white transition"
                      title="Copy"
                    >
                      <Copy size={17} />
                    </button>

                    <a
                      href={shortUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg hover:bg-[#29272e] text-gray-400 hover:text-white transition"
                      title="Open"
                      onClick={() => {
                        setTimeout(() => {
                          onRedirect();
                        }, 1000);
                      }}
                    >
                      <ExternalLink size={17} />
                    </a>

                    <button
                      onClick={() => onDelete(item.shortCode)}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition"
                      title="Delete"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>

                {/* Clicks */}
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#29272e] text-xs text-gray-500">
                  <MousePointerClick size={14} />

                  <span>
                    {item.clicks} {item.clicks === 1 ? "click" : "clicks"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UrlList;
