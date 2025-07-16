import React from "react";

const StarRating = ({ rating, onChange }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onChange(star)}
          className={`text-3xl ${
            rating >= star ? "text-yellow-400" : "text-gray-300"
          }`}
          aria-label={`${star} star`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default StarRating;
