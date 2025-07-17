import React, { useState } from "react";

import { toast } from "react-toastify";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AddForum = () => {
  const { user, role } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picUrl, setPicUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !picUrl) {
      toast.error("Please fill in all fields!");
      return;
    }

    const forumData = {
      title,
      description,
      picUrl,
      createdBy: user?.displayName || "Anonymous",
      createdByEmail: user?.email || "unknown@example.com",
      role: role || "Trainer",
      createdAt: new Date(),
      votes: 0,
    };

    setLoading(true);
    try {
      const res = await axiosSecure.post("/forums", forumData);
      if (res.data._id) {
        toast.success("Forum posted successfully!");
        setTitle("");
        setDescription("");
        setPicUrl("");
      } else {
        toast.error("Failed to add forum.");
      }
    } catch (err) {
      console.error(err);
      toast.error(`Failed to post forum: ${err.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen  flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-lg border border-[#C65656]/20 shadow-2xl rounded-3xl p-8 md:p-10 space-y-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-[#C65656] drop-shadow-sm ">
          Start a Forum ✍️
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Forum Title
            </label>
            <input
              type="text"
              className="w-full input input-bordered rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C65656]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's on your mind?"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Description
            </label>
            <textarea
              rows={6}
              className="w-full textarea textarea-bordered rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C65656]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write something meaningful..."
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Image URL
            </label>
            <input
              type="url"
              className="w-full input input-bordered rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C65656]"
              value={picUrl}
              onChange={(e) => setPicUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn px-6 py-2 text-white font-semibold rounded-full ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#C65656] hover:bg-[#b84a4a]"
            } shadow-lg transition duration-300`}
          >
            {loading ? "Posting..." : "Post Forum"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddForum;
