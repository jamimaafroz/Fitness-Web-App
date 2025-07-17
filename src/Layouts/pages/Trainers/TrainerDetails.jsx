import React from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const TrainerDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: trainer,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["trainer", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/trainers/${id}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="text-center mt-10 text-xl font-semibold">Loading...</div>
    );

  if (isError)
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        Error: {error.message}
      </div>
    );

  return (
    <div className="max-w-6xl mt-24 mx-auto p-6 space-y-10">
      {/* Be A Trainer CTA Section */}
      <section className="p-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Want to share your skills?</h2>
        <p className="mb-6">
          Join our community and become a certified trainer today!
        </p>
        <button
          onClick={() => navigate("/become-trainer")}
          className="bg-white text-[#C65656] font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition"
        >
          Become a Trainer
        </button>
      </section>

      {/* Trainer Info & Available Slots */}
      <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-xl shadow-md">
        {/* Trainer Info Section */}
        <div className="md:w-1/2">
          <img
            src={
              trainer.image ||
              "https://via.placeholder.com/400x400?text=No+Image"
            }
            alt={trainer.name}
            className="w-full h-80 object-cover rounded-lg mb-6"
          />
          <h1 className="text-3xl font-bold mb-2">{trainer.name}</h1>
          <p className="text-gray-700 mb-4">{trainer.details}</p>
          <p className="text-gray-600 font-semibold mb-2">Skills:</p>
          <ul className="list-disc list-inside mb-4">
            {trainer.skills?.map((skill, i) => (
              <li key={i} className="text-gray-700">
                {skill}
              </li>
            ))}
          </ul>
          <p className="text-gray-600 font-semibold">Experience:</p>
          <p className="mb-4">{trainer.experience}</p>
          <p className="text-gray-600 font-semibold">Other Info:</p>
          <p>{trainer.otherInfo}</p>
        </div>

        {/* Available Slots Section */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold mb-6">Available Slots</h2>
          {trainer.days && trainer.days.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {trainer.days.map((day, index) => (
                <button
                  key={index}
                  onClick={() =>
                    navigate(
                      `/booking/${trainer._id}?slot=${encodeURIComponent(
                        day + " - " + trainer.time
                      )}`
                    )
                  }
                  className="bg-[#C65656] text-white rounded-md py-3 hover:bg-blue-700 transition"
                >
                  {day} - {trainer.time}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No available slots at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainerDetails;
