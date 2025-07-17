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
      setTotalPages(1); // since backend doesn’t send count yet
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
      toast.success("Vote counted!"); // Show success toast
      await fetchForums(page); // Await the refresh to avoid race
    } catch (err) {
      console.error("Voting failed:", err.response || err.message || err);
      toast.error(
        "Voting failed: " + (err.response?.data?.error || err.message)
      );
    }
  };

  return (
    <div className="max-w-4xl mt-24 mx-auto p-6 space-y-6">
      <h2 className="text-4xl font-bold text-[#C65656] text-center mb-4">
        📖 Community Forums
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : forums.length === 0 ? (
        <p className="text-center text-gray-500">
          No forums yet. Be the first to post!
        </p>
      ) : (
        <ul className="space-y-8">
          {forums.map(
            ({ _id, title, description, picUrl, votes, createdBy }) => (
              <li
                key={_id}
                className="border rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300 flex flex-col md:flex-row gap-6 items-center"
              >
                {picUrl && (
                  <img
                    src={picUrl}
                    alt={title}
                    className="w-full md:w-48 h-40 object-cover rounded-lg"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-[#C65656]">
                    {title}
                  </h3>
                  <p className="mt-2 text-gray-700">{description}</p>
                  <small className="text-gray-400 block mt-1">
                    Posted by: {createdBy}
                  </small>
                </div>

                <div className="flex flex-col items-center space-y-2">
                  <button
                    onClick={() => handleVote(_id.toString(), "up")}
                    className="btn btn-sm bg-[#C65656] hover:bg-[#b84a4a] text-white rounded-full"
                    aria-label="Upvote forum"
                  >
                    👍
                  </button>
                  <span className="font-semibold text-[#C65656]">
                    {votes || 0}
                  </span>
                  <button
                    onClick={() => handleVote(_id.toString(), "down")}
                    className="btn btn-sm bg-gray-300 hover:bg-gray-400 rounded-full"
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
        <div className="flex justify-center gap-4 mt-8">
          <button
            className="btn btn-outline"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="text-[#C65656] font-semibold self-center">
            Page {page} / {totalPages}
          </span>
          <button
            className="btn btn-outline"
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ForumPostSection;
