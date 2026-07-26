import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      
      {/* Avatar */}
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-indigo-600 text-white flex items-center justify-center text-3xl font-bold uppercase shadow-md">
          {user.name.firstname[0]}
          {user.name.lastname[0]}
        </div>
      </div>

      {/* Name */}
      <div className="text-center mt-4">
        <h2 className="text-2xl font-bold text-gray-800 capitalize">
          {user.name.firstname} {user.name.lastname}
        </h2>

        <p className="text-indigo-600 font-medium">@{user.username}</p>
      </div>

      {/* Divider */}
      <div className="my-5 border-t border-gray-200"></div>

      {/* User Info */}
      <div className="space-y-4">

        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-gray-800">{user.email}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Phone</p>
          <p className="text-gray-800">{user.phone}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Address</p>
          <p className="text-gray-800 capitalize">
            {user.address.number}, {user.address.street}
            <br />
            {user.address.city}, {user.address.zipcode}
          </p>
        </div>

      </div>

      {/* Button */}
      <button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-colors duration-300">
        View Profile
      </button>
    </div>
  );
};

export default UserCard;