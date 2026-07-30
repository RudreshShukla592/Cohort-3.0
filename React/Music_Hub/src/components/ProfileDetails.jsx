import React from "react";
import {
  Mail,
  User,
  Music,
  Shield,
  Calendar,
} from "lucide-react";

const ProfileDetails = ({ currentUser }) => {
  return (
    <div className="bg-[#1b1b1d] rounded-3xl p-8">

      <h2 className="text-2xl font-bold mb-8">
        Account Details
      </h2>

      <div className="space-y-6">

        <div className="flex items-center justify-between border-b border-white/5 pb-5">
          <div className="flex gap-3">
            <User className="text-violet-400" />
            <span className="text-gray-400">Full Name</span>
          </div>

          <span>{currentUser.name}</span>
        </div>

        <div className="flex items-center justify-between border-b border-white/5 pb-5">
          <div className="flex gap-3">
            <Mail className="text-violet-400" />
            <span className="text-gray-400">Email</span>
          </div>

          <span>{currentUser.email}</span>
        </div>

        <div className="flex items-center justify-between border-b border-white/5 pb-5">
          <div className="flex gap-3">
            <Music className="text-violet-400" />
            <span className="text-gray-400">Display Name</span>
          </div>

          <span>{currentUser.displayName}</span>
        </div>

        <div className="flex items-center justify-between border-b border-white/5 pb-5">
          <div className="flex gap-3">
            <Shield className="text-violet-400" />
            <span className="text-gray-400">Role</span>
          </div>

          <span className="capitalize">
            {currentUser.role}
          </span>
        </div>

        {currentUser.role === "artist" && (
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <Calendar className="text-violet-400" />
              <span className="text-gray-400">Genre</span>
            </div>

            <span>{currentUser.genre}</span>
          </div>
        )}

      </div>

      <div className="mt-10 rounded-2xl bg-violet-500/10 border border-violet-500/20 p-6">
        <h3 className="text-xl font-semibold">
          About
        </h3>

        <p className="text-gray-400 mt-4 leading-8">
          {currentUser.role === "artist"
            ? "Upload songs, build your audience and manage your music collection with MusicHub."
            : "Discover amazing tracks, save favourites and enjoy a personalized listening experience on MusicHub."}
        </p>
      </div>

    </div>
  );
};

export default ProfileDetails;