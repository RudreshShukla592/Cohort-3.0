import React, { useContext } from "react";
import { MyStore } from "../context/MyContext";
import useApi from "../config/api";
import { useEffect } from "react";


const Profile = () => {
  const { user, setUser } = useContext(MyStore);
  const api =  useApi()

  const fetchProfile = async ()=>{
    try {
      const response = await api.get("/auth/me")

      setUser(response.data.data.user)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchProfile()
  },[])

  return (
    <div className="min-h-screen bg-[#121015] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-[500px] bg-[#1c1a1f] border border-[#29272e] rounded-xl p-8">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>

        {/* Name */}
        <div className="mb-5">
          <p className="text-sm text-gray-400 mb-2">Name</p>

          <div className="w-full h-12 flex items-center px-4 rounded-md bg-[#0f0d12] border border-gray-700">
            {user?.name || "No name available"}
          </div>
        </div>

        {/* Email */}
        <div>
          <p className="text-sm text-gray-400 mb-2">Email</p>

          <div className="w-full h-12 flex items-center px-4 rounded-md bg-[#0f0d12] border border-gray-700">
            {user?.email || "No email available"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
