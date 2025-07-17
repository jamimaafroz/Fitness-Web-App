import React from "react";
import useAuth from "../../../Hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  // Safely extract values or fallback
  const fullName = user?.name || user?.displayName || "N/A";
  const profilePicUrl = user?.image || user?.photoURL || null;
  const email = user?.email || "N/A";
  const lastLogin = user?.lastLoggedIn
    ? new Date(user.lastLoggedIn).toUTCString()
    : "Never logged in";

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#C65656]">
        User Profile
      </h1>

      <div className="space-y-6 text-left">
        <div>
          <h2 className="font-semibold text-lg">Full Name</h2>
          <p>{fullName}</p>
        </div>

        <div>
          <h2 className="font-semibold text-lg">Profile Picture URL</h2>
          {profilePicUrl ? (
            <a
              href={profilePicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-words"
            >
              {profilePicUrl}
            </a>
          ) : (
            <p>No profile picture URL</p>
          )}
        </div>

        <div>
          <h2 className="font-semibold text-lg">Email</h2>
          <p>{email}</p>
        </div>

        <div>
          <h2 className="font-semibold text-lg">Last Login</h2>
          <p>{lastLogin}</p>
        </div>

        <button
          onClick={() => alert("Update Profile clicked!")}
          className="w-full mt-6 py-2 bg-[#C65656] text-white rounded hover:bg-[#a94545]"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
