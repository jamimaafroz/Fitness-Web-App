import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const ForumPostSection = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [forums, setForums] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchForums = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await axiosSecure.get(`/forums?page=${pageNum}&limit=6`);
      setForums(res.data || []);
      setTotalPages(1); // Placeholder until backend provides count
    } catch (err) {
      toast.error("Failed to load forums: " + err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchForums(page);
  }, [page]);

  const handleVote = async (id, type) => {
    if (!user) {
      toast.warning("Login to vote!");
      return;
    }
    try {
      await axiosSecure.patch(`/forums/${id}/vote`, { type });
      toast.success("Vote counted!");
      await fetchForums(page);
    } catch (err) {
      toast.error(
        "Voting failed: " + (err.response?.data?.error || err.message)
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-24 px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-4xl font-extrabold text-center text-[#C65656] mb-6">
        📖 Community Forums
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 mt-12">Loading forums...</p>
      ) : forums.length === 0 ? (
        <p className="text-center text-gray-500 mt-12">
          No forums yet. Be the first to post!
        </p>
      ) : (
        <ul className="space-y-8">
          {forums.map(
            ({ _id, title, description, picUrl, votes, createdBy }) => (
              <li
                key={_id}
                className="flex flex-col md:flex-row gap-6 items-start bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6"
              >
                {picUrl && (
                  <img
                    src={picUrl}
                    alt={title}
                    className="w-full md:w-48 h-40 object-cover rounded-xl flex-shrink-0"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                )}

                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-[#C65656]">
                    {title}
                  </h3>
                  <p className="mt-2 text-gray-700 line-clamp-4">
                    {description}
                  </p>
                  <small className="text-gray-400 block mt-2">
                    Posted by: {createdBy}
                  </small>
                </div>

                <div className="flex flex-col items-center space-y-2 mt-2 md:mt-0">
                  <button
                    onClick={() => handleVote(_id.toString(), "up")}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-[#C65656] text-white hover:bg-[#b84a4a] transition shadow-md"
                    aria-label="Upvote forum"
                  >
                    👍
                  </button>
                  <span className="font-semibold text-[#C65656] text-lg">
                    {votes || 0}
                  </span>
                  <button
                    onClick={() => handleVote(_id.toString(), "down")}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition shadow-md"
                    aria-label="Downvote forum"
                  >
                    👎
                  </button>
                </div>
              </li>
            )
          )}
        </ul>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-md bg-[#C65656] text-white disabled:bg-gray-300 hover:brightness-90 transition"
          >
            Prev
          </button>
          <span className="text-[#C65656] font-semibold">
            Page {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-md bg-[#C65656] text-white disabled:bg-gray-300 hover:brightness-90 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ForumPostSection;
