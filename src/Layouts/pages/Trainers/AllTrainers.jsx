import React from "react";
import { Link } from "react-router"; // fixed import
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const AllTrainers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // useQuery with object syntax (v5)
  const {
    data: trainers = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trainers");
      return res.data.filter((t) => t.status === "approved");
    },
    staleTime: 1000 * 60 * 5, // cache 5 minutes
  });

  // useMutation with object syntax (v5)
  const mutation = useMutation({
    mutationFn: (trainerId) =>
      axiosSecure.patch(`/users/${trainerId}/role`, { role: "member" }),
    onSuccess: () => {
      toast.success("Trainer role removed successfully");
      queryClient.invalidateQueries({ queryKey: ["trainers"] });
    },
    onError: () => {
      toast.error("Failed to remove trainer role");
    },
  });

  const handleDeleteTrainer = (trainerId) => {
    if (!window.confirm("Are you sure you want to remove this trainer role?"))
      return;

    mutation.mutate(trainerId);
  };

  if (isLoading)
    return <p className="text-center mt-10">Loading trainers...</p>;

  if (isError)
    return (
      <p className="text-center mt-10 text-red-600">
        Error loading trainers: {error.message}
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto p-4 mt-24 mb-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {trainers.map((trainer) => (
        <div
          key={trainer._id}
          className="border rounded-lg shadow p-4 flex flex-col"
        >
          <img
            src={trainer.image || "/default-profile.png"}
            alt={trainer.name}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">{trainer.name}</h3>
          <p className="mb-1">
            Experience: {trainer.experience || "N/A"} years
          </p>
          <p className="mb-2 text-sm text-gray-600">
            {trainer.otherInfo || ""}
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mb-4">
            {trainer.socials?.facebook && (
              <a
                href={trainer.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="w-5 h-5 text-blue-600" />
              </a>
            )}
            {trainer.socials?.twitter && (
              <a
                href={trainer.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="w-5 h-5 text-blue-400" />
              </a>
            )}
            {trainer.socials?.instagram && (
              <a
                href={trainer.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="w-5 h-5 text-pink-500" />
              </a>
            )}
          </div>

          {/* Available Slots */}
          <div className="mb-4">
            <p className="font-medium">Available Slots:</p>
            {trainer.days && trainer.days.length > 0 ? (
              <ul className="list-disc list-inside text-sm">
                {trainer.days.map((day, i) => (
                  <li key={i}>
                    {day} - {trainer.time || "Time not set"}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No slots available</p>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-auto flex flex-col space-y-2">
            <Link
              to={`/trainers/${trainer._id}`}
              className="inline-block bg-[#C65656] text-white py-2 px-4 rounded hover:bg-[#a94545] text-center"
            >
              Know More
            </Link>

            {user?.role === "admin" && (
              <button
                onClick={() => handleDeleteTrainer(trainer._id)}
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? "Removing..." : "Remove Trainer Role"}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllTrainers;
