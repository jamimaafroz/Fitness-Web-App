import React, { useState } from "react";
import { Link } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const AllTrainers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [sortOrder, setSortOrder] = useState("asc"); // asc or desc

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
    staleTime: 5 * 60 * 1000,
  });

  const mutation = useMutation({
    mutationFn: (trainerId) =>
      axiosSecure.patch(`/users/${trainerId}/role`, { role: "member" }),
    onSuccess: () => {
      toast.success("Trainer role removed successfully");
      queryClient.invalidateQueries({ queryKey: ["trainers"] });
    },
    onError: () => toast.error("Failed to remove trainer role"),
  });

  const handleDeleteTrainer = (trainerId) => {
    if (window.confirm("Are you sure you want to remove this trainer role?")) {
      mutation.mutate(trainerId);
    }
  };

  const handleSort = (order) => {
    setSortOrder(order);
  };

  // Sorting trainers based on experience
  const sortedTrainers = [...trainers].sort((a, b) => {
    const expA = a.experience || 0;
    const expB = b.experience || 0;
    return sortOrder === "asc" ? expA - expB : expB - expA;
  });

  if (isLoading)
    return (
      <p className="text-center mt-28 text-gray-500 text-lg">
        Loading trainers...
      </p>
    );

  if (isError)
    return (
      <p className="text-center mt-28 text-red-600 text-lg">
        Error loading trainers: {error.message}
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-28 mb-16">
      {/* Sorting Buttons */}
      <div className="flex justify-end gap-4 mb-6">
        <button
          className={`py-2 px-4 rounded-lg font-medium border transition ${
            sortOrder === "asc"
              ? "bg-[#C65656] text-white border-[#a84242]"
              : "bg-white text-[#a84242] border-gray-300 hover:bg-gray-100"
          }`}
          onClick={() => handleSort("asc")}
        >
          Sort by Experience ↑
        </button>

        <button
          className={`py-2 px-4 rounded-lg font-medium border transition ${
            sortOrder === "desc"
              ? "bg-[#C65656] text-white border-[#a84242]"
              : "bg-white text-[#a84242] border-gray-300 hover:bg-gray-100"
          }`}
          onClick={() => handleSort("desc")}
        >
          Sort by Experience ↓
        </button>
      </div>

      {/* Trainers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sortedTrainers.map((trainer) => (
          <div
            key={trainer._id}
            className="bg-white border border-gray-200 rounded-2xl shadow-lg flex flex-col transition-transform hover:scale-105 hover:shadow-2xl duration-300 min-h-[450px]"
          >
            {/* Profile Image */}
            <div className="relative w-full h-56 overflow-hidden rounded-t-2xl">
              <img
                src={trainer.image || "/default-profile.png"}
                alt={trainer.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col p-5 flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {trainer.name}
              </h3>
              <p className="text-gray-600 mb-2">
                Experience:{" "}
                <span className="font-medium">
                  {trainer.experience || "N/A"} years
                </span>
              </p>
              {trainer.otherInfo && (
                <p className="text-gray-500 text-sm mb-3">
                  {trainer.otherInfo}
                </p>
              )}

              <div className="flex gap-3 mb-3">
                {trainer.socials?.facebook && (
                  <a
                    href={trainer.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C65656] hover:text-[#a84242] transition-colors"
                  >
                    <FaFacebook className="w-5 h-5" />
                  </a>
                )}
                {trainer.socials?.twitter && (
                  <a
                    href={trainer.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C65656] hover:text-[#a84242] transition-colors"
                  >
                    <FaTwitter className="w-5 h-5" />
                  </a>
                )}
                {trainer.socials?.instagram && (
                  <a
                    href={trainer.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 hover:text-pink-700 transition-colors"
                  >
                    <FaInstagram className="w-5 h-5" />
                  </a>
                )}
              </div>

              <div className="mb-4">
                <p className="font-medium text-gray-700 mb-1">
                  Available Slots:
                </p>
                {trainer.days && trainer.days.length > 0 ? (
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {trainer.days.map((day, i) => (
                      <li key={i}>
                        {day} - {trainer.time || "Time not set"}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400">No slots available</p>
                )}
              </div>

              <div className="mt-auto flex flex-col gap-2">
                <Link
                  to={`/trainers/${trainer._id}`}
                  className="text-white bg-[#C65656] hover:bg-[#a84242] py-2 rounded-lg text-center font-medium transition-all duration-300"
                >
                  Know More
                </Link>

                {user?.role === "admin" && (
                  <button
                    onClick={() => handleDeleteTrainer(trainer._id)}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-colors duration-300 disabled:opacity-50"
                    disabled={mutation.isLoading}
                  >
                    {mutation.isLoading ? "Removing..." : "Remove Trainer Role"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTrainers;
