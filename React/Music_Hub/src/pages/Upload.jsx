import React from "react";
import {
  Music,
  Image,
  Link,
  FileText,
  Upload as UploadIcon,
  ArrowRight,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { MainShop } from "../context/MainContext";
import { AuthShop } from "../context/AuthContext";
import toast from "react-hot-toast";

const Upload = () => {
  let { uploadedSongs, setUploadedSongs } = useContext(MainShop);
  let { currentUser } = useContext(AuthShop);

  let {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  let formHandle = (data) => {
    const newSong = {
      trackId: crypto.randomUUID(),
      trackName: data.SongTitle,
      artworkUrl100: data.AlbumURL,
      previewUrl: data.AudioURL,
      primaryGenreName: data.Genre,
      collectionName: "Uploaded Song",
      description: data.Description,
      artistId: currentUser.id,
      artistName: currentUser.displayName,
    };

    const alreadyExists = uploadedSongs.find(
      (song) =>
        song.artistId === currentUser.id &&
        song.trackName.trim().toLowerCase() ===
          data.SongTitle.trim().toLowerCase(),
    );

    if (alreadyExists) {
      toast.error("You have already uploaded this song.");
      return;
    }

    toast.success("Song uploaded successfully!");
    let arr = [...uploadedSongs, newSong];
    setUploadedSongs(arr);
    localStorage.setItem("uploadedSongs", JSON.stringify(arr));
    reset();
  };

  return (
    <div className="min-h-screen bg-[#0f0f10] text-white flex justify-center items-center p-6">
      <div className="w-full max-w-4xl rounded-3xl bg-[#18181b] border border-zinc-800 p-8 shadow-xl">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Upload Song</h1>
          <p className="text-zinc-400 mt-2">
            Share your music with listeners around the world.
          </p>
        </div>

        <form onSubmit={handleSubmit(formHandle)} className="space-y-6">
          {/* Row 1 */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Song Title */}
            <div>
              <label className="block text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Song Title
              </label>

              <div className="flex items-center bg-[#0f0f10] rounded-xl border border-zinc-800 px-4">
                <Music size={18} className="text-violet-400" />
                <input
                  type="text"
                  placeholder="Midnight Serenade"
                  className="w-full bg-transparent outline-none px-3 py-4"
                  {...register("SongTitle", {
                    required: "Song Title is required",
                  })}
                />
              </div>
            </div>

            {/* Genre */}
            <div>
              <label className="block text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Genre
              </label>

              <select
                {...register("Genre", {
                  required: "Genre is required",
                })}
                className="w-full bg-[#0f0f10] border border-zinc-800 rounded-xl px-4 py-4 outline-none text-white"
              >
                <option value="">Select Genre</option>
                <option>Pop</option>
                <option>Rock</option>
                <option>Hip Hop</option>
                <option>Bollywood</option>
                <option>Punjabi</option>
                <option>Lo-Fi</option>
                <option>Electronic</option>
              </select>
            </div>
          </div>

          {/* Album Cover */}
          <div>
            <label className="block text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              Album Cover URL
            </label>

            <div className="flex items-center bg-[#0f0f10] rounded-xl border border-zinc-800 px-4">
              <Image size={18} className="text-violet-400" />
              <input
                type="url"
                placeholder="https://example.com/cover.jpg"
                className="w-full bg-transparent outline-none px-3 py-4"
                {...register("AlbumURL", {
                  required: "Album Cover URL is required",
                })}
              />
            </div>
          </div>

          {/* Audio URL */}
          <div>
            <label className="block text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              Audio Preview URL
            </label>

            <div className="flex items-center bg-[#0f0f10] rounded-xl border border-zinc-800 px-4">
              <Link size={18} className="text-violet-400" />
              <input
                type="url"
                placeholder="https://example.com/song.mp3"
                className="w-full bg-transparent outline-none px-3 py-4"
                {...register("AudioURL", {
                  required: "Audio Preview URL is required",
                })}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              Description
            </label>

            <div className="flex bg-[#0f0f10] rounded-xl border border-zinc-800 px-4">
              <FileText
                size={18}
                className="text-violet-400 mt-4 flex-shrink-0"
              />

              <textarea
                rows={5}
                placeholder="Tell listeners about your song..."
                className="w-full bg-transparent outline-none px-3 py-4 resize-none"
                {...register("Description", {
                  required: " Description is required",
                })}
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 bg-violet-600 hover:bg-violet-700 transition rounded-xl py-4 font-semibold text-lg"
          >
            <UploadIcon size={20} />
            Upload Song
            <ArrowRight size={20} />
          </button>

          <p className="text-center text-sm text-zinc-500">
            By uploading, you confirm that you own the rights to this music.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Upload;
