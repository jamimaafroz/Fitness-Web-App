import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery, useQueries } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ITEMS_PER_PAGE = 6;

const AllClasses = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch paginated classes
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["classes", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/classes?page=${currentPage}&limit=${ITEMS_PER_PAGE}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  // Fetch trainers for each class
  const trainersQueries = useQueries({
    queries:
      data?.classes.map((cls) => ({
        queryKey: ["trainers", cls.name],
        queryFn: async () => {
          const res = await axiosSecure.get(
            `/trainers?skill=${encodeURIComponent(cls.name)}`
          );
          return res.data.slice(0, 5);
        },
        staleTime: 1000 * 60 * 5,
      })) || [],
  });

  const totalPages = data ? Math.ceil(data.totalCount / ITEMS_PER_PAGE) : 1;

  if (isLoading)
    return (
      <p className="text-center text-gray-500 mt-24">Loading classes...</p>
    );
  if (isError)
    return (
      <p className="text-center text-red-600 mt-24">
        Error loading classes: {error.message}
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto p-6 mt-24">
      <h1 className="text-4xl font-extrabold mb-12 text-center text-[#C65656]">
        Explore All Classes
      </h1>

      {data.classes.length === 0 ? (
        <p className="text-center text-gray-500">
          No classes available at the moment.
        </p>
      ) : (
        <>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.classes.map((cls, idx) => {
              const trainers = trainersQueries[idx]?.data || [];
              const trainersLoading = trainersQueries[idx]?.isLoading;

              return (
                <div
                  key={cls._id}
                  className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300"
                >
                  <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                    {cls.name}
                  </h2>

                  {cls.image && (
                    <img
                      src={cls.image}
                      alt={cls.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}

                  <div className="mb-4">
                    <p className="font-medium text-gray-700 mb-1">Details:</p>
                    <p className="text-gray-600 text-sm">{cls.details}</p>
                  </div>

                  {cls.otherInfo && (
                    <div className="mb-4">
                      <p className="font-medium text-gray-700 mb-1">
                        Additional Info:
                      </p>
                      <p className="text-gray-500 italic text-sm">
                        {cls.otherInfo}
                      </p>
                    </div>
                  )}

                  <p className="font-semibold text-gray-800 mb-2">
                    Trainers Specialized:
                  </p>
                  <div className="flex gap-3 overflow-x-auto py-2">
                    {trainersLoading ? (
                      <p className="text-gray-400 italic">
                        Loading trainers...
                      </p>
                    ) : trainers.length > 0 ? (
                      trainers.map((trainer) => (
                        <img
                          key={trainer._id}
                          src={trainer.image || "/default-trainer.jpg"}
                          alt={trainer.name}
                          className="w-14 h-14 rounded-full border-2 border-[#C65656] cursor-pointer hover:border-gray-800 transition"
                          title={trainer.name}
                          onClick={() => navigate(`/trainers/${trainer._id}`)}
                        />
                      ))
                    ) : (
                      <p className="text-gray-400 italic">
                        No trainers assigned yet
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-10">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-1 rounded-md bg-[#C65656] text-white disabled:bg-gray-300 hover:brightness-90 transition"
            >
              Prev
            </button>

            {[...Array(totalPages).keys()].map((num) => {
              const pageNum = num + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-4 py-1 rounded-md transition ${
                    pageNum === currentPage
                      ? "bg-[#C65656] text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-1 rounded-md bg-[#C65656] text-white disabled:bg-gray-300 hover:brightness-90 transition"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllClasses;
