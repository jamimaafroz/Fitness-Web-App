import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

// Star Rating Component
const StarRating = ({ rating, setRating }) => (
  <div className="flex space-x-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => setRating(star)}
        className={`text-2xl cursor-pointer ${
          star <= rating ? "text-yellow-400" : "text-gray-300"
        }`}
        aria-label={`${star} Star`}
      >
        ★
      </button>
    ))}
  </div>
);

const BookedTrainer = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  console.log(queryClient);

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedTrainerId, setSelectedTrainerId] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [starRating, setStarRating] = useState(0);

  // Fetch all booked trainers for this user
  const {
    data: trainers = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["booked-trainers", user?.email],
    queryFn: () =>
      axiosSecure
        .get(`/booked-trainers?userEmail=${user?.email}`)
        .then((res) => res.data),
    enabled: !!user?.email,
  });

  // Fetch reviews for a selected trainer
  const { data: reviews = [], refetch: refetchReviews } = useQuery({
    queryKey: ["reviews", selectedTrainerId],
    queryFn: () =>
      axiosSecure
        .get(`/reviews`, { params: { trainerId: selectedTrainerId } })
        .then((res) => res.data),
    enabled: !!selectedTrainerId,
  });

  const mutation = useMutation({
    mutationFn: (newReview) => axiosSecure.post("/reviews", newReview),
    onSuccess: () => {
      setReviewModalOpen(false);
      setReviewText("");
      setStarRating(0);
      refetchReviews();
      toast.success("Review submitted! Thanks for your feedback.");
    },
    onError: () => alert("Failed to submit review. Try again."),
  });

  const openReviewModal = (trainerId) => {
    if (!user?.email) {
      toast.error("You need to be logged in to leave a review.");
      return;
    }
    setSelectedTrainerId(trainerId);
    setReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setReviewModalOpen(false);
    setReviewText("");
    setStarRating(0);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (starRating === 0) {
      toast.warning("Please provide a star rating");
      return;
    }

    mutation.mutate({
      trainerId: selectedTrainerId,
      rating: starRating,
      comment: reviewText,
      userEmail: user.email,
    });
  };

  if (isLoading)
    return <p className="text-center mt-10">Loading booked trainers...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-600">Error: {error.message}</p>
    );
  if (trainers.length === 0)
    return (
      <p className="text-center mt-10 text-gray-600">No trainers booked yet.</p>
    );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {trainers.map((trainer) => (
          <div
            key={trainer._id}
            className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition"
          >
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={trainer.image || "https://via.placeholder.com/100"}
                alt={trainer.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-[#C65656]"
              />
              <div>
                <h2 className="text-2xl font-semibold text-[#C65656]">
                  {trainer.name}
                </h2>
                <p className="text-gray-600">{trainer.email}</p>
              </div>
            </div>

            <p className="text-gray-700 mb-2">{trainer.otherInfo}</p>

            <div className="mb-2">
              <p className="font-semibold text-gray-800">Skills:</p>
              <ul className="list-disc list-inside text-gray-600">
                {trainer.skills?.length
                  ? trainer.skills.map((s, i) => <li key={i}>{s}</li>)
                  : "No skills listed"}
              </ul>
            </div>

            <div className="mb-2">
              <p className="font-semibold text-gray-800">
                Booking Days & Time:
              </p>
              <p>
                {trainer.days?.join(", ")} | {trainer.time}
              </p>
            </div>

            <button
              onClick={() => openReviewModal(trainer._id)}
              className="mt-3 w-full py-2 bg-[#C65656] text-white rounded-md font-semibold hover:bg-[#a84242] transition"
            >
              Leave a Review
            </button>

            {/* Reviews Section */}
            {selectedTrainerId === trainer._id && reviews.length > 0 && (
              <div className="mt-4 max-h-48 overflow-y-auto border-t pt-4">
                <h3 className="font-semibold text-lg text-[#C65656] mb-2">
                  Reviews:
                </h3>
                {reviews.map((rev) => (
                  <div key={rev._id} className="border p-3 rounded-md mb-2">
                    <div className="flex items-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-xl ${
                            i < rev.rating ? "text-yellow-400" : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                      <span className="ml-2 text-sm text-gray-500">
                        {new Date(rev.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p>{rev.comment}</p>
                    <p className="mt-1 text-sm text-gray-600 italic">
                      - {rev.userEmail}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button
              onClick={closeReviewModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
              aria-label="Close review form"
            >
              ×
            </button>
            <h3 className="text-xl font-semibold mb-4 text-[#C65656]">
              Submit Your Review
            </h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your feedback here..."
                rows={4}
                className="w-full border border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#C65656]"
                required
              />
              <div>
                <label className="font-semibold mb-1 block">Star Rating:</label>
                <StarRating rating={starRating} setRating={setStarRating} />
              </div>
              <button
                type="submit"
                disabled={mutation.isLoading}
                className="w-full py-2 bg-[#C65656] text-white rounded-md font-semibold hover:bg-[#a84242] transition disabled:opacity-60"
              >
                {mutation.isLoading ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookedTrainer;
