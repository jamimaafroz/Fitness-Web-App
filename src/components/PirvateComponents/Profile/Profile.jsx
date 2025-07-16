import React, { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchProfile = async () => {
      try {
        const res = await axiosSecure.get(`/users?email=${user.email}`);
        const userData = Array.isArray(res.data) ? res.data[0] : res.data;
        setProfile(userData);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, axiosSecure]);

  if (loading) return <p>Loading your profile...</p>;
  if (!profile) return <p>User data not found.</p>;

  // Format last login time if available
  const lastLogin = profile.lastLoggedIn
    ? new Date(profile.lastLoggedIn).toLocaleString()
    : "Never logged in";

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#C65656]">
        Your Profile
      </h2>
      <div className="flex flex-col items-center space-y-4">
        {profile.image ? (
          <img
            src={profile.image}
            alt={profile.name || "User Image"}
            className="w-32 h-32 rounded-full object-cover"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
            No Image
          </div>
        )}

        <p>
          <strong>Name:</strong> {profile.name || user.displayName || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {profile.email || user.email}
        </p>
        <p>
          <strong>Role:</strong> {profile.role || "member"}
        </p>
        <p>
          <strong>Last Logged In:</strong> {lastLogin}
        </p>

        {profile.profilePicLink && (
          <p>
            <strong>Profile Pic URL:</strong>{" "}
            <a
              href={profile.profilePicLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {profile.profilePicLink}
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
