import React, { useContext } from "react";
import { AuthShop } from "../context/AuthContext";
import ProfileHero from "../components/ProfileHero";
import ProfileStats from "../components/ProfileStats";
import ProfileDetails from "../components/ProfileDetails";

const Profile = () => {
  const { currentUser } = useContext(AuthShop);

  return (
    <div className="min-h-screen bg-[#0f0f10] text-white p-6 lg:p-10 space-y-8">
      <ProfileHero currentUser={currentUser} />
      <ProfileStats currentUser={currentUser} />
      <ProfileDetails currentUser={currentUser} />
    </div>
  );
};

export default Profile;