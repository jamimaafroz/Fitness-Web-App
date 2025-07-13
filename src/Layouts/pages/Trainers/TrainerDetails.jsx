import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import axios from "axios";

const TrainerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/trainers/${id}`)
      .then((res) => setTrainer(res.data))
      .catch((err) => console.error("Failed to fetch trainer:", err));
  }, [id]);

  if (!trainer) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-7xl mt-24 mx-auto px-4 py-8 space-y-10">
      {/* Be A Trainer CTA */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-[#C65656]">
          Want to Inspire Others?
        </h2>
        <p className="mb-4">
          Join our team of certified trainers and make a difference.
        </p>
        <Link to="/dashboard">
          <button className="bg-[#C65656] text-white hover:bg-[#9e3d3d]">
            Become a Trainer
          </button>
        </Link>
      </div>

      {/* Trainer Information */}
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="space-y-4">
          <img
            src={trainer.image || "/default-profile.png"}
            alt={trainer.name}
            className="w-full h-96 object-cover rounded-lg shadow"
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-[#C65656]">{trainer.name}</h2>
          <p>
            <strong>Experience:</strong> {trainer.experience || "N/A"} years
          </p>
          <p>
            <strong>Expertise:</strong> {trainer.skills?.join(", ") || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {trainer.email || "N/A"}
          </p>
          <p>
            <strong>About:</strong> {trainer.otherInfo || "No additional info."}
          </p>
        </div>
      </div>

      {/* Available Slots */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Available Slots 🕒</h3>
        <div className="flex flex-wrap gap-3">
          {trainer.days?.length > 0 ? (
            trainer.days.map((day, i) => (
              <button
                key={i}
                variant="outline"
                onClick={() => navigate(`/booking/${trainer._id}?day=${day}`)}
                className="hover:bg-[#C65656] hover:text-white transition"
              >
                {day} - {trainer.time || "Time not set"}
              </button>
            ))
          ) : (
            <p className="text-gray-500">No available slots right now.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainerDetails;
