import React, { useState, useEffect } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const StarRating = ({ rating, setRating }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          className={`text-3xl cursor-pointer ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
          aria-label={`${star} Star`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const BookedTrainer = ({ trainerId }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [trainer, setTrainer] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loadingTrainer, setLoadingTrainer] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [error, setError] = useState(null);

  // Review modal states
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [starRating, setStarRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Fetch trainer info whenever trainerId changes
  useEffect(() => {
    if (!trainerId) {
      setError("No trainer selected");
      setTrainer(null);
      setLoadingTrainer(false);
      return;
    }

    setLoadingTrainer(true);
    setError(null);

    fetch(`http://localhost:3000/trainers/${trainerId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Trainer not found");
        return res.json();
      })
      .then((data) => {
        setTrainer(data);
        setLoadingTrainer(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoadingTrainer(false);
      });
  }, [trainerId]);

  // Fetch reviews for this trainer
  const fetchReviews = () => {
    if (!trainerId) {
      setReviews([]);
      setLoadingReviews(false);
      return;
    }

    setLoadingReviews(true);
    fetch(`http://localhost:3000/reviews?trainerId=${trainerId}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoadingReviews(false);
      })
      .catch(() => setLoadingReviews(false));
  };

  useEffect(() => {
    fetchReviews();
  }, [trainerId]);

  const openReviewModal = () => {
    if (!user?.email) {
      alert("You need to be logged in to leave a review.");
      return;
    }
    setIsReviewOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewOpen(false);
    setReviewText("");
    setStarRating(0);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (starRating === 0) {
      alert("Please provide a star rating");
      return;
    }

    setSubmitting(true);

    try {
      await axiosSecure.post("/reviews", {
        trainerId,
        rating: starRating,
        comment: reviewText,
        userEmail: user.email,
      });
      alert("Review submitted! Thanks for your feedback.");
      closeReviewModal();
      fetchReviews(); // Refresh reviews after submission
    } catch (err) {
      alert("Failed to submit review, try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingTrainer)
    return <p className="text-center mt-10">Loading trainer info...</p>;

  if (error)
    return (
      <p className="text-center mt-10 text-red-600 font-semibold">
        Error: {error}
      </p>
    );

  if (!trainer)
    return (
      <p className="text-center mt-10 text-gray-600 font-semibold">
        No trainer selected.
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Trainer Info */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-2 text-[#C65656]">
          {trainer.name}
        </h2>
        <p className="text-gray-700 mb-4">
          {trainer.bio || "No bio available."}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-lg mb-1">Expertise:</h3>
            <ul className="list-disc list-inside text-gray-600">
              {trainer.skills?.length
                ? trainer.skills.map((skill, idx) => <li key={idx}>{skill}</li>)
                : "No skills listed"}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-1">Contact:</h3>
            <p>Email: {trainer.email}</p>
          </div>
        </div>
      </section>

      {/* Classes Info */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold text-[#C65656] mb-3">
          Classes Offered
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {trainer.classes?.length
            ? trainer.classes.map((cls, idx) => <li key={idx}>{cls}</li>)
            : "No classes listed"}
        </ul>
      </section>

      {/* Slot Info */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold text-[#C65656] mb-3">
          Available Slots
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {trainer.slots?.length
            ? trainer.slots.map((slot, idx) => <li key={idx}>{slot}</li>)
            : "No available slots"}
        </ul>
      </section>

      {/* Reviews Section */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold text-[#C65656] mb-3">Reviews</h3>
        {loadingReviews ? (
          <p>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p>No reviews yet. Be the first to leave one!</p>
        ) : (
          <ul className="space-y-4 max-h-64 overflow-y-auto">
            {reviews.map((rev) => (
              <li key={rev._id} className="border p-3 rounded-md">
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
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Review Button */}
      <div className="text-center">
        <button
          onClick={openReviewModal}
          className="inline-block px-6 py-3 rounded-md bg-[#C65656] text-white font-semibold hover:bg-[#a84242] transition"
        >
          Leave a Review
        </button>
      </div>

      {/* Review Modal */}
      {isReviewOpen && (
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
                disabled={submitting}
                className="w-full py-2 bg-[#C65656] text-white rounded-md font-semibold hover:bg-[#a84242] transition disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookedTrainer;
