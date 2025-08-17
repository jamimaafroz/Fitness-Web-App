import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const UpdateProfile = () => {
  const { user, setUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name && !photoURL) {
      toast.error("Please provide at least one field to update");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosSecure.patch("/users/profile", {
        name,
        photoURL,
      });

      if (response.data?.message) {
        toast.success(response.data.message);

        // update context so navbar refreshes
        setUser((prevUser) => ({
          ...prevUser,
          displayName: name || prevUser.displayName,
          photoURL: photoURL || prevUser.photoURL,
        }));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gray-50 mt-16 sm:mt-8">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white border border-gray-200 rounded-2xl shadow-lg p-6 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-8">
          Update Your Profile
        </h2>

        <div className="flex justify-center mb-6">
          <img
            src={photoURL || "/default-avatar.png"}
            alt="Profile Preview"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-gray-300"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C65656] focus:border-[#C65656]"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Profile Picture URL
            </label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="Enter photo URL"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C65656] focus:border-[#C65656]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#C65656] text-white font-semibold rounded-lg shadow-md hover:bg-[#a84242] transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
