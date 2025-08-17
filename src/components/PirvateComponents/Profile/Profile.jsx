import React, { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router";

const Profile = () => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!authUser?.email) return;
    axios
      .get(
        `https://fitness-app-server-six.vercel.app/users?email=${authUser.email}`
      )
      .then((res) => setUser(res.data[0])) // res.data is an array
      .catch((err) => console.error(err));
  }, [authUser]);

  const fullName = user?.name || user?.displayName || "N/A";
  const profilePicUrl = user?.photoURL || "/default-profile.png";
  const email = user?.email || "N/A";
  const lastLogin = user?.last_log_in
    ? new Date(user.last_log_in).toUTCString()
    : "Never logged in";

  const navigate = useNavigate();
  const handleClick = () => {
    // Navigate to the update profile page
    navigate("/update-profile");
  };

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
          <h2 className="font-semibold text-lg">Profile Picture</h2>
          <img
            src={profilePicUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
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
          onClick={handleClick}
          className="w-full mt-6 py-2 bg-[#C65656] text-white rounded hover:bg-[#a94545]"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
