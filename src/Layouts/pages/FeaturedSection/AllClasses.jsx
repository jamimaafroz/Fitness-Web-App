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

  // UseQueries to fetch trainers per class, only when classes are loaded
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

  // Correct pagination calculation
  const totalPages = data ? Math.ceil(data.totalCount / ITEMS_PER_PAGE) : 1;

  if (isLoading)
    return <p className="text-center text-gray-500">Loading classes...</p>;
  if (isError)
    return (
      <p className="text-center text-red-600">
        Error loading classes: {error.message}
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto p-6 mt-24">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">
        All Classes
      </h1>

      {data.classes.length === 0 ? (
        <p className="text-center text-gray-500">No classes found.</p>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-8">
            {data.classes.map((cls, idx) => {
              const trainers = trainersQueries[idx]?.data || [];
              const trainersLoading = trainersQueries[idx]?.isLoading;

              return (
                <div
                  key={cls._id}
                  className="border rounded-md p-6 shadow hover:shadow-lg transition"
                >
                  <h2 className="text-2xl font-semibold mb-2">{cls.name}</h2>
                  {cls.image && (
                    <img
                      src={cls.image}
                      alt={cls.name}
                      className="w-full h-48 object-cover rounded mb-4"
                    />
                  )}
                  <p className="mb-2 font-medium">Details:</p>
                  <p className="mb-4 text-gray-700">{cls.details}</p>
                  {cls.otherInfo && (
                    <>
                      <p className="mb-2 font-medium">Additional Info:</p>
                      <p className="mb-4 text-gray-600 italic">
                        {cls.otherInfo}
                      </p>
                    </>
                  )}

                  <p className="font-semibold mb-2">Trainers specialized:</p>
                  <div className="flex gap-4 overflow-x-auto">
                    {trainersLoading ? (
                      <p className="text-gray-500 italic">
                        Loading trainers...
                      </p>
                    ) : trainers.length > 0 ? (
                      trainers.map((trainer) => (
                        <img
                          key={trainer._id}
                          src={trainer.image || "/default-trainer.jpg"}
                          alt={trainer.name}
                          className="w-16 h-16 rounded-full cursor-pointer border-2 border-primary hover:border-[#C65656]"
                          title={trainer.name}
                          onClick={() => {
                            navigate(`/trainers/${trainer._id}`);
                          }}
                        />
                      ))
                    ) : (
                      <p className="text-gray-500 italic">
                        No trainers available
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 mt-10">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 rounded bg-[#C65656] text-white disabled:bg-gray-400"
            >
              Prev
            </button>

            {[...Array(totalPages).keys()].map((num) => {
              const pageNum = num + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 rounded ${
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
              className="px-3 py-1 rounded bg-[#C65656] text-white disabled:bg-gray-400"
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
